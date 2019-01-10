(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        input,
        STATE_INVALID = "k-state-invalid",
        keyPressA = $.Event("keypress", { keyCode: 65 });

    describe("kendo.ui.NumericTextBox validation", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("input has hidden decoration by default.", function() {
            var textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

            assert.isOk(!textbox._inputWrapper.hasClass(STATE_INVALID));
            assert.equal(textbox._validationIcon.css("display"), "none");
        });

        it("the keypress event adds invalid decoration.", function() {
            var textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");
            textbox.element.trigger(keyPressA);

            assert.isOk(textbox._inputWrapper.hasClass(STATE_INVALID));
            assert.notEqual(textbox._validationIcon.css("display"), "none");
        });

        it("invalid decoration is removed after keyup.", function() {
            var textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");
            textbox.element
                .trigger(keyPressA)
                .trigger($.Event("keyup"));

            assert.isOk(!textbox._inputWrapper.hasClass(STATE_INVALID));
            assert.equal(textbox._validationIcon.css("display"), "none");
        });


        it("hidden invalid decoration on focusout.", function() {
            var textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");
            textbox.element
                .trigger(keyPressA)
                .focusout();

            assert.isOk(!textbox._inputWrapper.hasClass(STATE_INVALID));
            assert.equal(textbox._validationIcon.css("display"), "none");
        });
    });
}());
