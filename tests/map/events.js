(function() {
    var dataviz = kendo.dataviz,

        g = dataviz.geometry,
        Point = g.Point,

        m = dataviz.map,
        Extent = m.Extent,
        Location = m.Location;

    var map;
    function createMap(options) {
        destroyMap();

        var element = $("<div></div>").appendTo(QUnit.fixture);
        map = new kendo.dataviz.ui.Map(element, options);
        return map;
    }

    function destroyMap() {
        if (map) {
            map.destroy();
            map.element.remove();
            map = null;
        }
    }

    function touchZoom() {
        var element = map.scrollElement;
        press(element, 100, 100, 1);
        press(element, 110, 110, 2);
        move(element, 200, 200, 2);
        release(element, 200, 200, 2);
        release(element, 100, 100, 1);
    }

    // ------------------------------------------------------------
    module("Map / Events / zoomStart", {
        setup: createMap,
        teardown: destroyMap
    });

    test("triggered for mousewheel", function() {
        map.bind("zoomStart", function(e) {
            ok(true);
        });

        mousewheel(map.element, -1);
    });

    test("cancellable (mousewheel)", function() {
        map.zoom(1);
        map.bind("zoomStart", function(e) {
            e.preventDefault();
        });

        mousewheel(map.element, -1);

        equal(map.zoom(), 1);
    });

    test("triggered for touch", function() {
        map.zoom(1);
        map.bind("zoomStart", function(e) {
            ok(true);
        });

        touchZoom();
    });

    test("cancellable (touch)", function() {
        map.zoom(1);
        map.bind("zoomStart", function(e) {
            e.preventDefault();
        });

        touchZoom();

        equal(map.zoom(), 1);
    });

    // ------------------------------------------------------------
    module("Map / Events / reset", {
        setup: createMap,
        teardown: destroyMap
    });

    test("beforeReset triggered before reset", 2, function() {
        map.bind("beforeReset", function() {
            ok(true);
            map.bind("reset", function() {
                ok(true);
            });
        });

        map._reset();
    });

    test("fires reset after zooming", function() {
        map.bind("reset", function() {
            equal(map.zoom(), 5);
        });

        map.zoom(5);
    });

    test("fires reset after changing center", function() {
        map.bind("reset", function() {
            ok(map.center().equals(new m.Location(10, 20)));
        });

        map.center([10, 20]);
    });

    test("fires reset after setOptions", function() {
        map.bind("reset", function() {
            ok(map.options.foo, true);
        });

        map.setOptions({ foo: true });
    });
})();
