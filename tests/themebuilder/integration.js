(function() {
    console.warn("SKIP: themebuilder integration tests that rely on page sandbox");
    return;
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

    function updateStyleSheet(cssText) {
        LessTheme.prototype._updateStyleSheet(cssText, document);
    }

    test("themebuilder object is available", function() {
        ok(typeof ThemeBuilder == "function");
    });

    test("updateStyleSheet() adds CSS to document", function() {
        updateStyleSheet(".foo { font-size: 8px; }");

        var element = $("<span class='foo' />").appendTo(QUnit.fixture);

        equal(element.css("font-size"), "8px");
        equal($("style[title]").length, 1);
    });

    test("updateStyleSheet() updates existing stylesheet", function() {
        updateStyleSheet(".foo { font-size: 8px; }");

        updateStyleSheet("#qunit-fixture { font-size: 10px; } .foo { color: #f00; }");

        var element = $("<span class='foo' />").appendTo(QUnit.fixture);

        equal($("style[title]").length, 1);
        equal($(".foo").css("font-size"), "10px");
    });

    test("render() renders color picker for box-shadow-color properties", function() {
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
            }, document);

        equal(themeBuilder.element.find("span.ktb-colorinput").length, 1);
    });

    test("value of box-shadow color picker gets processed as color", function() {

        var constants = new LessTheme({
                constants: {
                    "@foo-color": constant(".k-widget", "box-shadow")
                }
            });

        updateStyleSheet(".k-widget { box-shadow: 1px 1px 1px #b4d455; }");

        constants.infer(document);

        equal(constants.serialize(), "@foo-color: #b4d455;");
    });

    test("value of box-shadow color picker with inset shadow", function() {

        var constants = new LessTheme({
                constants: {
                    "@foo-color": constant(".k-widget", "box-shadow")
                }
            });

        updateStyleSheet(".k-widget { box-shadow: inset 1px 1px 1px #b4d455; }");

        constants.infer(document);

        equal(constants.serialize(), "@foo-color: #b4d455;");
    });

    test("LessTheme are inferred on init", function() {
        var constants = new LessTheme(),
            inferred = false;

        constants.infer = function() {
            inferred = true;
        };

        var themebuilder = new ThemeBuilder({ webConstants: constants }, document);

        ok(inferred);
    });

    test("_propertyChange updates constant", function() {
        var color = "#b4d455",
            constants = new LessTheme({
                constants: {
                    "@foo": constant(".k-widget", "background-color")
                }
            }),
            themebuilder = new ThemeBuilder({
                webConstants: constants
            });

        themebuilder._propertyChange({
            value: color,
            name: "@foo"
        });

        equal(constants.constants["@foo"].value, color);
    });

    test("changing input value triggers _propertyChange", function() {
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
            });

        themebuilder._propertyChange = function(e) {
            equal(e.name, "@foo");
            equal(e.value, color);
        };

        var colorInput = themebuilder.element.find("[id='@foo']").data("kendoColorInput");

        colorInput.value(color);
        colorInput.trigger("change");
    });

    test("_propertyChange updates dataviz constant", function() {
        var color = "#b4d455",
            constants = new JsonConstants({
                constants: {
                    "title.color": { property: "color" }
                }
            }),
            themebuilder = new ThemeBuilder({
                datavizConstants: constants
            });

        constants.applyTheme = $.noop;

        themebuilder._propertyChange({
            value: color,
            name: "title.color"
        });

        equal(constants.constants["title.color"].value, color);
    });
})();
