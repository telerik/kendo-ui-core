;(function($, kendo) {

    var proxy = $.proxy,
        extend = $.extend,
        map = $.map,
        CLICK = "click",
        CHANGE = "change",
        ui = kendo.ui,
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
                    i, name;

                for (i = 0; i < accessors.length - 1; i++) {
                    name = accessors[i];

                    if (!obj[name]) {
                        obj[name] = {};
                    }

                    obj = obj[name];
                }

                obj[accessors[accessors.length - 1]] = value;

                return object;
            };
        },
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

                if (rgbValuesRe.test(value)) {
                    value = toHex(value);
                }

                if (!value) {
                    value = "transparent";
                }

                that.value(value);

                if (changeHandler) {
                    changeHandler.call(that, {
                        name: that.element.attr("id"),
                        value: that.element.val()
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
        hexValueRe = /^#([0-9a-f]{3}){1,2}$/i,
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
        lessConstantPairRe = /(@[a-z\-]+):\s*(.*)/i,
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
                return map(this.constants, function(item, key) {
                    return key + ": " + item.value + ";";
                }).join("\n");
            },

            deserialize: function(content) {
                var that = this;

                $.each(content.split(lessEOLRe), function() {
                    var result = lessConstantPairRe.exec(this);

                    if (result) {
                        that.update(result[1], result[2]);
                    }
                });
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
            }
        }),

        ThemeBuilder = kendo.Observable.extend({
            init: function(templateInfo, targetDocument) {
                var that = this;

                templateInfo = that.templateInfo = templateInfo || {};
                that.targetDocument = targetDocument || (window.parent || window).document;

                var constants = that.constants = templateInfo.constants;

                that.webConstantsHierarchy = templateInfo.webConstantsHierarchy;
                that.datavizConstantsHierarchy = templateInfo.datavizConstantsHierarchy;

                if (constants) {
                    constants.infer(that.targetDocument);
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

                $(".stylable-elements")
                    .kendoPanelBar()
                    .find(".ktb-colorpicker").kendoColorPicker({
                        change: changeHandler
                    }).end()
                    .find(".ktb-combo")
                        .each(function() {
                            var data = constants ? constants.constants[this.id].values : [];

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
                    }).end();

                $(".ktb-action-get-css,.ktb-action-get-less").on(CLICK, proxy(that.showSource, that));
                $(".ktb-action-show-import").on(CLICK, proxy(that.showImport, that));
                $(".ktb-action-create-web,.ktb-action-create-dataviz").on(CLICK, proxy(that.showSuite, that));
                $(".ktb-action-back").on(CLICK, proxy(that.hideOverlay, that));
                $(".ktb-action-back-to-suites").on(CLICK, proxy(that.showSuiteChooser, that));
                $(".ktb-action-import").on(CLICK, proxy(that.importTheme, that));

                that._track();
            },
            showSuiteChooser: function(e) {
                $("#suite-chooser").slideDown("fast", function() {
                    $("#create-web,#create-dataviz").hide();
                });
            },
            showSuite: function(e) {
                e.preventDefault();

                var web = $(e.target).hasClass("ktb-action-create-web");

                $(web ? "#create-web" : "#create-dataviz").show();

                $("#suite-chooser").slideUp();
            },
            showSource: function(e) {
                e.preventDefault();

                var less = $(e.target).hasClass("ktb-action-get-less");

                this._generateTheme(function(constants, css) {
                    constants += '\n@import "template.less";';
                    $("#download-overlay").slideDown()
                        .find("textarea").val(less ? constants : css);
                });
            },
            showImport: function(e) {
                e.preventDefault();

                $("#import-overlay").slideDown()
                    .find("textarea")
                        .val("/*************************\n" +
                             "* paste LESS or CSS here *\n" +
                             "*************************/")
                        .select();
            },
            importTheme: function(e) {
                e.preventDefault();

                var themeContent = $(e.target).closest(".ktb-view").find("textarea").val(),
                    constants = this.constants;

                if (lessConstantPairRe.test(themeContent)) {
                    constants.deserialize(themeContent);
                } else {
                    this.updateStyleSheet(themeContent);

                    constants.infer();
                }

                this._propertyChange({});

                var clientObjects = {
                    "ktb-colorpicker": "kendoColorPicker",
                    "ktb-numeric": "kendoNumericTextBox",
                    "ktb-combo": "kendoComboBox"
                };

                $("input.ktb-colorpicker,input.ktb-numeric,input.ktb-combo").each(function() {
                    var that = this,
                        dataType = that.className.replace(/k-formatted-value|k-input|\s+/gi, ""),
                        clientObject = $(that).data(clientObjects[dataType]);

                    if (clientObject) {
                        clientObject.value(constants.constants[that.id].value);
                    }
                });
            },
            hideOverlay: function(e) {
                e.preventDefault();

                $(".ktb-overlay:visible").slideUp();
            },
            _generateTheme: function(callback) {
                var constants = this.constants.serialize();
                (new window.less.Parser()).parse(
                    constants + this.templateInfo.template,
                    function (err, tree) {
                        var console = window.console;

                        if (err && console) {
                            return console.error(err);
                        }

                        callback(constants, tree.toCSS());
                    }
                );
            },
            _propertyChange: function(e) {
                var that = this;

                if (/^@/.test(e.name)) {
                    // LESS constant changed
                    that.constants.update(e.name, e.value);

                    that._generateTheme(function(constants, css) {
                        that.updateStyleSheet(css);
                    });
                } else {
                    // DataViz property changed
                    var options = safeSetter(e.name)({}, e.value);
                    that.updateDataVizTheme(options);
                }
            },
            updateStyleSheet: function(cssText) {
                var style = $("style[title='themebuilder']")[0],
                    doc = this.targetDocument;

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
            _track: function() {
                var urchinCode = "UA-23480938-1",
                    domain = ".kendoui.com",
                    url = "/themebuilder-bookmarklet";

                function rand(min, max) {
                    return min + Math.floor(Math.random() * (max - min));
                }

                var i=1000000000,
                    utmn=rand(i,9999999999), //random request number
                    cookie=rand(10000000,99999999), //random cookie number
                    random=rand(i,2147483647), //number under 2147483647
                    today=(new Date()).getTime(),
                    win = window.location,
                    img = new Image(),
                    urchinUrl = 'https://www.google-analytics.com/__utm.gif?utmwv=1.3&utmn='+
                        utmn+'&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn='+
                        domain+'&utmr='+win+'&utmp='+
                        url+'&utmac='+
                        urchinCode+'&utmcc=__utma%3D'+
                        cookie+'.'+random+'.'+today+'.'+today+'.'+
                        today+'.2%3B%2B__utmb%3D'+
                        cookie+'%3B%2B__utmc%3D'+
                        cookie+'%3B%2B__utmz%3D'+
                        cookie+'.'+today+
                        '.2.2.utmccn%3D(referral)%7Cutmcsr%3D' + win.host + '%7Cutmcct%3D' + win.pathname + '%7Cutmcmd%3Dreferral%3B%2B__utmv%3D'+
                        cookie+'.-%3B';

                // trigger the tracking
                img.src = urchinUrl;
            },
            updateDataVizTheme: function(theme) {
                var doc = this.targetDocument;
                $("[data-role=chart]", doc).each(function() {
                    // get jQuery of target document to access client-side object
                    var win = "defaultView" in doc ? doc.defaultView : doc.parentWindow;
                    var chart = win.$(this).data("kendoChart");

                    kendo.deepExtend(chart.options, theme);
                    chart.refresh();
                });
            },
            render: function() {
                var that = this,
                    template = kendo.template,
                    templateOptions = { paramName: "d", useWithBlock: false },
                    webPropertyGroupTemplate = template(
                        "<li>#= d.title #" +
                            "<div class='styling-options'>" +
                                "# for (var name in d.constants) {" +
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
                    datavizPropertyGroupTemplate = template(
                        "<li>#= d.title #" +
                            "<div class='styling-options'>" +
                                "# for (var name in d.section) { #" +
                                    "<label for='#= name #'>#= d.section[name] || name #</label>" +
                                    "<input id='#= name #' class='ktb-colorpicker' value='#= d.value(name) #' />" +
                                "# } #" +
                            "</div>" +
                        "</li>",
                        templateOptions
                    ),
                    view = template(
                        "<div id='#= d.id #' class='ktb-view#= d.overlay ? ' ktb-overlay' : '' #'>" +
                            "#= d.toolbar ? d.toolbar : '' #" +
                            "<div class='ktb-content'>#= d.content #</div>" +
                        "</div>",
                        templateOptions
                    ),
                    button = template(
                        "<button class='k-button ktb-action-#= d.id #'>#= d.text #</button>",
                        templateOptions
                    );

                $("<div id='kendo-themebuilder'>" +
                    view({
                        id: "download-overlay",
                        overlay: true,
                        toolbar: button({ id: "back", text: "Back" }) +
                                 "<a href='http://www.kendoui.com/documentation/themebuilder.aspx' id='docs-link' target='_blank'>What should I do with this?</a>",
                        content: "<textarea readonly></textarea>"
                    }) +

                    view({
                        id: "import-overlay",
                        overlay: true,
                        toolbar: button({ id: "back", text: "Back" }) + button({ id: "import", text: "Import" }),
                        content: "<textarea></textarea>"
                    }) +

                    view({
                        id: "create-web",
                        toolbar: button({ id: "back-to-suites", text: "Back" }) +
                                 button({ id: "get-css", text: "Get CSS..." }) +
                                 button({ id: "get-less", text: "Get LESS..." }) +
                                 button({ id: "show-import", text: "Import..." }),
                        content: "<ul class='stylable-elements'>" +
                                    map(that.webConstantsHierarchy || {}, function(section, title) {
                                        var matchedConstants = {},
                                            constants = that.constants.constants;

                                        for (var constant in section) {
                                            matchedConstants[constant] = extend({}, constants[constant]);
                                        }

                                        return webPropertyGroupTemplate({
                                            title: title,
                                            constants: matchedConstants,
                                            section: section,
                                            editors: propertyEditors,
                                            processors: processors
                                        });
                                    }).join("") +
                                 "</ul>"
                    }) +

                    view({
                        id: "create-dataviz",
                        toolbar: button({ id: "back-to-suites", text: "Back" }) +
                                 button({ id: "get-json", text: "Get JSON..." }),
                        content: "<ul class='stylable-elements'>" +
                                    map(that.datavizConstantsHierarchy || {}, function(section, title) {
                                        return datavizPropertyGroupTemplate({
                                            title: title,
                                            section: section,
                                            value: function(name) {
                                                return "#ffffff";
                                            }
                                        });
                                    }).join("") +
                                 "</ul>"
                    }) +

                    view({
                        id: "suite-chooser",
                        content: "<p>Create a theme for:</p>" +
                                 "<ul>" +
                                     "<li>" + button({ id: "create-web", text: "Kendo UI Web" }) + "</li>" +
                                     "<li>" + button({ id: "create-dataviz", text: "Kendo UI DataViz" }) + "</li>" +
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
        LessConstants: LessConstants,
        ThemeBuilder: ThemeBuilder
    });
})(jQuery, window.kendo);
