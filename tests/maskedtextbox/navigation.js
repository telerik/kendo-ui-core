(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input;

    module("kendo.ui.MaskedTextBox navigation", {
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

                if (!eventName) {
                    eventName = "keypress";
                }

                return this.trigger($.extend({ type: eventName, keyCode: key, which: key }, options) );
            }
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function caret(element, start, end) {
        var rangeElement;
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

            rangeElement = element.createTextRange();

            if (isPosition) {
                rangeElement.collapse(true);
                rangeElement.moveStart("character", start);
                rangeElement.moveEnd("character", end - start);
                rangeElement.select();
            } else {
                var rangeDuplicated = rangeElement.duplicate(),
                    selectionStart, selectionEnd;

                    rangeElement.moveToBookmark(document.selection.createRange().getBookmark());
                    rangeDuplicated.setEndPoint('EndToStart', rangeElement);
                    selectionStart = rangeDuplicated.text.length;
                    selectionEnd = selectionStart + rangeElement.text.length;

                start = [selectionStart, selectionEnd];
            }
        }

        return start;
    }

    test("MaskedTextBox replace empty symbol if valid", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("0");

        equal(input.val(), "0-_");
    });

    test("MaskedTextBox inserts after a static character", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "-0"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("0");

        equal(caret(input[0])[0], 2);
        equal(input.val(), "-0");
    });

    test("MaskedTextBox allows typing of an empty symbol", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "-0"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("_");

        equal(caret(input[0])[0], 2);
        equal(input.val(), "-_");
    });

    test("MaskedTextBox inserts a symbol while shifting rest of the text", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-000"
        });

        input.focus();
        input.val("0-123");
        caret(input[0], 2);
        input.pressKey("0");

        equal(caret(input[0])[0], 3);
        equal(input.val(), "0-012");
    });

    test("MaskedTextBox replaces an empty symbol without shifting rest of the text", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-000"
        });

        input.focus();
        input.val("0-__3");
        caret(input[0], 2);
        input.pressKey("0");

        equal(caret(input[0])[0], 3);
        equal(input.val(), "0-0_3");
    });

    test("MaskedTextBox removes the selected text on keypress", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-000"
        });

        input.focus();
        input.val("0-123");
        caret(input[0], 2, 5);
        input.pressKey("0");

        equal(caret(input[0])[0], 3);
        equal(input.val(), "0-0__");
    });

    test("MaskedTextBox prevents user input if end of mask is reached", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "-0"
        });

        input.focus();
        caret(input[0], 2);
        input.pressKey("0");

        equal(caret(input[0])[0], 2);
    });

    test("MaskedTextBox does not does not modify value on invalid symbol", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0000"
        });

        input.focus();
        input.val("0___");
        caret(input[0], 0);
        input.pressKey("a");

        equal(caret(input[0])[0], 0);
        equal(input.val(), "0___");
    });

    test("MaskedTextBox return empty symbol on BACKSPACE", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();
        input.val("2-2");
        caret(input[0], 3);

        input.pressKey(kendo.keys.BACKSPACE, "keydown");

        equal(input.val(), "2-_");
        equal(caret(input[0])[0], 2);
    });

    test("MaskedTextBox prevents user input on BACKSPACE if start is reached", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(0-0)"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey(kendo.keys.BACKSPACE, "keydown");

        equal(input.val(), "(_-_)");
        equal(caret(input[0])[0], 0);
    });

    test("MaskedTextBox does not add empty symbol on BACKSPACE when start is reached", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(0-0)"
        });

        input.focus();
        caret(input[0], 1);

        input.pressKey(kendo.keys.BACKSPACE, "keydown");

        equal(input.val(), "(_-_)");
        equal(caret(input[0])[0], 0);
    });

    test("MaskedTextBox skips characters on BACKSPACE", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0--0"
        });

        input.focus();
        caret(input[0], 3);

        input.pressKey(kendo.keys.BACKSPACE, "keydown");

        equal(input.val(), "_--_");
        equal(caret(input[0])[0], 1);
    });

    test("MaskedTextBox honours static chars on BACKSPACE", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();
        input.val("2-2");
        caret(input[0], 2);

        input.pressKey(kendo.keys.BACKSPACE, "keydown");
        input.pressKey(kendo.keys.BACKSPACE, "keydown");

        equal(input.val(), "2-_");
        equal(caret(input[0])[0], 0);
    });

    test("MaskedTextBox removes whole value on BACKSPACE", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 0000-000"
        });

        input.focus();
        input.val("(123) 1234-123");
        caret(input[0], 0, 14);

        input.pressKey(kendo.keys.BACKSPACE, "keydown");

        equal(input.val(), "(___) ____-___");
        equal(caret(input[0])[0], 0);
    });

    test("MaskedTextBox removes symbol on DELETE", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();
        input.val("2-2");
        caret(input[0], 0);

        input.pressKey(kendo.keys.DELETE, "keydown");

        equal(input.val(), "2-_");
        equal(caret(input[0])[0], 0);
    });

    test("MaskedTextBox removes selected text on DELETE", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0--0"
        });

        input.focus();
        input.val("2--2");
        caret(input[0], 0, 4);

        input.pressKey(kendo.keys.DELETE, "keydown");

        equal(input.val(), "_--_");
        equal(caret(input[0])[0], 0);
    });

    test("MaskedTextBox honours all static characters on DELETE", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0--00"
        });

        input.focus();
        input.val("2--22");
        caret(input[0], 1);

        input.pressKey(kendo.keys.DELETE, "keydown");

        equal(input.val(), "2--22");
        equal(caret(input[0])[0], 3);
    });

    test("MaskedTextBox with simple mask honours a static character on DELETE", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-00"
        });

        input.focus();
        input.val("2-22");
        caret(input[0], 1);

        input.pressKey(kendo.keys.DELETE, "keydown");

        equal(input.val(), "2-22");
        equal(caret(input[0])[0], 2);
    });

    test("MaskedTextBox honours empty spaces on DELETE", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-00"
        });

        input.focus();
        input.val("_-_2");
        caret(input[0], 0);

        input.pressKey(kendo.keys.DELETE, "keydown");

        equal(input.val(), "_-2_");
        equal(caret(input[0])[0], 0);
    });

    asyncTest("MaskedTextBox supports pasting a valid value", 2, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0000"
        });

        input.val("").focus();
        caret(input[0], 0);

        input.trigger("paste");
        input.val("1234____");
        caret(input[0], 4);

        setTimeout(function() {
            start();
            equal(input.val(), "1234");
            equal(caret(input[0])[0], 4);
        });
    });

    asyncTest("MaskedTextBox unmasks before inserting pasted value", 2, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "00--00"
        });

        input.val("").focus();
        input.val("12--34");
        caret(input[0], 0, 4);

        input.trigger("paste");
        input.val("5634--__");
        caret(input[0], 2);

        setTimeout(function() {
            start();
            equal(input.val(), "56--34");
            equal(caret(input[0])[0], 4);
        });

    });

    asyncTest("MaskedTextBox pastes correctly when caret is on static symbol", 2, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "00--00"
        });

        input.val("").focus();
        input.val("12--34");
        caret(input[0], 2);

        input.trigger("paste");
        input.val("1256--34");
        caret(input[0], 4);

        setTimeout(function() {
            start();
            equal(input.val(), "12--56");
            equal(caret(input[0])[0], 6);
        });
    });

    test("MaskedTextBox umasks correctly mu2tiple selection on paste", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000"
        });

        input.focus();
        input.val("(123) 555");
        caret(input[0], 3, 8);

        input.trigger("paste");
        equal(input.val(), "(125) ___");
    });

    asyncTest("MaskedTextBox inserts value correctly after unmasking multiple selection", 2, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000"
        });

        input.val("").focus(); input.val("(123) 555");
        caret(input[0], 5, 8);

        input.trigger("paste");
        input.val("(123) 775__");
        caret(input[0], 8);

        setTimeout(function() {
            start();
            equal(input.val(), "(123) 775");
            equal(caret(input[0])[0], 8);
        });
    });

    test("MaskedTextBox supports cutting/delete through context menu", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000"
        });

        input.focus();
        maskedtextbox.value("123555");

        input.val("(123)");
        caret(input[0], 5);
        input.trigger("input");

        equal(input.val(), "(123) ___");
    });

    test("MaskedTextBox allows space in middle of mask", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 999"
        });

        input.focus();
        caret(input[0], 6);

        input.pressKey(" ");

        equal(input.val(), "(___)  __");
    });
})();
