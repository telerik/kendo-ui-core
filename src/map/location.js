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
        max = math.max,
        min = math.min,

        kendo = window.kendo,
        Class = kendo.Class,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,

        util = dataviz.util,
        valueOrDefault = util.valueOrDefault;

    // Implementation =========================================================
    var Location = function(lat, lng) {
        if (arguments.length === 1) {
            this.lat = lat[0];
            this.lng = lat[1];
        } else {
            this.lat = lat;
            this.lng = lng;
        }
    };

    Location.prototype = {
        FORMAT: "{0:N6},{1:N6}",

        toString: function() {
            return kendo.format(this.FORMAT, this.lng, this.lat);
        },

        equals: function(loc) {
            return loc && loc.lat === this.lat && loc.lng === this.lng;
        }
    };

    Location.fromLngLat = function(ll) {
        return new Location(ll[1], ll[0]);
    };

    Location.fromLatLng = function(ll) {
        return new Location(ll[0], ll[1]);
    };

    Location.create = function(arg0, arg1) {
        if (arg0 instanceof Location) {
            return arg0;
        } else if (arguments.length === 1 && arg0.length === 2) {
            return Location.fromLatLng(arg0);
        } else {
            return new Location(arg0, arg1);
        }
    };

    var Extent = Class.extend({
        init: function(nw, se) {
            this.nw = nw;
            this.se = se;
        },

        contains: function(loc) {
            var nw = this.nw,
                se = this.se,
                lng = valueOrDefault(loc.lng, loc[0]),
                lat = valueOrDefault(loc.lat, loc[1]);

            return loc &&
                   lng + 180 >= nw.lng + 180 &&
                   lng + 180 <= se.lng + 180 &&
                   lat + 90 >= se.lat + 90 &&
                   lat + 90 <= nw.lat + 90;
        },

        containsAny: function(locs) {
            var result = false;
            for (var i = 0; i < locs.length; i++) {
                result = result || this.contains(locs[i]);
            }

            return result;
        },

        include: function(loc) {
            var nw = this.nw,
                se = this.se,
                lng = valueOrDefault(loc.lng, loc[0]),
                lat = valueOrDefault(loc.lat, loc[1]);

            nw.lng = min(nw.lng, lng);
            nw.lat = max(nw.lat, lat);

            se.lng = max(se.lng, lng);
            se.lat = min(se.lat, lat);
        },

        includeAll: function(locs) {
            for (var i = 0; i < locs.length; i++) {
                this.include(locs[i]);
            }
        },

        edges: function() {
            var nw = this.nw,
                se = this.se;

            return [nw, new Location(nw.lat, se.lng),
                    se, new Location(nw.lng, se.lat)];
        },

        overlaps: function(extent) {
            return this.containsAny(extent.edges()) ||
                   extent.containsAny(this.edges());
        }
    });

    // Exports ================================================================
    deepExtend(dataviz, {
        map: {
            Extent: Extent,
            Location: Location
        }
    });

})(window.kendo.jQuery);
