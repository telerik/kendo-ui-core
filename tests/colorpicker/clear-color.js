(function() {
    describe("clear button", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        function createPicker(options) {
            options = $.extend(options || {}, { clearButton: true, preview: true });
            return $("<input name='foo' />").appendTo(Mocha.fixture).kendoColorPicker(options).data("kendoColorPicker");
        }

        function selectColor(colorpicker) {
            colorpicker.open();

            $("input.k-color-value")
                .val("#f11f11")
                .trigger({ type: "keydown", keyCode: kendo.keys.ENTER });
        }

        function clearColor(colorpicker) {
            colorpicker._selector.element.find(".k-clear-color").getKendoButton().trigger("click");
        }

        it("clear button removes selected color", function() {
            var colorPicker = createPicker();

            selectColor(colorPicker);

            clearColor(colorPicker);

            assert.equal(null, colorPicker.value());
        });

        it("apply button does not set color when color is cleared", function() {
            var colorPicker = createPicker({ buttons: true });

            colorPicker.open();
            colorPicker.value("#f11f11");
            clearColor(colorPicker);
            $(colorPicker._selector.element).find("button.apply").trigger("click");

            assert.equal(null, colorPicker.value());
        });

        it("cancel button does not set cleared color", function() {
            var colorPicker = createPicker({ buttons: true });

            selectColor(colorPicker);
            colorPicker.open();
            clearColor(colorPicker);

            $(colorPicker._selector.element).find("button.cancel").trigger("click");

            assert.equal("#f11f11", colorPicker.value());
        });

        it("closing popup does not set cleared color", function() {
            var colorPicker = createPicker({ buttons: true });

            selectColor(colorPicker);
            colorPicker.open();

            clearColor(colorPicker);
            colorPicker._getPopup().trigger("close");

            assert.equal("#f11f11", colorPicker.value());
        });
    });
}());
