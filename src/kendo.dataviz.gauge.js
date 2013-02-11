kendo_module({
    id: "gauge",
    name: "Gauge",
    category: "dataviz",
    description: "Radial gauge.",
    depends: [ "dataviz-core", "dataviz-svg" ]
});

(function ($, undefined) {

    // Imports ================================================================
    var math = Math,

        kendo = window.kendo,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        Axis = dataviz.Axis,
        Box2D = dataviz.Box2D,
        ChartElement = dataviz.ChartElement,
        NumericAxis = dataviz.NumericAxis,
        Pin = dataviz.Pin,
        Ring = dataviz.Ring,
        RootElement = dataviz.RootElement,
        RotationAnimation = dataviz.RotationAnimation,
        BarIndicatorAnimatin = dataviz.BarIndicatorAnimatin,
        ArrowAnimation = dataviz.ArrowAnimation,
        append = dataviz.append,
        animationDecorator = dataviz.animationDecorator,
        autoMajorUnit = dataviz.autoMajorUnit,
        getElement = getElement,
        getSpacing = dataviz.getSpacing,
        defined = dataviz.defined,
        rotatePoint = dataviz.rotatePoint,
        Point2D = dataviz.Point2D,
        round = dataviz.round,
        uniqueId = dataviz.uniqueId;

    // Constants ==============================================================
    var ANGULAR_SPEED = 150,
        ARROW = "arrow",
        ARROW_POINTER = "arrowPointer",
        BAR_INDICATOR = "barIndicator",
        BLACK = "#000",
        CAP_SIZE = 0.05,
        COORD_PRECISION = dataviz.COORD_PRECISION,
        MAX_VALUE = Number.MAX_VALUE,
        MIN_VALUE = -Number.MAX_VALUE,
        DEFAULT_HEIGHT = 200,
        DEFAULT_LINE_WIDTH = 0.5,
        DEFAULT_WIDTH = 200,
        DEFAULT_MIN_WIDTH = 60,
        DEFAULT_MIN_HEIGHT = 60,
        DEGREE = math.PI / 180,
        INSIDE = "inside",
        NEEDLE = "needle",
        OUTSIDE = "outside",
        RADIAL_POINTER = "radialPointer",
        ROTATION_ORIGIN = 90;

    // Gauge ==================================================================
    var Pointer = ChartElement.extend({
        init: function (scale, options) {
            var pointer = this,
                scaleOptions = scale.options;

            ChartElement.fn.init.call(pointer, options);

            options = pointer.options;

            if (!options.id) {
                options.id = uniqueId();
            }

            options.fill = options.color;

            pointer.scale = scale;

            if (defined(options.value)){
                options.value = math.min(math.max(options.value, scaleOptions.min), scaleOptions.max);
            } else {
                options.value = scaleOptions.min;
            }
        },

        options: {
            color: BLACK
        },

        value: function(newValue) {
            var pointer = this,
                options = pointer.options,
                value = options.value,
                scaleOptions = pointer.scale.options;

            if (arguments.length === 0) {
                return value;
            }

            options._oldValue = options.value;
            options.value = math.min(math.max(newValue, scaleOptions.min), scaleOptions.max);

            pointer.repaint();
        }
    });

    var RadialPointer = Pointer.extend({
        options: {
            shape: NEEDLE,
            cap: {
                size: CAP_SIZE
            },
            arrow: {
                width: 16,
                height: 14
            },
            animation: {
                type: RADIAL_POINTER,
                speed: ANGULAR_SPEED
            }
        },

        reflow: function() {
            var pointer = this,
                options = pointer.options,
                scale = pointer.scale,
                ring = scale.ring,
                c = ring.c,
                capSize = ring.r * options.cap.size;

            pointer.box = new Box2D(
                c.x - capSize, c.y - capSize,
                c.x + capSize, c.y + capSize
            );
        },

        repaint: function() {
            var pointer = this,
                scale = pointer.scale,
                options = pointer.options,
                needle = pointer.elements[0],
                animationOptions = options.animation,
                minSlotAngle = scale.slotAngle(scale.options.min),
                oldAngle = scale.slotAngle(options._oldValue) - minSlotAngle,
                animation = needle._animation;

            needle.options.rotation[0] = scale.slotAngle(options.value) - minSlotAngle;

            if (animation) {
                animation.abort();
            }

            if (animationOptions.transitions === false) {
                needle.refresh(getElement(options.id));
            } else {
                animation = needle._animation = new RotationAnimation(needle, deepExtend(animationOptions, {
                    startAngle: oldAngle,
                    reverse: scale.options.reverse
                }));
                animation.setup();
                animation.play();
            }
        },

        _renderNeedle: function(view, box, center, pointRotation) {
            var pointer = this,
                options = pointer.options,
                scale = pointer.scale,
                capSize = scale.ring.r * options.cap.size;

            return [
                view.createPolyline([
                    rotatePoint((box.x1 + box.x2) / 2,
                        box.y1 + scale.options.minorTicks.size, center.x, center.y, pointRotation
                    ),
                    rotatePoint(center.x - capSize / 2, center.y, center.x, center.y, pointRotation),
                    rotatePoint(center.x + capSize / 2, center.y, center.x, center.y, pointRotation)
                ], true, options),
                view.createCircle(center, capSize, {
                    fill: options.cap.color || options.color
                })
            ];
        },

        _renderArrow: function(view, box, center, pointRotation) {
            var pointer = this,
                options = pointer.options,
                scale = pointer.scale,
                ring = scale.ring.clone(),
                trackWidth = 5,
                arrowOptions = options.arrow,
                height = arrowOptions.height;

            ring.ir = ring.r - trackWidth;

            return [
                view.createPin(new Pin({
                    origin: rotatePoint(
                        (box.x1 + box.x2) / 2, box.y1 + height,
                        center.x, center.y, pointRotation
                    ),
                    height: arrowOptions.height,
                    radius: trackWidth,
                    rotation: pointRotation,
                    arcAngle: 180
                }), options),
                view.createRing(ring, {
                    fill: options.color
                })
            ];
        },

        renderPointer: function(view) {
            var pointer = this,
                scale = pointer.scale,
                ring = scale.ring,
                c = ring.c,
                r = ring.r,
                shape,
                options = pointer.options,
                box = new Box2D(c.x - r, c.y - r, c.x + r, c.y + r),
                center = box.center(),
                minAngle = scale.slotAngle(scale.options.min),
                pointRotation = ROTATION_ORIGIN - minAngle;

            if (options.animation !== false) {
                deepExtend(options.animation, {
                    startAngle: 0,
                    center: center,
                    reverse: scale.options.reverse
                });
            }

            deepExtend(options, {
                rotation: [
                    scale.slotAngle(options.value) - minAngle,
                    center.x,
                    center.y
                ]
            });

            if (options.shape == ARROW) {
                shape = pointer._renderArrow(view, box, center, pointRotation);
            } else {
                shape = pointer._renderNeedle(view, box, center, pointRotation);
            }

            return shape;
        },

        getViewElements: function(view) {
            var pointer = this,
                elements = pointer.renderPointer(view);

            pointer.elements = elements;

            return elements;
        }
    });

    var RadialScale = NumericAxis.extend({
        init: function (options) {
            var scale = this;

            scale.options = deepExtend({}, scale.options, options);
            scale.options.majorUnit = autoMajorUnit(scale.options.min, scale.options.max);

            Axis.fn.init.call(scale, scale.options);
            scale.options.minorUnit = scale.options.minorUnit || scale.options.majorUnit / 10;
        },

        options: {
            min: 0,
            max: 100,

            majorTicks: {
                size: 15,
                align: INSIDE,
                color: BLACK,
                width: DEFAULT_LINE_WIDTH,
                visible: true
            },

            minorTicks: {
                size: 10,
                align: INSIDE,
                color: BLACK,
                width: DEFAULT_LINE_WIDTH,
                visible: true
            },

            startAngle: -30,
            endAngle: 210,

            labels: {
                position: INSIDE,
                padding: 2
            }
        },

        reflow: function(box) {
            var scale = this,
                options = scale.options,
                center = box.center(),
                radius = math.min(box.height(), box.width()) / 2,
                ring = scale.ring || new dataviz.Ring(
                    center, radius - options.majorTicks.size,
                    radius, options.startAngle, options.endAngle - options.startAngle);

            scale.ring = ring;
            scale.box = ring.getBBox();
            scale.arrangeLabels();
        },

        slotAngle: function(value) {
            var options = this.options,
                startAngle = options.startAngle,
                reverse = options.reverse,
                angle = options.endAngle - startAngle,
                min = options.min,
                max = options.max,
                result;

            if (reverse) {
                result = options.endAngle - (value - min) / (max - min) * angle;
            } else {
                result = ((value - min) / (max - min) * angle) + startAngle;
            }

            return result;
        },

        renderTicks: function(view) {
            var scale = this,
                ticks = [],
                majorTickRing = scale.ring,
                minorTickRing = majorTickRing.clone(),
                options = scale.options,
                minorTickSize = options.minorTicks.size;

            function renderTickRing(ring, unit, tickOptions, visible, skipUnit) {
                var tickAngles = scale.tickAngles(ring, unit),
                    i, innerPoint, outerPoint,
                    skip = skipUnit / unit,
                    count = tickAngles.length;

                if (visible) {
                    for (i = 0; i < count; i++) {
                        if (i % skip === 0) {
                            continue;
                        }

                        outerPoint = ring.point(tickAngles[i]);
                        innerPoint = ring.point(tickAngles[i], true);

                        ticks.push(view.createLine(
                            innerPoint.x, innerPoint.y,
                            outerPoint.x, outerPoint.y,
                            {
                                align: false,
                                stroke: tickOptions.color,
                                strokeWidth: tickOptions.width
                            }
                        ));
                    }
                }
            }

            renderTickRing(majorTickRing, options.majorUnit, options.majorTicks, options.majorTicks.visible);

            if (options.labels.position == INSIDE) {
                minorTickRing.radius(minorTickRing.r - minorTickSize, true);
            } else {
                minorTickRing.radius(minorTickRing.ir + minorTickSize);
            }

            renderTickRing(minorTickRing, options.minorUnit, options.minorTicks, options.minorTicks.visible, options.majorUnit);

            return ticks;
        },

        arrangeLabels: function() {
            var scale = this,
                options = scale.options,
                ring = scale.ring.clone(),
                tickAngels = scale.tickAngles(ring, options.majorUnit),
                labels = scale.labels,
                count = labels.length,
                labelsOptions = options.labels,
                padding = labelsOptions.padding,
                rangeDistance = ring.r * 0.05,
                rangeSize = options.rangeSize = options.rangeSize || ring.r * 0.1,
                ranges = options.ranges || [],
                halfWidth, halfHeight, labelAngle,
                angle, label, lp, i, cx, cy, isInside;

            if (typeof scale.options.rangeDistance != "undefined") {
                rangeDistance = scale.options.rangeDistance;
            } else {
                scale.options.rangeDistance = rangeDistance;
            }

            if (labelsOptions.position === INSIDE && ranges.length) {
                ring.r -= rangeSize + rangeDistance;
                ring.ir -= rangeSize + rangeDistance;
            }

            for (i = 0; i < count; i++) {
                label = labels[i];
                halfWidth = label.box.width() / 2;
                halfHeight = label.box.height() / 2;
                angle = tickAngels[i];
                labelAngle = angle * DEGREE;
                isInside = labelsOptions.position === INSIDE;
                lp = ring.point(angle, isInside);
                cx = lp.x + (math.cos(labelAngle) * (halfWidth + padding) * (isInside ? 1 : -1));
                cy = lp.y + (math.sin(labelAngle) * (halfHeight + padding) * (isInside ? 1 : -1));

                label.reflow(new Box2D(cx - halfWidth, cy - halfHeight,
                    cx + halfWidth, cy + halfHeight));
                scale.box.wrap(label.box);
            }
        },

        tickAngles: function(ring, stepValue) {
            var scale = this,
                options = scale.options,
                reverse = options.reverse,
                range = options.max - options.min,
                angle = ring.angle,
                pos = ring.startAngle,
                tickCount = range / stepValue,
                step = angle / tickCount,
                positions = [],
                i;

            if (reverse) {
                pos += angle;
                step = -step;
            }

            for (i = 0; i < tickCount ; i++) {
                positions.push(round(pos, COORD_PRECISION));
                pos += step;
            }

            if (round(pos) <= options.endAngle) {
                positions.push(pos);
            }

            return positions;
        },

        renderRanges: function(view) {
            var scale = this,
                result = [],
                from,
                to,
                segments = scale.rangeSegments(),
                segmentsCount = segments.length,
                reverse = scale.options.reverse,
                segment,
                ringRadius,
                i;

            if (segmentsCount) {
                ringRadius = scale.getRadius();

                for (i = 0; i < segmentsCount; i++) {
                    segment = segments[i];
                    from = scale.slotAngle(segment[reverse ? "to": "from"]);
                    to = scale.slotAngle(segment[!reverse ? "to": "from"]);

                    if (to - from !== 0) {
                        result.push(view.createRing(
                            new Ring(
                                scale.ring.c, ringRadius.inner,
                                ringRadius.outer, from, to - from
                            ), {
                                fill: segment.color,
                                fillOpacity: segment.opacity,
                                zIndex: -1
                        }));
                    }
                }
            }

            return result;
        },

        rangeSegments: function() {
            var gauge = this,
                options = gauge.options,
                ranges = options.ranges || [],
                count = ranges.length,
                range,
                segmentsCount,
                defaultColor = options.rangePlaceholderColor,
                segments = [],
                segment,
                min = options.min,
                max = options.max,
                i, j;

            function rangeSegment(from, to, color) {
                return { from: from, to: to, color: color };
            }

            if (count) {
                segments.push(rangeSegment(min, max, defaultColor));

                for (i = 0; i < count; i++) {
                    range = getRange(ranges[i], min, max);
                    segmentsCount = segments.length;
                    for (j = 0; j < segmentsCount; j++) {
                        segment = segments[j];
                        if (segment.from <= range.from && range.from <= segment.to) {
                            segments.push(rangeSegment(range.from, range.to, range.color));
                            if (segment.from <= range.to && range.to <= segment.to) {
                                segments.push(rangeSegment(range.to, segment.to, defaultColor));
                            }
                            segment.to = range.from;
                            break;
                        }
                    }
                }
            }

            return segments;
        },

        getRadius: function() {
            var scale = this,
                options = scale.options,
                rangeSize = options.rangeSize,
                rangeDistance = options.rangeDistance,
                ring = scale.ring,
                ir, r;

            if (options.labels.position === OUTSIDE) {
                r = ring.ir - rangeDistance;
                ir = r - rangeSize;
            } else {
                r = ring.r;
                ir = r - rangeSize;
                // move the ticks with a range distance and a range size
                ring.r -= rangeSize + rangeDistance;
                ring.ir -= rangeSize + rangeDistance;
            }

            return { inner: ir, outer: r };
        },

        getViewElements: function(view) {
            var scale = this,
                childElements = ChartElement.fn.getViewElements.call(scale, view);

            append(childElements, scale.renderRanges(view));
            append(childElements, scale.renderTicks(view));

            return childElements;
        }
    });

    var RadialGaugePlotArea = ChartElement.extend({
        init: function(options) {
            ChartElement.fn.init.call(this, options);

            this.render();
        },

        options: {
            margin: {},
            background: "",
            border: {
                color: BLACK,
                width: 0
            },
            minorTicks: {
                align: INSIDE
            }
        },

        reflow: function(box) {
            var plotArea = this,
                scale = plotArea.scale,
                pointer = plotArea.pointer,
                plotBox;

            scale.reflow(box);
            plotBox = scale.box.clone();
            pointer.scale = scale;
            pointer.reflow();
            plotBox.wrap(pointer.box);

            plotArea.box = plotBox;
            plotArea.fitScale(box);
            plotArea.alignScale(box);
        },

        alignScale: function(box) {
            var plotArea = this,
                plotBoxCenter = plotArea.box.center(),
                boxCenter = box.center(),
                paddingX = plotBoxCenter.x - boxCenter.x,
                paddingY = plotBoxCenter.y - boxCenter.y,
                scale = plotArea.scale,
                pointer = plotArea.pointer;

            scale.ring.c.x -= paddingX;
            scale.ring.c.y -= paddingY;

            scale.reflow(box);
            pointer.reflow();

            plotArea.box = scale.box.clone().wrap(pointer.box);
        },

        fitScale: function(box) {
            var plotArea = this,
                scale = plotArea.scale,
                ring = scale.ring,
                plotAreaBox = plotArea.box,
                step = math.abs(plotArea.getDiff(plotAreaBox, box)),
                min = round(step, COORD_PRECISION),
                max = round(-step, COORD_PRECISION),
                minDiff, midDiff, maxDiff, mid,
                i = 0;

            while (i < 100) {
                i++;
                if (min != mid) {
                    minDiff = plotArea.getPlotBox(min, box, ring);
                    if (0 <= minDiff && minDiff <= 2) {
                        break;
                    }
                }

                if (max != mid) {
                    maxDiff = plotArea.getPlotBox(max, box, ring);
                    if (0 <= maxDiff && maxDiff <= 2) {
                        break;
                    }
                }

                if (minDiff > 0 && maxDiff > 0) {
                    mid = min * 2;
                } else if (minDiff < 0 && maxDiff < 0) {
                    mid = max * 2;
                } else {
                    mid = round(((min + max) / 2) || 1, COORD_PRECISION);
                }

                midDiff = plotArea.getPlotBox(mid, box, ring);
                if (0 <= midDiff && midDiff <= 2) {
                    break;
                }

                if (midDiff > 0) {
                    max = mid;
                    maxDiff = midDiff;
                } else {
                    min = mid;
                    minDiff = midDiff;
                }
            }
        },

        getPlotBox: function(step, box, ring) {
            var plotArea = this,
                scale = plotArea.scale,
                pointer = plotArea.pointer;

            ring = ring.clone();
            ring.r += step;
            ring.ir += step;
            scale.ring = ring;
            scale.reflow(box);
            pointer.scale = scale;
            pointer.reflow();
            plotArea.box = scale.box.clone().wrap(pointer.box);

            return plotArea.getDiff(plotArea.box, box);
        },

        getDiff: function(plotBox, box) {
            return math.min(box.width() - plotBox.width(), box.height() - plotBox.height());
        },

        render: function() {
            var plotArea = this,
                options = plotArea.options,
                scale;

            scale = plotArea.scale = new RadialScale(options.scale);
            plotArea.append(plotArea.scale);
            plotArea.pointer = new RadialPointer(
                scale,
                deepExtend({}, options.pointer, {
                    animation: {
                        transitions: options.transitions
                    }
                })
            );
            plotArea.append(plotArea.pointer);
        }
    });

    var LinearScale = NumericAxis.extend({
        init: function (options) {
            var scale = this;

            scale.options = deepExtend({}, scale.options, options);
            scale.options = deepExtend({}, scale.options , { labels: { mirror: scale.options.mirror } });
            scale.options.majorUnit = autoMajorUnit(scale.options.min, scale.options.max);

            Axis.fn.init.call(scale, scale.options);
            scale.options.minorUnit = scale.options.minorUnit || scale.options.majorUnit / 10;
        },

        options: {
            min: 0,
            max: 50,

            majorTicks: {
                size: 15,
                align: INSIDE,
                color: BLACK,
                width: DEFAULT_LINE_WIDTH,
                visible: true
            },

            minorTicks: {
                size: 10,
                align: INSIDE,
                color: BLACK,
                width: DEFAULT_LINE_WIDTH,
                visible: true
            },

            line: {
                width: DEFAULT_LINE_WIDTH
            },

            labels: {
                position: INSIDE,
                padding: 2
            },
            mirror: false,
            _alignLines: false
        },

        renderRanges: function(view) {
            var scale = this,
                options = scale.options,
                min = options.min,
                max = options.max,
                ranges = options.ranges || [],
                vertical = options.vertical,
                mirror = options.labels.mirror,
                result = [],
                count = ranges.length,
                range, slotX, slotY, i,
                rangeSize = options.rangeSize || options.minorTicks.size / 2,
                slot;

            if (count) {
                for (i = 0; i < count; i++) {
                    range = getRange(ranges[i], min, max);
                    slot = scale.getSlot(range.from, range.to);
                    slotX = vertical ? scale.lineBox() : slot;
                    slotY = vertical ? slot : scale.lineBox();
                    if (vertical) {
                        slotX.x1 -= rangeSize * (mirror ? -1 : 1);
                    } else {
                        slotY.y2 += rangeSize * (mirror ? -1 : 1);
                    }

                    result.push(view.createRect(
                            new Box2D(slotX.x1, slotY.y1, slotX.x2, slotY.y2),
                            { fill: range.color, fillOpacity: range.opacity }));
                }
            }

            return result;
        },

        getViewElements: function(view) {
            var scale = this,
                elements = NumericAxis.fn.getViewElements.call(scale, view);

            append(elements, scale.renderRanges(view));

            return elements;
        }
    });

    var LinearPointer = Pointer.extend({
        init: function(scale, options) {
            var pointer = this;
            Pointer.fn.init.call(pointer, scale, options);
            pointer.options = deepExtend({
                size: pointer.pointerSize(),
                track: {
                    visible: defined(options.track)
                }
            }, pointer.options);
        },

        options: {
            shape: BAR_INDICATOR,

            track: {
                border: {
                    width: 1
                }
            },

            color: BLACK,
            border: {
                width: 1
            },
            opacity: 1,

            margin: getSpacing(3),
            animation: {
                type: BAR_INDICATOR
            },
            visible: true
        },

        repaint: function() {
            var pointer = this,
                scale = pointer.scale,
                options = pointer.options,
                element = pointer.element,
                animation = element._animation;

            if (animation) {
                animation.abort();
            }

            if (options.animation.transitions === false) {
                pointer.getViewElements(pointer._view);

                element.points = pointer.element.points;
                element.refresh(getElement(options.id));
            } else {
                options.animation = deepExtend({}, options.animation, {
                    endPosition: scale.getSlot(scale.options.min, options.value),
                    reverse: scale.options.reverse
                });
                if (options.shape === ARROW) {
                    animation = element._animation = new ArrowAnimation(element, options.animation);
                } else {
                    animation = element._animation = new BarIndicatorAnimatin(element, options.animation);
                }
                animation.setup();
                animation.play();
            }
        },

        reflow: function() {
            var pointer = this,
                options = pointer.options,
                scale = pointer.scale,
                scaleLine = scale.lineBox(),
                trackSize = options.track.size || options.size,
                pointerHalfSize = options.size / 2,
                mirror = scale.options.mirror,
                margin = getSpacing(options.margin),
                vertical = scale.options.vertical,
                space = vertical ?
                     margin[mirror ? "left" : "right"] :
                     margin[mirror ? "bottom" : "top"],
                pointerBox, pointerRangeBox, trackBox;

            space = mirror ? -space : space;

            if (vertical) {
                trackBox = new Box2D(
                    scaleLine.x1 + space, scaleLine.y1,
                    scaleLine.x1 + space, scaleLine.y2);

                if (mirror) {
                    trackBox.x1 -= trackSize;
                } else {
                    trackBox.x2 += trackSize;
                }

                if (options.shape !== BAR_INDICATOR) {
                    pointerRangeBox = new Box2D(
                        scaleLine.x2 + space, scaleLine.y1 - pointerHalfSize,
                        scaleLine.x2 + space, scaleLine.y2 + pointerHalfSize
                    );
                    pointerBox = pointerRangeBox;
                }
            } else {
                trackBox = new Box2D(
                    scaleLine.x1, scaleLine.y1 - space,
                    scaleLine.x2, scaleLine.y1 - space);

                if (mirror) {
                    trackBox.y2 += trackSize;
                } else {
                    trackBox.y1 -= trackSize;
                }

                if (options.shape !== BAR_INDICATOR) {
                    pointerRangeBox = new Box2D(
                        scaleLine.x1 - pointerHalfSize, scaleLine.y1 - space,
                        scaleLine.x2 + pointerHalfSize, scaleLine.y1 - space
                    );
                    pointerBox = pointerRangeBox;
                }
            }

            pointer.trackBox = trackBox;
            pointer.pointerRangeBox = pointerRangeBox;
            pointer.box = pointerBox || trackBox.clone().pad(options.border.width);
        },

        renderPointer: function(view) {
            var pointer = this,
                scale = pointer.scale,
                options = pointer.options,
                border = defined(options.border) ? {
                    stroke: options.border.width ? options.border.color || options.color : "",
                    strokeWidth: options.border.width,
                    dashType: options.border.dashType
                } : {},
                element,
                elementOptions = deepExtend({
                        fill: options.color,
                        fillOpacity: options.opacity,
                        animation: deepExtend(options.animation, {
                            startPosition: scale.getSlot(scale.options.min, options.value),
                            size: options.size,
                            vertical: scale.options.vertical,
                            reverse: scale.options.reverse
                        }),
                        id: options.id,
                        zIndex: 2,
                        align: false
                    }, border),
                shape = pointer.pointerShape(options.value);

            if (options.shape === ARROW) {
                elementOptions.animation.type = ARROW_POINTER;
                element = view.createPolyline(shape, true, elementOptions);
            } else {
                element = view.createRect(shape, elementOptions);
            }

            return element;
        },

        pointerShape: function(value) {
            var pointer = this,
                options = pointer.options,
                scale = pointer.scale,
                slot = scale.getSlot(value, scale.options.min),
                size = options.size,
                pointerRangeBox = pointer.pointerRangeBox,
                vertical = scale.options.vertical,
                halfSize = size / 2,
                shape,
                sign = (scale.options.mirror ? -1 : 1),
                reverse = scale.options.reverse,
                pos,
                trackBox;

            if (options.shape == ARROW) {
                if (vertical) {
                    pos = reverse ? "y2" : "y1";
                    shape = [
                        new Point2D(pointerRangeBox.x1, slot[pos] - halfSize),
                        new Point2D(pointerRangeBox.x1 - sign * size, slot[pos]),
                        new Point2D(pointerRangeBox.x1, slot[pos] + halfSize)
                    ];
                } else {
                    pos = reverse ? "x1" : "x2";
                    shape = [
                        new Point2D(slot[pos] - halfSize, pointerRangeBox.y2),
                        new Point2D(slot[pos], pointerRangeBox.y2 + sign * size),
                        new Point2D(slot[pos] + halfSize, pointerRangeBox.y2)
                    ];
                }
            } else {
                trackBox = pointer.trackBox;
                if (vertical) {
                    shape = new Box2D(
                        trackBox.x1, slot.y1,
                        trackBox.x1 + size, slot.y2);
                } else {
                    shape = new Box2D(
                        slot.x1, trackBox.y1,
                        slot.x2, trackBox.y1 + size);
                }
            }

            return shape;
        },

        pointerSize: function() {
            var pointer = this,
                options = pointer.options,
                scale = pointer.scale,
                tickSize = scale.options.majorTicks.size,
                size;

            if (options.shape === ARROW) {
                size = tickSize * 0.6;
            } else {
                size = tickSize * 0.3;
            }

            return round(size);
        },

        renderTrack: function(view) {
            var pointer = this,
                options = pointer.options,
                trackOptions = options.track,
                border = trackOptions.border || {},
                trackBox = pointer.trackBox.clone().pad(border.width || 0);

            return view.createRect(trackBox, {
                fill: trackOptions.color,
                fillOpacity: trackOptions.opacity,
                stroke: border.width ? border.color || trackOptions.color : "",
                strokeWidth: border.width,
                dashType: border.dashType,
                align: false
            });
        },

        getViewElements: function(view) {
            var pointer = this,
                options = pointer.options,
                elements = [];

            pointer.element = pointer.renderPointer(view);
            elements.push(pointer.element);
            if (options.track.visible &&
                (options.shape === BAR_INDICATOR || options.shape === "")) {
                elements.push(pointer.renderTrack(view));
            }

            pointer._view = view;

            append(elements, Pointer.fn.getViewElements.call(pointer, view));

            return elements;
        }
    });

    var LinearGaugePlotArea = ChartElement.extend({
        init: function(options) {
            ChartElement.fn.init.call(this, options);

            this.render();
        },

        options: {
            plotArea: {
                margin: {},
                background: "",
                border: {
                    color: BLACK,
                    width: 0
                }
            },
            pointer: {},
            scale: {}
        },

        reflow: function(box){
            var plotArea = this,
                scale = plotArea.scale,
                pointer = plotArea.pointer;

            scale.reflow(box);
            pointer.reflow(box);
            plotArea.box = plotArea.getBox(box);
            plotArea.alignElements();
            plotArea.shrinkElements();
        },

        shrinkElements: function () {
            var plotArea = this,
                scale = plotArea.scale,
                pointer = plotArea.pointer,
                scaleBox = scale.box.clone(),
                pointerBox = pointer.box,
                pos = scale.options.vertical ? "y" : "x";

            scaleBox[pos + 1] += math.max(scaleBox[pos + 1] - pointerBox[pos + 1], 0);
            scaleBox[pos + 2] -= math.max(pointerBox[pos + 2] - scaleBox[pos + 2], 0);

            scale.reflow(scaleBox);

            pointer.reflow(plotArea.box);
        },

        getBox: function(box) {
            var plotArea = this,
                scale = plotArea.scale,
                pointer = plotArea.pointer,
                boxCenter = box.center(),
                plotAreaBox = pointer.box.clone().wrap(scale.box),
                size;

            if (scale.options.vertical) {
                size = plotAreaBox.width() / 2;
                plotAreaBox = new Box2D(
                    boxCenter.x - size, box.y1,
                    boxCenter.x + size, box.y2
                );
            } else {
                size = plotAreaBox.height() / 2;
                plotAreaBox = new Box2D(
                    box.x1, boxCenter.y - size,
                    box.x2, boxCenter.y + size
                );
            }

            return plotAreaBox;
        },

        alignElements: function() {
            var plotArea = this,
                scale = plotArea.scale,
                pointer = plotArea.pointer,
                scaleBox = scale.box,
                box = pointer.box.clone().wrap(scale.box),
                plotAreaBox = plotArea.box,
                diff;

            if (scale.options.vertical) {
                diff = plotAreaBox.center().x - box.center().x;
                scale.reflow(new Box2D(
                    scaleBox.x1 + diff, plotAreaBox.y1,
                    scaleBox.x2 + diff, plotAreaBox.y2
                ));
            } else {
                diff = plotAreaBox.center().y - box.center().y;
                scale.reflow(new Box2D(
                    plotAreaBox.x1, scaleBox.y1 + diff,
                    plotAreaBox.x2, scaleBox.y2 + diff
                ));
            }
            pointer.reflow(plotArea.box);
        },

        render: function() {
            var plotArea = this,
                options = plotArea.options,
                scale;

            scale = plotArea.scale = new LinearScale(options.scale);
            plotArea.append(plotArea.scale);
            plotArea.pointer = new LinearPointer(
                scale,
                deepExtend({}, options.pointer, {
                    animation: {
                        transitions: options.transitions
                    }
                })
            );
            plotArea.append(plotArea.pointer);
        },

        getViewElements: function(view) {
            var plotArea = this,
                options = plotArea.options.plotArea,
                childElements = ChartElement.fn.getViewElements.call(plotArea, view),
                border = options.border || {},
                elements = [
                    view.createRect(plotArea.box, {
                        fill: options.background,
                        stroke: border.width ? border.color : "",
                        strokeWidth: border.width,
                        dashType: border.dashType
                    })
                ];

            append(elements, childElements);

            return elements;
        }
    });

    var Gauge = Widget.extend({
        init: function(element, userOptions) {
            var gauge = this,
                options,
                themeOptions,
                themeName,
                themes = dataviz.ui.themes || {},
                theme;

            Widget.fn.init.call(gauge, element);

            gauge.wrapper = gauge.element;

            gauge._originalOptions = deepExtend({}, userOptions);
            options = deepExtend({}, gauge.options, userOptions);

            themeName = options.theme;
            theme = themes[themeName] || themes[themeName.toLowerCase()];
            themeOptions = themeName && theme ? theme.gauge : {};

            gauge.options = deepExtend({}, themeOptions, options);

            gauge.element.addClass("k-gauge");

            gauge.redraw();
        },

        options: {
            plotArea: {},
            theme: "default",
            pointer: {},
            scale: {},
            gaugeArea: {}
        },

        value: function(value) {
            if (arguments.length === 0) {
                return this._pointers[0].value();
            }

            this._pointers[0].value(value);
        },

        redraw: function() {
            var gauge = this,
                element = gauge.element,
                model = gauge._model = gauge._getModel(),
                viewType = dataviz.ui.defaultView(),
                view;

            gauge._plotArea = model._plotArea;

            if (viewType) {
                view = gauge._view = viewType.fromModel(model);

                element.css("position", "relative");
                gauge._viewElement = view.renderTo(element[0]);
            }
        },

        svg: function() {
            var model = this._getModel(),
                view = dataviz.SVGView.fromModel(model);

            return view.render();
        },

        _createModel: function() {
            var gauge = this,
                options = gauge.options,
                size = gauge._getSize();

            return new RootElement(deepExtend({
                width: size.width,
                height: size.height,
                transitions: options.transitions
            }, options.gaugeArea));
        },

        _getSize: function() {
            var gauge = this,
                element = gauge.element,
                width = element.width(),
                height = element.height();

            if (!width) {
                width = DEFAULT_WIDTH;
            }

            if (!height) {
                height = DEFAULT_HEIGHT;
            }

            return { width: width, height: height };
        }
    });

    var RadialGauge = Gauge.extend({
        init: function(element, options) {
            var radialGauge = this;
            Gauge.fn.init.call(radialGauge, element, options);
            kendo.notify(radialGauge, dataviz.ui);
        },

        options: {
            name: "RadialGauge",
            transitions: true,
            gaugeArea: {
                background: ""
            }
        },

        _getModel: function() {
            var gauge = this,
                options = gauge.options,
                model = gauge._createModel(),
                plotArea;

            plotArea = model._plotArea = new RadialGaugePlotArea(options);

            gauge._pointers = [plotArea.pointer];

            model.append(plotArea);
            model.reflow();

            return model;
        }
    });

    var LinearGauge = Gauge.extend({
        init: function(element, options) {
            var linearGauge = this;
            Gauge.fn.init.call(linearGauge, element, options);
            kendo.notify(linearGauge, dataviz.ui);
        },

        options: {
            name: "LinearGauge",
            transitions: true,
            gaugeArea: {
                background: ""
            },
            scale: {
                vertical: true
            }
        },

        _getModel: function() {
            var gauge = this,
                options = gauge.options,
                model = gauge._createModel(),
                plotArea;

            plotArea = model._plotArea = new LinearGaugePlotArea(options);
            gauge._pointers = [plotArea.pointer];

            model.append(plotArea);
            model.reflow();

            return model;
        },

        _getSize: function() {
            var gauge = this,
                element = gauge.element,
                width = element.width(),
                height = element.height(),
                vertical = gauge.options.scale.vertical;

            if (!width) {
                width = vertical ? DEFAULT_MIN_WIDTH : DEFAULT_WIDTH;
            }

            if (!height) {
                height = vertical ? DEFAULT_HEIGHT : DEFAULT_MIN_HEIGHT;
            }

            return { width: width, height: height };
        }
    });

    function getRange(range, min, max) {
        var from = defined(range.from) ? range.from : MIN_VALUE,
            to = defined(range.to) ? range.to : MAX_VALUE;

        range.from = math.max(math.min(to, from), min);
        range.to = math.min(math.max(to, from), max);

        return range;
    }


    var RadialPointerAnimationDecorator = animationDecorator(RADIAL_POINTER, RotationAnimation);
    var ArrowPointerAnimationDecorator = animationDecorator(ARROW_POINTER, ArrowAnimation);
    var BarIndicatorAnimationDecorator = animationDecorator(BAR_INDICATOR, BarIndicatorAnimatin);

    // Exports ================================================================
    dataviz.ui.plugin(RadialGauge);
    dataviz.ui.plugin(LinearGauge);

    deepExtend(dataviz, {
        Gauge: Gauge,
        RadialGaugePlotArea: RadialGaugePlotArea,
        LinearGaugePlotArea: LinearGaugePlotArea,
        RadialPointer: RadialPointer,
        LinearPointer: LinearPointer,
        LinearScale: LinearScale,
        RadialScale: RadialScale,
        RadialPointerAnimationDecorator: RadialPointerAnimationDecorator,
        ArrowPointerAnimationDecorator: ArrowPointerAnimationDecorator,
        BarIndicatorAnimationDecorator: BarIndicatorAnimationDecorator
    });

})(window.kendo.jQuery);
