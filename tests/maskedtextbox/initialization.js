/* globals updateInput, createInput */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input;

    describe("kendo.ui.MaskedTextBox initialization", function() {
        beforeEach(function() {
            input = createInput();
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("MaskedTextBox Should render wrapper", function() {
            var maskedtextbox = new MaskedTextBox(input);
            var wrapper = maskedtextbox.wrapper;
            assert.equal(wrapper.length, 1);
            assert.isOk(wrapper.hasClass("k-maskedtextbox"));
        });

        it("MaskedTextBox Should apply input css to wrapper", function() {
            var cssText = "color: red;";
            input[0].style.cssText = cssText;
            var maskedtextbox = new MaskedTextBox(input);
            var wrapper = maskedtextbox.wrapper;

            assert.equal(wrapper[0].style.cssText, cssText);
        });

        it("MaskedTextBox Should apply input classes to wrapper", function() {
            var className = "test-class";
            input[0].className = className;
            var maskedtextbox = new MaskedTextBox(input);
            var wrapper = maskedtextbox.wrapper;

            assert.isOk(wrapper.hasClass(className));
        });

        it("MaskedTextBox attaches a maskedtextbox object to a target", function() {
            var maskedtextbox = new MaskedTextBox(input);

            assert.isOk(input.data("kendoMaskedTextBox") instanceof MaskedTextBox);
        });

        it("MaskedTextBox add k-textbox class to the element", function() {
            var maskedtextbox = new MaskedTextBox(input);

            assert.isOk(input.hasClass("k-textbox"));
        });

        it("MaskedTextBox add autocomplete='off' attr", function() {
            var maskedtextbox = new MaskedTextBox(input);

            assert.isOk(input.attr("autocomplete"), "off");
        });

        it("MaskedTextBox extends built-in rules", function() {
            var rule = /[+-]/;
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "~-0",
                rules: {
                    "~": rule
                }
            });

            updateInput(maskedtextbox, "+");

            assert.equal(input.val(), "+-_");
        });

        it("MaskedTextBox does not extend rules in the prototype", function() {
            var rule = /[+-]/;
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "0-0",
                rules: {
                    "~": rule
                }
            });

            assert.notEqual(MaskedTextBox.fn.rules["~"], rule);
        });

        it("MaskedTextBox tokenize specified mask", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "0-0"
            });

            var tokens = maskedtextbox.tokens;

            assert.equal(tokens[0], maskedtextbox.rules["0"]);
            assert.equal(tokens[1], "-");
            assert.equal(tokens[2], maskedtextbox.rules["0"]);
        });

        it("MaskedTextBox replace '.' token with current decimal separator", function() {
            kendo.culture("bg-BG");

            var numberFormat = kendo.culture().numberFormat;
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "0.0"
            });

            var tokens = maskedtextbox.tokens;
            assert.equal(tokens[1], numberFormat["."]);

            kendo.culture("en-US");
        });

        it("MaskedTextBox replace ',' token with current group separator", function() {
            kendo.culture("bg-BG");

            var numberFormat = kendo.culture().numberFormat;
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "0,0"
            });

            var tokens = maskedtextbox.tokens;
            assert.equal(tokens[1], numberFormat[","]);

            kendo.culture("en-US");
        });

        it("MaskedTextBox replace '$' token with current currency symbol", function() {
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
                assert.equal(tokens[tokenIdx + idx], chars[idx]);
            }

            kendo.culture("en-US");
        });

        it("MaskedTextBox supports escaping mask symbols", function() {
            var numberFormat = kendo.culture().numberFormat;
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "\\&"
            });

            var tokens = maskedtextbox.tokens;
            assert.equal(tokens[0], "&");
            assert.equal(tokens.length, 1);
        });

        it("MaskedTextBox sets value on init", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "00-00",
                value: "9999"
            });

            assert.equal(input.val(), "99-99");
        });

        it("MaskedTextBox does not focus if the element is not active", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "00-00",
                value: "9999"
            });

            assert.notEqual(input[0], document.activeElement);
        });

        it("MaskedTextBox honours input disabled attr", function() {
            var maskedtextbox = new MaskedTextBox(input.attr("disabled", true), {
                mask: "00-00",
                value: "9999"
            });

            assert.isOk(maskedtextbox.wrapper.hasClass("k-state-disabled"));
        });

        it("MaskedTextBox gets value from input element", function() {
            input.val("test99");
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "00-00"
            });

            assert.equal(input.val(), "99-__");
        });

        it("form reset support", function(done) {
            input.attr("value", "1234");

            var form = $("<form/>").appendTo(Mocha.fixture).append(input);

            var maskedtextbox = new MaskedTextBox(input, {
                mask: "00-00"
            });

            maskedtextbox.value("5678");

            form[0].reset();

            setTimeout(function() {
                assert.equal(maskedtextbox.element.val(), "12-34");
                done();
            }, 100);
        });

        it("support for form defined by attribute", function(done) {
            input.attr("form", "form1").attr("value", "1234");

            var form = $("<form id='form1'/>").appendTo(Mocha.fixture);

            var maskedtextbox = new MaskedTextBox(input, {
                mask: "00-00"
            });

            maskedtextbox.value("5678");

            form[0].reset();

            setTimeout(function() {
                assert.equal(maskedtextbox.element.val(), "12-34");
                done();
            }, 100);
        });

        it("unmask value on form post", function() {
            input.attr("value", "1234");

            var form = $("<form/>").appendTo(Mocha.fixture).append(input);

            var maskedtextbox = new MaskedTextBox(input, {
                mask: "00-00",
                unmaskOnPost: true
            });

            form.submit(function(e) {
                e.preventDefault();

                assert.equal(input.val(), "1234");
            });

            form.submit();
        });

        it("do not unmask value on form post if unmaskOnPost is false", function() {
            input.attr("value", "1234");

            var form = $("<form/>").appendTo(Mocha.fixture).append(input);

            var maskedtextbox = new MaskedTextBox(input, {
                mask: "00-00"
            });

            form.submit(function(e) {
                e.preventDefault();

                assert.equal(input.val(), "12-34");
            });

            form.submit();
        });

        it("MaskedTextBox is disabled when placed in disabled fieldset", function() {
            $(input).wrap('<fieldset disabled="disabled"></fieldset>');
            input.kendoMaskedTextBox().data("kendoMaskedTextBox");
            assert.equal(input.attr("disabled"), "disabled");
        });
    });
}());
