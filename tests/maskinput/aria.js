(function() {
    var MaskInput = kendo.ui.MaskInput,
        input;

    module("kendo.ui.MaskInput ARIA", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("MaskInput renders ARIA attributes to wrapper element", function() {
        var maskinput = new MaskInput(input);
        var wrapper = maskinput.wrapper;

        equal(wrapper.attr("tabindex"), -1);
        equal(wrapper.attr("role"), "presentation");
    });
})();
