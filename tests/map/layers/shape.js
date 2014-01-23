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

    var pointData = [{
        "type": "Point",
        "coordinates": [-105.01621, 39.57422]
    }];

    // ------------------------------------------------------------
    module("Shape Layer / Markers", {
        setup: function() {
            map = new MapMock();
            map.markers = { add: $.noop };
            layer = new ShapeLayer(map);
        }
    });

    test("adds marker when parsing points", function() {
        map.markers = {
            add: function() { ok(true); }
        };

        layer._load(pointData);
    });

    test("removes old markers on _load", function() {
        map.markers.remove = function() { ok(true); }

        layer._load(pointData);
        layer._load(pointData);
    });

    test("sets default marker options", function() {
        map.options.markerDefaults = { foo: true };

        map.markers = {
            add: function(marker) { ok(marker.options.foo); }
        };

        layer._load(pointData);
    });

    test("sets marker location", function() {
        map.markers = {
            add: function(marker) {
                deepEqual(marker.options.location, [39.57422, -105.01621]);
            }
        };

        layer._load(pointData);
    });

    test("sets marker dataItem", function() {
        map.markers = {
            add: function(marker) {
                deepEqual(marker.dataItem, pointData[0]);
            }
        };

        layer._load(pointData);
    });

    test("does not add marker when markerCreated is cancelled", 0, function() {
        map.markers = {
            add: function() { ok(false); }
        };
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
    module("Shape Layer / hide", {
        setup: function() {
            map = new MapMock();
            layer = new ShapeLayer(map);
            layer.hide();
        }
    });

    test("hides element", function() {
        equal(layer.element.css("visibility"), "hidden");
    });

    test("detaches map event handlers", 0, function() {
        stubMethod(ShapeLayer.fn, "_load", function() {
            ok(false);
        }, function() {
            map.trigger("reset");
        });
    });

    // ------------------------------------------------------------
    module("Shape Layer / show", {
        setup: function() {
            map = new MapMock();
            layer = new ShapeLayer(map);
            layer.hide();
        }
    });

    test("shows element", function() {
        layer.show();
        equal(layer.element.css("visibility"), "visible");
    });

    test("re-attaches map event handlers", function() {
        stubMethod(ShapeLayer.fn, "_load", function() {
            ok(true);
        }, function() {
            layer.show();
            map.trigger("reset");
        });
    });

    test("triggers reset", function() {
        stubMethod(ShapeLayer.fn, "_load", function() {
            ok(true);
        }, function() {
            layer.show();
        });
    });

    // ------------------------------------------------------------
    module("Shape Layer / destroy", {
        setup: function() {
            map = new MapMock();
            layer = new ShapeLayer(map);
        }
    });

    test("detaches map event handlers", 0, function() {
        stubMethod(ShapeLayer.fn, "_load", function() {
            ok(false);
        }, function() {
            layer.destroy();
            map.trigger("reset");
        });
    });

    test("destroys surface", function() {
        stubMethod(d.Surface.fn, "destroy", function() {
            ok(true);
        }, function() {
            layer.destroy();
            map.trigger("reset");
        });
    });

})();
