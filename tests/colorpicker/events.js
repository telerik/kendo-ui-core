(function() {
    module("events", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("triggers blur on input element when selecting color", function() {
        var dom = $("<input name='foo' />").appendTo(QUnit.fixture).kendoColorPicker();

        var called = false;

        dom.bind("blur", function() {
            called = true;
        });

        var colorpicker = dom.data("kendoColorPicker");

        colorpicker.open();

        $("input.k-color-value")
            .val("#f11f11")
            .trigger({ type: "keydown", keyCode: kendo.keys.ENTER });

        ok(called);
    });
})();
