(function() {
    var dataviz = kendo.dataviz,
        util = dataviz.util;

    // ------------------------------------------------------------
    module("Helpers");

    test("sqr returns a * a", function() {
        equal(util.sqr(2), 4);
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
