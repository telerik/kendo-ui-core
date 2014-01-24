function baseLayerTests(name, TLayer) {
    var dataviz = kendo.dataviz,
        d = dataviz.drawing;

    module(name + " / hide", {
        setup: function() {
            map = new MapMock();
            layer = new TLayer(map);
            layer.hide();
        }
    });

    test(name + " / hide hides element", function() {
        equal(layer.element.css("display"), "none");
    });

    test("detaches map event handlers", 0, function() {
        stubMethod(TLayer.fn, "reset", function() {
            ok(false);
        }, function() {
            map.trigger("reset");
        });
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
        map.unbind = function(name, handler) {
            if (name === "reset") {
                ok(true);
            }

            if (name === "resize") {
                ok(true);
            }
        };

        layer.destroy();
    });
}
