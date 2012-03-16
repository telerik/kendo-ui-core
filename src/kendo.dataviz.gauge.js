(function ($, undefined) {

    // Imports ================================================================
    var doc = document,
        extend = $.extend,
        map = $.map,
        math = Math,

        kendo = window.kendo,
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        Axis = dataviz.Axis,
        Box2D = dataviz.Box2D,
        ChartElement = dataviz.ChartElement,
        NumericAxis = dataviz.NumericAxis,
        Ring = dataviz.Ring,
        RootElement = dataviz.RootElement,
        RotationAnimation = dataviz.RotationAnimation,
        BarAnimation = dataviz.BarAnimation,
        ArrowAnimation = dataviz.ArrowAnimation,
        append = dataviz.append,
        animationDecorator = dataviz.animationDecorator,
        autoMajorUnit = dataviz.autoMajorUnit,
        getSpacing = dataviz.getSpacing,
        defined = dataviz.defined,
        rotatePoint = dataviz.rotatePoint,
        Point2D = dataviz.Point2D,
        round = dataviz.round,
        uniqueId = dataviz.uniqueId;

    // Constants ==============================================================
    var ARROW = "arrow",
        ARROW_POINTER = "arrowPointer",
        BAR_INDICATOR = "BAR_INDICATOR",
        BLACK = "#000",
        COORD_PRECISION = dataviz.COORD_PRECISION,
        DEFAULT_HEIGHT = dataviz.DEFAULT_HEIGHT,
        DEFAULT_WIDTH = dataviz.DEFAULT_WIDTH,
        DEGREE = math.PI / 180,
        RADIAL_POINTER = "radialPointer",
        OUTSIDE = "outside",
        INSIDE = "inside",
        VERTICAL = "vertical";

    // Gauge ==================================================================
    var Pointer = ChartElement.extend({
        init: function (scale, options) {
            var pointer = this,
                options,
                scaleOptions = scale.options;

            ChartElement.fn.init.call(pointer, options);

            options = pointer.options;

            if (!options.id) {
                options.id = uniqueId();
            }

            options.fill = options.color;

            pointer.scale = scale;

            options.value = math.min(math.max(options.value, scaleOptions.min), scaleOptions.max);
        },

        options: {
            color: "#ea7001",
            value: 0,
            animation: {
                type: RADIAL_POINTER
            }
        },

        value: function(newValue) {
            var pointer = this,
                options = pointer.options,
                value = options.value,
                scaleOptions = pointer.scale.options,
                element;

            if (arguments.length == 0) {
                return value;
            }

            options._oldValue = options.value;
            options.value = math.min(math.max(newValue, scaleOptions.min), scaleOptions.max);

            pointer.repaint();
        }
    });

    var RadialPointer = Pointer.extend({
        options: {
            shape: "needle",
            cap: {
                size: 0.05
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
                animation;

            needle.options.rotation[0] = scale.getSlotAngle(options.value)
                                       - scale.getSlotAngle(scale.options.min);

            if (options.animation === false) {
                needle.refresh(doc.getElementById(options.id));
            } else {
                animation = new RotationAnimation(needle, deepExtend(options.animation, {
                    startAngle: scale.getSlotAngle(options._oldValue) - scale.getSlotAngle(scale.options.min)
                }));
                animation.setup();
                animation.play();
            }
        },

        renderPointer: function(view) {
            var pointer = this,
                scale = pointer.scale,
                ring = scale.ring,
                c = ring.c,
                r = ring.r,
                options = pointer.options,
                capSize = r * options.cap.size,
                box = new Box2D(c.x - r, c.y - r, c.x + r, c.y + r),
                halfWidth = box.width() / 2,
                center = box.center(),
                minAngle = scale.getSlotAngle(scale.options.min),
                // pointer calculation is done at 90deg, so points are rotated initially
                pointRotation = 90 - minAngle;

            if (options.animation !== false) {
                deepExtend(options.animation, {
                    startAngle: 0,
                    center: center
                });
            }

            deepExtend(options, {
                rotation: [
                    scale.getSlotAngle(options.value) - minAngle,
                    center.x,
                    center.y
                ]
            })

            return [
                view.createPolyline([
                    rotatePoint((box.x1 + box.x2) / 2, box.y1 + scale.options.minorTicks.size, center.x, center.y, pointRotation),
                    rotatePoint(center.x - capSize / 2, center.y, center.x, center.y, pointRotation),
                    rotatePoint(center.x + capSize / 2, center.y, center.x, center.y, pointRotation)
                ], true, options),
                view.createCircle([center.x, center.y], capSize, { fill: options.cap.color || options.color })
            ];
        },

        getViewElements: function(view) {
            var pointer = this,
                shape = pointer.options.shape,
                elements = pointer.renderPointer(view);

            pointer.elements = elements;

            return elements;
        }
    });

    var RadialScale = NumericAxis.extend({
        init: function (options) {
            var scale = this,
                scaleOptions = scale.options;

            scaleOptions.majorUnit = autoMajorUnit(scale.options.min, scale.options.max);

            Axis.fn.init.call(scale, options);
        },

        options: {
            min: 0,
            max: 100,

            majorTicks: {
                size: 15,
                align: INSIDE,
                color: BLACK,
                width: .5
            },

            minorTicks: {
                size: 10,
                align: INSIDE,
                color: BLACK,
                width: .5
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

        getSlotAngle: function(value) {
            var options = this.options,
                startAngle = options.startAngle,
                angle = options.endAngle - startAngle,
                min = options.min,
                max = options.max;

            return ((value - min) / (max - min) * angle) + startAngle;
        },

        renderTicks: function(view) {
            var scale = this,
                ticks = [],
                majorTickRing = scale.ring,
                minorTickRing = majorTickRing.clone(),
                options = scale.options,
                minorTickSize = options.minorTicks.size;

            function renderTickRing(ring, unit, tickOptions, skipUnit) {
                var tickAngles = scale.getTickAngles(ring, unit),
                    i, innerPoint, outerPoint,
                    skip = skipUnit / unit,
                    count = tickAngles.length;

                for (i = 0; i < count; i++) {
                    if (i % skip == 0) {
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

            renderTickRing(majorTickRing, options.majorUnit, options.majorTicks);

            if (options.labels.position == INSIDE) {
                minorTickRing.radius(minorTickRing.r - minorTickSize, true);
            } else {
                minorTickRing.radius(minorTickRing.ir + minorTickSize);
            }

            renderTickRing(minorTickRing, options.minorUnit, options.minorTicks, options.majorUnit);

            return ticks;
        },

        arrangeLabels: function() {
            var scale = this,
                options = scale.options,
                ring = scale.ring.clone(),
                tickAngels = scale.getTickAngles(ring, options.majorUnit),
                labels = scale.labels,
                count = labels.length,
                labelsOptions = options.labels,
                padding = labelsOptions.padding,
                ringDistance = scale.options.ringDistance = ring.r * 0.05,
                ringSize = scale.options.ringSize = ring.r * 0.1,
                ranges = options.ranges || [],
                halfWidth, halfHeight, labelAngle,
                angle, label, lp, i, cx, cy, isInside;

            if (labelsOptions.position === INSIDE && ranges.length) {
                ring.r -= ringSize + ringDistance;
                ring.ir -= ringSize + ringDistance;
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

        getTickAngles: function(ring, stepValue) {
            var scale = this,
                options = scale.options,
                range = options.max - options.min,
                angle = ring.angle,
                tickCount = range / stepValue,
                step = angle / tickCount,
                startAngle = ring.startAngle,
                pos = startAngle,
                positions = [],
                i;

            for (i = 0; i < tickCount; i++) {
                positions.push(round(pos, COORD_PRECISION));
                pos += step;
            }

            positions.push(startAngle + angle);

            return positions;
        },

        renderRanges: function(view) {
            var scale = this,
                options = scale.options,
                ranges = options.ranges || [],
                ring = scale.ring,
                result = [],
                from, to, r, ir, count = ranges.length,
                range, defaultColor = options.rangePlaceholderColor,
                min = options.min,
                max = options.max,
                from, to, j, range,
                segments = [],
                segment,
                ringDistance = options.ringDistance,
                ringSize = options.ringSize,
                i, segmentsCount;

            function rangeSegment(from, to, color) {
                return { from: from, to: to, color: color };
            }

            segments.push(rangeSegment(min, max, defaultColor));

            if (count) {
                if (options.labels.position === OUTSIDE) {
                    r = ring.ir - ringDistance;
                    ir = r - ringSize;
                } else {
                    r = ring.r;
                    ir = r - ringSize;
                    ring.r -= ringSize + ringDistance;
                    ring.ir -= ringSize + ringDistance;
                }

                for (i = 0; i < count; i++) {
                    range = ranges[i];
                    from = defined(range.from) ? range.from : MIN_VALUE;
                    to = defined(range.to) ? range.to : MAX_VALUE;
                    range.from = math.max(math.min(to, from), min);
                    range.to = math.min(math.max(to, from), max);
                    segmentCount = segments.length;
                    for (j = 0; j < segmentCount; j++) {
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

                for (i = 0; i < segments.length; i++) {
                    segment = segments[i];
                    from = scale.getSlotAngle(segment.from);
                    to = scale.getSlotAngle(segment.to);
                    if (to - from != 0) {
                        result.push(view.createRing(
                            new Ring(ring.c, ir, r, from, to - from), {
                                fill: segment.color,
                                fillOpacity: segment.opacity,
                                zIndex: -1
                        }));
                    }
                }
            }

            return result;
        },

        getViewElements: function(view) {
            var scale = this,
                options = scale.options,
                vertical = options.orientation === VERTICAL,
                childElements = ChartElement.fn.getViewElements.call(scale, view),
                tickPositions = scale.getMinorTickPositions(),
                lineOptions;

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
                align: "inside"
            }
        },

        reflow: function(box) {
            var plotArea = this,
                options = plotArea.options,
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
                pointer = plotArea.pointer,
                ring = scale.ring;

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
                minDiff, midDiff, maxDiff,
                mid;

            while (true) {
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
                options = plotArea.options,
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
            plotArea.pointer = new RadialPointer(scale, options.pointer);
            plotArea.append(plotArea.pointer);
        }
    });

    var LinearScale = NumericAxis.extend({
        init: function (options) {
            var scale = this,
                scaleOptions = scale.options;

            scaleOptions.majorUnit = autoMajorUnit(scale.options.min, scale.options.max);

            options = deepExtend({}, scaleOptions, options);

            NumericAxis.fn.init.call(scale, 0, 1, options);
        },

        options: {
            min: 0,
            max: 50,

            minorUnit: 1,

            majorTicks: {
                size: 15,
                align: INSIDE,
                color: BLACK,
                width: 0.5,
                visible: true
            },

            minorTicks: {
                size: 10,
                align: INSIDE,
                color: BLACK,
                width: 0.5,
                visible: true
            },

            line: {
                width: 0.5
            },

            labels: {
                position: INSIDE,
                padding: 2
            }
        },

        shouldAlign: function() {
            return false;
        }
    });


    var LinearPointer = Pointer.extend({
        options: {
            shape: BAR_INDICATOR,

            track: {
                width: 6,
                border: {
                    width: 1
                },
                visible: false
            },

            color: "#286793",
            size: 6,
            border: {
                width: 1
            },
            opacity: 1,

            margin: getSpacing(3),
            animation: {
                type: BAR_INDICATOR,
                duration: 1000
            },
            visible: true
        },

        repaint: function() {
            var pointer = this,
                scale = pointer.scale,
                options = pointer.options,
                needle = pointer.elements[0],
                animation;

            if (options.animation === false) {
                needle.refresh(doc.getElementById(options.id));
            } else {
                animation = new RotationAnimation(needle, deepExtend(options.animation, {
                    startAngle: scale.getSlotAngle(options._oldValue) - scale.getSlotAngle(scale.options.min)
                }));
                animation.setup();
                animation.play();
            }
        },

        reflow: function(box) {
            var pointer = this,
                options = pointer.options,
                scale = pointer.scale,
                slot = scale.getSlot(options.value),
                scaleLine = scale.lineBox(),
                scaleBox = scale.box,
                width = options.track.width,
                padding = getSpacing(options.margin),
                halfSize = options.size / 2,
                trackBoxCenter,
                trackBox,
                pointerBox;

            if (scale.options.vertical) {
                trackBox = new Box2D(
                    scaleBox.x2 + padding.left, scaleLine.y1,
                    scaleBox.x2 + padding.left + width, scaleLine.y2);

                trackBoxCenter = trackBox.center();
                pointerBox = new Box2D(
                    trackBoxCenter.x - halfSize, slot.y1,
                    trackBoxCenter.x + halfSize, slot.y2);
            } else {
                trackBox = new Box2D(
                    scaleLine.x1, scaleBox.y1 - padding.bottom - width,
                    scaleLine.x2, scaleBox.y1 - padding.bottom);

                trackBoxCenter = trackBox.center();
                pointerBox = new Box2D(
                    slot.x1, trackBoxCenter.y - halfSize,
                    slot.x2, trackBoxCenter.y + halfSize);
            }

            pointer.trackBox = trackBox;
            pointer.pointerBox = pointerBox;

            pointer.box = trackBox.clone().wrap(pointerBox).pad(padding);
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
                shape,
                scaleLine = scale.lineBox(),
                slot = scale.getSlot(options.value),
                trackBox = pointer.trackBox,
                size = options.size,
                shapeOptions = deepExtend({
                        fill: options.color,
                        fillOpacity: options.opacity,
                        animation: options.animation,
                        vertical: scale.options.vertical,
                        id: options.id,
                        zIndex: 2,
                        size: options.size,
                        startPosition: scale.getSlot(options.min),
                        align: false
                    }, border),
                halfSize = size / 2;

            if (options.shape == ARROW) {
                shapeOptions.animation.type = ARROW_POINTER;
                if (scale.options.vertical) {
                    shape = view.createPolyline([
                        new Point2D(trackBox.x1, slot.y1 - halfSize),
                        new Point2D(trackBox.x1 - size, slot.y1),
                        new Point2D(trackBox.x1, slot.y1 + halfSize)
                    ], true, shapeOptions);
                } else {
                    shape = view.createPolyline([
                        new Point2D(slot.x2 - halfSize, trackBox.y2),
                        new Point2D(slot.x2, trackBox.y2 + size),
                        new Point2D(slot.x2 + halfSize, trackBox.y2)
                    ], true, shapeOptions);
                }
            } else {
                shape = view.createRect(pointer.pointerBox, shapeOptions);
            }

            return shape;
        },

        renderTrack: function(view) {
            var pointer = this,
                scale = pointer.scale,
                options = pointer.options,
                trackOptions = options.track,
                border = trackOptions.border || {};

            return view.createRect(pointer.trackBox, {
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

            if (options.visible) {
                elements.push(pointer.renderPointer(view));
                if (options.track.visible) {
                    elements.push(pointer.renderTrack(view));
                }
            }

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
            margin: {},
            background: "",
            border: {
                color: BLACK,
                width: 0
            }
        },

        reflow: function(box){
            var plotArea = this,
                scale = plotArea.scale,
                pointer = plotArea.pointer;

            scale.reflow(box);
            pointer.reflow(box);
            plotArea.box = plotArea.calculateBox(box);
            plotArea.alignElements();
        },

        calculateBox: function(box) {
            var plotArea = this,
                options = plotArea.options,
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
                scaleBox = scale.box;

            if (scale.options.vertical) {
                scale.reflow(plotArea.box);
            } else {
                scale.reflow(new Box2D(
                    scaleBox.x1, plotArea.box.y1 + pointer.box.height(),
                    scaleBox.x2, plotArea.box.y2
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
            plotArea.pointer = new LinearPointer(scale, options.pointer);
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
                themes = dataviz.ui.themes.gauge || {},
                i = 0;

            Widget.fn.init.call(gauge, element);

            gauge.wrapper = gauge.element;

            options = deepExtend({}, gauge.options, userOptions);

            themeName = options.theme;
            themeOptions = themeName ? themes[themeName] || themes[themeName.toLowerCase()] : {};

            gauge.options = deepExtend({}, themeOptions, options);

            gauge.element.addClass("k-gauge");

            gauge.redraw();
        },

        options: {
            plotArea: {},
            name: "Gauge"
        },

        value: function(value) {
            if (arguments.length === 0) {
                return this._pointers[0].value();
            }

            this._pointers[0].value(value);
        },

        redraw: function() {
            var gauge = this,
                options = gauge.options,
                element = gauge.element,
                model = gauge._model = gauge._getModel(),
                plotArea = gauge._plotArea = model._plotArea,
                viewType = dataviz.ui.defaultView(),
                view = gauge._view = viewType.fromModel(model);

            element.css("position", "relative");
            gauge._viewElement = view.renderTo(element[0]);
        },

        svg: function() {
            var model = this._getModel(),
                view = Chart.SVGView.fromModel(model);

            return view.render();
        },

        _createModel: function() {
            var gauge = this,
                options = gauge.options,
                element = gauge.element,
                model = new RootElement(deepExtend({
                    width: element.width() || DEFAULT_WIDTH,
                    height: element.height() || DEFAULT_HEIGHT,
                    transitions: options.transitions
                    }, options.gaugeArea));

            return model;
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
        options: {
            name: "LinearGauge",
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

            plotArea = model._plotArea = new LinearGaugePlotArea(options);

            //gauge._pointers = [ plotArea.pointer ];

            model.append(plotArea);
            model.reflow();

            return model;
        }
    });

    var RadialPointerAnimationDecorator = animationDecorator(RADIAL_POINTER, RotationAnimation);
    var ArrowPointerAnimationDecorator = animationDecorator(ARROW_POINTER, ArrowAnimation);
    var BarIndicatorAnimationDecorator = animationDecorator(BAR_INDICATOR, BarAnimation);

    // Exports ================================================================
    dataviz.ui.plugin(RadialGauge);
    dataviz.ui.plugin(LinearGauge);
    dataviz.ui.plugin(Gauge);

    deepExtend(dataviz, {
        GaugePlotArea: RadialGaugePlotArea,
        RadialPointer: RadialPointer,
        LinearPointer: LinearPointer,
        LinearScale: LinearScale,
        RadialScale: RadialScale,
        RadialPointerAnimationDecorator: RadialPointerAnimationDecorator,
        ArrowPointerAnimationDecorator: ArrowPointerAnimationDecorator,
        BarIndicatorAnimationDecorator: BarIndicatorAnimationDecorator
    });

})(jQuery);
