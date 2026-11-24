import '@progress/kendo-ui/src/kendo.data.js';

"use strict";

describe("ObservableArray reduce", function() {

    it("reduce visits each element from the low index to high index", function() {
        let source = ["1", "2", "3", "a", "b", "c"],
            array = new kendo.data.ObservableArray(source),
            expected = "123abc",
            actual;

        actual = array.reduce(function(previous, current) {
            return previous + current;
        });

        assert.equal(actual, expected);
    });

    it("reduce starts with initial value when provided", function() {
        let source = ["1", "2", "3", "a", "b", "c"],
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
        let source = [],
            array = new kendo.data.ObservableArray(source),
            expected = undefined,
            actual;

        actual = array.reduce(function(previous, current) {
            return previous + current;
        });

        assert.equal(actual, expected);
    });

    it("reduce passes index of collection to callback for each element", function() {
        let source = ["1", "2", "3", "a", "b", "c"],
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
        let source = ["1", "2", "3", "a", "b", "c"],
            array = new kendo.data.ObservableArray(source),
            expected = "cba321",
            actual;

        actual = array.reduceRight(function(previous, current) {
            return previous + current;
        });

        assert.equal(actual, expected);
    });

    it("reduceRight starts with initial value when provided", function() {
        let source = ["1", "2", "3", "a", "b", "c"],
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
        let source = [],
            array = new kendo.data.ObservableArray(source),
            expected = undefined,
            actual;

        actual = array.reduceRight(function(previous, current) {
            return previous + current;
        });

        assert.equal(actual, expected);
    });

    it("reduceRight passes index of collection to callback for each element", function() {
        let source = ["1", "2", "3", "a", "b", "c"],
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
        let source = ["1", "2", "3", "a", "b", "c"],
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
        let source = ["1", "2", "3", "a", "b", "c"],
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
        let source = ["1", "2", "3", "a", "b", "c"],
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
        let source = ["1", "2", "3", "a", "b", "c"],
            array = new kendo.data.ObservableArray(source),
            expected = new Object(),
            actual;

        array.find(function(item, index, array) {
            actual = this;
        }, expected);

        assert.equal(actual, expected);
    });

    it("find returns the first matching item", function() {
        let array = new kendo.data.ObservableArray([1, 2, 3]);

        let result = array.find(function(item) {
            return item > 1;
        });

        assert.equal(result, 2);
    });
});

describe("ObservableArray every", function() {

    it("setting thisArg sets the context inside the callback", function() {
        let source = ["1", "2", "3", "a", "b", "c"],
            array = new kendo.data.ObservableArray(source),
            expected = new Object(),
            actual;

        array.every(function(item, index, array) {
            actual = this;
        }, expected);

        assert.equal(actual, expected);
    });

    it("every returns true when all items match", function() {
        let array = new kendo.data.ObservableArray([2, 4, 6]);

        let result = array.every(function(item) {
            return item % 2 === 0;
        });

        assert.isTrue(result);
    });
});

describe("ObservableArray some", function() {

    it("setting thisArg sets the context inside the callback", function() {
        let source = ["1", "2", "3", "a", "b", "c"],
            array = new kendo.data.ObservableArray(source),
            expected = new Object(),
            actual;

        array.some(function(item, index, array) {
            actual = this;
        }, expected);

        assert.equal(actual, expected);
    });

});

describe("LazyObservableArray", function() {

    it("_loadPromises array is initialized", function() {
        let source = ["1", "2", "3", "a", "b", "c"],
            array = new kendo.data.LazyObservableArray(source);

        assert.isOk(array._loadPromises);
    });

    it("_loadedNodes array is initialized", function() {
        let source = ["1", "2", "3", "a", "b", "c"],
            array = new kendo.data.LazyObservableArray(source);

        assert.isOk(array._loadedNodes);
    });

    it("loading returns the current loading state", function() {
        let array = new kendo.data.LazyObservableArray([]);

        assert.isUndefined(array.loading());

        array._loading = true;

        assert.isTrue(array.loading());
    });

});

describe("ObservableArray collection methods", function() {

    it("shift removes the first item and triggers change", function() {
        let array = new kendo.data.ObservableArray([1, 2]);
        let args;

        array.bind("change", function(e) {
            args = e;
        });

        let removed = array.shift();

        assert.equal(removed, 1);
        assert.equal(args.action, "remove");
        assert.equal(args.index, 0);
        assert.equal(args.items[0], 1);
    });

    it("unshift inserts items at the beginning and triggers change", function() {
        let array = new kendo.data.ObservableArray([2]);
        let args;

        array.bind("change", function(e) {
            args = e;
        });

        let length = array.unshift(1);

        assert.equal(length, 2);
        assert.equal(array[0], 1);
        assert.equal(args.action, "add");
        assert.equal(args.index, 0);
        assert.equal(args.items[0], 1);
    });

    it("indexOf returns the item index or -1 when missing", function() {
        let array = new kendo.data.ObservableArray(["a", "b"]);

        assert.equal(array.indexOf("b"), 1);
        assert.equal(array.indexOf("c"), -1);
    });

});
