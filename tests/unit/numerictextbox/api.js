import '@progress/kendo-ui/src/kendo.numerictextbox.js';
import '@progress/kendo-ui/src/cultures/kendo.culture.de-DE.js';
import '@progress/kendo-ui/src/cultures/kendo.culture.bg-BG.js';
import '@progress/kendo-ui/src/cultures/kendo.culture.en-ZA.js';
import { stub } from '../../helpers/unit/stub.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let NumericTextBox = kendo.ui.NumericTextBox,
    input;

describe("kendo.ui.NumericTextBox API", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("_change should call _update() method", function() {
        let textbox = new NumericTextBox(input);

        stub(textbox, { _update: textbox._update });

        textbox._change("22");

        assert.equal(textbox.calls("_update"), 1);
        assert.equal(textbox.value(), 22);
    });

    it("_step adjusts value", function() {
        let textbox = new NumericTextBox(input, {
            value: 10,
            max: 10
        });

        textbox._step(1);

        assert.equal(textbox.value(), 10);
        assert.equal(textbox.element.val(), "10");
    });


    it("_step modify input value", function() {
        let textbox = new NumericTextBox(input);

        textbox._step(1);

        assert.equal(textbox.value(), 1);
        assert.equal(textbox.element.val(), "1");
    });

    it("_step parse passed _step", function() {
        let textbox = new NumericTextBox(input);

        textbox._step("10");

        assert.equal(textbox.value(), 10);
        assert.equal(textbox.element.val(), "10");
    });

    it("_step persist element value", function() {
        let textbox = new NumericTextBox(input);

        input.val("10");
        textbox._step(1);

        assert.equal(textbox.value(), 11);
        assert.equal(textbox.element.val(), "11");
    });

    it("value method should return current value", function() {
        let textbox = new NumericTextBox(input), value = 10;

        textbox._value = value;

        assert.equal(textbox.value(), value);
    });

    it("value should parse value and set _value", function() {
        let textbox = new NumericTextBox(input), value = "12.32";

        textbox.value(value);

        assert.deepEqual(textbox.value(), 12.32);
    });

    it("value should set value of the input", function() {
        let textbox = new NumericTextBox(input), value = "12.32";

        textbox.value(value);

        assert.equal(input.val(), value);
    });

    it("set value to the INPUT element should have correct decimals", function() {
        let textbox = new NumericTextBox(input), value = "12.347";

        textbox.value(value);

        assert.equal(input.val(), "12.35");
    });

    it("set value to the INPUT element should have correct decimals", function() {
        let textbox = new NumericTextBox(input), value = "12.347";

        textbox.value(value);

        assert.equal(input.val(), "12.35");
    });

    it("value should be fixed", function() {
        let textbox = new NumericTextBox(input), value = "12.347";

        textbox.value(value);

        assert.equal(input.val(), "12.35");
    });

    it("value method clears value when argument is null", function() {
        let textbox = new NumericTextBox(input, {
            min: 10,
            value: 20
        });

        textbox.value(null);

        assert.equal(textbox.value(), null);
    });

    it("value method should refresh the floating label", function() {
        let textbox = new NumericTextBox(input, {
            value: 12.34,
            format: "n0",
            label: {
                content: "Set age",
                floating: true
            }
        }), value = "24";

        textbox.value(value);

        assert.isOk(!textbox.floatingLabel.element.hasClass("k-empty"));
    });

    it("formatted value should be set to _text", function() {
        let textbox = new NumericTextBox(input), value = "12.347";

        textbox.value(value);

        assert.equal(textbox._text.val(), "12.35");
    });

    it("value of the currency textbox", function() {
        let textbox = new NumericTextBox(input, {
            format: "c"
        }),
            value = "12.347",
            number = 12.35;

        textbox.value(value);

        assert.equal(textbox.value(), number);
        assert.equal(input.val(), number.toString());
        assert.equal(textbox._text.val(), kendo.toString(number, "c"));
    });

    it("value of the percent textbox", function() {
        let textbox = new NumericTextBox(input, {
            format: "p"
        }),
            value = "12.347",
            number = 12.35;

        textbox.value(value);

        assert.equal(textbox.value(), number);
        assert.equal(input.val(), number.toString());
        assert.equal(textbox._text.val(), kendo.toString(number, "p"));
    });

    it("set null", function() {
        let textbox = new NumericTextBox(input.val("10"));

        textbox.value(null);

        assert.equal(textbox._value, null);
        assert.equal(textbox.element.val(), "");
        assert.equal(textbox._text.val(), "");
    });

    it("set value with custom decimal numbers", function() {
        let textbox = new NumericTextBox(input),
            value = 12.3777777;

        textbox.options.format = "n3";
        textbox.options.decimals = 3;

        textbox.value(value);

        assert.equal(textbox._value, 12.378);
        assert.equal(textbox.element.val(), value.toFixed(3));
        assert.equal(textbox._text.val(), kendo.toString(value, "n3"));
    });

    it("value() does not set value if it is out of range", function() {
        let textbox = new NumericTextBox(input, {
            max: 12.35
        }),
            value = 12.3777777;

        textbox.value(value);

        assert.equal(textbox._value, null);
    });

    it("value() can set null", function() {
        let textbox = new NumericTextBox(input, {
            value: 10,
            max: 12.35
        });

        textbox.value(null);

        assert.equal(textbox._value, null);
    });

    it("enable(false) should disable input element", function() {
        let textbox = new NumericTextBox(input),
            text = textbox._text;

        textbox.enable(false);

        assert.isOk(!input.is(":visible"));
        assert.include(["disabled", "true"], input.attr("disabled"));

        assert.isOk(text.is(":visible"));
        assert.include(["disabled", "true"], text.attr("disabled"));
    });

    it("enable(false) should unbind arrows mousedown event", function() {
        let textbox = new NumericTextBox(input);

        textbox.enable(false);

        stub(textbox, { _step: textbox._step });

        textbox._upArrow.mousedown();
        textbox._downArrow.mousedown();

        assert.equal(textbox.calls("_step"), 0);
    });

    it("enable() should remove disable attribute", function() {

        let textbox = new NumericTextBox(input),
            text = textbox._text;

        textbox.enable(false);
        textbox.enable(true);

        assert.isOk(!input.is(":visible"));
        assert.equal(input.attr("disabled"), undefined);

        assert.isOk(text.is(":visible"));
        assert.equal(text.attr("disabled"), undefined);
    });

    it("readonly() makes  input element readonly", function() {
        let numerictextbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox.readonly();

        assert.include(["readonly", "true"], numerictextbox.element.attr("readonly"));
        assert.include(["readonly", "true"], numerictextbox._text.attr("readonly"));
    });

    it("readonly() unbinds icon click", function() {
        let numerictextbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox.readonly();

        numerictextbox._upArrowEventHandler.notify("press");

        assert.equal(numerictextbox.value(), null);
    });

    it("readonly(false) removes readonly attribute", function() {
        let numerictextbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox.readonly();
        numerictextbox.readonly(false);

        assert.equal(numerictextbox.element.attr("readonly"), undefined);
        assert.equal(numerictextbox._text.attr("readonly"), undefined);
    });

    it("readonly() removes disabled attribute and disabled class", function() {
        let numerictextbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox.enable(false);
        numerictextbox.readonly();

        assert.include(["readonly", "true"], numerictextbox.element.attr("readonly"));
        assert.equal(numerictextbox.element.attr("disabled"), undefined);
        assert.include(["readonly", "true"], numerictextbox._text.attr("readonly"));
        assert.equal(numerictextbox._text.attr("disabled"), undefined);
        assert.isOk(!numerictextbox.wrapper.hasClass("k-disabled"));
    });

    it("enable(false) removes readonly attribute and default class", function() {
        let numerictextbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox.readonly();
        numerictextbox.enable(false);

        assert.equal(numerictextbox.element.attr("readonly"), undefined);
        assert.include(["disabled", "true"], numerictextbox.element.attr("disabled"));
        assert.equal(numerictextbox._text.attr("readonly"), undefined);
        assert.include(["disabled", "true"], numerictextbox._text.attr("disabled"));
        assert.isOk(numerictextbox.wrapper.hasClass("k-disabled"));
    });

    it("enable() enables widget after readonly()", function() {
        let numerictextbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox.readonly();
        numerictextbox.enable();

        assert.equal(numerictextbox.element.attr("readonly"), undefined);
        assert.equal(numerictextbox.element.attr("disabled"), undefined);
        assert.equal(numerictextbox._text.attr("readonly"), undefined);
        assert.equal(numerictextbox._text.attr("disabled"), undefined);
        assert.isOk(!numerictextbox.wrapper.hasClass("k-disabled"));
    });

    it("_blur should hide the input text and show the _text", function() {
        let textbox = new NumericTextBox(input);

        assert.isOk(!input.is(":visible"));
        assert.isOk(textbox._text.is(":visible"));
    });

    it("NumericTextBox gets correct numeric format depending on the format field", function() {
        kendo.culture().numberFormat.percent.decimals = 4;

        let textbox = new NumericTextBox(input, {
            format: "P"
        }),
            value = "12.3447",
            number = 12.3447;

        textbox.value(value);

        assert.equal(textbox.value(), number);
        assert.equal(input.val(), number.toString());
        assert.equal(textbox._text.val(), kendo.toString(number, "p"));

        kendo.culture().numberFormat.percent.decimals = 2;
    });

    it("value method uses options.culture to parse value", function() {
        let textbox = new NumericTextBox(input, {
            culture: "bg-BG"
        });

        textbox.value("10,20");

        assert.equal(textbox.value(), 10.20);
        assert.equal(textbox._text.val(), kendo.toString(10.20, "n", "bg-BG"));
    });

    it("min method sets min value", function() {
        let textbox = new NumericTextBox(input);

        textbox.min("10");

        assert.equal(textbox.options.min, 10);
    });

    it("min method sets max value", function() {
        let textbox = new NumericTextBox(input, {
            culture: "bg-BG"
        });

        textbox.max("10,10");

        assert.equal(textbox.options.max, 10.10);
    });

    it("min method sets 0 value", function() {
        let textbox = new NumericTextBox(input, {
            culture: "bg-BG"
        });

        textbox.max(0);

        assert.equal(textbox.options.max, 0);
    });

    it("min method changes min attribute", function() {
        let textbox = new NumericTextBox(input);

        textbox.min(-10.12);
        assert.equal(textbox.element.attr("min"), -10.12);
    });

    it("max method changes max attribute", function() {
        let textbox = new NumericTextBox(input);

        textbox.max(10.12);
        assert.equal(textbox.element.attr("max"), 10.12);
    });

    it("step method sets step value", function() {
        let textbox = new NumericTextBox(input, {
            culture: "bg-BG"
        });

        textbox.step("0,1");

        assert.equal(textbox.options.step, 0.1);
    });

    it("step method does not sets 0", function() {
        let textbox = new NumericTextBox(input, {
            culture: "bg-BG"
        });

        textbox.step(0);

        assert.equal(textbox.options.step, 1);
    });

    it("step method sets step attribute", function() {
        let textbox = new NumericTextBox(input);

        textbox.step("0.1");

        assert.equal(textbox.element.attr("step"), 0.1);
    });

    it("focusing text input should call _focus", function() {
        let textbox = new NumericTextBox(input);

        let origin = window.setTimeout;
        window.setTimeout = function(func) { func(); };

        textbox._text.focus();

        assert.isOk(input.is(":visible"));
        assert.isOk(!textbox._text.is(":visible"));

        window.setTimeout = origin;
    });

    asyncTest("focus method should should place carret in editable input", function(done) {
        let textbox = new NumericTextBox(input);

        textbox.focus();

        window.setTimeout(function() {
            done(() => assert.equal(document.activeElement, input[0]));
        }, 200);
    });

    asyncTest("focus method should select the text when selectOnFocus is enabled", function(done) {
        let textbox = new NumericTextBox(input, { selectOnFocus: true, value: 15 });

        textbox.focus();

        setTimeout(function() {
            done(() => assert.equal(input[0].value.substring(input[0].selectionStart, input[0].selectionEnd), "15"));
        }, 100);
    });

    it("on blur should hide input text", function() {
        let textbox = new NumericTextBox(input);

        let origin = window.setTimeout;
        window.setTimeout = function(func) { func(); };

        textbox._text.focus();

        input.blur();

        assert.isOk(!input.is(":visible"));
        assert.isOk(textbox._text.is(":visible"));

        window.setTimeout = origin;
    });

    it("value method uses correct number info when parse en-ZA currency number", function() {
        let textbox = new NumericTextBox(input, {
            culture: "en-ZA",
            format: "c",
            value: "12,44"
        });

        assert.equal(textbox.value(), 12.44);
    });

    it("value method uses correct number info when parse en-ZA currency number", function() {
        let textbox = new NumericTextBox(input, {
            culture: "bg-BG",
            format: "n2",
            value: "12,44"
        });

        assert.equal(textbox.element.val(), "12,44");
    });

    it("NumericTextBox keeps user defined title when new value is set", function() {
        let title = "foo";
        let textbox = input.attr("title", title).kendoNumericTextBox().data("kendoNumericTextBox");

        textbox.value(10);

        assert.equal(textbox._text.attr("title"), title);
    });

    it("NumericTextBox updates title when new value is set", function() {
        let textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        textbox.value(10);

        assert.equal(textbox._text.attr("title"), 10);

        textbox.value(20);

        assert.equal(textbox._text.attr("title"), 20);
    });

    it("NumericTextBox should persist decimals when used with culture which decimal mark is coma and factor specified.", function() {
        kendo.culture('de-DE');

        let textbox = new NumericTextBox(input, {
            culture: "de-DE",
            format: "p4",
            decimals: 4,
            factor: 100
        });

        textbox.element.val("12,44");
        textbox.element.trigger("blur");

        assert.equal(textbox.element.val(), "12,44");

        kendo.culture('en-EN');
    });

    it("NumericTextBox setOptions works as expected", function() {
        let textbox = new NumericTextBox(input, {
            min: 1,
            max: 20,
            value: 4,
            factor: 100,
            placeholder: "test"
        });
        textbox.setOptions({
            min: 2,
            max: 40,
            value: 14,
            factor: 1,
            placeholder: "new holder"
        });

        assert.equal(textbox._text.attr("placeholder"), "new holder");
        assert.equal(textbox.element.attr("aria-valuemin"), "2");
        assert.equal(textbox.element.attr("aria-valuemax"), "40");
        assert.equal(textbox.value(), 14);
    });

    it("NumericTextBox setOptions max property is smaller than initial value", function() {
        let textbox = new NumericTextBox(input, {
            value: 10,
            placeholder: "test"
        });
        textbox.setOptions({
            max: 5,
            placeholder: "new holder"
        });

        assert.equal(textbox.value(), null);
    });

    it("NumericTextBox setOptions max property is larger than initial value", function() {
        let textbox = new NumericTextBox(input, {
            value: 10,
            placeholder: "test"
        });
        textbox.setOptions({
            max: 15,
            placeholder: "new holder"
        });

        assert.equal(textbox.value(), 10);
    });

    it("NumericTextBox setOptions correctly shows spinners", function() {
        let textbox = new NumericTextBox(input, {
            spinners: false
        });
        textbox.setOptions({
            spinners: true
        });

        assert.equal(textbox._arrowsWrap.is(":visible"), true);
        assert.equal(textbox.wrapper.hasClass("k-expand-padding"), false);
    });

    it("Spinners work after setOptions call", function() {
        let textbox = new NumericTextBox(input, {
            value: 5
        });
        textbox.setOptions({
            value: 10
        });

        textbox._upArrowEventHandler.notify("press");

        assert.equal(textbox.value(), 11);
    });

    it("NumericTextBox setOptions correctly sets spinners size", function() {
        let textbox = new NumericTextBox(input, {
            spinners: true
        });
        textbox.setOptions({
            size: "large"
        });

        assert.equal(textbox._arrowsWrap.is(":visible"), true);
        assert.equal(textbox._arrowsWrap.index(), 3);
        assert.equal(textbox._arrowsWrap.find(".k-button-lg").length, 2);
    });

    it("NumericTextBox setOptions correctly hides spinners", function() {
        let textbox = new NumericTextBox(input, {
            spinners: true
        });
        textbox.setOptions({
            spinners: false
        });

        assert.equal(textbox._arrowsWrap.is(":visible"), false);
    });

    it("floating numbers should be calculated correctly when using spinners", function() {
        let textbox = new NumericTextBox(input, {
            value: 0.06,
            step: 0.01,
            round: false
        });

        textbox._upArrow.mousedown();

        assert.equal(textbox.value(), 0.07);
    });

    it("calling value caches the text for the input", function() {
        let textbox = new NumericTextBox(input);

        textbox.value(15);

        assert.equal(textbox._oldText, "15");
    });

    it("setOptions modifies label", function() {
        let textbox = new NumericTextBox(input);

        textbox.setOptions({ label: "123" });

        assert.equal(textbox.wrapper.prev().text(), "123");
    });

    it("setOptions does not remove disabled state", function() {
        input.attr("disabled", true);
        let textbox = new NumericTextBox(input);

        textbox.setOptions({});

        assert.isOk(textbox.element.is("[disabled]"));
    });

    it("setOptions does not remove readonly state", function() {
        input.attr("readonly", true);
        let textbox = new NumericTextBox(input);

        textbox.setOptions({});

        assert.isOk(textbox.element.is("[readonly]"));
    });
});
