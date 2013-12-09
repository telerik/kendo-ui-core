(function() {
    var ThemeCollection = kendo.ThemeCollection,
        JsonConstants = kendo.JsonConstants,
        LessTheme = kendo.LessTheme;

    module("themebuilder themecollection");

    test("update method updates variables in themes", function() {
        var collection = new ThemeCollection([
                new LessTheme({
                    constants: { "@foo": {} }
                })
            ]),
            color = "#f1f1f1";

        collection.update("@foo", color);

        equal(collection[0].constants["@foo"].value, color);
    });

    test("applyTheme method applies theme to target document", 1, function() {
        var less = new LessTheme({
                constants: { "@foo": { value: "#ff0000" } }
            }),
            collection = new ThemeCollection([ less ]);

        less.applyTheme = function() {
            ok(true);
        };

        collection.apply(document);
    });

    test("apply does not depend on dataviz", 1, function() {
        var json = new JsonConstants({
                constants: { "@foo": { value: "#ff0000" } }
            }),
            collection = new ThemeCollection([ json ]);

        var dataviz = kendo.dataviz;
        try {
            kendo.dataviz = null;
            collection.apply(document);
            ok(true);
        } finally {
            kendo.dataviz = dataviz;
        }
    });
})();
