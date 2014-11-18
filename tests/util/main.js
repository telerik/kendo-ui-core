(function() {
    var util = kendo.util;

    module("kendo.util");

    test("now returns current time", function() {
        equal(util.now(), new Date().getTime());
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

    test("appends array to array", function() {
        var arr = [1];
        util.append(arr, [2, 3]);

        deepEqual(arr, [1, 2, 3]);
    });

    test("calls push method", function() {
        function Foo() { };
        Foo.prototype.push = function() {
            ok(true);
        };

        var foo = new Foo();

        util.append(foo, []);
    });

})();
