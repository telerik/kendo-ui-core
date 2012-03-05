(function ($, undefined) {

    // Imports ================================================================
    var doc = document,
        kendo = window.kendo,
        dataviz = kendo.dataviz = {},
        Class = kendo.Class,
        baseTemplate = kendo.template,
        format = kendo.format,
        map = $.map,
        grep = $.grep,
        noop = $.noop,
        math = Math,
        deepExtend = kendo.deepExtend;

    var template = function(definition) {
        return baseTemplate(definition, { useWithBlock: false, paramName: "d" });
    }

    // Constants ==============================================================
    var ANIMATION_STEP = 10,
        BASELINE_MARKER_SIZE = 1,
        BLACK = "#000",
        BOTTOM = "bottom",
        CENTER = "center",
        COORD_PRECISION = 3,
        DEFAULT_FONT = "12px sans-serif",
        DEFAULT_HEIGHT = 400,
        DEFAULT_PRECISION = 6,
        DEFAULT_WIDTH = 600,
        DEGREE = math.PI / 180,
        FADEIN = "fadeIn",
        POINTER = "pointer",
        HEIGHT = "height",
        ID_PREFIX = "k",
        INITIAL_ANIMATION_DURATION = 600,
        LEFT = "left",
        LINEAR = "linear",
        MAX_VALUE = Number.MAX_VALUE,
        MIN_VALUE = -Number.MAX_VALUE,
        NONE = "none",
        ON_MINOR_TICKS = "onMinorTicks",
        OUTSIDE = "outside",
        INSIDE = "inside",
        RADIAL = "radial",
        RIGHT = "right",
        SWING = "swing",
        TOP = "top",
        UNDEFINED = "undefined",
        WIDTH = "width",
        WHITE = "#fff",
        X = "x",
        Y = "y",
        ZERO_THRESHOLD = 0.2;

    // Geometric primitives ===================================================
    var Point2D = Class.extend({
        init: function(x, y) {
            var point = this;
            point.x = round(x, COORD_PRECISION);
            point.y = round(y, COORD_PRECISION);
        }
    });

    var Box2D = Class.extend({
        init: function(x1, y1, x2, y2) {
            var box = this;
            box.x1 = x1 || 0;
            box.x2 = x2 || 0;
            box.y1 = y1 || 0;
            box.y2 = y2 || 0;
        },

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

        alignTo: function(targetBox, edge) {
            var box = this,
                height = box.height(),
                width = box.width(),
                axis = edge == TOP || edge == BOTTOM ? Y : X,
                offset = axis == Y ? height : width;

            if (edge == TOP || edge == LEFT) {
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

        containsPoint: function(x, y) {
            var box = this;

            return x >= box.x1 && x <= box.x2 &&
                   y >= box.y1 && y <= box.y2;
        },

        points: function() {
            var box = this;

            return [
                new Point2D(box.x1, box.y1),
                new Point2D(box.x2, box.y1),
                new Point2D(box.x2, box.y2),
                new Point2D(box.x1, box.y2)
            ];
        }
    });

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

        radius: function(newRadius, inner) {
            var that = this;

            if (inner) {
                that.ir = newRadius;
            } else {
                that.r = newRadius;
            }

            return that;
        },

        point: function(angle, inner) {
            var ring = this,
                radianAngle = angle * DEGREE,
                ax = math.cos(radianAngle),
                ay = math.sin(radianAngle),
                radius = inner ? ring.ir : ring.r,
                x = ring.c.x - (ax * radius),
                y = ring.c.y - (ay * radius);

            return new Point2D(x, y);
        },

        getBBox: function() {
            var ring = this,
                sa = ring.startAngle,
                ea = sa + ring.angle,
                x1 = MAX_VALUE, x2 = MIN_VALUE, y1 = MAX_VALUE, y2 = MIN_VALUE,
                point,
                angles,
                i;

            function getAnglesInRange(element, index, array) {
                var overflow = math.max(0, ea - 360);
                return (element >= (sa - overflow) && element <= ea);
            }

            angles = grep([sa, ea, 0, 90, 180, 270], getAnglesInRange);

            for (i = 0; i < angles.length; i++) {
                point = ring.point(angles[i]);
                x1 = math.min(x1, point.x);
                y1 = math.min(y1, point.y);
                x2 = math.max(x2, point.x);
                y2 = math.max(y2, point.y);
            }

            return new Box2D(x1, y1, x2, y2);
        }
    });

    var Sector = Ring.extend({
        init: function(center, radius, startAngle, angle) {
            Ring.fn.init.call(this, center, 0, radius, startAngle, angle);
        },

        expand: function(value) {
            this.r += value;
            return this;
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

            element.box = box;
        },

        getViewElements: function(view) {
            var element = this,
                viewElements = [],
                children = element.children,
                childrenCount = children.length;

            for (var i = 0; i < childrenCount; i++) {
                viewElements.push.apply(viewElements,
                    children[i].getViewElements(view));
            }

            return viewElements;
        },

        registerId: function(id, metadata) {
            var element = this,
                root;

            root = element.getRoot();
            if (root) {
                root.idMap[id] = element;
                if (metadata) {
                    root.idMapMetadata[id] = metadata;
                }
            }
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
        },

        getRoot: function() {
            var element = this,
                parent = element.parent;

            return parent ? parent.getRoot() : null;
        }
    });

    var RootElement = ChartElement.extend({
        init: function(options) {
            var root = this;

            root.idMap = {};
            root.idMapMetadata = {};

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
            zIndex: -1
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
            width: 0,
            height: 0,
            visible: true
        },

        reflow: function(targetBox) {
            var element = this,
                box,
                contentBox,
                options = element.options,
                children = element.children,
                margin = getSpacing(options.margin),
                padding = getSpacing(options.padding),
                border = options.border,
                borderWidth = border.width;

            ChartElement.fn.reflow.call(element, targetBox);

            if (children.length === 0) {
                box = element.box = new Box2D(0, 0, options.width, options.height);
            } else {
                box = element.box;
            }

            contentBox = element.contentBox = box.clone();

            box.pad(padding).pad(borderWidth).pad(margin);

            element.align(targetBox, X, options.align);
            element.align(targetBox, Y, options.vAlign);

            element.paddingBox = box.clone().unpad(margin).unpad(borderWidth);

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
                options = boxElement.options;

            if (!options.visible) {
                return [];
            }

            var border = options.border || {},
                elements = [];

            if (boxElement.hasBox()) {
                elements.push(
                    view.createRect(boxElement.paddingBox, deepExtend({
                        id: options.id,
                        stroke: border.width ? border.color : "",
                        strokeWidth: border.width,
                        dashType: border.dashType,
                        strokeOpacity: options.opacity,
                        fill: options.background,
                        fillOpacity: options.opacity,
                        animation: options.animation,
                        zIndex: options.zIndex
                    }, renderOptions))
                );
            }

            return elements.concat(
                ChartElement.fn.getViewElements.call(boxElement, view)
            );
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
                size = options.size = measureText(
                                        text.content,
                                        { font: options.font },
                                        options.rotation);

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
                var margin = (targetBox.width() - size.width) / 2;
                text.box = new Box2D(
                    round(targetBox.x1 + margin, COORD_PRECISION), targetBox.y1,
                    round(targetBox.x2 - margin, COORD_PRECISION), targetBox.y1 + size.height);
            }

            if (options.vAlign == CENTER) {
                var margin = (targetBox.height() - size.height) /2;
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
                        baseline: text.baseline
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

            if (!options.template) {
                content = options.format ? format(options.format, content) : content
            }

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

            title.append(
                new TextBox(title.options.text, deepExtend({}, title.options, {
                    vAlign: title.options.position
                }))
            );
        },

        options: {
            text: "",
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

            axis.createLabels();
            axis.createTitle();
        },

        options: {
            labels: {
                visible: true,
                rotation: 0,
                mirror: false,
                step: 1
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
            majorTickType: OUTSIDE,
            majorTickSize: 4,
            minorTickType: NONE,
            minorTickSize: 3,
            axisCrossingValue: 0,
            minorGridLines: {
                visible: false,
                width: 1,
                color: BLACK
            },
            // TODO: Move to line or labels options
            margin: 5,
            visible: true
        },

        createLabels: function() {
            var axis = this,
                options = axis.options,
                align = options.isVertical ? RIGHT : CENTER,
                labelOptions = deepExtend({ }, options.labels, {
                    align: align, zIndex: options.zIndex
                }),
                step = labelOptions.step;
            axis.labels = [];


            if (labelOptions.visible) {
                var labelsCount = axis.getLabelsCount(),
                    labelText,
                    label,
                    i;

                for (i = 0; i < labelsCount; i += step) {
                    labelText = axis.getLabelText(i);

                    if (labelOptions.template) {
                        labelTemplate = baseTemplate(labelOptions.template);
                        labelText = labelTemplate({ value: labelText });
                    }

                    label = new TextBox(labelText, labelOptions);
                    axis.append(label);
                    axis.labels.push(label);
                }
            }
        },

        getLabelsCount: noop,

        getLabelText: noop,

        lineBox: function() {
            var axis = this,
                options = axis.options,
                box = axis.box,
                isVertical = options.isVertical,
                mirror = options.labels.mirror,
                axisX = mirror ? box.x1 : box.x2,
                axisY = mirror ? box.y2 : box.y1;

            if (isVertical) {
                return new Box2D(axisX, box.y1, axisX, box.y2);
            }

            return new Box2D(box.x1, axisY, box.x2, axisY);
        },

        createTitle: function() {
            var axis = this,
                options = axis.options,
                titleOptions = deepExtend({
                    rotation: options.isVertical ? -90 : 0,
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
                options = axis.options,
                mirror = options.labels.mirror,
                lineBox = axis.lineBox(),
                majorTicks = axis.getMajorTickPositions(),
                ticks = [];

            if (options.majorTickType.toLowerCase() === OUTSIDE) {
                ticks = ticks.concat(map(majorTicks, function(pos) {
                    return {
                        pos: pos,
                        size: options.majorTickSize,
                        width: options.line.width,
                        color: options.line.color
                    };
                }));
            }

            if (options.minorTickType.toLowerCase() === OUTSIDE) {
                ticks = ticks.concat(map(axis.getMinorTickPositions(), function(pos) {
                    if (options.majorTickType.toLowerCase() !== NONE) {
                        if (!inArray(pos, majorTicks)) {
                            return {
                                pos: pos,
                                size: options.minorTickSize,
                                width: options.line.width,
                                color: options.line.color
                            };
                        }
                    } else {
                        return {
                            pos: pos,
                            size: options.minorTickSize,
                            width: options.line.width,
                            color: options.line.color
                        };
                    }
                }));
            }

            return map(ticks, function(tick) {
                var tickX = mirror ? lineBox.x2 : lineBox.x2 - tick.size,
                    tickY = mirror ? lineBox.y1 - tick.size : lineBox.y1;

                if (options.isVertical) {
                    return view.createLine(
                        tickX, tick.pos, tickX + tick.size, tick.pos,
                        {
                            strokeWidth: tick.width,
                            stroke: tick.color
                        }
                    );
                } else {
                    return view.createLine(
                        tick.pos, tickY, tick.pos, tickY + tick.size,
                        {
                            strokeWidth: tick.width,
                            stroke: tick.color
                        }
                    );
                }
            });
        },

        getActualTickSize: function () {
            var axis = this,
                options = axis.options,
                tickSize = 0;

            if (options.majorTickType != NONE && options.minorTickType != NONE ) {
                tickSize = math.max(options.majorTickSize, options.minorTickSize);
            } else if (options.majorTickType != NONE) {
                tickSize = options.majorTickSize;
            } else if (options.minorTickType != NONE) {
                tickSize = options.minorTickSize;
            }

            return tickSize;
        },

        renderPlotBands: function(view) {
            var axis = this,
                options = axis.options,
                plotBands = options.plotBands || [],
                isVertical = options.isVertical,
                result = [],
                plotArea = axis.parent,
                slotX,
                slotY,
                from,
                to;

            if (plotBands.length) {
                result = map(plotBands, function(item) {
                    from = defined(item.from) ? item.from : MIN_VALUE;
                    to = defined(item.to) ? item.to : MAX_VALUE;
                    item.from = math.min(from, to);
                    item.to = math.max(from, to);
                    slotX = isVertical ? plotArea.axisX.lineBox()  : plotArea.axisX.getSlot(item.from, item.to);
                    slotY = isVertical ? plotArea.axisY.getSlot(item.from, item.to) : plotArea.axisY.lineBox();
                    return view.createRect(
                            new Box2D(slotX.x1, slotY.y1, slotX.x2, slotY.y2),
                            { fill: item.color, fillOpacity: item.opacity, zIndex: -1 });
                });
            }

            return result;
        },

        reflowAxis: function(box, position) {
            var axis = this,
                options = axis.options,
                isVertical = options.isVertical,
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
                if (isVertical) {
                    maxLabelWidth += title.box.width()
                } else {
                    maxLabelHeight += title.box.height();
                }
            }

            if (isVertical) {
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
            axis.arrangeLabels(maxLabelWidth, maxLabelHeight, position);
        },

        arrangeLabels: function(maxLabelWidth, maxLabelHeight, position) {
            var axis = this,
                options = axis.options,
                labelStep = options.labels.step,
                labels = axis.labels,
                isVertical = options.isVertical,
                lineBox = axis.lineBox(),
                mirror = options.labels.mirror,
                tickPositions = axis.getMajorTickPositions(),
                tickSize = axis.getActualTickSize(),
                labelOffset = axis.getActualTickSize() + options.margin,
                labelBox,
                labelY,
                i;

            for (i = 0; i < labels.length; i++) {
                var label = labels[i],
                    tickIx = labelStep * i,
                    labelSize = isVertical ? label.box.height() : label.box.width(),
                    labelPos = tickPositions[tickIx] - (labelSize / 2),
                    firstTickPosition,
                    nextTickPosition,
                    middle,
                    labelX;

                if (isVertical) {
                    if (position == ON_MINOR_TICKS) {
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
                    if (position == ON_MINOR_TICKS) {
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
                isVertical = options.isVertical,
                title = axis.title;

            if (title) {
                if (isVertical) {
                    title.options.align = mirror ? RIGHT : LEFT;
                    title.options.vAlign = title.options.position;
                } else {
                    title.options.align = title.options.position;
                    title.options.vAlign = mirror ? TOP : BOTTOM;
                }

                title.reflow(axis.box);
            }
        }
    });

    var NumericAxis = Axis.extend({
        init: function(seriesMin, seriesMax, options) {
            var axis = this,
                defaultOptions = axis.initDefaults(seriesMin, seriesMax, options),
                labelTemplate,
                i;

            Axis.fn.init.call(axis, defaultOptions);
        },

        options: {
            min: 0,
            max: 1,
            isVertical: true,
            majorGridLines: {
                visible: true,
                width: 1,
                color: BLACK
            },
            zIndex: 1
        },

        initDefaults: function(seriesMin, seriesMax, options) {
            var axis = this,
                autoMin = axis.autoAxisMin(seriesMin, seriesMax),
                autoMax = axis.autoAxisMax(seriesMin, seriesMax),
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

            return deepExtend(autoOptions, options);
        },

        range: function() {
            var options = this.options;
            return { min: options.min, max: options.max };
        },

        reflow: function(targetBox) {
            this.reflowAxis(targetBox);
        },

        getViewElements: function(view) {
            var axis = this,
                options = axis.options,
                line = options.line,
                childElements = ChartElement.fn.getViewElements.call(axis, view),
                lineBox = axis.lineBox(),
                lineOptions;

            if (line.width > 0 && line.visible) {
                lineOptions = {
                    strokeWidth: line.width,
                    stroke: line.color,
                    dashType: line.dashType,
                    zIndex: options.zIndex
                };
                if (options.isVertical) {
                    childElements.push(view.createLine(
                        lineBox.x1, lineBox.y1,
                        lineBox.x1, lineBox.y2,
                        lineOptions));
                } else {
                    childElements.push(view.createLine(
                        lineBox.x1, lineBox.y1,
                        lineBox.x2, lineBox.y1,
                        lineOptions));
                }

                append(childElements, axis.renderTicks(view));
                append(childElements, axis.renderPlotBands(view));
            }

            return childElements;
        },

        autoAxisMax: function(min, max) {
            if (min == 0 && max == 0) {
                return 1;
            }

            var axisMax;
            if (min <= 0 && max <= 0) {
                max = min == max ? 0 : max;

                var diff = math.abs((max - min) / max);
                if(diff > ZERO_THRESHOLD) {
                    return 0;
                }

                axisMax = max - ((min - max) / 2);
            } else {
                min = min == max ? 0 : min;
                axisMax = max;
            }

            return axisMax;
        },

        autoAxisMin: function(min, max) {
            if (min == 0 && max == 0) {
                return 0;
            }

            var axisMin;
            if (min >= 0 && max >= 0) {
                min = min == max ? 0 : min;

                var diff = (max - min) / max;
                if(diff > ZERO_THRESHOLD) {
                    return 0;
                }

                axisMin = min - ((max - min) / 2);
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
                isVertical = options.isVertical,
                reverse = options.reverse,
                lineBox = axis.lineBox(),
                lineSize = isVertical ? lineBox.height() : lineBox.width(),
                range = options.max - options.min,
                scale = lineSize / range,
                step = stepValue * scale,
                divisions = axis.getDivisions(stepValue),
                dir = (isVertical ? -1 : 1) * (reverse ? -1 : 1),
                startEdge = dir === 1 ? 1 : 2,
                pos = lineBox[(isVertical ? Y : X) + startEdge],
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

            return axis.getTickPositions(axis.options.majorUnit / 5);
        },

        lineBox: function() {
            var axis = this,
                options = axis.options,
                isVertical = options.isVertical,
                labelSize = isVertical ? "height" : "width",
                labels = axis.labels,
                baseBox = Axis.fn.lineBox.call(axis),
                startMargin = 0,
                endMargin = 0;

            if (labels.length > 1) {
                startMargin = labels[0].box[labelSize]() / 2;
                endMargin = last(labels).box[labelSize]() / 2;
            }

            if (isVertical) {
               return new Box2D(baseBox.x1, baseBox.y1 + startMargin,
                 baseBox.x1, baseBox.y2 - endMargin);
            } else {
               return new Box2D(baseBox.x1 + startMargin, baseBox.y1,
                 baseBox.x2 - endMargin, baseBox.y1);
            }
        },

        getSlot: function(a, b) {
            var axis = this,
                options = axis.options,
                reverse = options.reverse,
                isVertical = options.isVertical,
                valueAxis = isVertical ? Y : X,
                lineBox = axis.lineBox(),
                lineStart = lineBox[valueAxis + (reverse ? 2 : 1)],
                lineSize = isVertical ? lineBox.height() : lineBox.width(),
                dir = reverse ? -1 : 1,
                step = dir * (lineSize / (options.max - options.min)),
                a = defined(a) ? a : options.axisCrossingValue,
                b = defined(b) ? b : options.axisCrossingValue,
                a = math.max(math.min(a, options.max), options.min),
                b = math.max(math.min(b, options.max), options.min),
                p1,
                p2,
                slotBox = new Box2D(lineBox.x1, lineBox.y1, lineBox.x1, lineBox.y1);

            if (isVertical) {
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

        getLabelsCount: function() {
            return this.getDivisions(this.options.majorUnit);
        },

        getLabelText: function(index) {
            var options = this.options;
            return round(options.min + (index * options.majorUnit), DEFAULT_PRECISION);
        }
    });

    // View base classes ======================================================
    var ViewElement = Class.extend({
        init: function(options) {
            var element = this;
            element.children = [];
            element.options = deepExtend({}, element.options, options);
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

        renderAttr: function (name, value) {
            return defined(value) ? " " + name + "='" + value + "' " : "";
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
            var anim;

            while (anim = this.animations.shift()) {
                anim.play();
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
                offset: 0.1,
                color: WHITE,
                opacity: 0
            }, {
                offset: 0.25,
                color: WHITE,
                opacity: 0.3
            }, {
                offset: 0.92,
                color: WHITE,
                opacity: 0
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
                delay = options.delay || 0,
                start = +new Date() + delay,
                duration = options.duration,
                finish = start + duration,
                domElement = doc.getElementById(element.options.id),
                easing = $.easing[options.easing],
                wallTime,
                time,
                pos,
                easingPos;

            setTimeout(function() {
                var loop = function() {
                    wallTime = +new Date();
                    time = math.min(wallTime - start, duration);
                    pos = time / duration;
                    easingPos = easing(pos, time, 0, 1, duration);

                    anim.step(easingPos);

                    element.refresh(domElement);

                    if (wallTime < finish) {
                        requestAnimFrame(loop, domElement);
                    }
                };

                loop();
            }, delay);
        },

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
        }
    });

    var RotationAnimation = ElementAnimation.extend({
        setup: function() {
            var anim = this,
                element = anim.element,
                elementOptions = element.options,
                animationOptions = anim.options,
                center = animationOptions.center;

            if (elementOptions.rotation) {
                anim.endState = elementOptions.rotation[0];
                elementOptions.rotation = [
                    animationOptions.startAngle,
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

    function animationDecorator(animationName, animationType) {
        return Class.extend({
            init: function(view) {
                this.view = view;
            },

            decorate: function(element) {
                var decorator = this,
                    view = decorator.view,
                    animation = element.options.animation;

                if (animation && animation.type === animationName && view.options.transitions) {
                    view.animations.push(
                        new animationType(element, animation)
                    );
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

    function measureText(text, style, rotation) {
        var styleHash = getHash(style),
            cacheKey = text + styleHash + rotation,
            cachedResult = measureText.cache[cacheKey];

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

        var size = {
                width: measureBox.offsetWidth - BASELINE_MARKER_SIZE,
                height: measureBox.offsetHeight,
                baseline: baselineMarker.offsetTop + BASELINE_MARKER_SIZE
            };

        if (rotation) {
            var width = size.width,
                height = size.height,
                cx = width / 2,
                cy = height / 2,
                r1 = rotatePoint(0, 0, cx, cy, rotation),
                r2 = rotatePoint(width, 0, cx, cy, rotation),
                r3 = rotatePoint(width, height, cx, cy, rotation);
                r4 = rotatePoint(0, height, cx, cy, rotation);

            size.normalWidth = width;
            size.normalHeight = height;
            size.width = math.max(r1.x, r2.x, r3.x, r4.x) - math.min(r1.x, r2.x, r3.x, r4.x);
            size.height = math.max(r1.y, r2.y, r3.y, r4.y) - math.min(r1.y, r2.y, r3.y, r4.y);
        }

        measureText.cache[cacheKey] = size;

        return size;
    }

    measureText.cache = {};
    measureText.baselineMarker =
        $("<div style='display: inline-block; vertical-align: baseline;" +
                  "width: " + BASELINE_MARKER_SIZE + "px; height: " + BASELINE_MARKER_SIZE + "px;" +
                  "zoom: 1; *display: inline; overflow: hidden;' />")[0];

    function autoMajorUnit(min, max) {
        var diff = max - min;

        if (diff == 0) {
            if (max == 0) {
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
        }
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
            return box.height() > 0 && box.width() > 0
        })[0];
    }

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
        function(callback, element) {
            setTimeout(callback, ANIMATION_STEP);
        };

    function inArray(value, array) {
        return $.inArray(value, array) != -1;
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

    // Exports ================================================================
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

                throw Error("Unsupported browser: Missing SVG and VML support.");
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

        COORD_PRECISION: COORD_PRECISION,
        DEFAULT_PRECISION: DEFAULT_PRECISION,
        DEFAULT_WIDTH: DEFAULT_WIDTH,
        DEFAULT_HEIGHT: DEFAULT_HEIGHT,
        DEFAULT_FONT: DEFAULT_FONT,
        INITIAL_ANIMATION_DURATION: INITIAL_ANIMATION_DURATION,

        Axis: Axis,
        Box2D: Box2D,
        BoxElement: BoxElement,
        ChartElement: ChartElement,
        Color: Color,
        ElementAnimation:ElementAnimation,
        ExpandAnimation: ExpandAnimation,
        FadeAnimation: FadeAnimation,
        FadeAnimationDecorator: FadeAnimationDecorator,
        NumericAxis: NumericAxis,
        Point2D: Point2D,
        Ring: Ring,
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
        autoMajorUnit: autoMajorUnit,
        defined: defined,
        getSpacing: getSpacing,
        inArray: inArray,
        interpolateValue: interpolateValue,
        last: last,
        measureText: measureText,
        rotatePoint: rotatePoint,
        round: round,
        supportsSVG: supportsSVG,
        template: template,
        uniqueId: uniqueId
    });

})(jQuery);
