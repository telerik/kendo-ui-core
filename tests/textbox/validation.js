(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        input,
        STATE_INVALID ="k-state-invalid",
        keyPressA = $.Event("keypress", { keyCode: 65 });

    module("kendo.ui.NumericTextBox validation", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("input has hidden decoration by default.", function () {
        var textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        ok(!textbox._inputWrapper.hasClass(STATE_INVALID));
        equal(textbox._validationIcon.css("display"), "none");
    });

    test("the keypress event adds invalid decoration.", function () {
        var textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");
        textbox.element.trigger(keyPressA);

        ok(textbox._inputWrapper.hasClass(STATE_INVALID));
        notEqual(textbox._validationIcon.css("display"), "none");
    });

    test("invalid decoration is removed after keyup.", function () {
        var textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");
        textbox.element
            .trigger(keyPressA)
            .trigger( $.Event("keyup"));

        ok(!textbox._inputWrapper.hasClass(STATE_INVALID));
        equal(textbox._validationIcon.css("display"), "none");
    });
})();
