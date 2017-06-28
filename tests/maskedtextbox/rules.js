/* globals createMasked, updateChars, updateInput, createInput */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox;
    var input;
    var caret = kendo.caret;

    module("kendo.ui.MaskedTextBox rules", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
            input.val("");
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });


    test("Rule '0' allows only a digit", 1, function() {
        var masked = createMasked(input, "0");
        updateChars(masked, "3");

        equal(input.val(), "3");
    });

    test("Rule '0' does not allow empty space", 2, function() {
        var masked = createMasked(input, "0");
        updateChars(masked, " ");

        equal(input.val(), "_");
        equal(caret(input[0])[0], 0);
    });

    test("Rule '9' allows digit", 1, function() {
        var masked = createMasked(input, "9");
        updateChars(masked, "3");

        equal(input.val(), "3");
    });

    test("Rule '9' allows space", 1, function() {
        var masked = createMasked(input, "99");
        updateChars(masked, " ");

        equal(input.val(), " _");
    });

    test("Rule '#' allows digit", 1, function() {
        var masked = createMasked(input, "#");
        updateChars(masked, "3");

        equal(input.val(), "3");
    });

    test("Rule '#' allows space", 1, function() {
        var masked = createMasked(input, "##");
        updateChars(masked, " ");

        equal(input.val(), " _");
    });

    test("Rule '#' allows '+'", 1, function() {
        var masked = createMasked(input, "##");
        updateChars(masked, "+");

        equal(input.val(), "+_");
    });

    test("Rule '#' allows '-'", 1, function() {
        var masked = createMasked(input, "##");
        updateChars(masked, "-");

        equal(input.val(), "-_");
    });

    test("Rule 'L' allows an alphabetical symbol", 1, function() {
        var masked = createMasked(input, "LL");
        updateChars(masked, "Ab");

        equal(input.val(), "Ab");
    });

    test("Rule 'L' does not allow space", 1, function() {
        var masked = createMasked(input, "LL");
        updateInput(masked, " ");

        equal(input.val(), "__");
    });

    test("Rule 'L' does not allow digit", 1, function() {
        var masked = createMasked(input, "LL");
        updateInput(masked, "3");

        equal(input.val(), "__");
    });

    test("Rule '?' allows an alphabetical symbol", 1, function() {
        var masked = createMasked(input, "??");
        updateChars(masked, "Ab");

        equal(input.val(), "Ab");
    });

    test("Rule '?' allows space", 1, function() {
        var masked = createMasked(input, "??");
        updateInput(masked, " ");

        equal(input.val(), " _");
    });

    test("Rule '?' does not allow digit", 1, function() {
        var masked = createMasked(input, "??");
        updateInput(masked, "3");

        equal(input.val(), "__");
    });

    test("Rule '&' allows any character", 1, function() {
        var masked = createMasked(input, "&&&&");
        updateChars(masked, "3a.~");

        equal(input.val(), "3a.~");
    });

    test("Rule '&' does not allow space", 1, function() {
        var masked = createMasked(input, "&");
        updateInput(masked, " ");

        equal(input.val(), "_");
    });

    test("Rule 'C' allows any character", 1, function() {
        var masked = createMasked(input, "CCCC");
        updateChars(masked, "3a.~");

        equal(input.val(), "3a.~");
    });

    test("Rule 'C' allows space", 1, function() {
        var masked = createMasked(input, "C");
        updateInput(masked, " ");

        equal(input.val(), " ");
    });

    test("Rule 'A' allows alphanumeric character", 1, function() {
        var masked = createMasked(input, "AA");
        updateChars(masked, "3a");

        equal(input.val(), "3a");
    });

    test("Rule 'A' does not allow non-alphanumeric characters", 1, function() {
        var masked = createMasked(input, "A");
        updateInput(masked, "~");

        equal(input.val(), "_");
    });

    test("Rule 'a' allows alphanumeric character", 1, function() {
        var masked = createMasked(input, "aa");
        updateChars(masked, "3a");

        equal(input.val(), "3a");
    });

    test("Rule 'a' allows space", 1, function() {
        var masked = createMasked(input, "a");
        updateInput(masked, " ");

        equal(input.val(), " ");
    });

    test("Rule 'a' does not allow non-alphanumeric characters", 1, function() {
        var masked = createMasked(input, "a");
        updateInput(masked, "~");

        equal(input.val(), "_");
    });

    test("Support for custom rule", 1, function() {
        MaskedTextBox.fn.rules["~"] = /[+-]/;

        var masked = createMasked(input, "~");
        updateInput(masked, "+");

        equal(input.val(), "+");
    });

    test("Support for rule defined as function", 1, function() {
        MaskedTextBox.fn.rules["~"] = function(chr) {
            return chr === "3";
        };

        var masked = createMasked(input, "~");
        updateInput(masked, "3");

        equal(input.val(), "3");
    });

})();
