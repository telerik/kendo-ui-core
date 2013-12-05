(function() {
    module("FlatColorPicker", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        },
    });

    test("input: false does not show input", function() {
        var dom = $("<div />").appendTo(QUnit.fixture).kendoFlatColorPicker({ input: false });

        var input = dom.find(".k-color-value");

        equal(input.css("visibility"), "hidden");
    });

    test("initialization from input nests it into wrapper", function() {
        var dom = $("<input name='foo' />").appendTo(QUnit.fixture).kendoColorPicker();

        equal($(".k-colorpicker [name=foo]").length, 1);
    });
})();
