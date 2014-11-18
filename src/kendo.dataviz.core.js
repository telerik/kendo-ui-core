(function(f, define){
    define([
        "./kendo.core",
        "./kendo.drawing",
        "./kendo.util"
    ], f);
})(function(){

var __meta__ = {
    id: "dataviz.core",
    name: "Core",
    description: "The DataViz core functions",
    category: "dataviz",
    depends: [ "core" ],
    hidden: true
};

(function ($, undefined) {

    // Imports ================================================================
    var doc = document,
        kendo = window.kendo,
        util = kendo.util,
        valueOrDefault = util.valueOrDefault,
        dataviz = kendo.dataviz,
        geom = dataviz.geometry,
        draw = dataviz.drawing,
        measureText = draw.util.measureText,
        Matrix = geom.Matrix,
        Class = kendo.Class,
        template = kendo.template,
        map = $.map,
        noop = $.noop,
        indexOf = $.inArray,
        trim = $.trim,
        math = Math,
        deepExtend = kendo.deepExtend;

    var CSS_PREFIX = "k-";

    // Constants ==============================================================
    var ANIMATION_STEP = 10,
        AXIS_LABEL_CLICK = "axisLabelClick",
        BASELINE_MARKER_SIZE = 1,
        BLACK = "#000",
        BOTTOM = "bottom",
        CENTER = "center",
        COORD_PRECISION = 3,
        CLIP = "clip",
        CIRCLE = "circle",
        CROSS = "cross",
        DEFAULT_FONT = "12px sans-serif",
        DEFAULT_HEIGHT = 400,
        DEFAULT_PRECISION = 6,
        DEFAULT_WIDTH = 600,
        DEG_TO_RAD = math.PI / 180,
        FADEIN = "fadeIn",
        FORMAT_REGEX = /\{\d+:?/,
        HEIGHT = "height",
        ID_PREFIX = "k",
        ID_POOL_SIZE = 1000,
        ID_START = 10000,
        COORDINATE_LIMIT = 100000,
        INITIAL_ANIMATION_DURATION = 600,
        INSIDE = "inside",
        LEFT = "left",
        LINEAR = "linear",
        MAX_VALUE = Number.MAX_VALUE,
        MIN_VALUE = -Number.MAX_VALUE,
        NONE = "none",
        NOTE_CLICK = "noteClick",
        NOTE_HOVER = "noteHover",
        OUTSIDE = "outside",
        RADIAL = "radial",
        RIGHT = "right",
        SWING = "swing",
        TOP = "top",
        TRIANGLE = "triangle",
        UNDEFINED = "undefined",
        UPPERCASE_REGEX = /([A-Z])/g,
        WIDTH = "width",
        WHITE = "#fff",
        X = "x",
        Y = "y",
        ZERO_THRESHOLD = 0.2;

    function getSpacing(value, defaultSpacing) {
        var spacing = { top: 0, right: 0, bottom: 0, left: 0 };

        defaultSpacing = defaultSpacing || 0;

        if (typeof(value) === "number") {
            spacing[TOP] = spacing[RIGHT] = spacing[BOTTOM] = spacing[LEFT] = value;
        } else {
            spacing[TOP] = value[TOP] || defaultSpacing;
            spacing[RIGHT] = value[RIGHT] || defaultSpacing;
            spacing[BOTTOM] = value[BOTTOM] || defaultSpacing;
            spacing[LEFT] = value[LEFT] || defaultSpacing;
        }

        return spacing;
    }

    // Geometric primitives ===================================================
    var Point2D = function(x, y) {
        var point = this;
        if (!(point instanceof Point2D)) {
            return new Point2D(x, y);
        }

        point.x = x || 0;
        point.y = y || 0;
    };

    Point2D.fn = Point2D.prototype = {
        clone: function() {
            var point = this;

            return new Point2D(point.x, point.y);
        },

        equals: function(point) {
            return point && point.x === this.x && point.y === this.y;
        },

        rotate: function(center, degrees) {
            var point = this,
                theta = degrees * DEG_TO_RAD,
                cosT = math.cos(theta),
                sinT = math.sin(theta),
                cx = center.x,
                cy = center.y,
                x = point.x,
                y = point.y;

            point.x = round(
                cx + (x - cx) * cosT + (y - cy) * sinT,
                COORD_PRECISION
            );

            point.y = round(
                cy + (y - cy) * cosT - (x - cx) * sinT,
                COORD_PRECISION
            );

            return point;
        },

        multiply: function(a) {
            var point = this;

            point.x *= a;
            point.y *= a;

            return point;
        },

        distanceTo: function(point) {
            var dx = this.x - point.x,
                dy = this.y - point.y;

            return math.sqrt(dx * dx + dy * dy);
        }
    };

    // Clock-wise, 0 points left
    Point2D.onCircle = function(c, a, r) {
        a *= DEG_TO_RAD;

        return new Point2D(
            c.x - r * math.cos(a),
            c.y - r * math.sin(a)
        );
    };

    var Box2D = function(x1, y1, x2, y2) {
        var box = this;

        if (!(box instanceof Box2D)) {
            return new Box2D(x1, y1, x2, y2);
        }

        box.x1 = x1 || 0;
        box.x2 = x2 || 0;
        box.y1 = y1 || 0;
        box.y2 = y2 || 0;
    };

    Box2D.fn = Box2D.prototype = {
        width: function() {
            return this.x2 - this.x1;
        },

        height: function() {
            return this.y2 - this.y1;
        },

        translate: function(dx, dy) {
            var box = this;

            box.x1 += dx;
            box.x2 += dx;
            box.y1 += dy;
            box.y2 += dy;

            return box;
        },

        // TODO: Accept point!
        move: function(x, y) {
            var box = this,
                height = box.height(),
                width = box.width();

            if (defined(x)) {
                box.x1 = x;
                box.x2 = box.x1 + width;
            }

            if (defined(y)) {
                box.y1 = y;
                box.y2 = box.y1 + height;
            }

            return box;
        },

        wrap: function(targetBox) {
            var box = this;

            box.x1 = math.min(box.x1, targetBox.x1);
            box.y1 = math.min(box.y1, targetBox.y1);
            box.x2 = math.max(box.x2, targetBox.x2);
            box.y2 = math.max(box.y2, targetBox.y2);

            return box;
        },

        wrapPoint: function(point) {
            this.wrap(new Box2D(point.x, point.y, point.x, point.y));

            return this;
        },

        snapTo: function(targetBox, axis) {
            var box = this;

            if (axis == X || !axis) {
                box.x1 = targetBox.x1;
                box.x2 = targetBox.x2;
            }

            if (axis == Y || !axis) {
                box.y1 = targetBox.y1;
                box.y2 = targetBox.y2;
            }

            return box;
        },

        alignTo: function(targetBox, anchor) {
            var box = this,
                height = box.height(),
                width = box.width(),
                axis = anchor == TOP || anchor == BOTTOM ? Y : X,
                offset = axis == Y ? height : width;

            if (anchor === CENTER) {
                var targetCenter = targetBox.center();
                var center = box.center();

                box.x1 += targetCenter.x - center.x;
                box.y1 += targetCenter.y - center.y;
            } else if (anchor === TOP || anchor === LEFT) {
                box[axis + 1] = targetBox[axis + 1] - offset;
            } else {
                box[axis + 1] = targetBox[axis + 2];
            }

            box.x2 = box.x1 + width;
            box.y2 = box.y1 + height;

            return box;
        },

        shrink: function(dw, dh) {
            var box = this;

            box.x2 -= dw;
            box.y2 -= dh;

            return box;
        },

        expand: function(dw, dh) {
            this.shrink(-dw, -dh);
            return this;
        },

        pad: function(padding) {
            var box = this,
                spacing = getSpacing(padding);

            box.x1 -= spacing.left;
            box.x2 += spacing.right;
            box.y1 -= spacing.top;
            box.y2 += spacing.bottom;

            return box;
        },

        unpad: function(padding) {
            var box = this,
                spacing = getSpacing(padding);

            spacing.left = -spacing.left;
            spacing.top = -spacing.top;
            spacing.right = -spacing.right;
            spacing.bottom = -spacing.bottom;

            return box.pad(spacing);
        },

        clone: function() {
            var box = this;

            return new Box2D(box.x1, box.y1, box.x2, box.y2);
        },

        center: function() {
            var box = this;

            return new Point2D(
                box.x1 + box.width() / 2,
                box.y1 + box.height() / 2
            );
        },

        containsPoint: function(point) {
            var box = this;

            return point.x >= box.x1 && point.x <= box.x2 &&
                   point.y >= box.y1 && point.y <= box.y2;
        },

        points: function() {
            var box = this;

            return [
                new Point2D(box.x1, box.y1),
                new Point2D(box.x2, box.y1),
                new Point2D(box.x2, box.y2),
                new Point2D(box.x1, box.y2)
            ];
        },

        getHash: function() {
            var box = this;

            return [box.x1, box.y1, box.x2, box.y2].join(",");
        },

        overlaps: function(box) {
            return !(box.y2 < this.y1 || this.y2 < box.y1 || box.x2 < this.x1 || this.x2 < box.x1);
        },

        rotate: function(rotation) {
            var box = this;
            var width = box.width();
            var height = box.height();
            var center = box.center();
            var cx = center.x;
            var cy = center.y;
            var r1 = rotatePoint(0, 0, cx, cy, rotation);
            var r2 = rotatePoint(width, 0, cx, cy, rotation);
            var r3 = rotatePoint(width, height, cx, cy, rotation);
            var r4 = rotatePoint(0, height, cx, cy, rotation);
            width = math.max(r1.x, r2.x, r3.x, r4.x) - math.min(r1.x, r2.x, r3.x, r4.x);
            height = math.max(r1.y, r2.y, r3.y, r4.y) - math.min(r1.y, r2.y, r3.y, r4.y);
            box.x2 =  box.x1 + width;
            box.y2 = box.y1 + height;

            return box;
        },

        toRect: function() {
            return new geom.Rect([this.x1, this.y1], [this.width(), this.height()]);
        }
    };

    var Ring = Class.extend({
        init: function(center, innerRadius, radius, startAngle, angle) {
            var ring = this;

            ring.c = center;
            ring.ir = innerRadius;
            ring.r = radius;
            ring.startAngle = startAngle;
            ring.angle = angle;
        },

        clone: function() {
            var r = this;
            return new Ring(r.c, r.ir, r.r, r.startAngle, r.angle);
        },

        // TODO: Rename to midAngle
        middle: function() {
            return this.startAngle + this.angle / 2;
        },

        // TODO: Sounds like a getter
        radius: function(newRadius, innerRadius) {
            var that = this;

            if (innerRadius) {
                that.ir = newRadius;
            } else {
                that.r = newRadius;
            }

            return that;
        },

        // TODO: Remove and replace with Point2D.onCircle
        point: function(angle, innerRadius) {
            var ring = this,
                radianAngle = angle * DEG_TO_RAD,
                ax = math.cos(radianAngle),
                ay = math.sin(radianAngle),
                radius = innerRadius ? ring.ir : ring.r,
                x = round(ring.c.x - (ax * radius), COORD_PRECISION),
                y = round(ring.c.y - (ay * radius), COORD_PRECISION);

            return new Point2D(x, y);
        },

        adjacentBox: function(distance, width, height) {
            var sector = this.clone().expand(distance),
                midAndle = sector.middle(),
                midPoint = sector.point(midAndle),
                hw = width / 2,
                hh = height / 2,
                x = midPoint.x - hw,
                y = midPoint.y - hh,
                sa = math.sin(midAndle * DEG_TO_RAD),
                ca = math.cos(midAndle * DEG_TO_RAD);

            if (math.abs(sa) < 0.9) {
                x += hw * -ca / math.abs(ca);
            }

            if (math.abs(ca) < 0.9) {
                y += hh * -sa / math.abs(sa);
            }

            return new Box2D(x, y, x + width, y + height);
        },

        containsPoint: function(p) {
            var ring = this,
                c = ring.c,
                ir = ring.ir,
                r = ring.r,
                startAngle = ring.startAngle,
                endAngle = ring.startAngle + ring.angle,
                dx = p.x - c.x,
                dy = p.y - c.y,
                vector = new Point2D(dx, dy),
                startPoint = ring.point(startAngle),
                startVector = new Point2D(startPoint.x - c.x, startPoint.y - c.y),
                endPoint = ring.point(endAngle),
                endVector = new Point2D(endPoint.x - c.x, endPoint.y - c.y),
                dist = round(dx * dx + dy *dy, COORD_PRECISION);

            return (startVector.equals(vector) || clockwise(startVector, vector)) &&
                   !clockwise(endVector, vector) &&
                   dist >= ir * ir && dist <= r * r;
        },

        getBBox: function() {
            var ring = this,
                box = new Box2D(MAX_VALUE, MAX_VALUE, MIN_VALUE, MIN_VALUE),
                sa = round(ring.startAngle % 360),
                ea = round((sa + ring.angle) % 360),
                innerRadius = ring.ir,
                allAngles = [0, 90, 180, 270, sa, ea].sort(numericComparer),
                saIndex = indexOf(sa, allAngles),
                eaIndex = indexOf(ea, allAngles),
                angles,
                i,
                point;

            if (sa == ea) {
                angles = allAngles;
            } else {
                if (saIndex < eaIndex) {
                    angles = allAngles.slice(saIndex, eaIndex + 1);
                } else {
                    angles = [].concat(
                        allAngles.slice(0, eaIndex + 1),
                        allAngles.slice(saIndex, allAngles.length)
                    );
                }
            }

            for (i = 0; i < angles.length; i++) {
                point = ring.point(angles[i]);
                box.wrapPoint(point);
                box.wrapPoint(point, innerRadius);
            }

            if (!innerRadius) {
                box.wrapPoint(ring.c);
            }

            return box;
        },

        expand: function(value) {
            this.r += value;
            return this;
        }
    });

    // TODO: Remove, looks like an alias
    var Sector = Ring.extend({
        init: function(center, radius, startAngle, angle) {
            Ring.fn.init.call(this, center, 0, radius, startAngle, angle);
        },

        expand: function(value) {
            return Ring.fn.expand.call(this, value);
        },

        clone: function() {
            var sector = this;
            return new Sector(sector.c, sector.r, sector.startAngle, sector.angle);
        },

        radius: function(newRadius) {
            return Ring.fn.radius.call(this, newRadius);
        },

        point: function(angle) {
            return Ring.fn.point.call(this, angle);
        }
    });

    var ShapeBuilder = function() {};
    ShapeBuilder.fn = ShapeBuilder.prototype = {
        createRing: function (sector, options) {
            var startAngle = sector.startAngle + 180;
            var endAngle = sector.angle + startAngle;
            var center = new geom.Point(sector.c.x, sector.c.y);
            var radius = math.max(sector.r, 0);
            var innerRadius = math.max(sector.ir, 0);
            var arc = new geom.Arc(center, {
                startAngle: startAngle,
                endAngle: endAngle,
                radiusX: radius,
                radiusY: radius
            });
            var path = draw.Path.fromArc(arc, options).close();

            if (innerRadius)  {
                arc.radiusX = arc.radiusY = innerRadius;
                var innerEnd = arc.pointAt(endAngle);
                path.lineTo(innerEnd.x, innerEnd.y);
                path.arc(endAngle, startAngle, innerRadius, innerRadius, true);
            } else {
                path.lineTo(center.x, center.y);
            }

            return path;
        }
    };

    ShapeBuilder.current = new ShapeBuilder();

    // View-Model primitives ==================================================
    var ChartElement = Class.extend({
        init: function(options) {
            var element = this;
            element.children = [];

            element.options = deepExtend({}, element.options, options);
        },

        reflow: function(targetBox) {
            var element = this,
                children = element.children,
                box,
                i,
                currentChild;

            for (i = 0; i < children.length; i++) {
                currentChild = children[i];

                currentChild.reflow(targetBox);
                box = box ? box.wrap(currentChild.box) : currentChild.box.clone();
            }

            element.box = box || targetBox;
        },

        destroy: function() {
            var element = this,
                children = element.children,
                root = element.getRoot(),
                i;

            if (this.animation) {
                this.animation.destroy();
            }

            for (i = 0; i < children.length; i++) {
                children[i].destroy();
            }
        },

        getRoot: function() {
            var parent = this.parent;

            return parent ? parent.getRoot() : null;
        },

        translateChildren: function(dx, dy) {
            var element = this,
                children = element.children,
                childrenCount = children.length,
                i;

            for (i = 0; i < childrenCount; i++) {
                children[i].box.translate(dx, dy);
            }
        },

        append: function() {
            append(this.children, arguments);

            for (var i = 0; i < arguments.length; i++) {
                arguments[i].parent = this;
            }
        },

        renderVisual: function() {
            if (this.options.visible === false) {
                return;
            }

            this.createVisual();

            if (this.visual) {
                this.visual.chartElement = this;

                if (this.parent) {
                    this.parent.appendVisual(this.visual);
                }
            }

            var children = this.children;
            for (var i = 0; i < children.length; i++) {
                children[i].renderVisual();
            }

            this.createAnimation();
            this.renderComplete();
        },

        createVisual: function() {
            this.visual = new dataviz.drawing.Group({
                zIndex: this.options.zIndex,
                visible: valueOrDefault(this.options.visible, true)
            });
        },

        createAnimation: function() {
            if (this.visual) {
                this.animation = draw.Animation.create(
                    this.visual, this.options.animation
                );
            }
        },

        appendVisual: function(childVisual) {
            if (!childVisual.chartElement) {
                childVisual.chartElement = this;
            }

            if (childVisual.options.noclip) {
                this.getRoot().visual.append(childVisual);
            } else if (defined(childVisual.options.zIndex)) {
                this.stackRoot().stackVisual(childVisual);
            } else if (this.visual) {
                this.visual.append(childVisual);
            } else {
                // Allow chart elements without visuals to
                // pass through child visuals
                this.parent.appendVisual(childVisual);
            }
        },

        stackRoot: function() {
            if (this.parent) {
                return this.parent.stackRoot();
            }

            return this;
        },

        stackVisual: function(childVisual) {
            var zIndex = childVisual.options.zIndex || 0;
            var visuals = this.visual.children;
            for (var pos = 0; pos < visuals.length; pos++) {
                var sibling = visuals[pos];
                var here = valueOrDefault(sibling.options.zIndex, 0);
                if (here > zIndex) {
                    break;
                }
            }

            this.visual.insertAt(childVisual, pos);
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

        closest: function(match) {
            var element = this;
            var matched = false;

            while (element && !matched) {
                matched = match(element);

                if (!matched) {
                    element = element.parent;
                }
            }

            if (matched) {
                return element;
            }
        },

        renderComplete: $.noop,

        toggleHighlight: function(show) {
            var highlight = this._highlight;
            var options = this.options.highlight;

            if (!this.createHighlight || (options && options.visible === false)) {
                return;
            }

            if (!highlight) {
                highlight = this._highlight = this.createHighlight({
                    fill: {
                        color: WHITE,
                        opacity: 0.2
                    },
                    stroke : {
                        color: WHITE,
                        width: 1,
                        opacity: 0.2
                    }
                });

                this.appendVisual(highlight);
            }

            highlight.visible(show);
        },

        createGradientOverlay: function(element, options, gradientOptions) {
            var overlay = new draw.Path(deepExtend({
                stroke: {
                    color: NONE
                },
                fill: this.createGradient(gradientOptions),
                closed: element.options.closed
            }, options));
            overlay.segments.elements(element.segments.elements());

            return overlay;
        },

        createGradient: function(options) {
            if (this.parent) {
                return this.parent.createGradient(options);
            }
        }
    });

    var RootElement = ChartElement.extend({
        init: function(options) {
            var root = this;

            // Logical tree ID to element map
            root.modelMap = {};
            root.gradients = {};

            ChartElement.fn.init.call(root, options);
        },

        options: {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            background: WHITE,
            border: {
                color: BLACK,
                width: 0
            },
            margin: getSpacing(5),
            zIndex: -2
        },

        reflow: function() {
            var root = this,
                options = root.options,
                children = root.children,
                currentBox = new Box2D(0, 0, options.width, options.height);

            root.box = currentBox.unpad(options.margin);

            for (var i = 0; i < children.length; i++) {
                children[i].reflow(currentBox);
                currentBox = boxDiff(currentBox, children[i].box);
            }
        },

        createVisual: function() {
            this.visual = new draw.Group();
            this.createBackground();
        },

        createBackground: function() {
            var options = this.options;
            var border = options.border || {};
            var box = this.box.clone().pad(options.margin).unpad(border.width);

            var background = draw.Path.fromRect(box.toRect(), {
                stroke: {
                    color: border.width ? border.color : "",
                    width: border.width,
                    dashType: border.dashType
                },
                fill: {
                    color: options.background,
                    opacity: options.opacity
                },
                zIndex: -10
            });

            this.visual.append(background);
        },

        getRoot: function() {
            return this;
        },

        createGradient: function(options) {
            var gradients = this.gradients;
            var hashCode = util.objectKey(options);
            var gradient = dataviz.Gradients[options.gradient];
            var drawingGradient;
            if (gradients[hashCode]) {
                drawingGradient = gradients[hashCode];
            } else {
                var gradientOptions = deepExtend({}, gradient, options);
                if (gradient.type == "linear") {
                    drawingGradient = new draw.LinearGradient(gradientOptions);
                } else {
                    if (options.innerRadius) {
                        gradientOptions.stops = innerRadialStops(gradientOptions);
                    }
                    drawingGradient = new draw.RadialGradient(gradientOptions);
                    drawingGradient.supportVML = gradient.supportVML !== false;
                }
                gradients[hashCode] = drawingGradient;
            }
            return drawingGradient;
        }
    });

    var BoxElement = ChartElement.extend({
        options: {
            align: LEFT,
            vAlign: TOP,
            margin: {},
            padding: {},
            border: {
                color: BLACK,
                width: 0
            },
            background: "",
            shrinkToFit: false,
            width: 0,
            height: 0,
            visible: true
        },

        reflow: function(targetBox) {
            var element = this,
                box,
                contentBox,
                options = element.options,
                width = options.width,
                height = options.height,
                hasSetSize = width && height,
                shrinkToFit = options.shrinkToFit,
                margin = getSpacing(options.margin),
                padding = getSpacing(options.padding),
                borderWidth = options.border.width,
                children = element.children,
                i, item;

            function reflowPaddingBox() {
                element.align(targetBox, X, options.align);
                element.align(targetBox, Y, options.vAlign);
                element.paddingBox = box.clone().unpad(margin).unpad(borderWidth);
            }

            contentBox = targetBox.clone();
            if (hasSetSize) {
                contentBox.x2 = contentBox.x1 + width;
                contentBox.y2 = contentBox.y1 + height;
            }

            if (shrinkToFit) {
                contentBox.unpad(margin).unpad(borderWidth).unpad(padding);
            }

            ChartElement.fn.reflow.call(element, contentBox);

            if (hasSetSize) {
                box = element.box = Box2D(0, 0, width, height);
            } else {
                box = element.box;
            }

            if (shrinkToFit && hasSetSize) {
                reflowPaddingBox();
                contentBox = element.contentBox = element.paddingBox.clone().unpad(padding);
            } else {
                contentBox = element.contentBox = box.clone();
                box.pad(padding).pad(borderWidth).pad(margin);
                reflowPaddingBox();
            }

            element.translateChildren(
                box.x1 - contentBox.x1 + margin.left + borderWidth + padding.left,
                box.y1 - contentBox.y1 + margin.top + borderWidth + padding.top);

            for (i = 0; i < children.length; i++) {
                item = children[i];
                item.reflow(item.box);
            }
        },

        align: function(targetBox, axis, alignment) {
            var element = this,
                box = element.box,
                c1 = axis + 1,
                c2 = axis + 2,
                sizeFunc = axis === X ? WIDTH : HEIGHT,
                size = box[sizeFunc]();

            if (inArray(alignment, [LEFT, TOP])) {
                box[c1] = targetBox[c1];
                box[c2] = box[c1] + size;
            } else if (inArray(alignment, [RIGHT, BOTTOM])) {
                box[c2] = targetBox[c2];
                box[c1] = box[c2] - size;
            } else if (alignment == CENTER) {
                box[c1] = targetBox[c1] + (targetBox[sizeFunc]() - size) / 2;
                box[c2] = box[c1] + size;
            }
        },

        hasBox: function() {
            var options = this.options;
            return options.border.width || options.background;
        },

        createVisual: function() {
            ChartElement.fn.createVisual.call(this);

            var options = this.options;
            if (options.visible && this.hasBox()) {
                this.visual.append(draw.Path.fromRect(
                    this.paddingBox.toRect(), this.visualStyle()
                ));
            }
        },

        visualStyle: function() {
            var boxElement = this,
                options = boxElement.options,
                border = options.border || {};

            return {
                stroke: {
                    width: border.width,
                    color: border.color,
                    opacity: valueOrDefault(border.opacity, options.opacity),
                    dashType: border.dashType
                },
                fill: {
                    color: options.background,
                    opacity: options.opacity
                },
                cursor: options.cursor
            };
        }
    });

    var Text = ChartElement.extend({
        init: function(content, options) {
            var text = this;

            ChartElement.fn.init.call(text, options);

            text.content = content;

            // Calculate size
            text.reflow(Box2D());
        },

        options: {
            font: DEFAULT_FONT,
            color: BLACK,
            align: LEFT,
            vAlign: ""
        },

        reflow: function(targetBox) {
            var text = this,
                options = text.options,
                size,
                margin;

            size = options.size =
                measureText(text.content, { font: options.font });

            text.baseline = size.baseline;

            text.box = Box2D(targetBox.x1, targetBox.y1,
                    targetBox.x1 + size.width, targetBox.y1 + size.height);
        },

        createVisual: function() {
            var opt = this.options;

            this.visual = new draw.Text(this.content, this.box.toRect().topLeft(), {
                font: opt.font,
                fill: { color: opt.color, opacity: opt.opacity },
                cursor: opt.cursor
            });
        }
    });

    var FloatElement = ChartElement.extend({
        init: function(options) {
            ChartElement.fn.init.call(this, options);
            this._initDirection();
        },

        _initDirection: function() {
            var options = this.options;
            if (options.vertical) {
                this.groupAxis = X;
                this.elementAxis = Y;
                this.groupSizeField = WIDTH;
                this.elementSizeField = HEIGHT;
                this.groupSpacing = options.spacing;
                this.elementSpacing = options.vSpacing;
            } else {
                this.groupAxis = Y;
                this.elementAxis = X;
                this.groupSizeField = HEIGHT;
                this.elementSizeField = WIDTH;
                this.groupSpacing = options.vSpacing;
                this.elementSpacing = options.spacing;
            }
        },

        options: {
            vertical: true,
            wrap: true,
            vSpacing: 0,
            spacing: 0
        },

        reflow: function(targetBox) {
            this.box = targetBox.clone();
            this.reflowChildren();
        },

        reflowChildren: function() {
            var floatElement = this;
            var box = floatElement.box;
            var options = floatElement.options;
            var elementSpacing = floatElement.elementSpacing;
            var groupSpacing = floatElement.groupSpacing;

            var elementAxis = floatElement.elementAxis;
            var groupAxis = floatElement.groupAxis;
            var elementSizeField = floatElement.elementSizeField;
            var groupSizeField = floatElement.groupSizeField;

            var groupOptions = floatElement.groupOptions();
            var groups = groupOptions.groups;
            var groupsCount = groups.length;

            var groupsStart = box[groupAxis + 1] +
                floatElement.alignStart(groupOptions.groupsSize, box[groupSizeField]());

            var groupStart = groupsStart;
            var elementStart;
            var groupElementStart;

            var group;
            var groupElements;
            var groupElementsCount;

            var idx;
            var groupIdx;

            var element;
            var elementBox;
            var elementSize;

            if (groupsCount) {
                for (groupIdx = 0; groupIdx < groupsCount; groupIdx++) {
                    group = groups[groupIdx];
                    groupElements = group.groupElements;
                    groupElementsCount = groupElements.length;
                    elementStart = box[elementAxis + 1];
                    for (idx = 0; idx < groupElementsCount; idx++) {
                        element = groupElements[idx];
                        elementSize = floatElement.elementSize(element);
                        groupElementStart = groupStart +
                            floatElement.alignStart(elementSize[groupSizeField], group.groupSize);

                        elementBox = Box2D();
                        elementBox[groupAxis + 1] = groupElementStart;
                        elementBox[groupAxis + 2] = groupElementStart + elementSize[groupSizeField];
                        elementBox[elementAxis + 1] = elementStart;
                        elementBox[elementAxis + 2] = elementStart + elementSize[elementSizeField];

                        element.reflow(elementBox);

                        elementStart += elementSize[elementSizeField] + floatElement.elementSpacing;
                    }
                    groupStart += group.groupSize + floatElement.groupSpacing;
                }
                box[groupAxis + 1] = groupsStart;
                box[groupAxis + 2] = groupsStart + groupOptions.groupsSize;
                box[elementAxis + 2] = box[elementAxis + 1] + groupOptions.maxGroupElementsSize;
            }
        },

        alignStart: function(size, maxSize) {
            var start = 0;
            var align = this.options.align;
            if (align == RIGHT || align == BOTTOM) {
                start = maxSize - size;
            } else if (align == CENTER){
                start = (maxSize - size) / 2;
            }
            return start;
        },

        groupOptions: function() {
            var floatElement = this;
            var box = floatElement.box;
            var children = floatElement.children;
            var childrenCount = children.length;
            var elementSizeField = this.elementSizeField;
            var groupSizeField = this.groupSizeField;
            var elementSpacing = this.elementSpacing;
            var groupSpacing = this.groupSpacing;
            var maxSize = round(box[elementSizeField]());
            var idx = 0;
            var groupSize = 0;
            var elementSize;
            var element;
            var groupElementsSize = 0;
            var groupsSize = 0;
            var groups = [];
            var groupElements = [];
            var maxGroupElementsSize = 0;

            for (idx = 0; idx < childrenCount; idx++) {
                element = children[idx];
                if (!element.box) {
                    element.reflow(box);
                }

                elementSize = this.elementSize(element);
                if (floatElement.options.wrap && round(groupElementsSize + elementSpacing + elementSize[elementSizeField]) > maxSize) {
                    groups.push({
                        groupElements: groupElements,
                        groupSize: groupSize,
                        groupElementsSize: groupElementsSize
                    });
                    maxGroupElementsSize = math.max(maxGroupElementsSize, groupElementsSize);
                    groupsSize += groupSpacing + groupSize;
                    groupSize = 0;
                    groupElementsSize = 0;
                    groupElements = [];
                }
                groupSize = math.max(groupSize, elementSize[groupSizeField]);
                if (groupElementsSize > 0) {
                    groupElementsSize += elementSpacing;
                }
                groupElementsSize += elementSize[elementSizeField];
                groupElements.push(element);
            }

            groups.push({
                groupElements: groupElements,
                groupSize: groupSize,
                groupElementsSize: groupElementsSize
            });
            maxGroupElementsSize = math.max(maxGroupElementsSize, groupElementsSize);
            groupsSize += groupSize;

            return {
                groups: groups,
                groupsSize: groupsSize,
                maxGroupElementsSize: maxGroupElementsSize
            };
        },

        elementSize: function(element) {
            return {
                width: element.box.width(),
                height: element.box.height()
            };
        },

        createVisual: noop
    });

    var TextBox = BoxElement.extend({
        ROWS_SPLIT_REGEX: /\n|\\n/m,

        init: function(content, options) {
            var textbox = this;
            textbox.content = content;

            BoxElement.fn.init.call(textbox, options);

            textbox._initContainer();

            textbox.reflow(Box2D());
        },

        _initContainer: function() {
            var textbox = this;
            var options = textbox.options;
            var rows = (textbox.content + "").split(textbox.ROWS_SPLIT_REGEX);
            var floatElement = new FloatElement({vertical: true, align: options.align, wrap: false});
            var textOptions = deepExtend({ }, options, { opacity: 1, animation: null });
            var hasBox = textbox.hasBox();
            var text;
            var rowIdx;

            textbox.container = floatElement;
            textbox.append(floatElement);

            for (rowIdx = 0; rowIdx < rows.length; rowIdx++) {
                text = new Text(trim(rows[rowIdx]), textOptions);
                floatElement.append(text);
            }
        },

        reflow: function(targetBox) {
            var textbox = this;
            var options = textbox.options;
            var align = options.align;
            var rotation = options.rotation;
            textbox.container.options.align = align;
            BoxElement.fn.reflow.call(textbox, targetBox);
            if (rotation) {
                var margin = options.margin;
                var box = textbox.box.unpad(margin);
                textbox.normalBox = box.clone();
                box.rotate(rotation);
                box.pad(margin);
                textbox.align(targetBox, X, align);
                textbox.align(targetBox, Y, options.vAlign);
            }
        },

        createVisual: function() {
            var options = this.options;

            if (!options.visible) {
                return;
            }

            this.visual = new dataviz.drawing.Group({
                transform: this.rotationTransform(),
                zIndex: options.zIndex,
                noclip: options.noclip
            });

            if (this.hasBox()) {
                var box = draw.Path.fromRect(this.paddingBox.toRect(), this.visualStyle());
                this.visual.append(box);
            }
        },

        rotationTransform: function() {
            var rotation = this.options.rotation;
            if (!rotation) {
                return null;
            }

            var center = this.normalBox.center();
            var cx = center.x;
            var cy = center.y;
            var boxCenter = this.box.center();

            return geom.transform()
                       .translate(boxCenter.x - cx, boxCenter.y - cy)
                       .rotate(rotation, [cx, cy]);
        },

        rotationMatrix: function() {
            var textbox = this;
            var options = textbox.options;
            var normalBox = textbox.normalBox;
            var center = normalBox.center();
            var cx = center.x;
            var cy = center.y;
            var boxCenter = textbox.box.center();
            var offsetX = boxCenter.x - cx;
            var offsetY = boxCenter.y - cy;
            var matrix = Matrix.translate(offsetX, offsetY)
                    .times(Matrix.rotate(options.rotation, cx, cy));

            return matrix;
        }
    });

    var Title = ChartElement.extend({
        init: function(options) {
            var title = this;
            ChartElement.fn.init.call(title, options);

            options = title.options;
            title.append(
                new TextBox(options.text, deepExtend({}, options, {
                    vAlign: options.position
                }))
            );
        },

        options: {
            color: BLACK,
            position: TOP,
            align: CENTER,
            margin: getSpacing(5),
            padding: getSpacing(5)
        },

        reflow: function(targetBox) {
            var title = this;

            ChartElement.fn.reflow.call(title, targetBox);
            title.box.snapTo(targetBox, X);
        }
    });

    Title.buildTitle = function(options, parent, defaultOptions) {
        var title;

        if (typeof options === "string") {
            options = { text: options };
        }

        options = deepExtend({ visible: true }, defaultOptions, options);

        if (options && options.visible && options.text) {
            title = new Title(options);
            parent.append(title);
        }

        return title;
    };

    var AxisLabel = TextBox.extend({
        init: function(value, text, index, dataItem, options) {
            var label = this;

            label.text = text;
            label.value = value;
            label.index = index;
            label.dataItem = dataItem;

            TextBox.fn.init.call(label, text, options);
        },

        click: function(widget, e) {
            var label = this;

            widget.trigger(AXIS_LABEL_CLICK, {
                element: $(e.target),
                value: label.value,
                text: label.text,
                index: label.index,
                dataItem: label.dataItem,
                axis: label.parent.options
            });
        }
    });

    function createAxisTick(options, tickOptions) {
        var tickX = options.tickX,
            tickY = options.tickY,
            position = options.position;

        var tick = new draw.Path({
            stroke: {
                width: tickOptions.width,
                color: tickOptions.color
            }
        });

        if (options.vertical) {
            tick.moveTo(tickX, position)
                .lineTo(tickX + tickOptions.size, position);
        } else {
            tick.moveTo(position, tickY)
                .lineTo(position, tickY + tickOptions.size);
        }

        alignPathToPixel(tick);

        return tick;
    }

    function createAxisGridLine(options, gridLine) {
        var lineStart = options.lineStart,
            lineEnd = options.lineEnd,
            position = options.position,
            start, end;

        var line = new draw.Path({
            stroke: {
                width: gridLine.width,
                color: gridLine.color,
                dashType: gridLine.dashType
            }
        });

        if (options.vertical) {
            line.moveTo(lineStart, position)
                .lineTo(lineEnd, position);
        } else {
            line.moveTo(position, lineStart)
                .lineTo(position, lineEnd);
        }

        alignPathToPixel(line);

        return line;
    }

    var Axis = ChartElement.extend({
        init: function(options) {
            var axis = this;

            ChartElement.fn.init.call(axis, options);

            if (!axis.options.visible) {
                axis.options = deepExtend({}, axis.options, {
                    labels: {
                        visible: false
                    },
                    line: {
                        visible: false
                    },
                    margin: 0,
                    majorTickSize: 0,
                    minorTickSize: 0
                });
            }

            axis.options.minorTicks = deepExtend({}, {
                color: axis.options.line.color,
                width: axis.options.line.width,
                visible: axis.options.minorTickType != NONE
            }, axis.options.minorTicks, {
                size: axis.options.minorTickSize,
                align: axis.options.minorTickType
            });

            axis.options.majorTicks = deepExtend({}, {
                color: axis.options.line.color,
                width: axis.options.line.width,
                visible: axis.options.majorTickType != NONE
            }, axis.options.majorTicks, {
                size: axis.options.majorTickSize,
                align: axis.options.majorTickType
            });

            axis.createLabels();
            axis.createTitle();
            axis.createNotes();
        },

        options: {
            labels: {
                visible: true,
                rotation: 0,
                mirror: false,
                step: 1,
                skip: 0
            },
            line: {
                width: 1,
                color: BLACK,
                visible: true
            },
            title: {
                visible: true,
                position: CENTER
            },
            majorTicks: {
                align: OUTSIDE,
                size: 4,
                skip: 0,
                step: 1
            },
            minorTicks: {
                align: OUTSIDE,
                size: 3,
                skip: 0,
                step: 1
            },
            axisCrossingValue: 0,
            majorTickType: OUTSIDE,
            minorTickType: NONE,
            majorGridLines: {
                skip: 0,
                step: 1
            },
            minorGridLines: {
                visible: false,
                width: 1,
                color: BLACK,
                skip: 0,
                step: 1
            },
            // TODO: Move to line or labels options
            margin: 5,
            visible: true,
            reverse: false,
            justified: true,
            notes: {
                label: {
                    text: ""
                }
            },

            _alignLines: true
        },

        // abstract labelsCount(): Number
        // abstract createAxisLabel(index, options): AxisLabel

        createLabels: function() {
            var axis = this,
                options = axis.options,
                align = options.vertical ? RIGHT : CENTER,
                labelOptions = deepExtend({ }, options.labels, {
                    align: align,
                    zIndex: options.zIndex
                }),
                step = labelOptions.step;

            axis.labels = [];

            if (labelOptions.visible) {
                var labelsCount = axis.labelsCount(),
                    label,
                    i;

                for (i = labelOptions.skip; i < labelsCount; i += step) {
                    label = axis.createAxisLabel(i, labelOptions);
                    if (label) {
                        axis.append(label);
                        axis.labels.push(label);
                    }
                }
            }
        },

        lineBox: function() {
            var axis = this,
                options = axis.options,
                box = axis.box,
                vertical = options.vertical,
                labels = axis.labels,
                labelSize = vertical ? HEIGHT : WIDTH,
                justified = options.justified,
                mirror = options.labels.mirror,
                axisX = mirror ? box.x1 : box.x2,
                axisY = mirror ? box.y2 : box.y1,
                startMargin = 0,
                endMargin = options.line.width;

            if (justified && labels.length > 1) {
                startMargin = labels[0].box[labelSize]() / 2;
                endMargin = last(labels).box[labelSize]() / 2;
            }

            return vertical ?
                Box2D(axisX, box.y1 + startMargin, axisX, box.y2 - endMargin) :
                Box2D(box.x1 + startMargin, axisY, box.x2 - endMargin, axisY);
        },

        createTitle: function() {
            var axis = this,
                options = axis.options,
                titleOptions = deepExtend({
                    rotation: options.vertical ? -90 : 0,
                    text: "",
                    zIndex: 1
                }, options.title),
                title;

            if (titleOptions.visible && titleOptions.text) {
                title = new TextBox(titleOptions.text, titleOptions);
                axis.append(title);
                axis.title = title;
            }
        },

        createNotes: function() {
            var axis = this,
                options = axis.options,
                notes = options.notes,
                items = notes.data || [],
                noteTemplate, i, text, item, note;

            axis.notes = [];

            for (i = 0; i < items.length; i++) {
                item = deepExtend({}, notes, items[i]);
                item.value = axis.parseNoteValue(item.value);

                note = new Note(item.value, item.label.text, null, null, null, item);

                if (note.options.visible) {
                    if (defined(note.options.position)) {
                        if (options.vertical && !inArray(note.options.position, [LEFT, RIGHT])) {
                            note.options.position = options.reverse ? LEFT : RIGHT;
                        } else if (!options.vertical && !inArray(note.options.position, [TOP, BOTTOM])) {
                            note.options.position = options.reverse ? BOTTOM : TOP;
                        }
                    } else {
                        if (options.vertical) {
                            note.options.position = options.reverse ? LEFT : RIGHT;
                        } else {
                            note.options.position = options.reverse ? BOTTOM : TOP;
                        }
                    }
                    axis.append(note);
                    axis.notes.push(note);
                }
            }
        },

        parseNoteValue: function(value) {
            return value;
        },

        createVisual: function() {
            ChartElement.fn.createVisual.call(this);

            this.createPlotBands();
            this.createBackground();
            this.createLine();
        },

        gridLinesVisual: function() {
            var gridLines = this._gridLines;
            if (!gridLines) {
                gridLines = this._gridLines = new draw.Group({
                    zIndex: -2
                });
                this.appendVisual(this._gridLines);
            }

            return gridLines;
        },

        createTicks: function(lineGroup) {
            var axis = this,
                options = axis.options,
                lineBox = axis.lineBox(),
                mirror = options.labels.mirror,
                majorUnit = options.majorTicks.visible ? options.majorUnit : 0,
                tickLineOptions= {
                    // TODO
                    // _alignLines: options._alignLines,
                    vertical: options.vertical
                },
                start, end;

            function render(tickPositions, tickOptions, skipUnit) {
                var i, count = tickPositions.length;

                if (tickOptions.visible) {
                    for (i = tickOptions.skip; i < count; i += tickOptions.step) {
                        if (defined(skipUnit) && (i % skipUnit === 0)) {
                            continue;
                        }

                        tickLineOptions.tickX = mirror ? lineBox.x2 : lineBox.x2 - tickOptions.size;
                        tickLineOptions.tickY = mirror ? lineBox.y1 - tickOptions.size : lineBox.y1;
                        tickLineOptions.position = tickPositions[i];

                        lineGroup.append(createAxisTick(tickLineOptions, tickOptions));
                    }
                }
            }

            render(axis.getMajorTickPositions(), options.majorTicks);
            render(axis.getMinorTickPositions(), options.minorTicks, majorUnit / options.minorUnit);
        },

        createLine: function() {
            var axis = this,
                options = axis.options,
                line = options.line,
                lineBox = axis.lineBox(),
                lineOptions;

            if (line.width > 0 && line.visible) {
                var path = new draw.Path({
                    stroke: {
                        width: line.width,
                        color: line.color,
                        dashType: line.dashType
                    }

                    /* TODO
                    zIndex: line.zIndex,
                    */
                });

                path.moveTo(lineBox.x1, lineBox.y1)
                    .lineTo(lineBox.x2, lineBox.y2);

                if (options._alignLines) {
                    alignPathToPixel(path);
                }

                var group = this._lineGroup = new draw.Group();
                group.append(path);

                this.visual.append(group);
                this.createTicks(group);
            }
        },

        getActualTickSize: function () {
            var axis = this,
                options = axis.options,
                tickSize = 0;

            if (options.majorTicks.visible && options.minorTicks.visible) {
                tickSize = math.max(options.majorTicks.size, options.minorTicks.size);
            } else if (options.majorTicks.visible) {
                tickSize = options.majorTicks.size;
            } else if (options.minorTicks.visible) {
                tickSize = options.minorTicks.size;
            }

            return tickSize;
        },

        createBackground: function() {
            var axis = this,
                options = axis.options,
                background = options.background,
                box = axis.box;

            if (background) {
                axis._backgroundPath = draw.Path.fromRect(box.toRect(), {
                    fill: {
                        color: background
                    },
                    stroke: null
                });

                this.visual.append(axis._backgroundPath);
            }
        },

        createPlotBands: function() {
            var axis = this,
                options = axis.options,
                plotBands = options.plotBands || [],
                vertical = options.vertical,
                plotArea = axis.plotArea,
                slotX, slotY, from, to;

            if (plotBands.length === 0) {
                return;
            }

            var group = this._plotbandGroup = new draw.Group({
                zIndex: -1
            });

            var range = this.range();
            $.each(plotBands, function(i, item) {
                from = valueOrDefault(item.from, MIN_VALUE);
                to = valueOrDefault(item.to, MAX_VALUE);
                var element = [];

                if (isInRange(from, range) || isInRange(to, range)) {
                    if (vertical) {
                        slotX = plotArea.axisX.lineBox();
                        slotY = axis.getSlot(item.from, item.to, true);
                    } else {
                        slotX = axis.getSlot(item.from, item.to, true);
                        slotY = plotArea.axisY.lineBox();
                    }

                    var bandRect = new geom.Rect(
                        [slotX.x1, slotY.y1],
                        [slotX.width(), slotY.height()]
                    );

                    var path = draw.Path.fromRect(bandRect, {
                        fill: {
                            color: item.color,
                            opacity: item.opacity
                        },
                        stroke: null
                    });

                    group.append(path);
                }
            });

            axis.appendVisual(group);
        },

        createGridLines: function(altAxis) {
            var axis = this,
                options = axis.options,
                axisLineVisible = altAxis.options.line.visible,
                majorGridLines = options.majorGridLines,
                majorUnit = majorGridLines.visible ? options.majorUnit : 0,
                vertical = options.vertical,
                lineBox = altAxis.lineBox(),
                linePos = lineBox[vertical ? "y1" : "x1"],
                lineOptions = {
                    lineStart: lineBox[vertical ? "x1" : "y1"],
                    lineEnd: lineBox[vertical ? "x2" : "y2"],
                    vertical: vertical
                },
                pos, majorTicks = [];

            var container = this.gridLinesVisual();
            function render(tickPositions, gridLine, skipUnit) {
                var count = tickPositions.length,
                    i;

                if (gridLine.visible) {
                    for (i = gridLine.skip; i < count; i += gridLine.step) {
                        pos = round(tickPositions[i]);
                        if (!inArray(pos, majorTicks)) {
                            if (i % skipUnit !== 0 && (!axisLineVisible || linePos !== pos)) {
                                lineOptions.position = pos;
                                container.append(createAxisGridLine(lineOptions, gridLine));

                                majorTicks.push(pos);
                            }
                        }
                    }
                }
            }

            render(axis.getMajorTickPositions(), options.majorGridLines);
            render(axis.getMinorTickPositions(), options.minorGridLines, majorUnit / options.minorUnit);

            return container.children;
        },

        reflow: function(box) {
            var axis = this,
                options = axis.options,
                vertical = options.vertical,
                labels = axis.labels,
                count = labels.length,
                space = axis.getActualTickSize() + options.margin,
                maxLabelHeight = 0,
                maxLabelWidth = 0,
                title = axis.title,
                label, i;

            for (i = 0; i < count; i++) {
                label = labels[i];
                maxLabelHeight = math.max(maxLabelHeight, label.box.height());
                maxLabelWidth = math.max(maxLabelWidth, label.box.width());
            }

            if (title) {
                if (vertical) {
                    maxLabelWidth += title.box.width();
                } else {
                    maxLabelHeight += title.box.height();
                }
            }

            if (vertical) {
                axis.box = Box2D(
                    box.x1, box.y1,
                    box.x1 + maxLabelWidth + space, box.y2
                );
            } else {
                axis.box = Box2D(
                    box.x1, box.y1,
                    box.x2, box.y1 + maxLabelHeight + space
                );
            }

            axis.arrangeTitle();
            axis.arrangeLabels();
            axis.arrangeNotes();
        },

        arrangeLabels: function() {
            var axis = this,
                options = axis.options,
                labels = axis.labels,
                labelsBetweenTicks = !options.justified,
                vertical = options.vertical,
                lineBox = axis.lineBox(),
                mirror = options.labels.mirror,
                tickPositions = axis.getMajorTickPositions(),
                labelOffset = axis.getActualTickSize()  + options.margin,
                labelBox, labelY, i;

            for (i = 0; i < labels.length; i++) {
                var label = labels[i],
                    tickIx = label.index,
                    labelSize = vertical ? label.box.height() : label.box.width(),
                    labelPos = tickPositions[tickIx] - (labelSize / 2),
                    firstTickPosition, nextTickPosition, middle, labelX;

                if (vertical) {
                    if (labelsBetweenTicks) {
                        firstTickPosition = tickPositions[tickIx];
                        nextTickPosition = tickPositions[tickIx + 1];

                        middle = firstTickPosition + (nextTickPosition - firstTickPosition) / 2;
                        labelPos = middle - (labelSize / 2);
                    }

                    labelX = lineBox.x2;

                    if (mirror) {
                        labelX += labelOffset;
                    } else {
                        labelX -= labelOffset + label.box.width();
                    }

                    labelBox = label.box.move(labelX, labelPos);
                } else {
                    if (labelsBetweenTicks) {
                        firstTickPosition = tickPositions[tickIx];
                        nextTickPosition = tickPositions[tickIx + 1];
                    } else {
                        firstTickPosition = labelPos;
                        nextTickPosition = labelPos + labelSize;
                    }

                    labelY = lineBox.y1;

                    if (mirror) {
                        labelY -= labelOffset + label.box.height();
                    } else {
                        labelY += labelOffset;
                    }

                    labelBox = Box2D(firstTickPosition, labelY,
                                    nextTickPosition, labelY + label.box.height());
                }

                label.reflow(labelBox);
            }
        },

        arrangeTitle: function() {
            var axis = this,
                options = axis.options,
                mirror = options.labels.mirror,
                vertical = options.vertical,
                title = axis.title;

            if (title) {
                if (vertical) {
                    title.options.align = mirror ? RIGHT : LEFT;
                    title.options.vAlign = title.options.position;
                } else {
                    title.options.align = title.options.position;
                    title.options.vAlign = mirror ? TOP : BOTTOM;
                }

                title.reflow(axis.box);
            }
        },

        arrangeNotes: function() {
            var axis = this,
                i, item, slot, value;

            for (i = 0; i < axis.notes.length; i++) {
                item = axis.notes[i];
                value = item.options.value;
                if (defined(value)) {
                    if (axis.shouldRenderNote(value)) {
                        item.show();
                    } else {
                        item.hide();
                    }

                    slot = axis.getSlot(value);
                } else {
                    item.hide();
                }

                item.reflow(slot || axis.lineBox());
            }
        },

        alignTo: function(secondAxis) {
            var axis = this,
                lineBox = secondAxis.lineBox(),
                vertical = axis.options.vertical,
                pos = vertical ? Y : X;

            axis.box.snapTo(lineBox, pos);
            if (vertical) {
                axis.box.shrink(0, axis.lineBox().height() - lineBox.height());
            } else {
                axis.box.shrink(axis.lineBox().width() - lineBox.width(), 0);
            }
            axis.box[pos + 1] -= axis.lineBox()[pos + 1] - lineBox[pos + 1];
            axis.box[pos + 2] -= axis.lineBox()[pos + 2] - lineBox[pos + 2];
        },

        axisLabelText: function(value, dataItem, options) {
            var text = value;

            if (options.template) {
                var tmpl = template(options.template);
                text = tmpl({ value: value, dataItem: dataItem, format: options.format, culture: options.culture });
            } else if (options.format) {
                if (options.format.match(FORMAT_REGEX)) {
                    text = kendo.format(options.format, value);
                } else {
                    text = kendo.toString(value, options.format, options.culture);
                }
            }

            return text;
        }
    });

    var Note = BoxElement.extend({
        init: function(value, text, dataItem, category, series, options) {
            var note = this;

            BoxElement.fn.init.call(note, options);
            note.value = value;
            note.text = text;
            note.dataItem = dataItem;
            note.category = category;
            note.series = series;

            note.render();
        },

        options: {
            icon: {
                visible: true,
                type: CIRCLE
            },
            label: {
                position: INSIDE,
                visible: true,
                align: CENTER,
                vAlign: CENTER
            },
            line: {
                visible: true
            },
            visible: true,
            position: TOP,
            zIndex: 2
        },

        hide: function() {
            this.options.visible = false;
        },

        show: function() {
            this.options.visible = true;
        },

        render: function() {
            var note = this,
                options = note.options,
                label = options.label,
                text = note.text,
                icon = options.icon,
                size = icon.size,
                box = Box2D(),
                marker, width, height, noteTemplate;

            if (options.visible) {
                if (defined(label) && label.visible) {
                    if (label.template) {
                        noteTemplate = template(label.template);
                        text = noteTemplate({
                            dataItem: note.dataItem,
                            category: note.category,
                            value: note.value,
                            text: text,
                            series: note.series
                        });
                    } else if (label.format) {
                        text = autoFormat(label.format, text);
                    }

                    note.label = new TextBox(text, deepExtend({}, label));
                    note.append(note.label);

                    if (label.position === INSIDE) {
                        if (icon.type === CIRCLE) {
                            size = math.max(note.label.box.width(), note.label.box.height());
                        } else {
                            width = note.label.box.width();
                            height = note.label.box.height();
                        }
                        box.wrap(note.label.box);
                    }
                }

                icon.width = width || size;
                icon.height = height || size;

                marker = new ShapeElement(deepExtend({}, icon));

                note.marker = marker;
                note.append(marker);
                marker.reflow(Box2D());
                note.wrapperBox = box.wrap(marker.box);
            }
        },

        reflow: function(targetBox) {
            var note = this,
                options = note.options,
                center = targetBox.center(),
                wrapperBox = note.wrapperBox,
                length = options.line.length,
                position = options.position,
                label = note.label,
                marker = note.marker,
                lineStart, box, contentBox;

            // TODO: Review
            if (options.visible) {
                if (inArray(position, [LEFT, RIGHT])) {
                    if (position === LEFT) {
                        contentBox = wrapperBox.alignTo(targetBox, position).translate(-length, targetBox.center().y - wrapperBox.center().y);

                        if (options.line.visible) {
                            lineStart = [math.floor(targetBox.x1), center.y];
                            note.linePoints = [
                                lineStart,
                                [math.floor(contentBox.x2), center.y]
                            ];
                            box = contentBox.clone().wrapPoint(lineStart);
                        }
                    } else {
                        contentBox = wrapperBox.alignTo(targetBox, position).translate(length, targetBox.center().y - wrapperBox.center().y);

                        if (options.line.visible) {
                            lineStart = [math.floor(targetBox.x2), center.y];
                            note.linePoints = [
                                lineStart,
                                [math.floor(contentBox.x1), center.y]
                            ];
                            box = contentBox.clone().wrapPoint(lineStart);
                        }
                    }
                } else {
                    if (position === BOTTOM) {
                        contentBox = wrapperBox.alignTo(targetBox, position).translate(targetBox.center().x - wrapperBox.center().x, length);

                        if (options.line.visible) {
                            lineStart = [math.floor(center.x), math.floor(targetBox.y2)];
                            note.linePoints = [
                                lineStart,
                                [math.floor(center.x), math.floor(contentBox.y1)]
                            ];
                            box = contentBox.clone().wrapPoint(lineStart);
                        }
                    } else {
                        contentBox = wrapperBox.alignTo(targetBox, position).translate(targetBox.center().x - wrapperBox.center().x, -length);

                        if (options.line.visible) {
                            lineStart = [math.floor(center.x), math.floor(targetBox.y1)];
                            note.linePoints = [
                                lineStart,
                                [math.floor(center.x), math.floor(contentBox.y2)]
                            ];
                            box = contentBox.clone().wrapPoint(lineStart);
                        }
                    }
                }

                if (marker) {
                    marker.reflow(contentBox);
                }

                if (label) {
                    label.reflow(contentBox);
                    if (marker) {
                        if (options.label.position === OUTSIDE) {
                            label.box.alignTo(marker.box, position);
                        }
                        label.reflow(label.box);
                    }
                }
                note.contentBox = contentBox;
                note.box = box || contentBox;
            }
        },

        createVisual: function() {
            BoxElement.fn.createVisual.call(this);

            if (this.options.visible) {
                this.createLine();
            }
        },

        createLine: function() {
            var options = this.options.line;

            var path = draw.Path.fromPoints(this.linePoints, {
                stroke: {
                    color: options.color,
                    width: options.width,
                    dashType: options.dashType
                }
            });

            this.visual.append(path);
        },

        click: function(widget, e) {
            var args = this.eventArgs(e);

            if (!widget.trigger(NOTE_CLICK, args)) {
                e.preventDefault();
            }
        },

        hover: function(widget, e) {
            var args = this.eventArgs(e);

            if (!widget.trigger(NOTE_HOVER, args)) {
                e.preventDefault();
            }
        },

        leave: function(widget) {
            widget._unsetActivePoint();
        },

        eventArgs: function(e) {
            var note = this,
                options = note.options;

            return {
                element: $(e.target),
                text: defined(options.label) ? options.label.text : "",
                dataItem: note.dataItem,
                series: note.series,
                value: note.value,
                category: note.category
            };
        }
    });

    var ShapeElement = BoxElement.extend({
        options: {
            type: CIRCLE,
            align: CENTER,
            vAlign: CENTER
        },

        getElement: function() {
            var marker = this,
                options = marker.options,
                type = options.type,
                rotation = options.rotation,
                box = marker.paddingBox,
                element,
                center = box.center(),
                halfWidth = box.width() / 2,
                points,
                i;

            if (!options.visible || !marker.hasBox())  {
                return;
            }

            var style = marker.visualStyle();

            if (type === CIRCLE) {
                element = new draw.Circle(
                    new geom.Circle([
                        round(box.x1 + halfWidth, COORD_PRECISION),
                        round(box.y1 + box.height() / 2, COORD_PRECISION)
                    ], halfWidth),
                    style
                );
            }  else if (type === TRIANGLE) {
                element = draw.Path.fromPoints([
                    [box.x1 + halfWidth, box.y1],
                    [box.x1, box.y2],
                    [box.x2, box.y2]
                ], style).close();
            } else if (type === CROSS) {
                element = new draw.MultiPath(style);

                element.moveTo(box.x1, box.y1).lineTo(box.x2, box.y2);
                element.moveTo(box.x1, box.y2).lineTo(box.x2, box.y1);
            } else {
                element = draw.Path.fromRect(box.toRect(), style);
            }

            if (rotation) {
                element.transform(geom.transform()
                    .rotate(-rotation, [center.x, center.y])
                );
            }

            element.options.zIndex = this.options.zIndex;
            return element;
        },

        createVisual: function() {
            this.visual = this.getElement();
        }
    });

    var NumericAxis = Axis.extend({
        init: function(seriesMin, seriesMax, options) {
            var axis = this,
                defaultOptions = axis.initDefaults(seriesMin, seriesMax, options);

            Axis.fn.init.call(axis, defaultOptions);
        },

        startValue: function() {
            return 0;
        },

        options: {
            type: "numeric",
            min: 0,
            max: 1,
            vertical: true,
            majorGridLines: {
                visible: true,
                width: 1,
                color: BLACK
            },
            zIndex: 1
        },

        initDefaults: function(seriesMin, seriesMax, options) {
            var axis = this,
                narrowRange = options.narrowRange,
                autoMin = axis.autoAxisMin(seriesMin, seriesMax, narrowRange),
                autoMax = axis.autoAxisMax(seriesMin, seriesMax, narrowRange),
                majorUnit = autoMajorUnit(autoMin, autoMax),
                autoOptions = {
                    majorUnit: majorUnit
                },
                userSetLimits;

            if (options.roundToMajorUnit !== false) {
                if (autoMin < 0 && remainderClose(autoMin, majorUnit, 1/3)) {
                    autoMin -= majorUnit;
                }

                if (autoMax > 0 && remainderClose(autoMax, majorUnit, 1/3)) {
                    autoMax += majorUnit;
                }
            }

            autoOptions.min = floor(autoMin, majorUnit);
            autoOptions.max = ceil(autoMax, majorUnit);

            if (options) {
                userSetLimits = defined(options.min) || defined(options.max);
                if (userSetLimits) {
                    if (options.min === options.max) {
                        if (options.min > 0) {
                            options.min = 0;
                        } else {
                            options.max = 1;
                        }
                    }
                }

                if (options.majorUnit) {
                    autoOptions.min = floor(autoOptions.min, options.majorUnit);
                    autoOptions.max = ceil(autoOptions.max, options.majorUnit);
                } else if (userSetLimits) {
                    options = deepExtend(autoOptions, options);

                    // Determine an auto major unit after min/max have been set
                    autoOptions.majorUnit = autoMajorUnit(options.min, options.max);
                }
            }

            autoOptions.minorUnit = (options.majorUnit || autoOptions.majorUnit) / 5;

            return deepExtend(autoOptions, options);
        },

        range: function() {
            var options = this.options;
            return { min: options.min, max: options.max };
        },

        autoAxisMax: function(min, max, narrow) {
            var axisMax,
                diff;

            if (!min && !max) {
                return 1;
            }

            if (min <= 0 && max <= 0) {
                max = min == max ? 0 : max;

                diff = math.abs((max - min) / max);
                if(!narrow && diff > ZERO_THRESHOLD) {
                    return 0;
                }

                axisMax = math.min(0, max - ((min - max) / 2));
            } else {
                min = min == max ? 0 : min;
                axisMax = max;
            }

            return axisMax;
        },

        autoAxisMin: function(min, max, narrow) {
            var axisMin,
                diff;

            if (!min && !max) {
                return 0;
            }

            if (min >= 0 && max >= 0) {
                min = min == max ? 0 : min;

                diff = (max - min) / max;
                if(!narrow && diff > ZERO_THRESHOLD) {
                    return 0;
                }

                axisMin = math.max(0, min - ((max - min) / 2));
            } else {
                max = min == max ? 0 : max;
                axisMin = min;
            }

            return axisMin;
        },

        getDivisions: function(stepValue) {
            if (stepValue === 0) {
                return 1;
            }

            var options = this.options,
                range = options.max - options.min;

            return math.floor(round(range / stepValue, COORD_PRECISION)) + 1;
        },

        getTickPositions: function(unit, skipUnit) {
            var axis = this,
                options = axis.options,
                vertical = options.vertical,
                reverse = options.reverse,
                lineBox = axis.lineBox(),
                lineSize = vertical ? lineBox.height() : lineBox.width(),
                range = options.max - options.min,
                scale = lineSize / range,
                step = unit * scale,
                skipStep = 0,
                divisions = axis.getDivisions(unit),
                dir = (vertical ? -1 : 1) * (reverse ? -1 : 1),
                startEdge = dir === 1 ? 1 : 2,
                pos = lineBox[(vertical ? Y : X) + startEdge],
                positions = [],
                i;

            if (skipUnit) {
                skipStep = skipUnit / unit;
            }

            for (i = 0; i < divisions; i++) {
                if (i % skipStep !== 0) {
                    positions.push(round(pos, COORD_PRECISION));
                }

                pos = pos + step * dir;
            }

            return positions;
        },

        getMajorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.options.majorUnit);
        },

        getMinorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.options.minorUnit);
        },

        getSlot: function(a, b, limit) {
            var axis = this,
                options = axis.options,
                reverse = options.reverse,
                vertical = options.vertical,
                valueAxis = vertical ? Y : X,
                lineBox = axis.lineBox(),
                lineStart = lineBox[valueAxis + (reverse ? 2 : 1)],
                lineSize = vertical ? lineBox.height() : lineBox.width(),
                dir = reverse ? -1 : 1,
                step = dir * (lineSize / (options.max - options.min)),
                p1,
                p2,
                slotBox = new Box2D(lineBox.x1, lineBox.y1, lineBox.x1, lineBox.y1);

            if (!defined(a)) {
                a = b || 0;
            }

            if (!defined(b)) {
                b = a || 0;
            }

            if (limit) {
                a = math.max(math.min(a, options.max), options.min);
                b = math.max(math.min(b, options.max), options.min);
            }

            if (vertical) {
                p1 = options.max - math.max(a, b);
                p2 = options.max - math.min(a, b);
            } else {
                p1 = math.min(a, b) - options.min;
                p2 = math.max(a, b) - options.min;
            }

            slotBox[valueAxis + 1] = math.max(math.min(lineStart + step * (reverse ? p2 : p1), COORDINATE_LIMIT), -COORDINATE_LIMIT);
            slotBox[valueAxis + 2] = math.max(math.min(lineStart + step * (reverse ? p1 : p2), COORDINATE_LIMIT), -COORDINATE_LIMIT);

            return slotBox;
        },

        getValue: function(point) {
            var axis = this,
                options = axis.options,
                reverse = options.reverse,
                vertical = options.vertical,
                max = options.max * 1,
                min = options.min * 1,
                valueAxis = vertical ? Y : X,
                lineBox = axis.lineBox(),
                lineStart = lineBox[valueAxis + (reverse ? 2 : 1)],
                lineSize = vertical ? lineBox.height() : lineBox.width(),
                dir = reverse ? -1 : 1,
                offset = dir * (point[valueAxis] - lineStart),
                step = (max - min) / lineSize,
                valueOffset = offset * step,
                value;

            if (offset < 0 || offset > lineSize) {
                return null;
            }

            value = vertical ?
                    max - valueOffset :
                    min + valueOffset;

            return round(value, DEFAULT_PRECISION);
        },

        translateRange: function(delta) {
            var axis = this,
                options = axis.options,
                lineBox = axis.lineBox(),
                vertical = options.vertical,
                reverse = options.reverse,
                size = vertical ? lineBox.height() : lineBox.width(),
                range = options.max - options.min,
                scale = size / range,
                offset = round(delta / scale, DEFAULT_PRECISION);

            if ((vertical || reverse) && !(vertical && reverse )) {
                offset = -offset;
            }

            return {
                min: options.min + offset,
                max: options.max + offset
            };
        },

        scaleRange: function(delta) {
            var axis = this,
                options = axis.options,
                offset = -delta * options.majorUnit;

            return {
                min: options.min - offset,
                max: options.max + offset
            };
        },

        labelsCount: function() {
            return this.getDivisions(this.options.majorUnit);
        },

        createAxisLabel: function(index, labelOptions) {
            var axis = this,
                options = axis.options,
                value = round(options.min + (index * options.majorUnit), DEFAULT_PRECISION),
                text = axis.axisLabelText(value, null, labelOptions);

            return new AxisLabel(value, text, index, null, labelOptions);
        },

        shouldRenderNote: function(value) {
            var range = this.range();
            return range.min <= value && value <= range.max;
        }
    });

    var LogarithmicAxis = Axis.extend({
        init: function(seriesMin, seriesMax, options) {
            this.options = this._initOptions(seriesMin, seriesMax, options);
            Axis.fn.init.call(this, options);
        },

        startValue: function() {
            return this.options.min;
        },

        options: {
            type: "log",
            majorUnit: 10,
            minorUnit: 1,
            axisCrossingValue: 1,
            vertical: true,
            majorGridLines: {
                visible: true,
                width: 1,
                color: BLACK
            },
            zIndex: 1
        },

        getSlot: function(a, b, limit) {
            var axis = this,
                options = axis.options,
                reverse = options.reverse,
                vertical = options.vertical,
                valueAxis = vertical ? Y : X,
                lineBox = axis.lineBox(),
                lineStart = lineBox[valueAxis + (reverse ? 2 : 1)],
                lineSize = vertical ? lineBox.height() : lineBox.width(),
                dir = reverse ? -1 : 1,
                base = options.majorUnit,
                logMin = axis.logMin,
                logMax = axis.logMax,
                step = dir * (lineSize / (logMax - logMin)),
                p1, p2,
                slotBox = new Box2D(lineBox.x1, lineBox.y1, lineBox.x1, lineBox.y1);

            if (!defined(a)) {
                a = b || 1;
            }

            if (!defined(b)) {
                b = a || 1;
            }

            if(a <= 0 || b <= 0) {
                return;
            }

            if (limit) {
                a = math.max(math.min(a, options.max), options.min);
                b = math.max(math.min(b, options.max), options.min);
            }

            a = log(a, base);
            b = log(b, base);

            if (vertical) {
                p1 = logMax - math.max(a, b);
                p2 = logMax - math.min(a, b);
            } else {
                p1 = math.min(a, b) - logMin;
                p2 = math.max(a, b) - logMin;
            }

            slotBox[valueAxis + 1] = lineStart + step * (reverse ? p2 : p1);
            slotBox[valueAxis + 2] = lineStart + step * (reverse ? p1 : p2);

            return slotBox;
        },

        getValue: function(point) {
            var axis = this,
                options = axis.options,
                reverse = options.reverse,
                vertical = options.vertical,
                lineBox = axis.lineBox(),
                base = options.majorUnit,
                logMin = axis.logMin,
                logMax = axis.logMax,
                dir = vertical === reverse ? 1 : -1,
                startEdge = dir === 1 ? 1 : 2,
                lineSize = vertical ? lineBox.height() : lineBox.width(),
                step = ((logMax - logMin) / lineSize),
                valueAxis = vertical ? Y : X,
                lineStart = lineBox[valueAxis + startEdge],
                offset = dir * (point[valueAxis] - lineStart),
                valueOffset = offset * step,
                value;

            if (offset < 0 || offset > lineSize) {
                return null;
            }

            value = logMin + valueOffset;

            return round(math.pow(base, value), DEFAULT_PRECISION);
        },

        range: function() {
            var options = this.options;
            return { min: options.min, max: options.max };
        },

        scaleRange: function(delta) {
            var axis = this,
                options = axis.options,
                base = options.majorUnit,
                offset = -delta;

            return {
                min: math.pow(base, axis.logMin - offset),
                max: math.pow(base, axis.logMax + offset)
            };
        },

        translateRange: function(delta) {
            var axis = this,
                options = axis.options,
                base = options.majorUnit,
                lineBox = axis.lineBox(),
                vertical = options.vertical,
                reverse = options.reverse,
                size = vertical ? lineBox.height() : lineBox.width(),
                logMin = axis.logMin,
                logMax = axis.logMax,
                scale = size / (axis.logMax - axis.logMin),
                offset = round(delta / scale, DEFAULT_PRECISION);

            if ((vertical || reverse) && !(vertical && reverse )) {
                offset = -offset;
            }

            return {
                min: math.pow(base, axis.logMin + offset),
                max: math.pow(base, axis.logMax + offset)
            };
        },

        labelsCount: function() {
            var axis = this,
                floorMax = math.floor(axis.logMax),
                count = math.floor(floorMax - axis.logMin) + 1;

            return count;
        },

        getMajorTickPositions: function() {
            var axis = this,
                ticks = [];

            axis.traverseMajorTicksPositions(function(position) {
                ticks.push(position);
            }, {step: 1, skip: 0});
            return ticks;
        },

        createTicks: function(lineGroup) {
            var axis = this,
                ticks = [],
                options = axis.options,
                lineBox = axis.lineBox(),
                mirror = options.labels.mirror,
                majorTicks = options.majorTicks,
                minorTicks = options.minorTicks,
                tickLineOptions= {
                    // TODO
                    // _alignLines: options._alignLines,
                    vertical: options.vertical
                },
                start, end;

            function render(tickPosition, tickOptions) {
                tickLineOptions.tickX = mirror ? lineBox.x2 : lineBox.x2 - tickOptions.size;
                tickLineOptions.tickY = mirror ? lineBox.y1 - tickOptions.size : lineBox.y1;
                tickLineOptions.position = tickPosition;

                lineGroup.append(createAxisTick(tickLineOptions, tickOptions));
            }

            if (majorTicks.visible) {
                axis.traverseMajorTicksPositions(render, majorTicks);
            }

            if (minorTicks.visible) {
                axis.traverseMinorTicksPositions(render, minorTicks);
            }

            return ticks;
        },

        createGridLines: function(altAxis) {
            var axis = this,
                options = axis.options,
                axisLineVisible = altAxis.options.line.visible,
                majorGridLines = options.majorGridLines,
                minorGridLines = options.minorGridLines,
                vertical = options.vertical,
                lineBox = altAxis.lineBox(),
                lineOptions = {
                    lineStart: lineBox[vertical ? "x1" : "y1"],
                    lineEnd: lineBox[vertical ? "x2" : "y2"],
                    vertical: vertical
                },
                pos, majorTicks = [];

            var container = this.gridLinesVisual();
            function render(tickPosition, gridLine) {
                if (!inArray(tickPosition, majorTicks)) {
                    lineOptions.position = tickPosition;
                    container.append(createAxisGridLine(lineOptions, gridLine));

                    majorTicks.push(tickPosition);
                }
            }

            if (majorGridLines.visible) {
                axis.traverseMajorTicksPositions(render, majorGridLines);
            }

            if (minorGridLines.visible) {
                axis.traverseMinorTicksPositions(render, minorGridLines);
            }

            return container.children;
        },

        traverseMajorTicksPositions: function(callback, tickOptions) {
            var axis = this,
                lineOptions = axis._lineOptions(),
                lineStart = lineOptions.lineStart,
                step = lineOptions.step,
                logMin = axis.logMin,
                logMax = axis.logMax,
                power,
                position;

            for (power = math.ceil(logMin) + tickOptions.skip; power <= logMax; power+= tickOptions.step) {
                position = round(lineStart + step * (power - logMin), DEFAULT_PRECISION);
                callback(position, tickOptions);
            }
        },

        traverseMinorTicksPositions: function(callback, tickOptions) {
            var axis = this,
                options = axis.options,
                lineOptions = axis._lineOptions(),
                lineStart = lineOptions.lineStart,
                lineStep = lineOptions.step,
                base = options.majorUnit,
                logMin = axis.logMin,
                logMax = axis.logMax,
                start = math.floor(logMin),
                max = options.max,
                min = options.min,
                minorUnit = options.minorUnit,
                power,
                value,
                position,
                minorOptions;

            for (power = start; power < logMax; power++) {
                minorOptions = axis._minorIntervalOptions(power);
                for(var idx = tickOptions.skip; idx < minorUnit; idx+= tickOptions.step) {
                    value = minorOptions.value + idx * minorOptions.minorStep;
                    if (value > max) {
                        break;
                    }
                    if (value >= min) {
                        position = round(lineStart + lineStep * (log(value, base) - logMin), DEFAULT_PRECISION);
                        callback(position, tickOptions);
                    }
                }
            }
        },

        createAxisLabel: function(index, labelOptions) {
            var axis = this,
                options = axis.options,
                power = math.ceil(axis.logMin + index),
                value = Math.pow(options.majorUnit, power),
                text = axis.axisLabelText(value, null, labelOptions);

            return new AxisLabel(value, text, index, null, labelOptions);
        },

        shouldRenderNote: function(value) {
            var range = this.range();
            return range.min <= value && value <= range.max;
        },

        _throwNegativeValuesError: function() {
            throw new Error("Non positive values cannot be used for a logarithmic axis");
        },

        _initOptions: function(seriesMin, seriesMax, options) {
            var axis = this,
                axisOptions = deepExtend({}, axis.options, {min: seriesMin, max: seriesMax}, options),
                min = axisOptions.min,
                max = axisOptions.max,
                base = axisOptions.majorUnit,
                logMaxRemainder;

            if (axisOptions.axisCrossingValue <= 0) {
                axis._throwNegativeValuesError();
            }

            if (!defined(options.max)) {
               logMaxRemainder =  round(log(max, base), DEFAULT_PRECISION) % 1;
               if (max <= 0) {
                   max = base;
               } else if (logMaxRemainder !== 0 && (logMaxRemainder < 0.3 || logMaxRemainder > 0.9)) {
                   max = math.pow(base, log(max, base) + 0.2);
               } else {
                   max = math.pow(base, math.ceil(log(max, base)));
               }
            } else if (options.max <= 0) {
                axis._throwNegativeValuesError();
            }

            if (!defined(options.min)) {
               if (min <= 0) {
                   min = max <= 1 ? math.pow(base, -2) : 1;
               } else if (!options.narrowRange) {
                   min = math.pow(base, math.floor(log(min, base)));
               }
            } else if (options.min <= 0) {
                axis._throwNegativeValuesError();
            }

            axis.logMin = round(log(min, base), DEFAULT_PRECISION);
            axis.logMax = round(log(max, base), DEFAULT_PRECISION);
            axisOptions.max = max;
            axisOptions.min = min;
            axisOptions.minorUnit = options.minorUnit || round(base - 1, DEFAULT_PRECISION);

            return axisOptions;
        },

        _minorIntervalOptions: function(power) {
            var base = this.options.majorUnit,
                value = math.pow(base, power),
                nextValue = math.pow(base, power + 1),
                difference = nextValue - value,
                minorStep = difference / this.options.minorUnit;
            return {
                value: value,
                minorStep: minorStep
            };
        },

        _lineOptions: function() {
            var axis = this,
                options = axis.options,
                reverse = options.reverse,
                vertical = options.vertical,
                valueAxis = vertical ? Y : X,
                lineBox = axis.lineBox(),
                dir = vertical === reverse ? 1 : -1,
                startEdge = dir === 1 ? 1 : 2,
                lineSize = vertical ? lineBox.height() : lineBox.width(),
                step = dir * (lineSize / (axis.logMax - axis.logMin)),
                lineStart = lineBox[valueAxis + startEdge];

            return {
                step: step,
                lineStart: lineStart,
                lineBox: lineBox
            };
        }
    });

    dataviz.Gradients = {
        glass: {
            type: LINEAR,
            rotation: 0,
            stops: [{
                offset: 0,
                color: WHITE,
                opacity: 0
            }, {
                offset: 0.25,
                color: WHITE,
                opacity: 0.3
            }, {
                offset: 1,
                color: WHITE,
                opacity: 0
            }]
        },
        sharpBevel: {
            type: RADIAL,
            stops: [{
                offset: 0,
                color: WHITE,
                opacity: 0.55
            }, {
                offset: 0.65,
                color: WHITE,
                opacity: 0
            }, {
                offset: 0.95,
                color: WHITE,
                opacity: 0.25
            }]
        },
        roundedBevel: {
            type: RADIAL,
            stops: [{
                offset: 0.33,
                color: WHITE,
                opacity: 0.06
            }, {
                offset: 0.83,
                color: WHITE,
                opacity: 0.2
            }, {
                offset: 0.95,
                color: WHITE,
                opacity: 0
            }]
        },
        roundedGlass: {
            type: RADIAL,
            supportVML: false,
            stops: [{
                offset: 0,
                color: WHITE,
                opacity: 0
            }, {
                offset: 0.5,
                color: WHITE,
                opacity: 0.3
            }, {
                offset: 0.99,
                color: WHITE,
                opacity: 0
            }]
        },
        sharpGlass: {
            type: RADIAL,
            supportVML: false,
            stops: [{
                offset: 0,
                color: WHITE,
                opacity: 0.2
            }, {
                offset: 0.15,
                color: WHITE,
                opacity: 0.15
            }, {
                offset: 0.17,
                color: WHITE,
                opacity: 0.35
            }, {
                offset: 0.85,
                color: WHITE,
                opacity: 0.05
            }, {
                offset: 0.87,
                color: WHITE,
                opacity: 0.15
            }, {
                offset: 0.99,
                color: WHITE,
                opacity: 0
            }]
        }
    };

    // Helper functions========================================================
    var LRUCache = Class.extend({
        init: function(size) {
            this._size = size;
            this._length = 0;
            this._map = {};
        },

        put: function(key, value) {
            var lru = this,
                map = lru._map,
                entry = { key: key, value: value };

            map[key] = entry;

            if (!lru._head) {
                lru._head = lru._tail = entry;
            } else {
                lru._tail.newer = entry;
                entry.older = lru._tail;
                lru._tail = entry;
            }

            if (lru._length >= lru._size) {
                map[lru._head.key] = null;
                lru._head = lru._head.newer;
                lru._head.older = null;
            } else {
                lru._length++;
            }
        },

        get: function(key) {
            var lru = this,
                entry = lru._map[key];

            if (entry) {
                if (entry === lru._head && entry !== lru._tail) {
                    lru._head = entry.newer;
                    lru._head.older = null;
                }

                if (entry !== lru._tail) {
                    if (entry.older) {
                        entry.older.newer = entry.newer;
                        entry.newer.older = entry.older;
                    }

                    entry.older = lru._tail;
                    entry.newer = null;

                    lru._tail.newer = entry;
                    lru._tail = entry;
                }

                return entry.value;
            }
        }
    });

    var ExportMixin = {
        extend: function(proto, skipLegacy) {
            if (!proto.exportVisual) {
                throw new Error("Mixin target has no exportVisual method defined.");
            }

            proto.exportSVG = this.exportSVG;
            proto.exportImage = this.exportImage;
            proto.exportPDF = this.exportPDF;

            if (!skipLegacy) {
                proto.svg = this.svg;
                proto.imageDataURL = this.imageDataURL;
            }
        },

        exportSVG: function(options) {
            return draw.exportSVG(this.exportVisual(), options);
        },

        exportImage: function(options) {
            return draw.exportImage(this.exportVisual(), options);
        },

        exportPDF: function(options) {
            return draw.exportPDF(this.exportVisual(), options);
        },

        svg: function() {
            if (draw.svg.Surface) {
                return draw.svg._exportGroup(this.exportVisual());
            } else {
                throw new Error("SVG Export failed. Unable to export instantiate kendo.drawing.svg.Surface");
            }
        },

        imageDataURL: function() {
            if (!kendo.support.canvas) {
                return null;
            }

            if (draw.canvas.Surface) {
                var container = $("<div />").css({
                    display: "none",
                    width: this.element.width(),
                    height: this.element.height()
                }).appendTo(document.body);

                var surface = new draw.canvas.Surface(container);
                surface.draw(this.exportVisual());
                var image = surface._rootElement.toDataURL();

                surface.destroy();
                container.remove();

                return image;
            } else {
                throw new Error("Image Export failed. Unable to export instantiate kendo.drawing.canvas.Surface");
            }
        }
    };

    function autoMajorUnit(min, max) {
        var diff = round(max - min, DEFAULT_PRECISION - 1);

        if (diff === 0) {
            if (max === 0) {
                return 0.1;
            }

            diff = math.abs(max);
        }

        var scale = math.pow(10, math.floor(math.log(diff) / math.log(10))),
            relativeValue = round((diff / scale), DEFAULT_PRECISION),
            scaleMultiplier = 1;

        if (relativeValue < 1.904762) {
            scaleMultiplier = 0.2;
        } else if (relativeValue < 4.761904) {
            scaleMultiplier = 0.5;
        } else if (relativeValue < 9.523809) {
            scaleMultiplier = 1;
        } else {
            scaleMultiplier = 2;
        }

        return round(scale * scaleMultiplier, DEFAULT_PRECISION);
    }

    function getHash(object) {
        var hash = [];
        for (var key in object) {
            hash.push(key + object[key]);
        }

        return hash.sort().join(" ");
    }

    // TODO: Replace with Point2D.rotate
    function rotatePoint(x, y, cx, cy, angle) {
        var theta = angle * DEG_TO_RAD;

        return new Point2D(
            cx + (x - cx) * math.cos(theta) + (y - cy) * math.sin(theta),
            cy - (x - cx) * math.sin(theta) + (y - cy) * math.cos(theta)
        );
    }

    function boxDiff(r, s) {
        if (r.x1 == s.x1 && r.y1 == s.y1 && r.x2 == s.x2 && r.y2 == s.y2) {
            return s;
        }

        var a = math.min(r.x1, s.x1),
            b = math.max(r.x1, s.x1),
            c = math.min(r.x2, s.x2),
            d = math.max(r.x2, s.x2),
            e = math.min(r.y1, s.y1),
            f = math.max(r.y1, s.y1),
            g = math.min(r.y2, s.y2),
            h = math.max(r.y2, s.y2),
            result = [];

        // X = intersection, 0-7 = possible difference areas
        // h +-+-+-+
        // . |5|6|7|
        // g +-+-+-+
        // . |3|X|4|
        // f +-+-+-+
        // . |0|1|2|
        // e +-+-+-+
        // . a b c d

        // we'll always have rectangles 1, 3, 4 and 6
        result[0] = Box2D(b, e, c, f);
        result[1] = Box2D(a, f, b, g);
        result[2] = Box2D(c, f, d, g);
        result[3] = Box2D(b, g, c, h);

        // decide which corners
        if ( r.x1 == a && r.y1 == e || s.x1 == a && s.y1 == e )
        { // corners 0 and 7
            result[4] = Box2D(a, e, b, f);
            result[5] = Box2D(c, g, d, h);
        }
        else
        { // corners 2 and 5
            result[4] = Box2D(c, e, d, f);
            result[5] = Box2D(a, g, b, h);
        }

        return $.grep(result, function(box) {
            return box.height() > 0 && box.width() > 0;
        })[0];
    }

    function inArray(value, array) {
        return indexOf(value, array) != -1;
    }

    function last(array) {
        return array[array.length - 1];
    }

    function append(first, second) {
        first.push.apply(first, second);
    }

    function ceil(value, step) {
        return round(math.ceil(value / step) * step, DEFAULT_PRECISION);
    }

    function floor(value, step) {
        return round(math.floor(value / step) * step, DEFAULT_PRECISION);
    }

    function round(value, precision) {
        var power = math.pow(10, precision || 0);
        return math.round(value * power) / power;
    }

    function log(y, x) {
        return math.log(y) / math.log(x);
    }

    function remainderClose(value, divisor, ratio) {
        var remainder = round(math.abs(value % divisor), DEFAULT_PRECISION),
            threshold = divisor * (1 - ratio);

        return remainder === 0 || remainder > threshold;
    }

    function interpolateValue(start, end, progress) {
        return round(start + (end - start) * progress, COORD_PRECISION);
    }

    function defined(value) {
        return typeof value !== UNDEFINED;
    }

    function numericComparer(a, b) {
        return a - b;
    }

    function updateArray(arr, prop, value) {
        var i,
            length = arr.length;

        for(i = 0; i < length; i++) {
            arr[i][prop] = value;
        }
    }

    function autoFormat(format, value) {
        if (format.match(FORMAT_REGEX)) {
            return kendo.format.apply(this, arguments);
        }

        return kendo.toString(value, format);
    }

    function detached(element) {
        var parent = element.parentNode;

        while(parent && parent.parentNode) {
            parent = parent.parentNode;
        }

        return parent !== doc;
    }

    function clockwise(v1, v2) {
        // True if v2 is clockwise of v1
        // assuming angles grow in clock-wise direction
        // (as in the pie and radar charts)
        return -v1.x * v2.y + v1.y * v2.x < 0;
    }

    function dateComparer(a, b) {
         if (a && b) {
             return a.getTime() - b.getTime();
         }

         return 0;
    }

    var CurveProcessor = function(closed){
        this.closed = closed;
    };

    CurveProcessor.prototype = CurveProcessor.fn = {
        WEIGHT: 0.333,
        EXTREMUM_ALLOWED_DEVIATION: 0.01,

        process: function(dataPoints) {
            var that = this,
                closed = that.closed,
                points = dataPoints.slice(0),
                length = points.length,
                segments = [],
                p0,p1,p2,
                controlPoints,
                initialControlPoint,
                lastControlPoint,
                tangent;

            if (length > 2) {
                that.removeDuplicates(0, points);
                length = points.length;
            }

            if (length < 2 || (length == 2 && points[0].equals(points[1]))) {
                return segments;
            }

            p0 = points[0]; p1 = points[1]; p2 = points[2];
            segments.push(new draw.Segment(p0));

            while (p0.equals(points[length - 1])) {
                closed = true;
                points.pop();
                length--;
            }

            if (length == 2) {
                tangent = that.tangent(p0,p1, X,Y);

                last(segments).controlOut(
                    that.firstControlPoint(tangent, p0, p1, X, Y)
                );

                segments.push(new draw.Segment(
                    p1,
                    that.secondControlPoint(tangent, p0, p1, X, Y)
                ));

                return segments;
            }

            if (closed) {
                p0 = points[length - 1]; p1 = points[0]; p2 = points[1];
                controlPoints = that.controlPoints(p0, p1, p2);
                initialControlPoint = controlPoints[1];
                lastControlPoint = controlPoints[0];
            } else {
                tangent = that.tangent(p0, p1, X,Y);
                initialControlPoint = that.firstControlPoint(tangent, p0, p1, X, Y);
            }

            var cp0 = initialControlPoint;
            for (var idx = 0; idx <= length - 3; idx++) {
                that.removeDuplicates(idx, points);
                length = points.length;
                if (idx + 3 <= length) {
                    p0 = points[idx]; p1 = points[idx + 1]; p2 = points[idx + 2];
                    controlPoints = that.controlPoints(p0,p1,p2);

                    last(segments).controlOut(cp0);
                    cp0 = controlPoints[1];

                    var cp1 = controlPoints[0];
                    segments.push(new draw.Segment(p1, cp1));
                }
            }

            if (closed) {
                p0 = points[length - 2]; p1 = points[length - 1]; p2 = points[0];
                controlPoints = that.controlPoints(p0, p1, p2);

                last(segments).controlOut(cp0);
                segments.push(new draw.Segment(
                    p1,
                    controlPoints[0]
                ));

                last(segments).controlOut(controlPoints[1]);
                segments.push(new draw.Segment(
                    p2,
                    lastControlPoint
                ));
            } else {
                tangent = that.tangent(p1, p2, X, Y);

                last(segments).controlOut(cp0);
                segments.push(new draw.Segment(
                    p2,
                    that.secondControlPoint(tangent, p1, p2, X, Y)
                ));
            }

            return segments;
        },

        removeDuplicates: function(idx, points) {
            while (points[idx].equals(points[idx + 1]) || points[idx + 1].equals(points[idx + 2])) {
                points.splice(idx + 1, 1);
            }
        },

        invertAxis: function(p0,p1,p2){
            var that = this,
                fn, y2,
                invertAxis = false;

            if(p0.x === p1.x){
                invertAxis = true;
            } else if (p1.x === p2.x) {
                if ((p1.y < p2.y && p0.y <= p1.y) || (p2.y < p1.y && p1.y <= p0.y)) {
                    invertAxis = true;
                }
            } else {
                fn = that.lineFunction(p0,p1);
                y2 = that.calculateFunction(fn, p2.x);
                if (!(p0.y <= p1.y && p2.y <= y2) &&
                    !(p1.y <= p0.y && p2.y >= y2)) {
                        invertAxis = true;
                }
            }

            return invertAxis;
        },

        isLine: function(p0,p1,p2) {
            var that = this,
                fn = that.lineFunction(p0,p1),
                y2 = that.calculateFunction(fn, p2.x);

            return (p0.x == p1.x && p1.x == p2.x) || round(y2,1) === round(p2.y,1);
        },

        lineFunction: function(p1, p2) {
            var a = (p2.y - p1.y) / (p2.x - p1.x),
                b = p1.y - a * p1.x;
            return [b,a];
        },

        controlPoints: function(p0,p1,p2) {
            var that = this,
                xField = X,
                yField = Y,
                restrict = false,
                switchOrientation = false,
                tangent,
                monotonic,
                firstControlPoint,
                secondControlPoint,
                allowedDeviation = that.EXTREMUM_ALLOWED_DEVIATION;

            if (that.isLine(p0,p1,p2)) {
                tangent = that.tangent(p0,p1, X,Y);
            } else {
                monotonic = {
                    x: that.isMonotonicByField(p0,p1,p2,X),
                    y: that.isMonotonicByField(p0,p1,p2,Y)
                };

                if (monotonic.x && monotonic.y) {
                   tangent = that.tangent(p0,p2, X, Y);
                   restrict = true;
                } else {
                    if (that.invertAxis(p0,p1,p2)) {
                       xField = Y;
                       yField = X;
                    }

                    if (monotonic[xField]) {
                        tangent = 0;
                     } else {
                        var sign;
                        if ((p2[yField] < p0[yField] && p0[yField] <= p1[yField]) ||
                            (p0[yField] < p2[yField] && p1[yField] <= p0[yField])) {
                            sign = that.sign((p2[yField] - p0[yField]) * (p1[xField] - p0[xField]));
                        } else {
                            sign = -that.sign((p2[xField] - p0[xField]) * (p1[yField] - p0[yField]));
                        }

                        tangent = allowedDeviation * sign;
                        switchOrientation = true;
                     }
                }
            }

            secondControlPoint = that.secondControlPoint(tangent, p0, p1, xField, yField);

            if (switchOrientation) {
                var oldXField = xField;
                xField = yField;
                yField = oldXField;
            }

            firstControlPoint = that.firstControlPoint(tangent, p1, p2, xField, yField);

            if (restrict) {
                that.restrictControlPoint(p0, p1, secondControlPoint, tangent);
                that.restrictControlPoint(p1, p2, firstControlPoint, tangent);
            }

            return [secondControlPoint, firstControlPoint];
        },

        sign: function(x){
            return x <= 0 ? -1 : 1;
        },

        restrictControlPoint: function(p1,p2, cp, tangent) {
            if (p1.y < p2.y) {
                if (p2.y < cp.y) {
                    cp.x = p1.x + (p2.y - p1.y) / tangent;
                    cp.y = p2.y;
                } else if (cp.y < p1.y) {
                    cp.x = p2.x - (p2.y - p1.y) / tangent;
                    cp.y = p1.y;
                }
            } else {
                if (cp.y < p2.y) {
                    cp.x = p1.x - (p1.y - p2.y) / tangent;
                    cp.y = p2.y;
                } else if (p1.y < cp.y) {
                    cp.x = p2.x + (p1.y - p2.y) / tangent;
                    cp.y = p1.y;
                }
            }
        },

        tangent: function(p0,p1, xField, yField) {
            var tangent,
                x = p1[xField] - p0[xField],
                y = p1[yField] - p0[yField];
            if (x === 0) {
                tangent = 0;
            } else {
               tangent = y/x;
            }

            return tangent;
        },

        isMonotonicByField: function(p0,p1,p2,field) {
            return (p2[field] > p1[field] && p1[field] > p0[field]) ||
                        (p2[field] < p1[field] && p1[field] < p0[field]);
        },

        firstControlPoint: function(tangent, p0,p3, xField, yField) {
            var that = this,
                t1 = p0[xField],
                t2 = p3[xField],
                distance = (t2 - t1) * that.WEIGHT;

            return that.point(t1 + distance, p0[yField] + distance * tangent, xField, yField);
        },

        secondControlPoint: function(tangent, p0,p3, xField, yField) {
            var that = this,
                t1 = p0[xField],
                t2 = p3[xField],
                distance = (t2 - t1) * that.WEIGHT;

            return that.point(t2 - distance, p3[yField] - distance * tangent, xField, yField);
        },

        point: function (xValue, yValue, xField, yField) {
            var controlPoint = new geom.Point();
            controlPoint[xField] = xValue;
            controlPoint[yField] = yValue;

            return controlPoint;
        },

        calculateFunction: function(fn,x) {
            var result = 0,
                length = fn.length;
            for (var i = 0; i < length; i++) {
                result += Math.pow(x,i) * fn[i];
            }
            return result;
        }
    };
    function limitValue(value, min, max) {
        return math.max(math.min(value, max), min);
    }

    function mwDelta(e) {
        var origEvent = e.originalEvent,
            delta = 0;

        if (origEvent.wheelDelta) {
            delta = -origEvent.wheelDelta / 120;
            delta = delta > 0 ? math.ceil(delta) : math.floor(delta);
        }

        if (origEvent.detail) {
            delta = round(origEvent.detail / 3);
        }

        return delta;
    }

    function decodeEntities(text) {
        if (!text || !text.indexOf || text.indexOf("&") < 0) {
            return text;
        } else {
            var element = decodeEntities._element;
            element.innerHTML = text;
            return element.textContent || element.innerText;
        }
    }

    function isInRange(value, range) {
        return value >= range.min && value <= range.max;
    }

    function alignPathToPixel(path) {
        if (!kendo.support.vml) {
            for (var i = 0; i < path.segments.length; i++) {
                path.segments[i].anchor().round(0).translate(0.5, 0.5);
            }
        }

        return path;
    }

    function innerRadialStops(options) {
        var gradient = this,
            stops = options.stops,
            usedSpace = ((options.innerRadius / options.radius) * 100),
            i,
            length = stops.length,
            currentStop,
            currentStops = [];

        for (i = 0; i < length; i++) {
            currentStop = deepExtend({}, stops[i]);
            currentStop.offset = (currentStop.offset * (100 -  usedSpace) + usedSpace) / 100;
            currentStops.push(currentStop);
        }

        return currentStops;
    }

    decodeEntities._element = document.createElement("span");

    // Exports ================================================================
    deepExtend(kendo.dataviz, {
        AXIS_LABEL_CLICK: AXIS_LABEL_CLICK,
        COORD_PRECISION: COORD_PRECISION,
        DEFAULT_PRECISION: DEFAULT_PRECISION,
        DEFAULT_WIDTH: DEFAULT_WIDTH,
        DEFAULT_HEIGHT: DEFAULT_HEIGHT,
        DEFAULT_FONT: DEFAULT_FONT,
        INITIAL_ANIMATION_DURATION: INITIAL_ANIMATION_DURATION,
        NOTE_CLICK: NOTE_CLICK,
        NOTE_HOVER: NOTE_HOVER,
        CLIP: CLIP,

        Axis: Axis,
        AxisLabel: AxisLabel,
        Box2D: Box2D,
        BoxElement: BoxElement,
        ChartElement: ChartElement,
        CurveProcessor: CurveProcessor,
        ExportMixin: ExportMixin,
        FloatElement: FloatElement,
        LogarithmicAxis: LogarithmicAxis,
        LRUCache: LRUCache,
        Note: Note,
        NumericAxis: NumericAxis,
        Point2D: Point2D,
        Ring: Ring,
        RootElement: RootElement,
        Sector: Sector,
        ShapeBuilder: ShapeBuilder,
        ShapeElement: ShapeElement,
        Text: Text,
        TextBox: TextBox,
        Title: Title,

        append: append,
        defined: defined,
        last: last,
        limitValue: limitValue,

        alignPathToPixel: alignPathToPixel,
        autoFormat: autoFormat,
        autoMajorUnit: autoMajorUnit,
        boxDiff: boxDiff,
        dateComparer: dateComparer,
        decodeEntities: decodeEntities,
        getSpacing: getSpacing,
        inArray: inArray,
        interpolateValue: interpolateValue,
        mwDelta: mwDelta,
        rotatePoint: rotatePoint,
        round: round,
        ceil: ceil,
        floor: floor
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
