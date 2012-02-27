(function ($, undefined) {

    // Imports ================================================================
    var doc = document,
        extend = $.extend,
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
        RootElement = dataviz.RootElement,
        RotationAnimation = dataviz.RotationAnimation,
        append = dataviz.append,
        animationDecorator = dataviz.animationDecorator,
        autoMajorUnit = dataviz.autoMajorUnit,
        rotatePoint = dataviz.rotatePoint,
        round = dataviz.round,
        supportsSVG = dataviz.supportsSVG,
        uniqueId = dataviz.uniqueId;

    // Constants ==============================================================
    var BLACK = "#000",
        COORD_PRECISION = dataviz.COORD_PRECISION,
        DEFAULT_HEIGHT = dataviz.DEFAULT_HEIGHT,
        DEFAULT_WIDTH = dataviz.DEFAULT_WIDTH,
        DEGREE = math.PI / 180,
        POINTER = "pointer",
        OUTSIDE = "outside",
        INSIDE = "inside",
        OUTLINE_SUFFIX = "_outline",
        TOOLTIP_OFFSET = 5,
        VERTICAL = "vertical";

    // Gauge ==================================================================
    var GaugeSegment = ChartElement.extend({
        init: function(ring, options) {
            this.ring = ring;

            ChartElement.fn.init.call(this, options);
        },

        options: {
            color: "#ff0000",
            border: {
                width: 0.5
            }
        },

        reflow: function(targetBox) {
            this.box = targetBox;
        },

        getViewElements: function(view) {
            var segment = this,
                ring = segment.ring,
                options = segment.options,
                borderOptions = options.border || {},
                border = borderOptions.width > 0 ? {
                    stroke: borderOptions.color,
                    strokeWidth: borderOptions.width,
                    dashType: borderOptions.dashType
                } : {},
                elements = [],
                overlay = options.overlay;

            elements.push(view.createRing(ring, deepExtend({
                id: options.id,
                fill: options.color,
                overlay: overlay,
                fillOpacity: options.opacity,
                strokeOpacity: options.opacity
            }, border)));

            append(elements,
                ChartElement.fn.getViewElements.call(segment, view)
            );

            return elements;
        },

        getOutlineElement: function(view, options) {
            var segment = this,
                highlight = segment.options.highlight || {},
                border = highlight.border || {},
                outlineId = segment.options.id + OUTLINE_SUFFIX,
                element;

            segment.registerId(outlineId);
            options = deepExtend({}, options, { id: outlineId });

            if (segment.value !== 0) {
                element = view.createSector(segment.sector, deepExtend({}, options, {
                    fill: highlight.color,
                    fillOpacity: highlight.opacity,
                    strokeOpacity: border.opacity,
                    strokeWidth: border.width,
                    stroke: border.color
                }));
            }

            return element;
        },

        tooltipAnchor: function(tooltipWidth, tooltipHeight) {
            var w = tooltipWidth / 2,
                h = tooltipHeight / 2,
                r = math.sqrt((w * w) + (h * h)),
                sector = this.sector.clone().expand(r + TOOLTIP_OFFSET),
                tooltipCenter = sector.point(sector.middle());

            return new Point2D(tooltipCenter.x - w, tooltipCenter.y - h);
        },

        formatPointValue: function(format) {
            var point = this;

            return point.owner.formatPointValue(point.value, format);
        }
    });

    var Pointer = ChartElement.extend({
        init: function (scale, options) {
            var pointer = this,
                options;

            ChartElement.fn.init.call(pointer, options);

            options = pointer.options;

            if (!options.id) {
                options.id = uniqueId();
            }

            pointer.scale = scale;
        },

        options: {
            shape: "needle",
            fill: "#EA7001",
            value: 0,
            capSize: 0.05,
            animation: {
                type: POINTER
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
                animation = new RotationAnimation(needle, extend(options.animation, {
                    startAngle: scale.getSlotAngle(options._oldValue) - scale.getSlotAngle(scale.options.min)
                }));
                animation.setup();
                animation.play();
            }
        },

        reflow: function() {
            var pointer = this,
                options = pointer.options,
                scale = pointer.scale,
                ring = scale.ring,
                c = ring.c,
                capSize = ring.r * options.capSize;

            pointer.box = new Box2D(
                c.x - capSize, c.y - capSize,
                c.x + capSize, c.y + capSize
            );
        },

        _createNeedle: function(view) {
            var pointer = this,
                scale = pointer.scale,
                ring = scale.ring,
                c = ring.c,
                r = ring.r,
                options = pointer.options,
                capSize = r * options.capSize,
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

            extend(options, {
                rotation: [
                    scale.getSlotAngle(options.value) - minAngle,
                    center.x,
                    center.y
                ]
            })

            return [
                view.createPolyline([
                    rotatePoint((box.x1 + box.x2) / 2, box.y1 + scale.options.minorTickSize, center.x, center.y, pointRotation),
                    rotatePoint(center.x - capSize / 2, center.y, center.x, center.y, pointRotation),
                    rotatePoint(center.x + capSize / 2, center.y, center.x, center.y, pointRotation)
                ], true, options),
                view.createCircle([center.x, center.y], capSize, options)
            ];
        },

        getViewElements: function(view) {
            var pointer = this,
                shape = pointer.options.shape,
                elements = pointer._createNeedle(view);

            pointer.elements = elements;

            return elements;
        }
    });

    var RadialScale = NumericAxis.extend({
        init: function (options) {
            var scale = this;
            scale.options.majorUnit = autoMajorUnit(scale.options.min, scale.options.max);

            Axis.fn.init.call(scale, options);
        },

        options: {
            min: 0,
            max: 100,
            majorTickSize: 15,
            majorTickAlignment: INSIDE,
            minorTickSize: 10,
            minorTickAlignment: INSIDE,
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
                    center, radius - options.majorTickSize,
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
                minorTickRing = majorTickRing.clone();
                options = scale.options,
                tickOptions = { stroke: "#000", strokeWidth: .5 };

            function renderTickRing(ring, unit, skipUnit) {
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
                        deepExtend(
                            tickOptions,
                            { align: false }
                        )
                    ));
                }
            }

            renderTickRing(majorTickRing, options.majorUnit);
            minorTickRing.radius(minorTickRing.r - options.minorTickSize, true);
            renderTickRing(minorTickRing, options.minorUnit, options.majorUnit);

            return ticks;
        },

        arrangeLabels: function() {
            var scale = this,
                options = scale.options,
                ring = scale.ring,
                tickAngels = scale.getTickAngles(ring, options.majorUnit),
                labels = scale.labels,
                count = labels.length,
                labelsOptions = options.labels,
                padding = labelsOptions.padding,
                halfWidth,
                halfHeight,
                labelAngle,
                angle,
                label,
                lp,
                i,
                cx,
                cy;

            for (i = 0; i < count; i++) {
                label = labels[i];
                halfWidth = label.box.width() / 2;
                halfHeight = label.box.height() / 2;
                angle = tickAngels[i];
                labelAngle = angle * DEGREE;
                if (labelsOptions.position == INSIDE) {
                    lp = ring.point(angle, true);
                    cx = lp.x + math.cos(labelAngle) * (halfWidth + padding);
                    cy = lp.y + math.sin(labelAngle) * (halfHeight + padding);
                } else if (labelsOptions.position == OUTSIDE) {
                    lp = ring.point(angle);
                    cx = lp.x - math.cos(labelAngle) * (halfWidth + padding);
                    cy = lp.y - math.sin(labelAngle) * (halfHeight + padding);
                }

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

        getViewElements: function(view) {
            var scale = this,
                options = scale.options,
                isVertical = options.orientation === VERTICAL,
                childElements = ChartElement.fn.getViewElements.call(scale, view),
                tickPositions = scale.getMinorTickPositions(),
                lineOptions;

            append(childElements, scale.renderTicks(view));
            // append(childElements, scale.renderPlotBands(view));

            return childElements;
        }
    });

    var GaugePlotArea = ChartElement.extend({
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
                midDiff,
                minDiff,
                maxDiff,
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
            plotArea.pointer = new Pointer(scale, options.pointer);
            plotArea.append(plotArea.pointer);
        }
    });

    var Gauge = Widget.extend({
        init: function(element, userOptions) {
            var gauge = this,
                options,
                i = 0;

            Widget.fn.init.call(gauge, element);
            options = deepExtend({}, gauge.options, userOptions);

            gauge.options = deepExtend({}, options);

            $(element).addClass("k-gauge");

            gauge.redraw();
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
                viewClass = gauge._supportsSVG() ? dataviz.SVGView : dataviz.VMLView,
                view = gauge._view = viewClass.fromModel(model);

            element.css("position", "relative");
            gauge._viewElement = view.renderTo(element[0]);
        },

        _getModel: function() {
            var gauge = this,
                options = gauge.options,
                element = gauge.element,
                model = new RootElement(deepExtend({
                    width: element.width() || DEFAULT_WIDTH,
                    height: element.height() || DEFAULT_HEIGHT,
                    transitions: options.transitions
                    }, options.gaugeArea)),
                plotArea;

            plotArea = model._plotArea = new GaugePlotArea(options);

            gauge._pointers = [plotArea.pointer];

            model.append(plotArea);
            model.reflow();

            return model;
        },

        options: {
            name: "Gauge",
            transitions: true
        },

        svg: function() {
            var model = this._getModel(),
                view = Chart.SVGView.fromModel(model);

            return view.render();
        },

        _supportsSVG: supportsSVG
    });

    var PointerAnimationDecorator = animationDecorator(POINTER, RotationAnimation);

    // Exports ================================================================
    dataviz.ui.plugin(Gauge);

    deepExtend(dataviz, {
        GaugePlotArea: GaugePlotArea,
        Pointer: Pointer,
        PointerAnimationDecorator: PointerAnimationDecorator,
        RadialScale: RadialScale
    });

})(jQuery);
