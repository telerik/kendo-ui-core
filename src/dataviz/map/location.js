(function(f, define){
    define([ "../../kendo.dataviz.core", "../util" ], f);
})(function(){

(function ($, undefined) {
    // Imports ================================================================
    var math = Math,
        abs = math.abs,
        atan = math.atan,
        atan2 = math.atan2,
        cos = math.cos,
        max = math.max,
        min = math.min,
        sin = math.sin,
        tan = math.tan,

        kendo = window.kendo,
        Class = kendo.Class,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,

        util = dataviz.util,
        defined = util.defined,
        rad = util.rad,
        round = util.round,
        sqr = util.sqr,
        valueOrDefault = util.valueOrDefault;

    // Implementation =========================================================
    var Location = Class.extend({
        init: function(lat, lng) {
            if (arguments.length === 1) {
                this.lat = lat[0];
                this.lng = lat[1];
            } else {
                this.lat = lat;
                this.lng = lng;
            }
        },

        FORMAT: "{0:N6},{1:N6}",

        toArray: function() {
            return [this.lat, this.lng];
        },

        equals: function(loc) {
            return loc && loc.lat === this.lat && loc.lng === this.lng;
        },

        clone: function() {
            return new Location(this.lat, this.lng);
        },

        round: function(precision) {
            this.lng = round(this.lng, precision);
            this.lat = round(this.lat, precision);
            return this;
        },

        wrap: function() {
            this.lng = this.lng % 180;
            this.lat = this.lat % 90;
            return this;
        },

        DISTANCE_ITERATIONS: 100,
        DISTANCE_CONVERGENCE: 1e-12,
        DISTANCE_PRECISION: 2,

        distanceTo: function(dest, datum) {
            return this.greatCircleTo(dest, datum).distance;
        },

        greatCircleTo: function(dest, datum) {
            dest = Location.create(dest);
            datum = datum || dataviz.map.datums.WGS84;

            if (!dest || this.clone().round(8).equals(dest.clone().round(8))) {
                return {
                    distance: 0,
                    azimuthFrom: 0,
                    azimuthTo: 0
                }
            }

            // See http://en.wikipedia.org/wiki/Vincenty's_formulae#Notation
            // o == sigma
            // A == alpha
            var a = datum.a;
            var b = datum.b;
            var f = datum.f;

            var L = rad(dest.lng - this.lng);

            var U1 = atan((1 - f) * tan(rad(this.lat)));
            var sinU1 = sin(U1);
            var cosU1 = cos(U1);

            var U2 = atan((1 - f) * tan(rad(dest.lat)));
            var sinU2 = sin(U2);
            var cosU2 = cos(U2);

            var lambda = L;
            var prevLambda;

            var i = this.DISTANCE_ITERATIONS;
            var converged = false;

            var sino;
            var cosA2;
            var coso;
            var cos2om;
            var sigma;

            while (!converged && i-- > 0) {
                var sinLambda = sin(lambda);
                var cosLambda = cos(lambda);
                sino = math.sqrt(
                    sqr(cosU2 * sinLambda) + sqr(cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
                );

                coso = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
                sigma = atan2(sino, coso);

                var sinA = cosU1 * cosU2 * sinLambda / sino;
                cosA2 = 1 - sqr(sinA);
                cos2om = 0;
                if (cosA2 !== 0) {
                    cos2om = coso - 2 * sinU1 * sinU2 / cosA2;
                }

                prevLambda = lambda;
                var C = f / 16 * cosA2 * (4 + f * (4 - 3 * cosA2));
                lambda = L + (1 - C) * f * sinA * (
                    sigma + C * sino * (cos2om + C * coso * (-1 + 2 * sqr(cos2om)))
                );

                converged = abs(lambda - prevLambda) <= this.DISTANCE_CONVERGENCE;
            }

            var u2 = cosA2 * (sqr(a) - sqr(b)) / sqr(b);
            var A = 1 + u2 / 16384 * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)));
            var B = u2 / 1024 * (256 + u2 * (-128 + u2 * (74 - 47 * u2)));
            var deltao = B * sino * (cos2om + B / 4 * (
                coso * (-1 + 2 * sqr(cos2om)) - B / 6 * cos2om * (-3 + 4 * sqr(sino)) * (-3 + 4 * sqr(cos2om))
            ));

            var azimuthFrom = atan2(cosU2 * sinLambda, cosU1 * sinU2 - sinU1 * cosU2 * cosLambda);
            var azimuthTo = atan2(cosU1 * sinLambda, -sinU1 * cosU2 + cosU1 * sinU2 * cosLambda);

            return {
                distance: round(b * A * (sigma - deltao), this.DISTANCE_PRECISION),
                azimuthFrom: util.deg(azimuthFrom),
                azimuthTo: util.deg(azimuthTo)
            };
        }
    });

    // IE < 9 doesn't allow to override toString on definition
    Location.fn.toString = function() {
        return kendo.format(this.FORMAT, this.lng, this.lat);
    };

    Location.fromLngLat = function(ll) {
        return new Location(ll[1], ll[0]);
    };

    Location.fromLatLng = function(ll) {
        return new Location(ll[0], ll[1]);
    };

    Location.create = function(a, b) {
        if (defined(a)) {
            if (a instanceof Location) {
                return a.clone();
            } else if (arguments.length === 1 && a.length === 2) {
                return Location.fromLatLng(a);
            } else {
                return new Location(a, b);
            }
        }
    };

    var Extent = Class.extend({
        init: function(nw, se) {
            nw = Location.create(nw);
            se = Location.create(se);

            if (nw.lng + 180 > se.lng + 180 &&
                nw.lat + 90 < se.lat + 90) {
                this.se = nw;
                this.nw = se;
            } else {
                this.se = se;
                this.nw = nw;
            }
        },

        contains: function(loc) {
            var nw = this.nw,
                se = this.se,
                lng = valueOrDefault(loc.lng, loc[1]),
                lat = valueOrDefault(loc.lat, loc[0]);

            return loc &&
                   lng + 180 >= nw.lng + 180 &&
                   lng + 180 <= se.lng + 180 &&
                   lat + 90 >= se.lat + 90 &&
                   lat + 90 <= nw.lat + 90;
        },

        center: function() {
            var nw = this.nw;
            var se = this.se;

            var lng = nw.lng + (se.lng - nw.lng) / 2;
            var lat = nw.lat + (se.lat - nw.lat) / 2;
            return new Location(lat, lng);
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
                lng = valueOrDefault(loc.lng, loc[1]),
                lat = valueOrDefault(loc.lat, loc[0]);

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

            return {nw: this.nw, ne: new Location(nw.lat, se.lng),
                    se: this.se, sw: new Location(nw.lng, se.lat)};
        },

        toArray: function() {
            var nw = this.nw,
                se = this.se;

            return [nw, new Location(nw.lat, se.lng),
                    se, new Location(nw.lng, se.lat)];
        },

        overlaps: function(extent) {
            return this.containsAny(extent.toArray()) ||
                   extent.containsAny(this.toArray());
        }
    });

    Extent.World = new Extent([90, -180], [-90, 180]);

    Extent.create = function(a, b) {
        if (a instanceof Extent) {
            return a;
        } else if (a && b) {
            return new Extent(a, b);
        } else if (a && a.length === 4 && !b) {
            return new Extent([a[0], a[1]], [a[2], a[3]]);
        }
    };

    // Exports ================================================================
    deepExtend(dataviz, {
        map: {
            Extent: Extent,
            Location: Location
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
