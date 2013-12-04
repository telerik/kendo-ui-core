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
        module("Map / Scroller", {
            setup: createMap,
            teardown: destroyMap
        });

        test("x virtualSize is 20x layer size when wraparound is true", function() {
            var scale = map._layerSize();
            var x = map.scroller.dimensions.x;
            equal(x._virtualMin, -20 * scale);
            equal(x._virtualMax, 20 * scale);
        });

        test("x virtualSize is layer size when wraparound is false", function() {
            createMap({ wraparound: false });
            var scale = map._layerSize();
            var x = map.scroller.dimensions.x;
            equal(x._virtualMax - x._virtualMin, 2048);
        });

        test("y virtualSize equals layer size", function() {
            var scale = map._layerSize();
            var y = map.scroller.dimensions.y;
            equal(y._virtualMax - y._virtualMin, scale);
        });
    })();
})();
