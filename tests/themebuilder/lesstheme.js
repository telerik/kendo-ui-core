(function() {
    var ThemeBuilder = kendo.ThemeBuilder,
        LessTheme = kendo.LessTheme;


    var constant = function(target, property, values) {
            return {
                target: target,
                property: property,
                values: values
            };
        },
        BGCOLOR = "background-color",
        BORDERCOLOR = "border-color",
        COLOR = "color",
        extend = $.extend;

    module("themebuilder LESS themes (web)");

    function createConstants(constants) {
        return new LessTheme({
            constants: constants
        });
    }

    function updateCssAndInfer(constants, css, doc) {
        constants._updateStyleSheet(css, doc);
        constants.infer(doc);
    }

    test("deserialize() single variable", function() {
        var constants = createConstants({
            "@foo": constant()
        });

        constants.deserialize("@foo: #b4d455;");

        equal(constants.constants["@foo"].value, "#b4d455");
    });

    test("deserialize() multiple variables", function() {
        var constants = createConstants({
            "@foo": constant(),
            "@bar": constant()
        });

        constants.deserialize("@foo: #b4d455;\n@bar: #000;");

        equal(constants.constants["@foo"].value, "#b4d455");
        equal(constants.constants["@bar"].value, "#000");
    });

    test("deserialize() keeps constant types in tact", function() {
        var constants = createConstants({
            "@foo": extend(constant(".foo", BGCOLOR), { value: "#f11f11" })
        });

        constants.deserialize("@foo: #b4d455;");

        equal(constants.constants["@foo"].target, ".foo");
        equal(constants.constants["@foo"].property, BGCOLOR);
    });

    test("deserialize() from CSS", function() {
        var theme = createConstants({
            "@foo": constant(".foo", COLOR)
        });

        theme.deserialize(".foo { color: #cccccc; }", document);

        equal(theme.constants["@foo"].value, "#cccccc");
    });

    sandboxed_test("infer() infers nested className selectors", function(win, doc) {
        var constants = createConstants({
            "@foo": constant(".k-widget .k-input", "font-size")
        });

        updateCssAndInfer(constants, ".k-widget { font-size: 8px; }\n.k-widget .k-input { font-size: 10px; }", doc);

        equal(constants.constants["@foo"].value, "10px");
    });

    sandboxed_test("infer() selectors with multiple classNames", function(wnd, doc) {
        var constants = createConstants({
            "@foo": constant(".foo.bar", "font-size")
        });

        updateCssAndInfer(constants, ".foo { font-size: 8px; }\n.foo.bar { font-size: 10px; }", doc);

        equal(constants.constants["@foo"].value, "10px");
    });

    sandboxed_test("infer() infers nested tagName selectors", function(win, doc) {
        var constants = createConstants({
            "@foo": constant("dl dt", "font-size")
        });

        updateCssAndInfer(constants, "dl { font-size: 8px; }\ndl dt { font-size: 10px; }", doc);

        equal(constants.constants["@foo"].value, "10px");
    });

    sandboxed_test("infer() infers basic property value", function(win, doc) {
        var constants = createConstants({
            "@foo": constant(".k-widget", "font-size")
        });

        updateCssAndInfer(constants, ".k-widget { font-size: 9px; }", doc);

        equal(constants.constants["@foo"].value, "9px");
    });

    sandboxed_test("infer() infers colors correctly", function(win, doc) {
        var constants = createConstants({
            "@foo": constant(".k-widget", "background-color")
        });

        updateCssAndInfer(constants, ".k-widget { background-color: #f11f11; }", doc);

        equal(constants.constants["@foo"].value, "#f11f11");
    });

    sandboxed_test("infer() with multiple constants", function(wnd, doc) {
        var constants = createConstants({
            "@foo": constant(".k-widget", "background-color"),
            "@bar": constant(".k-widget", "border-color")
        });

        constants._updateStyleSheet(
            ".k-widget { background-color: #f11f11; border-color: #f00f00; }", doc
        );

        constants.infer(doc);

        equal(constants.constants["@foo"].value, "#f11f11");
        equal(constants.constants["@bar"].value, "#f00f00");
    });

    sandboxed_test("infer() of border-radius", function(wnd, doc) {
        var constants = createConstants({
            "@foo": constant(".k-widget", "border-radius")
        });

        constants._updateStyleSheet(".k-widget { border-radius: 3px; }", doc);

        constants.infer(doc);

        equal(constants.constants["@foo"].value, "3px");
    });

    sandboxed_test("infer() of computed constants", function(win, doc) {
        var constants = createConstants({
            "@foo": {
                infer: function() {
                    return "10px";
                }
            }
        });

        updateCssAndInfer(constants, ".bar { font-size: 20px; }", doc);

        equal(constants.constants["@foo"].value, "10px");
    });

    sandboxed_test("infer() of readonly constants with value", function(win, doc) {
        var constants = createConstants({
            "@foo": {
                readonly: true,
                value: "10px"
            }
        });

        updateCssAndInfer(constants, ".bar { font-size: 20px; }", doc);

        equal(constants.constants["@foo"].value, "10px");
    });

    sandboxed_test("infer() of selector with tagName", function(win, doc) {
        var constants = createConstants({
            "@foo": constant("a.foo", "font-size")
        });

        updateCssAndInfer(constants, ".foo:link { font-size: 20px; } .foo { font-size: 10px; }", doc);

        equal(constants.constants["@foo"].value, "20px");
    });

    test("source('less') returns less source", 1, function() {
        var constants = createConstants({
            "@foo": extend(constant(".k-widget", "background-color"), { value: "#f00" })
        });

        constants.source("less", function(source) {
            equal(source, "@foo: #f00;\n@import \"theme-template.less\";");
        });
    });

    test("source('css') returns css source", 1, function() {
        var constants = createConstants({
            "@foo": extend(constant(".k-widget", "color"), { value: "#f00" })
        });

        constants.template = ".k-widget { color: @foo; }";

        constants.source("css", function(source) {
            equal(source.replace(/\s|\n/g, ""), ".k-widget{color:#ff0000;}");
        });
    });
})();
