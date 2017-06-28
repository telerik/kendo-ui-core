(function() {
    module("clear button", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function createPicker(options) {
        options = $.extend(options || {}, {clearButton: true, preview: true});
        return $("<input name='foo' />").appendTo(QUnit.fixture).kendoColorPicker(options).data("kendoColorPicker");
    }

    function selectColor(colorpicker) {
        colorpicker.open();

        $("input.k-color-value")
            .val("#f11f11")
            .trigger({ type: "keydown", keyCode: kendo.keys.ENTER });
    }

    function clearColor(colorpicker){
        colorpicker._selector.element.find(".k-clear-color").getKendoButton().trigger("click");
    }

    test("clear button removes selected color", function() {
        var colorPicker = createPicker();

        selectColor(colorPicker);

        clearColor(colorPicker);

        equal(null, colorPicker.value());
    });

    test("apply button does not set color when color is cleared", function() {
        var colorPicker = createPicker({buttons: true});

        colorPicker.open();
        colorPicker.value("#f11f11");
        clearColor(colorPicker);
        $(colorPicker._selector.element).find("button.apply").trigger("click");

        equal(null, colorPicker.value());
    });

    test("cancel button does not set cleared color", function() {
        var colorPicker = createPicker({buttons: true});

        selectColor(colorPicker);
        colorPicker.open();
        clearColor(colorPicker);

        $(colorPicker._selector.element).find("button.cancel").trigger("click");

        equal("#f11f11", colorPicker.value());
    });

    test("closing popup does not set cleared color", function() {
        var colorPicker = createPicker({buttons: true});

        selectColor(colorPicker);
        colorPicker.open();

        clearColor(colorPicker);
        colorPicker._getPopup().trigger("close");

        equal("#f11f11", colorPicker.value());
    });
})();
