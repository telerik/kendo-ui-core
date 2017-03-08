(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input;
    var LETTER_REGEX = /[a-z]{1,3}/;
    var NUMBER_REGEX = /[0-9]{1,3}/;

    module("kendo.ui.MaskedTextBox api", {
        setup: function() {
            input = createInput();
            setupPressKey();
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

    test("value method sets a value with static chars at the beginning", function() {
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

    test("value method sets partial value which is part of group rule", 2, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            rules: {
                "xyz": LETTER_REGEX
            }
        });

        maskedtextbox.value("x");

        equal(maskedtextbox.value(), "x__")
        equal(input.val(), "x__");
    });

    test("value method sets partial value at the start of a group", 2, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            value: "abc",
            rules: {
                "xyz": LETTER_REGEX
            }
        });

        maskedtextbox.value("xbc");

        equal(maskedtextbox.value(), "xbc")
        equal(input.val(), "xbc");
    });

    test("value method sets partial value in the middle of a group", 2, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            value: "abc",
            rules: {
                "xyz": LETTER_REGEX
            }
        });

        maskedtextbox.value("axc");

        equal(maskedtextbox.value(), "axc");
        equal(input.val(), "axc");
    });

    test("value method sets partial value at the end of a group", 2, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            value: "abc",
            rules: {
                "xyz": LETTER_REGEX
            }
        });

        maskedtextbox.value("abx");

        equal(maskedtextbox.value(), "abx")
        equal(input.val(), "abx");
    });

    test("value method sets full value to a group", 2, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            rules: {
                "xyz": LETTER_REGEX
            }
        });

        maskedtextbox.value("abc");

        equal(maskedtextbox.value(), "abc")
        equal(input.val(), "abc");
    });

    test("value method sets value with chars and a group", 2, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0xyz9",
            rules: {
                "xyz": LETTER_REGEX
            }
        });

        maskedtextbox.value("1abc2");

        equal(maskedtextbox.value(), "1abc2")
        equal(input.val(), "1abc2");
    });

    test("value method sets value with multiple groups", 2, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz123",
            rules: {
                "xyz": LETTER_REGEX,
                "123": NUMBER_REGEX
            }
        });

        maskedtextbox.value("abc1");

        equal(maskedtextbox.value(), "abc1__")
        equal(input.val(), "abc1__");
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

    test("raw method returns partial unmasked group value at the beginning", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            value: "1__",
            rules: {
                "xyz": NUMBER_REGEX
            }
        });

        equal(maskedtextbox.raw(), "1");
    });

    test("raw method returns partial unmasked group value in the middle", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            value: "_1_",
            rules: {
                "xyz": NUMBER_REGEX
            }
        });

        equal(maskedtextbox.raw(), "1");
    });

    test("raw method returns partial unmasked group value at the end", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            value: "__1",
            rules: {
                "xyz": NUMBER_REGEX
            }
        });

        equal(maskedtextbox.raw(), "1");
    });

    test("raw method returns unmasked group value", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "xyz",
            value: "123",
            rules: {
                "xyz": NUMBER_REGEX
            }
        });

        equal(maskedtextbox.raw(), maskedtextbox.options.value);
    });

    test("enable method with false disables widget", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.enable(false);

        ok(input.attr("disabled"));
        ok(input.hasClass("k-state-disabled"));
    });

    test("enable method with true enables widget", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(00-00)"
        });

        maskedtextbox.enable(false);
        maskedtextbox.enable(true);

        ok(!input.attr("disabled"));
        ok(!input.hasClass("k-state-disabled"));
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
        ok(!input.hasClass("k-state-disabled"));
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

        input.focus();
        kendo.caret(input[0], 0);
        input.pressKey("+");

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

        input.trigger({
            keyCode: 60,
            type: "keypress"
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
