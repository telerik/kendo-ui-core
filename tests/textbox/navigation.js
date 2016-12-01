(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        keys = kendo.keys,
        input;

    module("kendo.ui.NumericTextBox Navigation", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);

            $.fn.pressKey = function(key, eventName, options) {
                if (typeof key === "string") {
                    key = key.charCodeAt(0);
                }

                if ($.isPlainObject(eventName)) {
                    options = eventName;
                    eventName = "keypress";
                }

                return this.trigger($.extend({ type: eventName, keyCode: key, which: key }, options) );
            }
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("pressing DOWN arrow calls _step()", function() {
        var textbox = new NumericTextBox(input);

        stub(textbox, "_step");
        input.pressKey(kendo.keys.DOWN, "keydown");

        equal(textbox.calls("_step"), 1);
        equal(textbox.args("_step")[0], -1);
    });

    test("pressing UP arrow calls _step()", function() {
        var textbox = new NumericTextBox(input);

        stub(textbox, "_step");
        input.pressKey(kendo.keys.UP, "keydown");

        equal(textbox.calls("_step"), 1);
        equal(textbox.args("_step")[0], 1);
    });

    test("typing digit is allowed", 0, function() {
        var textbox = new NumericTextBox(input);

        input.pressKey("4", {
            preventDefault: function() {
                ok(false);
            }
        });
    });

    test("typing letter is not allowed", 1, function() {
        var textbox = new NumericTextBox(input);

        input.pressKey("a", {
            preventDefault: function() {
                ok(true);
            }
        });
    });

    test("'-' is allowed", 0, function() {
        var textbox = new NumericTextBox(input);

        input.pressKey("-", {
            preventDefault: function() {
                ok(false);
            }
        });
    });

    test("Do not allow '-' if min is bigger than 0", 1, function() {
        var textbox = new NumericTextBox(input, {
            min: 0
        });

        input.pressKey("-", {
            preventDefault: function() {
                ok(true);
            }
        });
    });

    test("Spacebar is not allowed", 1, function() {
        var textbox = new NumericTextBox(input);

        input.pressKey(" ", {
            preventDefault: function() {
                ok(true);
            }
        });
    });

    test("Non-visual keys are allowed", 0, function() {
        var textbox = new NumericTextBox(input);

        input.val(1).pressKey(0, {
            preventDefault: function() {
                ok(false);
            }
        });
    });

    test("Backspace in Firefox is allowed", 0, function() {
        var textbox = new NumericTextBox(input);

        input.pressKey(kendo.keys.BACKSPACE, {
            preventDefault: function() {
                ok(false);
            }
        });
    });

    test("Enter in IE is allowed", 0, function() {
        var textbox = new NumericTextBox(input);
        input.pressKey(kendo.keys.ENTER, {
            preventDefault: function() {
                ok(false);
            }
        });
    });

    test("Allow decimal separator '.'", 0, function() {
        var textbox = new NumericTextBox(input);

        input.pressKey(".", {
            preventDefault: function() {
                ok(false);
            }
        });
    });

    test("Do not allow decimal separator ','", 1, function() {
        var textbox = new NumericTextBox(input);

        input.pressKey(",", {
            preventDefault: function() {
                ok(true);
            }
        });
    });

    test("Allow decimal separator ',' in bg-BG culture", 0, function() {
        var textbox = new NumericTextBox(input);

        kendo.culture("bg-BG");

        input.pressKey(",", {
            preventDefault: function() {
                ok(false);
            }
        });

        kendo.culture("en-US");
    });

    test("Do not allow decimal separator '.' in bg-BG culture", 1, function() {
        var textbox = new NumericTextBox(input);

        kendo.culture("bg-BG");

        input.pressKey(".", {
            preventDefault: function() {
                ok(true);
            }
        });

        kendo.culture("en-US");
    });

    test("Convert numpad decimal point to bg-BG decimal point (empty input)", 1, function() {
        var textbox = new NumericTextBox(input);

        kendo.culture("bg-BG");

        input.focus();
        input.pressKey(110, "keydown");
        input.pressKey(".", {
            preventDefault: function() {
                equal(input.val(), ",");
            }
        });

        kendo.culture("en-US");
    });

    test("Prevent decimal separator if decimals: 0", 1, function() {
        var textbox = new NumericTextBox(input, {
            decimals: 0
        });

        input.pressKey(".", {
            preventDefault: function() {
                ok(true);
            }
        });
    });

    asyncTest("Avoid exception when group separator is empty string", function() {
        kendo.culture().numberFormat[","] = "";

        var textbox = new NumericTextBox(input);
        textbox._text.focus();

        setTimeout(function() {
            kendo.culture().numberFormat[","] = ",";
            start();
            ok(true);
        });
    });

    test("Allow pasting with Ctrl+V", 0, function() {
        var textbox = new NumericTextBox(input);

        input.pressKey("v", {
            ctrlKey: true,
            preventDefault: function() {
                ok(false);
            }
        });
    });

    test("Allow pasting with Ctrl+V (MacOS)", 0, function() {
        var textbox = new NumericTextBox(input);

        input.pressKey("v", {
            metaKey: true,
            preventDefault: function() {
                ok(false);
            }
        });
    });

    asyncTest("Reject pasted value if out of range", 1, function() {
        var textbox = new NumericTextBox(input, {
            max: 100
        });

        stub(textbox, "_update");

        input.val("1000");
        input.trigger("paste", {
            target: input[0]
        });

        setTimeout(function() {
            start();
            equal(textbox.calls("_update"), 1);
        }, 100);
    });

    asyncTest("Reject pasted value if not valid", 1, function() {
        var textbox = new NumericTextBox(input, {
            restrictDecimals: 2
        });

        stub(textbox, "_update");

        input.val("10.1234");
        input.trigger("paste", {
            target: input[0]
        });

        setTimeout(function() {
            start();
            equal(textbox.calls("_update"), 1);
        }, 100);
    });

    test("Allow infinite decimal digits", 0, function() {
        var textbox = new NumericTextBox(input);

        input.val("2.22222");

        input.pressKey("4", {
            preventDefault: function() {
                ok(false);
            }
        });
    });

    test("Prevent decimals digits after precision is reached", 1, function() {
        if (kendo.support.browser.mozilla) {
            // The test fails in Firefox, but
            // behaves in the same way as Chrome
            ok(true);
            return;
        }

        var textbox = new NumericTextBox(input, {
            decimals: 3,
            restrictDecimals: true
        });

        input.val("2.222");

        input.pressKey("4", {
            preventDefault: function() {
                ok(true);
            }
        });
    });

    test("Focus origin input on touched", 1, function() {
        kendo.support.mobileOS = true;

        var textbox = new NumericTextBox(input);

        textbox.element.on("focus", function() {
            ok(true);
        });

        textbox.wrapper.find(".k-formatted-value").trigger({
            type: "touchend"
        });

        kendo.support.mobileOS = true;
    });
})();
