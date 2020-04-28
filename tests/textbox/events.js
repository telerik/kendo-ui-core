(function() {
    var TextBox = kendo.ui.TextBox,
        input;

    describe("kendo.ui.TextBox Events", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("_focusout should trigger change event when there is a new value", function() {
            var textbox = new TextBox(input, {
                value: "val",
                change: function() {
                    assert.equal(textbox.value(), "newVal");
                }
            });

            input.val("newVal");
            textbox._focusout();
        });

        it("raise change on focusout", function() {
            var textbox = new TextBox(input, {
                value: "val",
                change: function() {
                    assert.equal(textbox.value(), "newVal");
                }
            });

            input.focus().val("newVal").focusout();
        });
    });
}());
