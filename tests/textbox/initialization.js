(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        input;

    module("kendo.ui.NumericTextBox initialization", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Should render wrapper", function() {
        var textbox = new NumericTextBox(input),
            wrapper = textbox.wrapper,
            innerWrapper = wrapper.children();

        equal(wrapper[0].className, "k-widget k-numerictextbox");

        ok(innerWrapper.eq(0).hasClass("k-numeric-wrap"));
        equal(innerWrapper.length, 1);
    });

    test("Should render up and down arrows", function() {
        var textbox = new NumericTextBox(input),
            upArrow = textbox._upArrow,
            downArrow = textbox._downArrow;

        ok(upArrow.parent().hasClass("k-select"));
        ok(upArrow.hasClass("k-link"));
        ok(downArrow.hasClass("k-link"));
        ok(upArrow.children(":first").hasClass("k-icon k-i-arrow-n"));
        ok(downArrow.children(":first").hasClass("k-icon k-i-arrow-s"));
        equal(upArrow.children(":first").attr("title"), textbox.options.upArrowText);
        equal(downArrow.children(":first").attr("title"), textbox.options.downArrowText);
        equal(upArrow.children(":first").html(), textbox.options.upArrowText);
        equal(downArrow.children(":first").html(), textbox.options.downArrowText);
    });

    test("Should render INPUT containing the formatted value", function() {
        input.addClass("custom").css("color", "red");

        var textbox = new NumericTextBox(input),
            text = textbox._text;

        ok(text.is(":visible"));
        ok(!input.is(":visible"));
        ok(text[0].nodeName, "INPUT");
        ok(text.hasClass("k-input"));
        ok(text.hasClass("custom"));
        ok(text.hasClass("k-formatted-value"));
        ok(text[0].style.cssText.indexOf("color: red") != -1);
        equal(text.next()[0].nodeName, "INPUT");
    });

    test("Move accesskey to the visible input", function() {
        input.attr("accesskey", "w");
        var textbox = new NumericTextBox(input);

        equal(textbox._text.attr("accesskey"), "w");
        equal(textbox.element.attr("accesskey"), "");
    });

    test("Copy tabindex to the visible input", function() {
        input.attr("tabindex", 3);
        var textbox = new NumericTextBox(input);

        equal(textbox._text.prop("tabindex"), 3);
        equal(textbox.element.prop("tabindex"), 3);
    });

    test("Change type of the element", function() {
        var textbox = new NumericTextBox($('<input type="number" />').appendTo(QUnit.fixture));

        equal(textbox.element[0].type, "text");
    });

    test("Should get value from input", function() {
        var textbox = new NumericTextBox(input.val("12"));

        equal(textbox.value(), 12);
        equal(textbox.element.val(), "12");
        equal(textbox._text.val(), "12.00");
    });

    test("Bind change events", function() {
        var textbox = new NumericTextBox(input.val("12"), {
            change: function() {}
        });

        equal(textbox._events["change"][0], textbox.options.change);
    });

    test("Get min/max value from the input", function() {
       var textbox = new NumericTextBox($("<input type='number' min='1' max='12' />").appendTo(QUnit.fixture));

       equal(textbox.options.min, 1);
       equal(textbox.options.max, 12);
    });

    test("Get step value from the input", function() {
        var textbox = new NumericTextBox($("<input type='number' step='10' />").appendTo(QUnit.fixture));

       equal(textbox.options.step, 10);
    });

    test("strip format", function() {
        var textbox = new NumericTextBox($("<input type='number' step='10' />").appendTo(QUnit.fixture), {
            format: "{0:c}"
        });

        equal(textbox.options.format, "c");
    });

    test("NumericTextBox uses specific culture", function() {
        var textbox = new NumericTextBox(input, {
            value: 10,
            format: "n",
            culture: "de-DE"
        });

        equal(textbox._text.val(), "10,00");
    });

    test("NumericTextBox hides arrows if spinners is set to false", function() {
        var textbox = new NumericTextBox(input, {
            value: 10,
            spinners: false
        });

        ok(!textbox._upArrow.parent().is(":visible"));
        ok(textbox._inputWrapper.hasClass("k-expand-padding"));
    });

    test("NumericTextBox gets the placeholder value from the element", function() {
        input.attr("placeholder", "Select...");
        var textbox = new NumericTextBox(input);

        equal(textbox.options.placeholder, "Select...");
    });

    test("NumericTextBox copies the placeholder attribute to the fake input", function() {
        input.attr("placeholder", "Select...");
        var textbox = new NumericTextBox(input);

        equal(textbox._text.attr("placeholder"), "Select...");
    });

    test("copy input className to the wrapper", function() {
        var numeric = new NumericTextBox(input.addClass("test"));

        ok(numeric.wrapper.hasClass("test"));
    });

    if (!kendo.support.placeholder) {
        test("NumericTextBox sets the placeholder in the input element", function() {
            var textbox = new NumericTextBox(input, {
                placeholder: "Select..."
            });

            equal(textbox._text.val(), "Select...");
        });

        test("NumericTextBox clears the placeholder", function() {
            var textbox = new NumericTextBox(input, {
                placeholder: "Select..."
            });

            textbox.value(10);

            equal(textbox._text.val(), "10.00");
        });
    }

    asyncTest("form reset support", 2, function() {
        input.attr("value", "123");

        var form = $("<form/>").appendTo(QUnit.fixture).append(input),
            textbox = new NumericTextBox(input);

        textbox.value("1");

        form[0].reset();

        setTimeout(function() {
            equal(textbox.element.val(), "123");
            equal(textbox._text.val(), "123.00");
            start();
        }, 200);
    });

    asyncTest("support for form defined by attribute", 2, function() {
        input.attr("form", "form1").attr("value", "123");

        var form = $("<form id='form1'/>").appendTo(QUnit.fixture),
            textbox = new NumericTextBox(input);

        textbox.value("1");

        form[0].reset();

        setTimeout(function() {
            equal(textbox.element.val(), "123");
            equal(textbox._text.val(), "123.00");
            start();
        }, 200);
    });

    test("NumericTextBox honors readonly attribute", function() {
        var numerictextbox = input.attr("readonly", true).kendoNumericTextBox().data("kendoNumericTextBox");

        numerictextbox._upArrowEventHandler.notify("press");

        equal(numerictextbox.value(), null);
    });

    test("NumericTextBox uses disabled attr over the readonly", function() {
        var numerictextbox = input.attr("readonly", true).attr("disabled", true)
                              .kendoNumericTextBox().data("kendoNumericTextBox");

        equal(input.attr("readonly"), undefined);
    });

    test("NumericTextBox supports negative exponential numbers", function() {
        var numerictextbox = input.kendoNumericTextBox({
            format: "n7",
            decimals: 7
        }).data("kendoNumericTextBox");

        numerictextbox.value(0.0000001);

        equal(numerictextbox.element.val(), "0.0000001");
    });

    test("NumericTextBox copies input title attribute to the visible input", function() {
        var numerictextbox = input.attr("title", "foo").kendoNumericTextBox().data("kendoNumericTextBox");
        var title = input.attr("title");

        equal(numerictextbox.wrapper.find(".k-formatted-value").attr("title"), title);
    });

    test("NumericTextBox is disabled when placed in disabled fieldset", function() {
        $(input).wrap('<fieldset disabled="disabled"></fieldset>');
        input.kendoNumericTextBox().data("kendoNumericTextBox");
        equal(input.attr("disabled"), "disabled");
    });

    asyncTest("Numerictextbox max and min values are reset to initial when form is reset", 1, function() {
        $(input).wrap("<form id='form'></form>");
        var numeric = input.kendoNumericTextBox({
            min: 0,
            max: 4
        }).data("kendoNumericTextBox")

        numeric.max(2);
        $("form")[0].reset();
        setTimeout(function() {
            equal(numeric.options.max, 4)
            start();
        },200)
    });

})();
