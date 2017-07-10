/* globals stub, updateInput, createInput */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input,
        STATE_DISABLED = "k-state-disabled";

    module("kendo.ui.MaskedTextBox api", {
        setup: function() {
            input = createInput();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("value method sets a value without static chars", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.value("99");

        equal(input.val(), "(99-__)");
    });

    test("value method sets a value with static chars at the begining", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.value("(99");

        equal(input.val(), "(99-__)");
    });

    test("value method sets a value with static chars at the end", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.value("99-");

        equal(input.val(), "(99-__)");
    });

    test("value method sets a value equal to mask static chars and values", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.value("(99-99)");

        equal(input.val(), "(99-99)");
    });

    test("value method strips invalid chars", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.value("test 99 test 9");

        equal(input.val(), "(99-9_)");
    });

    test("value method clears widget value", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.value("9999");

        maskedtextbox.value("");

        equal(input.val(), "");
    });

    test("value method clears widget value when new value is not valid", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.value("9999");

        maskedtextbox.value("test");

        equal(input.val(), "");
    });

    test("value method returns widget value", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.value("9999");

        equal(maskedtextbox.value(), "(99-99)");
    });

    test("value method does not mask if no options.mask", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            value: "12"
        });

        equal(maskedtextbox.value(), "12");

        maskedtextbox.value("10");

        equal(maskedtextbox.value(), "10");
    });

    test("value method converts null to empty string", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(LL-00)"
        });

        maskedtextbox.value(null);

        equal(input.val(), "");
    });

    test("raw method returns unmasked widget value", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)",
            value: "99-9"
        });

        equal(maskedtextbox.raw(), "999");
    });

    test("raw method returns empty value if widget has no value", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        equal(maskedtextbox.raw(), "");
    });

    test("enable method with false disables widget", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.enable(false);

        ok(input.attr("disabled"));
        ok(maskedtextbox.wrapper.hasClass(STATE_DISABLED));
    });

    test("enable method with true enables widget", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.enable(false);
        maskedtextbox.enable(true);

        ok(!input.attr("disabled"));
        ok(!maskedtextbox.wrapper.hasClass(STATE_DISABLED));
    });

    test("enable method removes readonly attribute", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        input.attr("readonly", true);

        maskedtextbox.enable();

        ok(!input.attr("readonly"));
    });

    test("readonly method makes widget readonly", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.readonly();

        ok(input.attr("readonly"));
    });

    test("readonly method with false makes widget editable ", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.readonly();
        maskedtextbox.readonly(false);

        ok(!input.attr("readonly"));
    });

    test("readonly method removes disabled attribute and class", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.enable(false);
        maskedtextbox.readonly();

        ok(!input.attr("disabled"));
        ok(!maskedtextbox.wrapper.hasClass(STATE_DISABLED));
    });

    test("setOptions changes the mask", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)",
            value: "1234"
        });

        maskedtextbox.setOptions({
            mask: "00---0"
        });

        equal(maskedtextbox.value(), "12---3");
    });

    test("setOptions changes the mask (leaves empty spaces)", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)",
            value: "12"
        });

        maskedtextbox.setOptions({
            mask: "00---0"
        });

        equal(maskedtextbox.value(), "12---_");
    });

    test("setOptions changes promptChar option", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)",
            value: "12"
        });

        maskedtextbox.setOptions({
            promptChar: " "
        });

        equal(maskedtextbox.value(), "(12-  )");
    });

    test("setOptions extends built-in rules", function() {
        var rule = /[+-]/;
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "~-0"
        });

        maskedtextbox.setOptions({
            rules: {
                "~": rule
            }
        });

        updateInput(maskedtextbox, "+");

        equal(input.val(), "+-_");
    });

    test("setOptions unbinds input events if no mask", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)",
            value: "12"
        });

        stub(maskedtextbox, {
            _mask: maskedtextbox._mask
        });

        maskedtextbox.setOptions({
            mask: ""
        });

        input.trigger({
            keyCode: 60,
            type: "keypress"
        });

        equal(maskedtextbox.calls("_mask"), 0);
    });

    test("setOptions binds input events if mask is set", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            value: "12"
        });

        maskedtextbox.setOptions({
            mask: "(00-00)"
        });

        stub(maskedtextbox, {
            _mask: maskedtextbox._mask
        });

        input.focus();
        input.trigger({
            type: "input"
        });

        equal(maskedtextbox.calls("_mask"), 2);
    });

    test("value method does not strip the last character from the value", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "\\1\\0A\\ 00\\ 00\\ 000\\ 00\\ L0\\ \\00",
        });

        maskedtextbox.value("100 14 36 085 17 W6 00");

        equal(input.val(), "100 14 36 085 17 W6 00");
    });

    test("value method does not strip the last character from the value", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(9\\9\\9) \\000-0000",
        });

        maskedtextbox.value("(123) 456-7890");

        equal(input.val(), "(199) 023-4567");
    });
})();
