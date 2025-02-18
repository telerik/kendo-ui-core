import '@progress/kendo-ui/src/kendo.textbox.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let TextBox = kendo.ui.TextBox,
    input;

describe("kendo.ui.TextBox initialization", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("Should render wrapper", function() {
        let textbox = new TextBox(input),
            wrapper = textbox.wrapper;

        assert.equal(wrapper[0].className, "k-input k-textbox k-input-solid k-input-md k-rounded-md");
    });

    it("Should set placeholder", function() {
        let textbox = new TextBox(input, {
            placeholder: "placeholder..."
        });

        assert.equal(textbox.element.attr("placeholder"), "placeholder...");
    });

    it("Should set value", function() {
        let textbox = new TextBox(input, {
            value: "test value"
        });

        assert.equal(textbox.element.val(), "test value");
    });

    it("Should set disabled state", function() {
        let textbox = new TextBox(input, {
            enable: false
        });

        assert.isOk(textbox.wrapper.hasClass("k-disabled"));
    });

    it("Should set readonly state", function() {
        let textbox = new TextBox(input, {
            readonly: true
        });

        assert.isOk(textbox.wrapper.hasClass("k-readonly"));
    });

    it("Should get value from input", function() {
        let textbox = new TextBox(input.val("12"));

        assert.equal(textbox.value(), 12);
        assert.equal(textbox.element.val(), "12");
    });

    it("Bind change events", function() {
        let textbox = new TextBox(input.val("12"), {
            change: function() { }
        });

        assert.equal(textbox._events["change"][0], textbox.options.change);
    });

    it("TextBox gets the placeholder value from the element", function() {
        input.attr("placeholder", "Select...");
        let textbox = new TextBox(input);

        assert.equal(textbox.options.placeholder, "Select...");
    });

    it("TextBox gets the disabled state from the element", function() {
        input.attr("disabled", true);
        let textbox = new TextBox(input);

        assert.equal(textbox.options.enable, false);
    });

    it("TextBox gets the readonly state from the element", function() {
        input.attr("readonly", true);
        let textbox = new TextBox(input);

        assert.equal(textbox.options.readonly, true);
    });

    it("copy input className to the wrapper", function() {
        let textbox = new TextBox(input.addClass("test"));

        assert.isOk(textbox.wrapper.hasClass("test"));
    });

    it("sets the width of the input to 100%", function() {
        let textbox = new TextBox(input.css("width", "200px"));

        assert.equal(textbox.wrapper[0].style.width, "200px");
        assert.equal(textbox.element[0].style.width, "100%");
    });

    it("sets the k-focus class on focusin", function() {
        let textbox = new TextBox(input);

        textbox.element.trigger("focus");

        assert.isOk(textbox.wrapper.hasClass("k-focus"));
    });

    it("removes the k-focus class on focusout", function() {
        let textbox = new TextBox(input);

        textbox.element.trigger("focus");
        textbox.element.trigger("blur");

        assert.isNotOk(textbox.wrapper.hasClass("k-focus"));
    });

    asyncTest("form reset support", function(done) {
        input.attr("value", "test");

        let form = $("<form/>").appendTo(Mocha.fixture).append(input),
            textbox = new TextBox(input);

        textbox.value("other value");

        form[0].reset();

        setTimeout(function() {
            done(() => assert.equal(textbox.element.val(), "test"));
        }, 200);
    });

    it("styling options - fillMode", function() {
        let textbox = new TextBox(input, {
            fillMode: "outline"
        });

        assert.isOk(textbox.wrapper.hasClass("k-input-outline"));
    });

    it("styling options - size", function() {
        let textbox = new TextBox(input, {
            size: "small"
        });

        assert.isOk(textbox.wrapper.hasClass("k-input-sm"));
    });

    it("styling options - rounded", function() {
        let textbox = new TextBox(input, {
            rounded: "large"
        });

        assert.isOk(textbox.wrapper.hasClass("k-rounded-lg"));
    });

    it("clear button is rendered as expected", function() {
        let textbox = new TextBox(input, {
            value: "large",
            clearButton: true
        });

        assert.isOk(textbox.wrapper.find(".k-clear-value").length);
    });

    it("styling options - checks for valid options", function() {
        let textbox = new TextBox(input, {
            size: "large"
        });

        assert.isNotOk(textbox.wrapper.hasClass("k-rounded-lg")); // Does not add valid class for other option
        assert.isNotOk(textbox.wrapper.hasClass("k-input-sm")); // Does not add invalid class with prefix
        assert.isNotOk(textbox.wrapper.hasClass("k-input-md")); // Does not add default class for the option
        assert.isOk(textbox.wrapper.hasClass("k-rounded-md")); // Adds default class for other options
    });
});
