(function() {
    var dataviz = kendo.dataviz,
        util = dataviz.util;

    // ------------------------------------------------------------
    module("Generic Helpers");

    test("sqr returns a * a", function() {
        equal(util.sqr(2), 4);
    });

    // ------------------------------------------------------------
    module("Hashing");

    test("objectKey serializes object key/values", function() {
        equal(util.objectKey({ foo: true }), "footrue");
    });

    test("objectKey sorts keys", function() {
        equal(util.objectKey({ foo: true, bar: false }), "barfalsefootrue");
    });

    test("hashKey matches pre-computed FNV-1 hashes", function() {
        equal(util.hashKey("footrue"), 0xBFE48FAB, "Case #1");
        equal(util.hashKey("barfalse"), 0xEC55C421, "Case #2");
    });

    test("hashObject matches pre-computed FNV-1 hashes", function() {
        equal(util.hashObject({ foo: true }), 0xBFE48FAB, "Case #1");
        equal(util.hashObject({ bar: false }), 0xEC55C421, "Case #2");
    });

    test("hashObject ignores key order", function() {
        equal(util.hashObject({ foo: true, bar: false }),
              util.hashObject({ bar: false, foo: true }));
    });

    // ------------------------------------------------------------
    module("Array Helpers");

    test("arrayLimits returns the minimum and maximum number in an array", function() {
        var result = util.arrayLimits([5, -1, 4, 7, 2]);
        equal(result.min, -1);
        equal(result.max, 7);
    });

    test("arrayMin returns the minimum number in an array", function() {
        equal(util.arrayMin([5, -1, 4, 7, 2]), -1);
    });

    test("arrayMax returns the maximum number in an array", function() {
        equal(util.arrayMax([5, -1, 4, 7, 2]), 7);
    });

    test("sparseArrayLimits ignores undefined values", function() {
        var l = util.sparseArrayLimits([1, undefined, 2]);
        equal(l.min, 1);
        equal(l.max, 2);
    });

    test("sparseArrayLimits returns undefined for empty array", function() {
        var l = util.sparseArrayLimits([]);
        equal(l.min, undefined);
        equal(l.max, undefined)
    });

    test("sparseArrayMin returns array min", function() {
        equal(util.sparseArrayMin([1, undefined, 2]), 1);
    });

    test("sparseArrayMax returns array max", function() {
        equal(util.sparseArrayMax([1, undefined, 2]), 2);
    });

    test("last returns last element in array", function() {
        equal(util.last([0, 1]), 1);
    });

    test("last returns undefined for empty array", function() {
        equal(util.last([]), undefined);
    });

    test("last returns undefined for undefined", function() {
        equal(util.last(), undefined);
    });

    test("append adds array elements", function() {
        var arr = [0];
        util.append(arr, [1, 2]);

        deepEqual(arr, [0, 1, 2]);
    });

    test("append returns target array", function() {
        deepEqual(util.append([0], [1, 2]), [0, 1, 2]);
    });

    // ------------------------------------------------------------
    module("Template helpers");

    test("renderPos renders position class", function() {
        equal(util.renderPos("top"), "k-pos-top");
    });

    test("renderPos renders multiple position classes", function() {
        equal(util.renderPos("topLeft"), "k-pos-top k-pos-left");
    });

    test("renderPos returns empty string", function() {
        equal(util.renderPos(), "");
    });

    test("renderStyle renders style attributes", function() {
        equal(util.renderStyle([["foo", "a"], ["bar", "b"]]), "foo:a;bar:b;");
    });

    test("renderStyle ignores undefined values", function() {
        equal(util.renderStyle([["foo", undefined], ["bar", "b"]]), "bar:b;");
    });

    test("renderStyle returns undefined with no values", function() {
        equal(util.renderStyle([["foo", undefined]]), undefined);
    });
})();
