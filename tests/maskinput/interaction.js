(function() {
    var MaskInput = kendo.ui.MaskInput,
        input;

    module("kendo.ui.MaskInput interaction", {
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

    test("MaskInput shows empty mask on focus", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-0"
        });

        input.focus();

        equal(input.val(), "_-_");
    });

    asyncTest("MaskInput selects whole text if value", 3, function() {
        var maskinput = new MaskInput(input, {
            mask: "0-0"
        });

        maskinput.value("1-1");

        input.focus();

        setTimeout(function() {
            start();
            equal(input.val(), "1-1");
            equal(caret(input[0])[0], 0);
            equal(caret(input[0])[1], 3);
        });
    });

    test("MaskInput does not remove input value on blur", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-0"
        });

        maskinput.value("1-1");

        input.focus().blur();

        equal(input.val(), "1-1");
    });

    test("MaskInput removes empty mask on blur", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-0"
        });

        input.focus().blur();

        equal(input.val(), "");
    });

    test("MaskInput does not remove widget value if an empty symbol is left", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-0"
        });

        input.focus();
        input.val("1-_");
        input.blur();

        equal(input.val(), "1-_");
    });

    test("MaskInput persists empty mask on ENTER", function() {
        var maskinput = new MaskInput(input, {
            mask: "(000) 000-0000"
        });

        input.focus();
        caret(input[0], 7);
        input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });

        equal(input.val(), "(___) ___-____");
    });

    test("MaskInput should not call mask if e.which is 0", 0, function() {
        var maskinput = new MaskInput(input, {
            mask: "(000) 000-0000"
        });

        input.focus();
        caret(input[0], 7);
        input.trigger({
            type: "keypress",
            which: 0,
            preventDefault: function() {
                ok(false);
            }
        });
    });
})();
