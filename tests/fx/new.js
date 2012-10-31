QUnit.config.reorder = false;

module("new FX API");

test("Creating effects registers API constructor", 1, function() {
    kendo.fx.createEffect("foo", {

    });

    var fx = kendo.fx($("<div />"));

    ok($.isFunction(fx.foo));
});

test("Creating effects registers API constructor", 2, function() {
    kendo.fx.createEffect("foo", {
        directions: ["left", "right"]
    });

    var fx = kendo.fx($("<div />"));

    ok($.isFunction(fx.fooLeft));
    ok($.isFunction(fx.fooRight));
});

function verifyEffect(effectName, before, after, reverse) {
    var effect = kendo.fx($("<i />"))[effectName]();
    effect.duration(0);
    effect.before = before;
    effect.after = after;
    effect.setReverse(reverse);
    effect.run();
}

test("zoom in zooms the element", 2, function() {
    verifyEffect("zoomIn",
        function(element) { equal(element.css("transform"), "scale(0.01)") },
        function(element) { equal(element.css("transform"), "scale(1)") }
    );
});
