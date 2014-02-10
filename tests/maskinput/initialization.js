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
})();
