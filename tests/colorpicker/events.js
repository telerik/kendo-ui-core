(function() {
    describe("events", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        function createPicker(options) {
            return $("<input name='foo' />").appendTo(Mocha.fixture).kendoColorPicker(options);
        }

        function selectColor(colorpicker) {
            colorpicker.open();

            colorpicker._selector._select(kendo.parseColor("#f11f11"));
        }

        it("triggers change on input element when selecting color", function() {
            var dom = createPicker();

            var callback = spy();

            dom.bind("change", callback);

            selectColor(dom.data("kendoColorPicker"));

            assert.equal(callback.calls, 1);
        });

        it("does not trigger change when color is not changed", function() {
            var dom = createPicker({ value: "#f11f11" });

            var callback = spy();

            dom.bind("change", callback);

            selectColor(dom.data("kendoColorPicker"));

            assert.isOk(!callback.calls);
        });
    });
}());
