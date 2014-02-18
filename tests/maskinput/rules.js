(function() {
    var MaskInput = kendo.ui.MaskInput,
        input;

    module("kendo.ui.MaskInput rules", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
            input.val("");

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

    test("Rule '0' allows only a digit", 1, function() {
        var maskinput = new MaskInput(input, {
            mask: "0"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("3");

        equal(input.val(), "3");
    });

    test("Rule '0' does not allow empty space", 2, function() {
        var maskinput = new MaskInput(input, {
            mask: "0"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey(" ");

        equal(input.val(), "_");
        equal(caret(input[0])[0], 0);
    });

    test("Rule '9' allows digit", 1, function() {
        var maskinput = new MaskInput(input, {
            mask: "9"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("3");

        equal(input.val(), "3");
    });

    test("Rule '9' allows digit", 1, function() {
        var maskinput = new MaskInput(input, {
            mask: "99"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey(" ");

        equal(input.val(), " _");
    });

    test("Rule '#' allows digit", 1, function() {
        var maskinput = new MaskInput(input, {
            mask: "#"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("3");

        equal(input.val(), "3");
    });

    test("Rule '#' allows space", 1, function() {
        var maskinput = new MaskInput(input, {
            mask: "##"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey(" ");

        equal(input.val(), " _");
    });

    test("Rule '#' allows '+'", 1, function() {
        var maskinput = new MaskInput(input, {
            mask: "##"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("+");

        equal(input.val(), "+_");
    });

    test("Rule '#' allows '-'", 1, function() {
        var maskinput = new MaskInput(input, {
            mask: "##"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("-");

        equal(input.val(), "-_");
    });

    test("Rule 'L' allows an alphabetical symbol", 1, function() {
        var maskinput = new MaskInput(input, {
            mask: "LL"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("A");
        input.pressKey("b");

        equal(input.val(), "Ab");
    });

    test("Rule 'L' does not allow space", 1, function() {
        var maskinput = new MaskInput(input, {
            mask: "LL"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("A");
        input.pressKey("b");

        equal(input.val(), "Ab");
    });

    test("Rule 'L' does not allow digit", 1, function() {
        var maskinput = new MaskInput(input, {
            mask: "LL"
        });

        input.focus();
        caret(input[0], 0);
        input.pressKey("3");

        equal(input.val(), "__");
    });
})();
