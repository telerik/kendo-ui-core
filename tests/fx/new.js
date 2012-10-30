QUnit.config.reorder = false;

module("new FX API");

// integration
test("zoom out effect zooms given element", 1, function() {
    var dom = $("<div />"),
        fx = kendo.fx(dom);

    fx.zoom("out").duration(400).play();
    equal(dom.css("transform"), "scale(0.01)");
});

test("zoom out effect zooms given element", 1, function() {
    var dom = $("<div />"),
        fx = kendo.fx(dom);

    fx.zoom("out").duration(400).reverse();
    equal(dom.css("transform"), "scale(1)");
});

test("Creating effects registers API constructor", 1, function() {
    kendo.fx.createEffect("foo", {

    });

    var fx = kendo.fx($("<div />"));

    ok($.isFunction(fx.foo));
});
