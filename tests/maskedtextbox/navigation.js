/* globals createMasked, updateInput, updateInputAt, deleteContent, deleteBackwards, stub, createInput, setupPressKey */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox;
    var input;
    var caret = kendo.caret;
    var createMaskedTextBox;

    describe("kendo.ui.MaskedTextBox navigation:", function() {
        beforeEach(function() {
            input = createInput();
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("replace empty symbol if valid", function() {
            var masked = createMasked(input, "0-0");
            masked.value("_-_");
            updateInputAt(masked, "0", 0);

            assert.equal(input.val(), "0-_");
        });

        it("inserts after a static character", function() {
            var masked = createMasked(input, "-0");
            masked.value("-_");
            updateInputAt(masked, "0", 0);

            assert.equal(caret(input[0])[0], 2);
            assert.equal(input.val(), "-0");
        });

        it("allows typing of an empty symbol", function() {
            var masked = createMasked(input, "-0");
            masked.value("-_");
            updateInputAt(masked, "_", 0);

            assert.equal(caret(input[0])[0], 2);
            assert.equal(input.val(), "-_");
        });

        it("inserts a symbol while shifting rest of the text", function() {
            var masked = createMasked(input, "0-000");
            masked.value("0-123");
            updateInputAt(masked, "0", 2);

            assert.equal(caret(input[0])[0], 3);
            assert.equal(input.val(), "0-012");
        });

        it("replaces an empty symbol without shifting rest of the text", function() {
            var masked = createMasked(input, "0-000");
            masked.value("0-__3");
            updateInputAt(masked, "0", 2);

            assert.equal(caret(input[0])[0], 3);
            assert.equal(input.val(), "0-0_3");
        });

        it("prevents user input if end of mask is reached", function() {
            var masked = createMasked(input, "-0");
            masked.value("-0");
            updateInputAt(masked, "0", 2);

            assert.equal(caret(input[0])[0], 2);
        });

        it("does not modify value on invalid symbol", function() {
            var masked = createMasked(input, "0000");
            masked.value("0___");
            updateInputAt(masked, "a", 0);

            assert.equal(caret(input[0])[0], 0);
            assert.equal(input.val(), "0___");
        });

        it("return empty symbol on BACKSPACE", function() {
            var masked = createMasked(input, "0-0");
            masked.value("2-3");
            deleteBackwards(masked, 3);

            assert.equal(input.val(), "2-_");
            assert.equal(caret(input[0])[0], 2);
        });

        it("prevents user input on BACKSPACE if start is reached", function() {
            var masked = createMasked(input, "(0-0)");
            masked.value("(_-_)");
            deleteBackwards(masked, 0);

            assert.equal(input.val(), "(_-_)");
            assert.equal(caret(input[0])[0], 0);
        });

        it("does not add empty symbol on BACKSPACE when start is reached", function() {
            var masked = createMasked(input, "(0-0)");
            masked.value("(_-_)");
            deleteBackwards(masked, 1);

            assert.equal(input.val(), "(_-_)");
            assert.equal(caret(input[0])[0], 0);
        });

        it("skips characters on BACKSPACE", function() {
            var masked = createMasked(input, "0--0");
            masked.value("_--_");
            deleteBackwards(masked, 3);

            assert.equal(input.val(), "_--_");
            assert.equal(caret(input[0])[0], 1);
        });

        it("honours static chars on BACKSPACE", function() {
            var masked = createMasked(input, "0-0");
            masked.value("2-3");
            deleteBackwards(masked, 2, 2);

            assert.equal(input.val(), "3-_");
            assert.equal(caret(input[0])[0], 0);
        });

        it("multiple chars delete with BACKSPACE", function() {
            var masked = createMasked(input, "0-00");
            masked.value("2-34");
            deleteBackwards(masked, 4, 2);

            assert.equal(input.val(), "2-__");
            assert.equal(caret(input[0])[0], 2);
        });

        it("delete 0s from the end of the input with BACKSPACE", function() {
            var masked = createMasked(input, "0-0000");
            masked.value("1-2000");

            deleteBackwards(masked, 6);

            assert.equal(masked.value(), "1-200_");
            assert.equal(caret(input[0])[0], 5);
        });

        it("BACKSPACE over static char ending at mask specific numeric chars", function() {
            var masked = createMasked(input, "00-00-00");
            masked.value("00-00");

            deleteBackwards(masked, 6);

            assert.equal(masked.value(), "00-00-__");
            assert.equal(caret(input[0])[0], 5);
        });

        it("BACKSPACE over static char ending at mask specific letter chars", function() {
            var masked = createMasked(input, "LL-LL-00");
            masked.value("LL-LL");

            deleteBackwards(masked, 6);

            assert.equal(masked.value(), "LL-LL-__");
            assert.equal(caret(input[0])[0], 5);
        });

        it("delete prompt char before ambiguous static char", function() {
            var masked = createMasked(input, "0-0\\00");
            masked.value("1-_0_");

            deleteBackwards(masked, 3);

            assert.equal(masked.value(), "1-_0_");
            assert.equal(caret(input[0])[0], 2);
        });

        it("delete content before ambiguous static char", function() {
            var masked = createMasked(input, "0-0\\00");
            masked.value("1-40_");

            deleteBackwards(masked, 3);

            assert.equal(masked.value(), "1-_0_");
            assert.equal(caret(input[0])[0], 2);
        });

        it("removes whole value", function() {
            var masked = createMasked(input, "(000) 0000-000");
            masked.value("(123) 1234-123");
            deleteContent(masked, 0, 14);

            assert.equal(input.val(), "(___) ____-___");
            assert.equal(caret(input[0])[0], 1);
        });

        it("removes symbol on DELETE", function() {
            var masked = createMasked(input, "0-0");
            masked.value("2-2");
            deleteContent(masked, 0);

            assert.equal(input.val(), "2-_");
            assert.equal(caret(input[0])[0], 0);
        });

        it("removes selected text on DELETE", function() {
            var masked = createMasked(input, "0--0");
            masked.value("2--2");
            deleteContent(masked, 0, 4);

            assert.equal(input.val(), "_--_");
            assert.equal(caret(input[0])[0], 0);
        });


        it("honours all static characters on DELETE", function() {
            var masked = createMasked(input, "0--00");
            masked.value("2--22");
            deleteContent(masked, 1);

            assert.equal(input.val(), "2--22");
            assert.equal(caret(input[0])[0], 3);
        });

        it("with simple mask honours a static character on DELETE", function() {
            var masked = createMasked(input, "0-00");
            masked.value("2-22");
            deleteContent(masked, 1);

            assert.equal(input.val(), "2-22");
            assert.equal(caret(input[0])[0], 2);
        });

        it("honours empty spaces on DELETE", function() {
            var masked = createMasked(input, "0-00");
            masked.value("_-_2");
            deleteContent(masked, 0);

            assert.equal(input.val(), "_-2_");
            assert.equal(caret(input[0])[0], 0);
        });

        it("does not prevent ENTER", function() {
            createMasked(input, "0-0");

            input.trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER,
                preventDefault: function() {
                    assert.isOk(false);
                }
            });
        });


        it("supports pasting a valid value", function() {
            var masked = createMasked(input, "0000");
            masked.value("____");
            updateInput(masked, "1234");

            assert.equal(input.val(), "1234");
            assert.equal(caret(input[0])[0], 4);
        });

        it("unmasks before inserting pasted value", function() {
            var masked = createMasked(input, "00--00");
            masked.value("12--34");
            updateInput(masked, "56");

            assert.equal(input.val(), "56--12");
            assert.equal(caret(input[0])[0], 4);
        });

        it("pastes correctly when caret is on static symbol", function() {
            var masked = createMasked(input, "00--00");
            masked.value("12--34");
            updateInputAt(masked, "56", 2);

            assert.equal(input.val(), "12--56");
            assert.equal(caret(input[0])[0], 6);
        });

        it("delete existing content keeps the mask", function() {
            var masked = createMasked(input, "(000) 000");
            masked.value("(123) 555");
            input.val("(125");
            masked.inputChange();

            assert.equal(input.val(), "(125) ___");
        });

        it("inserts value correctly after unmasking multiple selection", function() {
            var masked = createMasked(input, "(000) 000");
            input.val("(123) 555");
            updateInputAt(masked, "77", 5);

            assert.equal(input.val(), "(123) 775");
            assert.equal(caret(input[0])[0], 8);
        });

        it("supports cutting/delete through context menu", function() {
            var masked = createMasked(input, "(000) 000");
            masked.value("123555");

            input.val("(123)");
            caret(input[0], 5);
            masked.inputChange();

            assert.equal(input.val(), "(123) ___");
        });

        it("allows space in middle of mask", function() {
            var masked = createMasked(input, "(000) 999");
            input.val(masked._emptyMask);
            updateInputAt(masked, " ", 6);

            assert.equal(input.val(), "(___)  __");
        });

        it("allows any character if no mask", function() {
            var maskedtextbox = new MaskedTextBox(input);

            input.focus();
            caret(input[0], 0);

            stub(maskedtextbox, {
                _mask: maskedtextbox._mask
            });

            input.trigger("input");

            assert.equal(maskedtextbox.calls("_mask"), 0);
        });

        it("add duplicated content", function() {
            var masked = createMasked(input, "00-0000");
            masked.value("12-3456");

            updateInputAt(masked, "34", 3);

            assert.equal(masked.value(), "12-3434");
        });

        it("replace with partially duplicated content", function() {
            var masked = createMasked(input, "00-0000");
            masked.value("12-3456");

            input.val("12-6");
            updateInputAt(masked, "34", 3);

            assert.equal(masked.value(), "12-346_");
        });

        it("insert multiple over a static char", function() {
            var masked = createMasked(input, "0-00\\00");
            masked.value("1-__0_");

            updateInputAt(masked, "123", 2);

            assert.equal(masked.value(), "1-1203");
        });

    });
}());
