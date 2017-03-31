(function () {

    var DateInput = kendo.ui.DateInput,
        dateinput,
        div, input;

    module("kendo.ui.DateInput Events", {
        setup: function () {
            div = $("<div />").appendTo(QUnit.fixture);
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function () {
            dateinput.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("min() should return min value", function () {
        var value = new Date(2000, 10, 22);
        dateinput = input.kendoDateInput({ min: value }).data("kendoDateInput");
        var result = dateinput.min();
        equal(+result, +value);
    });

    test("max() should return max value", function () {
        var value = new Date(2000, 10, 22);
        dateinput = input.kendoDateInput({ max: value }).data("kendoDateInput");
        var result = dateinput.max();
        equal(+result, +value);
    });

    test("min(value) set min value", function () {
        var value = new Date(2000, 10, 22);
        dateinput = input.kendoDateInput().data("kendoDateInput");
        dateinput.min(value);
        var result = dateinput.min();
        equal(+result, +value);
    });

    test("max(value) set max value", function () {
        var value = new Date(2000, 10, 22);
        dateinput = input.kendoDateInput().data("kendoDateInput");
        dateinput.max(value);
        var result = dateinput.max();
        equal(+result, +value);
    });

    test("value() should return value", function () {
        var value = new Date(2000, 10, 22);
        dateinput = input.kendoDateInput({ value: value }).data("kendoDateInput");
        var result = dateinput.value();
        equal(+result, +value);
    });

    test("value(value) set value", function () {
        var value = new Date(2000, 10, 22);
        dateinput = input.kendoDateInput().data("kendoDateInput");
        dateinput.value(value);
        var result = dateinput.value();
        equal(+result, +value);
    });

    test("value(value) is not set if outside min range", function () {
        var value = new Date(1550, 10, 22);
        dateinput = input.kendoDateInput().data("kendoDateInput");
        dateinput.value(value);
        var result = dateinput.value();
        equal(+result, 0);
    });

    test("value(value) is not set if outside max range", function () {
        var value = new Date(3001, 10, 22);
        dateinput = input.kendoDateInput().data("kendoDateInput");
        dateinput.value(value);
        var result = dateinput.value();
        equal(+result, 0);
    });

    test("value(value) is set correctly in min/max range after changing min/max", function () {
        var value = new Date(1565, 10, 22);
        var min = new Date(1560, 10, 22);
        var max = new Date(1570, 10, 22);
        dateinput = input.kendoDateInput().data("kendoDateInput");
        dateinput.min(min);
        dateinput.max(max);
        dateinput.value(value);
        var result = dateinput.value();
        equal(+result, +value);
    });

    test("value(value) is not set if outside min/max range after changing min/max", function () {
        var value = new Date(2010, 10, 22);
        var min = new Date(1560, 10, 22);
        var max = new Date(1570, 10, 22);
        dateinput = input.kendoDateInput().data("kendoDateInput");
        dateinput.min(min);
        dateinput.max(max);
        dateinput.value(value);
        var result = dateinput.value();
        equal(+result, 0);
    });

})();
