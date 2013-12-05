(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        input;

    module("kendo.ui.NumericTextBox API", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("_change should call _update() method", function() {
        var textbox = new NumericTextBox(input);

        stub(textbox, {_update: textbox._update});

        textbox._change("22");

        equal(textbox.calls("_update"), 1);
        equal(textbox.value(), 22);
    });

    test("_step adjusts value", function() {
        var textbox = new NumericTextBox(input, {
            value: 10,
            max: 10
        });

        textbox._step(1);

        equal(textbox.value(), 10);
        equal(textbox.element.val(), "10");
    });


    test("_step modify input value", function() {
        var textbox = new NumericTextBox(input);

        textbox._step(1);

        equal(textbox.value(), 1);
        equal(textbox.element.val(), "1");
    });

    test("_step parse passed _step", function() {
        var textbox = new NumericTextBox(input);

        textbox._step("10");

        equal(textbox.value(), 10);
        equal(textbox.element.val(), "10");
    });

    test("_step persist element value", function() {
        var textbox = new NumericTextBox(input);

        input.val("10");
        textbox._step(1);

        equal(textbox.value(), 11);
        equal(textbox.element.val(), "11");
    });

    test("value method should return current value", function() {
        var textbox = new NumericTextBox(input), value = 10;

        textbox._value = value;

        equal(textbox.value(), value);
    });

    test("value should parse value and set _value", function() {
        var textbox = new NumericTextBox(input), value = "12.32";

        textbox.value(value);

        deepEqual(textbox.value(), 12.32);
    });

    test("value should set value of the input", function() {
        var textbox = new NumericTextBox(input), value = "12.32";

        textbox.value(value);

        equal(input.val(), value);
    });

    test("set value to the INPUT element should have correct decimals", function() {
        var textbox = new NumericTextBox(input), value = "12.347";

        textbox.value(value);

        equal(input.val(), "12.35");
    });

    test("set value to the INPUT element should have correct decimals", function() {
        var textbox = new NumericTextBox(input), value = "12.347";

        textbox.value(value);

        equal(input.val(), "12.35");
    });

    test("value should be fixed", function() {
        var textbox = new NumericTextBox(input), value = "12.347";

        textbox.value(value);

        equal(input.val(), "12.35");
    });

    test("value method clears value when argument is null", function() {
        var textbox = new NumericTextBox(input, {
            min: 10,
            value: 20
        })

        textbox.value(null);

        equal(textbox.value(), null);
    });

    test("formatted value should be set to _text", function() {
        var textbox = new NumericTextBox(input), value = "12.347";

        textbox.value(value);

        equal(textbox._text.val(), "12.35");
    });

    test("value of the currency textbox", function() {
        var textbox = new NumericTextBox(input, {
                format: "c"
            }),
            value = "12.347",
            number = 12.35;

        textbox.value(value);

        equal(textbox.value(), number);
        equal(input.val(), number.toString());
        equal(textbox._text.val(), kendo.toString(number, "c"));
    });

    test("value of the percent textbox", function() {
        var textbox = new NumericTextBox(input, {
                format: "p"
            }),
            value = "12.347",
            number = 12.35;

        textbox.value(value);

        equal(textbox.value(), number);
        equal(input.val(), number.toString());
        equal(textbox._text.val(), kendo.toString(number, "p"));
    });

    test("set null", function() {
        var textbox = new NumericTextBox(input.val("10"));

        textbox.value(null);

        equal(textbox._value, null);
        equal(textbox.element.val(), "");
        equal(textbox._text.val(), "");
    });

    test("set value with custom decimal numbers", function() {
        var textbox = new NumericTextBox(input),
            value = 12.3777777;

        textbox.options.format = "n3";
        textbox.options.decimals = 3;

        textbox.value(value);

        equal(textbox._value, 12.378);
        equal(textbox.element.val(), value.toFixed(3));
        equal(textbox._text.val(), kendo.toString(value, "n3"));
    });

    test("value() does not set value if it is out of range", function() {
        var textbox = new NumericTextBox(input, {
            max: 12.35
        }),
        value = 12.3777777;

        textbox.value(value);

        equal(textbox._value, null);
    });

    test("value() can set null", function() {
        var textbox = new NumericTextBox(input, {
            value: 10,
            max: 12.35
        });

        textbox.value(null);

        equal(textbox._value, null);
    });

    test("enable(false) should disable input element", function() {
        var textbox = new NumericTextBox(input),
            text = textbox._text;

        textbox.enable(false);

        ok(!input.is(":visible"));
        equal(input.attr("disabled"), "disabled");

        ok(text.is(":visible"));
        equal(text.attr("disabled"), "disabled");
    });

    test("enable(false) should unbind arrows mousedown event", function() {
        var textbox = new NumericTextBox(input);

        textbox.enable(false);

        stub(textbox, {_step: textbox._step});

        textbox._upArrow.mousedown();
        textbox._downArrow.mousedown();

        equal(textbox.calls("_step"), 0);
    });

    test("enable() should remove disable attribute", function() {

        var textbox = new NumericTextBox(input),
            text = textbox._text;

        textbox.enable(false);
        textbox.enable(true);

        ok(!input.is(":visible"));
        equal(input.attr("disabled"), undefined);

        ok(text.is(":visible"));
        equal(text.attr("disabled"), undefined);
    });

    test("readonly() makes  input element readonly", function() {
        var numerictextbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox.readonly();

        equal(numerictextbox.element.attr("readonly"), "readonly");
        equal(numerictextbox._text.attr("readonly"), "readonly");
    });

    test("readonly() unbinds icon click", function() {
        var numerictextbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox.readonly();

        numerictextbox._upArrowEventHandler.notify("press");

        equal(numerictextbox.value(), null);
    });

    test("readonly(false) removes readonly attribute", function() {
        var numerictextbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox.readonly();
        numerictextbox.readonly(false);

        equal(numerictextbox.element.attr("readonly"), undefined);
        equal(numerictextbox._text.attr("readonly"), undefined);
    });

    test("readonly() removes disabled attribute and disabled class", function() {
        var numerictextbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox.enable(false);
        numerictextbox.readonly();

        equal(numerictextbox.element.attr("readonly"), "readonly");
        equal(numerictextbox.element.attr("disabled"), undefined);
        equal(numerictextbox._text.attr("readonly"), "readonly");
        equal(numerictextbox._text.attr("disabled"), undefined);
        ok(numerictextbox._inputWrapper.hasClass("k-state-default"));
        ok(!numerictextbox._inputWrapper.hasClass("k-state-disabled"));
    });

    test("enable(false) removes readonly attribute and default class", function() {
        var numerictextbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox.readonly();
        numerictextbox.enable(false);

        equal(numerictextbox.element.attr("readonly"), undefined);
        equal(numerictextbox.element.attr("disabled"), "disabled");
        equal(numerictextbox._text.attr("readonly"), undefined);
        equal(numerictextbox._text.attr("disabled"), "disabled");
        ok(!numerictextbox._inputWrapper.hasClass("k-state-default"));
        ok(numerictextbox._inputWrapper.hasClass("k-state-disabled"));
    });

    test("enable() enables widget after readonly()", function() {
        var numerictextbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox.readonly();
        numerictextbox.enable();

        equal(numerictextbox.element.attr("readonly"), undefined);
        equal(numerictextbox.element.attr("disabled"), undefined);
        equal(numerictextbox._text.attr("readonly"), undefined);
        equal(numerictextbox._text.attr("disabled"), undefined);
        ok(numerictextbox._inputWrapper.hasClass("k-state-default"));
        ok(!numerictextbox._inputWrapper.hasClass("k-state-disabled"));
    });

    test("_blur should hide the input text and show the _text", function() {
        var textbox = new NumericTextBox(input);

        ok(!input.is(":visible"));
        ok(textbox._text.is(":visible"));
    });

    test("NumericTextBox gets correct numeric format depending on the format field", function() {
        kendo.culture().numberFormat.percent.decimals = 4;

        var textbox = new NumericTextBox(input, {
                format: "P"
            }),
            value = "12.3447",
            number = 12.3447;

        textbox.value(value);

        equal(textbox.value(), number);
        equal(input.val(), number.toString());
        equal(textbox._text.val(), kendo.toString(number, "p"));

        kendo.culture().numberFormat.percent.decimals = 2;
    });

    test("value method uses options.culture to parse value", function() {
        var textbox = new NumericTextBox(input, {
            culture: "bg-BG"
        });

        textbox.value("10,20");

        equal(textbox.value(), 10.20);
        equal(textbox._text.val(), kendo.toString(10.20, "n", "bg-BG"));
    });

    test("min method sets min value", function() {
        var textbox = new NumericTextBox(input);

        textbox.min("10");

        equal(textbox.options.min, 10);
    });

    test("min method sets max value", function() {
        var textbox = new NumericTextBox(input, {
            culture: "bg-BG"
        });

        textbox.max("10,10");

        equal(textbox.options.max, 10.10);
    });

    test("min method sets 0 value", function() {
        var textbox = new NumericTextBox(input, {
            culture: "bg-BG"
        });

        textbox.max(0);

        equal(textbox.options.max, 0);
    });

    test("min method changes min attribute", function() {
        var textbox = new NumericTextBox(input);

        textbox.min(-10.12);
        equal(textbox.element.attr("min"), -10.12);
    });

    test("max method changes max attribute", function() {
        var textbox = new NumericTextBox(input);

        textbox.max(10.12);
        equal(textbox.element.attr("max"), 10.12);
    });

    test("step method sets step value", function() {
        var textbox = new NumericTextBox(input, {
            culture: "bg-BG"
        });

        textbox.step("0,1");

        equal(textbox.options.step, 0.1);
    });

    test("step method does not sets 0", function() {
        var textbox = new NumericTextBox(input, {
            culture: "bg-BG"
        });

        textbox.step(0);

        equal(textbox.options.step, 1);
    });

    test("step method sets step attribute", function() {
        var textbox = new NumericTextBox(input);

        textbox.step("0.1");

        equal(textbox.element.attr("step"), 0.1);
    });

    test("focusing text input should call _focus", 2, function() {
        var textbox = new NumericTextBox(input);

        var origin = window.setTimeout;
        window.setTimeout = function(func) { func() };

        textbox._text.focus();

        ok(input.is(":visible"));
        ok(!textbox._text.is(":visible"));

        window.setTimeout = origin;
    });

    test("focus method should should place carret in editable input", function() {
        var textbox = new NumericTextBox(input);

        textbox.focus();

        stop();

        window.setTimeout(function(){
            start();
            equal(document.activeElement, input[0]);
        }, 200);
    });

    test("on blur should hide input text", 2, function() {
        var textbox = new NumericTextBox(input);

        var origin = window.setTimeout;
        window.setTimeout = function(func) { func() };

        textbox._text.focus();

        input.blur();

        ok(!input.is(":visible"));
        ok(textbox._text.is(":visible"));

        window.setTimeout = origin;
    });

    test("value method uses correct number info when parse en-ZA currency number", function() {
        var textbox = new NumericTextBox(input, {
            culture: "en-ZA",
            format: "c",
            value: "12,44"
        });

        equal(textbox.value(), 12.44);
    });

    test("value method uses correct number info when parse en-ZA currency number", function() {
        var textbox = new NumericTextBox(input, {
            culture: "bg-BG",
            format: "n2",
            value: "12,44"
        });

        equal(textbox.element.val(), "12,44");
    });
})();
