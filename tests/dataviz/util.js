(function() {
    var dataviz = kendo.dataviz,
        util = dataviz.util;

    // ------------------------------------------------------------
    module("Helpers");

    test("sqr returns a * a", function() {
        equal(util.sqr(2), 4);
    });

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
})();
