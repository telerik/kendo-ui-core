/* globals createInput, updateInputAt, updateInput, createMasked, stub, deleteContent */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        caret = kendo.caret,
        input;

    module("kendo.ui.MaskedTextBox interaction", {
        setup: function() {
            input = createInput();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    asyncTest("MaskedTextBox shows empty mask on focus", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();

        setTimeout(function() {
            start();
            equal(maskedtextbox.value(), "_-_");
        });
    });

    asyncTest("MaskedTextBox positions caret in the beginning", 2, function() {
        createMasked(input, "0-0");

        input.focus();

        setTimeout(function() {
            start();
            equal(caret(input[0])[0], 0);
            equal(caret(input[0])[1], 0);
        });
    });

    asyncTest("MaskedTextBox selects whole text if value", 3, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        maskedtextbox.value("1-1");

        input.focus();

        setTimeout(function() {
            start();
            equal(input.val(), "1-1");
            equal(caret(input[0])[0], 0);
            equal(caret(input[0])[1], 3);
        });
    });

    asyncTest("MaskedTextBox does not remove input value on blur", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        maskedtextbox.value("1-1");

        input.focus();

        setTimeout(function() {
            start();
            input.blur();
            equal(input.val(), "1-1");
        });
    });

    asyncTest("MaskedTextBox removes empty mask on blur", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();

        setTimeout(function() {
            start();
            input.blur();
            equal(maskedtextbox.value(), "");
        });
    });

    asyncTest("MaskedTextBox does not remove widget value if an empty symbol is left", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        input.focus();

        setTimeout(function() {
            start();
            input.val("1-_");
            input.blur();

            equal(input.val(), "1-_");
        });
    });

    asyncTest("MaskedTextBox persists empty mask on ENTER", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.focus();
        setTimeout(function() {
            start();
            caret(input[0], 7);
            input.trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });

            equal(input.val(), "(___) ___-____");
        });
    });

    asyncTest("MaskedTextBox should not call mask if e.which is 0", 0, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.focus();

        setTimeout(function() {
            start();
            caret(input[0], 7);
            input.trigger({
                type: "keypress",
                which: 0,
                preventDefault: function() {
                    ok(false);
                }
            });
        });
    });

    asyncTest("MaskedTextBox should not call mask on Ctrl + C", 0, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.focus();

        setTimeout(function() {
            start();
            caret(input[0], 7);
            input.trigger({
                type: "keypress",
                which: "c".charCodeAt(0),
                keyCode: "c".charCodeAt(0),
                ctrlKey: true,
                preventDefault: function() {
                    ok(false);
                }
            });
        });
    });

    asyncTest("Allow pasting with Ctrl+V (MacOS)", 0, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.focus();

        setTimeout(function() {
            start();
            caret(input[0], 7);
            input.trigger({
                type: "keypress",
                which: "c".charCodeAt(0),
                keyCode: "c".charCodeAt(0),
                metaKey: true,
                preventDefault: function() {
                    ok(false);
                }
            });
        });
    });

    test("MaskedTextBox doesn't show promptChar", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000",
            clearPromptChar: true,
            value: "123"
        });

        equal(maskedtextbox.value(), "(123)    -    ");
    });

    asyncTest("MaskedTextBox shows promptChar on focus", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000",
            clearPromptChar: true,
            value: "123"
        });

        input.focus();

        setTimeout(function() {
            start();
            equal(maskedtextbox.value(), "(123) ___-____");
        });
    });

    test("MaskedTextBox shows promptChar on focus", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000",
            clearPromptChar: true,
            value: "123"
        });

        input.focus();
        input.focusout();

        equal(maskedtextbox.value(), "(123)    -    ");
    });

    test("MaskedTextBox does not focus when input is not active", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(000) 000-0000"
        });

        input.value = "test";

        //trigger change
        input.trigger("input");
        input.trigger("propertychange");

        notEqual(input[0], kendo._activeElement());
    });

    test("Add content in 'input' event when input is focused", function() {
        var masked = new MaskedTextBox(input, {
            mask: "00.00",
            promptChar: "_"
        });

        masked.value("1");
        masked.element[0].value = "12_.__";

        input[0].focus();
        caret(input[0], 2, 2);
        input.trigger("input");
        input.trigger("propertychange");

        equal(masked.value(), "12.__");
    });

    test("Change value in `input` event when input element is focused", function() {
        var masked = new MaskedTextBox(input, {
            mask: "00.00"
        });

        stub(masked, { inputChange: masked.inputChange });

        input[0].focus();
        input.trigger("input");
        input.trigger("propetychange");

        equal(masked.calls("inputChange"), 1);
    });

    test("Prevent change in `input` event when input element is not focused", function() {
        var masked = new MaskedTextBox(input, {
            mask: "00.00"
        });

        stub(masked, { inputChange: masked.inputChange });

        input.trigger("input");
        input.trigger("propetychange");

        equal(masked.calls("inputChange"), 0);
    });

    test("MaskedTextBox value is not undefined when clearPromptChar is true and empty mask is used", 1, function() {
        input.attr("value","123");
        var maskedtextbox = new MaskedTextBox(input, {
            clearPromptChar: true
        });

        input.focus();

        equal(maskedtextbox.value(), "123");
    });

    test("MaskTextBox will not shift character if it is not correct", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0ba",
            rules: {
                "b": function (chr) {
                    return (chr === "0" || chr === "1" || chr === "2" ||
                            chr === "3" || chr === "4" || chr === "5");
                },
                "a": function (chr) {
                    return (chr === "0" || chr === "1" || chr === "2");
                }
            },
            value:"9__"
        });

        updateInput(maskedtextbox, "6");

        equal(input.val(), "6__");
    });

    test("Entering invalid symbol does not change the value", 1, function() {
        var masked = createMasked(input, "0-000");
        masked.value("0-__3");

        updateInputAt(masked, "g", 2);

        equal(input.val(), "0-__3");
    });

    test("Drop does not change content when deleting", function() {
        var masked = createMasked(input, "0-000");
        masked.value("1");
        stub(masked, { _mask: masked._mask });

        masked.element.trigger("drop");
        deleteContent(masked, 0);

        equal(masked.calls("_mask"), 0);
    });

    test("Drop does not change content when deleting", function() {
        var masked = createMasked(input, "0-000");
        masked.value("1");

        masked.element.trigger("drop");
        updateInput(masked, "2");

        equal(masked.value(), "2-1__");
    });

    test("Detach input event for $angular scenario", function() {
        input.on("input", function() { ok(false); });
        var masked = createMasked(input, "0-000");
        masked.options.$angular = true;

        masked.setOptions({ mask: "0-0" });
        input.trigger("input");

        ok(true);
    });

})();
