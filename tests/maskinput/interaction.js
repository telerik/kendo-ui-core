(function() {
    var MaskInput = kendo.ui.MaskInput,
        input;

    module("kendo.ui.MaskInput interaction", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("MaskInput shows empty mask on focus", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-0"
        });

        input.focus();

        equal(input.val(), "_-_");
    });

    test("MaskInput removes empty mask on blur", function() {
        var maskinput = new MaskInput(input, {
            mask: "0-0"
        });

        input.focus().blur();

        equal(input.val(), "");
    });
})();
