(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input,
        STATE_INVALID = "k-state-invalid",
        keyPressA = $.Event("keypress", { keyCode: 65 });

    describe("kendo.ui.MaskedTextBox validation", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("input has hidden decoration by default.", function() {
            var maskedtextbox = new MaskedTextBox(input);

            assert.isOk(!maskedtextbox.wrapper.hasClass(STATE_INVALID));
        });

        it("the keypress event adds invalid decoration for invalid value.", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "0"
            });

            maskedtextbox.value("a");

            assert.isOk(maskedtextbox.wrapper.hasClass(STATE_INVALID));
        });

        it("the keypress event does not add invalid decoration for valid value.", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "0"
            });

            maskedtextbox.value("1");

            assert.isOk(!maskedtextbox.wrapper.hasClass(STATE_INVALID));
        });

        it("invalid decoration is removed after some time.", function(done) {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "0"
            });

            maskedtextbox.value("a");
            setTimeout(function() {
                assert.isOk(!maskedtextbox.wrapper.hasClass(STATE_INVALID));
                done();
            }, 120);
        });

        it("on init control must be in valid state.", function() {
            input.val("555 123 4567");
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(999) 000-0000"
            });

            assert.isOk(!maskedtextbox.wrapper.hasClass(STATE_INVALID));
        });
    });
}());