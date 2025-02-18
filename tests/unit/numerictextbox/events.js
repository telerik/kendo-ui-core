import '@progress/kendo-ui/src/kendo.numerictextbox.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let NumericTextBox = kendo.ui.NumericTextBox,
    input;

describe("kendo.ui.NumericTextBox Events", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("_change should call value() method", function() {
        let textbox = new NumericTextBox(input, {
            change: function() {
                assert.isOk(true);
                assert.equal(textbox.value(), 22);
            }
        });

        textbox._change("22");
    });

    it("raise DOM change", function() {
        let textbox = new NumericTextBox(input);

        input.bind("change", function() {
            assert.isOk(true);
            assert.equal(textbox.value(), 22);
        });

        textbox._change("22");
    });

    it("does not force element's DOM change event when the user manually edits the value and presses 'Enter'", function() {
        let textbox = new NumericTextBox(input);

        input.bind("change", function() {
            assert.isOk(false);
        });

        input.focus().val(1)
            .trigger($.Event("keydown", { keyCode: 49 }))
            .trigger($.Event("keydown", { keyCode: 13 }));
    });

    it("raise change on enter", function() {
        let textbox = new NumericTextBox(input);

        input.bind("change", function() {
            assert.isOk(true);
            assert.equal(textbox.value(), 22);
        });

        input.focus().val("22").trigger({ type: "keydown", keyCode: 13 });
    });

    it("click arrow should focus input", function() {
        let textbox = new NumericTextBox(input);

        textbox._upArrow.mousedown();

        assert.equal(input[0], document.activeElement);
    });

    it("value() should not raise change event", function() {
        let textbox = new NumericTextBox(input, {
            change: function() {
                assert.isOk(false);
            }
        });

        textbox.value("22");
        textbox._blur();
    });

    asyncTest("raise spin event", function(done) {
        let textbox = new NumericTextBox(input, {
            value: 10,
            spin: function() {
                done(() => {
                    assert.isOk(true);
                    assert.equal(textbox.value(), 11);
                });
            }
        });

        textbox._step(1);
    });

    asyncTest("raise spin event on up arrrow", function(done) {
        let textbox = new NumericTextBox(input, {
            value: 10,
            spin: function() {
                done(() => {
                    assert.isOk(true);
                    assert.equal(textbox.value(), 11);
                });
            }
        });

        input.trigger({
            type: "keydown",
            keyCode: kendo.keys.UP
        });
    });

    it("focus should hide the _text and show the input value", function() {
        let textbox = new NumericTextBox(input);

        let origin = window.setTimeout;
        window.setTimeout = function(func) { func(); };

        textbox._text.focus();

        assert.isOk(!textbox._text.is(":visible"));
        assert.equal(input[0], document.activeElement);

        window.setTimeout = origin;
    });

    it("DOM Change event fires when value is changed and TAB is pressed", function() {
        let textbox = new NumericTextBox(input);
        let calls = 0;

        input.change(function() {
            calls++;
        });

        input.focus().val(1)
            .trigger($.Event("keydown", { keyCode: 38 }))
            .trigger($.Event("keydown", { keyCode: 9 }));

        textbox._blur();
        assert.equal(calls, 1);
    });

    it("Spin event is not fired if value is not altered", function() {
        let calls = 0;
        let textbox = new NumericTextBox(input, {
            value: 50,
            step: 0,
            spin: function() {
                calls++;
            }
        });

        textbox._step(1);

        assert.equal(calls, 0);
    });
});
