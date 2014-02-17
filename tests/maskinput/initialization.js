(function() {
    var MaskInput = kendo.ui.MaskInput,
        input;

    module("kendo.ui.MaskInput initialization", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("MaskInput attaches a maskinput object to a target", function() {
        var maskinput = new MaskInput(input);

        ok(input.data("kendoMaskInput") instanceof MaskInput);
    });

    test("MaskInput add k-textbox class to the element", function() {
        var maskinput = new MaskInput(input);

        ok(input.hasClass("k-textbox"));
    });

    test("MaskInput add autocomplete='off' attr", function() {
        var maskinput = new MaskInput(input);

        ok(input.attr("autocomplete"), "off");
    });

    test("MaskInput tokenize specified mask", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-0"
        });

        var tokens = maskinput.tokens;

        equal(tokens[0], maskinput.rules["0"]);
        equal(tokens[1], "-");
        equal(tokens[2], maskinput.rules["0"]);
    });

    test("MaskInput sets value on init", function() {
        var maskinput = new MaskInput(input, {
            mask: "00-00",
            value: "9999"
        });

        equal(input.val(), "99-99");
    });

    test("MaskInput does not focus if the element is not active", function() {
        var maskinput = new MaskInput(input, {
            mask: "00-00",
            value: "9999"
        });

        notEqual(input[0], document.activeElement);
    });

    test("MaskInput honours input disabled attr", function() {
        var maskinput = new MaskInput(input.attr("disabled", true), {
            mask: "00-00",
            value: "9999"
        });

        ok(input.hasClass("k-state-disabled"));
    });

    test("MaskInput gets value from input element", function() {
        input.val("test99");
        var maskinput = new MaskInput(input, {
            mask: "00-00"
        });

        equal(input.val(), "99-__");
    });

    asyncTest("form reset support", 1, function() {
        input.attr("value", "1234");

        var form = $("<form/>").appendTo(QUnit.fixture).append(input);

        var maskinput = new MaskInput(input, {
            mask: "00-00"
        });

        maskinput.value("5678");

        form[0].reset();

        setTimeout(function() {
            equal(maskinput.element.val(), "12-34");
            start();
        }, 100);
    });

    asyncTest("support for form defined by attribute", 1, function() {
        input.attr("form", "form1").attr("value", "1234");

        var form = $("<form id='form1'/>").appendTo(QUnit.fixture);

        var maskinput = new MaskInput(input, {
            mask: "00-00"
        });

        maskinput.value("5678");

        form[0].reset();

        setTimeout(function() {
            equal(maskinput.element.val(), "12-34");
            start();
        }, 100);
    });
})();
