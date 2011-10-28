;(function($, kendo) {

    var proxy = $.proxy,
        CHANGE = "change",
        KENDOWINDOW = "kendoWindow"
        ui = kendo.ui,
        Widget = ui.Widget,
        ShadowInput = Widget.extend({
            init: function(element, options) {
                var that = this;

                ui.Widget.fn.init.call(that, element, options);
            }
        }),
        ColorPicker = ui.ComboBox.extend({
            init: function(element, options) {
                var that = this;

                ui.ComboBox.fn.init.call(that, element, options);

                that._updateColorPreview();

                that.bind(CHANGE, proxy(that._colorChange, that));

                that.wrapper.addClass("k-colorpicker");
            },

            _colorChange: function(e) {
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
                        close: that.removeUpdateHeightHandler
                    });

                $(window).bind("resize.kendoThemeBuilder", $.proxy(that.updateMaxHeight, that));

                that.element = that.content.closest(".k-window")
                    .css({
                        top: 20,
                        left: $(window).width() - 320
                    })
                    .data("kendoThemeBuilder", that)
                    .wrap("<div id='k-tb-wrap' />");

                themeColorsDataSource = new kendo.data.DataSource({
                    data: constants ? constants.colors().map(function(x) {
                        return { text: x, value: x };
                    }) : []
                });

                var propertyChangeProxy = proxy(that._propertyChange, that);

                $("#stylable-elements")
                    .kendoPanelBar({
                        animation: false
                    })
                    .find("input.k-colorpicker").kendoColorPicker({
                        autoBind: false,
                        dataSource: themeColorsDataSource,
                        change: proxy(that._propertyChange, that)
                    })
                    //.find("input.k-numerictextbox").kendoNumericTextBox({
                        //change: proxy(that._propertyChange, that)
                    //});

                $(".k-list-container[id^='@']").appendTo("#k-tb-wrap");

                $(".k-action-download").click(proxy(that.download, that));
            },
            open: function() {
                this.content.data(KENDOWINDOW).open();
            },
            download: function(e) {
                e.preventDefault();

                var that = this,
                    downloadWindowObject,
                    windowWrapper
                    downloadWindow = $("<div>" +
                        "<textarea class='k-content' rows='24' cols='80' readonly>Generating CSS...</textarea>" +
                    "</div>")
                        .kendoWindow({
                            modal: true,
                            width: 600,
                            height: 350,
                            scrollable: false,
                            title: "Your theme is ready!",
                            close: function() {
                                downloadWindowObject.destroy();
                                // TODO: this should be handled by the window
                                $("#k-tb-wrap .k-overlay").remove();
                            }
                        });

                downloadWindowObject = downloadWindow.data(KENDOWINDOW);

                windowWrapper = downloadWindowObject.wrapper;

                windowWrapper.prev(".k-overlay").appendTo("#k-tb-wrap");
                windowWrapper.attr("id", "download-interface").appendTo("#k-tb-wrap");

                downloadWindowObject.center().open();

                (new less.Parser()).parse(
                    that.constants.serialize() + that.templateInfo.template,
                    function (err, tree) {
                        if (err && console) {
                            return console.error(err);
                        }

                        downloadWindow.find("textarea").val(tree.toCSS());
                    }
                );
            },
            updateMaxHeight: function() {
                this.content.data(KENDOWINDOW).options.maxHeight = $(window).height() - 100;
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
                    colorPicker = "k-colorpicker",
                    propertyEditors = {
                        "color": colorPicker,
                        "background-color": colorPicker,
                        "border-color": colorPicker,
                        "border-radius": "k-numerictextbox",
                        "box-shadow": "k-shadowinput"
                    },
                    propertyGroupTemplate = kendo.template(
                        "<li>#= title #" +
                            "<div class='styling-options'>" +
                                "# for (var name in constants) {" +
                                    "var c = constants[name];" +
                                    "if (c.readonly) continue; #" +
                                    "<label for='#= name #'>#= labels[name] || name #</label>" +
                                    "<input id='#= name #' class='#= editors[c.property] #' " +
                                           "value='#= c.value #' />" +
                                "# } #" +
                            "</div>" +
                        "</li>"
                    );

                $("<div id='kendo-themebuilder'>" +
                        "<button class='k-action-download k-button'>Download</button>" +
                        "<ul id='stylable-elements'>" +
                            $.map(that.constantsHierarchy || {}, function(section, title) {
                                var matchedConstants = {},
                                    constants = that.constants.constants;

                                for (var constant in constants) {
                                    if (section.constants.test(constant)) {
                                        matchedConstants[constant] = $.extend({}, constants[constant]);
                                    }
                                }

                                return propertyGroupTemplate($.extend(section, {
                                    title: title,
                                    constants: matchedConstants,
                                    labels: section.labels,
                                    editors: propertyEditors
                                }));
                            }).join("") +
                        "</ul>" +
                    "</div>").appendTo(document.body);
            }
        });

    ColorPicker.fn.options = $.extend(kendo.ui.ComboBox.fn.options, {
        name: "ColorPicker",
        template: "<span style='background-color: ${ data.value }' class='k-icon k-color-preview'></span> " +
                  "<span class='k-color-name'>${ data.text }</span>"
    });

    kendo.ui.plugin(ColorPicker);

    $.extend(kendo, {
        LessConstants: LessConstants,
        ThemeBuilder: ThemeBuilder
    });
})(jQuery, kendo);
