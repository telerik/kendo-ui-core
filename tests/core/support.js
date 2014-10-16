(function(){

var input;

module("input support", {
    setup: function() {
        input = document.createElement("input");
    },
    teardown: function() {
        input = null;
    }
});

test("kendo.support checks for placeholder attribute", function() {
    equal(kendo.support.placeholder, "placeholder" in input);
});

test("kendo.support checks whether onpropertchange is supported", function() {
    equal(kendo.support.propertyChangeEvent, !!("onpropertychange" in input));
});

test("kendo.support checks for number type", function() {
    input.setAttribute("type", "number");

    equal(kendo.support.input.number, input.type === "number");
});

test("kendo.support checks for date type", function() {
    input.setAttribute("type", "date");

    equal(kendo.support.input.date, input.type === "date");
});

test("kendo.support checks for time type", function() {
    input.setAttribute("type", "time");

    equal(kendo.support.input.time, input.type === "time");
});

test("kendo.support checks for month type", function() {
    input.setAttribute("type", "month");

    equal(kendo.support.input.month, input.type === "month");
});

test("kendo.support checks for week type", function() {
    input.setAttribute("type", "week");

    equal(kendo.support.input.week, input.type === "week");
});

test("kendo.support checks for datetime type", function() {
    input.setAttribute("type", "datetime");

    equal(kendo.support.input.datetime, input.type === "datetime");
});

test("kendo.support checks for datetime-local type", function() {
    input.setAttribute("type", "datetime-local");

    equal(kendo.support.input.datetimelocal, input.type === "datetime-local");
});

test("kendo.support.scrollbar() returns a number", function () {
    var scrollbar = kendo.support.scrollbar();
    ok(!isNaN(scrollbar));
});

test("kendo.support.scrollbar(true) refreshes the cached value", function () {
    kendo.support._scrollbar = -1;

    var scrollbar = kendo.support.scrollbar(true);
    ok(!isNaN(scrollbar) && scrollbar > -1);
});

}());
