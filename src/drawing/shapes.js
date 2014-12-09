(function(f, define){
    define([ "./core", "./mixins", "./text-metrics", "../mixins/observers" ], f);
})(function(){

(function ($) {

    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,

        g = kendo.geometry,
        Point = g.Point,
        Rect = g.Rect,
        Size = g.Size,
        Matrix = g.Matrix,
        toMatrix = g.toMatrix,

        drawing = kendo.drawing,
        OptionsStore = drawing.OptionsStore,

        math = Math,
        pow = math.pow,

        util = kendo.util,
        append = util.append,
        arrayLimits = util.arrayLimits,
        defined = util.defined,
        last = util.last,
        valueOrDefault = util.valueOrDefault,
        ObserversMixin = kendo.mixins.ObserversMixin,

        inArray = $.inArray,
        push = [].push,
        pop = [].pop,
        splice = [].splice,
        shift = [].shift,
        slice = [].slice,
        unshift = [].unshift;

    // Drawing primitives =====================================================
    var Element = Class.extend({
        nodeType: "Element",

        init: function(options) {
            this._initOptions(options);
        },

        _initOptions: function(options) {
            options = options || {};

            var transform = options.transform;
            var clip = options.clip;

            if (transform) {
                options.transform = g.transform(transform);
            }

            if (clip && !clip.id) {
                clip.id = kendo.guid();
            }

            this.options = new OptionsStore(options);
            this.options.addObserver(this);
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
                    parentMatrix = transformation.matrix().multiplyCopy(parentMatrix || Matrix.unit());
                }
            }

            if (parentMatrix) {
                return g.transform(parentMatrix);
            }
        },

        currentTransform: function(parentTransform) {
            var elementTransform = this.transform(),
                elementMatrix = toMatrix(elementTransform),
                parentMatrix,
                combinedMatrix;

            if (!defined(parentTransform)) {
                parentTransform = this.parentTransform();
            }

            parentMatrix = toMatrix(parentTransform);

            if (elementMatrix && parentMatrix) {
                combinedMatrix = parentMatrix.multiplyCopy(elementMatrix);
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
                return this.options.get("visible") !== false;
            }
        },

        clip: function(clip) {
            var options = this.options;
            if (defined(clip)) {
                if (clip && !clip.id) {
                    clip.id = kendo.guid();
                }
                options.set("clip", clip);
                return this;
            } else {
                return options.get("clip");
            }
        },

        opacity: function(value) {
            if (defined(value)) {
                this.options.set("opacity", value);
                return this;
            } else {
                return valueOrDefault(this.options.get("opacity"), 1);
            }
        },

        clippedBBox: function(transformation) {
            var box = this._clippedBBox(transformation);
            if (box) {
                var clip = this.clip();
                return clip ? Rect.intersect(box, clip.bbox(transformation)) : box;
            }
        },

        _clippedBBox: function(transformation) {
            return this.bbox(transformation);
        }
    });

    deepExtend(Element.fn, ObserversMixin);

    var ElementsArray = Class.extend({
        init: function(array) {
            array = array || [];

            this.length = 0;
            this._splice(0, array.length, array);
        },

        elements: function(elements) {
            if (elements) {
                this._splice(0, this.length, elements);

                this._change();
                return this;
            } else {
                return this.slice(0);
            }
        },

        push: function() {
            var elements = arguments;
            var result = push.apply(this, elements);

            this._add(elements);

            return result;
        },

        slice: slice,

        pop: function() {
            var length = this.length;
            var result = pop.apply(this);

            if (length) {
                this._remove([result]);
            }

            return result;
        },

        splice: function(index, howMany) {
            var elements = slice.call(arguments, 2);
            var result = this._splice(index, howMany, elements);

            this._change();

            return result;
        },

        shift: function() {
            var length = this.length;
            var result = shift.apply(this);

            if (length) {
                this._remove([result]);
            }

            return result;
        },

        unshift: function() {
            var elements = arguments;
            var result = unshift.apply(this, elements);

            this._add(elements);

            return result;
        },

        indexOf: function(element) {
            var that = this;
            var idx;
            var length;

            for (idx = 0, length = that.length; idx < length; idx++) {
                if (that[idx] === element) {
                    return idx;
                }
            }
            return -1;
        },

        _splice: function(index, howMany, elements) {
            var result = splice.apply(this, [index, howMany].concat(elements));

            this._clearObserver(result);
            this._setObserver(elements);

            return result;
        },

        _add: function(elements) {
            this._setObserver(elements);
            this._change();
        },

        _remove: function(elements) {
            this._clearObserver(elements);
            this._change();
        },

        _setObserver: function(elements) {
            for (var idx = 0; idx < elements.length; idx++) {
                elements[idx].addObserver(this);
            }
        },

        _clearObserver: function(elements) {
            for (var idx = 0; idx < elements.length; idx++) {
                elements[idx].removeObserver(this);
            }
        },

        _change: function() {}
    });

    deepExtend(ElementsArray.fn, ObserversMixin);

    var Group = Element.extend({
        nodeType: "Group",

        init: function(options) {
            Element.fn.init.call(this, options);
            this.children = [];
        },

        childrenChange: function(action, items, index) {
            this.trigger("childrenChange",{
                action: action,
                items: items,
                index: index
            });
        },

        append: function() {
            append(this.children, arguments);
            this._reparent(arguments, this);

            this.childrenChange("add", arguments);

            return this;
        },

        insertAt: function(element, index) {
            this.children.splice(index, 0, element);
            element.parent = this;

            this.childrenChange("add", [element], index);

            return this;
        },

        remove: function(element) {
            var index = inArray(element, this.children);
            if (index >= 0) {
                this.children.splice(index, 1);
                element.parent = null;
                this.childrenChange("remove", [element], index);
            }

            return this;
        },

        removeAt: function(index) {
            if (0 <= index && index < this.children.length) {
                var element = this.children[index];
                this.children.splice(index, 1);
                element.parent = null;
                this.childrenChange("remove", [element], index);
            }

            return this;
        },

        clear: function() {
            var items = this.children;
            this.children = [];
            this._reparent(items, null);

            this.childrenChange("remove", items, 0);

            return this;
        },

        bbox: function(transformation) {
            return elementsBoundingBox(this.children, true, this.currentTransform(transformation));
        },

        rawBBox: function() {
            return elementsBoundingBox(this.children, false);
        },

        _clippedBBox: function(transformation) {
            return elementsClippedBoundingBox(this.children, this.currentTransform(transformation));
        },

        currentTransform: function(transformation) {
            return Element.fn.currentTransform.call(this, transformation) || null;
        },

        _reparent: function(elements, newParent) {
            for (var i = 0; i < elements.length; i++) {
                var child = elements[i];
                var parent = child.parent;
                if (parent && parent != this && parent.remove) {
                    parent.remove(child);
                }

                child.parent = newParent;
            }
        }
    });
    drawing.mixins.Traversable.extend(Group.fn, "children");

    var Text = Element.extend({
        nodeType: "Text",

        init: function(content, position, options) {
            Element.fn.init.call(this, options);

            this.content(content);
            this.position(position || new g.Point());

            if (!this.options.font) {
                this.options.font = "12px sans-serif";
            }

            if (!defined(this.options.fill)) {
                this.fill("#000");
            }
        },

        content: function(value) {
            if (defined(value)) {
                this.options.set("content", value);
                return this;
            } else {
                return this.options.get("content");
            }
        },

        measure: function() {
            var metrics = drawing.util.measureText(this.content(), {
                font: this.options.get("font")
            });

            return metrics;
        },

        rect: function() {
            var size = this.measure();
            var pos = this.position().clone();
            return new g.Rect(pos, [size.width, size.height]);
        },

        bbox: function(transformation) {
            var combinedMatrix = toMatrix(this.currentTransform(transformation));
            return this.rect().bbox(combinedMatrix);
        },

        rawBBox: function() {
            return this.rect().bbox();
        }
    });
    drawing.mixins.Paintable.extend(Text.fn);
    definePointAccessors(Text.fn, ["position"]);

    var Circle = Element.extend({
        nodeType: "Circle",

        init: function(geometry, options) {
            Element.fn.init.call(this, options);
            this.geometry(geometry || new g.Circle());

            if (!defined(this.options.stroke)) {
                this.stroke("#000");
            }
        },

        bbox: function(transformation) {
            var combinedMatrix = toMatrix(this.currentTransform(transformation));
            var rect = this._geometry.bbox(combinedMatrix);
            var strokeWidth = this.options.get("stroke.width");
            if (strokeWidth) {
                expandRect(rect, strokeWidth / 2);
            }

            return rect;
        },

        rawBBox: function() {
            return this._geometry.bbox();
        }
    });
    drawing.mixins.Paintable.extend(Circle.fn);
    defineGeometryAccessors(Circle.fn, ["geometry"]);

    var Arc = Element.extend({
        nodeType: "Arc",

        init: function(geometry, options) {
            Element.fn.init.call(this, options);
            this.geometry(geometry || new g.Arc());

            if (!defined(this.options.stroke)) {
                this.stroke("#000");
            }
        },

        bbox: function(transformation) {
            var combinedMatrix = toMatrix(this.currentTransform(transformation));
            var rect = this.geometry().bbox(combinedMatrix);
            var strokeWidth = this.options.get("stroke.width");

            if (strokeWidth) {
                expandRect(rect, strokeWidth / 2);
            }

            return rect;
        },

        rawBBox: function() {
            return this.geometry().bbox();
        },

        toPath: function() {
            var path = new Path();
            var curvePoints = this.geometry().curvePoints();

            if (curvePoints.length > 0) {
                path.moveTo(curvePoints[0].x, curvePoints[0].y);

                for (var i = 1; i < curvePoints.length; i+=3) {
                    path.curveTo(curvePoints[i], curvePoints[i + 1], curvePoints[i + 2]);
                }
            }

            return path;
        }
    });
    drawing.mixins.Paintable.extend(Arc.fn);
    defineGeometryAccessors(Arc.fn, ["geometry"]);

    var GeometryElementsArray = ElementsArray.extend({
        _change: function() {
            this.geometryChange();
        }
    });

    var Segment = Class.extend({
        init: function(anchor, controlIn, controlOut) {
            this.anchor(anchor || new Point());
            this.controlIn(controlIn);
            this.controlOut(controlOut);
        },

        bboxTo: function(toSegment, matrix) {
            var rect;
            var segmentAnchor = this.anchor().transformCopy(matrix);
            var toSegmentAnchor = toSegment.anchor().transformCopy(matrix);

            if (this.controlOut() && toSegment.controlIn()) {
                rect = this._curveBoundingBox(
                    segmentAnchor, this.controlOut().transformCopy(matrix),
                    toSegment.controlIn().transformCopy(matrix), toSegmentAnchor
                );
            } else {
                rect = this._lineBoundingBox(segmentAnchor, toSegmentAnchor);
            }

            return rect;
        },

        _lineBoundingBox: function(p1, p2) {
            return Rect.fromPoints(p1, p2);
        },

        _curveBoundingBox: function(p1, cp1, cp2, p2) {
            var points = [p1, cp1, cp2, p2],
                extremesX = this._curveExtremesFor(points, "x"),
                extremesY = this._curveExtremesFor(points, "y"),
                xLimits = arrayLimits([extremesX.min, extremesX.max, p1.x, p2.x]),
                yLimits = arrayLimits([extremesY.min, extremesY.max, p1.y, p2.y]);

            return Rect.fromPoints(new Point(xLimits.min, yLimits.min), new Point(xLimits.max, yLimits.max));
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
    definePointAccessors(Segment.fn, ["anchor", "controlIn", "controlOut"]);
    deepExtend(Segment.fn, ObserversMixin);

    var Path = Element.extend({
        nodeType: "Path",

        init: function(options) {
            Element.fn.init.call(this, options);
            this.segments = new GeometryElementsArray();
            this.segments.addObserver(this);

            if (!defined(this.options.stroke)) {
                this.stroke("#000");

                if (!defined(this.options.stroke.lineJoin)) {
                    this.options.set("stroke.lineJoin", "miter");
                }
            }
        },

        moveTo: function(x, y) {
            this.suspend();
            this.segments.elements([]);
            this.resume();

            this.lineTo(x, y);

            return this;
        },

        lineTo: function(x, y) {
            var point = defined(y) ? new Point(x, y) : x,
                segment = new Segment(point);

            this.segments.push(segment);

            return this;
        },

        curveTo: function(controlOut, controlIn, point) {
            if (this.segments.length > 0) {
                var lastSegment = last(this.segments);
                var segment = new Segment(point, controlIn);
                this.suspend();
                lastSegment.controlOut(controlOut);
                this.resume();

                this.segments.push(segment);
            }

            return this;
        },

        arc: function(startAngle, endAngle, radiusX, radiusY, anticlockwise) {
            if (this.segments.length > 0) {
                var lastSegment = last(this.segments);
                var anchor = lastSegment.anchor();
                var start = util.rad(startAngle);
                var center = new Point(anchor.x - radiusX * math.cos(start),
                    anchor.y - radiusY * math.sin(start));
                var arc = new g.Arc(center, {
                    startAngle: startAngle,
                    endAngle: endAngle,
                    radiusX: radiusX,
                    radiusY: radiusY,
                    anticlockwise: anticlockwise
                });

                this._addArcSegments(arc);
            }

            return this;
        },

        arcTo: function(end, rx, ry, largeArc, swipe) {
            if (this.segments.length > 0) {
                var lastSegment = last(this.segments);
                var anchor = lastSegment.anchor();
                var arc = g.Arc.fromPoints(anchor, end, rx, ry, largeArc, swipe);

                this._addArcSegments(arc);
            }
            return this;
        },

        _addArcSegments: function(arc) {
            this.suspend();
            var curvePoints = arc.curvePoints();
            for (var i = 1; i < curvePoints.length; i+=3) {
                this.curveTo(curvePoints[i], curvePoints[i + 1], curvePoints[i + 2]);
            }
            this.resume();
            this.geometryChange();
        },

        close: function() {
            this.options.closed = true;
            this.geometryChange();

            return this;
        },

        bbox: function(transformation) {
            var combinedMatrix = toMatrix(this.currentTransform(transformation));
            var boundingBox = this._bbox(combinedMatrix);
            var strokeWidth = this.options.get("stroke.width");
            if (strokeWidth) {
                expandRect(boundingBox, strokeWidth / 2);
            }
            return boundingBox;
        },

        rawBBox: function() {
            return this._bbox();
        },

        _bbox: function(matrix) {
            var segments = this.segments;
            var length = segments.length;
            var boundingBox;

            if (length === 1) {
                var anchor = segments[0].anchor().transformCopy(matrix);
                boundingBox = new Rect(anchor, Size.ZERO);
            } else if (length > 0) {
                for (var i = 1; i < length; i++) {
                    var segmentBox = segments[i - 1].bboxTo(segments[i], matrix);
                    if (boundingBox) {
                        boundingBox = Rect.union(boundingBox, segmentBox);
                    } else {
                        boundingBox = segmentBox;
                    }
                }
            }

            return boundingBox;
        }
    });
    drawing.mixins.Paintable.extend(Path.fn);

    Path.fromRect = function(rect, options) {
        return new Path(options)
            .moveTo(rect.topLeft())
            .lineTo(rect.topRight())
            .lineTo(rect.bottomRight())
            .lineTo(rect.bottomLeft())
            .close();
    };

    Path.fromPoints = function(points, options) {
        if (points) {
            var path = new Path(options);

            for (var i = 0; i < points.length; i++) {
                var pt = Point.create(points[i]);
                if (pt) {
                    if (i === 0) {
                        path.moveTo(pt);
                    } else {
                        path.lineTo(pt);
                    }
                }
            }

            return path;
        }
    };

    Path.fromArc = function(arc, options) {
        var path = new Path(options);
        var startAngle = arc.startAngle;
        var start = arc.pointAt(startAngle);
        path.moveTo(start.x, start.y);
        path.arc(startAngle, arc.endAngle, arc.radiusX, arc.radiusY, arc.anticlockwise);
        return path;
    };

    var MultiPath = Element.extend({
        nodeType: "MultiPath",

        init: function(options) {
            Element.fn.init.call(this, options);
            this.paths = new GeometryElementsArray();
            this.paths.addObserver(this);

            if (!defined(this.options.stroke)) {
                this.stroke("#000");
            }
        },

        moveTo: function(x, y) {
            var path = new Path();
            path.moveTo(x, y);

            this.paths.push(path);

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

        arc: function(startAngle, endAngle, radiusX, radiusY, anticlockwise) {
            if (this.paths.length > 0) {
                last(this.paths).arc(startAngle, endAngle, radiusX, radiusY, anticlockwise);
            }

            return this;
        },

        arcTo: function(end, rx, ry, largeArc, swipe) {
            if (this.paths.length > 0) {
                last(this.paths).arcTo(end, rx, ry, largeArc, swipe);
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
            return elementsBoundingBox(this.paths, true, this.currentTransform(transformation));
        },

        rawBBox: function() {
            return elementsBoundingBox(this.paths, false);
        },

        _clippedBBox: function(transformation) {
            return elementsClippedBoundingBox(this.paths, this.currentTransform(transformation));
        }
    });
    drawing.mixins.Paintable.extend(MultiPath.fn);

    var Image = Element.extend({
        nodeType: "Image",

        init: function(src, rect, options) {
            Element.fn.init.call(this, options);

            this.src(src);
            this.rect(rect || new g.Rect());
        },

        src: function(value) {
            if (defined(value)) {
                this.options.set("src", value);
                return this;
            } else {
                return this.options.get("src");
            }
        },

        bbox: function(transformation) {
            var combinedMatrix = toMatrix(this.currentTransform(transformation));
            return this._rect.bbox(combinedMatrix);
        },

        rawBBox: function() {
            return this._rect.bbox();
        }
    });
    defineGeometryAccessors(Image.fn, ["rect"]);

    var GradientStop = Class.extend({
        init: function(offset, color, opacity) {
            this.options = new OptionsStore({
                offset: offset,
                color: color,
                opacity: defined(opacity) ? opacity : 1
            });
            this.options.addObserver(this);
        }
    });

    defineOptionsAccessors(GradientStop.fn, ["offset", "color", "opacity"]);
    deepExtend(GradientStop.fn, ObserversMixin);

    GradientStop.create = function(arg) {
        if (defined(arg)) {
            var stop;
            if (arg instanceof GradientStop) {
                stop = arg;
            } else if (arg.length > 1) {
                stop = new GradientStop(arg[0], arg[1], arg[2]);
            } else {
                stop = new GradientStop(arg.offset, arg.color, arg.opacity);
            }

            return stop;
        }
    };

    var StopsArray = ElementsArray.extend({
        _change: function() {
            this.optionsChange({
                field: "stops"
            });
        }
    });

    var Gradient = Class.extend({
        nodeType: "gradient",

        init: function(options) {
            this.stops = new StopsArray(this._createStops(options.stops));
            this.stops.addObserver(this);
            this._userSpace = options.userSpace;
            this.id = kendo.guid();
        },

        userSpace: function(value) {
            if (defined(value)) {
                this._userSpace = value;
                this.optionsChange();
                return this;
            } else {
                return this._userSpace;
            }
        },

        _createStops: function(stops) {
            var result = [];
            var idx;
            stops = stops || [];
            for (idx = 0; idx < stops.length; idx++) {
                result.push(GradientStop.create(stops[idx]));
            }

            return result;
        },

        addStop: function(offset, color, opacity) {
            this.stops.push(new GradientStop(offset, color, opacity));
        },

        removeStop: function(stop) {
            var index = this.stops.indexOf(stop);
            if (index >= 0) {
                this.stops.splice(index, 1);
            }
        }
    });

    deepExtend(Gradient.fn, ObserversMixin, {
        optionsChange: function(e) {
            this.trigger("optionsChange", {
                field: "gradient" + (e ? "." + e.field : ""),
                value: this
            });
        },

        geometryChange: function() {
            this.optionsChange();
        }
    });

    var LinearGradient = Gradient.extend({
        init: function(options) {
            options = options || {};
            Gradient.fn.init.call(this, options);

            this.start(options.start || new Point());

            this.end(options.end || new Point(1, 0));
        }
    });

    definePointAccessors(LinearGradient.fn, ["start", "end"]);

    var RadialGradient = Gradient.extend({
        init: function(options) {
            options = options || {};
            Gradient.fn.init.call(this, options);

            this.center(options.center  || new Point());
            this._radius = defined(options.radius) ? options.radius : 1;
            this._fallbackFill = options.fallbackFill;
        },

        radius: function(value) {
            if (defined(value)) {
                this._radius = value;
                this.geometryChange();
                return this;
            } else {
                return this._radius;
            }
        },

        fallbackFill: function(value) {
            if (defined(value)) {
                this._fallbackFill = value;
                this.optionsChange();
                return this;
            } else {
                return this._fallbackFill;
            }
        }
    });

    definePointAccessors(RadialGradient.fn, ["center"]);

    // Helper functions ===========================================
    function elementsBoundingBox(elements, applyTransform, transformation) {
        var boundingBox;

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.visible()) {
                var elementBoundingBox = applyTransform ? element.bbox(transformation) : element.rawBBox();
                if (elementBoundingBox) {
                    if (boundingBox) {
                        boundingBox = Rect.union(boundingBox, elementBoundingBox);
                    } else {
                        boundingBox = elementBoundingBox;
                    }
                }
            }
        }

        return boundingBox;
    }

    function elementsClippedBoundingBox(elements, transformation) {
        var boundingBox;

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.visible()) {
                var elementBoundingBox = element.clippedBBox(transformation);
                if (elementBoundingBox) {
                    if (boundingBox) {
                        boundingBox = Rect.union(boundingBox, elementBoundingBox);
                    } else {
                        boundingBox = elementBoundingBox;
                    }
                }
            }
        }

        return boundingBox;
    }

    function expandRect(rect, value) {
        rect.origin.x -= value;
        rect.origin.y -= value;
        rect.size.width += value * 2;
        rect.size.height += value * 2;
    }

    function defineGeometryAccessors(fn, names) {
        for (var i = 0; i < names.length; i++) {
            fn[names[i]] = geometryAccessor(names[i]);
        }
    }

    function geometryAccessor(name) {
        var fieldName = "_" + name;
        return function(value) {
            if (defined(value)) {
                this._observerField(fieldName, value);
                this.geometryChange();
                return this;
            } else {
                return this[fieldName];
            }
        };
    }

    function definePointAccessors(fn, names) {
        for (var i = 0; i < names.length; i++) {
            fn[names[i]] = pointAccessor(names[i]);
        }
    }

    function pointAccessor(name) {
        var fieldName = "_" + name;
        return function(value) {
            if (defined(value)) {
                this._observerField(fieldName, Point.create(value));
                this.geometryChange();
                return this;
            } else {
                return this[fieldName];
            }
        };
    }

    function defineOptionsAccessors(fn, names) {
        for (var i = 0; i < names.length; i++) {
            fn[names[i]] = optionsAccessor(names[i]);
        }
    }

    function optionsAccessor(name) {
        return function(value) {
            if (defined(value)) {
                this.options.set(name, value);
                return this;
            } else {
                return this.options.get(name);
            }
        };
    }

    // Exports ================================================================
    deepExtend(drawing, {
        Arc: Arc,
        Circle: Circle,
        Element: Element,
        ElementsArray: ElementsArray,
        Gradient: Gradient,
        GradientStop: GradientStop,
        Group: Group,
        Image: Image,
        LinearGradient: LinearGradient,
        MultiPath: MultiPath,
        Path: Path,
        RadialGradient: RadialGradient,
        Segment: Segment,
        Text: Text
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
