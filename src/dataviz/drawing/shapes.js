(function(f, define){
    define([ "./core" ], f);
})(function(){

(function () {

    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        append = dataviz.append,

        g = dataviz.geometry,
        Point = g.Point,
        Rect = g.Rect,
        Arc = g.Arc,

        drawing = dataviz.drawing,
        OptionsStore = drawing.OptionsStore,

        math = Math,

        util = dataviz.util,
        defined = util.defined,
        arrayMinMax = util.arrayMinMax;

    //utility =====================================================
    function elementsBoundingRect(elements) {
        var length = elements.length,
            boundingRect, i;
        if (length > 0) {
            boundingRect = new Rect(Point.maxPoint(), Point.minPoint());
            for (i = 0; i < length; i++) {
                boundingRect = boundingRect.wrap(elements[i].boundingRect());
            }
        }

        return boundingRect;
    }

    // Drawing primitives =====================================================
    var Element = Class.extend({
        init: function(options) {
            var shape = this;

            shape.observer = null;
            shape.options = new OptionsStore(options || {});
            shape.options.observer = this;
        },

        optionsChange: function(e) {
            if (this.observer) {
                this.observer.optionsChange(e);
            }
        },

        visible: function(visible) {
            this.options.set("visible", visible);
            return this;
        }
    });

    var Group = Element.extend({
        init: function(options) {
            this.children = [];
            Element.fn.init.call(this, options);
        },

        childrenChange: function(action, items, index) {
            if (this.observer) {
                this.observer.childrenChange({
                    action: action,
                    items: items,
                    index: index
                });
            }
        },

        traverse: function(callback) {
            var children = this.children;

            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                callback(child);

                if (child.traverse) {
                    child.traverse(callback);
                }
            }
        },

        append: function() {
            append(this.children, arguments);
            this.childrenChange("add", arguments);
        },

        clear: function() {
            var items = this.children;
            this.children = [];
            this.childrenChange("remove", items, 0);
        },

        boundingRect: function() {
            return elementsBoundingRect(this.children);
        }
    });

    var Shape = Element.extend({
        geometryChange: util.mixins.geometryChange,

        fill: function(color, opacity) {
            this.options.set("fill.color", color);

            if (defined(opacity)) {
                this.options.set("fill.opacity", opacity);
            }

            return this;
        },

        stroke: function(color, width, opacity) {
            this.options.set("stroke.color", color);

            if (defined(width)) {
               this.options.set("stroke.width", width);
            }

            if (defined(opacity)) {
               this.options.set("stroke.opacity", opacity);
            }

            return this;
        }
    });

    var Text = Shape.extend({
        init: function(content, options) {
            var text = this;
            text.content = content;

            Shape.fn.init.call(text, options);
        }
    });

    var Circle = Shape.extend({
        init: function(geometry, options) {
            var circle = this;
            Shape.fn.init.call(circle, options);

            circle.geometry = geometry || new g.Circle();
            circle.geometry.observer = this;
        },

        boundingRect: function() {
            return this.geometry.boundingRect();
        }
    });

    var Arc = Shape.extend({
        init: function(geometry, options) {
            var arc = this;
            Shape.fn.init.call(arc, options);

            arc.geometry = geometry || new g.Arc();
            arc.geometry.observer = this;
        },

        boundingRect: function() {
            return this.geometry.boundingRect();
        },

        toPath: function() {
            var path = new Path(this.options.toJSON()),
                curvePoints = this.geometry.curvePoints();
            path.moveTo(curvePoints[0].x, curvePoints[0].y);
            for (var i = 1; i < curvePoints.length; i+=3) {
                path.curveTo(curvePoints[i], curvePoints[i + 1], curvePoints[i + 2]);
            }

            return path;
        }
    });

    var Segment = Class.extend({
        init: function(anchor, controlIn, controlOut) {
            var segment = this;

            segment.anchor = anchor || new Point();
            segment.anchor.observer = this;
            segment.observer = null;

            if (controlIn) {
                segment.controlIn = controlIn;
                segment.controlIn.observer = this;
            }

            if (controlOut) {
                segment.controlOut = controlOut;
                segment.controlOut.observer = this;
            }
        },

        geometryChange: util.mixins.geometryChange,

        boundingRectTo: function(segment) {
            var rect;
            if (this.controlOut && segment.controlIn) {
                rect = this._curveBoundingRect(this.anchor, this.controlOut, segment.controlIn, segment.anchor);
            } else {
                rect = this._lineBoundingRect(this.anchor, segment.anchor);
            }
            return rect;
        },

        _lineBoundingRect: function(p1, p2) {
            return new Rect(p1.clone(), p2.clone());
        },

        _curveBoundingRect: function(p1, cp1, cp2, p2) {
            var points = [p1, cp1, cp2, p2],
                extremesX = this._curveExtremesFor(points, "x"),
                extremesY = this._curveExtremesFor(points, "y"),
                xMinMax = arrayMinMax([extremesX.min, extremesX.max, p1.x, p2.x]),
                yMinMax = arrayMinMax([extremesY.min, extremesY.max, p1.y, p2.y]);

            return new Rect(Point.create(xMinMax.min, yMinMax.min), Point.create(xMinMax.max, yMinMax.max));
        },

        _curveExtremesFor: function(points, field) {
            var extremes = this._curveExtremes(points[0][field], points[1][field],
                points[2][field], points[3][field]);

            return {
                min: this._calculateCurveAt(extremes.min, field, points),
                max: this._calculateCurveAt(extremes.max, field, points)
            };
        },

        _calculateCurveAt: function (t, field, points) {
            var t1 = 1- t;
            return math.pow(t1, 3) * points[0][field] +
                3 * math.pow(t1, 2) * t * points[1][field] +
                3 * math.pow(t, 2) * t1 * points[2][field] +
                math.pow(t, 3) * points[3][field];
        },

        _curveExtremes: function (x1, x2, x3, x4) {
            var a = x1 - 3 * x2 + 3 * x3 - x4,
                b = - 2 * (x1 - 2 * x2 + x3),
                c = x1 - x2,
                sqrt = math.sqrt(b * b - 4 * a * c),
                t1 = 0, t2 = 1,
                min,
                max;
            if (a === 0) {
                if (b !== 0) {
                    t1 = t2 = -c / b;
                }
            } else if (!isNaN(sqrt)) {
                t1 = (- b + sqrt) / (2 * a);
                t2 = (- b - sqrt) / (2 * a);
            }

            min = math.max(math.min(t1, t2), 0);
            if (min < 0 || min > 1) {
                min = 0;
            }
            max = math.min(math.max(t1, t2), 1);
            if (max > 1 || max < 0) {
                max = 1;
            }

            return {
                min: min,
                max: max
            };
        }
    });

    var Path = Shape.extend({
        init: function(options) {
            var path = this;

            path.segments = [];
            path.observer = null;

            Shape.fn.init.call(path, options);
        },

        moveTo: function(x, y) {
            this.segments = [];
            this.lineTo(x, y);

            return this;
        },

        lineTo: function(x, y) {
            var point = defined(y) ? new Point(x, y) : x,
                segment = new Segment(point);

            segment.observer = this;

            this.segments.push(segment);
            this.geometryChange();

            return this;
        },

        curveTo: function(controlOut, controlIn, point) {
            if (this.segments.length > 0) {
                var last = dataviz.last(this.segments);
                    segment = new Segment(point, controlIn);

                last.controlOut = controlOut;
                controlOut.observer = last;

                this.segments.push(segment);
            }

            return this;
        },

        close: function() {
            this.options.closed = true;
            this.geometryChange();

            return this;
        },

        boundingRect: function() {
            var segments = this.segments,
                length = segments.length,
                boundingRect = new Rect(Point.maxPoint(), Point.minPoint()),
                i;

            if (length === 1) {
                boundingRect = new Rect(segments[0].anchor.clone(), segments[0].anchor.clone());
            } else if (length > 0) {
                for (i = 1; i < length; i++) {
                    boundingRect = boundingRect.wrap(segments[i - 1].boundingRectTo(segments[i]));
                }
            }
            return boundingRect;
        }
    });

    var MultiPath = Shape.extend({
        init: function(options) {
            this.paths = [];
            Shape.fn.init.call(this, options);
        },

        moveTo: function(x, y) {
            var path = new Path();
            path.observer = this;

            this.paths.push(path);
            path.moveTo(x, y);

            return this;
        },

        lineTo: function(x, y) {
            if (this.paths.length > 0) {
                dataviz.last(this.paths).lineTo(x, y);
            }

            return this;
        },

        curveTo: function(controlOut, controlIn, point) {
            if (this.paths.length > 0) {
                dataviz.last(this.paths).curveTo(controlOut, controlIn, point);
            }

            return this;
        },

        close: function() {
            if (this.paths.length > 0) {
                dataviz.last(this.paths).close();
            }

            return this;
        },

        boundingRect: function() {
            return elementsBoundingRect(this.paths);
        }
    });

    // Sector
    // Ring

    // Exports ================================================================
    deepExtend(drawing, {
        Group: Group,
        Shape: Shape,

        Arc: Arc,
        Circle: Circle,
        Path: Path,
        MultiPath: MultiPath,
        Segment: Segment,
        Text: Text
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
