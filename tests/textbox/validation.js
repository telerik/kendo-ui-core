(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        input,
        STATE_INVALID = "k-state-invalid",
        keyDownA = $.Event("keydown", { keyCode: 65 });

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

        it("the input event adds invalid decoration.", function() {
            var textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");
            textbox.element.val("a");
            textbox.element.trigger("input");

            assert.isOk(textbox._inputWrapper.hasClass(STATE_INVALID));
            assert.notEqual(textbox._validationIcon.css("display"), "none");
        });

        it("invalid decoration is removed after keyup.", function() {
            var textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");
            textbox.element
                .trigger(keyDownA)
                .trigger($.Event("keyup"));

            assert.isOk(!textbox._inputWrapper.hasClass(STATE_INVALID));
            assert.equal(textbox._validationIcon.css("display"), "none");
        });


        it("hidden invalid decoration on focusout.", function() {
            var textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");
            textbox.element
                .trigger(keyDownA)
                .focusout();

            assert.isOk(!textbox._inputWrapper.hasClass(STATE_INVALID));
            assert.equal(textbox._validationIcon.css("display"), "none");
        });
    });
}());
