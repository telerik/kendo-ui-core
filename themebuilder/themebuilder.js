;(function($, kendo) {

    var proxy = $.proxy,
        CHANGE = "change",
        KENDOWINDOW = "kendoWindow"
        ui = kendo.ui,
        Widget = ui.Widget,
        TextBox = ui.Widget.extend({
            init: function(options) {
                var that = this;

                ui.Widget.fn.init.call(that, element, options);

                that._wrapper();
            },

            _wrapper: function() {
                var that = this,
                    element = that.element,
                    domElement = element[0],
                    wrapper;

                wrapper = element.parent();

                if (!wrapper.is("div.k-widget")) {
                    wrapper = element.wrap("<div />").parent();
                }

                wrapper[0].style.cssText = domElement.style.cssText;
                element.css({
                    width: "100%",
                    height: "auto"
                });

                that._focused = that.element;
                that.wrapper = wrapper
                                  .addClass("k-widget k-textbox k-header")
                                  .addClass(domElement.className);
            }
        }),
        ColorPicker = ui.ComboBox.extend({
            init: function(element, options) {
                var that = this;

                if (options && options.change) {
                    options.colorPickerChange = options.change;
                    delete options.change;
                }

                ui.ComboBox.fn.init.call(that, element, options);

                that.list.width(210);
                that.popup.options.origin = "bottom right";
                that.popup.options.position = "top right";

                that._updateColorPreview();

                that.bind(CHANGE, proxy(that._colorChange, that));

                that.wrapper.addClass("k-colorpicker")
                    .find(".k-colorpicker").removeClass(".k-colorpicker");
            },

            _colorChange: function(e) {
                var that = this;

                that._updateColorPreview();

                // trigger change event?
                if (that.options.colorPickerChange) {
                    that.options.colorPickerChange.call(that, {
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
                        //       see misc / inset shadow
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
                var that = this;

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

                function changeHandler(e) {
                    that._propertyChange({
                        name: this.element[0].id,
                        value: this.value()
                    });
                }

                $("#stylable-elements")
                    .kendoPanelBar({
                        animation: false
                    })
                    .find("input.k-colorpicker").kendoColorPicker({
                        change: changeHandler
                    }).end()
                    .find("input.k-numerictextbox").kendoNumericTextBox({
                        min: 0,
                        max: 50,
                        step: 1,
                        change: changeHandler
                    }).end();

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

                that._generateTheme(function(css) {
                    downloadWindow.find("textarea").val(css);
                });
            },
            updateMaxHeight: function() {
                var windowObject = this.content.data(KENDOWINDOW);

                if (windowObject) {
                    windowObject.options.maxHeight = $(window).height() - 100;
                }
            },
            removeUpdateHeightHandler: function() {
                $(window).unbind("resize.kendoThemeBuilder");
            },
            _generateTheme: function(callback) {
                (new less.Parser()).parse(
                    this.constants.serialize() + this.templateInfo.template,
                    function (err, tree) {
                        if (err && console) {
                            return console.error(err);
                        }

                        callback(tree.toCSS());
                    }
                );
            },
            _propertyChange: function(e) {
                var that = this;

                that.constants.update(e.name, e.value);

                that._generateTheme(function(css) {
                    that.updateStyleSheet(css);
                });
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
                        "box-shadow": colorPicker
                    },
                    processors = {
                        "box-shadow": function(value) {
                            return value;
                        }
                    },
                    propertyGroupTemplate = kendo.template(
                        "<li>#= title #" +
                            "<div class='styling-options'>" +
                                "# for (var name in constants) {" +
                                    "var c = constants[name];" +
                                    "if (c.readonly) continue; #" +
                                    "<label for='#= name #'>#= labels[name] || name #</label>" +
                                    "<input id='#= name #' class='#= editors[c.property] #' " +
                                           "value='#= processors[c.property] ? processors[c.property](c.value) : c.value #' />" +
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
                                    editors: propertyEditors,
                                    processors: processors
                                }));
                            }).join("") +
                        "</ul>" +
                    "</div>").appendTo(document.body);
            }
        });

    ColorPicker.fn.options = $.extend(kendo.ui.ComboBox.fn.options, {
        name: "ColorPicker",
        autoBind: false,
        template: "<span style='background-color: ${ data.value }' "+
                        "class='k-icon k-color-preview' " +
                        "title='${ data.text }'></span> ",
        dataSource: new kendo.data.DataSource({
            data: $.map("#c00000,#ff0000,#ffc000,#ffff00,#92d050,#00b050,#00b0f0,#0070c0,#002060,#7030a0,#ffffff,#e3e3e3,#c4c4c4,#a8a8a8,#8a8a8a,#6e6e6e,#525252,#363636,#1a1a1a,#000000".split(","), function(x) {
                return { text: x, value: x };
            })
        })
    });

    kendo.ui.plugin(ColorPicker);

    $.extend(kendo, {
        LessConstants: LessConstants,
        ThemeBuilder: ThemeBuilder
    });
})(jQuery, kendo);
