(function() {
    var MaskInput = kendo.ui.MaskInput,
        input;

    module("kendo.ui.MaskInput navigation", {
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

    test("MaskInput replace empty symbol if valid", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-0"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("0");

        equal(input.val(), "0-_");
    });

    test("MaskInput inserts after a static character", function() {
        var maskinput = new MaskInput(input, {
            mask: "-0"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("0");

        equal(caret(input[0])[0], 2);
        equal(input.val(), "-0");
    });

    test("MaskInput allows typing of an empty symbol", function() {
        var maskinput = new MaskInput(input, {
            mask: "-0"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("_");

        equal(caret(input[0])[0], 2);
        equal(input.val(), "-_");
    });

    test("MaskInput inserts a symbol while shifting rest of the text", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-000"
        });

        input.focus();
        input.val("0-123");
        caret(input[0], 2);
        input.pressKey("0");

        equal(caret(input[0])[0], 3);
        equal(input.val(), "0-012");
    });

    test("MaskInput replaces an empty symbol without shifting rest of the text", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-000"
        });

        input.focus();
        input.val("0-__3");
        caret(input[0], 2);
        input.pressKey("0");

        equal(caret(input[0])[0], 3);
        equal(input.val(), "0-0_3");
    });

    test("MaskInput removes the selected text on keypress", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-000"
        });

        input.focus();
        input.val("0-123");
        caret(input[0], 2, 5);
        input.pressKey("0");

        equal(caret(input[0])[0], 3);
        equal(input.val(), "0-0__");
    });

    test("MaskInput prevents user input if end of mask is reached", function() {
        var maskinput = new MaskInput(input, {
            mask: "-0"
        });

        input.focus();
        caret(input[0], 2);
        input.pressKey("0");

        equal(caret(input[0])[0], 2);
    });

    test("MaskInput does not does not modify value on invalid symbol", function() {
        var maskinput = new MaskInput(input, {
            mask: "0000"
        });

        input.focus();
        input.val("0___");
        caret(input[0], 0);
        input.pressKey("a");

        equal(caret(input[0])[0], 0);
        equal(input.val(), "0___");
    });

    test("MaskInput return empty symbol on BACKSPACE", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-0"
        });

        input.focus();
        input.val("2-2");
        caret(input[0], 3);

        input.pressKey(kendo.keys.BACKSPACE, "keydown");

        equal(input.val(), "2-_");
        equal(caret(input[0])[0], 2);
    });

    test("MaskInput prevents user input on BACKSPACE if start is reached", function() {
        var maskinput = new MaskInput(input, {
            mask: "(0-0)"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey(kendo.keys.BACKSPACE, "keydown");

        equal(input.val(), "(_-_)");
        equal(caret(input[0])[0], 0);
    });

    test("MaskInput does not add empty symbol on BACKSPACE when start is reached", function() {
        var maskinput = new MaskInput(input, {
            mask: "(0-0)"
        });

        input.focus();
        caret(input[0], 1);

        input.pressKey(kendo.keys.BACKSPACE, "keydown");

        equal(input.val(), "(_-_)");
        equal(caret(input[0])[0], 0);
    });

    test("MaskInput skips characters on BACKSPACE", function() {
        var maskinput = new MaskInput(input, {
            mask: "0--0"
        });

        input.focus();
        caret(input[0], 3);

        input.pressKey(kendo.keys.BACKSPACE, "keydown");

        equal(input.val(), "_--_");
        equal(caret(input[0])[0], 1);
    });

    test("MaskInput honours static chars on BACKSPACE", function() {
        var maskinput = new MaskInput(input, {
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

    test("MaskInput removes whole value on BACKSPACE", function() {
        var maskinput = new MaskInput(input, {
            mask: "(000) 0000-000"
        });

        input.focus();
        input.val("(123) 1234-123");
        caret(input[0], 0, 14);

        input.pressKey(kendo.keys.BACKSPACE, "keydown");

        equal(input.val(), "(___) ____-___");
        equal(caret(input[0])[0], 0);
    });

    test("MaskInput removes symbol on DELETE", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-0"
        });

        input.focus();
        input.val("2-2");
        caret(input[0], 0);

        input.pressKey(kendo.keys.DELETE, "keydown");

        equal(input.val(), "2-_");
        equal(caret(input[0])[0], 0);
    });

    test("MaskInput removes selected text on DELETE", function() {
        var maskinput = new MaskInput(input, {
            mask: "0--0"
        });

        input.focus();
        input.val("2--2");
        caret(input[0], 0, 4);

        input.pressKey(kendo.keys.DELETE, "keydown");

        equal(input.val(), "_--_");
        equal(caret(input[0])[0], 0);
    });

    test("MaskInput honours all static characters on DELETE", function() {
        var maskinput = new MaskInput(input, {
            mask: "0--00"
        });

        input.focus();
        input.val("2--22");
        caret(input[0], 1);

        input.pressKey(kendo.keys.DELETE, "keydown");

        equal(input.val(), "2--22");
        equal(caret(input[0])[0], 3);
    });

    test("MaskInput with simple mask honours a static character on DELETE", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-00"
        });

        input.focus();
        input.val("2-22");
        caret(input[0], 1);

        input.pressKey(kendo.keys.DELETE, "keydown");

        equal(input.val(), "2-22");
        equal(caret(input[0])[0], 2);
    });

    test("MaskInput honours empty spaces on DELETE", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-00"
        });

        input.focus();
        input.val("_-_2");
        caret(input[0], 0);

        input.pressKey(kendo.keys.DELETE, "keydown");

        equal(input.val(), "_-2_");
        equal(caret(input[0])[0], 0);
    });

    asyncTest("MaskInput supports pasting a valid value", 2, function() {
        var maskinput = new MaskInput(input, {
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

    asyncTest("MaskInput unmasks before inserting pasted value", 2, function() {
        var maskinput = new MaskInput(input, {
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

    asyncTest("MaskInput pastes correctly when caret is on static symbol", 2, function() {
        var maskinput = new MaskInput(input, {
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

    test("MaskInput umasks correctly mu2tiple selection on paste", 1, function() {
        var maskinput = new MaskInput(input, {
            mask: "(000) 000"
        });

        input.focus();
        input.val("(123) 555");
        caret(input[0], 3, 8);

        input.trigger("paste");
        equal(input.val(), "(125) ___");
    });

    asyncTest("MaskInput inserts value correctly after unmasking multiple selection", 2, function() {
        var maskinput = new MaskInput(input, {
            mask: "(000) 000"
        });

        input.val("").focus();
        input.val("(123) 555");
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

    test("MaskInput supports cutting/delete through context menu", 1, function() {
        var maskinput = new MaskInput(input, {
            mask: "(000) 000"
        });

        input.focus();
        maskinput.value("123555");

        input.val("(123)");
        caret(input[0], 5);
        input.trigger("input");

        equal(input.val(), "(123) ___");
    });
})();
