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

module("FX integration tests")

function verifyEffect(effectName, before, after, reverse) {
    var effect = kendo.fx($("<div style='width:200px' />"))[effectName]();
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

test("slideIn slides the element", 2, function() {
    verifyEffect("slideInLeft",
        function(element) { equal(element.css("transform"), "translateX(200px)") },
        function(element) { equal(element.css("transform"), "translateX(0px)") }
    );
});

test("tile tiles the element", 2, function() {
    var foo = $("<div style='width: 200px' />"),
        bar = $("<div style='width: 200px' />"),
        effect = kendo.fx(foo).tile("left", bar);

    effect.after = function() {
        equal(foo.css("transform"), "translateX(0px)")
        equal(bar.css("transform"), "translateX(-200px)")
    }

    effect.play();
});

test("fade in fades the element", 2, function() {
    verifyEffect("fadeIn",
        function(element) { equal(element.css("opacity"), "0") },
        function(element) { equal(element.css("opacity"), "1") }
    );
});
