(function() {
    var TOLERANCE = 1e-6;

    var dataviz = kendo.dataviz,
        Point = dataviz.Point2D,

        map = dataviz.map,
        Extent = map.Extent,
        Location = map.Location;

    (function() {
        var loc;

        // ------------------------------------------------------------
        module("Location", {
            setup: function() {
                loc = new Location(51.9371170300465, 80.11230468750001);
            }
        });

        test("toString format is lng, lat", function() {
            equal(loc.toString(), "80.112305,51.937117");
        });

        test("toArray returns lat, lng array", function() {
            deepEqual(loc.toArray(), [51.9371170300465, 80.11230468750001]);
        });

        test("equals fails with different latitude", function() {
            ok(!new Location(10, 20).equals(new Location(11, 20)));
        });

        test("equals fails with different longitude", function() {
            ok(!new Location(10, 20).equals(new Location(10, 21)));
        });

        test("equals succeeds", function() {
            ok(new Location(10, 20).equals(new Location(10, 20)));
        });

        test("init from lat, lng array", function() {
            ok(Location.fromLatLng([10, 20]).equals(new Location(10, 20)));
        });

        test("init from lng, lat array", function() {
            ok(Location.fromLngLat([10, 20]).equals(new Location(20, 10)));
        });

        test("create from lng, lat", function() {
            ok(Location.create(10, 20).equals(new Location(10, 20)));
        });

        test("create from lng, lat array", function() {
            ok(Location.create([10, 20]).equals(new Location(10, 20)));
        });

        test("create from Location", function() {
            ok(Location.create(new Location(10, 20)).equals(new Location(10, 20)));
        });

        test("create from Location clones instance", function() {
            var loc = new Location(10, 20);
            ok(Location.create(loc) !== loc);
        });

        test("create from undefined", function() {
            equal(Location.create(undefined), undefined);
        });

        test("round rounds lng", function() {
            loc.lng = 5.5;
            loc.round();

            equal(loc.lng, 6);
        });

        test("round rounds lng to precision", function() {
            loc.lng = 5.151;
            loc.round(2);

            equal(loc.lng, 5.15);
        });

        test("round rounds lat", function() {
            loc.lat = 5.5;
            loc.round();

            equal(loc.lat, 6);
        });

        test("round rounds lat to precision", function() {
            loc.lat = 5.151;
            loc.round(2);

            equal(loc.lat, 5.15);
        });

        test("round returns location", function() {
            deepEqual(loc.round(), loc);
        });

        test("wrap wraps lng", function() {
            loc.lng = 200;
            loc.wrap();

            equal(loc.lng, 20);
        });

        test("wrap wraps negative lng", function() {
            loc.lng = -200;
            loc.wrap();

            equal(loc.lng, -20);
        });

        test("wrap wraps lat", function() {
            loc.lat = 100;
            loc.wrap();

            equal(loc.lat, 10);
        });

        test("wrap wraps negative lat", function() {
            loc.lat = -100;
            loc.wrap();

            equal(loc.lat, -10);
        });

        test("wrap returns location", function() {
            deepEqual(loc.wrap(), loc);
        });

        test("clone copies location", function() {
            deepEqual(loc.toArray(), loc.clone().toArray());
        });

        test("clone returns copy", function() {
            ok(loc !== loc.clone());
        });
    })();

    (function() {
        var extent;

        // ------------------------------------------------------------
        module("Extent", {
            setup: function() {
                extent = new Extent(
                    new Location(45, -90),
                    new Location(-45, 90)
                );
            }
        });

        test("contains for negative longitude", function() {
            ok(extent.contains(new Location(0, -89)));
        });

        test("contains for positive longitude", function() {
            ok(extent.contains(new Location(0, 89)));
        });

        test("contains for negative latitude", function() {
            ok(extent.contains(new Location(-44, 0)));
        });

        test("contains for positive latitude", function() {
            ok(extent.contains(new Location(44, 0)));
        });

        test("does not contain for negative longitude", function() {
            ok(!extent.contains(new Location(0, -91)));
        });

        test("does not contain for positive longitude", function() {
            ok(!extent.contains(new Location(0, 91)));
        });

        test("does not contain for negative latitude", function() {
            ok(!extent.contains(new Location(-46, 0)));
        });

        test("does not contain for positive latitude", function() {
            ok(!extent.contains(new Location(46, 0)));
        });

        test("contains location on longitude limit", function() {
            ok(extent.contains(new Location(0, 90)));
        });

        test("contains location on latitude limit", function() {
            ok(extent.contains(new Location(45, 0)));
        });

        test("contains with array", function() {
            ok(extent.contains([-89, 0]));
        });

        test("does not contain with array", function() {
            ok(!extent.contains([-91, 0]));
        });

        test("containsAny with one matching and one non-matching", function() {
            ok(extent.containsAny([
                new Location(0, -89), new Location(0, -91)
            ]));
        });

        test("containsAny with two matching", function() {
            ok(extent.containsAny([
                new Location(0, -89), new Location(0, 89)
            ]));
        });

        test("containsAny with two non-matching", function() {
            ok(!extent.containsAny([
                new Location(0, -91), new Location(0, 91)
            ]));
        });

        // ------------------------------------------------------------
        module("Extent / User units", {
            setup: function() {
                extent = new Extent(
                    new Location(500, -500),
                    new Location(-500, 500)
                );
            }
        });

        test("contains point with negative x", function() {
            ok(extent.contains(new Location(0, -400)));
        });

        test("contains point with positive x", function() {
            ok(extent.contains(new Location(0, 400)));
        });

        test("contains point with negative y", function() {
            ok(extent.contains(new Location(-400, 0)));
        });

        test("contains point with positive y", function() {
            ok(extent.contains(new Location(400, 0)));
        });

        test("does not contain point with negative x", function() {
            ok(!extent.contains(new Location(0, -600)));
        });

        test("does not contain with positive x", function() {
            ok(!extent.contains(new Location(0, 600)));
        });

        test("does not contain with negative y", function() {
            ok(!extent.contains(new Location(-600, 0)));
        });

        test("does not contain with positive y", function() {
            ok(!extent.contains(new Location(600, 0)));
        });

        // ------------------------------------------------------------
        module("Extent / include", {
            setup: function() {
                extent = new Extent(
                    new Location(0, 0),
                    new Location(0, 0)
                );
            }
        });

        test("extends nw edge to negative longitude", function() {
            extent.include(new Location(0, -100));
            equal(extent.nw.lng, -100);
        });

        test("extends nw edge to positive latitude", function() {
            extent.include(new Location(45, 0));
            equal(extent.nw.lat, 45);
        });

        test("does not extends nw edge beyond sw latitude", function() {
            extent.include(new Location(-45, 0));
            equal(extent.nw.lat, 0);
        });

        test("does not extends nw edge beyond sw longitude", function() {
            extent.include(new Location(0, 100));
            equal(extent.nw.lng, 0);
        });

        test("extends se edge to positive longitude", function() {
            extent.include(new Location(0, 100));
            equal(extent.se.lng, 100);
        });

        test("extends se edge to negative latitude", function() {
            extent.include(new Location(-45, 0));
            equal(extent.se.lat, -45);
        });

        test("does not extends se edge beyond nw latitude", function() {
            extent.include(new Location(45, 0));
            equal(extent.se.lat, 0);
        });

        test("does not extends se edge beyond nw longitude", function() {
            extent.include(new Location(0, -100));
            equal(extent.se.lng, 0);
        });

        test("include accepts lng, lat array", function() {
            extent.include([10, 10]);
            equal(extent.nw.lat, 10);
            equal(extent.se.lng, 10);
        });

        test("includeAll includes all locations", function() {
            extent.includeAll([
                new Location(10, -10),
                new Location(-10, 10)
            ]);

            ok(extent.nw.equals(new Location(10, -10)));
            ok(extent.se.equals(new Location(-10, 10)));
        });

        test("includeAll accepts lng, lat arrays", function() {
            extent.includeAll([
                [10, 10],
                [-10, -10]
            ]);

            ok(extent.nw.equals(new Location(10, -10)));
            ok(extent.se.equals(new Location(-10, 10)));
        });

        // ------------------------------------------------------------
        module("Extent / overlaps", {
            setup: function() {
                extent = new Extent(
                    new Location(10, -10),
                    new Location(-10, 10)
                );
            }
        });

        test("overlaps at nw edge", function() {
            ok(extent.overlaps(new Extent(
                new Location(20, 20),
                new Location(-10, 10)
            )))
        });

        test("overlaps at se edge", function() {
            ok(extent.overlaps(new Extent(
                new Location(-10, 10),
                new Location(-20, 20)
            )))
        });

        test("overlaps within", function() {
            ok(extent.overlaps(new Extent(
                new Location(5, -5),
                new Location(-5, 5)
            )))
        });

        test("overlaps around", function() {
            ok(extent.overlaps(new Extent(
                new Location(50, -50),
                new Location(-50, 50)
            )))
        });

        test("overlaps implicit edge", function() {
            ok(extent.overlaps(new Extent(
                new Location(20, 5),
                new Location(5, 20)
            )));
        });

        test("does not overlap west", function() {
            ok(!extent.overlaps(new Extent(
                new Location(-100, 20),
                new Location(-20, 10)
            )))
        });

        test("does not overlap east", function() {
            ok(!extent.overlaps(new Extent(
                new Location(100, 20),
                new Location(20, 10)
            )))
        });

        test("does not overlap north", function() {
            ok(!extent.overlaps(new Extent(
                new Location(90, -10),
                new Location(20, 10)
            )))
        });

        test("does not overlap south", function() {
            ok(!extent.overlaps(new Extent(
                new Location(20, -10),
                new Location(90, 10)
            )))
        });

    })();
})();
