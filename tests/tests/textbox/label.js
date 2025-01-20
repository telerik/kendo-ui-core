import '@progress/kendo-ui/src/kendo.textbox.js';
import { stub } from '../../helpers/stub.js';

let TextBox = kendo.ui.TextBox,
    input;

describe("kendo.ui.TextBox label", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("create a label with inner HTML equal to configuration text", function() {
        let textbox = new TextBox(input, {
            label: "<b>text</b>"
        });

        assert.equal(textbox.wrapper.parent().find(".k-label")[0].innerHTML, "<b>text</b>");
    });

    it("create a label with inner HTML equal to configuration function", function() {
        let textbox = new TextBox(input, {
            label: function() {
                return "<b>function</b>";
            }
        });

        assert.equal(textbox.wrapper.parent().find(".k-label")[0].innerHTML, "<b>function</b>");
    });

    it("create a label with inner HTML equal to configuration object text", function() {
        let textbox = new TextBox(input, {
            label: {
                content: "<b>content text</b>"
            }
        });

        assert.equal(textbox.wrapper.parent().find(".k-label")[0].innerHTML, "<b>content text</b>");
    });

    it("create a label with inner HTML equal to configuration object function", function() {
        let textbox = new TextBox(input, {
            label: {
                content: function() {
                    return "<b>content function</b>";
                }
            }
        });

        assert.equal(textbox.wrapper.parent().find(".k-label")[0].innerHTML, "<b>content function</b>");
    });

    it("floating label wraps the widget", function() {
        let textbox = new TextBox(input, {
            label: {
                content: "test",
                floating: true
            }
        });

        assert.isOk(textbox.wrapper.parent().hasClass("k-floating-label-container"));
        assert.isOk(textbox.wrapper.parent().hasClass("k-empty"));
    });

    it("floating label removes k-empty class when the input has value", function() {
        let textbox = new TextBox(input, {
            value: "val",
            label: {
                content: "test",
                floating: true
            }
        });

        assert.isNotOk(textbox.floatingLabel.element.hasClass("k-empty"));
    });

    it("floating label removes k-empty on focusout when the input has value", function() {
        let textbox = new TextBox(input, {
            label: {
                content: "test",
                floating: true
            }
        });

        assert.isOk(textbox.floatingLabel.element.hasClass("k-empty"));

        textbox.value("val");
        textbox.element.trigger("focusout");

        assert.isNotOk(textbox.floatingLabel.element.hasClass("k-empty"));
    });

    it("floating label adds k-focus when the user focuses the input", function() {
        let textbox = new TextBox(input, {
            label: {
                content: "test",
                floating: true
            }
        });

        textbox.focus();
        textbox.element.trigger("focusin");

        assert.isOk(textbox.floatingLabel.element.hasClass("k-focus"));
    });

    it("floating label removes k-focus on blur", function() {
        let textbox = new TextBox(input, {
            label: {
                content: "test",
                floating: true
            }
        });

        textbox.focus();
        textbox.element.trigger("focusin");

        assert.isOk(textbox.floatingLabel.element.hasClass("k-focus"));

        document.activeElement.blur();
        textbox.element.trigger("focusout");

        assert.isNotOk(textbox.floatingLabel.element.hasClass("k-focus"));
    });

    it("textbox enable calls floating label enable", function() {
        let textbox = new TextBox(input, {
            label: {
                content: "test",
                floating: true
            }
        });

        stub(textbox, { enable: textbox.floatingLabel.enable });

        textbox.enable();

        assert.equal(textbox.calls("enable"), 1);
    });

    it("textbox readonly calls floating label readonly", function() {
        let textbox = new TextBox(input, {
            label: {
                content: "test",
                floating: true
            }
        });

        stub(textbox, { readonly: textbox.floatingLabel.readonly });

        textbox.readonly();

        assert.equal(textbox.calls("readonly"), 1);
    });

    it("textbox destroy calls floating label destroy", function() {
        let textbox = new TextBox(input, {
            label: {
                content: "test",
                floating: true
            }
        });

        stub(textbox, { destroy: textbox.floatingLabel.destroy });

        textbox.destroy();

        assert.equal(textbox.calls("destroy"), 1);
    });
});
