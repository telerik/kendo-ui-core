import '@progress/kendo-ui/src/kendo.textarea.js';
import { asyncTest } from '../../helpers/async-utils.js';

let TextArea = kendo.ui.TextArea,
    textarea;

describe("kendo.ui.TextArea API", function() {
    beforeEach(function() {
        textarea = $("<textarea />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("enable(false) should disable textarea element", function() {
        let widget = new TextArea(textarea);

        widget.enable(false);

        assert.include(["disabled", "true"], textarea.attr("disabled"));
    });

    it("enable(true) should remove disable attributes", function() {
        let widget = new TextArea(textarea);

        widget.enable(false);
        widget.enable(true);

        assert.equal(textarea.attr("disabled"), undefined);
    });

    it("enable(false) removes readonly attribute and k-readonly class", function() {
        let widget = textarea.kendoTextArea().data("kendoTextArea");

        widget.readonly();
        widget.enable(false);

        assert.equal(widget.element.attr("readonly"), undefined);
        assert.include(["disabled", "true"], widget.element.attr("disabled"));
        assert.isOk(!widget.wrapper.hasClass("k-readonly"));
        assert.isOk(widget.wrapper.hasClass("k-disabled"));
    });

    it("readonly(true) makes textarea element readonly", function() {
        let widget = new TextArea(textarea);

        widget.readonly(true);

        assert.include(["readonly", "true"], textarea.attr("readonly"));
        assert.isOk(widget.wrapper.hasClass("k-readonly"));
    });

    it("readonly(false) should remove readonly attributes", function() {
        let widget = new TextArea(textarea);

        widget.readonly(true);
        widget.readonly(false);

        assert.equal(textarea.attr("readonly"), undefined);
        assert.isNotOk(widget.wrapper.hasClass("k-readonly"));
    });

    it("readonly() removes disabled attribute and disabled class", function() {
        let widget = textarea.kendoTextArea().data("kendoTextArea");

        widget.enable(false);
        widget.readonly();

        assert.include(["readonly", "true"], widget.element.attr("readonly"));
        assert.equal(widget.element.attr("disabled"), undefined);
        assert.isOk(widget.wrapper.hasClass("k-readonly"));
        assert.isOk(!widget.wrapper.hasClass("k-disabled"));
    });

    asyncTest("focus method should focus the textarea", function(done) {
        let widget = new TextArea(textarea);

        widget.focus();

        window.setTimeout(function() {
            done(() => assert.equal(document.activeElement, textarea[0]));
        }, 200);
    });

    it("value method should return current value", function() {
        let widget = new TextArea(textarea), value = "test";

        widget._value = value;

        assert.equal(widget.value(), value);
    });

    it("value should set value of the textarea", function() {
        let widget = new TextArea(textarea), value = "test";

        widget.value(value);

        assert.equal(textarea.val(), value);
    });

    it("value() can set null", function() {
        let widget = new TextArea(textarea, {
            value: "test"
        });

        widget.value(null);

        assert.equal(widget._value, null);
    });

    it("destroy method works", function() {
        let widget = new TextArea(textarea);

        widget.destroy();
        assert.equal(textarea.data("kendoTextArea"), undefined);
    });


    it("setOptions works on styling options", function() {
        let widget = new TextArea(textarea, {
            overflow: "hidden",
            size: "small"
        });

        assert.isOk(widget.element.hasClass("!k-overflow-hidden"));
        assert.isOk(widget.wrapper.hasClass("k-input-sm"));

        widget.setOptions({
            overflow: "clip",
            size: "large"
        });

        assert.isNotOk(widget.element.hasClass("!k-overflow-hidden"));
        assert.isNotOk(widget.wrapper.hasClass("k-input-sm"));
        assert.isOk(widget.element.hasClass("!k-overflow-clip"));
        assert.isOk(widget.wrapper.hasClass("k-input-lg"));
    });

    it("setOptions destroys and recreates the component", function() {
        let widget = new TextArea(textarea, {
        });

        widget.setOptions({
            enable: false
        });

        assert.isOk(widget.wrapper.hasClass("k-disabled"));
        assert.isOk(widget.wrapper.parent().is(":not(.k-input)")); // Ensure that recreating the component does not wrap the element twice.
    });
});
