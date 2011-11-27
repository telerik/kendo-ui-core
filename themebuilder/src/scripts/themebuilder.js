;(function($, kendo) {

    var proxy = $.proxy,
        CHANGE = "change",
        doc = (window.parent || window).document,
        ui = kendo.ui,
        Widget = ui.Widget,
        colorPicker = "ktb-colorpicker",
        numeric = "ktb-numeric",
        propertyEditors = {
            "color": colorPicker,
            "background-color": colorPicker,
            "border-color": colorPicker,
            "box-shadow": colorPicker,
            "border-radius": numeric,
            "background-image": "ktb-combo"
        },
        processors = {
            "box-shadow": function(value) {
                if (value && value != "none") {
                    return value.replace(/\d+px/g,"").replace(/\s/g, "");
                } else {
                    return "#000000";
                }
            }
        },
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
                var that = this,
                    changeHandler = that.options.colorPickerChange,
                    value = that._updateColorPreview();

                if (value == "transparent") {
                    this.value("#000000");
                }

                that.value(ColorEngine.css2hex(value));

                if (changeHandler) {
                    changeHandler.call(that, {
                        name: that.element.attr("id"),
                        value: that.element.val()
                    });
                }
            },

            _updateColorPreview: function() {
                return $(this.wrapper).find(".k-arrow-down").css("backgroundColor", this.value()).css("backgroundColor");
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
                    property, value, target,
                    cachedPrototype = $("<div style='border-style:solid;' />").appendTo(doc.body),
                    prototype;

                function getInferPrototype(target) {
                    target = $.trim(target);

                    var className = /^\.([a-z\-0-9]+)$/i.exec(target),
                        nestLevels, root, current, parentElement,
                        i, components, tag;

                    // most common scenario: one className
                    if (className) {
                        cachedPrototype[0].className = className[1];
                        return cachedPrototype;
                    } else {
                        // complex selector (multiple classNames / nested elements - parse selector
                        nestLevels = target.split(/\s+/);

                        for (i = 0; i < nestLevels.length; i++) {
                            components = /^([a-z]*)((\.[a-z\-0-9]+)*)/i.exec(nestLevels[i]);
                            tag = components[1];

                            parentElement = current;
                            current = $("<" + (tag || "div") + " />").addClass(components[2].replace(/\./g, " "));

                            if (tag == "a") {
                                current.attr("href", "#");
                            }

                            if (!root) {
                                root = current;
                            } else {
                                parentElement.append(current);
                            }
                        }

                        return root.appendTo(doc.body);
                    }
                }

                for (constant in constants) {
                    constant = constants[constant];

                    if (constant.infer) {
                        // computed constant
                        constant.value = constant.infer();
                    } else if (!(constant.readonly && constant.value)) {
                        // editable constant with no pre-set value
                        prototype = getInferPrototype(constant.target);

                        property = constant.property;
                        target = prototype.add(prototype.find("*:last")).last();

                        if (property == "border-color") {
                            value = target.css("border-top-color");
                        } else if (property == "border-radius") {
                            value = target.css("-moz-border-radius-topleft") ||
                                    target.css("-webkit-border-top-left-radius") ||
                                    target.css("border-top-left-radius") ||
                                    "0px";
                        } else {
                            value = target.css(property);
                        }

                        if (rgbValuesRe.test(value)) {
                            value = value.replace(rgbValuesRe, function(match, r, g, b) {
                                function pad(x) { return x.length == 1 ? "0" + x : x }
                                return "#" + pad((+r).toString(16)) +
                                             pad((+g).toString(16)) +
                                             pad((+b).toString(16));
                            });
                        }

                        if (processors[property]) {
                            value = processors[property](value);
                        }

                        constant.value = value;

                        if (prototype[0] != cachedPrototype[0]) {
                            prototype.remove();
                        }
                    }
                }

                cachedPrototype.remove();
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

                that.element = $("#kendo-themebuilder");

                function changeHandler(e) {
                    var value = this.value();

                    if (/^\d+$/.test(value) && this.element.is(".ktb-numeric")) {
                        value = value + "px";
                    }

                    that._propertyChange({
                        name: this.element[0].id,
                        value: value
                    });
                }

                $("#stylable-elements")
                    .kendoPanelBar()
                    .find(".ktb-colorpicker").kendoColorPicker({
                        change: changeHandler
                    }).end()
                    .find(".ktb-combo")
                        .each(function() {
                            var data = constants ? constants.constants[this.id].values : [];

                            data.splice(0, 0, { text: "unchanged", value: this.value });

                            data = $.map(data, function(x) {
                                return { text: x.text, value: x.value.replace(/"|'/g, "") };
                            });

                            $(this).kendoComboBox({
                                autoBind: true,
                                template: "<span class='ktb-texture-preview k-header' style='background-image:${ data.value };' />",
                                change: changeHandler,
                                dataSource: new kendo.data.DataSource({
                                    data: data
                                })
                            });
                        })
                    .end()
                    .find(".ktb-numeric").kendoNumericTextBox({
                        min: 0,
                        max: 50,
                        step: 1,
                        format: "#px",
                        change: changeHandler
                    }).end();

                $(".ktb-action-get-css,.ktb-action-get-less").click(proxy(that.showSource, that));
                $(".ktb-action-back").click(proxy(that.hideDownload, that));
            },
            showSource: function(e) {
                e.preventDefault();

                var less = $(e.target).hasClass("ktb-action-get-less");

                this._generateTheme(function(constants, css) {
                    $("#download-overlay").slideDown()
                        .find("textarea").val(less ? constants : css);
                });
            },
            hideDownload: function(e) {
                e.preventDefault();

                $("#download-overlay").slideUp();
            },
            _generateTheme: function(callback) {
                var constants = this.constants.serialize();
                (new less.Parser()).parse(
                    constants + this.templateInfo.template,
                    function (err, tree) {
                        if (err && console) {
                            return console.error(err);
                        }

                        callback(constants, tree.toCSS());
                    }
                );
            },
            _propertyChange: function(e) {
                var that = this;

                that.constants.update(e.name, e.value);

                that._generateTheme(function(constants, css) {
                    that.updateStyleSheet(css);
                });
            },
            updateStyleSheet: function(cssText) {
                var style = $("style[title='themebuilder']")[0];

                if (style) {
                    style.parentNode.removeChild(style);
                }

                style = doc.createElement("style");
                style.setAttribute("title", "themebuilder");

                $("head", doc.documentElement)[0].appendChild(style);

                if (style.styleSheet) {
                    style.styleSheet.cssText = cssText;
                } else {
                    style.appendChild(doc.createTextNode(cssText));
                }
            },
            render: function() {
                var that = this,
                    propertyGroupTemplate = kendo.template(
                        "<li>#= title #" +
                            "<div class='styling-options'>" +
                                "# for (var name in constants) {" +
                                    "var c = constants[name];" +
                                    "if (c.readonly) continue; #" +
                                    "<label for='#= name #'>#= section[name] || name #</label>" +
                                    "<input id='#= name #' class='#= editors[c.property] #' " +
                                           "value='#= processors[c.property] ? processors[c.property](c.value) : c.value #' />" +
                                "# } #" +
                            "</div>" +
                        "</li>"
                    );

                $("<div id='kendo-themebuilder'>" +
                        "<div id='download-overlay' class='ktb-view'>" +
                            "<button class='ktb-action-back k-button'>Back</button>" +
                            "<div class='ktb-content'>" +
                                "<textarea readonly></textarea>" +
                            "</div>" +
                        "</div>" +
                        "<div id='advanced-mode' class='ktb-view'>" +
                            "<button class='ktb-action-get-css k-button'>Get CSS...</button>" +
                            "<button class='ktb-action-get-less k-button'>Get LESS...</button>" +
                            "<div class='ktb-content'>" +
                                "<ul id='stylable-elements'>" +
                                    $.map(that.constantsHierarchy || {}, function(section, title) {
                                        var matchedConstants = {},
                                            constants = that.constants.constants;

                                        for (var constant in section) {
                                            matchedConstants[constant] = $.extend({}, constants[constant]);
                                        }

                                        return propertyGroupTemplate({
                                            title: title,
                                            constants: matchedConstants,
                                            section: section,
                                            editors: propertyEditors,
                                            processors: processors
                                        });
                                    }).join("") +
                                "</ul>" +
                            "</div>" +
                        "</div>" +
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
