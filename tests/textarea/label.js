(function() {
    var TextArea = kendo.ui.TextArea,
        textarea;

    describe("kendo.ui.TextArea label", function() {
        beforeEach(function() {
            textarea = $("<textarea />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("create a label with inner HTML equal to configuration text", function() {
            var widget = new TextArea(textarea, {
                label: "<b>text</b>"
            });

            assert.equal(widget.wrapper.parent().find(".k-label")[0].innerHTML, "<b>text</b>");
        });

        it("create a label with inner HTML equal to configuration function", function() {
            var widget = new TextArea(textarea, {
                label: function() {
                    return "<b>function</b>"
                }
            });

            assert.equal(widget.wrapper.parent().find(".k-label")[0].innerHTML, "<b>function</b>");
        });

        it("create a label with inner HTML equal to configuration object text", function() {
            var widget = new TextArea(textarea, {
                label: {
                    content: "<b>content text</b>"
                }
            });

            assert.equal(widget.wrapper.parent().find(".k-label")[0].innerHTML, "<b>content text</b>");
        });

        it("create a label with inner HTML equal to configuration object function", function() {
            var widget = new TextArea(textarea, {
                label: {
                    content: function() {
                        return "<b>content function</b>"
                    }
                }
            });

            assert.equal(widget.wrapper.parent().find(".k-label")[0].innerHTML, "<b>content function</b>");
        });

        it("floating label wraps the widget", function() {
            var widget = new TextArea(textarea, {
                label: {
                    content: "test",
                    floating: true
                }
            });

            assert.isOk(widget.wrapper.parent().hasClass("k-floating-label-container"));
            assert.isOk(widget.wrapper.parent().hasClass("k-state-empty"));
        });

        it("floating label removes k-state-empty class when the textarea has value", function() {
            var widget = new TextArea(textarea, {
                value: "val",
                label: {
                    content: "test",
                    floating: true
                }
            });

            assert.isNotOk(widget.floatingLabel.element.hasClass("k-state-empty"));
        });

        it("floating label removes k-state-empty on focusout when the textarea has value", function() {
            var widget = new TextArea(textarea, {
                label: {
                    content: "test",
                    floating: true
                }
            });

            assert.isOk(widget.floatingLabel.element.hasClass("k-state-empty"));

            widget.value("val");
            widget.element.trigger("focusout");

            assert.isNotOk(widget.floatingLabel.element.hasClass("k-state-empty"));
        });

        it("floating label adds k-state-focus when the user focuses the textarea", function() {
            var widget = new TextArea(textarea, {
                label: {
                    content: "test",
                    floating: true
                }
            });

            widget.focus();

            assert.isOk(widget.floatingLabel.element.hasClass("k-state-focused"));
        });

        it("floating label removes k-state-focused on blur", function() {
            var widget = new TextArea(textarea, {
                label: {
                    content: "test",
                    floating: true
                }
            });

            widget.focus();

            assert.isOk(widget.floatingLabel.element.hasClass("k-state-focused"));

            document.activeElement.blur();

            assert.isNotOk(widget.floatingLabel.element.hasClass("k-state-focused"));
        });

        it("floating label adds k-state-readonly when textarea is set to readonly", function() {
            var widget = new TextArea(textarea, {
                label: {
                    content: "test",
                    floating: true
                }
            });

            widget.readonly();

            assert.isOk(widget.floatingLabel.element.hasClass("k-state-readonly"));
        });

        it("widget enable calls floating label enable", function() {
            var widget = new TextArea(textarea, {
                label: {
                    content: "test",
                    floating: true
                }
            });

            stub(widget, { enable: widget.floatingLabel.enable });

            widget.enable();

            assert.equal(widget.calls("enable"), 1);
        });

        it("widget readonly calls floating label readonly", function() {
            var widget = new TextArea(textarea, {
                label: {
                    content: "test",
                    floating: true
                }
            });

            stub(widget, { readonly: widget.floatingLabel.readonly });

            widget.readonly();

            assert.equal(widget.calls("readonly"), 1);
        });

        it("widget destroy calls floating label destroy", function() {
            var widget = new TextArea(textarea, {
                label: {
                    content: "test",
                    floating: true
                }
            });

            stub(widget, { destroy: widget.floatingLabel.destroy });

            widget.destroy();

            assert.equal(widget.calls("destroy"), 1);
        });

        it("k-textarea-container class is added to the floating label element", function() {
            var widget = new TextArea(textarea, {
                label: {
                    content: "test",
                    floating: true
                }
            });

            assert.isOk(widget.floatingLabel.element.hasClass("k-textarea-container"));
        });
    });
}());
