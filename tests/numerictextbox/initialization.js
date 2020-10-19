(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        input;

    describe("kendo.ui.NumericTextBox initialization", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("Should render wrapper", function() {
            var textbox = new NumericTextBox(input),
                wrapper = textbox.wrapper,
                innerWrapper = wrapper.children();

            assert.equal(wrapper[0].className, "k-widget k-numerictextbox");

            assert.isOk(innerWrapper.eq(0).hasClass("k-numeric-wrap"));
            assert.equal(innerWrapper.length, 1);
        });

        it("Should render up and down arrows", function() {
            var textbox = new NumericTextBox(input),
                upArrow = textbox._upArrow,
                downArrow = textbox._downArrow;

            assert.isOk(upArrow.parent().hasClass("k-select"));

            assert.isOk(upArrow.hasClass("k-link"));
            assert.isOk(upArrow.hasClass("k-link-increase"));
            assert.equal(upArrow.attr("aria-label"), textbox.options.upArrowText);

            assert.isOk(downArrow.hasClass("k-link"));
            assert.isOk(downArrow.hasClass("k-link-decrease"));
            assert.equal(downArrow.attr("aria-label"), textbox.options.downArrowText);

            assert.isOk(upArrow.children(":first").hasClass("k-icon k-i-arrow-60-up"));
            assert.isOk(downArrow.children(":first").hasClass("k-icon k-i-arrow-60-down"));
            assert.equal(upArrow.children(":first").html(), "");
            assert.equal(downArrow.children(":first").html(), "");
        });

        it("Should render INPUT containing the formatted value", function() {
            input.addClass("custom").css("color", "red");

            var textbox = new NumericTextBox(input),
                text = textbox._text;

            assert.isOk(text.is(":visible"));
            assert.isOk(!input.is(":visible"));
            assert.isOk(text[0].nodeName, "INPUT");
            assert.isOk(text.hasClass("k-input"));
            assert.isOk(text.hasClass("custom"));
            assert.isOk(text.hasClass("k-formatted-value"));
            assert.equal(text.attr("aria-hidden"), "true");
            assert.isOk(text[0].style.cssText.indexOf("color: red") != -1);
            assert.equal(text.next()[0].nodeName, "INPUT");
        });

        it("Move accesskey to the visible input", function() {
            input.attr("accesskey", "w");
            var textbox = new NumericTextBox(input);

            assert.equal(textbox._text.attr("accesskey"), "w");
            assert.equal(textbox.element.attr("accesskey"), "");
        });

        it("Copy tabindex to the visible input", function() {
            input.attr("tabindex", 3);
            var textbox = new NumericTextBox(input);

            assert.equal(textbox._text.prop("tabindex"), 3);
            assert.equal(textbox.element.prop("tabindex"), 3);
        });

        it("Change type of the element", function() {
            var textbox = new NumericTextBox($('<input type="number" />').appendTo(Mocha.fixture));

            assert.equal(textbox.element[0].type, "text");
        });

        it("Should get value from input", function() {
            var textbox = new NumericTextBox(input.val("12"));

            assert.equal(textbox.value(), 12);
            assert.equal(textbox.element.val(), "12");
            assert.equal(textbox._text.val(), "12.00");
        });

        it("Bind change events", function() {
            var textbox = new NumericTextBox(input.val("12"), {
                change: function() { }
            });

            assert.equal(textbox._events["change"][0], textbox.options.change);
        });

        it("Get min/max value from the input", function() {
            var textbox = new NumericTextBox($("<input type='number' min='1' max='12' />").appendTo(Mocha.fixture));

            assert.equal(textbox.options.min, 1);
            assert.equal(textbox.options.max, 12);
        });

        it("Get step value from the input", function() {
            var textbox = new NumericTextBox($("<input type='number' step='10' />").appendTo(Mocha.fixture));

            assert.equal(textbox.options.step, 10);
        });

        it("strip format", function() {
            var textbox = new NumericTextBox($("<input type='number' step='10' />").appendTo(Mocha.fixture), {
                format: "{0:c}"
            });

            assert.equal(textbox.options.format, "c");
        });

        it("NumericTextBox uses specific culture", function() {
            var textbox = new NumericTextBox(input, {
                value: 10,
                format: "n",
                culture: "de-DE"
            });

            assert.equal(textbox._text.val(), "10,00");
        });

        it("NumericTextBox can parse value in invariant culture", function() {
            var textbox = new NumericTextBox($("<input type='number' value='1.5' />").appendTo(Mocha.fixture), {
                format: "n",
                culture: "de-DE"
            });

            assert.equal(textbox._text.val(), "1,50");
        });

        it("NumericTextBox hides arrows if spinners is set to false", function() {
            var textbox = new NumericTextBox(input, {
                value: 10,
                spinners: false
            });

            assert.isOk(!textbox._upArrow.parent().is(":visible"));
            assert.isOk(textbox._inputWrapper.hasClass("k-expand-padding"));
        });

        it("NumericTextBox gets the placeholder value from the element", function() {
            input.attr("placeholder", "Select...");
            var textbox = new NumericTextBox(input);

            assert.equal(textbox.options.placeholder, "Select...");
        });

        it("NumericTextBox copies the placeholder attribute to the fake input", function() {
            input.attr("placeholder", "Select...");
            var textbox = new NumericTextBox(input);

            assert.equal(textbox._text.attr("placeholder"), "Select...");
        });

        it("copy input className to the wrapper", function() {
            var numeric = new NumericTextBox(input.addClass("test"));

            assert.isOk(numeric.wrapper.hasClass("test"));
        });

        if (!kendo.support.placeholder) {
            it("NumericTextBox sets the placeholder in the input element", function() {
                var textbox = new NumericTextBox(input, {
                    placeholder: "Select..."
                });

                assert.equal(textbox._text.val(), "Select...");
            });

            it("NumericTextBox clears the placeholder", function() {
                var textbox = new NumericTextBox(input, {
                    placeholder: "Select..."
                });

                textbox.value(10);

                assert.equal(textbox._text.val(), "10.00");
            });
        }

        it("form reset support", function(done) {
            input.attr("value", "123");

            var form = $("<form/>").appendTo(Mocha.fixture).append(input),
                textbox = new NumericTextBox(input);

            textbox.value("1");

            form[0].reset();

            setTimeout(function() {
                assert.equal(textbox.element.val(), "123");
                assert.equal(textbox._text.val(), "123.00");
                done();
            }, 200);
        });

        it("form reset support for keeping min max attributes", function(done) {
            input.attr("min", "0");
            input.attr("max", "100");

            var form = $("<form/>").appendTo(Mocha.fixture).append(input),
                textbox = new NumericTextBox(input);

            form[0].reset();

            setTimeout(function() {
                assert.equal(textbox.element[0].getAttribute("min"), "0");
                assert.equal(textbox.element[0].getAttribute("max"), "100");
                done();
            }, 200);
        });

        it("support for form defined by attribute", function(done) {
            input.attr("form", "form1").attr("value", "123");

            var form = $("<form id='form1'/>").appendTo(Mocha.fixture),
                textbox = new NumericTextBox(input);

            textbox.value("1");

            form[0].reset();

            setTimeout(function() {
                assert.equal(textbox.element.val(), "123");
                assert.equal(textbox._text.val(), "123.00");
                done();
            }, 200);
        });

        it("NumericTextBox honors readonly attribute", function() {
            var numerictextbox = input.attr("readonly", true).kendoNumericTextBox().data("kendoNumericTextBox");

            numerictextbox._upArrowEventHandler.notify("press");

            assert.equal(numerictextbox.value(), null);
        });

        it("NumericTextBox uses disabled attr over the readonly", function() {
            var numerictextbox = input.attr("readonly", true).attr("disabled", true)
                .kendoNumericTextBox().data("kendoNumericTextBox");

            assert.equal(input.attr("readonly"), undefined);
        });

        it("NumericTextBox supports negative exponential numbers", function() {
            var numerictextbox = input.kendoNumericTextBox({
                format: "n7",
                decimals: 7
            }).data("kendoNumericTextBox");

            numerictextbox.value(0.0000001);

            assert.equal(numerictextbox.element.val(), "0.0000001");
        });

        it("NumericTextBox copies input title attribute to the visible input", function() {
            var numerictextbox = input.attr("title", "foo").kendoNumericTextBox().data("kendoNumericTextBox");
            var title = input.attr("title");

            assert.equal(numerictextbox.wrapper.find(".k-formatted-value").attr("title"), title);
        });

        it("NumericTextBox copies the formatted value to the visible input aria-title attr", function() {
            var textbox = new NumericTextBox(input, { value: 10 });

            assert.equal(textbox._text.attr("title"), textbox._text.val());
        });

        it("NumericTextBox is disabled when placed in disabled fieldset", function() {
            $(input).wrap('<fieldset disabled="disabled"></fieldset>');
            input.kendoNumericTextBox().data("kendoNumericTextBox");
            assert.equal(input.attr("disabled"), "disabled");
        });

        it("Numerictextbox max and min values are reset to initial when form is reset", function(done) {
            $(input).wrap("<form id='form'></form>");
            var numeric = input.kendoNumericTextBox({
                min: 0,
                max: 4
            }).data("kendoNumericTextBox")

            numeric.max(2);
            $("form")[0].reset();
            setTimeout(function() {
                assert.equal(numeric.options.max, 4)
                done();
            }, 200)
        });

        it("widget restricts value without rounding it", function() {
            var textbox = new NumericTextBox(input, {
                round: false
            });

            textbox.focus();
            textbox.element.val("10.556").blur();

            assert.equal(textbox.value(), 10.55);
        });

        it("enable false disables the widget", function() {
            var textbox = new NumericTextBox(input, {
                enable: false
            });

            assert.isOk(textbox._inputWrapper.hasClass("k-state-disabled"));
            assert.equal(textbox._text.attr("disabled"), "disabled");
            assert.equal(textbox._text.attr("aria-disabled"), "true");
        });
    });
}());
