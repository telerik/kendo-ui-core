(function() {
    var TextBox = kendo.ui.TextBox,
        input;

    describe("kendo.ui.TextBox API", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("enable(false) should disable input element", function() {
            var textbox = new TextBox(input)

            textbox.enable(false);

            assert.equal(input.attr("disabled"), "disabled");
        });

        it("enable(true) should remove disable attributes", function() {
            var textbox = new TextBox(input)

            textbox.enable(false);
            textbox.enable(true);

            assert.equal(input.attr("disabled"), undefined);
        });

        it("enable(false) removes readonly attribute and no-click class", function() {
            var textbox = input.kendoTextBox().data("kendoTextBox");

            textbox.readonly();
            textbox.enable(false);

            assert.equal(textbox.element.attr("readonly"), undefined);
            assert.equal(textbox.element.attr("disabled"), "disabled");
            assert.isOk(!textbox._inputWrapper.hasClass("k-no-click"));
            assert.isOk(textbox._inputWrapper.hasClass("k-state-disabled"));
        });

        it("readonly(true) makes input element readonly", function() {
            var textbox = new TextBox(input)

            textbox.readonly(true);

            assert.equal(input.attr("readonly"), "readonly");
            assert.isOk(textbox.wrapper.hasClass("k-no-click"));
        });

        it("readonly(false) should remove readonly attributes", function() {
            var textbox = new TextBox(input)

            textbox.readonly(true);
            textbox.readonly(false);

            assert.equal(input.attr("readonly"), undefined);
            assert.isNotOk(textbox.wrapper.hasClass("k-no-click"));
        });

        it("readonly() removes disabled attribute and disabled class", function() {
            var textbox = input.kendoTextBox().data("kendoTextBox");

            textbox.enable(false);
            textbox.readonly();

            assert.equal(textbox.element.attr("readonly"), "readonly");
            assert.equal(textbox.element.attr("disabled"), undefined);
            assert.isOk(textbox._inputWrapper.hasClass("k-no-click"));
            assert.isOk(!textbox._inputWrapper.hasClass("k-state-disabled"));
        });

        it("focus method should focus the input", function(done) {
            var textbox = new TextBox(input);

            textbox.focus();

            window.setTimeout(function() {
                assert.equal(document.activeElement, input[0]);
                done();
            }, 200);
        });

        it("value method should return current value", function() {
            var textbox = new TextBox(input), value = "test";

            textbox._value = value;

            assert.equal(textbox.value(), value);
        });

        it("value should set value of the input", function() {
            var textbox = new TextBox(input), value = "test";

            textbox.value(value);

            assert.equal(input.val(), value);
        });

        it("value() can set null", function() {
            var textbox = new TextBox(input, {
                value: "test"
            });

            textbox.value(null);

            assert.equal(textbox._value, null);
        });

        it("destroy method works", function() {
            var textbox = new TextBox(input);

            textbox.destroy();
            assert.equal(input.data("kendoTextBox"), undefined);
        });
    });
}());
