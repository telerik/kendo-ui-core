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

    test("MaskInput renders a span wrapper", function() {
        var maskinput = new MaskInput(input);

        var wrapper = input.parent();

        ok(wrapper.is("span"));
        equal(maskinput.wrapper[0], wrapper[0]);
    });

    test("MaskInput renders the wrapper with correct styles", function() {
        var maskinput = new MaskInput(input);

        var wrapper = input.parent();

        ok(wrapper.hasClass("k-widget"));
        ok(wrapper.hasClass("k-maskinput"));
        ok(wrapper.hasClass("k-header"));
    });

    test("MaskInput copies element styles to the wrapper", function() {
        input.addClass("test");

        var maskinput = new MaskInput(input);

        var wrapper = input.parent();

        ok(wrapper.hasClass("test"));
    });

    test("MaskInput add k-input class to the element", function() {
        var maskinput = new MaskInput(input);

        ok(input.hasClass("k-input"));
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
})();
