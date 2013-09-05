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
        deepExtend = kendo.deepExtend,
        limit = dataviz.limitValue;

    // Constants ==============================================================
    var DEG_TO_RAD = math.PI / 180,
        PI = math.PI;

    // Map ====================================================================
    var Map = Widget.extend({
        init: function(element, options) {
        },

        options: {
            name: "Map"
        }
    });

    var GeoJSONLayer = Class.extend({

    });

    var Point = function(x, y) {
        this.x = x;
        this.y = y;
    };

    var LatLong = function(lat, long) {
        this.lat = lat;
        this.long = long;
    };

    LatLong.prototype = {

    };

    var WGS84 = {
        A: 6378137,
        B: 6356752.314245179,
        E: 0.08181919084262157
    };

    var Mercator = {
        MAX_LONG: 180,
        MAX_LAT: 85.0840590501,

        DATUM: WGS84,

        project: function(geo) {
            var proj = this,
                d = proj.DATUM,
                lat = limit(geo.lat, -proj.MAX_LAT, proj.MAX_LAT),
                long = limit(geo.long, -proj.MAX_LONG, proj.MAX_LONG),
                x = long * DEG_TO_RAD * d.A,
                y = lat * DEG_TO_RAD,
                con = d.E * math.sin(y);

            con = math.pow((1 - con) / (1 + con), d.E / 2);
            var ts = math.tan((PI / 2 - y) / 2) / con;
            y = -d.A * math.log(ts);

            return new Point(x, y);
        }
    };

    // Exports ================================================================
    dataviz.ui.plugin(Map);

    deepExtend(dataviz, {
        spatial: {
            projections: {
                Mercator: Mercator
            },

            LatLong: LatLong
        }
    });

})(window.kendo.jQuery);
