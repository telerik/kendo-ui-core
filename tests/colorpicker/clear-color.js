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

            colorpicker._selector._select(kendo.parseColor("#f11f11"));
        }

        function clearColor(colorpicker) {
            colorpicker._selector.element.find(".k-coloreditor-reset").trigger("click");
        }

        it("clear button removes selected color", function() {
            var colorPicker = createPicker();

            selectColor(colorPicker);

            clearColor(colorPicker);
            $(colorPicker._selector.element).find("button.k-coloreditor-apply").trigger("click");

            assert.equal(null, colorPicker.value());
        });

        it("apply button does not set color when color is cleared", function() {
            var colorPicker = createPicker({ buttons: true });

            selectColor(colorPicker);
            clearColor(colorPicker);
            $(colorPicker._selector.element).find("button.k-coloreditor-apply").trigger("click");

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
