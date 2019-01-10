/* globals stub, updateInput, createInput */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input,
        STATE_DISABLED = "k-state-disabled";

    describe("kendo.ui.MaskedTextBox api", function() {
        beforeEach(function() {
            input = createInput();
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("value method sets a value without static chars", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.value("99");

            assert.equal(input.val(), "(99-__)");
        });

        it("value method sets a value with static chars at the begining", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.value("(99");

            assert.equal(input.val(), "(99-__)");
        });

        it("value method sets a value with static chars at the end", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.value("99-");

            assert.equal(input.val(), "(99-__)");
        });

        it("value method sets a value equal to mask static chars and values", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.value("(99-99)");

            assert.equal(input.val(), "(99-99)");
        });

        it("value method strips invalid chars", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.value("test 99 test 9");

            assert.equal(input.val(), "(99-9_)");
        });

        it("value method clears widget value", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.value("9999");

            maskedtextbox.value("");

            assert.equal(input.val(), "");
        });

        it("value method clears widget value when new value is not valid", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.value("9999");

            maskedtextbox.value("test");

            assert.equal(input.val(), "");
        });

        it("value method returns widget value", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.value("9999");

            assert.equal(maskedtextbox.value(), "(99-99)");
        });

        it("value method does not mask if no options.mask", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                value: "12"
            });

            assert.equal(maskedtextbox.value(), "12");

            maskedtextbox.value("10");

            assert.equal(maskedtextbox.value(), "10");
        });

        it("value method converts null to empty string", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(LL-00)"
            });

            maskedtextbox.value(null);

            assert.equal(input.val(), "");
        });

        it("raw method returns unmasked widget value", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)",
                value: "99-9"
            });

            assert.equal(maskedtextbox.raw(), "999");
        });

        it("raw method returns empty value if widget has no value", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            assert.equal(maskedtextbox.raw(), "");
        });

        it("enable method with false disables widget", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.enable(false);

            assert.isOk(input.attr("disabled"));
            assert.isOk(maskedtextbox.wrapper.hasClass(STATE_DISABLED));
        });

        it("enable method with true enables widget", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.enable(false);
            maskedtextbox.enable(true);

            assert.isOk(!input.attr("disabled"));
            assert.isOk(!maskedtextbox.wrapper.hasClass(STATE_DISABLED));
        });

        it("enable method removes readonly attribute", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            input.attr("readonly", true);

            maskedtextbox.enable();

            assert.isOk(!input.attr("readonly"));
        });

        it("readonly method makes widget readonly", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.readonly();

            assert.isOk(input.attr("readonly"));
        });

        it("readonly method with false makes widget editable ", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.readonly();
            maskedtextbox.readonly(false);

            assert.isOk(!input.attr("readonly"));
        });

        it("readonly method removes disabled attribute and class", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)"
            });

            maskedtextbox.enable(false);
            maskedtextbox.readonly();

            assert.isOk(!input.attr("disabled"));
            assert.isOk(!maskedtextbox.wrapper.hasClass(STATE_DISABLED));
        });

        it("setOptions changes the mask", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)",
                value: "1234"
            });

            maskedtextbox.setOptions({
                mask: "00---0"
            });

            assert.equal(maskedtextbox.value(), "12---3");
        });

        it("setOptions changes the mask (leaves empty spaces)", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)",
                value: "12"
            });

            maskedtextbox.setOptions({
                mask: "00---0"
            });

            assert.equal(maskedtextbox.value(), "12---_");
        });

        it("setOptions changes promptChar option", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(00-00)",
                value: "12"
            });

            maskedtextbox.setOptions({
                promptChar: " "
            });

            assert.equal(maskedtextbox.value(), "(12-  )");
        });

        it("setOptions extends built-in rules", function() {
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

            assert.equal(input.val(), "+-_");
        });

        it("setOptions unbinds input events if no mask", function() {
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

            assert.equal(maskedtextbox.calls("_mask"), 0);
        });

        it("setOptions binds input events if mask is set", function() {
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

            assert.equal(maskedtextbox.calls("_mask"), 2);
        });

        it("value method does not strip the last character from the value", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "\\1\\0A\\ 00\\ 00\\ 000\\ 00\\ L0\\ \\00",
            });

            maskedtextbox.value("100 14 36 085 17 W6 00");

            assert.equal(input.val(), "100 14 36 085 17 W6 00");
        });

        it("value method does not strip the last character from the value", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "(9\\9\\9) \\000-0000",
            });

            maskedtextbox.value("(123) 456-7890");

            assert.equal(input.val(), "(199) 023-4567");
        });

        it("MaskedTextBox raw() method does not throw an error", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "999 000-0000",
                value: "555 123 4567",
                clearPromptChar: true,
                promptChar: "*"
            });

            assert.equal(maskedtextbox.raw(), "5551234567");
        });
    });
}());
