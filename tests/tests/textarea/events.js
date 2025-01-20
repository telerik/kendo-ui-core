import '@progress/kendo-ui/src/kendo.textarea.js';

let TextArea = kendo.ui.TextArea,
    textarea;

describe("kendo.ui.TextArea Events", function() {
    beforeEach(function() {
        textarea = $("<textarea />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("_focusout should trigger change event when there is a new value", function() {
        let widget = new TextArea(textarea, {
            value: "val",
            change: function() {
                assert.equal(widget.value(), "newVal");
            }
        });

        textarea.val("newVal");
        widget._focusout();
    });

    it("raise change on focusout", function() {
        let widget = new TextArea(textarea, {
            value: "val",
            change: function() {
                assert.equal(widget.value(), "newVal");
            }
        });

        textarea.focus().val("newVal").focusout();
    });

    it("_focusout should not trigger change event when value is null", function() {
        let value = "test";
        let widget = new TextArea(textarea, {
            change: function() {
                value = "bad test";
            }
        });

        widget.value(null);
        widget._focusout();
        assert.equal(value, "test");
    });
});
