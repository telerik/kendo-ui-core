kendo_module({
    id: "dataviz-core",
    name: "Core",
    description: "The DataViz core functions",
    category: "dataviz",
    depends: [ "core" ]
});

(function ($, undefined) {

    // Imports ================================================================
    var doc = document,
        kendo = window.kendo,
        dataviz = kendo.dataviz = {},
        Class = kendo.Class,
        template = kendo.template,
        map = $.map,
        noop = $.noop,
        indexOf = $.inArray,
        math = Math,
        deepExtend = kendo.deepExtend;

    var renderTemplate = function(definition) {
        return template(definition, { useWithBlock: false, paramName: "d" });
    };

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
        DEFAULT_FONT = "12px sans-serif",
        DEFAULT_HEIGHT = 400,
        DEFAULT_PRECISION = 6,
        DEFAULT_WIDTH = 600,
        DEGREE = math.PI / 180,
        FADEIN = "fadeIn",
        FORMAT_REGEX = /\{\d+:?/,
        HEIGHT = "height",
        ID_PREFIX = "k",
        INITIAL_ANIMATION_DURATION = 600,
        LEFT = "left",
        LINEAR = "linear",
        MAX_VALUE = Number.MAX_VALUE,
        MIN_VALUE = -Number.MAX_VALUE,
        NONE = "none",
        OUTSIDE = "outside",
        RADIAL = "radial",
        RIGHT = "right",
        SWING = "swing",
        TOP = "top",
        UNDEFINED = "undefined",
        UPPERCASE_REGEX = /([A-Z])/g,
        WIDTH = "width",
        WHITE = "#fff",
        X = "x",
        Y = "y",
        ZERO_THRESHOLD = 0.2;

    function getSpacing(value) {
        var spacing = { top: 0, right: 0, bottom: 0, left: 0 };

        if (typeof(value) === "number") {
            spacing[TOP] = spacing[RIGHT] = spacing[BOTTOM] = spacing[LEFT] = value;
        } else {
            spacing[TOP] = value[TOP] || 0;
            spacing[RIGHT] = value[RIGHT] || 0;
            spacing[BOTTOM] = value[BOTTOM] || 0;
            spacing[LEFT] = value[LEFT] || 0;
        }

        return spacing;
    }

    // Geometric primitives ===================================================

    var Point2D = function(x, y) {
        var point = this;
        if (!(point instanceof Point2D)) {
            return new Point2D(x, y);
        }

        point.x = round(x || 0, COORD_PRECISION);
        point.y = round(y || 0, COORD_PRECISION);
    };

    Point2D.fn = Point2D.prototype = {
        clone: function() {
            var point = this;

            return new Point2D(point.x, point.y);
        }
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

        move: function(x, y) {
            var box = this,
                height = box.height(),
                width = box.width();

            box.x1 = x;
            box.y1 = y;
            box.x2 = box.x1 + width;
            box.y2 = box.y1 + height;

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

            return {
                x: box.x1 + box.width() / 2,
                y: box.y1 + box.height() / 2
            };
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

        middle: function() {
            return this.startAngle + this.angle / 2;
        },

        radius: function(newRadius, innerRadius) {
            var that = this;

            if (innerRadius) {
                that.ir = newRadius;
            } else {
                that.r = newRadius;
            }

            return that;
        },

        point: function(angle, innerRadius) {
            var ring = this,
                radianAngle = angle * DEGREE,
                ax = math.cos(radianAngle),
                ay = math.sin(radianAngle),
                radius = innerRadius ? ring.ir : ring.r,
                x = ring.c.x - (ax * radius),
                y = ring.c.y - (ay * radius);

            return new Point2D(x, y);
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

    var Pin = Class.extend({
        init: function(options) {
            deepExtend(this, {
                height: 40,
                rotation: 90,
                radius: 10,
                arcAngle: 10
            }, options);
        }
    });

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

        getViewElements: function(view) {
            var element = this,
                options = element.options,
                modelId = options.modelId,
                viewElements = [],
                root,
                children = element.children,
                i,
                child,
                childrenCount = children.length;

            for (i = 0; i < childrenCount; i++) {
                child = children[i];

                if (!child.discoverable) {
                    child.options = child.options || {};
                    child.options.modelId = modelId;
                }

                viewElements.push.apply(
                    viewElements, child.getViewElements(view));
            }

            if (element.discoverable) {
                root = element.getRoot();
                if (root) {
                    root.modelMap[modelId] = element;
                }
            }

            return viewElements;
        },

        enableDiscovery: function() {
            var element = this,
                options = element.options;

            options.modelId = uniqueId();
            element.discoverable = true;
        },

        disableDiscovery: function() {
            var element = this,
                children = element.children,
                root = element.getRoot(),
                modelId = element.options.modelId,
                i;

            if (root && modelId) {
                delete root.modelMap[modelId];
            }

            for (i = 0; i < children.length; i++) {
                children[i].disableDiscovery();
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
            var element = this,
                i,
                length = arguments.length;

            append(element.children, arguments);

            for (i = 0; i < length; i++) {
                arguments[i].parent = element;
            }
        }
    });

    var RootElement = ChartElement.extend({
        init: function(options) {
            var root = this;

            // Logical tree ID to element map
            root.modelMap = {};

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

        getViewElements: function(view) {
            var root = this,
                options = root.options,
                border = options.border || {},
                box = root.box.clone().pad(options.margin).unpad(border.width),
                elements = [
                        view.createRect(box, {
                            stroke: border.width ? border.color : "",
                            strokeWidth: border.width,
                            dashType: border.dashType,
                            fill: options.background,
                            fillOpacity: options.opacity,
                            zIndex: options.zIndex })
                    ];

            return elements.concat(
                ChartElement.fn.getViewElements.call(root, view)
            );
        },

        getRoot: function() {
            return this;
        }
    });

    var BoxElement = ChartElement.extend({
        init: function(options) {
            ChartElement.fn.init.call(this, options);
        },

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
                margin = getSpacing(options.margin),
                padding = getSpacing(options.padding),
                borderWidth = options.border.width;

            function reflowPaddingBox() {
                element.align(targetBox, X, options.align);
                element.align(targetBox, Y, options.vAlign);
                element.paddingBox = box.clone().unpad(margin).unpad(borderWidth);
            }

            ChartElement.fn.reflow.call(element, targetBox);

            if (options.width && options.height) {
                box = element.box = new Box2D(0, 0, options.width, options.height);
            } else {
                box = element.box;
            }

            if (options.shrinkToFit) {
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

        getViewElements: function(view, renderOptions) {
            var boxElement = this,
                options = boxElement.options,
                elements = [];

            if (!options.visible) {
                return [];
            }


            if (boxElement.hasBox()) {
                elements.push(
                    view.createRect(
                        boxElement.paddingBox,
                        deepExtend(boxElement.elementStyle(), renderOptions)
                    )
                );
            }

            return elements.concat(
                ChartElement.fn.getViewElements.call(boxElement, view)
            );
        },

        elementStyle: function() {
            var boxElement = this,
                options = boxElement.options,
                border = options.border || {};

            return {
                id: options.id,
                stroke: border.width ? border.color : "",
                strokeWidth: border.width,
                dashType: border.dashType,
                strokeOpacity: options.opacity,
                fill: options.background,
                fillOpacity: options.opacity,
                animation: options.animation,
                zIndex: options.zIndex,
                data: { modelId: options.modelId }
            };
        }
    });

    var Text = ChartElement.extend({
        init: function(content, options) {
            var text = this;

            ChartElement.fn.init.call(text, options);

            // Calculate size
            text.content = content;
            text.reflow(new Box2D());
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
                measureText(text.content, { font: options.font }, options.rotation);

            text.baseline = size.baseline;

            if (options.align == LEFT) {
                text.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x1 + size.width, targetBox.y1 + size.height);
            } else if (options.align == RIGHT) {
                text.box = new Box2D(
                    targetBox.x2 - size.width, targetBox.y1,
                    targetBox.x2, targetBox.y1 + size.height);
            } else if (options.align == CENTER) {
                margin = (targetBox.width() - size.width) / 2;
                text.box = new Box2D(
                    round(targetBox.x1 + margin, COORD_PRECISION), targetBox.y1,
                    round(targetBox.x2 - margin, COORD_PRECISION), targetBox.y1 + size.height);
            }

            if (options.vAlign == CENTER) {
                margin = (targetBox.height() - size.height) /2;
                text.box = new Box2D(
                    text.box.x1, targetBox.y1 + margin,
                    text.box.x2, targetBox.y2 - margin);
            } else if (options.vAlign == BOTTOM) {
                text.box = new Box2D(
                    text.box.x1, targetBox.y2 - size.height,
                    text.box.x2, targetBox.y2);
            } else if (options.vAlign == TOP) {
                text.box = new Box2D(
                    text.box.x1, targetBox.y1,
                    text.box.x2, targetBox.y1 + size.height);
            }
        },

        getViewElements: function(view) {
            var text = this,
                options = text.options;

            ChartElement.fn.getViewElements.call(this, view);

            return [
                view.createText(text.content,
                    deepExtend({}, options, {
                        x: text.box.x1, y: text.box.y1,
                        baseline: text.baseline,
                        data: { modelId: options.modelId }
                    })
                )
            ];
        }
    });

    var TextBox = BoxElement.extend({
        init: function(content, options) {
            var textBox = this,
                text;

            BoxElement.fn.init.call(textBox, options);
            options = textBox.options;

            text = new Text(content, deepExtend({ }, options, { align: LEFT, vAlign: TOP }));
            textBox.append(text);

            if (textBox.hasBox()) {
                text.options.id = uniqueId();
            }

            // Calculate size
            textBox.reflow(new Box2D());
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
        init: function(value, index, dataItem, options) {
            var label = this,
                text = value;

            if (options.template) {
                label.template = template(options.template);
                text = label.template({ value: value, dataItem: dataItem });
            } else if (options.format) {
                text = label.formatValue(value, options);
            }

            label.text = text;
            label.value = value;
            label.index = index;
            label.dataItem = dataItem;

            TextBox.fn.init.call(label, text,
                deepExtend({ id: uniqueId() }, options)
            );

            label.enableDiscovery();
        },

        formatValue: function(value, options) {
            return autoFormat(options.format, value);
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
                size: 4
            },
            minorTicks: {
                align: OUTSIDE,
                size: 3
            },
            axisCrossingValue: 0,
            majorTickType: OUTSIDE,
            minorTickType: NONE,
            minorGridLines: {
                visible: false,
                width: 1,
                color: BLACK
            },
            // TODO: Move to line or labels options
            margin: 5,
            visible: true,
            reverse: false,
            justified: true,

            _alignLines: true
        },

        // abstract labelsCount(): Number
        // abstract createAxisLabel(index, options): AxisLabel

        createLabels: function() {
            var axis = this,
                options = axis.options,
                align = options.vertical ? RIGHT : CENTER,
                labelOptions = deepExtend({ }, options.labels, {
                    align: align, zIndex: options.zIndex,
                    modelId: options.modelId
                }),
                step = labelOptions.step;

            axis.labels = [];

            if (labelOptions.visible) {
                var labelsCount = axis.labelsCount(),
                    label,
                    i;

                for (i = labelOptions.skip; i < labelsCount; i += step) {
                    label = axis.createAxisLabel(i, labelOptions);
                    axis.append(label);
                    axis.labels.push(label);
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
                new Box2D(axisX, box.y1 + startMargin, axisX, box.y2 - endMargin) :
                new Box2D(box.x1 + startMargin, axisY, box.x2 - endMargin, axisY);
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

        renderTicks: function(view) {
            var axis = this,
                ticks = [],
                options = axis.options,
                lineBox = axis.lineBox(),
                mirror = options.labels.mirror,
                tickX, tickY, pos,
                lineOptions;

            function render(tickPositions, unit, tick, visible, skipUnit) {
                var skip = skipUnit / unit, i,
                    count = tickPositions.length;

                if (visible) {
                    for (i = 0; i < count; i++) {
                        if (i % skip === 0) {
                            continue;
                        }

                        tickX = mirror ? lineBox.x2 : lineBox.x2 - tick.size;
                        tickY = mirror ? lineBox.y1 - tick.size : lineBox.y1;
                        pos = tickPositions[i];
                        lineOptions = {
                                strokeWidth: tick.width,
                                stroke: tick.color,
                                align: options._alignLines
                            };

                        if (options.vertical) {
                            ticks.push(view.createLine(
                                tickX, pos, tickX + tick.size, pos, lineOptions));
                        } else {
                            ticks.push(view.createLine(
                                pos, tickY, pos, tickY + tick.size, lineOptions));
                        }
                    }
                }
            }

            render(
                axis.getMajorTickPositions(), options.majorUnit,
                options.majorTicks, options.majorTicks.visible
            );

            render(
                axis.getMinorTickPositions(), options.minorUnit,
                options.minorTicks, options.minorTicks.visible,
                options.majorTicks.visible ? options.majorUnit : 0
            );

            return ticks;
        },

        getViewElements: function(view) {
            var axis = this,
                options = axis.options,
                line = options.line,
                lineBox = axis.lineBox(),
                childElements = ChartElement.fn.getViewElements.call(axis, view),
                lineOptions;

            if (line.width > 0 && line.visible) {
                lineOptions = {
                    strokeWidth: line.width,
                    stroke: line.color,
                    dashType: line.dashType,
                    zIndex: line.zIndex,
                    align: options._alignLines
                };

                childElements.push(view.createLine(
                    lineBox.x1, lineBox.y1, lineBox.x2, lineBox.y2,
                    lineOptions));

                append(childElements, axis.renderTicks(view));
            }

            append(childElements, axis.renderPlotBands(view));

            return childElements;
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

        renderPlotBands: function(view) {
            var axis = this,
                options = axis.options,
                plotBands = options.plotBands || [],
                vertical = options.vertical,
                result = [],
                plotArea = axis.plotArea,
                slotX,
                slotY,
                from,
                to;

            if (plotBands.length) {
                result = map(plotBands, function(item) {
                    from = defined(item.from) ? item.from : MIN_VALUE;
                    to = defined(item.to) ? item.to : MAX_VALUE;

                    if (vertical) {
                        slotX = plotArea.axisX.lineBox();
                        slotY = axis.getSlot(item.from, item.to);
                    } else {
                        slotX = axis.getSlot(item.from, item.to);
                        slotY = plotArea.axisY.lineBox();
                    }

                    return view.createRect(
                            new Box2D(slotX.x1, slotY.y1, slotX.x2, slotY.y2),
                            { fill: item.color, fillOpacity: item.opacity, zIndex: -1 });
                });
            }

            return result;
        },

        renderGridLines: function(view, altAxis) {
            var axis = this,
                modelId = axis.plotArea.options.modelId,
                options = axis.options,
                vertical = options.vertical,
                lineBox = altAxis.lineBox(),
                lineStart = lineBox[vertical ? "x1" : "y1"],
                lineEnd = lineBox[vertical ? "x2" : "y2" ],
                majorTicks = axis.getMajorTickPositions(),
                gridLines = [],
                gridLine = function (pos, options) {
                    return {
                        pos: pos,
                        options: options
                    };
                };

            if (options.majorGridLines.visible) {
                gridLines = map(majorTicks, function(pos) {
                                return gridLine(pos, options.majorGridLines);
                            });
            }

            if (options.minorGridLines.visible) {
                gridLines = gridLines.concat(
                    map(axis.getMinorTickPositions(), function(pos) {
                        if (options.majorGridLines.visible) {
                            if (!inArray(pos, majorTicks)) {
                                return gridLine(pos, options.minorGridLines);
                            }
                        } else {
                            return gridLine(pos, options.minorGridLines);
                        }
                    }
                ));
            }

            return map(gridLines, function(line) {
                var gridLineOptions = {
                        data: { modelId: modelId },
                        strokeWidth: line.options.width,
                        stroke: line.options.color,
                        dashType: line.options.dashType,
                        zIndex: -1
                    },
                    linePos = round(line.pos),
                    altAxisBox = altAxis.lineBox();

                if (vertical) {
                    if (!altAxis.options.line.visible || altAxisBox.y1 !== linePos) {
                        return view.createLine(
                            lineStart, linePos, lineEnd, linePos,
                            gridLineOptions);
                    }
                } else {
                    if (!altAxis.options.line.visible || altAxisBox.x1 !== linePos) {
                        return view.createLine(
                            linePos, lineStart, linePos, lineEnd,
                            gridLineOptions);
                    }
                }
            });
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
                label,
                i;

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
                axis.box = new Box2D(
                    box.x1, box.y1,
                    box.x1 + maxLabelWidth + space, box.y2
                );
            } else {
                axis.box = new Box2D(
                    box.x1, box.y1,
                    box.x2, box.y1 + maxLabelHeight + space
                );
            }

            axis.arrangeTitle();
            axis.arrangeLabels(maxLabelWidth, maxLabelHeight);
        },

        arrangeLabels: function() {
            var axis = this,
                options = axis.options,
                labelOptions = options.labels,
                labels = axis.labels,
                labelsBetweenTicks = !options.justified,
                vertical = options.vertical,
                lineBox = axis.lineBox(),
                mirror = options.labels.mirror,
                tickPositions = axis.getMajorTickPositions(),
                labelOffset = axis.getActualTickSize() + options.margin,
                labelBox,
                labelY,
                i;

            for (i = 0; i < labels.length; i++) {
                var label = labels[i],
                    tickIx = labelOptions.skip + labelOptions.step * i,
                    labelSize = vertical ? label.box.height() : label.box.width(),
                    labelPos = tickPositions[tickIx] - (labelSize / 2),
                    firstTickPosition,
                    nextTickPosition,
                    middle,
                    labelX;

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

                    labelBox = new Box2D(firstTickPosition, labelY,
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
        }
    });

    var NumericAxis = Axis.extend({
        init: function(seriesMin, seriesMax, options) {
            var axis = this,
                defaultOptions = axis.initDefaults(seriesMin, seriesMax, options);

            Axis.fn.init.call(axis, defaultOptions);
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

            if (autoMin < 0) {
                autoMin -= majorUnit;
            }

            if (autoMax > 0) {
                autoMax += majorUnit;
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
            var options = this.options,
                range = options.max - options.min;

            return math.floor(round(range / stepValue, COORD_PRECISION)) + 1;
        },

        getTickPositions: function(stepValue) {
            var axis = this,
                options = axis.options,
                vertical = options.vertical,
                reverse = options.reverse,
                lineBox = axis.lineBox(),
                lineSize = vertical ? lineBox.height() : lineBox.width(),
                range = options.max - options.min,
                scale = lineSize / range,
                step = stepValue * scale,
                divisions = axis.getDivisions(stepValue),
                dir = (vertical ? -1 : 1) * (reverse ? -1 : 1),
                startEdge = dir === 1 ? 1 : 2,
                pos = lineBox[(vertical ? Y : X) + startEdge],
                positions = [],
                i;

            for (i = 0; i < divisions; i++) {
                positions.push(round(pos, COORD_PRECISION));
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

        getSlot: function(a, b) {
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

            a = math.max(math.min(a, options.max), options.min);
            b = math.max(math.min(b, options.max), options.min);

            if (vertical) {
                p1 = options.max - math.max(a, b);
                p2 = options.max - math.min(a, b);
            } else {
                p1 = math.min(a, b) - options.min;
                p2 = math.max(a, b) - options.min;
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
                value = round(options.min + (index * options.majorUnit), DEFAULT_PRECISION);

            return new AxisLabel(value, index, null, labelOptions);
        }
    });

    // View base classes ======================================================
    var ViewElement = Class.extend({
        init: function(options) {
            var element = this;
            element.children = [];
            element.options = deepExtend({}, element.options, options);
            element.modelIdAttr = kendo.support.browser.msie ? "data-id" : "id";
        },

        render: function() {
            return this.template(this);
        },

        renderContent: function() {
            var element = this,
                output = "",
                sortedChildren = element.sortChildren(),
                childrenCount = sortedChildren.length,
                i;

            for (i = 0; i < childrenCount; i++) {
                output += sortedChildren[i].render();
            }

            return output;
        },

        sortChildren: function() {
            var element = this,
                children = element.children,
                length,
                i;

            for (i = 0, length = children.length; i < length; i++) {
                children[i]._childIndex = i;
            }

            return children.slice(0).sort(element.compareChildren);
        },

        refresh: $.noop,

        compareChildren: function(a, b) {
            var aValue = a.options.zIndex || 0,
                bValue = b.options.zIndex || 0;

            if (aValue !== bValue) {
                return aValue - bValue;
            }

            return a._childIndex - b._childIndex;
        },

        renderId: function(id) {
            return this.renderAttr(this.modelIdAttr, id);
        },

        renderAttr: function (name, value) {
            return defined(value) ? " " + name + "='" + value + "' " : "";
        },

        renderDataAttributes: function() {
            var element = this,
                data = element.options.data,
                key,
                attr,
                output = "";

            for (key in data) {
                attr = "data-" + key.replace(UPPERCASE_REGEX, "-$1").toLowerCase();
                output += element.renderAttr(attr, data[key]);
            }

            return output;
        }
    });

    var ViewBase = ViewElement.extend({
        init: function(options) {
            var view = this;

            ViewElement.fn.init.call(view, options);

            view.definitions = {};
            view.decorators = [];
            view.animations = [];
        },

        renderDefinitions: function() {
            var definitions = this.definitions,
                definitionId,
                output = "";

            for (definitionId in definitions) {
                if (definitions.hasOwnProperty(definitionId)) {
                    output += definitions[definitionId].render();
                }
            }

            return output;
        },

        decorate: function(element) {
            var decorators = this.decorators,
                i,
                length = decorators.length,
                currentDecorator;

            for (i = 0; i < length; i++) {
                currentDecorator = decorators[i];
                this._decorateChildren(currentDecorator, element);
                element = currentDecorator.decorate.call(currentDecorator, element);
            }

            return element;
        },

        _decorateChildren: function(decorator, element) {
            var view = this,
                children = element.children,
                i,
                length = children.length;

            for (i = 0; i < length; i++) {
                view._decorateChildren(decorator, children[i]);
                children[i] = decorator.decorate.call(decorator, children[i]);
            }
        },

        setupAnimations: function() {
            var animations = this.animations,
                i,
                count = animations.length;

            for (i = 0; i < count; i++) {
                animations[i].setup();
            }
        },

        playAnimations: function() {
            var animations = this.animations;

            while (animations.length > 0) {
                animations.shift().play();
            }
        },

        buildGradient: function(options) {
            var view = this,
                cache = view._gradientCache,
                hashCode,
                overlay,
                definition;

            if (!cache) {
                cache = view._gradientCache = [];
            }

            if (options) {
                hashCode = getHash(options);
                overlay = cache[hashCode];
                definition = dataviz.Gradients[options.gradient];
                if (!overlay && definition) {
                    overlay = deepExtend({ id: uniqueId() }, definition, options);
                    cache[hashCode] = overlay;
                }
            }

            return overlay;
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

    // Animations =============================================================
    var ElementAnimation = Class.extend({
        init: function(element, options) {
            var anim = this;

            anim.options = deepExtend({}, anim.options, options);
            anim.element = element;
        },

        options: {
            duration: INITIAL_ANIMATION_DURATION,
            easing: SWING
        },

        play: function() {
            var anim = this,
                options = anim.options,
                element = anim.element,
                elementId = element.options.id,
                domElement,
                delay = options.delay || 0,
                start = +new Date() + delay,
                duration = options.duration,
                finish = start + duration,
                easing = $.easing[options.easing],
                wallTime,
                time,
                pos,
                easingPos;

            setTimeout(function() {
                var loop = function() {
                    if (anim._stopped) {
                        return;
                    }

                    wallTime = +new Date();
                    time = math.min(wallTime - start, duration);
                    pos = time / duration;
                    easingPos = easing(pos, time, 0, 1, duration);

                    anim.step(easingPos);

                    if (!domElement || detached(domElement)) {
                        domElement = getElement(elementId);
                    }

                    element.refresh(domElement);

                    if (wallTime < finish) {
                        requestAnimFrame(loop);
                    } else {
                        anim.destroy();
                    }
                };

                loop();
            }, delay);
        },

        abort: function() {
            this._stopped = true;
            this.destroy();
        },

        destroy: noop,

        setup: noop,

        step: noop
    });

    var FadeAnimation = ElementAnimation.extend({
        options: {
            duration: 200,
            easing: LINEAR
        },

        setup: function() {
            var anim = this,
                options = anim.element.options;

            anim.targetFillOpacity = options.fillOpacity;
            anim.targetStrokeOpacity = options.strokeOpacity;
            options.fillOpacity = options.strokeOpacity = 0;
        },

        step: function(pos) {
            var anim = this,
                options = anim.element.options;

            options.fillOpacity = pos * anim.targetFillOpacity;
            options.strokeOpacity = pos * anim.targetStrokeOpacity;
        }
    });

    var ExpandAnimation = ElementAnimation.extend({
        options: {
            size: 0,
            easing: LINEAR
        },

        setup: function() {
            var points = this.element.points;

            points[1].x = points[2].x = points[0].x;
        },

        step: function(pos) {
            var options = this.options,
                size = interpolateValue(0, options.size, pos),
                points = this.element.points;

            // Expands rectangle to the right
            points[1].x = points[2].x = points[0].x + size;
        },

        destroy: function() {
            // Unwrap all child elements
            this.element.destroy();
        }
    });

    var RotationAnimation = ElementAnimation.extend({
        options: {
            easing: LINEAR,
            duration: 900
        },

        setup: function() {
            var anim = this,
                element = anim.element,
                elementOptions = element.options,
                options = anim.options,
                center = options.center,
                start, end;

            if (elementOptions.rotation) {
                start = options.startAngle;
                end = elementOptions.rotation[0];

                options.duration = math.max((math.abs(start - end) / options.speed) * 1000, 1);

                anim.endState = end;
                elementOptions.rotation = [
                    start,
                    center.x,
                    center.y
                ];
            }
        },

        step: function(pos) {
            var anim = this,
                element = anim.element;

            if (element.options.rotation) {
                element.options.rotation[0] = interpolateValue(anim.options.startAngle, anim.endState, pos);
            }
        }
    });

    var BarAnimation = ElementAnimation.extend({
        options: {
            easing: SWING
        },

        setup: function() {
            var anim = this,
                element = anim.element,
                points = element.points,
                options = element.options,
                axis = options.vertical ? Y : X,
                stackBase = options.stackBase,
                aboveAxis = options.aboveAxis,
                startPosition,
                endState = anim.endState = {
                    top: points[0].y,
                    right: points[1].x,
                    bottom: points[3].y,
                    left: points[0].x
                };

            if (axis === Y) {
                startPosition = defined(stackBase) ? stackBase :
                    endState[aboveAxis ? BOTTOM : TOP];
            } else {
                startPosition = defined(stackBase) ? stackBase :
                    endState[aboveAxis ? LEFT : RIGHT];
            }

            anim.startPosition = startPosition;

            updateArray(points, axis, startPosition);
        },

        step: function(pos) {
            var anim = this,
                startPosition = anim.startPosition,
                endState = anim.endState,
                element = anim.element,
                points = element.points;

            if (element.options.vertical) {
                points[0].y = points[1].y =
                    interpolateValue(startPosition, endState.top, pos);

                points[2].y = points[3].y =
                    interpolateValue(startPosition, endState.bottom, pos);
            } else {
                points[0].x = points[3].x =
                    interpolateValue(startPosition, endState.left, pos);

                points[1].x = points[2].x =
                    interpolateValue(startPosition, endState.right, pos);
            }
        }
    });

    var BarIndicatorAnimatin = ElementAnimation.extend({
        options: {
            easing: SWING,
            duration: 1000
        },

        setup: function() {
            var anim = this,
                element = anim.element,
                points = element.points,
                options = element.options.animation,
                vertical = options.vertical,
                reverse = options.reverse,
                axis = anim.axis = vertical ? "y" : "x",
                start, end, pos,
                endPosition = anim.options.endPosition,
                initialState = anim.initialState = {
                    top: points[0].y,
                    right: points[1].x,
                    bottom: points[3].y,
                    left: points[0].x
                },
                initial = !defined(anim.options.endPosition);

            if (vertical) {
                pos = reverse ? "y2" : "y1";
                start = initialState[initial && !reverse ? BOTTOM : TOP];
                end = initial ? initialState[reverse ? BOTTOM : TOP] : endPosition[pos];
            } else {
                pos = reverse ? "x1" : "x2";
                start = initialState[initial && !reverse ? LEFT : RIGHT];
                end = initial ? initialState[reverse ? LEFT : RIGHT] : endPosition[pos];
            }

            anim.start = start;
            anim.end = end;

            if (initial) {
                updateArray(points, axis, anim.start);
            } else if (options.speed) {
                anim.options.duration = math.max((math.abs(anim.start - anim.end) / options.speed) * 1000, 1);
            }
        },

        step: function(pos) {
            var anim = this,
                start = anim.start,
                end = anim.end,
                element = anim.element,
                points = element.points,
                axis = anim.axis;

            if (element.options.animation.vertical) {
                points[0][axis] = points[1][axis] =
                    interpolateValue(start, end, pos);
            } else {
                points[1][axis] = points[2][axis] =
                    interpolateValue(start, end, pos);
            }
        }
    });

    var ArrowAnimation = ElementAnimation.extend({
        options: {
            easing: SWING,
            duration: 1000
        },

        setup: function() {
            var anim = this,
                element = anim.element,
                points = element.points,
                options = element.options.animation,
                vertical = options.vertical,
                reverse = options.reverse,
                axis = vertical ? "y" : "x",
                startPos = axis + (reverse ? "1" : "2"),
                endPos = axis + (reverse ? "2" : "1"),
                startPosition = options.startPosition[vertical ? startPos : endPos],
                halfSize = options.size / 2,
                count = points.length,
                initial = !defined(anim.options.endPosition),
                padding = halfSize,
                point,
                end,
                i;

            anim.axis = axis;
            anim.endPositions = [];
            anim.startPositions = [];

            if (!initial) {
                startPosition = points[1][axis];
                end = anim.options.endPosition[vertical ? endPos : startPos];
                if (options.speed) {
                    anim.options.duration = math.max((math.abs(startPosition - end) / options.speed) * 1000, 1);
                }
            }

            for (i = 0; i < count; i++) {
                point = deepExtend({}, points[i]);
                if (initial) {
                    anim.endPositions[i] = point[axis];
                    points[i][axis] = startPosition - padding;
                } else {
                    anim.endPositions[i] = end - padding;
                }
                anim.startPositions[i] = points[i][axis];
                padding -= halfSize;
            }
        },

        step: function(pos) {
            var anim = this,
                startPositions = anim.startPositions,
                endPositions = anim.endPositions,
                element = anim.element,
                points = element.points,
                axis = anim.axis,
                count = points.length,
                i;

            for (i = 0; i < count; i++) {
                points[i][axis] = interpolateValue(startPositions[i], endPositions[i], pos);
            }
        }
    });

    function animationDecorator(animationName, animationType) {
        return Class.extend({
            init: function(view) {
                this.view = view;
            },

            decorate: function(element) {
                var decorator = this,
                    view = decorator.view,
                    animation = element.options.animation,
                    animationObject;

                if (animation && animation.type === animationName && view.options.transitions) {
                    animationObject = element._animation = new animationType(element, animation);
                    view.animations.push(animationObject);
                }

                return element;
            }
        });
    }

    var FadeAnimationDecorator = animationDecorator(FADEIN, FadeAnimation);

    // Helper functions========================================================
    var Color = function(value) {
        var color = this,
            formats = Color.formats,
            re,
            processor,
            parts,
            i,
            channels;

        if (arguments.length === 1) {
            value = color.resolveColor(value);

            for (i = 0; i < formats.length; i++) {
                re = formats[i].re;
                processor = formats[i].process;
                parts = re.exec(value);

                if (parts) {
                    channels = processor(parts);
                    color.r = channels[0];
                    color.g = channels[1];
                    color.b = channels[2];
                }
            }
        } else {
            color.r = arguments[0];
            color.g = arguments[1];
            color.b = arguments[2];
        }

        color.r = color.normalizeByte(color.r);
        color.g = color.normalizeByte(color.g);
        color.b = color.normalizeByte(color.b);
    };

    Color.prototype = {
        toHex: function() {
            var color = this,
                pad = color.padDigit,
                r = color.r.toString(16),
                g = color.g.toString(16),
                b = color.b.toString(16);

            return "#" + pad(r) + pad(g) + pad(b);
        },

        resolveColor: function(value) {
            value = value || BLACK;

            if (value.charAt(0) == "#") {
                value = value.substr(1, 6);
            }

            value = value.replace(/ /g, "");
            value = value.toLowerCase();
            value = Color.namedColors[value] || value;

            return value;
        },

        normalizeByte: function(value) {
            return (value < 0 || isNaN(value)) ? 0 : ((value > 255) ? 255 : value);
        },

        padDigit: function(value) {
            return (value.length === 1) ? "0" + value : value;
        },

        brightness: function(value) {
            var color = this,
                round = math.round;

            color.r = round(color.normalizeByte(color.r * value));
            color.g = round(color.normalizeByte(color.g * value));
            color.b = round(color.normalizeByte(color.b * value));

            return color;
        }
    };

    Color.formats = [{
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            process: function(parts) {
                return [
                    parseInt(parts[1], 10), parseInt(parts[2], 10), parseInt(parts[3], 10)
                ];
            }
        }, {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            process: function(parts) {
                return [
                    parseInt(parts[1], 16), parseInt(parts[2], 16), parseInt(parts[3], 16)
                ];
            }
        }, {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            process: function(parts) {
                return [
                    parseInt(parts[1] + parts[1], 16),
                    parseInt(parts[2] + parts[2], 16),
                    parseInt(parts[3] + parts[3], 16)
                ];
            }
        }
    ];

    Color.namedColors = {
        aqua: "00ffff", azure: "f0ffff", beige: "f5f5dc",
        black: "000000", blue: "0000ff", brown: "a52a2a",
        coral: "ff7f50", cyan: "00ffff", darkblue: "00008b",
        darkcyan: "008b8b", darkgray: "a9a9a9", darkgreen: "006400",
        darkorange: "ff8c00", darkred: "8b0000", dimgray: "696969",
        fuchsia: "ff00ff", gold: "ffd700", goldenrod: "daa520",
        gray: "808080", green: "008000", greenyellow: "adff2f",
        indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c",
        lightblue: "add8e6", lightgrey: "d3d3d3", lightgreen: "90ee90",
        lightpink: "ffb6c1", lightyellow: "ffffe0", lime: "00ff00",
        limegreen: "32cd32", linen: "faf0e6", magenta: "ff00ff",
        maroon: "800000", mediumblue: "0000cd", navy: "000080",
        olive: "808000", orange: "ffa500", orangered: "ff4500",
        orchid: "da70d6", pink: "ffc0cb", plum: "dda0dd",
        purple: "800080", red: "ff0000", royalblue: "4169e1",
        salmon: "fa8072", silver: "c0c0c0", skyblue: "87ceeb",
        slateblue: "6a5acd", slategray: "708090", snow: "fffafa",
        steelblue: "4682b4", tan: "d2b48c", teal: "008080",
        tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee",
        wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5",
        yellow: "ffff00", yellowgreen: "9acd32"
    };

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

    function measureText(text, style, rotation) {
        var styleHash = getHash(style),
            cacheKey = text + styleHash + rotation,
            cachedResult = measureText.cache.get(cacheKey),
            size = {
                width: 0,
                height: 0,
                baseline: 0
            };

        if (cachedResult) {
            return cachedResult;
        }

        var measureBox = measureText.measureBox,
            baselineMarker = measureText.baselineMarker.cloneNode(false);

        if (!measureBox) {
            measureBox = measureText.measureBox =
                $("<div style='position: absolute; top: -4000px; left: -4000px;" +
                              "line-height: normal; visibility: hidden;' />")
                .appendTo(doc.body)[0];
        }

        for (var styleKey in style) {
            measureBox.style[styleKey] = style[styleKey];
        }
        measureBox.innerHTML = text;
        measureBox.appendChild(baselineMarker);

        if ((text + "").length) {
            size = {
                width: measureBox.offsetWidth - BASELINE_MARKER_SIZE,
                height: measureBox.offsetHeight,
                baseline: baselineMarker.offsetTop + BASELINE_MARKER_SIZE
            };
        }

        if (rotation) {
            var width = size.width,
                height = size.height,
                cx = width / 2,
                cy = height / 2,
                r1 = rotatePoint(0, 0, cx, cy, rotation),
                r2 = rotatePoint(width, 0, cx, cy, rotation),
                r3 = rotatePoint(width, height, cx, cy, rotation),
                r4 = rotatePoint(0, height, cx, cy, rotation);

            size.normalWidth = width;
            size.normalHeight = height;
            size.width = math.max(r1.x, r2.x, r3.x, r4.x) - math.min(r1.x, r2.x, r3.x, r4.x);
            size.height = math.max(r1.y, r2.y, r3.y, r4.y) - math.min(r1.y, r2.y, r3.y, r4.y);
        }

        measureText.cache.put(cacheKey, size);

        return size;
    }

    measureText.cache = new LRUCache(1000);
    measureText.baselineMarker =
        $("<div class='" + CSS_PREFIX + "baseline-marker' " +
            "style='display: inline-block; vertical-align: baseline;" +
            "width: " + BASELINE_MARKER_SIZE + "px; height: " + BASELINE_MARKER_SIZE + "px;" +
            "overflow: hidden;' />")[0];

    function autoMajorUnit(min, max) {
        var diff = max - min;

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

    var uniqueId = (function() {
        // Implements 32-bit Linear feedback shift register
        var lfsr = 1;

        return function() {
            lfsr = ((lfsr >>> 1) ^ (-(lfsr & 1) & 0xD0000001)) >>> 0;
            return ID_PREFIX + lfsr.toString(16);
        };
    })();

    function rotatePoint(x, y, cx, cy, angle) {
        var theta = angle * DEGREE;

        return {
            x: cx + (x - cx) * math.cos(theta) + (y - cy) * math.sin(theta),
            y: cy - (x - cx) * math.sin(theta) + (y - cy) * math.cos(theta)
        };
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
        result[0] = new Box2D(b, e, c, f);
        result[1] = new Box2D(a, f, b, g);
        result[2] = new Box2D(c, f, d, g);
        result[3] = new Box2D(b, g, c, h);

        // decide which corners
        if( r.x1 == a && r.y1 == e || s.x1 == a && s.y1 == e )
        { // corners 0 and 7
            result[4] = new Box2D(a, e, b, f);
            result[5] = new Box2D(c, g, d, h);
        }
        else
        { // corners 2 and 5
            result[4] = new Box2D(c, e, d, f);
            result[5] = new Box2D(a, g, b, h);
        }

        return $.grep(result, function(box) {
            return box.height() > 0 && box.width() > 0;
        })[0];
    }

    function supportsSVG() {
        return doc.implementation.hasFeature(
            "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
    }

    var requestAnimFrame =
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) {
            setTimeout(callback, ANIMATION_STEP);
        };

    function inArray(value, array) {
        return indexOf(value, array) != -1;
    }

    function last(array) {
        return array[array.length - 1];
    }

    function append(first, second) {
        [].push.apply(first, second);
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

    function getElement(modelId) {
        if (kendo.support.browser.msie) {
            return $("[data-id='" + modelId + "']")[0];
        } else {
            return doc.getElementById(modelId);
        }
    }

    function detached(element) {
        var parent = element.parentNode;

        while(parent && parent.parentNode) {
            parent = parent.parentNode;
        }

        return parent !== doc;
    }

    // Exports ================================================================
    /**
     * @name kendo.dataviz
     * @namespace Contains Kendo DataViz.
     */
    deepExtend(kendo.dataviz, {
        init: function(element) {
            kendo.init(element, kendo.dataviz.ui);
        },

        /**
         * @name kendo.dataviz.ui
         * @namespace Contains Kendo DataViz UI widgets.
         */
        ui: {
            roles: {},
            themes: {},
            views: [],
            defaultView: function() {
                var i,
                    views = dataviz.ui.views,
                    length = views.length;

                for (i = 0; i < length; i++) {
                    if (views[i].available()) {
                        return views[i];
                    }
                }

                kendo.logToConsole("Warning: KendoUI DataViz cannot render. Possible causes:\n" +
                                    "- The browser does not support SVG or VML. User agent: " + navigator.userAgent + "\n" +
                                    "- The kendo.dataviz.svg.js or kendo.dataviz.vml.js scripts are not loaded");
            },
            registerView: function(viewType) {
                var defaultView = dataviz.ui.views[0];

                if (!defaultView || viewType.preference > defaultView.preference) {
                    dataviz.ui.views.unshift(viewType);
                } else {
                    dataviz.ui.views.push(viewType);
                }
            },
            plugin: function(widget) {
                kendo.ui.plugin(widget, dataviz.ui);
            }
        },

        AXIS_LABEL_CLICK: AXIS_LABEL_CLICK,
        COORD_PRECISION: COORD_PRECISION,
        DEFAULT_PRECISION: DEFAULT_PRECISION,
        DEFAULT_WIDTH: DEFAULT_WIDTH,
        DEFAULT_HEIGHT: DEFAULT_HEIGHT,
        DEFAULT_FONT: DEFAULT_FONT,
        INITIAL_ANIMATION_DURATION: INITIAL_ANIMATION_DURATION,
        CLIP: CLIP,

        Axis: Axis,
        AxisLabel: AxisLabel,
        Box2D: Box2D,
        BoxElement: BoxElement,
        ChartElement: ChartElement,
        Color: Color,
        ElementAnimation:ElementAnimation,
        ExpandAnimation: ExpandAnimation,
        ArrowAnimation: ArrowAnimation,
        BarAnimation: BarAnimation,
        BarIndicatorAnimatin: BarIndicatorAnimatin,
        FadeAnimation: FadeAnimation,
        FadeAnimationDecorator: FadeAnimationDecorator,
        LRUCache: LRUCache,
        NumericAxis: NumericAxis,
        Point2D: Point2D,
        Ring: Ring,
        Pin: Pin,
        RootElement: RootElement,
        RotationAnimation: RotationAnimation,
        Sector: Sector,
        Text: Text,
        TextBox: TextBox,
        Title: Title,
        ViewBase: ViewBase,
        ViewElement: ViewElement,

        animationDecorator: animationDecorator,
        append: append,
        autoFormat: autoFormat,
        autoMajorUnit: autoMajorUnit,
        boxDiff: boxDiff,
        defined: defined,
        getElement: getElement,
        getSpacing: getSpacing,
        inArray: inArray,
        interpolateValue: interpolateValue,
        last: last,
        measureText: measureText,
        rotatePoint: rotatePoint,
        round: round,
        ceil: ceil,
        floor: floor,
        supportsSVG: supportsSVG,
        renderTemplate: renderTemplate,
        uniqueId: uniqueId
    });

})(window.kendo.jQuery);
