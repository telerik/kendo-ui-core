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
    var effect = kendo.fx($("<div style='width:200px; height: 200px' />"))[effectName]();
    effect.duration(0);

    var setup = effect.setup;
    effect.setup = function() {
        setup.call(this);
        before(this.element);
    };

    effect.run().then(function() {
        after(effect.element);
    });
}

asyncTest("slideIn slides the element", 2, function() {
    verifyEffect("slideInLeft",
        function(element) { equal(element.css("transform"), "translateX(200px)") },
        function(element) { start(); equal(element.css("transform"), "translateX(0px)") }
    );
});

asyncTest("tile tiles the element", 2, function() {
    var foo = $("<div style='width: 200px' />"),
        bar = $("<div style='width: 200px' />"),
        effect = kendo.fx(foo).tile("left", bar);

    effect.duration(0);

    effect.run().then(function() {
        start();
        equal(foo.css("transform"), "translateX(0px)");
        equal(bar.css("transform"), "translateX(-200px)");
    });
});

asyncTest("fade in fades the element", 2, function() {
    verifyEffect("fadeIn",
        function(element) { equal(element.css("opacity"), "0") },
        function(element) { start(); equal(element.css("opacity"), "1") }
    );
});

asyncTest("fade out fades the element and hides it", 3, function() {
    verifyEffect("fadeOut",
        function(element) { equal(element.css("opacity"), "1") },
        function(element) {
            start();
            equal(element.css("opacity"), "1");
            equal(element.css("display"), "none");
        }
    );
});

asyncTest("zoom in zooms the element", 2, function() {
    verifyEffect("zoomIn",
        function(element) { equal(element.css("transform"), "scale(0.01)") },
        function(element) { start(); equal(element.css("transform"), "scale(1)") }
    );
});

asyncTest("expanding expands the element", 2, function() {
    verifyEffect("expandVertical",
        function(element) { equal(element.css("height"), "0px") },
        function(element) { start(); equal(element.css("height"), "200px") }
    );
});

asyncTest("transfer transfers the element", 2, function() {
    var foo = $("<div style='width: 200px; height: 200px;' />"),
        bar = $("<div style='width: 100px; height: 100px; margin-left: 300px; margin-right: 300px;' />").appendTo(document.body),
        effect = kendo.fx(foo).transfer(bar);

    effect.duration(0);

    effect.run().then(function() {
        start();
        equal(foo.css("transform"), "matrix(0.5, 0, 0, 0.5, 0, 0)");
        equal(foo.css("transformOrigin"), "kur");
    });
});
