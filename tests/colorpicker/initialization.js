(function() {
    module("FlatColorPicker", {
        teardown: function() {
            $("#qunit-fixture").empty();
        }
    });

    test("input: false does not show input", function() {
        var dom = $("<div />").appendTo("#qunit-fixture").kendoFlatColorPicker({ input: false });

        var input = dom.find(".k-color-value");

        equal(input.css("visibility"), "hidden");
    });

    test("initialization from input nests it into wrapper", function() {
        var dom = $("<input name='foo' />").appendTo("#qunit-fixture").kendoColorPicker();

        equal($(".k-colorpicker [name=foo]").length, 1);
    });
})();
