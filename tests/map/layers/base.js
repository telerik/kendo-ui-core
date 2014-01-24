function baseLayerTests(name, TLayer) {
    var dataviz = kendo.dataviz,
        d = dataviz.drawing;

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
}
