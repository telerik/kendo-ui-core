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

    test("enable method with false disables widget", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.enable(false);

        ok(input.attr("disabled"));
        ok(input.hasClass("k-state-disabled"));
    });

    test("enable method with true enables widget", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.enable(false);
        maskinput.enable(true);

        ok(!input.attr("disabled"));
        ok(!input.hasClass("k-state-disabled"));
    });

    test("enable method removes readonly attribute", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        input.attr("readonly", true);

        maskinput.enable();

        ok(!input.attr("readonly"));
    });

    test("readonly method makes widget readonly", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.readonly();

        ok(input.attr("readonly"));
    });

    test("readonly method with false makes widget editable ", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.readonly();
        maskinput.readonly(false);

        ok(!input.attr("readonly"));
    });

    test("readonly method removes disabled attribute and class", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)"
        });

        maskinput.enable(false);
        maskinput.readonly();

        ok(!input.attr("disabled"));
        ok(!input.hasClass("k-state-disabled"));
    });

    test("setOptions changes the mask", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)",
            value: "1234"
        });

        maskinput.setOptions({
            mask: "00---0"
        });

        equal(maskinput.value(), "12---3");
    });

    test("setOptions changes the mask (leaves empty spaces)", function() {
        var maskinput = new MaskInput(input, {
            mask: "(00-00)",
            value: "12"
        });

        maskinput.setOptions({
            mask: "00---0"
        });

        equal(maskinput.value(), "12---_");
    });
})();
