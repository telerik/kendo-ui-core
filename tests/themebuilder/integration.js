(function() {
    var ThemeBuilder = kendo.ThemeBuilder,
        LessTheme = kendo.LessTheme,
        JsonConstants = kendo.JsonConstants,
        constant = function(target, property, values) {
            return {
                target: target,
                property: property,
                values: values
            };
        },
        BGCOLOR = "background-color",
        BORDERCOLOR = "border-color",
        COLOR = "color";

    module("themebuilder integration", {
        teardown: function() {
            kendo.destroy($("#kendo-themebuilder"));
            $("#kendo-themebuilder, head style[title='themebuilder']").remove();
        }
    });

    function updateStyleSheet(cssText, doc) {
        LessTheme.prototype._updateStyleSheet(cssText, doc);
    }

    sandboxed_test("updateStyleSheet() adds CSS to document", function(wnd, doc, $) {
        updateStyleSheet(".foo { font-size: 8px; }", doc);

        var element = $("<span class='foo' />").appendTo(doc.body);

        equal(element.css("font-size"), "8px");
        equal($("style[title]").length, 1);
    });

    sandboxed_test("updateStyleSheet() updates existing stylesheet", function(wnd, doc, $) {
        updateStyleSheet(".foo { font-size: 8px; }", doc);

        updateStyleSheet("body { font-size: 10px; } .foo { color: #f00; }", doc);

        var element = $("<span class='foo' />").appendTo("body");

        equal($("style[title]").length, 1);
        equal($(".foo").css("font-size"), "10px");
    });

    sandboxed_test("render() renders color picker for box-shadow-color properties", function(wnd, doc, $) {
        var constants = new LessTheme({
                constants: {
                    "@foo-color": constant(".k-widget", "box-shadow")
                }
            }),
            themeBuilder = new ThemeBuilder({
                webConstants: constants,
                webConstantsHierarchy: {
                    "Foos": {
                        "@foo-color": "foo color"
                    }
                }
            }, doc);

        equal(themeBuilder.element.find("span.ktb-colorinput").length, 1);
    });

    sandboxed_test("value of box-shadow color picker gets processed as color", function(wnd, doc, $) {

        var constants = new LessTheme({
                constants: {
                    "@foo-color": constant(".k-widget", "box-shadow")
                }
            });

        updateStyleSheet(".k-widget { box-shadow: 1px 1px 1px #b4d455; }", doc);

        constants.infer(doc);

        equal(constants.serialize(), "@foo-color: #b4d455;");
    });

    sandboxed_test("value of box-shadow color picker with inset shadow", function(wnd, doc, $) {

        var constants = new LessTheme({
                constants: {
                    "@foo-color": constant(".k-widget", "box-shadow")
                }
            });

        updateStyleSheet(".k-widget { box-shadow: inset 1px 1px 1px #b4d455; }", doc);

        constants.infer(doc);

        equal(constants.serialize(), "@foo-color: #b4d455;");
    });

    sandboxed_test("LessTheme are inferred on init", function(wnd, doc, $) {
        var constants = new LessTheme(),
            inferred = false;

        constants.infer = function() {
            inferred = true;
        };

        var themebuilder = new ThemeBuilder({ webConstants: constants }, doc);

        ok(inferred);
    });

    sandboxed_test("_propertyChange updates constant", function(wnd, doc, $) {
        var color = "#b4d455",
            constants = new LessTheme({
                constants: {
                    "@foo": constant(".k-widget", "background-color")
                }
            }),
            themebuilder = new ThemeBuilder({
                webConstants: constants
            }, doc);

        themebuilder._propertyChange({
            value: color,
            name: "@foo"
        });

        equal(constants.constants["@foo"].value, color);
    });

    sandboxed_test("changing input value triggers _propertyChange", function(wnd, doc, $) {
        expect(2);
        var color = "#b4d455",
            themebuilder = new ThemeBuilder({
                webConstants: new LessTheme({
                    constants: {
                        "@foo": constant(".k-widget", "background-color")
                    }
                }),
                webConstantsHierarchy: {
                    "Foos": {
                        "@foo": "foo color"
                    }
                }
            }, doc);

        themebuilder._propertyChange = function(e) {
            equal(e.name, "@foo");
            equal(e.value, color);
        };

        var colorInput = themebuilder.element.find("[id='@foo']").data("kendoColorInput");

        colorInput.value(color);
        colorInput.trigger("change");
    });

    sandboxed_test("_propertyChange updates dataviz constant", function(wnd, doc, $) {
        var color = "#b4d455",
            constants = new JsonConstants({
                constants: {
                    "title.color": { property: "color" }
                }
            }),
            themebuilder = new ThemeBuilder({
                datavizConstants: constants
            }, doc);

        constants.applyTheme = $.noop;

        themebuilder._propertyChange({
            value: color,
            name: "title.color"
        });

        equal(constants.constants["title.color"].value, color);
    });
})();
