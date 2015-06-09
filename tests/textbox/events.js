(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        input;

    module("kendo.ui.NumericTextBox Events", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("_change should call value() method", 2, function() {
        var textbox = new NumericTextBox(input, {
            change: function() {
                ok(true);
                equal(textbox.value(), 22);
            }
        });

        textbox._change("22");
    });

    test("raise DOM change", 2, function() {
        var textbox = new NumericTextBox(input);

        input.bind("change", function() {
            ok(true);
            equal(textbox.value(), 22);
        });

        textbox._change("22");
    });

    test("does not force element's DOM change event when the user manually edits the value and presses 'Enter'", 0, function() {
        var textbox = new NumericTextBox(input);

        input.bind("change", function() {
            ok(false);
        });

        input.focus().val(1)
            .trigger($.Event("keydown", {keyCode: 49}))
            .trigger($.Event("keydown", {keyCode: 13}));
    });

    test("raise change on enter", 2, function() {
        var textbox = new NumericTextBox(input);

        input.bind("change", function() {
            ok(true);
            equal(textbox.value(), 22);
        });

        input.focus().val("22").trigger({type:"keydown", keyCode: 13});
    });

    test("click arrow should focus input", function() {
        var textbox = new NumericTextBox(input);

        textbox._upArrow.mousedown();

        equal(input[0], document.activeElement);
    });

    test("value() should not raise change event", 0, function() {
        var textbox = new NumericTextBox(input, {
            change: function() {
                ok(false);
            }
        });

        textbox.value("22");
        textbox._blur();
    });

    asyncTest("raise spin event", 2, function() {
        var textbox = new NumericTextBox(input, {
                value: 10,
                spin: function() {
                    start();
                    ok(true);
                    equal(textbox.value(), 11);
                }
            });

        textbox._step(1);
    });

    asyncTest("raise spin event on up arrrow", 2, function() {
        var textbox = new NumericTextBox(input, {
                value: 10,
                spin: function() {
                    start();
                    ok(true);
                    equal(textbox.value(), 11);
                }
            });

            input.trigger({
                type: "keydown",
                keyCode: kendo.keys.UP
            });
    });

    test("focus should hide the _text and show the input value", 2, function() {
        var textbox = new NumericTextBox(input);

        var origin = window.setTimeout;
        window.setTimeout = function(func) { func() };

        textbox._text.focus();

        ok(!textbox._text.is(":visible"));
        equal(input[0], document.activeElement);

        window.setTimeout = origin;
    });
})();
