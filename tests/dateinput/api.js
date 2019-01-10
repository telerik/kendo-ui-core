(function() {

    var DateInput = kendo.ui.DateInput,
        dateinput,
        div, input;

    describe("kendo.ui.DateInput API", function() {
        beforeEach(function() {
            div = $("<div />").appendTo(Mocha.fixture);
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            dateinput.destroy();
            kendo.destroy(Mocha.fixture);
        });

        it("min() should return min value", function() {
            var value = new Date(2000, 10, 22);
            dateinput = input.kendoDateInput({ min: value }).data("kendoDateInput");
            var result = dateinput.min();
            assert.equal(+result, +value);
        });

        it("max() should return max value", function() {
            var value = new Date(2000, 10, 22);
            dateinput = input.kendoDateInput({ max: value }).data("kendoDateInput");
            var result = dateinput.max();
            assert.equal(+result, +value);
        });

        it("min(value) set min value", function() {
            var value = new Date(2000, 10, 22);
            dateinput = input.kendoDateInput().data("kendoDateInput");
            dateinput.min(value);
            var result = dateinput.min();
            assert.equal(+result, +value);
        });

        it("max(value) set max value", function() {
            var value = new Date(2000, 10, 22);
            dateinput = input.kendoDateInput().data("kendoDateInput");
            dateinput.max(value);
            var result = dateinput.max();
            assert.equal(+result, +value);
        });

        it("value() should return value", function() {
            var value = new Date(2000, 10, 22);
            dateinput = input.kendoDateInput({ value: value }).data("kendoDateInput");
            var result = dateinput.value();
            assert.equal(+result, +value);
        });

        it("value(value) set value", function() {
            var value = new Date(2000, 10, 22);
            dateinput = input.kendoDateInput().data("kendoDateInput");
            dateinput.value(value);
            var result = dateinput.value();
            assert.equal(+result, +value);
        });

        it("value(value) is not set if outside min range", function() {
            var value = new Date(1550, 10, 22);
            dateinput = input.kendoDateInput().data("kendoDateInput");
            dateinput.value(value);
            var result = dateinput.value();
            assert.equal(+result, +value);
        });

        it("value(value) is not set if outside max range", function() {
            var value = new Date(3001, 10, 22);
            dateinput = input.kendoDateInput().data("kendoDateInput");
            dateinput.value(value);
            var result = dateinput.value();
            assert.equal(+result, +value);
        });

        it("value(value) is set correctly in min/max range after changing min/max", function() {
            var value = new Date(1565, 10, 22);
            var min = new Date(1560, 10, 22);
            var max = new Date(1570, 10, 22);
            dateinput = input.kendoDateInput().data("kendoDateInput");
            dateinput.min(min);
            dateinput.max(max);
            dateinput.value(value);
            var result = dateinput.value();
            assert.equal(+result, +value);
        });

        it("value(value) is not set if outside min/max range after changing min/max", function() {
            var value = new Date(2010, 10, 22);
            var min = new Date(1560, 10, 22);
            var max = new Date(1570, 10, 22);
            dateinput = input.kendoDateInput().data("kendoDateInput");
            dateinput.min(min);
            dateinput.max(max);
            dateinput.value(value);
            var result = dateinput.value();
            assert.equal(+result, +value);
        });

        it("Setting the dateinput as readonly does not add disabled styles", function() {
            dateinput = input.kendoDateInput().data("kendoDateInput");
            dateinput.readonly(true);
            assert.isOk(!dateinput.wrapper.hasClass("k-state-disabled"));
            assert.isOk(dateinput.element.attr("readonly"));
        });

    });
}());
