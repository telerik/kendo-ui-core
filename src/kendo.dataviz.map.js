kendo_module({
    id: "dataviz.map",
    name: "Map",
    category: "dataviz",
    description: "",
    depends: [ "data", "userevents", "dataviz.core", "dataviz.svg", "dataviz.themes" ]
});

(function ($, undefined) {
    // Imports ================================================================
    var math = Math,
        PI = math.PI,

        kend = window.kendo,
        Class = kendo.Class,
        Widget = kendo.ui.Widget,

        dataviz = kendo.dataviz,
        Point = dataviz.Point2D,
        deepExtend = kendo.deepExtend,
        limit = dataviz.limitValue;

    // Constants ==============================================================
    var DEG_TO_RAD = math.PI / 180,
        PI = math.PI,
        PI_DIV_2 = PI / 2,
        PI_DIV_4 = PI / 4;

    // Map ====================================================================
    var Map = Widget.extend({
        init: function(element, options) {
        },

        options: {
            name: "Map"
        }
    });

    var GeoPoint = function(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    };

    var WGS84Datum = {
        a: 6378137,                 // Semi-major radius
        b: 6356752.314245179,       // Semi-minor radius
        f: 0.0033528106647474805,   // Flattening
        e: 0.08181919084262149      // Eccentricity
    }

    // Used by EPSG:3857
    var SphericalMercator = {
        MAX_LONG: 180,
        MAX_LAT: 85.0511287798,

        project: function(ll) {
            var proj = this,
                lat = limit(ll.lat, -proj.MAX_LAT, proj.MAX_LAT),
                lng = limit(ll.lng, -proj.MAX_LONG, proj.MAX_LONG),
                x = lng * DEG_TO_RAD,
                y = math.log(math.tan(PI_DIV_4 + (ll.lat * DEG_TO_RAD) / 2));

            return new Point(x, y);
        }
    };

    // Used by EPSG:3395
    var Mercator = Class.extend({
        init: function(options) {
        },

        MAX_LONG: 180,
        MAX_LAT: 85.0840590501,
        REVERSE_ITERATIONS: 15,
        REVERSE_CONVERGENCE: 1e-12,

        options: {
            datum: WGS84Datum
        },

        // See:
        // http://en.wikipedia.org/wiki/Mercator_projection#Generalization_to_the_ellipsoid
        project: function(ll) {
            var proj = this,
                datum = proj.options.datum,
                lat = limit(ll.lat, -proj.MAX_LAT, proj.MAX_LAT),
                lng = limit(ll.lng, -proj.MAX_LONG, proj.MAX_LONG),
                x = lng * DEG_TO_RAD * datum.a,
                y = lat * DEG_TO_RAD,
                con = datum.e * math.sin(y);

            con = math.pow((1 - con) / (1 + con), datum.e / 2);
            var ts = math.tan((PI / 2 - y) / 2) / con;
            y = -datum.a * math.log(ts);

            return new Point(x, y);
        },

        reverse: function(point) {
            var datum = this.options.datum,
                ecc = datum.e,
                ecch = ecc / 2,
                lng = point.x / (DEG_TO_RAD * datum.a),
                ts = math.exp(-point.y / datum.a),
                phi = PI_DIV_2 - 2 * math.atan(ts),
                i,
                limit = Mercator.fn.REVERSE_ITERATIONS,
                dphi;

            for (i = 0; i <= limit; i++) {
                var con = ecc * math.sin(phi);
                dphi = PI_DIV_2 - 2 * math.atan(ts * math.pow((1 - con) / (1 + con), ecch)) - phi;
                phi += dphi;

                if (math.abs(dphi) <= Mercator.fn.REVERSE_CONVERGENCE) {
                    break;
                }
            }

            return new GeoPoint(phi / DEG_TO_RAD, lng);
        }
    });

    function radians(degrees) {
        return degrees * DEG_TO_RAD;
    }

    function degrees(radians) {
        return radians / DEG_TO_RAD;
    }

    // Exports ================================================================
    dataviz.ui.plugin(Map);

    deepExtend(dataviz, {
        spatial: {
            projections: {
                Mercator: Mercator,
                SphericalMercator: SphericalMercator,

                WGS84Datum: WGS84Datum
            },

            GeoPoint: GeoPoint
        }
    });

})(window.kendo.jQuery);
