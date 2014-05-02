(function() {
    var dataviz = kendo.dataviz,
        map = dataviz.map,

        BingLayer = map.layers.BingLayer,
        Location = map.Location,

        Point = dataviz.geometry.Point;

    (function() {
        var map,
            layer;

        function createBingLayer(options) {
            map = new MapMock();
            layer = new BingLayer(map, options);
        }

        // ------------------------------------------------------------
        module("Bing Layer", {
            setup: function() {
                createBingLayer();
            }
        });

        test("appends to scrollElement", function() {
            ok(layer.element.parent().is("#scroll-element"));
        });

        test("renders in initial element", function() {
            var element = layer.element;

            layer.reset = function() {
                BingLayer.fn.reset.call(this);

                ok(layer._view.element.is(element));
            }

            layer._success({
                resourceSets: [{
                    resources: [{
                        imageUrl: "http://localhost/fake"
                    }]
                }]
            });
        });

        test("sets custom z-index", function() {
            layer = new BingLayer(map, { zIndex: 100 });
            equal(layer.element.css("zIndex"), 100);
        });

    })();

    baseLayerTests("Bing Layer", BingLayer);
})();
