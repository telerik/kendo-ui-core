(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        input;

    describe("kendo.ui.NumericTextBox ARIA", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("NumericTextBox adds role to the input element", function() {
            input.kendoNumericTextBox();
            assert.equal(input.attr("role"), "spinbutton");
        });

        it("NumericTextBox adds aria-valuemin", function() {
            input.kendoNumericTextBox({
                min: 0
            });
            assert.equal(input.attr("aria-valuemin"), "0");
        });

        it("NumericTextBox adds aria-valuemax", function() {
            input.kendoNumericTextBox({
                max: 0
            });
            assert.equal(input.attr("aria-valuemax"), "0");
        });

        it("NumericTextBox updates aria-valuemin", function() {
            var numeric = new NumericTextBox(input);

            numeric.min(10);
            assert.equal(input.attr("aria-valuemin"), "10");
        });

        it("NumericTextBox updates aria-valuemax", function() {
            var numeric = new NumericTextBox(input);

            numeric.max(10);
            assert.equal(input.attr("aria-valuemax"), "10");
        });

        it("NumericTextBox do not set aria-valuemin", function() {
            var numeric = new NumericTextBox(input);

            assert.equal(input.attr("aria-valuemin"), undefined);
        });

        it("NumericTextBox adds aria-valuenow", function() {
            var numeric = new NumericTextBox(input, {
                value: 10
            });

            assert.equal(input.attr("aria-valuenow"), "10");
        });

        it("NumericTextBox adds role to the text element", function() {
            var numeric = new NumericTextBox(input);

            assert.equal(numeric._text.attr("role"), "spinbutton");
        });

        it("NumericTextBox adds aria-valuemin", function() {
            var numeric = new NumericTextBox(input, {
                min: 0
            });

            assert.equal(numeric._text.attr("aria-valuemin"), "0");
        });

        it("NumericTextBox adds aria-valuemax", function() {
            var numeric = new NumericTextBox(input, {
                max: 0
            });

            assert.equal(numeric._text.attr("aria-valuemax"), "0");
        });

        it("NumericTextBox updates aria-valuemin", function() {
            var numeric = new NumericTextBox(input);

            numeric.min(10);
            assert.equal(numeric._text.attr("aria-valuemin"), "10");
        });

        it("NumericTextBox updates aria-valuemax", function() {
            var numeric = new NumericTextBox(input);

            numeric.max(10);
            assert.equal(numeric._text.attr("aria-valuemax"), "10");
        });

        it("NumericTextBox do not set aria-valuemin", function() {
            var numeric = new NumericTextBox(input);

            assert.equal(numeric._text.attr("aria-valuemin"), undefined);
        });

        it("NumericTextBox adds aria-valuenow when value is null", function() {
            var numeric = new NumericTextBox(input, {
                value: null
            });

            assert.equal(numeric._text.attr("aria-valuenow"), undefined);
        });

        it("NumericTextBox uses dot for aria-valuenow decimals regardless of culture", function() {
            kendo.culture("bg-BG");

            var numeric = new NumericTextBox(input, {
                value: 8000.5
            });

            assert.equal(numeric._text.attr("aria-valuenow"), "8000.5");

            kendo.culture("en-US");
        });

        it("NumericTextBox removes aria-valuenow when value is cleared", function() {
            var numeric = new NumericTextBox(input, {
                value: 8000.5
            });

            numeric.element.val(null);
            numeric.element.trigger("blur");

            assert.equal(numeric._text.attr("aria-valuenow"), undefined);
        });
    });

    describe("kendo.ui.NumericTextBox aria with AXE", function() {
        beforeEach(function() {
            $("<label>Price Discount:<input id='percentage' value='35' title='percentage' /></label>").appendTo(Mocha.fixture);
            input = $(Mocha.fixture).find("input");
        });

        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("NumericTextBox is accessible", function(done) {
            var numeric = new NumericTextBox(input);

            axeRunFixture(done);
        });

        it("NumericTextBox is accessible when label is defined", function(done) {
            var numeric = new NumericTextBox(input, { label: "Price" });

            axeRunFixture(done);
        });
    });
}());
