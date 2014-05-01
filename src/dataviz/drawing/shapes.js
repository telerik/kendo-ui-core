(function(f, define){
    define([ "./core" ], f);
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

        util = dataviz.util,
        defined = util.defined,
        arrayMinMax = util.arrayMinMax;

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

        bbox: function(transformation) {
            var combinedMatrix = transformationMatrix(this.currentTransform(transformation)),
                rect = this.geometry.bbox(combinedMatrix),
                strokeWidth = this.options.get("stroke.width");
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
            var combinedMatrix = transformationMatrix(this.currentTransform(transformation)),
                rect = this.geometry.bbox(combinedMatrix),
                strokeWidth = this.options.get("stroke.width");
            if (strokeWidth) {
                expandRect(rect, strokeWidth / 2);
            }

            return rect;
        },

        toPath: function() {
            var path = new Path(),
                curvePoints = this.geometry.curvePoints(),
                i, length = curvePoints.length;
            path.moveTo(curvePoints[0].x, curvePoints[0].y);
            for (i = 1; i < length; i+=3) {
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

        bboxTo: function(toSegment, matrix) {
            var rect,
                segment = this,
                segmentAnchor = segment.anchor.transformCopy(matrix),
                toSegmentAnchor = toSegment.anchor.transformCopy(matrix);

            if (segment.controlOut && toSegment.controlIn) {
                rect = segment._curveBoundingBox(segmentAnchor, segment.controlOut.transformCopy(matrix),
                    toSegment.controlIn.transformCopy(matrix), toSegmentAnchor);
            } else {
                rect = segment._lineBoundingBox(segmentAnchor, toSegmentAnchor);
            }
            return rect;
        },

        _lineBoundingBox: function(p1, p2) {
            return new Rect(p1.min(p2), p1.max(p2));
        },

        _curveBoundingBox: function(p1, cp1, cp2, p2) {
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
                var last = dataviz.last(this.segments),
                    segment = new Segment(point, controlIn);

                segment.observer = this;

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

        bbox: function(transformation) {
            var segments = this.segments,
                length = segments.length,
                strokeWidth = this.options.get("stroke.width"),
                combinedMatrix = g.transformationMatrix(this.currentTransform(transformation)),
                boundingBox,
                i;

            if (length === 1) {
                var anchor = segments[0].anchor.transformCopy(combinedMatrix);
                boundingBox = new Rect(anchor, anchor);
            } else if (length > 0) {
                boundingBox = new Rect(Point.maxPoint(), Point.minPoint());
                for (i = 1; i < length; i++) {
                    boundingBox = boundingBox.wrap(segments[i - 1].bboxTo(segments[i], combinedMatrix));
                }
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

        bbox: function(transformation) {
            return elementsBoundingBox(this.paths, this.currentTransform(transformation));
        }
    });

    // Sector
    // Ring


    //utility =====================================================
    function elementsBoundingBox(elements, transformation) {
        var length = elements.length,
            boundingBox = new Rect(Point.maxPoint(), Point.minPoint()),
            hasBoundingBox = false,
            elementBoundingBox,
            i, element;

        for (i = 0; i < length; i++) {
            element = elements[i];
            if (element.visible()) {
                elementBoundingBox = element.bbox(transformation);
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
        var length = elements.length,
            i;
        for (i = 0; i < length; i++) {
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
        Element: Element,
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
