(function () {

    // Constants ==============================================================
    var CHANGE = "change";

    // Imports ================================================================
    var math = Math,

        kendo = window.kendo,
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        append = dataviz.append,

        util = dataviz.util,
        rad = util.rad;

    // Graphical primitives ===================================================
    var Group = ObservableObject.extend({
        init: function() {
            this.children = [];
            this.options = {};
            ObservableObject.fn.init.call(this, this);
        },

        append: function() {
            append(this.children, arguments);
        }
        // traverse
        // etc.
    });

    var Point = Observable.extend({
        init: function(x, y) {
            var point = this;

            point.x = x || 0;
            point.y = y || 0;

            Observable.fn.init.call(point, this);
        },

        equals: function(point) {
            return point && point.x === this.x && point.y === this.y;
        },

        clone: function() {
            var point = this;

            return new Point(point.x, point.y);
        },

        set: function(field, value) {
            if (field === "x") {
                this.x = value;
            } else {
                this.y = value;
            }
        },

        get: function(field) {
            return field === "x" ? this.x : this.y;
        },

        rotate: function(center, degrees) {
            var point = this,
                theta = rad(degrees),
                cosT = math.cos(theta),
                sinT = math.sin(theta),
                cx = center.x,
                cy = center.y,
                x = point.x,
                y = point.y;

            point.x = cx + (x - cx) * cosT + (y - cy) * sinT;
            point.y = cy + (y - cy) * cosT - (x - cx) * sinT;

            point.trigger(CHANGE);

            return point;
        },

        multiply: function(a) {
            var point = this;

            point.x *= a;
            point.y *= a;

            point.trigger(CHANGE);

            return point;
        },

        transform: function(mx) {
            var point = this;

            point.x = mx.a * point.x + mx.c * point.y + mx.e;
            point.y = mx.b * point.x + mx.d * point.y + mx.f;

            point.trigger(CHANGE);

            return point;
        },

        distanceTo: function(point) {
            var dx = this.x - point.x,
                dy = this.y - point.y;

            return math.sqrt(dx * dx + dy * dy);
        }
    });

    var Path = ObservableObject.extend({
        init: function(points, options) {
            var path = this;

            path.points = points || [];
            path.options = options || {};

            ObservableObject.fn.init.call(path, this);
        }
    });


    // Exports ================================================================
    deepExtend(dataviz, {
        Group: Group,
        Path: Path,
        Point: Point
    });

})(window.kendo.jQuery);
