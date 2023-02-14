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
            var textbox = new TextBox(input);

            textbox.enable(false);

            assert.equal(input.attr("disabled"), "disabled");
        });

        it("enable(true) should remove disable attributes", function() {
            var textbox = new TextBox(input);

            textbox.enable(false);
            textbox.enable(true);

            assert.equal(input.attr("disabled"), undefined);
        });

        it("setOptions does not duplicate labels", function() {
            var textbox = new TextBox(input, { label: "Set name" });

            textbox.setOptions({});

            assert.equal($(".k-input-label").length, 1);
        });

        it("enable(false) removes readonly attribute and no-click class", function() {
            var textbox = input.kendoTextBox().data("kendoTextBox");

            textbox.readonly();
            textbox.enable(false);

            assert.equal(textbox.element.attr("readonly"), undefined);
            assert.equal(textbox.element.attr("disabled"), "disabled");
            assert.isOk(!textbox.wrapper.hasClass("k-no-click"));
            assert.isOk(textbox.wrapper.hasClass("k-disabled"));
        });

        it("readonly(true) makes input element readonly", function() {
            var textbox = new TextBox(input);

            textbox.readonly(true);

            assert.equal(input.attr("readonly"), "readonly");
            assert.isOk(textbox.wrapper.hasClass("k-no-click"));
        });

        it("readonly(false) should remove readonly attributes", function() {
            var textbox = new TextBox(input);

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
            assert.isOk(textbox.wrapper.hasClass("k-no-click"));
            assert.isOk(!textbox.wrapper.hasClass("k-disabled"));
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

        it("value method should set value of the input", function() {
            var textbox = new TextBox(input), value = "test";

            textbox.value(value);

            assert.equal(input.val(), value);
        });

        it("value method should refresh the floating label", function() {
            var textbox = new TextBox(input, { label: { content: "Set name", floating: true } }), value = "test";

            textbox.value(value);

            assert.isOk(!textbox.floatingLabel.element.hasClass("k-empty"));
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

        it("setOptions correctly changes placeholder", function() {
            var textbox = new TextBox(input, { placeholder: "Enter value ..." });

            textbox.setOptions({ placeholder: "test1" });
            assert.equal(textbox.element.attr("placeholder"), "test1");
        });

        it("setOptions correctly removes floating label", function() {
            var textbox = new TextBox(input, {
                label: {
                    content: "Name",
                    floating: true
                }
            });

            textbox.setOptions({ label: false });
            assert.isOk(!textbox.element.closest(".k-floating-label-container").length);
        });
    });
}());
