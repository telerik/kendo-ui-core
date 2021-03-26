(function() {
    var TextArea = kendo.ui.TextArea,
        textarea;

    describe("kendo.ui.TextArea Events", function() {
        beforeEach(function() {
            textarea = $("<textarea />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("_focusout should trigger change event when there is a new value", function() {
            var widget = new TextArea(textarea, {
                value: "val",
                change: function() {
                    assert.equal(widget.value(), "newVal");
                }
            });

            textarea.val("newVal");
            widget._focusout();
        });

        it("raise change on focusout", function() {
            var widget = new TextArea(textarea, {
                value: "val",
                change: function() {
                    assert.equal(widget.value(), "newVal");
                }
            });

            textarea.focus().val("newVal").focusout();
        });
    });
}());
