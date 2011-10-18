(function($, kendo) {

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
        rgbValuesRe = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/gi,
        LessConstants = kendo.Observable.extend({
            init: function(constants) {
                this.constants = constants || [];
            },

            update: function(name, value) {
                var prefix = name.split("-")[0],
                    property = name.split("-").slice(1).join("-"),
                    constants = this.constants,
                    properties,
                    i;

                    for (i = 0; i < constants.length; i++) {
                        if (constants[i].prefix == prefix) {
                            properties = constants[i].properties;
                            for (j = 0; j < properties.length; j++) {
                                if (properties[j].property == property) {
                                    properties[j].value = value;
                                    break;
                                }
                            }
                            break;
                        }
                    }
            },

            serialize: function() {
                var result = [],
                    constants = this.constants,
                    constant, props, i, j, len;

                for (j = 0; j < constants.length; j++) {
                    constant = constants[j];

                    for (i = 0, props = constant.properties, len = props.length; i < len; i++) {
                        result.push(constant.prefix + "-" + (props[i].lessSuffix || props[i].property) + ": " + props[i].value + ";");
                    }
                }

                return result.join("\n");
            },

            colors: function() {
                var constants = this.constants,
                    properties,
                    i, j,
                    result = [];

                for (i = 0; i < constants.length; i++) {
                    properties = constants[i].properties;

                    for (j = 0; j < properties.length; j++) {
                        if ($.inArray(properties[j].value, result) < 0) {
                            result.push(properties[j].value);
                        }
                    }
                }

                return result;
            },

            infer: function() {
                var constants = this.constants, constant,
                    c, i,
                    prototype,
                    property, value;

                for (c = 0; c < constants.length; c++) {
                    constant = constants[c];

                    prototype = $("<div style='border-style:solid;' class='" +
                                        (constant.cssClass ? constant.cssClass : constant.prefix.replace("@", "k-")) +
                                "' />").appendTo(document.body);

                    for (i = 0; i < constant.properties.length; i++) {
                        property = constant.properties[i].property;
                        value = prototype.css(property);

                        if (!value && property == "border-color") {
                            value = prototype.css("border-top-color");
                        }

                        if (value) {
                            // convert rgb() values to hex
                            value = value.replace(rgbValuesRe, function(match, r, g, b) {
                                function pad(x) { return x.length == 1 ? "0" + x : x }
                                return "#" + pad((+r).toString(16)) + pad((+g).toString(16)) + pad((+b).toString(16));
                            });
                        }

                        constant.properties[i].value = value;
                    }

                    prototype.remove();
                }
            }
        }),

        ThemeBuilder = kendo.Observable.extend({
            init: function(templateInfo, constants) {
                var that = this,
                    themeColorsDataSource;

                that.templateInfo = templateInfo;

                that.constants = constants;

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
                    .attr("id", "kendo-themebuilder-wrapper")
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

                var serializedVariables = that.constants.serialize() +
                    // TODO: extract image-folder and texture url from skin
                    '\n@image-folder: "BlueOpal";' +
                    '\n@texture-url: "BlueOpal/gradient.png";' +
                    '\n@loading-panel-color: #fff;' +
                    '\n@group-background-color: #fff;' +
                    '\n@shadow-color: #aaa;' +
                    '\n@shadow-inset-color: #555;' +
                    '\n@shadow-light-color: #aaa;' +
                    '\n@select-background-color: #e9e9e9;' +
                    '\n@select-border-color: #aaa;' +
                    '\n@select-hover-background-color: #aaa;' +
                    '\n@input-text-color: #000;\n';

                parser.parse(
                    serializedVariables + that.templateInfo.template,
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
                var constants = this.constants && this.constants.constants,
                    colorPickerTemplate = kendo.template(
                        "# var id = prefix + \"-\" + property.property; #" +
                        "<label for='#= id #'>#= property.label #</label>" +
                        "<input id='#= id #' value='#= property.value #' />"
                    ),
                    propertyGroupTemplate = kendo.template(
                        "<li>#= title #" +
                            "<div class='styling-options'>" +
                                "# for (var i = 0, len = properties.length; i < len; i++) { #" +
                                    "#= propertyTemplate({" +
                                        "property: properties[i]," +
                                        "prefix: prefix" +
                                    "}) #" +
                                "# } #" +
                            "</div>" +
                        "</li>"
                    );

                $(kendo.template(
                    "<div id='kendo-themebuilder'>" +
                        "<button type='button' class='k-items-collapse k-button'>Collapse panels</button>" +
                        "<ul id='stylable-elements'>" +
                            $.map(constants || [], function(x) {
                                return propertyGroupTemplate($.extend(x, {
                                    propertyTemplate: colorPickerTemplate
                                }));
                            }).join("").replace(/(#[a-z0-9]+)/gi, "\\$1") +
                        "</ul>" +
                        "<button type='button' class='k-action-download k-button'>Download</button>" +
                    "</div>"
                )({}))
                    .appendTo(document.body);
            }
        });

    kendo.ui.plugin("ColorPicker", ColorPicker, Component);

    $.extend(kendo, {
        LessConstants: LessConstants,
        ThemeBuilder: ThemeBuilder
    });
})(jQuery, kendo);
