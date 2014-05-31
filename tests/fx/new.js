(function() {
    module("new FX API");

    function getTransform(element) {
        var chunks = $.grep(element.css("transform").split(/[\(, \)]/), function(chunk) {
            return chunk.length > 0;
        });

        return {
            scale: chunks[1],
            translateX: chunks[5],
            translateY: chunks[6]
        };
    }

    test("Creating effects registers API constructor", 1, function() {
        kendo.effects.createEffect("foo", {

        });

        var fx = kendo.fx($("<div />"));

        ok($.isFunction(fx.foo));
    });

    test("Creating effects registers API constructor", 2, function() {
        kendo.effects.createEffect("foo", {
            directions: ["left", "right"]
        });

        var fx = kendo.fx($("<div />"));

        ok($.isFunction(fx.fooLeft));
        ok($.isFunction(fx.fooRight));
    });

    module("FX integration tests");

    function verifyEffect(effectName, before, after, withEffect) {
        withEffect = withEffect || $.noop;

        var effect = kendo.fx($("<div style='width:200px; height: 200px' />").appendTo(QUnit.fixture))[effectName]();
        effect.duration(0);

        withEffect(effect);

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
            function(element) { ; equal(getTransform(element).translateX, 200); },
            function(element) { start(); equal(getTransform(element).translateX, 0); }
        );
    });

    asyncTest("tile tiles the element", 2, function() {
        var foo = $("<div style='width: 200px' />").appendTo(QUnit.fixture),
            bar = $("<div style='width: 200px' />").appendTo(QUnit.fixture),
            effect = kendo.fx(foo).tile("left", bar);

        effect.duration(0);

        effect.run().then(function() {
            start();
            equal(getTransform(foo).translateX, 0);
            equal(getTransform(bar).translateX, -200);
        });
    });

    asyncTest("fade in fades the element", 2, function() {
        verifyEffect("fadeIn",
            function(element) { equal(element.css("opacity"), "0") },
            function(element) { start(); equal(element.css("opacity"), "1") }
        );
    });

    asyncTest("fade in accepts custom start/end values", 2, function() {
        verifyEffect("fadeIn",
            function(element) { QUnit.close(element.css("opacity"), 0.3, 0.1) },
            function(element) { start(); QUnit.close(element.css("opacity"), 0.8, 0.1); },
            function(effect) { effect.startValue(0.3).endValue(0.8); }
        );
    });

    asyncTest("fade out can fade the element to a given value", 3, function() {
        verifyEffect("fadeOut",
            function(element) { QUnit.close(element.css("opacity"), 1, 0.1); },
            function(element) { start(); QUnit.close(element.css("opacity"), 0.8, 0.1); equal(element.css("display"), "block"); },
            function(effect) { effect.endValue(0.8); }
        );
    });

    asyncTest("fade out fades the element and hides it", 3, function() {
        verifyEffect("fadeOut",
            function(element) { equal(element.css("opacity"), "1") },
            function(element) {
                start();
                equal(element.css("opacity"), "0");
                equal(element.css("display"), "none");
            }
        );
    });

    asyncTest("zoom in zooms the element", 2, function() {
        verifyEffect("zoomIn",
            function(element) { equal(getTransform(element).scale, 0.01) },
            function(element) { start(); equal(getTransform(element).scale, 1) }
        );
    });

    asyncTest("expanding expands the element", 2, function() {
        verifyEffect("expandVertical",
            function(element) { equal(element.css("height"), "0px") },
            function(element) { start(); equal(element.css("height"), "200px") }
        );
    });

    asyncTest("transfer transfers the element", 3, function() {
        var foo = $("<div style='width: 200px; height: 200px;' />"),
            bar = $("<div style='width: 100px; height: 100px; margin-left: 300px; margin-right: 300px;' />").prependTo(QUnit.fixture),
            effect = kendo.fx(foo).transfer(bar);

        effect.duration(0);

        effect.run().then(function() {
            start();
            equal(foo.css("transform"), "matrix(0.5, 0, 0, 0.5, 0, 0)");
            var transformOrigin = foo.css("transformOrigin").match(/(\d+)\.?\d+px/g).map(function(px) { return parseInt(px) });
            equal(transformOrigin[0], 616);
            equal(transformOrigin[1], 16);
            foo.remove();
        });
    });

    asyncTest("page turn turns the two pages, hiding the first one", 2, function() {
        var container = $("<div><div id='foo'>Foo</div><div id='bar'>Bar</div></div>"),
            foo = container.find("#foo"),
            bar = container.find("#bar"),
            effect = kendo.fx(container).pageturn("horizontal", foo, bar);

        effect.duration(0);

        effect.run().then(function() {
            start();
            equal(foo.css("display"), "none");
            equal(bar.css("display"), "block");
        });
    });

    asyncTest("flip flips the two pages, hiding the first one", 2, function() {
        var container = $("<div><div id='foo'>Foo</div><div id='bar'>Bar</div></div>"),
            foo = container.find("#foo"),
            bar = container.find("#bar"),
            effect = kendo.fx(container).flip("horizontal", foo, bar);

        effect.duration(0);

        effect.run().then(function() {
            start();
            equal(foo.css("display"), "none");
            equal(bar.css("display"), "block");
        });
    });

    asyncTest("replace replaces one of the elements with the other", 2, function() {
        var container = $("<div><div id='foo'>Foo</div><div id='bar'>Bar</div></div>"),
            foo = container.find("#foo"),
            bar = container.find("#bar"),
            effect = kendo.fx(bar).replace(foo, "zoom");

        QUnit.fixture.append(container);

        effect.run().then(function() {
            start();
            equal(foo.css("display"), "none");
            equal(bar.css("display"), "block");
            QUnit.fixture.empty();
        });
    });

    asyncTest("Triggers before/after callbacks", 6, function() {
        var container = $("<div><div id='foo'>Foo</div><div id='bar'>Bar</div></div>"),
            foo = container.find("#foo"),
            bar = container.find("#bar"),
            effect = kendo.fx(bar).replace(foo, "zoom");

        QUnit.fixture.append(container);

        effect
        .beforeTransition(function(previous, next) {
            equal(previous[0], foo[0]);
            equal(next[0], bar[0]);
            ok(container.hasClass("k-fx-start"));
        })
        .afterTransition(function(previous, next) {
            equal(previous[0], foo[0]);
            equal(next[0], bar[0]);
            ok(container.hasClass("k-fx-end"));
        })
        .run()
        .then(function() {
            start();
            QUnit.fixture.empty();
        });
    });
})();
