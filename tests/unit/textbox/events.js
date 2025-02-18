import '@progress/kendo-ui/src/kendo.textbox.js';

let TextBox = kendo.ui.TextBox,
    keys = kendo.keys,
    input;

describe("kendo.ui.TextBox Events", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("_change should trigger change event when there is a new value", function() {
        let textbox = new TextBox(input, {
            value: "val",
            change: function() {
                assert.equal(textbox.value(), "newVal");
            }
        });

        input.val("newVal");
        textbox._change();
    });

    it("raise change on focusout", function() {
        let textbox = new TextBox(input, {
            value: "val",
            change: function() {
                assert.equal(textbox.value(), "newVal");
            }
        });

        input.focus().val("newVal").focusout();
    });

    it("raise change on enter key pressed", function() {
        let textbox = new TextBox(input, {
            value: "val",
            change: function() {
                assert.equal(textbox.value(), "newVal");
            }
        });

        input.val("newVal").trigger("keydown", { which: keys.ENTER });
    });
});
