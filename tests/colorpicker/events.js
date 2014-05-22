(function() {
    module("events", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function createPicker(options) {
        return $("<input name='foo' />").appendTo(QUnit.fixture).kendoColorPicker(options);
    }

    function selectColor(colorpicker) {
        colorpicker.open();

        $("input.k-color-value")
            .val("#f11f11")
            .trigger({ type: "keydown", keyCode: kendo.keys.ENTER });
    }

    test("triggers change on input element when selecting color", function() {
        var dom = createPicker();

        var callback = spy();

        dom.bind("change", callback);

        selectColor(dom.data("kendoColorPicker"));

        equal(callback.calls, 1);
    });

    test("does not trigger change when color is not changed", function() {
        var dom = createPicker({ value: "#f11f11" });

        var callback = spy();

        dom.bind("change", callback);

        selectColor(dom.data("kendoColorPicker"));

        ok(!callback.calls);
    });
})();
