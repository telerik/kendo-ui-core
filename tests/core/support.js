(function(){

var input;

describe("input support", function () {
    beforeEach(function() {
        input = document.createElement("input");
    });
    afterEach(function() {
        input = null;
    });

it("kendo.support checks for placeholder attribute", function() {
    assert.equal(kendo.support.placeholder, "placeholder" in input);
});

it("kendo.support checks whether onpropertchange is supported", function() {
    assert.equal(kendo.support.propertyChangeEvent, !!("onpropertychange" in input));
});

it("kendo.support checks for number type", function() {
    input.setAttribute("type", "number");

    assert.equal(kendo.support.input.number, input.type === "number");
});

it("kendo.support checks for date type", function() {
    input.setAttribute("type", "date");

    assert.equal(kendo.support.input.date, input.type === "date");
});

it("kendo.support checks for time type", function() {
    input.setAttribute("type", "time");

    assert.equal(kendo.support.input.time, input.type === "time");
});

it("kendo.support checks for month type", function() {
    input.setAttribute("type", "month");

    assert.equal(kendo.support.input.month, input.type === "month");
});

it("kendo.support checks for week type", function() {
    input.setAttribute("type", "week");

    assert.equal(kendo.support.input.week, input.type === "week");
});

it("kendo.support checks for datetime type", function() {
    input.setAttribute("type", "datetime");

    assert.equal(kendo.support.input.datetime, input.type === "datetime");
});

it("kendo.support checks for datetime-local type", function() {
    input.setAttribute("type", "datetime-local");

    assert.equal(kendo.support.input.datetimelocal, input.type === "datetime-local");
});

it("kendo.support.scrollbar() returns a number", function () {
    var scrollbar = kendo.support.scrollbar();
    assert.isOk(!isNaN(scrollbar));
});

it("kendo.support.scrollbar(true) refreshes the cached value", function () {
    kendo.support._scrollbar = -1;

    var scrollbar = kendo.support.scrollbar(true);
    assert.isOk(!isNaN(scrollbar) && scrollbar > -1);
});

    });
}());
