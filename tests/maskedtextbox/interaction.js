(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input;
    var inputElement;
    var LETTER_REGEX = /[a-z]{1,3}/;
    var NUMBER_REGEX = /[0-9]{1,3}/;
    var caret = kendo.caret;

    module("kendo.ui.MaskedTextBox interaction", {
        setup: function() {
            input = createInput();
            inputElement = input[0];
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    asyncTest("MaskedTextBox shows empty mask on focus", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();

        setTimeout(function() {
            start();
            equal(input.val(), "_-_");
        });
    });

    asyncTest("MaskedTextBox positions caret in the beginning", 2, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();

        setTimeout(function() {
            start();
            equal(caret(input[0])[0], 0);
            equal(caret(input[0])[1], 0);
        });
    });

    asyncTest("MaskedTextBox selects whole text if value", 3, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        maskedtextbox.value("1-1");

        input.focus();

        setTimeout(function() {
            start();
            equal(input.val(), "1-1");
            equal(caret(input[0])[0], 0);
            equal(caret(input[0])[1], 3);
        });
    });

    asyncTest("MaskedTextBox does not remove input value on blur", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        maskedtextbox.value("1-1");

        input.focus();

        setTimeout(function() {
            start();
            input.blur();
            equal(input.val(), "1-1");
        });
    });

    asyncTest("MaskedTextBox removes empty mask on blur", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();

        setTimeout(function() {
            start();
            input.blur();
            equal(input.val(), "");
        });
    });

    asyncTest("MaskedTextBox does not remove widget value if an empty symbol is left", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();

        setTimeout(function() {
            start();
            input.val("1-_");
            input.blur();

            equal(input.val(), "1-_");
        });
    });

    asyncTest("MaskedTextBox persists empty mask on ENTER", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.focus();
        setTimeout(function() {
            start();
            caret(input[0], 7);
            input.trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });

            equal(input.val(), "(___) ___-____");
        });
    });

    asyncTest("MaskedTextBox should not call mask if e.which is 0", 0, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.focus();

        setTimeout(function() {
            start();
            caret(input[0], 7);
            input.trigger({
                type: "keypress",
                which: 0,
                preventDefault: function() {
                    ok(false);
                }
            });
        });
    });

    asyncTest("MaskedTextBox should not call mask on Ctrl + C", 0, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.focus();

        setTimeout(function() {
            start();
            caret(input[0], 7);
            input.trigger({
                type: "keypress",
                which: "c".charCodeAt(0),
                keyCode: "c".charCodeAt(0),
                ctrlKey: true,
                preventDefault: function() {
                    ok(false);
                }
            });
        });
    });

    asyncTest("Allow pasting with Ctrl+V (MacOS)", 0, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.focus();

        setTimeout(function() {
            start();
            caret(input[0], 7);
            input.trigger({
                type: "keypress",
                which: "c".charCodeAt(0),
                keyCode: "c".charCodeAt(0),
                metaKey: true,
                preventDefault: function() {
                    ok(false);
                }
            });
        });
    });

    test("MaskedTextBox doesn't show promptChar", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000",
            clearPromptChar: true,
            value: "123"
        });

        equal(maskedtextbox.value(), "(123)    -    ");
    });

    asyncTest("MaskedTextBox shows promptChar on focus", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000",
            clearPromptChar: true,
            value: "123"
        });

        input.focus();

        setTimeout(function() {
            start();
            equal(maskedtextbox.value(), "(123) ___-____");
        });
    });

    test("MaskedTextBox shows promptChar on focus", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000",
            clearPromptChar: true,
            value: "123"
        });

        input.focus();
        input.focusout();

        equal(maskedtextbox.value(), "(123)    -    ");
    });

    test("MaskedTextBox does not focus when input is not active", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.value = "test";

        //trigger change
        input.trigger("input");
        input.trigger("propertychange");

        notEqual(input[0], kendo._activeElement());
    });

    test("Add content in 'input' event; Windows Phone scenario", function() {
        var masked = new MaskedTextBox(input, {
            mask: "00.00",
            promptChar: "_"
        });

        masked.value("1");
        masked.element[0].value = "12_.__";

        input[0].focus();
        caret(input[0], 2, 2);
        input.trigger("input");
        input.trigger("propertychange");

        equal(masked.value(), "12.__");
    });

    test("MaskedTextBox value is not undefined when clearPromptChar is true and empty mask is used", 1, function() {
        input.attr("value", "123");
        var maskedtextbox = new MaskedTextBox(input, {
            clearPromptChar: true
        });

        input.focus();

        equal(input.val(), "123");
    });

    asyncTest("MaskTextBox will not shift character if it is not correct", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0ba",
            rules: {
                "b": function (char) {
                    return (char === "0" || char === "1" || char === "2" ||
                            char === "3" || char === "4" || char === "5");
                },
                "a": function (char) {
                    return (char === "0" || char === "1" || char === "2");
                }
            },
            value:"9__"
        });

        input.focus();
        setTimeout(function() {
            start();
            caret(input[0], 0);
            input.trigger({
                type: "keypress",
                which: 54
            });

            equal(input.val(), "6__");
        });
    });

    asyncTest("Entering invalid symbol does not change the value", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-000",
            value: "0-__3"
        });

        input.focus();
        setTimeout(function() {
            start();
            caret(input[0], 2);
            input.trigger({
                type: "keypress",
                which: 103
            });

            equal(input.val(), "0-__3");
        });
    });

    module("kendo.ui.MaskedTextBox groups", {
        setup: function() {
            input = createInput();
            setupPressKey();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    asyncTest("typing at the start of a group should insert character", 3, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            value: "",
            rules: {
                "xyz": NUMBER_REGEX
            }
        });
        input.focus();

        setTimeout(function() {
            start();

            input.pressKey("1");

            equal(input.val(), "1__");
            equal(caret(input[0])[0], 1);
            equal(caret(input[0])[1], 1);
        });
    });

    asyncTest("typing in the middle of a group should insert characters", 3, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "123",
            rules: {
                "123": NUMBER_REGEX
            }
        });
        input.focus();

        setTimeout(function() {
            start();
            input.val("___");
            caret(input[0], 1);

            input.pressKey("1");

            equal(input.val(), "_1_");
            equal(caret(input[0])[0], 2);
            equal(caret(input[0])[1], 2);
        });
    });

    asyncTest("typing at the end of a group should insert characters", 3, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "123",
            rules: {
                "123": NUMBER_REGEX
            }
        });
        input.focus();

        setTimeout(function() {
            start();
            input.val("___");
            caret(input[0], 2);

            input.pressKey("1");

            equal(input.val(), "__1");
            equal(caret(input[0])[0], 3);
            equal(caret(input[0])[1], 3);
        });
    });

    module("kendo.ui.MaskedTextBox groups", {
        setup: function() {
            input = createInput();
            setupPressKey();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    asyncTest("typing at the start of a group should replace characters", 3, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            value: "123",
            rules: {
                "xyz": NUMBER_REGEX
            }
        });
        input.focus();

        setTimeout(function() {
            start();
            caret(input[0], 0);
            input.pressKey("4");

            equal(input.val(), "412");
            equal(caret(input[0])[0], 1);
            equal(caret(input[0])[1], 1);
        });
    });

    asyncTest("typing in the middle of a group should insert characters", 3, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            value: "123",
            rules: {
                "xyz": NUMBER_REGEX
            }
        });
        input.focus();

        setTimeout(function() {
            start();
            caret(input[0], 1);

            input.pressKey("4");

            equal(input.val(), "142");
            equal(caret(input[0])[0], 2);
            equal(caret(input[0])[1], 2);
        });
    });

    asyncTest("typing at the end of a group should insert characters", 3, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            value: "123",
            rules: {
                "xyz": NUMBER_REGEX
            }
        });
        input.focus();

        setTimeout(function() {
            start();
            caret(input[0], 2);

            input.pressKey("4");

            equal(input.val(), "124");
            equal(caret(input[0])[0], 3);
            equal(caret(input[0])[1], 3);
        });
    });

    asyncTest("typing the multiple times should insert characters in the group", 3, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "123",
            rules: {
                "123": NUMBER_REGEX
            }
        });
        input.focus();

        setTimeout(function() {
            start();
            input.val("___");
            caret(input[0], 0);

            input.pressKey("1");
            input.pressKey("2");
            input.pressKey("3");

            equal(input.val(), "123");
            equal(caret(input[0])[0], 3);
            equal(caret(input[0])[1], 3);
        });
    });

    module("kendo.ui.MaskedTextBox groups", {
        setup: function() {
            input = createInput();
            setupPressKey();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    asyncTest("typing at the start of a group around char rules should insert char", 3, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0xyz0",
            value: "1a2b3",
            rules: {
                "xyz": /[a-z][0-9][a-z]/

            }
        });
        input.focus();

        setTimeout(function() {
            start();
            input.val("1a2b3");
            caret(input[0], 1);

            input.pressKey("x");

            equal(input.val(), "1x2b3");
            equal(caret(input[0])[0], 2);
            equal(caret(input[0])[1], 2);
        });
    });

    asyncTest("typing in the middle of a group around char rules should insert char", 3, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0xyz0",
            value: "1a2b3",
            rules: {
                "xyz": /[a-z][0-9][a-z]/

            }
        });
        input.focus();

        setTimeout(function() {
            start();
            input.val("1a2b3");
            caret(input[0], 2);

            input.pressKey("7");

            equal(input.val(), "1a7b3");
            equal(caret(input[0])[0], 3);
            equal(caret(input[0])[1], 3);
        });
    });

    asyncTest("typing at the end of a group around char rules should insert char", 3, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0xyz0",
            value: "1a2b3",
            rules: {
                "xyz": /[a-z][0-9][a-z]/

            }
        });
        input.focus();

        setTimeout(function() {
            start();
            input.val("1a2b3");
            caret(input[0], 3);

            input.pressKey("x");

            equal(input.val(), "1a2x3");
            equal(caret(input[0])[0], 4);
            equal(caret(input[0])[1], 4);
        });
    });
})();
