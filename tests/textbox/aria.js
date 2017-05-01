(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        input,
        EMPTY_NUMERIC = "Empty numeric";

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

    test("NumericTextBox adds title when value is empty", function() {
        var numeric = new NumericTextBox(input);

        equal(input.attr("title"), EMPTY_NUMERIC);
    });

    test("NumericTextBox adds title when value is set", function() {
        var numeric = new NumericTextBox(input, {
            value: 10
        });

        equal(input.attr("title"), "10");
    });

    test("NumericTextBox adds title when title attr is set.", function() {
        var testTitle = "test title";
        var numeric = new NumericTextBox(input.attr("title", testTitle));

        equal(input.attr("title"), testTitle);
    });

    test("NumericTextBox adds role to the text element", function() {
        var numeric = new NumericTextBox(input);

        equal(numeric._text.attr("role"), "spinbutton");
    });

    test("NumericTextBox adds aria-valuemin", function() {
        var numeric = new NumericTextBox(input, {
            min: 0
        });

        equal(numeric._text.attr("aria-valuemin"), "0");
    });

    test("NumericTextBox adds aria-valuemax", function() {
        var numeric = new NumericTextBox(input, {
            max: 0
        });

        equal(numeric._text.attr("aria-valuemax"), "0");
    });

    test("NumericTextBox updates aria-valuemin", function() {
        var numeric = new NumericTextBox(input);

        numeric.min(10);
        equal(numeric._text.attr("aria-valuemin"), "10");
    });

    test("NumericTextBox updates aria-valuemax", function() {
        var numeric = new NumericTextBox(input);

        numeric.max(10);
        equal(numeric._text.attr("aria-valuemax"), "10");
    });

    test("NumericTextBox do not set aria-valuemin", function() {
        var numeric = new NumericTextBox(input);

        equal(numeric._text.attr("aria-valuemin"), undefined);
    });

    test("NumericTextBox adds aria-valuenow when value is null", function() {
        var numeric = new NumericTextBox(input, {
            value: null
        });

        equal(numeric._text.attr("aria-valuenow"), undefined);
    });

    test("NumericTextBox adds title when value is empty", function() {
        var numeric = new NumericTextBox(input);

        equal(numeric._text.attr("title"), EMPTY_NUMERIC);
    });

    test("NumericTextBox adds title when value is set", function() {
        var numeric = new NumericTextBox(input, {
            value: 10
        });

        equal(numeric._text.attr("title"), "10.00");
    });

    test("NumericTextBox adds title when title attr is set.", function() {
        var testTitle = "test title";
        var numeric = new NumericTextBox(input.attr("title", testTitle));

        equal(numeric._text.attr("title"), testTitle);
    });
})();
