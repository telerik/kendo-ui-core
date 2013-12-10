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
})();
