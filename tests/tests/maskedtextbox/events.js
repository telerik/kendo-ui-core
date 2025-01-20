import '@progress/kendo-ui/src/kendo.maskedtextbox.js';
import { asyncTest } from '../../helpers/async-utils.js';

let MaskedTextBox = kendo.ui.MaskedTextBox,
    input;

describe("kendo.ui.MaskedTextBox events", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    asyncTest("MaskedTextBox raises widget change event", function(done) {
        let maskedtextbox = new MaskedTextBox(input, {
            change: function() {
                done(() => assert.isOk(true));
            }
        });

        input.focus();
        setTimeout(function() {
            input.val("test");
            input.blur();
        });
    });

    it("MaskedTextBox raises input change event", function() {
        let maskedtextbox = new MaskedTextBox(input);

        input.on("change", function() {
            assert.isOk(true);
        });

        input.focus();
        input.val("test");
        input.blur();
    });

    it("MaskedTextBox raises change event on ENTER", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "LLLL",
            change: function() {
                assert.isOk(true);
            }
        });

        input.focus();
        input.val("test");
        input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });
    });
});
