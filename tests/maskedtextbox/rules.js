/* globals createMasked, updateChars, updateInput, createInput */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox;
    var input;
    var caret = kendo.caret;

    describe("kendo.ui.MaskedTextBox rules", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
            input.val("");
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });


        it("Rule '0' allows only a digit", function() {
            var masked = createMasked(input, "0");
            updateChars(masked, "3");

            assert.equal(input.val(), "3");
        });

        it("Rule '0' does not allow empty space", function() {
            var masked = createMasked(input, "0");
            updateChars(masked, " ");

            assert.equal(input.val(), "_");
            assert.equal(caret(input[0])[0], 0);
        });

        it("Rule '9' allows digit", function() {
            var masked = createMasked(input, "9");
            updateChars(masked, "3");

            assert.equal(input.val(), "3");
        });

        it("Rule '9' allows space", function() {
            var masked = createMasked(input, "99");
            updateChars(masked, " ");

            assert.equal(input.val(), " _");
        });

        it("Rule '#' allows digit", function() {
            var masked = createMasked(input, "#");
            updateChars(masked, "3");

            assert.equal(input.val(), "3");
        });

        it("Rule '#' allows space", function() {
            var masked = createMasked(input, "##");
            updateChars(masked, " ");

            assert.equal(input.val(), " _");
        });

        it("Rule '#' allows '+'", function() {
            var masked = createMasked(input, "##");
            updateChars(masked, "+");

            assert.equal(input.val(), "+_");
        });

        it("Rule '#' allows '-'", function() {
            var masked = createMasked(input, "##");
            updateChars(masked, "-");

            assert.equal(input.val(), "-_");
        });

        it("Rule 'L' allows an alphabetical symbol", function() {
            var masked = createMasked(input, "LL");
            updateChars(masked, "Ab");

            assert.equal(input.val(), "Ab");
        });

        it("Rule 'L' does not allow space", function() {
            var masked = createMasked(input, "LL");
            updateInput(masked, " ");

            assert.equal(input.val(), "__");
        });

        it("Rule 'L' does not allow digit", function() {
            var masked = createMasked(input, "LL");
            updateInput(masked, "3");

            assert.equal(input.val(), "__");
        });

        it("Rule '?' allows an alphabetical symbol", function() {
            var masked = createMasked(input, "??");
            updateChars(masked, "Ab");

            assert.equal(input.val(), "Ab");
        });

        it("Rule '?' allows space", function() {
            var masked = createMasked(input, "??");
            updateInput(masked, " ");

            assert.equal(input.val(), " _");
        });

        it("Rule '?' does not allow digit", function() {
            var masked = createMasked(input, "??");
            updateInput(masked, "3");

            assert.equal(input.val(), "__");
        });

        it("Rule '&' allows any character", function() {
            var masked = createMasked(input, "&&&&");
            updateChars(masked, "3a.~");

            assert.equal(input.val(), "3a.~");
        });

        it("Rule '&' does not allow space", function() {
            var masked = createMasked(input, "&");
            updateInput(masked, " ");

            assert.equal(input.val(), "_");
        });

        it("Rule 'C' allows any character", function() {
            var masked = createMasked(input, "CCCC");
            updateChars(masked, "3a.~");

            assert.equal(input.val(), "3a.~");
        });

        it("Rule 'C' allows space", function() {
            var masked = createMasked(input, "C");
            updateInput(masked, " ");

            assert.equal(input.val(), " ");
        });

        it("Rule 'A' allows alphanumeric character", function() {
            var masked = createMasked(input, "AA");
            updateChars(masked, "3a");

            assert.equal(input.val(), "3a");
        });

        it("Rule 'A' does not allow non-alphanumeric characters", function() {
            var masked = createMasked(input, "A");
            updateInput(masked, "~");

            assert.equal(input.val(), "_");
        });

        it("Rule 'a' allows alphanumeric character", function() {
            var masked = createMasked(input, "aa");
            updateChars(masked, "3a");

            assert.equal(input.val(), "3a");
        });

        it("Rule 'a' allows space", function() {
            var masked = createMasked(input, "a");
            updateInput(masked, " ");

            assert.equal(input.val(), " ");
        });

        it("Rule 'a' does not allow non-alphanumeric characters", function() {
            var masked = createMasked(input, "a");
            updateInput(masked, "~");

            assert.equal(input.val(), "_");
        });

        it("Support for custom rule", function() {
            MaskedTextBox.fn.rules["~"] = /[+-]/;

            var masked = createMasked(input, "~");
            updateInput(masked, "+");

            assert.equal(input.val(), "+");
        });

        it("Support for rule defined as function", function() {
            MaskedTextBox.fn.rules["~"] = function(chr) {
                return chr === "3";
            };

            var masked = createMasked(input, "~");
            updateInput(masked, "3");

            assert.equal(input.val(), "3");
        });

    });
}());
