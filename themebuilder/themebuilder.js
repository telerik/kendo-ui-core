;(function($, kendo) {

    var proxy = $.proxy,
        CHANGE = "change",
        Component = kendo.ui.Component,
        ColorPicker = kendo.ui.ComboBox.extend({
            init: function(element, options) {
                var that = this;

                if (!options) {
                    options = {};
                }

                if (!options.dataSource) {
                    options.dataSource = [];
                }

                kendo.ui.ComboBox.fn.init.call(that, element, options);

                that._updateColorPreview();

                that.bind(CHANGE, proxy(that._change, that));

                that.wrapper.addClass("k-colorpicker");
            },

            _change: function(e) {
                var that = this;

                that._updateColorPreview();

                // trigger change event?
                if (that.options.change) {
                    that.options.change.call(that, {
                        name: that.element.attr("id"),
                        value: that.element.val()
                    });
                }
            },

            _updateColorPreview: function() {
                $(this.wrapper).find(".k-arrow-down")
                    .css("backgroundColor", this.value());
            }
        }),
        hexValueRe = /^#([0-9a-f]{3}){1,2}$/i,
        rgbValuesRe = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/gi,
        LessConstants = kendo.Observable.extend({
            // TODO: can this be converted to an array-like object?
            init: function(constants) {
                this.constants = constants || {};
            },

            update: function(name, value) {
                var constant = this.constants[name];
                if (constant) {
                    constant.value = value;
                }
            },

            serialize: function() {
                return $.map(this.constants, function(item, key) {
                    return key + ": " + item.value + ";"
                }).join("\n");
            },

            colors: function() {
                var constants = this.constants,
                    result = [];

                $.each(constants, function() {
                    var value = this.value;
                    if (hexValueRe.test(value) && $.inArray(value, result) < 0) {
                        result.push(value);
                    }
                });

                return result;
            },

            infer: function() {
                var constants = this.constants, constant,
                    c, i,
                    property, value,
                    prototype = $("<div style='border-style:solid;' />").appendTo(document.body);

                for (constant in constants) {
                    constant = constants[constant];

                    if (constant.infer) {
                        // computed constant
                        constant.value = constant.infer();
                    } else {
                        // TODO: make it work with complex selectors (targets) -- ".foo .bar"
                        prototype[0].className = constant.target.substring(1);

                        property = constant.property;
                        value = prototype.css(property);

                        if (!value && property == "border-color") {
                            value = prototype.css("border-top-color");
                        }

                        if (!value && property == "border-radius") {
                            value = "0";
                        }

                        if (rgbValuesRe.test(value)) {
                            value = value.replace(rgbValuesRe, function(match, r, g, b) {
                                function pad(x) { return x.length == 1 ? "0" + x : x }
                                return "#" + pad((+r).toString(16)) +
                                             pad((+g).toString(16)) +
                                             pad((+b).toString(16));
                            });
                        }

                        constant.value = value;
                    }
                }

                prototype.remove();
            }
        }),

        ThemeBuilder = kendo.Observable.extend({
            init: function(templateInfo, constants, constantsHierarchy) {
                var that = this,
                    themeColorsDataSource;

                that.templateInfo = templateInfo;

                that.constants = constants;

                that.constantsHierarchy = constantsHierarchy;

                if (constants) {
                    constants.infer();
                }

                that.render();

                that.content = $("#kendo-themebuilder")
                    .kendoWindow({
                        title: "Kendo ThemeBuilder",
                        draggable: true,
                        resizable: true,
                        width: 300,
                        minWidth: 300,
                        maxWidth: 300,
                        minHeight: 160,
                        maxHeight: $(window).height() - 100,
                        close: this.removeUpdateHeightHandler
                    });

                $(window).bind("resize.kendoThemeBuilder", $.proxy(this.updateMaxHeight, this));

                that.element = that.content.closest(".k-window")
                    .attr("id", "k-tb-wrap")
                    .css({
                        top: 20,
                        left: $(window).width() - 320
                    })
                    .data("kendoThemeBuilder", that);

                themeColorsDataSource = new kendo.data.DataSource({
                    data: constants ? constants.colors().map(function(x) {
                        return { text: x, value: x };
                    }) : []
                });

                $("#stylable-elements")
                    .kendoPanelBar({
                        animation: false
                    })
                    .find("input").kendoColorPicker({
                        dataSource: themeColorsDataSource,
                        template: "<span style='background-color: ${ data.value }' class='k-icon k-color-preview'></span> " +
                                  "<span class='k-color-name'>${ data.text }</span>",
                        change: proxy(that._propertyChange, that)
                    });

                $(".k-items-collapse", that.element).click(function() {
                    var panelbar = $("#stylable-elements");
                    panelbar.data("kendoPanelBar").collapse($(".k-item", panelbar));
                });
            },
            open: function() {
                this.content.data("kendoWindow").open();
            },
            updateMaxHeight: function() {
                this.content.data("kendoWindow").options.maxHeight = $(window).height() - 100;
            },
            removeUpdateHeightHandler: function() {
                $(window).unbind("resize.kendoThemeBuilder");
            },
            _propertyChange: function(e) {
                var that = this,
                    parser = new less.Parser();

                that.constants.update(e.name, e.value);

                parser.parse(that.constants.serialize() + that.templateInfo.template,
                    function (err, tree) {
                        if (err && console) {
                            return console.error(err);
                        }

                        that.updateStyleSheet(tree.toCSS());
                    }
                );
            },
            updateStyleSheet: function(cssText) {
                var doc = document,
                    style = $("style[title='themebuilder']")[0];

                if (style) {
                    style.parentNode.removeChild(style);
                }

                style = doc.createElement("style");
                style.setAttribute("title", "themebuilder");

                $("head")[0].appendChild(style);

                if (style.styleSheet) {
                    style.styleSheet.cssText = cssText;
                } else {
                    style.appendChild(doc.createTextNode(cssText));
                }
            },
            render: function() {
                var that = this,
                    colorPickerTemplate = kendo.template(
                        "<label for='#= name #'>#= constant.property #</label>" +
                        "<input id='#= name #' value='#= constant.value #' />"
                    ),
                    editorTemplates = {
                        "color": colorPickerTemplate,
                        "background-color": colorPickerTemplate,
                        "border-color": colorPickerTemplate
                    },
                    propertyGroupTemplate = kendo.template(
                        "<li>#= title #" +
                            "<div class='styling-options'>" +
                                "# for (var constantName in constants) {" +
                                    "var c = constants[constantName], p = c.property;" +
                                    "if (c.readonly) continue; #" +
                                    "#= editorTemplates[p] ? editorTemplates[p]({ " +
                                        "name: constantName, constant: c" +
                                        "}) : '<div>' + p + '</div>' #" +
                                "# } #" +
                            "</div>" +
                        "</li>"
                    );

                $("<div id='kendo-themebuilder'>" +
                        "<button type='button' class='k-items-collapse k-button'>Collapse panels</button>" +
                        "<ul id='stylable-elements'>" +
                            $.map(that.constantsHierarchy || {}, function(section, title) {
                                var matchedConstants = {},
                                    constants = that.constants.constants;

                                for (var constant in constants) {
                                    if (section.test(constant)) {
                                        matchedConstants[constant] = $.extend({}, constants[constant]);
                                    }
                                }

                                return propertyGroupTemplate($.extend(section, {
                                    title: title,
                                    constants: matchedConstants,
                                    editorTemplates: editorTemplates
                                }));
                            }).join("") +
                        "</ul>" +
                        "<button type='button' class='k-action-download k-button'>Download</button>" +
                    "</div>").appendTo(document.body);
            }
        });

    kendo.ui.plugin("ColorPicker", ColorPicker, Component);

    $.extend(kendo, {
        LessConstants: LessConstants,
        ThemeBuilder: ThemeBuilder
    });
})(jQuery, kendo);
