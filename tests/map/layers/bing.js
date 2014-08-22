(function() {
    var dataviz = kendo.dataviz,
        map = dataviz.map,

        BingLayer = map.layers.BingLayer,
        Location = map.Location,

        deepExtend = kendo.deepExtend,
        Point = dataviz.geometry.Point;

    var BingLayerDouble = BingLayer.extend({
        _fetchMetadata: $.noop
    });

    (function() {
        var map,
            layer;

        function createBingLayer(options) {
            map = new MapMock();
            layer = new BingLayerDouble(map, options);
        }

        function setMetadata(res) {
            layer._onMetadata({
                resourceSets: [{
                    resources: [deepExtend({
                        imageUrl: "javascript: void(0);"
                    }, res)]
                }]
            });
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

            setMetadata();
        });

        test("sets minZoom from metadata", function() {
            setMetadata({
                zoomMin: 4
            });

            equal(layer.options.minZoom, 4);
        });

        test("sets maxZoom from metadata", function() {
            setMetadata({
                zoomMax: 4
            });

            equal(layer.options.maxZoom, 4);
        });

        test("sets subdomains from metadata", function() {
            setMetadata({
                imageUrlSubdomains: ["a", "b", "c"]
            });

            deepEqual(layer._view.options.subdomains, ["a", "b", "c"]);
        });

        test("converts imageUrl to urlTemplate", function() {
            setMetadata({
                imageUrl: "javascript:void('{subdomain}/{quadkey}/{culture}')"
            });

            equal(layer._view.options.urlTemplate, "javascript:void('#= subdomain #/#= quadkey #/#= culture #')");
        });

        test("error is thrown if no key is defined", function() {
            raises(function() {
                    map = new MapMock();
                    layer = new BingLayer(map);
                },
                "Bing tile layer: API key is required"
            );
        });

        test("sets URI Scheme for HTTPS protocol", function() {
            equal(layer._scheme("https:"), "https");
        });

        test("sets URI Scheme for HTTP protocol", function() {
            equal(layer._scheme("http:"), "http");
        });

        test("sets URI Scheme for other protocols", function() {
            equal(layer._scheme("foo:"), "http");
        });

        test("sets imagerySet via imagerySet()", function() {
            var imagerySetValue = "aerial";
            layer.imagerySet(imagerySetValue);

            deepEqual(layer.options.imagerySet, "aerial");
        });

        test("sets current imagerySet from imagerySet() without parameters", function() {
            deepEqual(layer.imagerySet(), "road");
        });
    })();

    baseLayerTests("Bing Layer", BingLayerDouble);
})();
