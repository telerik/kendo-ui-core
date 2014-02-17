function baseLayerTests(name, TLayer) {
    var dataviz = kendo.dataviz,
        d = dataviz.drawing,
        m = dataviz.map;

    function assertUnbind() {
        map.unbind = function(name, handler) {
            if (name === "reset") {
                ok(true);
            }

            if (name === "resize") {
                ok(true);
            }
        };
    }

    // ------------------------------------------------------------
    module(name + " / styles", {
        setup: function() {
            map = new MapMock();
        }
    });

    test("zIndex", function() {
        layer = new TLayer(map, { zIndex: 100 });
        equal(layer.element.css("zIndex"), 100);
    });

    test("opacity", function() {
        layer = new TLayer(map, { opacity: 0.10 });
        close(layer.element.css("opacity"), 0.10, 0.001);
    });

    // ------------------------------------------------------------
    module(name + " / hide", {
        setup: function() {
            map = new MapMock();
            layer = new TLayer(map);
        }
    });

    test(name + " / hide hides element", function() {
        layer.hide();
        equal(layer.element.css("display"), "none");
    });

    test("detaches map event handlers", 2, function() {
        assertUnbind();
        layer.hide();
    });

    // ------------------------------------------------------------
    module(name + " / show", {
        setup: function() {
            map = new MapMock();
            layer = new TLayer(map);
            layer.hide();
        }
    });

    test("shows element", function() {
        layer.show();
        equal(layer.element.css("display"), "block");
    });

    test("re-attaches map event handlers", function() {
        stubMethod(TLayer.fn, "reset", function() {
            ok(true);
        }, function() {
            layer.show();
            map.trigger("reset");
        });
    });

    test("triggers reset", function() {
        stubMethod(TLayer.fn, "reset", function() {
            ok(true);
        }, function() {
            layer.show();
        });
    });

    // ------------------------------------------------------------
    module(name + " / destroy", {
        setup: function() {
            map = new MapMock();
            layer = new TLayer(map);
        }
    });

    test("detaches map event handlers", 2, function() {
        assertUnbind();
        layer.destroy();
    });

    // ------------------------------------------------------------
    module(name + " / extent", {
        setup: function() {
            map = new MapMock();
        }
    });

    test("layer is hidden when zoom < minZoom", function() {
        layer = new TLayer(map, { minZoom: 5 });
        stubMethod(TLayer.fn, "_setVisibility", function(visible) {
            ok(!visible);
        }, function() {
            map._zoom = 4;
            map.trigger("reset");
        });
    });

    test("layer is shown when zoom = minZoom", function() {
        layer = new TLayer(map, { minZoom: 5 });
        stubMethod(TLayer.fn, "_setVisibility", function(visible) {
            ok(visible);
        }, function() {
            map._zoom = 5;
            map.trigger("reset");
        });
    });

    test("layer is hidden when zoom > maxZoom", function() {
        layer = new TLayer(map, { maxZoom: 5 });
        stubMethod(TLayer.fn, "_setVisibility", function(visible) {
            ok(!visible);
        }, function() {
            map._zoom = 6;
            map.trigger("reset");
        });
    });

    test("layer is shown when zoom = maxZoom", function() {
        layer = new TLayer(map, { maxZoom: 5 });
        stubMethod(TLayer.fn, "_setVisibility", function(visible) {
            ok(visible);
        }, function() {
            map._zoom = 5;
            map.trigger("reset");
        });
    });

    test("layer is hidden when outside zoom range", function() {
        layer = new TLayer(map, { minZoom: 3, maxZoom: 5 });
        stubMethod(TLayer.fn, "_setVisibility", function(visible) {
            ok(!visible);
        }, function() {
            map._zoom = 1;
            map.trigger("reset");
        });
    });

    test("layer is shown when inside zoom range", function() {
        layer = new TLayer(map, { minZoom: 3, maxZoom: 5 });
        stubMethod(TLayer.fn, "_setVisibility", function(visible) {
            ok(visible);
        }, function() {
            map._zoom = 4;
            map.trigger("reset");
        });
    });

    test("layer is hidden when outside extent", function() {
        layer = new TLayer(map, {
            extent: [
                45.3444, 20.8960,
                40.5222, 29.6850
            ]
        });

        map._extent = new m.Extent([0, 0], [-10, 10]);

        stubMethod(TLayer.fn, "_setVisibility", function(visible) {
            ok(!visible);
        }, function() {
            map.trigger("reset");
        });
    });

    test("layer is shown when inside extent", function() {
        layer = new TLayer(map, {
            extent: [
                45.3444, 20.8960,
                40.5222, 29.6850
            ]
        });

        map._extent = new m.Extent([0, 42], [30, 0]);

        stubMethod(TLayer.fn, "_setVisibility", function(visible) {
            ok(visible);
        }, function() {
            map.trigger("reset");
        });
    });

    test("layer is shown when inside extent and zoom range", function() {
        layer = new TLayer(map, {
            extent: [
                45.3444, 20.8960,
                40.5222, 29.6850
            ],
            minZoom: 5,
            maxZoom: 10
        });

        map._zoom = 5;
        map._extent = new m.Extent([0, 42], [30, 0]);

        stubMethod(TLayer.fn, "_setVisibility", function(visible) {
            ok(visible);
        }, function() {
            map.trigger("reset");
        });
    });

    test("layer is hidden when inside extent, but outside zoom range", function() {
        layer = new TLayer(map, {
            extent: [
                45.3444, 20.8960,
                40.5222, 29.6850
            ],
            minZoom: 5,
            maxZoom: 10
        });

        map._zoom = 4;
        map._extent = new m.Extent([0, 42], [30, 0]);

        stubMethod(TLayer.fn, "_setVisibility", function(visible) {
            ok(!visible);
        }, function() {
            map.trigger("reset");
        });
    });

    test("extent is evaluated on panEnd", function() {
        layer = new TLayer(map, { minZoom: 5 });
        stubMethod(TLayer.fn, "_setVisibility", function(visible) {
            ok(true);
        }, function() {
            map.trigger("panEnd");
        });
    });

    test("extent not evaluated for hidden layer", 0, function() {
        layer = new TLayer(map, { minZoom: 5 });
        layer.hide();
        stubMethod(TLayer.fn, "_setVisibility", function(visible) {
            ok(false);
        }, function() {
            map.trigger("reset");
        });
    });
}
