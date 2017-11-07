(function(){
    "use strict";

module("ObservableArray reduce");

test("reduce visits each element from the low index to high index", function () {
    var source = ["1", "2", "3", "a", "b", "c"],
        array = new kendo.data.ObservableArray(source),
        expected = "123abc",
        actual;

    actual = array.reduce(function (previous, current) {
        return previous + current;
    });

    equal(actual, expected);
});

test("reduce starts with initial value when provided", function () {
    var source = ["1", "2", "3", "a", "b", "c"],
        array = new kendo.data.ObservableArray(source),
        initialValue = "z",
        expected = "z123abc",
        actual;

    actual = array.reduce(function (previous, current) {
        return previous + current;
    }, initialValue);

    equal(actual, expected);
});

test("reduce on an empty array returns undefined", function () {
    var source = [],
        array = new kendo.data.ObservableArray(source),
        expected = undefined,
        actual;

    actual = array.reduce(function (previous, current) {
        return previous + current;
    });

    equal(actual, expected);
});

test("reduce passes index of collection to callback for each element", function () {
    var source = ["1", "2", "3", "a", "b", "c"],
        array = new kendo.data.ObservableArray(source),
        expected = "112345",
        actual;

    actual = array.reduce(function (previous, current, index) {
        return previous.toString() + index.toString();
    });

    equal(actual, expected);
});

module("ObservableArray reduceRight");

test("reduceRight visits each element from the high index to low index", function () {
    var source = ["1", "2", "3", "a", "b", "c"],
        array = new kendo.data.ObservableArray(source),
        expected = "cba321",
        actual;

    actual = array.reduceRight(function (previous, current) {
        return previous + current;
    });

    equal(actual, expected);
});

test("reduceRight starts with initial value when provided", function () {
    var source = ["1", "2", "3", "a", "b", "c"],
        array = new kendo.data.ObservableArray(source),
        initialValue = "z",
        expected = "zcba321",
        actual;

    actual = array.reduceRight(function (previous, current) {
        return previous + current;
    }, initialValue);

    equal(actual, expected);
});

test("reduceRight on an empty array returns undefined", function () {
    var source = [],
        array = new kendo.data.ObservableArray(source),
        expected = undefined,
        actual;

    actual = array.reduceRight(function (previous, current) {
        return previous + current;
    });

    equal(actual, expected);
});

test("reduceRight passes index of collection to callback for each element", function () {
        var source = ["1", "2", "3", "a", "b", "c"],
            array = new kendo.data.ObservableArray(source),
            expected = "c43210",
            actual;

        actual = array.reduceRight(function (previous, current, index) {
            return previous.toString() + index.toString();
        });

        equal(actual, expected);
    });

module("ObservableArray forEach");

test("setting thisArg sets the context inside the callback", function () {
    var source = ["1", "2", "3", "a", "b", "c"],
        array = new kendo.data.ObservableArray(source),
        expected = new Object(),
        actual;

    array.forEach(function (item, index, array) {
        actual = this;
    }, expected);

    equal(actual, expected);
});

module("ObservableArray map");

test("setting thisArg sets the context inside the callback", function () {
    var source = ["1", "2", "3", "a", "b", "c"],
        array = new kendo.data.ObservableArray(source),
        expected = new Object(),
        actual;

    array.map(function (item, index, array) {
        actual = this;
    }, expected);

    equal(actual, expected);
});

module("ObservableArray filter");

test("setting thisArg sets the context inside the callback", function () {
    var source = ["1", "2", "3", "a", "b", "c"],
        array = new kendo.data.ObservableArray(source),
        expected = new Object(),
        actual;

    array.filter(function (item, index, array) {
        actual = this;
    }, expected);

    equal(actual, expected);
});

module("ObservableArray find");

test("setting thisArg sets the context inside the callback", function () {
    var source = ["1", "2", "3", "a", "b", "c"],
        array = new kendo.data.ObservableArray(source),
        expected = new Object(),
        actual;

    array.find(function (item, index, array) {
        actual = this;
    }, expected);

    equal(actual, expected);
});

module("ObservableArray every");

test("setting thisArg sets the context inside the callback", function () {
    var source = ["1", "2", "3", "a", "b", "c"],
        array = new kendo.data.ObservableArray(source),
        expected = new Object(),
        actual;

    array.every(function (item, index, array) {
        actual = this;
    }, expected);

    equal(actual, expected);
});

module("ObservableArray some");

test("setting thisArg sets the context inside the callback", function () {
    var source = ["1", "2", "3", "a", "b", "c"],
        array = new kendo.data.ObservableArray(source),
        expected = new Object(),
        actual;

    array.some(function (item, index, array) {
        actual = this;
    }, expected);

    equal(actual, expected);
});

}());
