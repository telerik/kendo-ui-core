/* globals createMasked, updateInput, updateInputAt, deleteContent, deleteBackwards, stub, createInput, setupPressKey */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox;
    var input;
    var caret = kendo.caret;
    var createMaskedTextBox;

    module("kendo.ui.MaskedTextBox navigation:", {
        setup: function() {
            input = createInput();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("replace empty symbol if valid", function() {
        var masked = createMasked(input, "0-0");
        masked.value("_-_");
        updateInputAt(masked, "0", 0);

        equal(input.val(), "0-_");
    });

    test("inserts after a static character", 2, function() {
        var masked = createMasked(input, "-0");
        masked.value("-_");
        updateInputAt(masked, "0", 0);

        equal(caret(input[0])[0], 2);
        equal(input.val(), "-0");
    });

    test("allows typing of an empty symbol", function() {
        var masked = createMasked(input, "-0");
        masked.value("-_");
        updateInputAt(masked, "_", 0);

        equal(caret(input[0])[0], 2);
        equal(input.val(), "-_");
    });

    test("inserts a symbol while shifting rest of the text", function() {
        var masked = createMasked(input, "0-000");
        masked.value("0-123");
        updateInputAt(masked, "0", 2);

        equal(caret(input[0])[0], 3);
        equal(input.val(), "0-012");
    });

    test("replaces an empty symbol without shifting rest of the text", function() {
        var masked = createMasked(input, "0-000");
        masked.value("0-__3");
        updateInputAt(masked, "0", 2);

        equal(caret(input[0])[0], 3);
        equal(input.val(), "0-0_3");
    });

    test("prevents user input if end of mask is reached", 1, function() {
        var masked = createMasked(input, "-0");
        masked.value("-0");
        updateInputAt(masked, "0", 2);

        equal(caret(input[0])[0], 2);
    });

    test("does not modify value on invalid symbol", function() {
        var masked = createMasked(input, "0000");
        masked.value("0___");
        updateInputAt(masked, "a", 0);

        equal(caret(input[0])[0], 0);
        equal(input.val(), "0___");
    });

    test("return empty symbol on BACKSPACE", function() {
        var masked = createMasked(input, "0-0");
        masked.value("2-3");
        deleteBackwards(masked, 3);

        equal(input.val(), "2-_");
        equal(caret(input[0])[0], 2);
    });

    test("prevents user input on BACKSPACE if start is reached", function() {
        var masked = createMasked(input, "(0-0)");
        masked.value("(_-_)");
        deleteBackwards(masked, 0);

        equal(input.val(), "(_-_)");
        equal(caret(input[0])[0], 0);
    });

    test("does not add empty symbol on BACKSPACE when start is reached", function() {
        var masked = createMasked(input, "(0-0)");
        masked.value("(_-_)");
        deleteBackwards(masked, 1);

        equal(input.val(), "(_-_)");
        equal(caret(input[0])[0], 0);
    });

    test("skips characters on BACKSPACE", function() {
        var masked = createMasked(input, "0--0");
        masked.value("_--_");
        deleteBackwards(masked, 3);

        equal(input.val(), "_--_");
        equal(caret(input[0])[0], 1);
    });

    test("honours static chars on BACKSPACE", function() {
        var masked = createMasked(input, "0-0");
        masked.value("2-3");
        deleteBackwards(masked, 2, 2);

        equal(input.val(), "3-_");
        equal(caret(input[0])[0], 0);
    });

    test("multiple chars delete with BACKSPACE", function() {
        var masked = createMasked(input, "0-00");
        masked.value("2-34");
        deleteBackwards(masked, 4, 2);

        equal(input.val(), "2-__");
        equal(caret(input[0])[0], 2);
    });

    test("delete 0s from the end of the input with BACKSPACE", function() {
        var masked = createMasked(input, "0-0000");
        masked.value("1-2000");

        deleteBackwards(masked, 6);

        equal(masked.value(), "1-200_");
        equal(caret(input[0])[0], 5);
    });

    test("BACKSPACE over static char ending at mask specific numeric chars", function() {
        var masked = createMasked(input, "00-00-00");
        masked.value("00-00");

        deleteBackwards(masked, 6);

        equal(masked.value(), "00-00-__");
        equal(caret(input[0])[0], 5);
    });

    test("BACKSPACE over static char ending at mask specific letter chars", function() {
        var masked = createMasked(input, "LL-LL-00");
        masked.value("LL-LL");

        deleteBackwards(masked, 6);

        equal(masked.value(), "LL-LL-__");
        equal(caret(input[0])[0], 5);
    });

    test("delete prompt char before ambiguous static char", function() {
        var masked = createMasked(input, "0-0\\00");
        masked.value("1-_0_");

        deleteBackwards(masked, 3);

        equal(masked.value(), "1-_0_");
        equal(caret(input[0])[0], 2);
    });

    test("delete content before ambiguous static char", function() {
        var masked = createMasked(input, "0-0\\00");
        masked.value("1-40_");

        deleteBackwards(masked, 3);

        equal(masked.value(), "1-_0_");
        equal(caret(input[0])[0], 2);
    });

    test("removes whole value", function() {
        var masked = createMasked(input, "(000) 0000-000");
        masked.value("(123) 1234-123");
        deleteContent(masked, 0, 14);

        equal(input.val(), "(___) ____-___");
        equal(caret(input[0])[0], 1);
    });

    test("removes symbol on DELETE", function() {
        var masked = createMasked(input, "0-0");
        masked.value("2-2");
        deleteContent(masked, 0);

        equal(input.val(), "2-_");
        equal(caret(input[0])[0], 0);
    });

    test("removes selected text on DELETE", function() {
        var masked = createMasked(input, "0--0");
        masked.value("2--2");
        deleteContent(masked, 0, 4);

        equal(input.val(), "_--_");
        equal(caret(input[0])[0], 0);
    });


    test("honours all static characters on DELETE", function() {
        var masked = createMasked(input, "0--00");
        masked.value("2--22");
        deleteContent(masked, 1);

        equal(input.val(), "2--22");
        equal(caret(input[0])[0], 3);
    });

    test("with simple mask honours a static character on DELETE", function() {
        var masked = createMasked(input, "0-00");
        masked.value("2-22");
        deleteContent(masked, 1);

        equal(input.val(), "2-22");
        equal(caret(input[0])[0], 2);
    });

    test("honours empty spaces on DELETE", function() {
        var masked = createMasked(input, "0-00");
        masked.value("_-_2");
        deleteContent(masked, 0);

        equal(input.val(), "_-2_");
        equal(caret(input[0])[0], 0);
    });

    test("does not prevent ENTER", 0, function() {
        createMasked(input, "0-0");

        input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER,
            preventDefault: function() {
                ok(false);
            }
        });
    });


    test("supports pasting a valid value", 2, function() {
        var masked = createMasked(input, "0000");
        masked.value("____");
        updateInput(masked, "1234");

        equal(input.val(), "1234");
        equal(caret(input[0])[0], 4);
    });

    test("unmasks before inserting pasted value", 2, function() {
        var masked = createMasked(input, "00--00");
        masked.value("12--34");
        updateInput(masked, "56");

        equal(input.val(), "56--12");
        equal(caret(input[0])[0], 4);
    });

    test("pastes correctly when caret is on static symbol", 2, function() {
        var masked = createMasked(input, "00--00");
        masked.value("12--34");
        updateInputAt(masked, "56", 2);

        equal(input.val(), "12--56");
        equal(caret(input[0])[0], 6);
    });

    test("delete existing content keeps the mask", 1, function() {
        var masked = createMasked(input, "(000) 000");
        masked.value("(123) 555");
        input.val("(125");
        masked.inputChange();

        equal(input.val(), "(125) ___");
    });

    test("inserts value correctly after unmasking multiple selection", 2, function() {
        var masked = createMasked(input, "(000) 000");
        input.val("(123) 555");
        updateInputAt(masked, "77", 5);

        equal(input.val(), "(123) 775");
        equal(caret(input[0])[0], 8);
    });

    test("supports cutting/delete through context menu", 1, function() {
        var masked = createMasked(input, "(000) 000");
        masked.value("123555");

        input.val("(123)");
        caret(input[0], 5);
        masked.inputChange();

        equal(input.val(), "(123) ___");
    });

    test("allows space in middle of mask", 1, function() {
        var masked = createMasked(input, "(000) 999");
        input.val(masked._emptyMask);
        updateInputAt(masked, " ", 6);

        equal(input.val(), "(___)  __");
    });

    test("allows any character if no mask", 1, function() {
        var maskedtextbox = new MaskedTextBox(input);

        input.focus();
        caret(input[0], 0);

        stub(maskedtextbox, {
            _mask: maskedtextbox._mask
        });

        input.trigger("input");

        equal(maskedtextbox.calls("_mask"), 0);
    });

    test("add duplicated content", function() {
        var masked = createMasked(input, "00-0000");
        masked.value("12-3456");

        updateInputAt(masked, "34", 3);

        equal(masked.value(), "12-3434");
    });

    test("replace with partially duplicated content", function () {
        var masked = createMasked(input, "00-0000");
        masked.value("12-3456");

        input.val("12-6");
        updateInputAt(masked, "34", 3);

        equal(masked.value(), "12-346_");
    });

    test("insert multiple over a static char", function() {
        var masked = createMasked(input, "0-00\\00");
        masked.value("1-__0_");

        updateInputAt(masked, "123", 2);

        equal(masked.value(), "1-1203");
    });

})();
