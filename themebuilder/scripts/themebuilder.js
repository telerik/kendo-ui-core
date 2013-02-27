;(function($, kendo) {

    var proxy = $.proxy,
        extend = $.extend,
        map = $.map,
        CLICK = "click",
        CHANGE = "change",
        ui = kendo.ui,
        colorPicker = "ktb-colorpicker",
        numeric = "ktb-numeric",
        ObservableObject = kendo.data.ObservableObject,
        propertyEditors = {
            "color": colorPicker,
            "background-color": colorPicker,
            "border-color": colorPicker,
            "box-shadow": colorPicker,
            "border-radius": numeric,
            "background-image": "ktb-combo",
            "opacity": "ktb-opacity"
        },
        whitespaceRe = /\s/g,
        processors = {
            "box-shadow": function(value) {
                if (value && value != "none") {
                    return value.replace(/((\d+(px|em))|inset)/g,"").replace(whitespaceRe, "");
                } else {
                    return "#000000";
                }
            }
        },
        safeSetter = function(expression) {
            return function(object, value) {
                var obj = object,
                    accessors = expression.split("."),
                    i, name, arrayName,
                    arrayRe = /\[(\d+)\]/,
                    // use the containing window Array constructor due to deepExtend array check
                    arr = (window.parent || window).Array;

                for (i = 0; accessors[i]; i++) {
                    name = accessors[i];

                    if (arrayRe.test(name)) {
                        arrayName = name.substring(0, name.indexOf("["));

                        if (!obj[arrayName]) {
                            obj[arrayName] = new arr();
                        }

                        obj[arrayName][parseInt(arrayRe.exec(name)[1], 10)] = value;

                        break;
                    } else {
                        if (!obj[name]) {
                            obj[name] = {};
                        }

                        if (i == accessors.length - 1) {
                            obj[name] = value;
                        } else {
                            obj = obj[name];
                        }
                    }
                }

                return object;
            };
        },
        ColorPicker = ui.ComboBox.extend({
            init: function(element, options) {
                if (options && options.change) {
                    options.colorPickerChange = options.change;
                    delete options.change;
                }

                ui.ComboBox.fn.init.call(this, element, options);

                this.list.width(210);
                this.popup.options.origin = "bottom right";
                this.popup.options.position = "top right";

                this._updateColorPreview();

                if (!this.element.val()) {
                    this.value("transparent");
                }

                this.bind(CHANGE, proxy(this._colorChange, this));

                this.wrapper.addClass("k-colorpicker")
                    .find(".k-colorpicker").removeClass(".k-colorpicker");
            },

            _colorChange: function() {
                var changeHandler = this.options.colorPickerChange,
                    value = this._updateColorPreview();

                if (rgbValuesRe.test(value)) {
                    value = toHex(value);
                }

                if (!value) {
                    value = "transparent";
                }

                this.value(value);

                if (changeHandler) {
                    changeHandler.call(this, {
                        name: this.element.attr("id"),
                        value: this.element.val()
                    });
                }
            },

            value: function(value) {

                var result = ui.ComboBox.fn.value.call(this, value);

                if (value) {
                    this._updateColorPreview(value);
                }

                return result;
            },

            _updateColorPreview: function(value) {
                return $(this.wrapper).find(".k-i-arrow-s").css("backgroundColor", value || this.value()).css("backgroundColor");
            }
        }),
        rgbValuesRe = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,
        toHex = function(value) {
            return value.replace(rgbValuesRe, function(match, r, g, b) {
                function pad(x) {
                    return x.length == 1 ? "0" + x : x;
                }

                return "#" + pad((+r).toString(16)) +
                             pad((+g).toString(16)) +
                             pad((+b).toString(16));
            });
        },
        lessEOLRe = /;$/m,
        LessTheme = ObservableObject.extend({
            init: function(options) {
                options = options || {};
                this.template = options.template || "";
                this.constants = options.constants || {};

                ObservableObject.fn.init.call(this);
            },

            serialize: function() {
                return map(this.constants, function(item, key) {
                    return key + ": " + item.value + ";";
                }).join("\n");
            },

            deserialize: function(themeContent, targetDocument) {
                var lessConstantPairRe = /(@[a-z\-]+):\s*(.*)/i,
                    constant, i,
                    constants = themeContent.split(lessEOLRe);

                if (lessConstantPairRe.test(themeContent)) {
                    for (i = 0; i < constants.length; i++) {
                        constant = lessConstantPairRe.exec(constants[i]);

                        if (constant && this.constants[constant[1]]) {
                            this.constants[constant[1]].value =  constant[2];
                        }
                    }
                } else {
                    this._updateStyleSheet(themeContent, targetDocument);

                    this.infer(targetDocument);
                }
            },

            infer: function(targetDocument) {
                var constants = this.constants, constant,
                    property, value, target,
                    cachedPrototype = $("<div style='border-style:solid;' />").appendTo(targetDocument.body),
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

                        return root.appendTo(targetDocument.body);
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
                            value = toHex(value);
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
            },

            _generateTheme: function(callback) {
                var constants = this.serialize();
                (new window.less.Parser()).parse(
                    constants + this.template,
                    function (err, tree) {
                        var console = window.console;

                        if (err && console) {
                            return console.error(err);
                        }

                        try {
                            callback(constants, tree.toCSS());
                        } catch(e) {
                            console.error(e.message);
                        }
                    }
                );
            },

            _updateStyleSheet: function(cssText, targetDocument) {
                var style = $("style[title='themebuilder']")[0];

                if (style) {
                    style.parentNode.removeChild(style);
                }

                style = targetDocument.createElement("style");
                style.setAttribute("title", "themebuilder");

                $("head", targetDocument.documentElement)[0].appendChild(style);

                if (style.styleSheet) {
                    style.styleSheet.cssText = cssText;
                } else {
                    style.appendChild(targetDocument.createTextNode(cssText));
                }
            },

            applyTheme: function(targetDocument) {
                var that = this;

                this._generateTheme(function(constants, cssText) {
                    that._updateStyleSheet(cssText, targetDocument);
                });
            },

            source: function(format, callback) {
                this._generateTheme(proxy(function(constants, css) {
                    constants += '\n@import "template.less";';

                    if (format == "less") {
                        callback(constants);
                    } else {
                        callback(css);
                    }
                }, this));
            }
        }),

        JsonConstants = ObservableObject.extend({
            init: function(options) {
                options = options || {};
                this.constants = options.constants || {};
                ObservableObject.fn.init.call(this);
            },

            infer: function(targetDocument) {
                var $ = targetDocument.defaultView.$,
                    themeName = "default", theme,
                    constants = this.constants, constant;

                function themeFrom(widgets) {
                    var selector, object;

                    for (selector in widgets) {
                        object = $(selector, targetDocument).data(widgets[selector]);

                        if (object) {
                            return object.options.theme;
                        }
                    }
                }

                themeName = themeFrom({
                    "[data-role=chart]": "kendoChart",
                    "[data-role=radialgauge]": "kendoRadialGauge",
                    "[data-role=lineargauge]": "kendoLinearGauge"
                }) || "default";

                theme = kendo.dataviz.ui.themes[themeName];

                for (constant in constants) {
                    constants[constant].value = kendo.getter(constant, true)(theme);
                }
            },

            deserialize: function(themeContent) {
                var json, constant,
                    constants = this.constants;

                try {
                    themeContent = themeContent.substring(
                        themeContent.indexOf("{"),
                        themeContent.lastIndexOf("}") + 1
                    );

                    json = JSON.parse(themeContent);
                } catch (e) {
                    return;
                }

                for (constant in constants) {
                    constants[constant].value = kendo.getter(constant, true)(json);
                }
            },

            source: function(format, callback) {
                var result = {},
                    constant, constants = this.constants,
                    value;

                for (constant in constants) {
                    value = constants[constant].value;

                    if (value == "transparent") {
                        value = "";
                    }

                    safeSetter(constant)(result, value);
                }

                if (format == "string") {
                    callback("// use as theme: 'newTheme'\n" +
                           "kendo.dataviz.ui.registerTheme('newTheme', " +
                           JSON.stringify(result, null, 4) +
                           ");");
                } else {
                    callback(result);
                }
            },

            applyTheme: function(targetDocument) {
                // work within the JS context of the target document
                var w = "defaultView" in targetDocument ? targetDocument.defaultView : targetDocument.parentWindow;

                this.source("json", function(theme) {
                    w.kendo.dataviz.ui.registerTheme("newTheme", theme);
                });

                function setTheme(selector, component) {
                    $(selector, targetDocument).each(function() {
                        var element = w.$(this),
                            options = element.data(component)._originalOptions,
                            series = options.series;

                        // clean applied series colors to apply new ones
                        if (series) {
                            for (var i = 0; i < series.length; i++) {
                                delete series[i].color;
                                if (series[i].labels) {
                                    delete series[i].labels.color;
                                }
                            }
                        }

                        options.theme = "newTheme";

                        element[component](options);
                    });
                }

                setTheme("[data-role=chart]", "kendoChart");
                setTheme("[data-role=radialgauge]", "kendoRadialGauge");
                setTheme("[data-role=lineargauge]", "kendoLinearGauge");
            }
        }),

        ThemeCollection = kendo.data.ObservableArray.extend({
            update: function(name, value) {
                var i, constant;

                for (i = 0; i < this.length; i++) {
                    constant = this[i].constants[name];

                    if (constant) {
                        constant.value = value;
                    }
                }
            },

            infer: function(targetDocument) {
                for (var i = 0; i < this.length; i++) {
                    this[i].infer(targetDocument);
                }
            },

            valuesFor: function(id) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].constants[id]) {
                        return this[i].constants[id].values;
                    }
                }

                return [];
            },

            apply: function(targetDocument) {
                for (var i = 0; i < this.length; i++) {
                    this[i].applyTheme(targetDocument);
                }
            }
        }),

        ThemeBuilder = kendo.Observable.extend({
            init: function(templateInfo, targetDocument) {
                var themes = [],
                    themebuilder = this;

                templateInfo = this.templateInfo = templateInfo || {};
                this.targetDocument = targetDocument || (window.parent || window).document;

                if (templateInfo.webConstants) {
                    themes.push(templateInfo.webConstants);
                }

                if (templateInfo.datavizConstants) {
                    themes.push(templateInfo.datavizConstants);
                }

                this.themes = new ThemeCollection(themes);

                this.themes.infer(this.targetDocument);

                this.render(templateInfo.webConstantsHierarchy, templateInfo.datavizConstantsHierarchy);

                this.element = $("#kendo-themebuilder");

                function changeHandler() {
                    var value = this.value();

                    if (/^\d+$/.test(value) && this.element.is(".ktb-numeric")) {
                        value = value + "px";
                    }

                    themebuilder._propertyChange({
                        name: this.element[0].id,
                        value: value
                    });
                }

                $(".stylable-elements")
                    .kendoPanelBar()
                    .find(".ktb-colorpicker").kendoColorPicker({
                        change: changeHandler
                    }).end()
                    .find(".ktb-combo")
                        .each(function() {
                            var data = themebuilder.themes.valuesFor(this.id);

                            data.splice(0, 0, { text: "unchanged", value: this.value });

                            data = map(data, function(x) {
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
                    }).end()
                    .find(".ktb-opacity").kendoNumericTextBox({
                        min: 0,
                        max: 1,
                        step: 0.1,
                        spin: changeHandler,
                        change: changeHandler
                    });

                $(".ktb-action-source").on(CLICK, proxy(this.showSource, this));
                $(".ktb-action-show-import").on(CLICK, proxy(this.showImport, this));
                $(".ktb-action-show[data-suite]").on(CLICK, proxy(this.showSuite, this));
                $(".ktb-action-back").on(CLICK, proxy(this.hideOverlay, this));
                $(".ktb-action-back-to-suites").on(CLICK, proxy(this.showSuiteChooser, this));
                $(".ktb-action-import").on(CLICK, proxy(this.importTheme, this));

                this._track();
            },
            showSuiteChooser: function() {
                $("#suite-chooser").slideDown("fast", function() {
                    $(".ktb-view[data-suite]").hide();
                });
            },
            showSuite: function(e) {
                e.preventDefault();

                var suite = $(e.target).data("suite");

                $(".ktb-view[data-suite=" + suite + "]").show();

                $("#suite-chooser").slideUp();
            },
            showSource: function(e) {
                e.preventDefault();

                var format = $(e.target).data("format"),
                    web = format != "string",
                    theme = this.themes[web ? 0 : 1];

                theme.source(format, function(source) {
                    $("#download-overlay").slideDown()
                        .find("textarea").val(source);
                });
            },
            showImport: function(e) {
                e.preventDefault();

                var suite = $(e.target).closest(".ktb-view").data("suite"),
                    format = suite == "web" ? "LESS or CSS" : "JSON";

                $("#import-overlay")
                    .data("suite", suite)
                    .slideDown()
                    .find("textarea")
                        .val("/*************************\n" +
                             "  paste " + format + " here \n" +
                             "*************************/")
                        .select();
            },
            importTheme: function(e) {
                e.preventDefault();

                var view = $(e.target).closest(".ktb-view"),
                    suite = view.data("suite"),
                    themeContent = view.find("textarea").val(),
                    theme = this.themes[suite == "web" ? 0 : 1],
                    clientObjects = {
                        "ktb-colorpicker": "kendoColorPicker",
                        "ktb-numeric": "kendoNumericTextBox",
                        "ktb-combo": "kendoComboBox"
                    };

                theme.deserialize(themeContent, this.targetDocument);

                $("input.ktb-colorpicker,input.ktb-numeric,input.ktb-combo").each(function() {
                    var dataType = this.className.replace(/k-formatted-value|k-input|\s+/gi, ""),
                        clientObject = $(this).data(clientObjects[dataType]),
                        constant = theme.constants[this.id];

                    if (clientObject && constant) {
                        clientObject.value(constant.value);
                    }
                });

                theme.applyTheme(this.targetDocument);
            },
            hideOverlay: function(e) {
                e.preventDefault();

                $(".ktb-overlay:visible").slideUp();
            },
            _propertyChange: function(e) {
                this.themes.update(e.name, e.value);
                this.themes.apply(this.targetDocument);
            },
            _track: function() {
                var urchinCode = "UA-23480938-1",
                    domain = ".kendoui.com",
                    url = "/themebuilder-bookmarklet";

                function rand(min, max) {
                    return min + Math.floor(Math.random() * (max - min));
                }

                var i = 1000000000,
                    utmn = rand(i,9999999999), //random request number
                    cookie = rand(10000000,99999999), //random cookie number
                    random = rand(i,2147483647), //number under 2147483647
                    today = (new Date()).getTime(),
                    win = window.location,
                    img = new Image(),
                    urchinUrl = "https://www.google-analytics.com/__utm.gif?utmwv=1.3&utmn="+
                        utmn+"&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn="+
                        domain+"&utmr="+win+"&utmp="+
                        url+"&utmac="+
                        urchinCode+"&utmcc=__utma%3D"+
                        cookie+"."+random+"."+today+"."+today+"."+
                        today+".2%3B%2B__utmb%3D"+
                        cookie+"%3B%2B__utmc%3D"+
                        cookie+"%3B%2B__utmz%3D"+
                        cookie+"."+today+
                        ".2.2.utmccn%3D(referral)%7Cutmcsr%3D" + win.host + "%7Cutmcct%3D" + win.pathname + "%7Cutmcmd%3Dreferral%3B%2B__utmv%3D"+
                        cookie+".-%3B";

                // trigger the tracking
                img.src = urchinUrl;
            },
            render: function(webConstantsHierarchy, datavizConstantsHierarchy) {
                var that = this,
                    template = kendo.template,
                    templateOptions = { paramName: "d", useWithBlock: false },
                    propertyGroupTemplate = template(
                        "<li>#= d.title #" +
                            "<div class='styling-options'>" +
                                "# for (var name in d.section) {" +
                                    "var c = d.constants[name];" +
                                    "if (c.readonly) continue; #" +
                                    "<label for='#= name #'>#= d.section[name] || name #</label>" +
                                    "<input id='#= name #' class='#= d.editors[c.property] #' " +
                                           "value='#= d.processors[c.property] ? d.processors[c.property](c.value) : c.value #' />" +
                                "# } #" +
                            "</div>" +
                        "</li>",
                        templateOptions
                    ),
                    renderDataAttributes =
                        "# if (d.data) {" +
                        "  for (var name in d.data) { #" +
                            " data-#= name #='#= d.data[name] #'" +
                        "# }" +
                        "} #",
                    view = template(
                        "<div #= d.id ? ' id=\"' + d.id + '\"' : '' #" +
                            " class='ktb-view#= d.overlay ? ' ktb-overlay' : '' #'" +
                            renderDataAttributes +
                            ">#= d.toolbar ? d.toolbar : '' #" +
                            "<div class='ktb-content'>#= d.content #</div>" +
                        "</div>",
                        templateOptions
                    ),
                    button = template(
                        "<button class='k-button ktb-action #= d.action ? ('ktb-action-' + d.action) : '' #'" +
                            renderDataAttributes +
                        ">#= d.text #</button>",
                        templateOptions
                    );

                $("<div id='kendo-themebuilder'>" +
                    view({
                        id: "download-overlay",
                        overlay: true,
                        toolbar: button({ action: "back", text: "Back" }) +
                                 "<a href='http://www.kendoui.com/documentation/themebuilder.aspx' id='docs-link' target='_blank'>What should I do with this?</a>",
                        content: "<textarea readonly></textarea>"
                    }) +

                    view({
                        id: "import-overlay",
                        overlay: true,
                        toolbar: button({ action: "back", text: "Back" }) + button({ action: "import", text: "Import" }),
                        content: "<textarea></textarea>"
                    }) +

                    view({
                        data: { suite: "web" },
                        toolbar: button({ action: "back-to-suites", text: "Back" }) +
                                 button({ action: "source", data: { format: "css" }, text: "Get CSS..." }) +
                                 button({ action: "source", data: { format: "less" }, text: "Get LESS..." }) +
                                 button({ action: "show-import", text: "Import..." }),
                        content: "<ul class='stylable-elements'>" +
                                    map(webConstantsHierarchy || {}, function(section, title) {
                                        return propertyGroupTemplate({
                                            title: title,
                                            constants: that.themes[0].constants || {},
                                            section: section,
                                            editors: propertyEditors,
                                            processors: processors
                                        });
                                    }).join("") +
                                 "</ul>"
                    }) +

                    view({
                        data: { suite: "dataviz" },
                        toolbar: button({ action: "back-to-suites", text: "Back" }) +
                                 button({ action: "source", data: { format: "string" }, text: "Get JSON..." }) +
                                 button({ action: "show-import", text: "Import..." }),
                        content: "<ul class='stylable-elements'>" +
                                    map(datavizConstantsHierarchy || {}, function(section, title) {
                                        return propertyGroupTemplate({
                                            title: title,
                                            constants: that.themes[1].constants || {},
                                            section: section,
                                            editors: propertyEditors,
                                            processors: processors
                                        });
                                    }).join("") +
                                 "</ul>"
                    }) +

                    view({
                        id: "suite-chooser",
                        content: "<p style='text-align: center'>Create a theme for Kendo UI...</p>" +
                                 "<ul class='suite-list'>" +
                                     "<li>" + button({ action: "show", data: { suite: "web" }, text: "Web" }) + "</li>" +
                                     "<li>" + button({ action: "show", data: { suite: "dataviz" }, text: "DataViz" }) + "</li>" +
                                 "</ul>"
                    }) +

                "</div>").appendTo(document.body);
            }
        });

    ColorPicker.fn.options = extend(kendo.ui.ComboBox.fn.options, {
        name: "ColorPicker",
        autoBind: false,
        dataTextField: "text",
        dataValueField: "value",
        template: "<span style='background-color: #= data.value #' "+
                        "class='k-icon k-color-preview' " +
                        "title='#= data.text #'></span> ",
        dataSource: new kendo.data.DataSource({
            data: map(
                ("#c00000,#ff0000,#ffc000,#ffff00,#92d050,#00b050,#00b0f0,#0070c0,#002060,#7030a0," +
                 "#ffffff,#e3e3e3,#c4c4c4,#a8a8a8,#8a8a8a,#6e6e6e,#525252,#363636,#1a1a1a,#000000").split(","), function(x) {
                return { text: x, value: x };
            })
        })
    });

    kendo.ui.plugin(ColorPicker);

    extend(kendo, {
        ThemeCollection: ThemeCollection,
        LessTheme: LessTheme,
        JsonConstants: JsonConstants,
        ThemeBuilder: ThemeBuilder
    });
})(jQuery, window.kendo);
