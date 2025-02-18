import { createInput, updateInput } from "../../helpers/unit/maskedtextbox-utils.js";
import { asyncTest } from "../../helpers/unit/async-utils.js";

    let MaskedTextBox = kendo.ui.MaskedTextBox,
        input;

    describe("kendo.ui.MaskedTextBox initialization", function() {
        beforeEach(function() {
            input = createInput();
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("MaskedTextBox Should render wrapper", function() {
            let maskedtextbox = new MaskedTextBox(input);
            let wrapper = maskedtextbox.wrapper;
            assert.equal(wrapper.length, 1);
            assert.isOk(wrapper.hasClass("k-maskedtextbox"));
        });

        it("MaskedTextBox Should apply input css to wrapper", function() {
            let cssText = "color: red;";
            input[0].style.cssText = cssText;
            let maskedtextbox = new MaskedTextBox(input);
            let wrapper = maskedtextbox.wrapper;

            assert.equal(wrapper[0].style.cssText, cssText);
        });

        it("MaskedTextBox Should apply input classes to wrapper", function() {
            let className = "test-class";
            input[0].className = className;
            let maskedtextbox = new MaskedTextBox(input);
            let wrapper = maskedtextbox.wrapper;

            assert.isOk(wrapper.hasClass(className));
        });

        it("MaskedTextBox attaches a maskedtextbox object to a target", function() {
            let maskedtextbox = new MaskedTextBox(input);

            assert.isOk(input.data("kendoMaskedTextBox") instanceof MaskedTextBox);
        });

        it("MaskedTextBox add k-input-inner class to the element", function() {
            let maskedtextbox = new MaskedTextBox(input);

            assert.isOk(input.hasClass("k-input-inner"));
        });

        it("MaskedTextBox add autocomplete='off' attr", function() {
            let maskedtextbox = new MaskedTextBox(input);

            assert.isOk(input.attr("autocomplete"), "off");
        });

        it("MaskedTextBox does not throw error on initially invalid value", function() {
            input.val(1);

            assert.doesNotThrow(() => new MaskedTextBox(input, {
                mask: "L0L 0L0",
                rules: {}
            }));
        });

        it("MaskedTextBox extends built-in rules", function() {
            let rule = /[+-]/;
            let maskedtextbox = new MaskedTextBox(input, {
                mask: "~-0",
                rules: {
                    "~": rule
                }
            });

            updateInput(maskedtextbox, "+");

            assert.equal(input.val(), "+-_");
        });

        it("MaskedTextBox does not extend rules in the prototype", function() {
            let rule = /[+-]/;
            let maskedtextbox = new MaskedTextBox(input, {
                mask: "0-0",
                rules: {
                    "~": rule
                }
            });

            assert.notEqual(MaskedTextBox.fn.rules["~"], rule);
        });

        it("MaskedTextBox tokenize specified mask", function() {
            let maskedtextbox = new MaskedTextBox(input, {
                mask: "0-0"
            });

            let tokens = maskedtextbox.tokens;

            assert.equal(tokens[0], maskedtextbox.rules["0"]);
            assert.equal(tokens[1], "-");
            assert.equal(tokens[2], maskedtextbox.rules["0"]);
        });

        it("MaskedTextBox replace '.' token with current decimal separator", function() {
            kendo.culture("bg-BG");

            let numberFormat = kendo.culture().numberFormat;
            let maskedtextbox = new MaskedTextBox(input, {
                mask: "0.0"
            });

            let tokens = maskedtextbox.tokens;
            assert.equal(tokens[1], numberFormat["."]);

            kendo.culture("en-US");
        });

        it("MaskedTextBox replace ',' token with current group separator", function() {
            kendo.culture("bg-BG");

            let numberFormat = kendo.culture().numberFormat;
            let maskedtextbox = new MaskedTextBox(input, {
                mask: "0,0"
            });

            let tokens = maskedtextbox.tokens;
            assert.equal(tokens[1], numberFormat[","]);

            kendo.culture("en-US");
        });

        it("MaskedTextBox replace '$' token with current currency symbol", function() {
            kendo.culture("bg-BG");

            let numberFormat = kendo.culture().numberFormat;
            let maskedtextbox = new MaskedTextBox(input, {
                mask: "00 $"
            });

            let tokens = maskedtextbox.tokens;
            let chars = numberFormat.currency.symbol.split("");
            let tokenIdx = 3;

            for (let idx = 0, length = chars.length; idx < length; idx++) {
                assert.equal(tokens[tokenIdx + idx], chars[idx]);
            }

            kendo.culture("en-US");
        });

        it("MaskedTextBox supports escaping mask symbols", function() {
            let numberFormat = kendo.culture().numberFormat;
            let maskedtextbox = new MaskedTextBox(input, {
                mask: "\\&"
            });

            let tokens = maskedtextbox.tokens;
            assert.equal(tokens[0], "&");
            assert.equal(tokens.length, 1);
        });

        it("MaskedTextBox sets value on init", function() {
            let maskedtextbox = new MaskedTextBox(input, {
                mask: "00-00",
                value: "9999"
            });

            assert.equal(input.val(), "99-99");
        });

        it("MaskedTextBox does not focus if the element is not active", function() {
            let maskedtextbox = new MaskedTextBox(input, {
                mask: "00-00",
                value: "9999"
            });

            assert.notEqual(input[0], document.activeElement);
        });

        it("MaskedTextBox honours input disabled attr", function() {
            let maskedtextbox = new MaskedTextBox(input.attr("disabled", true), {
                mask: "00-00",
                value: "9999"
            });

            assert.isOk(maskedtextbox.wrapper.hasClass("k-disabled"));
        });

        it("MaskedTextBox gets value from input element", function() {
            input.val("test99");
            let maskedtextbox = new MaskedTextBox(input, {
                mask: "00-00"
            });

            assert.equal(input.val(), "99-__");
        });

        asyncTest("form reset support", function(done) {
            input.attr("value", "1234");

            let form = $("<form/>").appendTo(Mocha.fixture).append(input);

            let maskedtextbox = new MaskedTextBox(input, {
                mask: "00-00"
            });

            maskedtextbox.value("5678");

            form[0].reset();

            setTimeout(function() {
                done(() => assert.equal(maskedtextbox.element.val(), "12-34"));
            }, 100);
        });

        asyncTest("support for form defined by attribute", function(done) {
            input.attr("form", "form1").attr("value", "1234");

            let form = $("<form id='form1'/>").appendTo(Mocha.fixture);

            let maskedtextbox = new MaskedTextBox(input, {
                mask: "00-00"
            });

            maskedtextbox.value("5678");

            form[0].reset();

            setTimeout(function() {
                done(() => assert.equal(maskedtextbox.element.val(), "12-34"));
            }, 100);
        });

        it("unmask value on form post", function() {
            input.attr("value", "1234");

            let form = $("<form/>").appendTo(Mocha.fixture).append(input);

            let maskedtextbox = new MaskedTextBox(input, {
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

            let form = $("<form/>").appendTo(Mocha.fixture).append(input);

            let maskedtextbox = new MaskedTextBox(input, {
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
            assert.include(["disabled", "true"], input.attr("disabled"));
        });


        it("MaskedTextBox sets correct size class", function() {
            let maskedtextbox = new MaskedTextBox(input, {
                size: "large"
            });

            assert.isOk(maskedtextbox.wrapper.hasClass("k-input-lg"));
        });

        it("MaskedTextBox sets correct fillMode class", function() {
            let maskedtextbox = new MaskedTextBox(input, {
                fillMode: "flat"
            });

            assert.isOk(maskedtextbox.wrapper.hasClass("k-input-flat"));
        });

        it("MaskedTextBox sets correct rounded class", function() {
            let maskedtextbox = new MaskedTextBox(input, {
                rounded: "large"
            });

            assert.isOk(maskedtextbox.wrapper.hasClass("k-rounded-lg"));
        });
    });
