(function() {
    "use strict";

    describe("ObservableArray reduce", function() {

        it("reduce visits each element from the low index to high index", function() {
            var source = ["1", "2", "3", "a", "b", "c"],
                array = new kendo.data.ObservableArray(source),
                expected = "123abc",
                actual;

            actual = array.reduce(function(previous, current) {
                return previous + current;
            });

            assert.equal(actual, expected);
        });

        it("reduce starts with initial value when provided", function() {
            var source = ["1", "2", "3", "a", "b", "c"],
                array = new kendo.data.ObservableArray(source),
                initialValue = "z",
                expected = "z123abc",
                actual;

            actual = array.reduce(function(previous, current) {
                return previous + current;
            }, initialValue);

            assert.equal(actual, expected);
        });

        it("reduce on an empty array returns undefined", function() {
            var source = [],
                array = new kendo.data.ObservableArray(source),
                expected = undefined,
                actual;

            actual = array.reduce(function(previous, current) {
                return previous + current;
            });

            assert.equal(actual, expected);
        });

        it("reduce passes index of collection to callback for each element", function() {
            var source = ["1", "2", "3", "a", "b", "c"],
                array = new kendo.data.ObservableArray(source),
                expected = "112345",
                actual;

            actual = array.reduce(function(previous, current, index) {
                return previous.toString() + index.toString();
            });

            assert.equal(actual, expected);
        });
    });

    describe("ObservableArray reduceRight", function() {

        it("reduceRight visits each element from the high index to low index", function() {
            var source = ["1", "2", "3", "a", "b", "c"],
                array = new kendo.data.ObservableArray(source),
                expected = "cba321",
                actual;

            actual = array.reduceRight(function(previous, current) {
                return previous + current;
            });

            assert.equal(actual, expected);
        });

        it("reduceRight starts with initial value when provided", function() {
            var source = ["1", "2", "3", "a", "b", "c"],
                array = new kendo.data.ObservableArray(source),
                initialValue = "z",
                expected = "zcba321",
                actual;

            actual = array.reduceRight(function(previous, current) {
                return previous + current;
            }, initialValue);

            assert.equal(actual, expected);
        });

        it("reduceRight on an empty array returns undefined", function() {
            var source = [],
                array = new kendo.data.ObservableArray(source),
                expected = undefined,
                actual;

            actual = array.reduceRight(function(previous, current) {
                return previous + current;
            });

            assert.equal(actual, expected);
        });

        it("reduceRight passes index of collection to callback for each element", function() {
            var source = ["1", "2", "3", "a", "b", "c"],
                array = new kendo.data.ObservableArray(source),
                expected = "c43210",
                actual;

            actual = array.reduceRight(function(previous, current, index) {
                return previous.toString() + index.toString();
            });

            assert.equal(actual, expected);
        });

    });
    describe("ObservableArray forEach", function() {

        it("setting thisArg sets the context inside the callback", function() {
            var source = ["1", "2", "3", "a", "b", "c"],
                array = new kendo.data.ObservableArray(source),
                expected = new Object(),
                actual;

            array.forEach(function(item, index, array) {
                actual = this;
            }, expected);

            assert.equal(actual, expected);
        });
    });

    describe("ObservableArray map", function() {

        it("setting thisArg sets the context inside the callback", function() {
            var source = ["1", "2", "3", "a", "b", "c"],
                array = new kendo.data.ObservableArray(source),
                expected = new Object(),
                actual;

            array.map(function(item, index, array) {
                actual = this;
            }, expected);

            assert.equal(actual, expected);
        });
    });

    describe("ObservableArray filter", function() {

        it("setting thisArg sets the context inside the callback", function() {
            var source = ["1", "2", "3", "a", "b", "c"],
                array = new kendo.data.ObservableArray(source),
                expected = new Object(),
                actual;

            array.filter(function(item, index, array) {
                actual = this;
            }, expected);

            assert.equal(actual, expected);
        });
    });

    describe("ObservableArray find", function() {

        it("setting thisArg sets the context inside the callback", function() {
            var source = ["1", "2", "3", "a", "b", "c"],
                array = new kendo.data.ObservableArray(source),
                expected = new Object(),
                actual;

            array.find(function(item, index, array) {
                actual = this;
            }, expected);

            assert.equal(actual, expected);
        });
    });

    describe("ObservableArray every", function() {

        it("setting thisArg sets the context inside the callback", function() {
            var source = ["1", "2", "3", "a", "b", "c"],
                array = new kendo.data.ObservableArray(source),
                expected = new Object(),
                actual;

            array.every(function(item, index, array) {
                actual = this;
            }, expected);

            assert.equal(actual, expected);
        });
    });

    describe("ObservableArray some", function() {

        it("setting thisArg sets the context inside the callback", function() {
            var source = ["1", "2", "3", "a", "b", "c"],
                array = new kendo.data.ObservableArray(source),
                expected = new Object(),
                actual;

            array.some(function(item, index, array) {
                actual = this;
            }, expected);

            assert.equal(actual, expected);
        });

    });
}());
