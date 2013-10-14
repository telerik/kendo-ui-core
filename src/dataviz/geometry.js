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

    // Geometrical primitives =================================================
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
            this[field] = value;
            this.trigger(CHANGE);
        },

        get: function(field) {
            return this[field];
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

        distanceTo: function(other) {
            var dx = this.x - other.x,
                dy = this.y - other.y;

            return math.sqrt(dx * dx + dy * dy);
        }
    });

    var Rect = Observable.extend({
        init: function(p0, p1) {
            var rect = this,
                change = function() {
                    rect.trigger(CHANGE);
                };

            rect.p0 = p0 || new Point();
            rect.p1 = p1 || new Point();

            rect.p0.bind(CHANGE, change);
            rect.p1.bind(CHANGE, change);

            Observable.fn.init.call(rect, this);
        },

        width: function() {
            return this.p1.x - this.p0.x;
        },

        height: function() {
            return this.p1.y - this.p0.y;
        }
    });

    var Circle = Observable.extend({
        init: function(center, radius) {
            var circle = this;

            circle.center = center || new Point();
            circle.radius = radius || 0;

            circle.center.bind(CHANGE, function() {
                circle.trigger(CHANGE);
            });

            Observable.fn.init.call(circle, this);
        },

        equals: function(other) {
            return  other &&
                    other.center.equals(this.center) &&
                    other.radius === this.radius;
        },

        clone: function() {
            var circle = this;

            return new Circle(circle.center.clone(), circle.radius);
        },

        set: function(field, value) {
            this[field] = value;
            this.trigger(CHANGE);
        },

        get: function(field) {
            return this[field];
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

    var Segment = Observable.extend({
        init: function(anchor, controlIn, controlOut) {
            var segment = this,
                change = function() {
                    segment.trigger(CHANGE);
                };

            segment.anchor = anchor || new Point();
            segment.controlIn = controlIn || new Point();
            segment.controlOut = controlOut || new Point();

            segment.anchor.bind(CHANGE, change);
            segment.controlIn.bind(CHANGE, change);
            segment.controlOut.bind(CHANGE, change);
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


    // Exports ================================================================
    deepExtend(dataviz, {
        Circle: Circle,
        Group: Group,
        Path: Path,
        Point: Point,
        Rect: Rect,
        Segment: Segment
    });

})(window.kendo.jQuery);
