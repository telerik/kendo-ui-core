import { createInput, updateInput, createMasked, updateInputAt, deleteContent } from "../../helpers/maskedtextbox-utils.js";
import { stub } from "../../helpers/stub.js";
import { asyncTest } from "../../helpers/async-utils.js";

let MaskedTextBox = kendo.ui.MaskedTextBox,
    caret = kendo.caret,
    input;

describe("kendo.ui.MaskedTextBox interaction", function() {
    beforeEach(function() {
        input = createInput();
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    asyncTest("MaskedTextBox shows empty mask on focus", function(done) {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();

        setTimeout(function() {
            done(() => assert.equal(maskedtextbox.value(), "_-_"));
        });
    });

    asyncTest("MaskedTextBox positions caret in the beginning", function(done) {
        createMasked(input, "0-0");

        input.focus();

        setTimeout(function() {
            done(() => {
                assert.equal(caret(input[0])[0], 0);
                assert.equal(caret(input[0])[1], 0);
            });
        });
    });

    asyncTest("MaskedTextBox selects whole text if value", function(done) {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        maskedtextbox.value("1-1");

        input.focus();

        setTimeout(function() {
            done(() => {
                assert.equal(input.val(), "1-1");
                assert.equal(caret(input[0])[0], 0);
                assert.equal(caret(input[0])[1], 3);
            });
        });
    });

    it("sets the k-focus class on focusin", function() {
        let maskedtextbox = new MaskedTextBox(input);

        maskedtextbox.element.trigger("focus");

        assert.isOk(maskedtextbox.wrapper.hasClass("k-focus"));
    });

    it("removes the k-focus class on focusout", function() {
        let maskedtextbox = new MaskedTextBox(input);

        maskedtextbox.element.trigger("focus");
        maskedtextbox.element.blur();

        assert.isNotOk(maskedtextbox.wrapper.hasClass("k-focus"));
    });


    asyncTest("MaskedTextBox does not remove input value on blur", function(done) {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        maskedtextbox.value("1-1");

        input.focus();

        setTimeout(function() {
            input.blur();
            done(() => assert.equal(input.val(), "1-1"));
        });
    });

    asyncTest("MaskedTextBox removes empty mask on blur", function(done) {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();

        setTimeout(function() {
            input.blur();
            done(() => assert.equal(maskedtextbox.value(), ""));
        });
    });

    asyncTest("MaskedTextBox does not remove widget value if an empty symbol is left", function(done) {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();

        setTimeout(function() {
            input.val("1-_");
            input.blur();

            done(() => assert.equal(input.val(), "1-_"));
        });
    });

    asyncTest("MaskedTextBox persists empty mask on ENTER", function(done) {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.focus();
        setTimeout(function() {
            caret(input[0], 7);
            input.trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });

            done(() => assert.equal(input.val(), "(___) ___-____"));
        });
    });

    asyncTest("MaskedTextBox should not call mask if e.which is 0", function(done) {
        let count = 0;
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.focus();

        setTimeout(function() {
            caret(input[0], 7);
            input.trigger({
                type: "keypress",
                which: 0,
                preventDefault: function() {
                    count++;
                }
            });
            done(() => assert.equal(count, 0));
        });
    });

    asyncTest("MaskedTextBox should not call mask on Ctrl + C", function(done) {
        let count = 0;
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.focus();

        setTimeout(function() {
            caret(input[0], 7);
            input.trigger({
                type: "keypress",
                which: "c".charCodeAt(0),
                keyCode: "c".charCodeAt(0),
                ctrlKey: true,
                preventDefault: function() {
                    count++;
                }
            });
            done(() => assert.equal(count, 0));
        });
    });

    asyncTest("Allow pasting with Ctrl+V (MacOS)", function(done) {
        let count = 0;
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.focus();

        setTimeout(function() {
            caret(input[0], 7);
            input.trigger({
                type: "keypress",
                which: "c".charCodeAt(0),
                keyCode: "c".charCodeAt(0),
                metaKey: true,
                preventDefault: function() {
                    count++;
                }
            });
            done(() => assert.equal(count, 0));
        });
    });

    it("MaskedTextBox doesn't show promptChar", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000",
            clearPromptChar: true,
            value: "123"
        });

        assert.equal(maskedtextbox.value(), "(123)    -    ");
    });

    asyncTest("MaskedTextBox shows promptChar on focus", function(done) {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000",
            clearPromptChar: true,
            value: "123"
        });

        input.focus();

        setTimeout(function() {
            done(() => assert.equal(maskedtextbox.value(), "(123) ___-____"));
        });
    });

    it("MaskedTextBox shows promptChar on focus", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000",
            clearPromptChar: true,
            value: "123"
        });

        input.focus();
        input.focusout();

        assert.equal(maskedtextbox.value(), "(123)    -    ");
    });

    it("MaskedTextBox does not focus when input is not active", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.value = "test";

        //trigger change
        input.trigger("input");
        input.trigger("propertychange");

        assert.notEqual(input[0], kendo._activeElement());
    });

    it("Add content in 'input' event when input is focused", function() {
        let masked = new MaskedTextBox(input, {
            mask: "00.00",
            promptChar: "_"
        });

        masked.value("1");
        masked.element[0].value = "12_.__";

        input[0].focus();
        caret(input[0], 2, 2);
        input.trigger("input");
        input.trigger("propertychange");

        assert.equal(masked.value(), "12.__");
    });

    it("Change value in `input` event when input element is focused", function() {
        let masked = new MaskedTextBox(input, {
            mask: "00.00"
        });

        stub(masked, { inputChange: masked.inputChange });

        input[0].focus();
        input.trigger("input");
        input.trigger("propetychange");

        assert.equal(masked.calls("inputChange"), 1);
    });

    it("Prevent change in `input` event when input element is not focused", function() {
        let masked = new MaskedTextBox(input, {
            mask: "00.00"
        });

        stub(masked, { inputChange: masked.inputChange });

        input.trigger("input");
        input.trigger("propetychange");

        assert.equal(masked.calls("inputChange"), 0);
    });

    it("MaskedTextBox value is not undefined when clearPromptChar is true and empty mask is used", function() {
        input.attr("value", "123");
        let maskedtextbox = new MaskedTextBox(input, {
            clearPromptChar: true
        });

        input.focus();

        assert.equal(maskedtextbox.value(), "123");
    });

    it("MaskTextBox will not shift character if it is not correct", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "0ba",
            rules: {
                "b": function(chr) {
                    return (chr === "0" || chr === "1" || chr === "2" ||
                        chr === "3" || chr === "4" || chr === "5");
                },
                "a": function(chr) {
                    return (chr === "0" || chr === "1" || chr === "2");
                }
            },
            value: "9__"
        });

        updateInput(maskedtextbox, "6");

        assert.equal(input.val(), "6__");
    });

    it("Entering invalid symbol does not change the value", function() {
        let masked = createMasked(input, "0-000");
        masked.value("0-__3");

        updateInputAt(masked, "g", 2);

        assert.equal(input.val(), "0-__3");
    });

    it("Drop does not change content when deleting", function() {
        let masked = createMasked(input, "0-000");
        masked.value("1");
        stub(masked, { _mask: masked._mask });

        masked.element.trigger("drop");
        deleteContent(masked, 0);

        assert.equal(masked.calls("_mask"), 0);
    });

    it("Drop does not change content when deleting", function() {
        let masked = createMasked(input, "0-000");
        masked.value("1");

        masked.element.trigger("drop");
        updateInput(masked, "2");

        assert.equal(masked.value(), "2-1__");
    });
});
