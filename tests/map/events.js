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

    // ------------------------------------------------------------
    module("Map / Events / zoomStart", {
        setup: createMap,
        teardown: destroyMap
    });

    test("cancellable (mousewheel)", function() {
        map.zoom(1);
        map.bind("zoomStart", function(e) {
            e.preventDefault();
        });

        map._mousewheel({
            preventDefault: $.noop,
            originalEvent: {
                detail: -3
            }
        });

        equal(map.zoom(), 1);
    });
})();
