(function() {
    var dataviz = kendo.dataviz,
        g = dataviz.geometry,
        d = dataviz.drawing,
        m = dataviz.map,
        ShapeLayer = m.layers.ShapeLayer,
        Location = m.Location;

    var map;
    var layer;

    // ------------------------------------------------------------
    module("Shape Layer / Positioning", {
        setup: function() {
            map = new MapMock();
            layer = new ShapeLayer(map);
        }
    });

    test("Movable is attached to surface element", function() {
        equal(layer.movable.element[0], layer.surface.element);
    });

    // ------------------------------------------------------------
    var pointData = [{
        "type": "Point",
        "coordinates": [-105.01621, 39.57422]
    }];

    module("Shape Layer / Markers", {
        setup: function() {
            map = new MapMock();
            map.markers = new m.layers.MarkerLayer(map);
            layer = new ShapeLayer(map);
        }
    });

    test("adds marker when parsing points", function() {
        map.markers.add = function() { ok(true); };

        layer._load(pointData);
    });

    test("removes old markers on _load", function() {
        map.markers.remove = function() { ok(true); }

        layer._load(pointData);
        layer._load(pointData);
    });

    test("sets marker location", function() {
        map.markers.bind = function(options) {
            ok(new Location(39.57422, -105.01621).equals(Location.create(options.location)));
        };

        layer._load(pointData);
    });

    test("sets marker dataItem", function() {
        map.markers = {
            bind: function(options, dataItem) {
                deepEqual(dataItem, pointData[0]);
            }
        };

        layer._load(pointData);
    });

    test("does not add marker when markerCreated is cancelled", 0, function() {
        map.markers.add = function() { ok(false); };
        map.bind("markerCreated", function(e) { e.preventDefault(); });

        layer._load(pointData);
    });

    test("adds circle when markerCreated is cancelled", function() {
        map.bind("markerCreated", function(e) { e.preventDefault(); });

        layer.surface.draw = function(shape) {
            ok(shape instanceof d.Circle);
        };

        layer._load(pointData);
    });

    test("does not add circle when markerCreated and shapeCreated are cancelled", 0, function() {
        map.bind("markerCreated", function(e) { e.preventDefault(); });
        map.bind("shapeCreated", function(e) { e.preventDefault(); });

        layer.surface.draw = function(shape) {
            ok(false);
        };

        layer._load(pointData);
    });

    test("triggers markerCreated on map", function() {
        map.bind("markerCreated", function() { ok(true); });

        layer._load(pointData);
    });

    test("does not trigger shapeCreated on map", 0, function() {
        map.bind("shapeCreated", function() { ok(false); });

        layer._load(pointData);
    });

    test("triggers shapeCreated on map if markerCreated is cancelled", function() {
        map.bind("markerCreated", function(e) { e.preventDefault(); });
        map.bind("shapeCreated", function() { ok(true); });

        layer._load(pointData);
    });

    // ------------------------------------------------------------
    module("Shape Layer / destroy", {
        setup: function() {
            map = new MapMock();
            layer = new ShapeLayer(map);
        }
    });

    test("destroys surface", function() {
        layer.surface.destroy = function() {
            ok(true);
        };

        layer.destroy();
    });

    // ------------------------------------------------------------
    module("Shape Layer / Data binding", {
        setup: function() {
            map = new MapMock();
            layer = new ShapeLayer(map, {
                dataSource: {
                    data: [{
                        "type": "LineString",
                        "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
                    }]
                }
            });
        }
    });

    test("re-draws GeoJSON primitives on reset", function() {
        layer.surface.draw = function() {
            ok(true);
        };

        map.trigger("reset");
    });

    test("re-draws all shapes on incremental change", function() {
        layer._load = function(data) {
            equal(data.length, 2);
        };

        layer.dataSource.add({});
    });

    // ------------------------------------------------------------
    module("Shape Layer / API", {
        setup: function() {
            map = new MapMock();
            layer = new ShapeLayer(map);
        }
    });

    test("surface is cleared before reset", function() {
        layer.surface.clear = function() {
            ok(true);
        };

        map.trigger("beforeReset");
    });

    test("surface is not cleared during reset", 0, function() {
        layer.surface.clear = function() {
            ok(false);
        };

        map.trigger("reset");
    });

    baseLayerTests("Shape Layer", ShapeLayer);
})();
