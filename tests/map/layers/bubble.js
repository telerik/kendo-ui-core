(function() {
    var dataviz = kendo.dataviz,
        g = dataviz.geometry,
        d = dataviz.drawing,
        m = dataviz.map,
        BubbleLayer = m.layers.BubbleLayer,
        Location = m.Location;

    var map;
    var layer;

    function load() {
        layer._load([{
            "lat": 42, "lng": 45, "value": 10
        }, {
            "lat": 42, "lng": 45, "value": 50
        }, {
            "lat": 42, "lng": 45, "value": 100
        }])
    }

    // ------------------------------------------------------------
    (function() {
        module("Bubble Layer", {
            setup: function() {
                map = new MapMock();
                layer = new BubbleLayer(map, {
                    style: {
                        fill: {
                            color: "foo"
                        }
                    }
                });
            }
        });

        test("creates circle symbols by default", function() {
            layer.surface.draw = function(shape) {
                ok(shape instanceof d.Circle);
            };

            load();
        });

        test("sets circle center", function() {
            layer.surface.draw = function(shape) {
                equal(shape.geometry.center.x, 45);
                equal(shape.geometry.center.y, 42);
            };

            load();
        });

        test("sets circle radius to make area proportional", function() {
            var sizes = [];
            layer.surface.draw = function(shape) {
                sizes.push(Math.round(shape.geometry.radius));
            };

            load();

            deepEqual(sizes, [50, 35, 16]);
        });

        test("sets circle style", function() {
            layer.surface.draw = function(shape) {
                equal(shape.options.fill.color, "foo");
            };

            load();
        });
    })();

    // ------------------------------------------------------------
    (function() {
        module("Bubble Layer / Squares", {
            setup: function() {
                map = new MapMock();
                layer = new BubbleLayer(map, {
                    symbol: "square",
                    style: {
                        fill: {
                            color: "foo"
                        }
                    }
                });
            }
        });

        test("creates square symbols", function() {
            layer.surface.draw = function(shape) {
                ok(shape instanceof d.Path);
            };

            load();
        });

        test("sets square center", function() {
            layer.surface.draw = function(shape) {
                var center = shape.bbox().center();
                equal(center.x, 45);
                equal(center.y, 42);
            };

            load();
        });

        test("sets square size to make area proportional", function() {
            var sizes = [];
            layer.surface.draw = function(shape) {
                sizes.push(Math.round(shape.bbox().width()));
            };

            load();

            deepEqual(sizes, [100, 71, 32]);
        });

        test("sets square style", function() {
            layer.surface.draw = function(shape) {
                equal(shape.options.fill.color, "foo");
            };

            load();
        });
    })();

    // ------------------------------------------------------------
    (function() {
        module("Bubble Layer / Custom Symbol", {
            setup: function() {
                map = new MapMock();
                layer = new BubbleLayer(map, {
                    symbol: "foo",
                    style: "bar"
                });
            }
        });

        test("draws custom symbol", function() {
            layer.surface.draw = function(shape) {
                ok(shape.foo);
            };

            m.symbols.foo = function() {
                return { foo: true };
            };

            load();
        });

        test("sets symbol center", function() {
            m.symbols.foo = function(center) {
                equal(center.x, 45);
                equal(center.y, 42);

                return new d.Group();
            };

            load();
        });

        test("sets symbol size", function() {
            var sizes = [];
            m.symbols.foo = function(center, size) {
                sizes.push(Math.round(size));

                return new d.Group();
            };

            load();

            deepEqual(sizes, [100, 71, 32]);
        });

        test("sets symbol style", function() {
            m.symbols.foo = function(center, size, style) {
                equal(style, "bar");

                return new d.Group();
            };

            load();
        });
    })();

    // ------------------------------------------------------------
    (function() {
        function load() {
            layer._load([{
            }, {
                "lat": 42, "lng": 45, "value": 10
            }, {
            }]);
        }

        module("Bubble Layer / Scale", {
            setup: function() {
                map = new MapMock();
                layer = new BubbleLayer(map);
            }
        });

        test("undefined values are ignored", 1, function() {
            layer.surface.draw = function(shape) {
                equal(shape.geometry.radius, 50);
            };
            load();
        });

        test("initializes custom scale", function() {
            m.scales.foo = function(domain, range) {
                deepEqual(domain, [0, 10]);
                deepEqual(range, [0, 100]);

                this.map = function() {
                    return 1;
                };
            };

            layer = new BubbleLayer(map, {
                scale: "foo"
            });

            load();
        });

        test("uses custom scale", function() {
            m.scales.foo = function(domain, range) {
                this.map = function() {
                    ok(true);
                    return 1;
                };
            };

            layer = new BubbleLayer(map, {
                scale: "foo"
            });

            load();
        });
    })();

    // ------------------------------------------------------------
    module("Bubble Layer / Data binding", {
        setup: function() {
            map = new MapMock();
            layer = new BubbleLayer(map, {
                dataSource: {
                    data: [{
                        "lat": 42, "lng": 45, "value": 10
                    }]
                }
            });
        }
    });

    test("binds to empty data source", 0, function() {
        layer = new BubbleLayer(map, {
            dataSource: {
                data: []
            }
        });
    });

    test("re-draws symbols on reset", function() {
        layer.surface.draw = function() {
            ok(true);
        };

        map.trigger("reset");
    });

    test("re-draws all symbols on incremental change", function() {
        layer._load = function(data) {
            equal(data.length, 2);
        };

        layer.dataSource.add({});
    });

    baseLayerTests("Bubble Layer", BubbleLayer);
})();
