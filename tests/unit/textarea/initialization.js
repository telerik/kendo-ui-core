import '@progress/kendo-ui/src/kendo.textarea.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let TextArea = kendo.ui.TextArea,
    textarea, textareaWithAttribute;

describe("kendo.ui.TextArea initialization", function() {
    beforeEach(function() {
        textarea = $("<textarea />").appendTo(Mocha.fixture);
        textareaWithAttribute = $("<textarea maxlength='5' />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("Should render wrapper", function() {
        let widget = new TextArea(textarea),
            wrapper = widget.wrapper;

        assert.equal(wrapper[0].className, "k-input k-textarea !k-flex-col");
    });

    it("Should set placeholder", function() {
        let widget = new TextArea(textarea, {
            placeholder: "placeholder..."
        });

        assert.equal(widget.element.attr("placeholder"), "placeholder...");
    });

    it("Should set value", function() {
        let widget = new TextArea(textarea, {
            value: "test value"
        });

        assert.equal(widget.element.val(), "test value");
    });

    it("Should set disabled state", function() {
        let widget = new TextArea(textarea, {
            enable: false
        });

        assert.isOk(widget.wrapper.hasClass("k-disabled"));
    });

    it("Should set readonly state", function() {
        let widget = new TextArea(textarea, {
            readonly: true
        });

        assert.isOk(widget.wrapper.hasClass("k-readonly"));
    });

    it("Should get value from textarea", function() {
        let widget = new TextArea(textarea.val("12"));

        assert.equal(widget.value(), 12);
        assert.equal(widget.element.val(), "12");
    });

    it("Bind change events", function() {
        let widget = new TextArea(textarea.val("12"), {
            change: function() { }
        });

        assert.equal(widget._events["change"][0], widget.options.change);
    });

    it("TextArea gets the placeholder value from the element", function() {
        textarea.attr("placeholder", "Select...");
        let widget = new TextArea(textarea);

        assert.equal(widget.options.placeholder, "Select...");
    });

    it("TextArea gets the disabled state from the element", function() {
        textarea.attr("disabled", true);
        let widget = new TextArea(textarea);

        assert.equal(widget.options.enable, false);
    });

    it("TextArea gets the readonly state from the element", function() {
        textarea.attr("readonly", true);
        let widget = new TextArea(textarea);

        assert.equal(widget.options.readonly, true);
    });

    it("copy textarea className to the wrapper", function() {
        let widget = new TextArea(textarea.addClass("test"));

        assert.isOk(widget.wrapper.hasClass("test"));
    });

    it("removes inline style set to textarea element", function() {
        let widget = new TextArea(textarea.css("width", "200px"));

        assert.equal(widget.wrapper[0].style.width, "200px");
        assert.equal(widget.element[0].style.width, "");
    });

    it("sets the k-focus class on focusin", function() {
        let widget = new TextArea(textarea);

        widget.element.trigger("focus");

        assert.isOk(widget.wrapper.hasClass("k-focus"));
    });

    it("removes the k-focus class on focusout", function() {
        let widget = new TextArea(textarea);

        widget.element.trigger("focus");
        widget.element.trigger("blur");

        assert.isNotOk(widget.wrapper.hasClass("k-focus"));
    });

    asyncTest("form reset support", function(done) {
        textarea.text("test");

        let form = $("<form/>").appendTo(Mocha.fixture).append(textarea),
            widget = new TextArea(textarea);

        widget.value("other value");

        form[0].reset();

        setTimeout(function() {
            done(() => assert.equal(widget.element.val(), "test"));
        }, 200);
    });

    it("Should set maxlength", function() {
        let widget = new TextArea(textarea, {
            maxLength: 42
        });

        assert.equal(widget.element.attr("maxlength"), 42);
    });

    it("Should set rows", function() {
        let widget = new TextArea(textarea, {
            rows: 42
        });

        assert.equal(widget.element.attr("rows"), 42);
    });

    it("Should set k-resize class to textarea when resizable is specified", function() {
        let widget = new TextArea(textarea, {
            resize: "both"
        });

        assert.isOk(widget.element.hasClass("k-resize"));
    });

    it("styling options - fillMode", function() {
        let widget = new TextArea(textarea, {
            fillMode: "outline"
        });

        assert.isOk(widget.wrapper.hasClass("k-input-outline"));
    });

    it("styling options - size", function() {
        let widget = new TextArea(textarea, {
            size: "small"
        });

        assert.isOk(widget.wrapper.hasClass("k-input-sm"));
    });

    it("styling options - rounded", function() {
        let widget = new TextArea(textarea, {
            rounded: "large"
        });

        assert.isOk(widget.wrapper.hasClass("k-rounded-lg"));
    });

    it("styling options - resize both", function() {
        let widget = new TextArea(textarea, {
            resize: "both"
        });

        assert.isOk(widget.element.hasClass("k-resize"));
    });

    it("styling options - resize horizontal", function() {
        let widget = new TextArea(textarea, {
            resize: "horizontal"
        });

        assert.isOk(widget.element.hasClass("k-resize-x"));
    });

    it("styling options - resize vertical", function() {
        let widget = new TextArea(textarea, {
            resize: "vertical"
        });

        assert.isOk(widget.element.hasClass("k-resize-y"));
    });

    it("styling options - resize none", function() {
        let widget = new TextArea(textarea, {
            resize: "none"
        });

        assert.isOk(widget.element.hasClass("k-resize-none"));
    });

    it("styling options - overflow", function() {
        let widget = new TextArea(textarea, {
            overflow: "hidden"
        });

        assert.isOk(widget.element.hasClass("!k-overflow-hidden"));
    });

    it("default overflow class check", function() {
        let widget = new TextArea(textarea, {});

        assert.isOk(widget.element.hasClass("!k-overflow-auto"));
    });

    for (const overflowOption of ["auto", "hidden", "visible", "scroll", "clip"]) {
        it("apply important overflow class check - " + overflowOption, function() {
            let widget = new TextArea(textarea, { overflow: overflowOption });

            assert.isOk(widget.element.hasClass(`!k-overflow-${overflowOption}`));
        });
    }

    it("overflow none class check", function() {
        let widget = new TextArea(textarea, { overflow: "none" });

        assert.isNotOk(widget.element.hasClass(`!k-overflow-none`));
        assert.isNotOk(widget.element.hasClass(`!k-overflow-auto`));
        assert.isNotOk(widget.element.hasClass(`!`));
    });

    it("styling options - checks for valid options", function() {
        let widget = new TextArea(textarea, {
            size: "full"
        });

        assert.isNotOk(widget.wrapper.hasClass("k-rounded-full")); // Does not add valid class for other option
        assert.isNotOk(widget.wrapper.hasClass("k-input-full")); // Does not add invalid class with prefix
        assert.isNotOk(widget.wrapper.hasClass("k-input-md")); // Does not add default class for the option
        assert.isNotOk(widget.wrapper.hasClass("k-rounded-md")); // Does not add default class for other options when undefined
    });

    it("Should add !k-flex-row class when layoutFlow is 'horizontal'", function() {
        let widget = new TextArea(textarea, { layoutFlow: "horizontal" });
        let wrapper = widget.wrapper;

        assert.isTrue(wrapper[0].classList.contains("!k-flex-row"));
    });

    it("Should add !k-flex-col class when layoutFlow is 'vertical'", function() {
        let widget = new TextArea(textarea, { layoutFlow: "vertical" });
        let wrapper = widget.wrapper;

        assert.isTrue(wrapper[0].classList.contains("!k-flex-col"));
    });

    it("Should not set maxlength by default", function() {
        let widget = new TextArea(textarea);

        assert.notOk(widget.element.attr("maxlength"));
    });

    it("Should set maxlength from element attribute", function() {
        let widget = new TextArea(textareaWithAttribute);

        assert.equal(widget.element.attr("maxlength"), 5);
    });

    it("Should set maxLength from options", function() {
        let widget = new TextArea(textareaWithAttribute, {
            maxLength: 10
        });

        assert.equal(widget.element.attr("maxlength"), 10);
    });
});
