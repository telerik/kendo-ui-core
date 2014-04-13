(function(f, define){
    define([ "./util" ], f);
})(function(){

(function () {

    // Imports ================================================================
    var math = Math,
        inArray = $.inArray,

        kendo = window.kendo,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        util = dataviz.util,
        defined = util.defined,
        rad = util.rad,
        deg = util.deg,
        round = util.round;

    // Geometrical primitives =================================================
    var Point = Class.extend({
        init: function(x, y) {
            this.x = x || 0;
            this.y = y || 0;

            this.observer = null;
        },

        geometryChange: util.mixins.geometryChange,

        set: function(field, value) {
            if (field === "x") {
                if (this.x !== value) {
                    this.x = value;
                    this.geometryChange();
                }
            } else if (field === "y") {
                if (this.y !== value) {
                    this.y = value;
                    this.geometryChange();
                }
            }

            return this;
        },

        get: function(field) {
            if (field === "x") {
                return this.x;
            } else if (field === "y") {
                return this.y;
            }
        },

        equals: function(point) {
            return point && point.x === this.x && point.y === this.y;
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

        multiplyInto: function(a) {
            return new Point(this.x * a, this.y * a);
        },

        transform: function(mx) {
            var x = this.x,
                y = this.y;
            this.x = mx.a * x + mx.c * y + mx.e;
            this.y = mx.b * x + mx.d * y + mx.f;

            this.geometryChange();

            return this;
        },

        transformInto: function(mx) {
            var point = this.clone();
            if (mx) {
                point.transform(mx);
            }
            return point;
        },

        add: function(other) {
            this.x += other.x;
            this.y += other.y;

            return this;
        },

        subtract: function(other) {
            this.x -= other.x;
            this.y -= other.y;

            return this;
        },

        distanceTo: function(other) {
            var dx = this.x - other.x;
            var dy = this.y - other.y;

            return math.sqrt(dx * dx + dy * dy);
        },

        round: function(precision) {
            this.x = round(this.x, precision);
            this.y = round(this.y, precision);
            return this;
        },

        min: function(point) {
            return new Point(math.min(this.x, point.x), math.min(this.y, point.y));
        },

        max: function(point) {
            return new Point(math.max(this.x, point.x), math.max(this.y, point.y));
        }
    });

    // IE < 9 doesn't allow to override toString on definition
    Point.fn.toString = function(precision, separator) {
        var x = this.x,
            y = this.y;

        if (defined(precision)) {
            x = round(x, precision);
            y = round(y, precision);
        }

        separator = separator || " ";
        return x + separator + y;
    };

    Point.create = function(arg0, arg1) {
        if (defined(arg0)) {
            if (arg0 instanceof Point) {
                return arg0.clone();
            } else if (arguments.length === 1 && arg0.length === 2) {
                return new Point(arg0[0], arg0[1]);
            } else {
                return new Point(arg0, arg1);
            }
        }
    };

    Point.minPoint = function() {
        return new Point(-Number.MAX_VALUE, -Number.MAX_VALUE);
    };

    Point.maxPoint = function() {
        return new Point(Number.MAX_VALUE, Number.MAX_VALUE);
    };

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
        },

        wrap: function(targetRect) {
            return new Rect(this.p0.min(targetRect.p0), this.p1.max(targetRect.p1));
        },

        center: function() {
            return new Point(this.p0.x  + this.width() / 2, this.p0.y  + this.height() / 2);
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
            if (field === "radius" && this.radius !== value) {
                this.radius = value;
                this.geometryChange();
            }
        },

        get: function() {
            return this.radius;
        },

        pointAt: function(angle) {
            return this._pointAt(rad(angle));
        },

        bBox: function(matrix) {
            var minPoint = Point.maxPoint(),
                maxPoint = Point.minPoint(),
                extremeAngles = ellipseExtremeAngles(this.center, this.radius, this.radius, matrix),
                halfPI = (math.PI / 2),
                currentPoint, currentPointX, currentPointY,
                i;
            for (i = 0; i < 4; i++) {
                currentPointX = this._pointAt(extremeAngles.x + i * halfPI).transformInto(matrix);
                currentPointY = this._pointAt(extremeAngles.y + i * halfPI).transformInto(matrix);
                currentPoint = new Point(currentPointX.x, currentPointY.y);
                minPoint = minPoint.min(currentPoint);
                maxPoint = maxPoint.max(currentPoint);
            }

            return new Rect(minPoint, maxPoint);
        },

        _pointAt: function(angle) {
            var c = this.center,
                r = this.radius;

            return new Point(
                c.x - r * math.cos(angle),
                c.y - r * math.sin(angle)
                );
        }
    });

    var Arc = Class.extend({
        MAX_INTERVAL: 90,
        _fields: ["radiusX", "radiusY", "startAngle", "endAngle", "counterClockwise"],

        init: function(center, options) {
            var arc = this;

            arc.center = center;
            arc.observer = null;
            arc.center.observer = arc;

            options = options || {};
            arc.radiusX = options.radiusX;
            arc.radiusY = options.radiusY || options.radiusX;
            arc.startAngle = options.startAngle;
            arc.endAngle = options.endAngle;
            arc.counterClockwise = options.counterClockwise || false;
        },

        geometryChange: util.mixins.geometryChange,

        get: function(field) {
            return this[field];
        },

        set: function(field, value) {
            var arc = this;
            if ($.inArray(field, arc._fields) !== -1 && arc[field] !== value) {
                arc[field] = value;
                arc.geometryChange();
            }
        },

        pointAt: function(angle) {
            var arc = this,
                center = this.center,
                radian = rad(angle),
                point = new Point(center.x + arc.radiusX * math.cos(radian),
                    center.y + arc.radiusY * math.sin(radian));

            return point;
        },

        curvePoints: function() {
            var arc = this,
                i, points, nextAngle,
                startAngle = arc.startAngle,
                endAngle = arc.endAngle,
                dir = arc.counterClockwise ? -1 : 1,
                curvePoints = [arc.pointAt(startAngle)],
                currentAngle = startAngle,
                interval = arc._arcInterval(),
                intervalAngle = interval.endAngle - interval.startAngle,
                subIntervalsCount = math.ceil(intervalAngle / arc.MAX_INTERVAL),
                subIntervalAngle = intervalAngle / subIntervalsCount;

            for (i = 1; i <= subIntervalsCount; i++) {
                nextAngle = currentAngle + dir * subIntervalAngle;
                points = arc._intervalCurvePoints(currentAngle, nextAngle);
                curvePoints.push(points.cp1, points.cp2, points.p2);
                currentAngle = nextAngle;
            }

            return curvePoints;
        },

        _boundingBoxStartAngle: function(angle, start) {
            while(angle < start) {
                angle+=90;
            }

            return angle;
        },

        bBox: function(matrix) {
            var arc = this,
                interval = arc._arcInterval(),
                startAngle = interval.startAngle,
                endAngle = interval.endAngle,
                extremeAngles = ellipseExtremeAngles(this.center, this.radiusX, this.radiusY, matrix),
                extremeX = deg(extremeAngles.x),
                extremeY = deg(extremeAngles.y),
                currentPoint = arc.pointAt(startAngle).transformInto(matrix),
                endPoint = arc.pointAt(endAngle).transformInto(matrix),
                minPoint = currentPoint.min(endPoint),
                maxPoint = currentPoint.max(endPoint),
                currentAngleX = arc._boundingBoxStartAngle(extremeX, startAngle),
                currentAngleY = arc._boundingBoxStartAngle(extremeY, startAngle),
                currentPointX, currentPointY;

            while (currentAngleX < endAngle || currentAngleY < endAngle) {
                if (currentAngleX < endAngle) {
                    currentPointX = arc.pointAt(currentAngleX).transformInto(matrix);
                    currentAngleX += 90;
                }

                if (currentAngleY < endAngle) {
                    currentPointY = arc.pointAt(currentAngleY).transformInto(matrix);
                    currentAngleY += 90;
                }
                currentPoint = new Point(currentPointX.x, currentPointY.y)
                minPoint = minPoint.min(currentPoint);
                maxPoint = maxPoint.max(currentPoint);
            }

            return new Rect(minPoint, maxPoint);
        },

        _arcInterval: function() {
            var startAngle = this.startAngle,
                endAngle = this.endAngle,
                counterClockwise = this.counterClockwise;

            if (counterClockwise) {
                var oldStart = startAngle;
                startAngle = endAngle;
                endAngle = oldStart;
            }

            if (startAngle > endAngle || (counterClockwise && startAngle === endAngle)) {
                endAngle += 360;
            }

            return {
                startAngle: startAngle,
                endAngle: endAngle
            };
        },

        _intervalCurvePoints: function(startAngle, endAngle) {
            var arc = this,
                p1 = arc.pointAt(startAngle),
                p2 = arc.pointAt(endAngle),
                p1Derivative = arc._derivativeAt(startAngle),
                p2Derivative = arc._derivativeAt(endAngle),
                t = (rad(endAngle) - rad(startAngle)) / 3,
                cp1 = new Point(p1.x + t * p1Derivative.x, p1.y + t * p1Derivative.y),
                cp2 = new Point(p2.x - t * p2Derivative.x, p2.y - t * p2Derivative.y);

            return {
                p1: p1,
                cp1: cp1,
                cp2: cp2,
                p2: p2
            };
        },

        _derivativeAt: function(angle) {
            var arc = this,
                radian = rad(angle);
            return new Point(-arc.radiusX * math.sin(radian), arc.radiusY * math.cos(radian));
        }
    });


    // TODO: MERGE WITH DIAGRAM MATH
    var Matrix = Class.extend({
        init: function (a, b, c, d, e, f) {
            this.a = a || 0;
            this.b = b || 0;
            this.c = c || 0;
            this.d = d || 0;
            this.e = e || 0;
            this.f = f || 0;
        },
        times: function (m) {
            return new Matrix(
                this.a * m.a + this.c * m.b,
                this.b * m.a + this.d * m.b,
                this.a * m.c + this.c * m.d,
                this.b * m.c + this.d * m.d,
                this.a * m.e + this.c * m.f + this.e,
                this.b * m.e + this.d * m.f + this.f
            );
        },

        clone: function() {
            return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
        }
    });

    Matrix.fn.toString = function(precision, separator) {
       var matrix = this,
           arr = [matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f],
           i;
        if (defined(precision)) {
            for (i = 0; i < 6; i++) {
                arr[i] = round(arr[i], precision)
            }
        }

        return arr.join(separator || ",");
    };

    deepExtend(Matrix, {
        translate: function (x, y) {
            var m = new Matrix();
            m.a = 1;
            m.b = 0;
            m.c = 0;
            m.d = 1;
            m.e = x;
            m.f = y;
            return m;
        },
        unit: function () {
            return new Matrix(1, 0, 0, 1, 0, 0);
        },
        rotate: function (angle, x, y) {
            var m = new Matrix();
            m.a = math.cos(rad(angle));
            m.b = math.sin(rad(angle));
            m.c = -m.b;
            m.d = m.a;
            m.e = (x - x * m.a + y * m.b) || 0;
            m.f = (y - y * m.a - x * m.b) || 0;
            return m;
        },
        scale: function (scaleX, scaleY) {
            var m = new Matrix();
            m.a = scaleX;
            m.b = 0;
            m.c = 0;
            m.d = scaleY;
            m.e = 0;
            m.f = 0;
            return m;
        }
    });

    var Transformation = Class.extend({
        init: function(matrix) {
            this._matrix = matrix || Matrix.unit();
        },

        translate: function(x, y) {
            this._matrix = this._matrix.times(Matrix.translate(x, y));
            return this;
        },

        scale: function(x, y) {
            if (!defined(y)) {
               y = x;
            }
            this._matrix = this._matrix.times(Matrix.scale(x, y));
            return this;
        },

        rotate: function(angle, x, y) {
            this._matrix = this._matrix.times(Matrix.rotate(angle, x, y));
            return this;
        },

        matrix: function() {
            return this._matrix;
        }
    });

    function transform(matrix) {
        return new Transformation(matrix);
    }

    function ellipseExtremeAngles(center, rx, ry, matrix) {
        var extremeX = 0,
            extremeY = 0;
        if (matrix) {
            extremeX = math.atan2(matrix.c * ry, matrix.a * rx);
            if (matrix.b !== 0) {
                extremeY = math.atan2(matrix.d * ry, matrix.b * rx);
            }
        }
        return {
            x: extremeX,
            y: extremeY
        };
    }

    // Exports ================================================================
    deepExtend(dataviz, {
        geometry: {
            Arc: Arc,
            Circle: Circle,
            Matrix: Matrix,
            Point: Point,
            Rect: Rect,
            transform: transform,
            Transformation: Transformation
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
