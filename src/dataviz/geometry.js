(function () {

    // Imports ================================================================
    var math = Math,
        noop = $.noop,

        kendo = window.kendo,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        util = dataviz.util,
        rad = util.rad;

    // Geometrical primitives =================================================
    var Point = Class.extend({
        init: function(x, y) {
            this.x = x || 0;
            this.y = y || 0;

            this.observer = null;
        },

        geometryChange: util.mixins.geometryChange,

        set: function(field, value) {
            this[field] = value;
            this.geometryChange();
        },

        get: function(field) {
            return this[field];
        },

        equals: function(point) {
            return point && point.x === this.x && point.y === this.y;
        },

        toString: function() {
            return this.x + " " + this.y;
        },

        clone: function() {
            return new Point(this.x, this.y);
        },

        rotate: function(center, degrees) {
            var theta = rad(degrees);
            var cosT = math.cos(theta);
            var sinT = math.sin(theta);
            var cx = center.x;
            var cy = center.y;
            var x = this.x;
            var y = this.y;

            this.x = cx + (x - cx) * cosT + (y - cy) * sinT;
            this.y = cy + (y - cy) * cosT - (x - cx) * sinT;

            this.geometryChange();

            return this;
        },

        multiply: function(a) {
            this.x *= a;
            this.y *= a;

            this.geometryChange();

            return this;
        },

        transform: function(mx) {
            this.x = mx.a * this.x + mx.c * this.y + mx.e;
            this.y = mx.b * this.x + mx.d * this.y + mx.f;

            this.geometryChange();

            return this;
        },

        distanceTo: function(other) {
            var dx = this.x - other.x;
            var dy = this.y - other.y;

            return math.sqrt(dx * dx + dy * dy);
        }
    });

    var Rect = Class.extend({
        init: function(p0, p1) {
            this.p0 = p0 || new Point();
            this.p1 = p1 || new Point();

            this.observer = null;
            this.p0.observer = this;
            this.p1.observer = this;
        },

        geometryChange: util.mixins.geometryChange,

        width: function() {
            return this.p1.x - this.p0.x;
        },

        height: function() {
            return this.p1.y - this.p0.y;
        }
    });

    var Circle = Class.extend({
        init: function(center, radius) {
            this.center = center || new Point();
            this.radius = radius || 0;

            this.observer = null;
            this.center.observer = this;
        },

        geometryChange: util.mixins.geometryChange,

        equals: function(other) {
            return  other &&
                    other.center.equals(this.center) &&
                    other.radius === this.radius;
        },

        clone: function() {
            return new Circle(this.center.clone(), this.radius);
        },

        set: function(field, value) {
            this.radius = value;
            this.geometryChange();
        },

        get: function(field) {
            return this.radius;
        },

        pointAt: function(angle) {
            var c = this.center,
                r = this.radius,
                a = rad(angle);

            return new Point(
                c.x - r * math.cos(a),
                c.y - r * math.sin(a)
            );
        }
    });

    // Exports ================================================================
    deepExtend(dataviz, {
        geometry: {
            Circle: Circle,
            Point: Point,
            Rect: Rect
        }
    });

})(window.kendo.jQuery);
