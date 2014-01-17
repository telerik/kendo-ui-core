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
        input.pressKey("0");

        equal(input.val(), "0-_");
    });

    test("MaskInput inserts after a static character", function() {
        var maskinput = new MaskInput(input, {
            mask: "-0"
        });

        input.focus();
        input.pressKey("0");

        equal(caret(input[0])[0], 2);
    });

    test("MaskInput replace next symbol on keypress", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-000"
        });

        input.focus();
        input.val("0-123");
        caret(input[0], 2);
        input.pressKey("0");

        equal(caret(input[0])[0], 3);
        equal(input.val(), "0-023");
    });

    test("MaskInput replaces first symbol of selected text on keypress", function() {
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
            mask: "0-0"
        });

        input.focus();
        caret(input[0], 2);

        input.pressKey(kendo.keys.BACKSPACE, "keydown");

        equal(input.val(), "_-_");
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

        equal(input.val(), "_-2");
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

        equal(input.val(), "_-2");
        equal(caret(input[0])[0], 1);
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
        input.pressKey(kendo.keys.DELETE, "keydown");
        input.pressKey(kendo.keys.DELETE, "keydown");

        equal(input.val(), "2--_2");
        equal(caret(input[0])[0], 4);
    });
})();
