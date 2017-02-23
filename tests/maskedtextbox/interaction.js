(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input;

    module("kendo.ui.MaskedTextBox interaction", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function caret(element, start, end) {
        var range;
        var isPosition = start !== undefined;

        if (end === undefined) {
            end = start;
        }

        if (element.selectionStart !== undefined) {
            if (isPosition) {
                element.focus();
                element.setSelectionRange(start, end);
            } else {
                start = [element.selectionStart, element.selectionEnd];
            }
        } else if (document.selection) {
            if ($(element).is(":visible")) {
                element.focus();
            }
            range = document.selection.createRange();
            if (isPosition) {
                range.collapse(true);
                range.moveStart("character", start);
                range.moveEnd("character", end - start);
                range.select();
            } else {
                var rangeElement = element.createTextRange(),
                    rangeDuplicated = rangeElement.duplicate(),
                    selectionStart, selectionEnd;

                    rangeElement.moveToBookmark(range.getBookmark());
                    rangeDuplicated.setEndPoint('EndToStart', rangeElement);
                    selectionStart = rangeDuplicated.text.length;
                    selectionEnd = selectionStart + rangeElement.text.length;

                start = [selectionStart, selectionEnd];
            }
        }

        return start;
    }

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
        input.attr("value","123")
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
})();
