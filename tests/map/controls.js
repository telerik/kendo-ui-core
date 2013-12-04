(function() {
    var dataviz = kendo.dataviz,
        Point = dataviz.Point2D,

        m = dataviz.map,
        Extent = m.Extent,
        Location = m.Location;

    var map;
    function createMap(options) {
        var element = $("<div style='width: 512px; height: 512px;'></div>").appendTo($("#qunit-fixture"));
        map = new kendo.dataviz.ui.Map(element, options);
        return map;
    }

    function destroyMap() {
        map.destroy();
        map.element.remove();
    }

    (function() {
        // ------------------------------------------------------------
        module("Map / Navigator", {
            setup: createMap,
            teardown: destroyMap
        });

        test("navigator is created by default", function() {
            ok(map.navigator);
        });

        test("navigator is not created on mobile devices", function() {
            var mobileOS = kendo.support.mobileOS;

            kendo.support.mobileOS = true;
            createMap();
            ok(!map.navigator);
            kendo.support.mobileOS = mobileOS;
        });

        test("navigator is not created if disabled", function() {
            createMap({ controls: { navigator: false } });
            ok(!map.navigator);
        });

        test("navigator options are passed", function() {
            createMap({ controls: { navigator: { foo: true } } });
            ok(map.navigator.options.foo);
        });

        test("panning triggers pan and panEnd", 2, function() {
            map.bind("pan", function() {
                map.bind("panEnd", function() {
                    ok(true);
                });

                ok(true);
            });
            map.navigator.trigger("pan", { x: 100, y: 0 });
        });

        test("panning moves origin", function() {
            map.bind("panEnd", function() {
                ok(new Location(53, -27).equals(map.extent().nw.round()));
            });
            map.navigator.trigger("pan", { x: 100, y: 100 });
        });

        test("panning is limited to world extent (west)", function() {
            createMap({ wraparound: false });
            map.bind("panEnd", function() {
                equal(map.scroller.scrollLeft, -768);
            });
            map.navigator.trigger("pan", { x: -10000, y: 0 });
        });

        test("panning is limited to world extent (east)", function() {
            createMap({ wraparound: false });
            map.bind("panEnd", function() {
                equal(map.scroller.scrollLeft, 768);
            });
            map.navigator.trigger("pan", { x: 10000, y: 0 });
        });

        test("panning is limited to world extent (north)", function() {
            createMap({ wraparound: false });
            map.bind("panEnd", function() {
                equal(map.scroller.scrollTop, 768);
            });
            map.navigator.trigger("pan", { x: 0, y: -10000 });
        });

        test("panning is limited to world extent (south)", function() {
            createMap({ wraparound: false });
            map.bind("panEnd", function() {
                equal(map.scroller.scrollTop, -768);
            });
            map.navigator.trigger("pan", { x: 0, y: 10000 });
        });

        test("panning wraps around world (west)", function() {
            map.bind("panEnd", function() {
                equal(map.scroller.scrollLeft, -10000);
            });
            map.navigator.trigger("pan", { x: -10000, y: 0 });
        });

        test("panning wraps around (east)", function() {
            map.bind("panEnd", function() {
                equal(map.scroller.scrollLeft, 10000);
            });
            map.navigator.trigger("pan", { x: 10000, y: 0 });
        });

        test("center resets center", function() {
            map.bind("reset", function() { ok(true); });
            map.navigator.trigger("center");
        });
    })();
})();
