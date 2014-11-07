(function() {
    var util = kendo.util;

    module("kendo.util");

    test("now returns current time", function() {
        equal(util.now(), new Date().getTime());
    });
})();
