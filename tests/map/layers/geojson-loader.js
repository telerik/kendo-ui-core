(function() {
    var dataviz = kendo.dataviz,
        g = dataviz.geometry,
        d = dataviz.drawing,

        map = dataviz.map,
        ShapeLayer = map.layers.ShapeLayer,
        Location = map.Location;

    var locator = {
        locationToView: function(loc) {
            return new g.Point(loc.lng, loc.lat);
        }
    };

    var style = {
        fill: {
            color: "red"
        },
        stroke: {
            color: "black"
        }
    };

    (function() {
        var loader;
        var item;
        var result;

        // ------------------------------------------------------------
        module("GeoJSON Loader / LineString", {
            setup: function() {
                loader = new map.GeoJSONLoader(locator, style);
                item = {
                    "type": "LineString",
                    "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
                };
                result = loader.parse(item);
            }
        });

        test("parsers to path", function() {
            ok(result instanceof d.Path);
        });

        test("does not set fill", function() {
            equal(result.options.fill, null);
        });

        test("triggers shapeCreated on observer", function() {
            loader.observer = {
                shapeCreated: function() {
                    ok(true);
                }
            };
            result = loader.parse(item);
        });

        test("cancelling shapeCreated does not add shape", function() {
            loader.observer = {
                shapeCreated: function(e) {
                    return true;
                }
            };

            result = loader.parse(item);
            ok(!result);
        });
    })();

    (function() {
        var loader;
        var item;
        var result;

        // ------------------------------------------------------------
        module("GeoJSON Loader / MultiLineString", {
            setup: function() {
                loader = new map.GeoJSONLoader(locator, style);
                item = { "type": "MultiLineString",
                    "coordinates": [
                        [ [100.0, 0.0], [101.0, 1.0] ],
                        [ [102.0, 2.0], [103.0, 3.0] ]
                    ]
                };
                result = loader.parse(item);
            }
        });

        test("parses to a group", function() {
            ok(result instanceof d.Group);
        });

        test("parses paths to child paths", function() {
            ok(result.children[0] instanceof d.Path);
            ok(result.children[1] instanceof d.Path);
            equal(result.children.length, 2);
        });

        test("triggers shapeCreated on observer", function() {
            loader.observer = {
                shapeCreated: function() {
                    ok(true);
                }
            };
            result = loader.parse(item);
        });

        test("cancelling shapeCreated does not add shape", function() {
            loader.observer = {
                shapeCreated: function(e) {
                    return true;
                }
            };
            result = loader.parse(item);

            ok(!result);
        });

        test("cancelling shapeCreated leaves second shape intact", function() {
            var i = 0;
            loader.observer = {
                shapeCreated: function(e) {
                    return i++ > 0;
                }
            };
            result = loader.parse(item);

            ok(result instanceof d.Path);
        });
    })();

    (function() {
        var loader;
        var item;
        var result;

        // ------------------------------------------------------------
        module("GeoJSON Loader / Polygon", {
            setup: function() {
                loader = new map.GeoJSONLoader(locator, style);
                item = {
                    "type": "Polygon",
                    "coordinates": [
                        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
                            [100.0, 1.0], [100.0, 0.0] ]
                    ]
                };
                result = loader.parse(item);
            }
        });

        test("parses to a path", function() {
            ok(result instanceof d.Path);
        });
    })();

    (function() {
        var loader;
        var item;
        var result;

        // ------------------------------------------------------------
        module("GeoJSON Loader / MultiPolygon", {
            setup: function() {
                loader = new map.GeoJSONLoader(locator, style);
                item = { "type": "MultiPolygon",
                    "coordinates": [
                        [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
                        [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]
                    ]
                };
                result = loader.parse(item);
            }
        });

        test("parses to a group", function() {
            ok(result instanceof d.Group);
        });

        test("parses polygons to child paths", function() {
            ok(result.children[0] instanceof d.Path);
            ok(result.children[1] instanceof d.Path);
            equal(result.children.length, 2);
        });
    })();

    (function() {
        var loader;
        var item;
        var result;

        // ------------------------------------------------------------
        module("GeoJSON Loader / Feature", {
            setup: function() {
                loader = new map.GeoJSONLoader(locator, style);
                item = { "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[
                            [-180.0, 10.0], [20.0, 90.0], [180.0, -5.0], [-30.0, -90.0]
                        ]]
                    }
                };
                result = loader.parse(item);
            }
        });

        test("parses to a path", function() {
            ok(result instanceof d.Path);
        });
    })();

    (function() {
        var ds;
        var gc = {
            "type": "GeometryCollection",
            "geometries": [{
                "type": "Polygon",
                "coordinates": [
                    [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
                        [100.0, 1.0], [100.0, 0.0] ]
                ]
            }, {
                "type": "Polygon",
                "coordinates": [
                    [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
                        [100.0, 1.0], [100.0, 0.0] ]
                ]
            }]
        };

        // ------------------------------------------------------------
        module("GeoJSON Data Source / Geometry Collection", {
            setup: function() {
                ds = new kendo.data.DataSource({
                    type: "geojson",
                    transport: {
                        read: function(opt) { opt.success(gc); }
                    }
                });

                ds.read();
            }
        });

        test("splits geometries", function() {
            equal(ds.view().length, 2);
        });
    })();

    (function() {
        var ds;
        var gc = {
            "type": "FeatureCollection",
            "features": [
                {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -80.87088507656375,
                        35.21515162500578
                    ]
                },
                "properties": {
                    "name": "ABBOTT NEIGHBORHOOD PARK",
                    "address": "1300  SPRUCE ST"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -80.83775386582222,
                        35.24980190252168
                    ]
                },
                "properties": {
                    "name": "DOUBLE OAKS CENTER",
                    "address": "1326 WOODWARD AV"
                }
            }]
        };

        // ------------------------------------------------------------
        module("GeoJSON Data Source / Feature Collection", {
            setup: function() {
                ds = new kendo.data.DataSource({
                    type: "geojson",
                    transport: {
                        read: function(opt) { opt.success(gc); }
                    }
                });

                ds.read();
            }
        });

        test("splits features", function() {
            equal(ds.view().length, 2);
        });
    })();

    (function() {
        var loader;
        var item;
        var result;

        // ------------------------------------------------------------
        module("GeoJSON Loader / Point", {
            setup: function() {
                loader = new map.GeoJSONLoader(locator, style);
                item = {
                    "type": "Point",
                    "coordinates": [-105.01621, 39.57422]
                };
            }
        });

        test("parses to a circle", function() {
            result = loader.parse(item);
            ok(result instanceof d.Circle);
        });

        test("default radius", function() {
            result = loader.parse(item);
            equal(result.geometry.radius, 10);
        });

        test("default style", function() {
            result = loader.parse(item);
            equal(result.options.fill.color, "red");
        });

        test("triggers shapeCreated on observer", function() {
            loader.observer = {
                shapeCreated: function() {
                    ok(true);
                }
            };

            result = loader.parse(item);
        });

        test("cancelling shapeCreated does not add shape", function() {
            loader.observer = {
                shapeCreated: function(e) {
                    return true;
                }
            };

            result = loader.parse(item);

            ok(!result);
        });
    })();

    (function() {
        var loader;
        var item;
        var result;

        // ------------------------------------------------------------
        module("GeoJSON Loader / MultiPoint", {
            setup: function() {
                loader = new map.GeoJSONLoader(locator, style);
                item = {
                    "type": "MultiPoint",
                    "coordinates": [
                        [-105.01621, 39.57422],
                        [-80.6665134, 35.0539943]
                    ]
                };
                result = loader.parse(item);
            }
        });

        test("parses to a group", function() {
            ok(result instanceof d.Group);
        });

        test("parses points to child circles", function() {
            ok(result.children[0] instanceof d.Circle);
            ok(result.children[1] instanceof d.Circle);
            equal(result.children.length, 2);
        });

        test("triggers shapeCreated on observer", 2, function() {
            loader.observer = {
                shapeCreated: function() {
                    ok(true);
                }
            };

            result = loader.parse(item);
        });

        test("cancelling shapeCreated does not add shape", function() {
            loader.observer = {
                shapeCreated: function(e) {
                    return true;
                }
            };
            result = loader.parse(item);

            ok(!result);
        });

        test("cancelling shapeCreated leaves second shape intact", function() {
            var i = 0;
            loader.observer = {
                shapeCreated: function(e) {
                    return i++ > 0;
                }
            };
            result = loader.parse(item);

            ok(result instanceof d.Circle);
        });
    })();
})();
