(function() {
    var MaskInput = kendo.ui.MaskInput,
        input;

    module("kendo.ui.MaskInput api", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("value method sets a value without static chars", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.value("99");

        equal(input.val(), "(99-__)");
    });

    test("value method sets a value with static chars at the begining", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.value("(99");

        equal(input.val(), "(99-__)");
    });

    test("value method sets a value with static chars at the end", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.value("99-");

        equal(input.val(), "(99-__)");
    });

    test("value method sets a value equal to mask static chars and values", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.value("(99-99)");

        equal(input.val(), "(99-99)");
    });

    test("value method strips invalid chars", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.value("test 99 test 9");

        equal(input.val(), "(99-9_)");
    });

    test("value method clears widget value", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.value("9999");

        maskinput.value("");

        equal(input.val(), "(__-__)");
    });

    test("value method clears widget value when new value is not valid", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.value("9999");

        maskinput.value("test");

        equal(input.val(), "(__-__)");
    });

    test("value method returns widget value", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.value("9999");

        equal(maskinput.value(), "(99-99)");
    });
})();
