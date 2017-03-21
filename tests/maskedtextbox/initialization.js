(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input;

    module("kendo.ui.MaskedTextBox initialization", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);

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

    test("MaskedTextBox attaches a maskedtextbox object to a target", function() {
        var maskedtextbox = new MaskedTextBox(input);

        ok(input.data("kendoMaskedTextBox") instanceof MaskedTextBox);
    });

    test("MaskedTextBox add k-textbox class to the element", function() {
        var maskedtextbox = new MaskedTextBox(input);

        ok(input.hasClass("k-textbox"));
    });

    test("MaskedTextBox add autocomplete='off' attr", function() {
        var maskedtextbox = new MaskedTextBox(input);

        ok(input.attr("autocomplete"), "off");
    });

    test("MaskedTextBox extends built-in rules", function() {
        var rule = /[+-]/;
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "~-0",
            rules: {
                "~": rule
            }
        });

        input.focus();
        kendo.caret(input[0], 0);
        input.pressKey("+");

        equal(input.val(), "+-_");
    });

    test("MaskedTextBox does not extend rules in the prototype", function() {
        var rule = /[+-]/;
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0",
            rules: {
                "~": rule
            }
        });

        notEqual(MaskedTextBox.fn.rules["~"], rule);
    });

    test("MaskedTextBox tokenize specified mask", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        var tokens = maskedtextbox.tokens;

        equal(tokens[0], maskedtextbox.rules["0"]);
        equal(tokens[1], "-");
        equal(tokens[2], maskedtextbox.rules["0"]);
    });

    test("MaskedTextBox replace '.' token with current decimal separator", function() {
        kendo.culture("bg-BG");

        var numberFormat = kendo.culture().numberFormat;
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0.0"
        });

        var tokens = maskedtextbox.tokens;
        equal(tokens[1], numberFormat["."]);

        kendo.culture("en-US");
    });

    test("MaskedTextBox replace ',' token with current group separator", function() {
        kendo.culture("bg-BG");

        var numberFormat = kendo.culture().numberFormat;
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0,0"
        });

        var tokens = maskedtextbox.tokens;
        equal(tokens[1], numberFormat[","]);

        kendo.culture("en-US");
    });

    test("MaskedTextBox replace '$' token with current currency symbol", function() {
        kendo.culture("bg-BG");

        var numberFormat = kendo.culture().numberFormat;
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "00 $"
        });

        var tokens = maskedtextbox.tokens;
        var chars = numberFormat.currency.symbol.split("");
        var tokenIdx = 3;

        expect(chars.length);

        for (var idx = 0, length = chars.length; idx < length; idx++) {
            equal(tokens[tokenIdx + idx], chars[idx]);
        }

        kendo.culture("en-US");
    });

    test("MaskedTextBox supports escaping mask symbols", function() {
        var numberFormat = kendo.culture().numberFormat;
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "\\&"
        });

        var tokens = maskedtextbox.tokens;
        equal(tokens[0], "&");
        equal(tokens.length, 1);
    });

    test("MaskedTextBox sets value on init", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "00-00",
            value: "9999"
        });

        equal(input.val(), "99-99");
    });

    test("MaskedTextBox does not focus if the element is not active", function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "00-00",
            value: "9999"
        });

        notEqual(input[0], document.activeElement);
    });

    test("MaskedTextBox honours input disabled attr", function() {
        var maskedtextbox = new MaskedTextBox(input.attr("disabled", true), {
            mask: "00-00",
            value: "9999"
        });

        ok(input.hasClass("k-state-disabled"));
    });

    test("MaskedTextBox gets value from input element", function() {
        input.val("test99");
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "00-00"
        });

        equal(input.val(), "99-__");
    });

    asyncTest("form reset support", 1, function() {
        input.attr("value", "1234");

        var form = $("<form/>").appendTo(QUnit.fixture).append(input);

        var maskedtextbox = new MaskedTextBox(input, {
            mask: "00-00"
        });

        maskedtextbox.value("5678");

        form[0].reset();

        setTimeout(function() {
            equal(maskedtextbox.element.val(), "12-34");
            start();
        }, 100);
    });

    asyncTest("support for form defined by attribute", 1, function() {
        input.attr("form", "form1").attr("value", "1234");

        var form = $("<form id='form1'/>").appendTo(QUnit.fixture);

        var maskedtextbox = new MaskedTextBox(input, {
            mask: "00-00"
        });

        maskedtextbox.value("5678");

        form[0].reset();

        setTimeout(function() {
            equal(maskedtextbox.element.val(), "12-34");
            start();
        }, 100);
    });

    test("unmask value on form post", 1, function() {
        input.attr("value", "1234");

        var form = $("<form/>").appendTo(QUnit.fixture).append(input);

        var maskedtextbox = new MaskedTextBox(input, {
            mask: "00-00",
            unmaskOnPost: true
        });

        form.submit(function(e) {
            e.preventDefault();

            equal(input.val(), "1234");
        });

        form.submit();
    });

    test("do not unmask value on form post if unmaskOnPost is false", 1, function() {
        input.attr("value", "1234");

        var form = $("<form/>").appendTo(QUnit.fixture).append(input);

        var maskedtextbox = new MaskedTextBox(input, {
            mask: "00-00"
        });

        form.submit(function(e) {
            e.preventDefault();

            equal(input.val(), "12-34");
        });

        form.submit();
    });

    test("MaskedTextBox is disabled when placed in disabled fieldset", function() {
        $(input).wrap('<fieldset disabled="disabled"></fieldset>');
        input.kendoMaskedTextBox().data("kendoMaskedTextBox");
        equal(input.attr("disabled"), "disabled");
    });
})();
