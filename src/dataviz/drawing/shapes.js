(function(f, define){
    define([ "./core", "../text-metrics" ], f);
})(function(){

(function () {

    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,
        extend = $.extend,

        dataviz = kendo.dataviz,
        append = dataviz.append,

        g = dataviz.geometry,
        Point = g.Point,
        Rect = g.Rect,
        Matrix = g.Matrix,
        transformationMatrix = g.transformationMatrix,

        drawing = dataviz.drawing,
        OptionsStore = drawing.OptionsStore,

        math = Math,
        pow = math.pow,

        util = dataviz.util,
        arrayLimits = util.arrayLimits,
        defined = util.defined,
        last = util.last;

    // Drawing primitives =====================================================
    var Element = Class.extend({
        init: function(options) {
            var shape = this;

            shape.observer = null;
            shape._initOptions(options);
            shape.options.observer = this;
        },

        _initOptions: function(options) {
            options = extend({}, options);

            var transform = options.transform;
            if (transform) {
                options.transform = g.transform(transform);
            }

            this.options = new OptionsStore(options);
        },

        optionsChange: function(e) {
            if (this.observer) {
                this.observer.optionsChange(e);
            }
        },

        transform: function(transform) {
            if (defined(transform)) {
                this.options.set("transform", g.transform(transform));
            } else {
                return this.options.get("transform");
            }
        },

        parentTransform: function() {
            var element = this,
                transformation,
                matrix,
                parentMatrix;

            while (element.parent) {
                element = element.parent;
                transformation = element.transform();
                if (transformation) {
                    parentMatrix = transformation.matrix().times(parentMatrix || Matrix.unit());
                }
            }

            if (parentMatrix) {
                return g.transform(parentMatrix);
            }
        },

        currentTransform: function(parentTransform) {
            var elementTransform = this.transform(),
                elementMatrix = transformationMatrix(elementTransform),
                parentMatrix,
                combinedMatrix;

            if (!defined(parentTransform)) {
                parentTransform = this.parentTransform();
            }

            parentMatrix = transformationMatrix(parentTransform);

            if (elementMatrix && parentMatrix) {
                combinedMatrix = parentMatrix.times(elementMatrix);
            } else {
                combinedMatrix = elementMatrix || parentMatrix;
            }

            if (combinedMatrix) {
                return g.transform(combinedMatrix);
            }
        },

        visible: function(visible) {
            if (defined(visible)) {
                this.options.set("visible", visible);
                return this;
            } else {
                visible = this.options.get("visible");
                return defined(visible) ? visible : true;
            }
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
            updateElementsParent(arguments, this);

            this.childrenChange("add", arguments);
        },

        clear: function() {
            var items = this.children;
            this.children = [];
            updateElementsParent(items, null);

            this.childrenChange("remove", items, 0);
        },

        bbox: function(transformation) {
            return elementsBoundingBox(this.children, this.currentTransform(transformation));
        },

        currentTransform: function(transformation) {
            return Element.fn.currentTransform.call(this, transformation) || null;
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
        init: function(content, origin, options) {
            Shape.fn.init.call(this, options);

            this._content = content;

            this.origin = origin || new g.Point();
            this.origin.observer = this;

            if (!this.options.font) {
                this.options.font = "12px sans-serif";
            }
        },

        content: function(value) {
            if (defined(value)) {
                this._content = value;
                this.contentChange();
                return this;
            } else {
                return this._content;
            }
        },

        contentChange: function() {
            if (this.observer) {
                this.observer.contentChange();
            }
        },

        measure: function() {
            var metrics = util.measureText(this.content(), {
                font: this.options.get("font")
            });

            return metrics;
        },

        bbox: function(transformation) {
            var combinedMatrix = transformationMatrix(this.currentTransform(transformation));
            var size = this.measure();
            var origin = this.origin.clone();
            var rect = new g.Rect(origin, origin.clone().add(new g.Point(size.width, size.height)));

            return rect.bbox(transformation);
        }
    });

    var Circle = Shape.extend({
        init: function(geometry, options) {
            var circle = this;
            Shape.fn.init.call(circle, options);

            circle.geometry = geometry || new g.Circle();
            circle.geometry.observer = this;
        },

        bbox: function(transformation) {
            var combinedMatrix = transformationMatrix(this.currentTransform(transformation));
            var rect = this.geometry.bbox(combinedMatrix);
            var strokeWidth = this.options.get("stroke.width");
            if (strokeWidth) {
                expandRect(rect, strokeWidth / 2);
            }

            return rect;
        }
    });

    var Arc = Shape.extend({
        init: function(geometry, options) {
            var arc = this;
            Shape.fn.init.call(arc, options);

            arc.geometry = geometry || new g.Arc();
            arc.geometry.observer = this;
        },

        bbox: function(transformation) {
            var combinedMatrix = transformationMatrix(this.currentTransform(transformation));
            var rect = this.geometry.bbox(combinedMatrix);
            var strokeWidth = this.options.get("stroke.width");

            if (strokeWidth) {
                expandRect(rect, strokeWidth / 2);
            }

            return rect;
        },

        toPath: function() {
            var path = new Path();
            var curvePoints = this.geometry.curvePoints();

            if (curvePoints.length > 0) {
                path.moveTo(curvePoints[0].x, curvePoints[0].y);

                for (var i = 1; i < curvePoints.length; i+=3) {
                    path.curveTo(curvePoints[i], curvePoints[i + 1], curvePoints[i + 2]);
                }
            }

            return path;
        }
    });

    var Segment = Class.extend({
        init: function(anchor, controlIn, controlOut) {
            var segment = this;

            this.anchor = anchor || new Point();
            this.anchor.observer = this;
            this.observer = null;

            if (controlIn) {
                this.controlIn = controlIn;
                this.controlIn.observer = this;
            }

            if (controlOut) {
                this.controlOut = controlOut;
                this.controlOut.observer = this;
            }
        },

        geometryChange: util.mixins.geometryChange,

        bboxTo: function(toSegment, matrix) {
            var rect;
            var segmentAnchor = this.anchor.transformCopy(matrix);
            var toSegmentAnchor = toSegment.anchor.transformCopy(matrix);

            if (this.controlOut && toSegment.controlIn) {
                rect = this._curveBoundingBox(
                    segmentAnchor, this.controlOut.transformCopy(matrix),
                    toSegment.controlIn.transformCopy(matrix), toSegmentAnchor
                );
            } else {
                rect = this._lineBoundingBox(segmentAnchor, toSegmentAnchor);
            }

            return rect;
        },

        _lineBoundingBox: function(p1, p2) {
            return new Rect(Point.min(p1, p2), Point.max(p1, p2));
        },

        _curveBoundingBox: function(p1, cp1, cp2, p2) {
            var points = [p1, cp1, cp2, p2],
                extremesX = this._curveExtremesFor(points, "x"),
                extremesY = this._curveExtremesFor(points, "y"),
                xLimits = arrayLimits([extremesX.min, extremesX.max, p1.x, p2.x]),
                yLimits = arrayLimits([extremesY.min, extremesY.max, p1.y, p2.y]);

            return new Rect(Point.create(xLimits.min, yLimits.min), Point.create(xLimits.max, yLimits.max));
        },

        _curveExtremesFor: function(points, field) {
            var extremes = this._curveExtremes(
                points[0][field], points[1][field],
                points[2][field], points[3][field]
            );

            return {
                min: this._calculateCurveAt(extremes.min, field, points),
                max: this._calculateCurveAt(extremes.max, field, points)
            };
        },

        _calculateCurveAt: function (t, field, points) {
            var t1 = 1- t;

            return pow(t1, 3) * points[0][field] +
                   3 * pow(t1, 2) * t * points[1][field] +
                   3 * pow(t, 2) * t1 * points[2][field] +
                   pow(t, 3) * points[3][field];
        },

        _curveExtremes: function (x1, x2, x3, x4) {
            var a = x1 - 3 * x2 + 3 * x3 - x4;
            var b = - 2 * (x1 - 2 * x2 + x3);
            var c = x1 - x2;
            var sqrt = math.sqrt(b * b - 4 * a * c);
            var t1 = 0;
            var t2 = 1;

            if (a === 0) {
                if (b !== 0) {
                    t1 = t2 = -c / b;
                }
            } else if (!isNaN(sqrt)) {
                t1 = (- b + sqrt) / (2 * a);
                t2 = (- b - sqrt) / (2 * a);
            }

            var min = math.max(math.min(t1, t2), 0);
            if (min < 0 || min > 1) {
                min = 0;
            }

            var max = math.min(math.max(t1, t2), 1);
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
                var lastSegment = last(this.segments);
                var segment = new Segment(point, controlIn);

                segment.observer = this;

                lastSegment.controlOut = controlOut;
                controlOut.observer = lastSegment;

                this.segments.push(segment);
            }

            return this;
        },

        close: function() {
            this.options.closed = true;
            this.geometryChange();

            return this;
        },

        bbox: function(transformation) {
            var segments = this.segments;
            var length = segments.length;
            var combinedMatrix = g.transformationMatrix(this.currentTransform(transformation));
            var boundingBox;

            if (length === 1) {
                var anchor = segments[0].anchor.transformCopy(combinedMatrix);
                boundingBox = new Rect(anchor, anchor);
            } else if (length > 0) {
                boundingBox = new Rect(Point.maxPoint(), Point.minPoint());
                for (var i = 1; i < length; i++) {
                    boundingBox = boundingBox.wrap(segments[i - 1].bboxTo(segments[i], combinedMatrix));
                }

                var strokeWidth = this.options.get("stroke.width");
                if (strokeWidth) {
                    expandRect(boundingBox, strokeWidth / 2);
                }
            }

            return boundingBox;
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
                last(this.paths).lineTo(x, y);
            }

            return this;
        },

        curveTo: function(controlOut, controlIn, point) {
            if (this.paths.length > 0) {
                last(this.paths).curveTo(controlOut, controlIn, point);
            }

            return this;
        },

        close: function() {
            if (this.paths.length > 0) {
                last(this.paths).close();
            }

            return this;
        },

        bbox: function(transformation) {
            return elementsBoundingBox(this.paths, this.currentTransform(transformation));
        }
    });

    var Image = Element.extend({
        init: function(src, rect, options) {
            Element.fn.init.call(this, options);

            this.src(src);
            this.rect(rect || new g.Rect());
        },

        src: function(value) {
            if (defined(value)) {
                this._src = value;
                this.contentChange();
                return this;
            } else {
                return this._src;
            }
        },

        rect: function(value) {
            if (defined(value)) {
                this._rect = value;
                this._rect.observer = this;
                this.geometryChange();
                return this;
            } else {
                return this._rect;
            }
        },

        geometryChange: util.mixins.geometryChange,

        contentChange: function() {
            if (this.observer) {
                this.observer.contentChange();
            }
        },

        bbox: function(transformation) {
            var combinedMatrix = transformationMatrix(this.currentTransform(transformation));
            return this._rect.bbox(combinedMatrix);
        }
    });

    // Helper functions ===========================================
    function elementsBoundingBox(elements, transformation) {
        var boundingBox = new Rect(Point.maxPoint(), Point.minPoint());
        var hasBoundingBox = false;

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.visible()) {
                var elementBoundingBox = element.bbox(transformation);
                if (elementBoundingBox) {
                    hasBoundingBox = true;
                    boundingBox = boundingBox.wrap(elementBoundingBox);
                }
            }
        }

        if (hasBoundingBox) {
            return boundingBox;
        }
    }

    function updateElementsParent(elements, parent) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].parent = parent;
        }
    }

    function expandRect(rect, value) {
        rect.p0.x -= value;
        rect.p0.y -= value;
        rect.p1.x += value;
        rect.p1.y += value;
    }


    // Exports ================================================================
    deepExtend(drawing, {
        Arc: Arc,
        Circle: Circle,
        Element: Element,
        Group: Group,
        Image: Image,
        MultiPath: MultiPath,
        Path: Path,
        Segment: Segment,
        Shape: Shape,
        Text: Text
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
