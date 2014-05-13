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

    var PI_DIV_2 = math.PI / 2;

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

        multiplyCopy: function(a) {
            return new Point(this.x * a, this.y * a);
        },

        transform: function(transformation) {
            var mx = transformationMatrix(transformation),
                x = this.x,
                y = this.y;

            this.x = mx.a * x + mx.c * y + mx.e;
            this.y = mx.b * x + mx.d * y + mx.f;

            this.geometryChange();

            return this;
        },

        transformCopy: function(transformation) {
            var point = this.clone();

            if (transformation) {
                point.transform(transformation);
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

    Point.min = function(p0, p1) {
        return new Point(math.min(p0.x, p1.x), math.min(p0.y, p1.y));
    };

    Point.max = function(p0, p1) {
        return new Point(math.max(p0.x, p1.x), math.max(p0.y, p1.y));
    }

    Point.minPoint = function() {
        return new Point(util.MIN_NUM, util.MIN_NUM);
    };

    Point.maxPoint = function() {
        return new Point(util.MAX_NUM, util.MAX_NUM);
    };

    Point.ZERO = new Point(0, 0);

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
            return new Rect(Point.min(this.p0, targetRect.p0), Point.max(this.p1, targetRect.p1));
        },

        center: function() {
            return new Point(this.p0.x  + this.width() / 2, this.p0.y  + this.height() / 2);
        },

        bbox: function(matrix) {
            var p0 = this.p0.transformCopy(matrix);
            var p1 = this.p1.transformCopy(matrix);

            return new Rect(Point.min(p0, p1), Point.max(p0, p1));
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

        bbox: function(matrix) {
            var minPoint = Point.maxPoint();
            var maxPoint = Point.minPoint();
            var extremeAngles = ellipseExtremeAngles(this.center, this.radius, this.radius, matrix);

            for (var i = 0; i < 4; i++) {
                var currentPointX = this._pointAt(extremeAngles.x + i * PI_DIV_2).transformCopy(matrix);
                var currentPointY = this._pointAt(extremeAngles.y + i * PI_DIV_2).transformCopy(matrix);
                var currentPoint = new Point(currentPointX.x, currentPointY.y);

                minPoint = Point.min(minPoint, currentPoint);
                maxPoint = Point.max(maxPoint, currentPoint);
            }

            return new Rect(minPoint, maxPoint);
        },

        _pointAt: function(angle) {
            var c = this.center;
            var r = this.radius;

            return new Point(
                c.x - r * math.cos(angle),
                c.y - r * math.sin(angle)
            );
        }
    });

    var Arc = Class.extend({
        init: function(center, options) {
            this.center = center || new Point();
            this.observer = null;
            this.center.observer = this;

            options = options || {};
            this.radiusX = options.radiusX;
            this.radiusY = options.radiusY || options.radiusX;
            this.startAngle = options.startAngle;
            this.endAngle = options.endAngle;
            this.counterClockwise = options.counterClockwise || false;
        },

        MAX_INTERVAL: 90,

        _fields: ["radiusX", "radiusY", "startAngle", "endAngle", "counterClockwise"],

        geometryChange: util.mixins.geometryChange,

        get: function(field) {
            return this[field];
        },

        set: function(field, value) {
            if ($.inArray(field, this._fields) !== -1 && this[field] !== value) {
                this[field] = value;
                this.geometryChange();
            }
        },

        pointAt: function(angle) {
            var center = this.center;
            var radian = rad(angle);

            return new Point(
                center.x + this.radiusX * math.cos(radian),
                center.y + this.radiusY * math.sin(radian)
            );
        },

        curvePoints: function() {
            var startAngle = this.startAngle;
            var endAngle = this.endAngle;
            var dir = this.counterClockwise ? -1 : 1;
            var curvePoints = [this.pointAt(startAngle)];
            var currentAngle = startAngle;
            var interval = this._arcInterval();
            var intervalAngle = interval.endAngle - interval.startAngle;
            var subIntervalsCount = math.ceil(intervalAngle / this.MAX_INTERVAL);
            var subIntervalAngle = intervalAngle / subIntervalsCount;

            for (var i = 1; i <= subIntervalsCount; i++) {
                var nextAngle = currentAngle + dir * subIntervalAngle;
                var points = this._intervalCurvePoints(currentAngle, nextAngle);

                curvePoints.push(points.cp1, points.cp2, points.p2);
                currentAngle = nextAngle;
            }

            return curvePoints;
        },

        bbox: function(matrix) {
            var arc = this;
            var interval = arc._arcInterval();
            var startAngle = interval.startAngle;
            var endAngle = interval.endAngle;
            var extremeAngles = ellipseExtremeAngles(this.center, this.radiusX, this.radiusY, matrix);
            var extremeX = deg(extremeAngles.x);
            var extremeY = deg(extremeAngles.y);
            var currentPoint = arc.pointAt(startAngle).transformCopy(matrix);
            var endPoint = arc.pointAt(endAngle).transformCopy(matrix);
            var minPoint = Point.min(currentPoint, endPoint);
            var maxPoint = Point.max(currentPoint, endPoint);
            var currentAngleX = bboxStartAngle(extremeX, startAngle);
            var currentAngleY = bboxStartAngle(extremeY, startAngle);

            while (currentAngleX < endAngle || currentAngleY < endAngle) {
                var currentPointX;
                if (currentAngleX < endAngle) {
                    currentPointX = arc.pointAt(currentAngleX).transformCopy(matrix);
                    currentAngleX += 90;
                }

                var currentPointY;
                if (currentAngleY < endAngle) {
                    currentPointY = arc.pointAt(currentAngleY).transformCopy(matrix);
                    currentAngleY += 90;
                }

                currentPoint = new Point(currentPointX.x, currentPointY.y);
                minPoint = Point.min(minPoint, currentPoint);
                maxPoint = Point.max(maxPoint, currentPoint);
            }

            return new Rect(minPoint, maxPoint);
        },

        _arcInterval: function() {
            var startAngle = this.startAngle;
            var endAngle = this.endAngle;
            var counterClockwise = this.counterClockwise;

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
            var arc = this;
            var p1 = arc.pointAt(startAngle);
            var p2 = arc.pointAt(endAngle);
            var p1Derivative = arc._derivativeAt(startAngle);
            var p2Derivative = arc._derivativeAt(endAngle);
            var t = (rad(endAngle) - rad(startAngle)) / 3;
            var cp1 = new Point(p1.x + t * p1Derivative.x, p1.y + t * p1Derivative.y);
            var cp2 = new Point(p2.x - t * p2Derivative.x, p2.y - t * p2Derivative.y);

            return {
                p1: p1,
                cp1: cp1,
                cp2: cp2,
                p2: p2
            };
        },

        _derivativeAt: function(angle) {
            var arc = this;
            var radian = rad(angle);

            return new Point(-arc.radiusX * math.sin(radian), arc.radiusY * math.cos(radian));
        }
    });

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
        },

        equals: function(other) {
            if (!other) {
                return false;
            }

            return this.a === other.a && this.b === other.b &&
                   this.c === other.c && this.d === other.d &&
                   this.e === other.e && this.f === other.f;
        }
    });

    Matrix.fn.toString = function(precision, separator) {
       var arr = [this.a, this.b, this.c, this.d, this.e, this.f];

        if (defined(precision)) {
            for (var i = 0; i < 6; i++) {
                arr[i] = round(arr[i], precision);
            }
        }

        return arr.join(separator || ",");
    };

    Matrix.translate = function (x, y) {
        return new Matrix(1, 0, 0, 1, x, y);
    };

    Matrix.unit = function () {
        return new Matrix(1, 0, 0, 1, 0, 0);
    };

    Matrix.rotate = function (angle, x, y) {
        var m = new Matrix();
        m.a = math.cos(rad(angle));
        m.b = math.sin(rad(angle));
        m.c = -m.b;
        m.d = m.a;
        m.e = (x - x * m.a + y * m.b) || 0;
        m.f = (y - y * m.a - x * m.b) || 0;

        return m;
    };

    Matrix.scale = function (scaleX, scaleY) {
        return new Matrix(scaleX, 0, 0, scaleY, 0, 0);
    };

    Matrix.IDENTITY = Matrix.unit();

    var Transformation = Class.extend({
        init: function(matrix) {
            this._matrix = matrix || Matrix.unit();
            this.observer = null;
        },

        _optionsChange: function() {
            if (this.observer) {
                this.observer.optionsChange({
                    field: "transform",
                    value: this
                });
            }
        },

        translate: function(x, y) {
            this._matrix = this._matrix.times(Matrix.translate(x, y));

            this._optionsChange();
            return this;
        },

        scale: function(scaleX, scaleY, origin) {
            if (!defined(scaleY)) {
               scaleY = scaleX;
            }

            if (origin) {
                origin = Point.create(origin);
                this._matrix = this._matrix.times(Matrix.translate(origin.x, origin.y));
            }

            this._matrix = this._matrix.times(Matrix.scale(scaleX, scaleY));

            if (origin) {
                this._matrix = this._matrix.times(Matrix.translate(-origin.x, -origin.y));
            }

            this._optionsChange();
            return this;
        },

        rotate: function(angle, origin) {
            origin = Point.create(origin) || Point.ZERO;

            this._matrix = this._matrix.times(Matrix.rotate(angle, origin.x, origin.y));

            this._optionsChange();
            return this;
        },

        multiply: function(transformation) {
            var matrix = transformationMatrix(transformation);

            this._matrix = this._matrix.times(matrix);

            this._optionsChange();
            return this;
        },

        matrix: function() {
            return this._matrix;
        }
    });

    function transform(matrix) {
        if (matrix === null) {
            return null;
        }

        if (matrix instanceof Transformation) {
            return matrix;
        }

        return new Transformation(matrix);
    }

    function transformationMatrix(transformation) {
        if (transformation && kendo.isFunction(transformation.matrix)) {
            return transformation.matrix();
        }

        return transformation;
    }

    // Helper functions =======================================================
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

    function bboxStartAngle(angle, start) {
        while(angle < start) {
            angle += 90;
        }

        return angle;
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
            Transformation: Transformation,
            transformationMatrix: transformationMatrix
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
