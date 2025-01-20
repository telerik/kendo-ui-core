import '@progress/kendo-ui/src/kendo.maskedtextbox.js';
import { asyncTest } from '../../helpers/async-utils.js';

let MaskedTextBox = kendo.ui.MaskedTextBox,
    input,
    STATE_INVALID = "k-invalid",
    keyPressA = $.Event("keypress", { keyCode: 65 });

describe("kendo.ui.MaskedTextBox validation", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("input has hidden decoration by default.", function() {
        let maskedtextbox = new MaskedTextBox(input);

        assert.isOk(!maskedtextbox.wrapper.hasClass(STATE_INVALID));
    });

    it("the keypress event adds invalid decoration for invalid value.", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "0"
        });

        maskedtextbox.value("a");

        assert.isOk(maskedtextbox.wrapper.hasClass(STATE_INVALID));
    });

    it("the keypress event does not add invalid decoration for valid value.", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "0"
        });

        maskedtextbox.value("1");

        assert.isOk(!maskedtextbox.wrapper.hasClass(STATE_INVALID));
    });

    asyncTest("invalid decoration is removed after some time.", function(done) {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "0"
        });

        maskedtextbox.value("a");
        setTimeout(function() {
            done(() => assert.isOk(!maskedtextbox.wrapper.hasClass(STATE_INVALID)));
        }, 120);
    });

    it("on init control must be in valid state.", function() {
        input.val("555 123 4567");
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "(999) 000-0000"
        });

        assert.isOk(!maskedtextbox.wrapper.hasClass(STATE_INVALID));
    });
});
