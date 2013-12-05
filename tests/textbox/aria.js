(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        input;

    module("kendo.ui.NumericTextBox ARIA", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("NumericTextBox adds role to the input element", function() {
        input.kendoNumericTextBox();
        equal(input.attr("role"), "spinbutton");
    });

    test("NumericTextBox adds aria-valuemin", function() {
        input.kendoNumericTextBox({
            min: 0
        });
        equal(input.attr("aria-valuemin"), "0");
    });

    test("NumericTextBox adds aria-valuemax", function() {
        input.kendoNumericTextBox({
            max: 0
        });
        equal(input.attr("aria-valuemax"), "0");
    });

    test("NumericTextBox updates aria-valuemin", function() {
        var numeric = new NumericTextBox(input);

        numeric.min(10);
        equal(input.attr("aria-valuemin"), "10");
    });

    test("NumericTextBox updates aria-valuemax", function() {
        var numeric = new NumericTextBox(input);

        numeric.max(10);
        equal(input.attr("aria-valuemax"), "10");
    });

    test("NumericTextBox do not set aria-valuemin", function() {
        var numeric = new NumericTextBox(input);

        equal(input.attr("aria-valuemin"), undefined);
    });

    test("NumericTextBox adds aria-valuenow", function() {
        var numeric = new NumericTextBox(input, {
            value: 10
        });

        equal(input.attr("aria-valuenow"), "10");
    });
})();
