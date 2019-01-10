(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        input;

    describe("kendo.ui.NumericTextBox Events", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("_change should call value() method", function() {
            var textbox = new NumericTextBox(input, {
                change: function() {
                    assert.isOk(true);
                    assert.equal(textbox.value(), 22);
                }
            });

            textbox._change("22");
        });

        it("raise DOM change", function() {
            var textbox = new NumericTextBox(input);

            input.bind("change", function() {
                assert.isOk(true);
                assert.equal(textbox.value(), 22);
            });

            textbox._change("22");
        });

        it("does not force element's DOM change event when the user manually edits the value and presses 'Enter'", function() {
            var textbox = new NumericTextBox(input);

            input.bind("change", function() {
                assert.isOk(false);
            });

            input.focus().val(1)
                .trigger($.Event("keydown", { keyCode: 49 }))
                .trigger($.Event("keydown", { keyCode: 13 }));
        });

        it("raise change on enter", function() {
            var textbox = new NumericTextBox(input);

            input.bind("change", function() {
                assert.isOk(true);
                assert.equal(textbox.value(), 22);
            });

            input.focus().val("22").trigger({ type: "keydown", keyCode: 13 });
        });

        it("click arrow should focus input", function() {
            var textbox = new NumericTextBox(input);

            textbox._upArrow.mousedown();

            assert.equal(input[0], document.activeElement);
        });

        it("value() should not raise change event", function() {
            var textbox = new NumericTextBox(input, {
                change: function() {
                    assert.isOk(false);
                }
            });

            textbox.value("22");
            textbox._blur();
        });

        it("raise spin event", function(done) {
            var textbox = new NumericTextBox(input, {
                value: 10,
                spin: function() {
                    assert.isOk(true);
                    assert.equal(textbox.value(), 11);
                    done();
                }
            });

            textbox._step(1);
        });

        it("raise spin event on up arrrow", function(done) {
            var textbox = new NumericTextBox(input, {
                value: 10,
                spin: function() {
                    assert.isOk(true);
                    assert.equal(textbox.value(), 11);
                    done();
                }
            });

            input.trigger({
                type: "keydown",
                keyCode: kendo.keys.UP
            });
        });

        it("focus should hide the _text and show the input value", function() {
            var textbox = new NumericTextBox(input);

            var origin = window.setTimeout;
            window.setTimeout = function(func) { func() };

            textbox._text.focus();

            assert.isOk(!textbox._text.is(":visible"));
            assert.equal(input[0], document.activeElement);

            window.setTimeout = origin;
        });

        it("DOM Change event fires when value is changed and TAB is pressed", function() {
            var textbox = new NumericTextBox(input);
            var calls = 0;

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
            var calls = 0;
            var textbox = new NumericTextBox(input, {
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
}());
