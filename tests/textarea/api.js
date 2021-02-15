(function() {
    var TextArea = kendo.ui.TextArea,
        textarea;

    describe("kendo.ui.TextArea API", function() {
        beforeEach(function() {
            textarea = $("<textarea />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("enable(false) should disable textarea element", function() {
            var widget = new TextArea(textarea)

            widget.enable(false);

            assert.equal(textarea.attr("disabled"), "disabled");
        });

        it("enable(true) should remove disable attributes", function() {
            var widget = new TextArea(textarea)

            widget.enable(false);
            widget.enable(true);

            assert.equal(textarea.attr("disabled"), undefined);
        });

        it("enable(false) removes readonly attribute and k-state-readonly class", function() {
            var widget = textarea.kendoTextArea().data("kendoTextArea");

            widget.readonly();
            widget.enable(false);

            assert.equal(widget.element.attr("readonly"), undefined);
            assert.equal(widget.element.attr("disabled"), "disabled");
            assert.isOk(!widget.wrapper.hasClass("k-state-readonly"));
            assert.isOk(widget.wrapper.hasClass("k-state-disabled"));
        });

        it("readonly(true) makes textarea element readonly", function() {
            var widget = new TextArea(textarea)

            widget.readonly(true);

            assert.equal(textarea.attr("readonly"), "readonly");
            assert.isOk(widget.wrapper.hasClass("k-state-readonly"));
        });

        it("readonly(false) should remove readonly attributes", function() {
            var widget = new TextArea(textarea)

            widget.readonly(true);
            widget.readonly(false);

            assert.equal(textarea.attr("readonly"), undefined);
            assert.isNotOk(widget.wrapper.hasClass("k-state-readonly"));
        });

        it("readonly() removes disabled attribute and disabled class", function() {
            var widget = textarea.kendoTextArea().data("kendoTextArea");

            widget.enable(false);
            widget.readonly();

            assert.equal(widget.element.attr("readonly"), "readonly");
            assert.equal(widget.element.attr("disabled"), undefined);
            assert.isOk(widget.wrapper.hasClass("k-state-readonly"));
            assert.isOk(!widget.wrapper.hasClass("k-state-disabled"));
        });

        it("focus method should focus the textarea", function(done) {
            var widget = new TextArea(textarea);

            widget.focus();

            window.setTimeout(function() {
                assert.equal(document.activeElement, textarea[0]);
                done();
            }, 200);
        });

        it("value method should return current value", function() {
            var widget = new TextArea(textarea), value = "test";

            widget._value = value;

            assert.equal(widget.value(), value);
        });

        it("value should set value of the textarea", function() {
            var widget = new TextArea(textarea), value = "test";

            widget.value(value);

            assert.equal(textarea.val(), value);
        });

        it("value() can set null", function() {
            var widget = new TextArea(textarea, {
                value: "test"
            });

            widget.value(null);

            assert.equal(widget._value, null);
        });

        it("destroy method works", function() {
            var widget = new TextArea(textarea);

            widget.destroy();
            assert.equal(textarea.data("kendoTextArea"), undefined);
        });
    });
}());
