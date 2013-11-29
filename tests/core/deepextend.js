(function(){

var deepExtend = kendo.deepExtend;
var src;
var dst;

module("deepExtend", {
    setup: function() {
        src = {
            margin: {
                top: 10
            },
            colors: ["red"],
            border: 5,
            date: new Date(),
            foo: {
                clone: function() {
                    return true;
                }
            }
        };

        dst = {
            margin: 5,
            colors: ["green", "blue"],
            border: undefined
        }

        deepExtend(dst, src);
    }
});

test("Overwrites arrays", function() {
    equal(dst.colors[0], "red");
    equal(dst.colors.length, 1);
});

test("Does not copy undefined values", function() {
    equal(dst.border, 5);
});

test("Overwrites fields containing primitive types", function() {
    equal(dst.margin.top, 10);
});

test("Clones dates", function() {
    equal(dst.date.getTime(), src.date.getTime());
    ok(dst.date != src.date);
});

test("Clones objects with clone method", function() {
    ok(dst.foo);
});

}());
