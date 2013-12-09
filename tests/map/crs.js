(function() {
    var TOLERANCE = 1e-9;

    var dataviz = kendo.dataviz,
        Point = dataviz.Point2D,

        map = dataviz.map,
        Location = map.Location;

    function toPoint(crs, loc, point, scale) {
        var scale = scale || 1;
        var p = crs.toPoint(loc, scale);
        close(p.x, point.x * scale, TOLERANCE, "X");
        close(p.y, point.y * scale, TOLERANCE, "Y");
    }

    function toLocation(crs, point, scale) {
        var l = crs.toLocation(point, scale);
        var p = crs.toPoint(l, scale);
        scale = scale || 1;
        close(p.x, point.x, TOLERANCE, "X");
        close(p.y, point.y, TOLERANCE, "Y");
    }

    (function() {

        // [[LAT, LONG], [Screen X, Screen Y]]
        // Top left is [0, 0], bottom right is [1, 1]
        var identities = [
                // Center
                [[0, 0], [0.5, 0.5]],

                // NE corner
                [[90, 180],
                 [1, 0]],

                // SW corner
                [[-90, -180],
                 [0, 1]],

                // Test points
                [[42.7175, 24.916667],
                 [0.5692129638889, 0.368519809132]],

                [[51.93711703, 80.1123046875],
                 [0.7225341796875, 0.330598613682]],

                [[52.4827802220782, -5.625],
                 [0.484375, 0.328125]],

                // Longitude out of bounds
                [[-90, -360],
                 [-0.5, 1]]
            ];

        var crs;

        // ------------------------------------------------------------
        module("EPSG3857", {
            setup: function() {
                crs = new map.crs.EPSG3857();
            }
        });

        test("toPoint projects location", function() {
            $.each(identities, function() {
                var point = this[1];

                toPoint(crs,
                    Location.fromLatLng(this[0]),
                    new Point(point[0], point[1]));
            });
        });

        test("toPoint projects location at scale", function() {
            $.each(identities, function() {
                var point = this[1];

                toPoint(crs,
                    Location.fromLatLng(this[0]),
                    new Point(point[0], point[1]),
                    1000);
            });
        });

        test("toPoint clamps location longitude", function() {
            var loc = new Location(0, -360);
            var point = crs.toPoint(loc, 1, true);

            close(point.x, 0, TOLERANCE);
        });

        test("toLocation maps screen coordinates", function() {
            $.each(identities, function() {
                var point = this[1];

                toLocation(crs, new Point(point[0], point[1]));
            });
        });

        test("toLocation maps screen coordinates at scale", function() {
            $.each(identities, function() {
                var point = this[1];

                toLocation(crs,
                    new Point(point[0], point[1]),
                    1000);
            });
        });

        test("toLocation clamps x", function() {
            var point = new Point(-0.5, 0);
            var loc = crs.toLocation(point, 1, true);

            equal(loc.lng, -180);
        });

    })();
})();
