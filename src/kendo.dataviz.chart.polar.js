(function(f, define){
    define([ "./kendo.dataviz.chart", "./kendo.drawing" ], f);
})(function(){

var __meta__ = {
    id: "dataviz.chart.polar",
    name: "Polar Charts",
    category: "dataviz",
    depends: [ "dataviz.chart" ],
    hidden: true
};

(function ($, undefined) {
    // Imports ================================================================
    var math = Math,

        kendo = window.kendo,
        deepExtend = kendo.deepExtend,

        util = kendo.util,
        append = util.append,

        draw = kendo.drawing,
        geom = kendo.geometry,
        dataviz = kendo.dataviz,
        AreaSegment = dataviz.AreaSegment,
        Axis = dataviz.Axis,
        AxisGroupRangeTracker = dataviz.AxisGroupRangeTracker,
        BarChart = dataviz.BarChart,
        Box2D = dataviz.Box2D,
        CategoryAxis = dataviz.CategoryAxis,
        CategoricalChart = dataviz.CategoricalChart,
        CategoricalPlotArea = dataviz.CategoricalPlotArea,
        ChartElement = dataviz.ChartElement,
        CurveProcessor = dataviz.CurveProcessor,
        DonutSegment = dataviz.DonutSegment,
        LineChart = dataviz.LineChart,
        LineSegment = dataviz.LineSegment,
        LogarithmicAxis = dataviz.LogarithmicAxis,
        NumericAxis = dataviz.NumericAxis,
        PlotAreaBase = dataviz.PlotAreaBase,
        PlotAreaFactory = dataviz.PlotAreaFactory,
        Point2D = dataviz.Point2D,
        Ring = dataviz.Ring,
        ScatterChart = dataviz.ScatterChart,
        ScatterLineChart = dataviz.ScatterLineChart,
        SeriesBinder = dataviz.SeriesBinder,
        ShapeBuilder = dataviz.ShapeBuilder,
        SplineSegment = dataviz.SplineSegment,
        SplineAreaSegment = dataviz.SplineAreaSegment,
        getSpacing = dataviz.getSpacing,
        filterSeriesByType = dataviz.filterSeriesByType,
        limitValue = util.limitValue,
        round = dataviz.round;

    // Constants ==============================================================
    var ARC = "arc",
        BLACK = "#000",
        COORD_PRECISION = dataviz.COORD_PRECISION,
        DEFAULT_PADDING = 0.15,
        DEG_TO_RAD = math.PI / 180,
        LOGARITHMIC = "log",
        PLOT_AREA_CLICK = "plotAreaClick",
        POLAR_AREA = "polarArea",
        POLAR_LINE = "polarLine",
        POLAR_SCATTER = "polarScatter",
        RADAR_AREA = "radarArea",
        RADAR_COLUMN = "radarColumn",
        RADAR_LINE = "radarLine",
        SMOOTH = "smooth",
        X = "x",
        Y = "y",
        ZERO = "zero",
        POLAR_CHARTS = [
            POLAR_AREA, POLAR_LINE, POLAR_SCATTER
        ],
        RADAR_CHARTS = [
            RADAR_AREA, RADAR_COLUMN, RADAR_LINE
        ];

    // Polar and radar charts =================================================
    var GridLinesMixin = {
        createGridLines: function(altAxis) {
            var axis = this,
                options = axis.options,
                radius = math.abs(axis.box.center().y - altAxis.lineBox().y1),
                majorAngles,
                minorAngles,
                skipMajor = false,
                gridLines = [];

            if (options.majorGridLines.visible) {
                majorAngles = axis.majorGridLineAngles(altAxis);
                skipMajor = true;

                gridLines = axis.renderGridLines(
                    majorAngles, radius, options.majorGridLines
                );
            }

            if (options.minorGridLines.visible) {
                minorAngles = axis.minorGridLineAngles(altAxis, skipMajor);

                append(gridLines, axis.renderGridLines(
                    minorAngles, radius, options.minorGridLines
                ));
            }

            return gridLines;
        },

        renderGridLines: function(angles, radius, options) {
            var style = {
                stroke: {
                    width: options.width,
                    color: options.color,
                    dashType: options.dashType
                }
            };

            var center = this.box.center();
            var circle = new geom.Circle([center.x, center.y], radius);
            var container = this.gridLinesVisual();

            for (var i = 0; i < angles.length; i++) {
                var line = new draw.Path(style);

                line.moveTo(circle.center)
                    .lineTo(circle.pointAt(angles[i]));

                container.append(line);
            }

            return container.children;
        },

        gridLineAngles: function(altAxis, step, skipStep) {
            var axis = this,
                divs = axis.intervals(step, skipStep);

            return $.map(divs, function(d) {
                var alpha = axis.intervalAngle(d);

                if (!altAxis.options.visible || alpha !== 90) {
                    return alpha;
                }
            });
        }
    };

    var RadarCategoryAxis = CategoryAxis.extend({
        options: {
            startAngle: 90,
            labels: {
                margin: getSpacing(10)
            },
            majorGridLines: {
                visible: true
            },
            justified: true
        },

        range: function() {
            return { min: 0, max: this.options.categories.length };
        },

        reflow: function(box) {
            this.box = box;
            this.reflowLabels();
        },

        lineBox: function() {
            return this.box;
        },

        reflowLabels: function() {
            var axis = this,
                measureBox = new Box2D(),
                labels = axis.labels,
                labelBox,
                i;

            for (i = 0; i < labels.length; i++) {
                labels[i].reflow(measureBox);
                labelBox = labels[i].box;

                labels[i].reflow(axis.getSlot(i).adjacentBox(
                    0, labelBox.width(), labelBox.height()
                ));
            }
        },

        intervals: function(step, skipStep) {
            var axis = this,
                options = axis.options,
                categories = options.categories.length,
                angle = 0,
                skipAngle = 0,
                divCount = categories / step || 1,
                divAngle = 360 / divCount,
                divs = [],
                i;

            if (skipStep) {
                skipAngle = 360 / (categories / skipStep);
            }

            for (i = 0; i < divCount; i++) {
                angle = round(angle, COORD_PRECISION);

                if (angle % skipAngle !== 0) {
                    divs.push(angle % 360);
                }

                if (options.reverse) {
                    angle = 360 + angle - divAngle;
                } else {
                    angle += divAngle;
                }
            }

            return divs;
        },

        majorIntervals: function() {
            return this.intervals(1);
        },

        minorIntervals: function() {
            return this.intervals(0.5);
        },

        intervalAngle: function(interval) {
            return (360 + interval + this.options.startAngle) % 360;
        },

        majorAngles: function() {
            return $.map(this.majorIntervals(), $.proxy(this.intervalAngle, this));
        },

        createLine: function() {
            return [];
        },

        majorGridLineAngles: function(altAxis) {
            return this.gridLineAngles(altAxis, 1);
        },

        minorGridLineAngles: function(altAxis, skipMajor) {
            return this.gridLineAngles(altAxis, 0.5, skipMajor ? 1 : 0);
        },

        createPlotBands: function() {
            var axis = this,
                options = axis.options,
                plotBands = options.plotBands || [],
                i,
                band,
                slot,
                singleSlot,
                head,
                tail;

            var group = this._plotbandGroup = new draw.Group({
                zIndex: -1
            });

            for (i = 0; i < plotBands.length; i++) {
                band = plotBands[i];
                slot = axis.plotBandSlot(band);
                singleSlot = axis.getSlot(band.from);

                head = band.from - math.floor(band.from);
                slot.startAngle += head * singleSlot.angle;

                tail = math.ceil(band.to) - band.to;
                slot.angle -= (tail + head) * singleSlot.angle;

                var ring = ShapeBuilder.current.createRing(slot, {
                    fill: {
                        color: band.color,
                        opacity: band.opacity
                    },
                    stroke: {
                        opacity: band.opacity
                    }
                });
                group.append(ring);
            }

            axis.appendVisual(group);
        },

        plotBandSlot: function(band) {
            return this.getSlot(band.from, band.to - 1);
        },

        getSlot: function(from, to) {
            var axis = this,
                options = axis.options,
                justified = options.justified,
                box = axis.box,
                divs = axis.majorAngles(),
                totalDivs = divs.length,
                slots,
                slotAngle = 360 / totalDivs,
                slotStart,
                angle;

            if (options.reverse && !justified) {
                from = (from + 1) % totalDivs;
            }

            from = limitValue(math.floor(from), 0, totalDivs - 1);
            slotStart = divs[from];

            if (justified) {
                slotStart = slotStart - slotAngle / 2;

                if (slotStart < 0) {
                    slotStart += 360;
                }
            }

            to = limitValue(math.ceil(to || from), from, totalDivs - 1);
            slots = to - from + 1;
            angle = slotAngle * slots;

            return new Ring(
                box.center(), 0, box.height() / 2,
                slotStart, angle
            );
        },

        pointCategoryIndex: function(point) {
            var axis = this,
                index = null,
                i,
                length = axis.options.categories.length,
                slot;

            for (i = 0; i < length; i++) {
                slot = axis.getSlot(i);
                if (slot.containsPoint(point)) {
                    index = i;
                    break;
                }
            }

            return index;
        }
    });
    deepExtend(RadarCategoryAxis.fn, GridLinesMixin);

    var RadarNumericAxisMixin = {
        options: {
            majorGridLines: {
                visible: true
            }
        },

        createPlotBands: function() {
            var axis = this,
                options = axis.options,
                plotBands = options.plotBands || [],
                type = options.majorGridLines.type,
                altAxis = axis.plotArea.polarAxis,
                majorAngles = altAxis.majorAngles(),
                center = altAxis.box.center(),
                i,
                band,
                bandStyle,
                slot,
                ring;

            var group = this._plotbandGroup = new draw.Group({
                zIndex: -1
            });

            for (i = 0; i < plotBands.length; i++) {
                band = plotBands[i];
                bandStyle = {
                    fill: {
                        color: band.color,
                        opacity: band.opacity
                    },
                    stroke: {
                        opacity: band.opacity
                    }
                };

                slot = axis.getSlot(band.from, band.to, true);
                ring = new Ring(center, center.y - slot.y2, center.y - slot.y1, 0, 360);

                var shape;
                if (type === ARC) {
                    shape = ShapeBuilder.current.createRing(ring, bandStyle);
                } else {
                    shape = draw.Path.fromPoints(
                            axis.plotBandPoints(ring, majorAngles), bandStyle
                    ).close();
                }

                group.append(shape);
            }

            axis.appendVisual(group);
        },

        plotBandPoints: function(ring, angles) {
            var innerPoints = [],
                outerPoints = [];

            var center = [ring.c.x, ring.c.y];
            var innerCircle = new geom.Circle(center, ring.ir);
            var outerCircle = new geom.Circle(center, ring.r);

            for (var i = 0; i < angles.length; i++) {
                innerPoints.push(innerCircle.pointAt(angles[i]));
                outerPoints.push(outerCircle.pointAt(angles[i]));
            }

            innerPoints.reverse();
            innerPoints.push(innerPoints[0]);
            outerPoints.push(outerPoints[0]);

            return outerPoints.concat(innerPoints);
        },

        createGridLines: function(altAxis) {
            var axis = this,
                options = axis.options,
                majorTicks = axis.radarMajorGridLinePositions(),
                majorAngles = altAxis.majorAngles(),
                minorTicks,
                center = altAxis.box.center(),
                gridLines = [];

            if (options.majorGridLines.visible) {
                gridLines = axis.renderGridLines(
                    center, majorTicks, majorAngles, options.majorGridLines
                );
            }

            if (options.minorGridLines.visible) {
                minorTicks = axis.radarMinorGridLinePositions();
                append(gridLines, axis.renderGridLines(
                    center, minorTicks, majorAngles, options.minorGridLines
                ));
            }

            return gridLines;
        },

        renderGridLines: function(center, ticks, angles, options) {
            var axis = this,
                tickRadius,
                tickIx,
                angleIx;

            var style = {
                stroke: {
                    width: options.width,
                    color: options.color,
                    dashType: options.dashType
                }
            };

            var container = this.gridLinesVisual();
            for (tickIx = 0; tickIx < ticks.length; tickIx++) {
                tickRadius = center.y - ticks[tickIx];
                if(tickRadius > 0) {
                    var circle = new geom.Circle([center.x, center.y], tickRadius);
                    if (options.type === ARC) {
                        container.append(new draw.Circle(circle, style));
                    } else {
                        var line = new draw.Path(style);
                        for (angleIx = 0; angleIx < angles.length; angleIx++) {
                            line.lineTo(circle.pointAt(angles[angleIx]));
                        }

                        line.close();
                        container.append(line);
                    }
                }
            }

            return container.children;
        },

        getValue: function(point) {
            var axis = this,
                options = axis.options,
                lineBox = axis.lineBox(),
                altAxis = axis.plotArea.polarAxis,
                majorAngles = altAxis.majorAngles(),
                center = altAxis.box.center(),
                r = point.distanceTo(center),
                distance = r;

            if (options.majorGridLines.type !== ARC && majorAngles.length > 1) {
                var dx = point.x - center.x,
                    dy = point.y - center.y,
                    theta = (math.atan2(dy, dx) / DEG_TO_RAD + 540) % 360;

                majorAngles.sort(function(a, b) {
                    return angularDistance(a, theta) - angularDistance(b, theta);
                });

                // Solve triangle (center, point, axis X) using one side (r) and two angles.
                // Angles are derived from triangle (center, point, gridline X)
                var midAngle = angularDistance(majorAngles[0], majorAngles[1]) / 2,
                    alpha = angularDistance(theta, majorAngles[0]),
                    gamma = 90 - midAngle,
                    beta = 180 - alpha - gamma;

                distance = r * (math.sin(beta * DEG_TO_RAD) / math.sin(gamma * DEG_TO_RAD));
            }

            return axis.axisType().fn.getValue.call(
                axis, new Point2D(lineBox.x1, lineBox.y2 - distance)
            );
        }
    };

    var RadarNumericAxis = NumericAxis.extend({
        radarMajorGridLinePositions: function() {
            return this.getTickPositions(this.options.majorUnit);
        },

        radarMinorGridLinePositions: function() {
            var axis = this,
                options = axis.options,
                minorSkipStep = 0;
            if (options.majorGridLines.visible) {
                minorSkipStep = options.majorUnit;
            }
            return axis.getTickPositions(options.minorUnit, minorSkipStep);
        },

        axisType: function() {
            return NumericAxis;
        }
    });

    deepExtend(RadarNumericAxis.fn, RadarNumericAxisMixin);

    var RadarLogarithmicAxis = LogarithmicAxis.extend({
        radarMajorGridLinePositions: function() {
            var axis = this,
                positions = [];

            axis.traverseMajorTicksPositions(function(position) {
                positions.push(position);
            }, axis.options.majorGridLines);

            return positions;
        },

        radarMinorGridLinePositions: function() {
            var axis = this,
                positions = [];

            axis.traverseMinorTicksPositions(function(position) {
                positions.push(position);
            }, axis.options.minorGridLines);

            return positions;
        },

        axisType: function() {
            return LogarithmicAxis;
        }
    });

    deepExtend(RadarLogarithmicAxis.fn, RadarNumericAxisMixin);

    var PolarAxis = Axis.extend({
        init: function(options) {
            var axis = this;

            Axis.fn.init.call(axis, options);
            options = axis.options;

            options.minorUnit = options.minorUnit || axis.options.majorUnit / 2;
        },

        options: {
            type: "polar",
            startAngle: 0,
            reverse: false,
            majorUnit: 60,
            min: 0,
            max: 360,
            labels: {
                margin: getSpacing(10)
            },
            majorGridLines: {
                color: BLACK,
                visible: true,
                width: 1
            },
            minorGridLines: {
                color: "#aaa"
            }
        },

        getDivisions: function(stepValue) {
            return NumericAxis.fn.getDivisions.call(this, stepValue) - 1;
        },

        reflow: function(box) {
            this.box = box;
            this.reflowLabels();
        },

        reflowLabels: function() {
            var axis = this,
                measureBox = new Box2D(),
                divs = axis.majorIntervals(),
                labels = axis.labels,
                labelBox,
                i;

            for (i = 0; i < labels.length; i++) {
                labels[i].reflow(measureBox);
                labelBox = labels[i].box;

                labels[i].reflow(axis.getSlot(divs[i]).adjacentBox(
                    0, labelBox.width(), labelBox.height()
                ));
            }
        },

        lineBox: function() {
            return this.box;
        },

        intervals: function(step, skipStep) {
            var axis = this,
                options = axis.options,
                divisions = axis.getDivisions(step),
                angle = options.min,
                divs = [],
                i;

            if (skipStep) {
                skipStep = skipStep / step;
            }

            for (i = 0; i < divisions; i++) {
                if (i % skipStep !== 0) {
                    divs.push((360 + angle) % 360);
                }

                angle += step;
            }

            return divs;
        },

        majorIntervals: function() {
            return this.intervals(this.options.majorUnit);
        },

        minorIntervals: function() {
            return this.intervals(this.options.minorUnit);
        },

        intervalAngle: function(i) {
            return (360 + i - this.options.startAngle) % 360;
        },

        majorAngles: RadarCategoryAxis.fn.majorAngles,

        createLine: function() {
            return [];
        },

        majorGridLineAngles: function(altAxis) {
            return this.gridLineAngles(altAxis, this.options.majorUnit);
        },

        minorGridLineAngles: function(altAxis, skipMajor) {
            return this.gridLineAngles(altAxis, this.options.minorUnit,
                      skipMajor ? this.options.majorUnit : 0);
        },

        createPlotBands: RadarCategoryAxis.fn.createPlotBands,

        plotBandSlot: function(band) {
            return this.getSlot(band.from, band.to);
        },

        getSlot: function(a, b) {
            var axis = this,
                options = axis.options,
                start = options.startAngle,
                box = axis.box,
                tmp;

            a = limitValue(a, options.min, options.max);
            b = limitValue(b || a, a, options.max);

            if (options.reverse) {
                a *= -1;
                b *= -1;
            }

            a = (540 - a - start) % 360;
            b = (540 - b - start) % 360;

            if (b < a) {
                tmp = a;
                a = b;
                b = tmp;
            }

            return new Ring(
                box.center(), 0, box.height() / 2,
                a, b - a
            );
        },

        getValue: function(point) {
            var axis = this,
                options = axis.options,
                center = axis.box.center(),
                dx = point.x - center.x,
                dy = point.y - center.y,
                theta = math.round(math.atan2(dy, dx) / DEG_TO_RAD),
                start = options.startAngle;

            if (!options.reverse) {
                theta *= -1;
                start *= -1;
            }

            return (theta + start + 360) % 360;
        },

        labelsCount: NumericAxis.fn.labelsCount,
        createAxisLabel: NumericAxis.fn.createAxisLabel
    });
    deepExtend(PolarAxis.fn, GridLinesMixin);

    var RadarClusterLayout = ChartElement.extend({
        options: {
            gap: 1,
            spacing: 0
        },

        reflow: function(sector) {
            var cluster = this,
                options = cluster.options,
                children = cluster.children,
                gap = options.gap,
                spacing = options.spacing,
                count = children.length,
                slots = count + gap + (spacing * (count - 1)),
                slotAngle = sector.angle / slots,
                slotSector,
                angle = sector.startAngle + slotAngle * (gap / 2),
                i;

            for (i = 0; i < count; i++) {
                slotSector = sector.clone();
                slotSector.startAngle = angle;
                slotSector.angle = slotAngle;

                if (children[i].sector) {
                    slotSector.r = children[i].sector.r;
                }

                children[i].reflow(slotSector);
                children[i].sector = slotSector;

                angle += slotAngle + (slotAngle * spacing);
            }
        }
    });

    var RadarStackLayout = ChartElement.extend({
        reflow: function(sector) {
            var stack = this,
                reverse = stack.options.isReversed,
                children = stack.children,
                childrenCount = children.length,
                childSector,
                i,
                first = reverse ? childrenCount - 1 : 0,
                step = reverse ? -1 : 1;

            stack.box = new Box2D();

            for (i = first; i >= 0 && i < childrenCount; i += step) {
                childSector = children[i].sector;
                childSector.startAngle = sector.startAngle;
                childSector.angle = sector.angle;
            }
        }
    });

    var RadarSegment = DonutSegment.extend({
        init: function(value, options) {
            DonutSegment.fn.init.call(this, value, null, options);
        },

        options: {
            overlay: {
                gradient: null
            },
            labels: {
                distance: 10
            }
        }
    });

    var RadarBarChart = BarChart.extend({
        pointType: function() {
            return RadarSegment;
        },

        clusterType: function() {
            return RadarClusterLayout;
        },

        stackType: function() {
            return RadarStackLayout;
        },

        categorySlot: function(categoryAxis, categoryIx) {
            return categoryAxis.getSlot(categoryIx);
        },

        pointSlot: function(categorySlot, valueSlot) {
            var slot = categorySlot.clone(),
                y = categorySlot.c.y;

            slot.r = y - valueSlot.y1;
            slot.ir = y - valueSlot.y2;

            return slot;
        },

        reflow: CategoricalChart.fn.reflow,

        reflowPoint: function(point, pointSlot) {
            point.sector = pointSlot;
            point.reflow();
        },

        options: {
            clip: false,
            animation: {
                type: "pie"
            }
        },

        createAnimation: function() {
            this.options.animation.center = this.box.toRect().center();
            BarChart.fn.createAnimation.call(this);
        }
    });

    var RadarLineChart = LineChart.extend({
        options: {
            clip: false
        },

        pointSlot: function(categorySlot, valueSlot) {
            var valueRadius = categorySlot.c.y - valueSlot.y1,
                slot = Point2D.onCircle(categorySlot.c, categorySlot.middle(), valueRadius);

            return new Box2D(slot.x, slot.y, slot.x, slot.y);
        },

        createSegment: function(linePoints, currentSeries, seriesIx) {
            var segment,
                pointType,
                style = currentSeries.style;

            if(style == SMOOTH){
                pointType = SplineSegment;
            } else {
                pointType = LineSegment;
            }

            segment = new pointType(linePoints, currentSeries, seriesIx);

            if (linePoints.length === currentSeries.data.length) {
                segment.options.closed = true;
            }

            return segment;
        }
    });

    var RadarAreaSegment = AreaSegment.extend({
        points: function() {
            return LineSegment.fn.points.call(this, this.stackPoints);
        }
    });

    var SplineRadarAreaSegment = SplineAreaSegment.extend({
        areaPoints: function() {
            return [];
        }
    });

    var RadarAreaChart = RadarLineChart.extend({
        createSegment: function(linePoints, currentSeries, seriesIx, prevSegment) {
            var chart = this,
                options = chart.options,
                isStacked = options.isStacked,
                stackPoints,
                segment,
                style = (currentSeries.line || {}).style;

            if(style === SMOOTH){
                segment = new SplineRadarAreaSegment(linePoints, prevSegment, isStacked, currentSeries, seriesIx);
                segment.options.closed = true;
            }
            else {
                if (isStacked && seriesIx > 0 && prevSegment) {
                    stackPoints = prevSegment.linePoints.slice(0).reverse();
                }

                linePoints.push(linePoints[0]);
                segment = new RadarAreaSegment(linePoints, stackPoints, currentSeries, seriesIx);
            }

            return segment;
        },

        seriesMissingValues: function(series) {
            return series.missingValues || ZERO;
        }
    });

    var PolarScatterChart = ScatterChart.extend({
        pointSlot: function(slotX, slotY) {
            var valueRadius = slotX.c.y - slotY.y1,
                slot = Point2D.onCircle(slotX.c, slotX.startAngle, valueRadius);

            return new Box2D(slot.x, slot.y, slot.x, slot.y);
        },
        options: {
            clip: false
        }
    });

    var PolarLineChart = ScatterLineChart.extend({
        pointSlot: PolarScatterChart.fn.pointSlot,
        options: {
            clip: false
        }
    });

    var PolarAreaSegment = AreaSegment.extend({
        points: function() {
            var segment = this,
                chart = segment.parent,
                plotArea = chart.plotArea,
                polarAxis = plotArea.polarAxis,
                center = polarAxis.box.center(),
                stackPoints = segment.stackPoints,
                points = LineSegment.fn.points.call(segment, stackPoints);

            points.unshift([center.x, center.y]);
            points.push([center.x, center.y]);

            return points;
        }
    });

    var SplinePolarAreaSegment = SplineAreaSegment.extend({
        areaPoints: function(){
             var segment = this,
                chart = segment.parent,
                plotArea = chart.plotArea,
                polarAxis = plotArea.polarAxis,
                center = polarAxis.box.center();
            return [center];
        },
        points: function() {
            var segment = this,
                chart = segment.parent,
                plotArea = chart.plotArea,
                polarAxis = plotArea.polarAxis,
                center = polarAxis.box.center(),
                curvePoints,
                curveProcessor = new CurveProcessor(false),
                linePoints = LineSegment.fn.points.call(this);
                linePoints.push(center);

            curvePoints = curveProcessor.process(linePoints);
            curvePoints.splice(curvePoints.length - 3, curvePoints.length - 1);
            segment.curvePoints = curvePoints;
            return curvePoints;
        }
    });

    var PolarAreaChart = PolarLineChart.extend({
        createSegment: function(linePoints, currentSeries, seriesIx) {
            var segment,
                style = (currentSeries.line || {}).style;
            if(style == SMOOTH){
                segment = new SplinePolarAreaSegment(linePoints, null, false, currentSeries, seriesIx);
            }
            else{
                segment = new PolarAreaSegment(linePoints, [], currentSeries, seriesIx);
            }
            return segment;
        },

        seriesMissingValues: function(series) {
            return series.missingValues || ZERO;
        },

        sortPoints: function(points) {
            return points.sort(xComparer);
        }
    });

    var PolarPlotAreaBase = PlotAreaBase.extend({
        init: function(series, options) {
            var plotArea = this;

            plotArea.valueAxisRangeTracker = new AxisGroupRangeTracker();

            PlotAreaBase.fn.init.call(plotArea, series, options);
        },

        render: function() {
            var plotArea = this;

            plotArea.addToLegend(plotArea.series);
            plotArea.createPolarAxis();
            plotArea.createCharts();
            plotArea.createValueAxis();
        },

        createValueAxis: function() {
            var plotArea = this,
                tracker = plotArea.valueAxisRangeTracker,
                defaultRange = tracker.query(),
                range,
                valueAxis,
                axisOptions = plotArea.valueAxisOptions({
                    roundToMajorUnit: false, zIndex: -1
                }),
                axisType,
                axisDefaultRange;

            if (axisOptions.type === LOGARITHMIC) {
                axisType = RadarLogarithmicAxis;
                axisDefaultRange = {min: 0.1, max: 1};
            } else {
                axisType = RadarNumericAxis;
                axisDefaultRange = {min: 0, max: 1};
            }

            range = tracker.query(name) || defaultRange || axisDefaultRange;

            if (range && defaultRange) {
                range.min = math.min(range.min, defaultRange.min);
                range.max = math.max(range.max, defaultRange.max);
            }

            valueAxis = new axisType(
                range.min, range.max,
                axisOptions
            );

            plotArea.valueAxis = valueAxis;
            plotArea.appendAxis(valueAxis);
        },

        reflowAxes: function () {
            var plotArea = this,
                options = plotArea.options.plotArea,
                valueAxis = plotArea.valueAxis,
                polarAxis = plotArea.polarAxis,
                box = plotArea.box,
                defaultPadding = math.min(box.width(), box.height()) * DEFAULT_PADDING,
                padding = getSpacing(options.padding || {}, defaultPadding),
                axisBox = box.clone().unpad(padding),
                valueAxisBox = axisBox.clone().shrink(0, axisBox.height() / 2);

            polarAxis.reflow(axisBox);
            valueAxis.reflow(valueAxisBox);
            var heightDiff = valueAxis.lineBox().height() - valueAxis.box.height();
            valueAxis.reflow(valueAxis.box.unpad({ top: heightDiff }));

            plotArea.axisBox = axisBox;
            plotArea.alignAxes(axisBox);
        },

        alignAxes: function() {
            var plotArea = this,
                valueAxis = plotArea.valueAxis,
                slot = valueAxis.getSlot(valueAxis.options.min),
                slotEdge = valueAxis.options.reverse ? 2 : 1,
                center = plotArea.polarAxis.getSlot(0).c,
                box = valueAxis.box.translate(
                    center.x - slot[X + slotEdge],
                    center.y - slot[Y + slotEdge]
                );

            valueAxis.reflow(box);
        },

        backgroundBox: function() {
            return this.box;
        }
    });

    var RadarPlotArea = PolarPlotAreaBase.extend({
        options: {
            categoryAxis: {
                categories: []
            },
            valueAxis: {}
        },

        createPolarAxis: function() {
            var plotArea = this,
                categoryAxis;

            categoryAxis = new RadarCategoryAxis(plotArea.options.categoryAxis);

            plotArea.polarAxis = categoryAxis;
            plotArea.categoryAxis = categoryAxis;
            plotArea.appendAxis(categoryAxis);
        },

        valueAxisOptions: function(defaults) {
            var plotArea = this;

            if (plotArea._hasBarCharts) {
                deepExtend(defaults, {
                    majorGridLines: { type: ARC },
                    minorGridLines: { type: ARC }
                });
            }

            if (plotArea._isStacked100) {
                deepExtend(defaults, {
                    roundToMajorUnit: false,
                    labels: { format: "P0" }
                });
            }

            return deepExtend(defaults, plotArea.options.valueAxis);
        },

        appendChart: CategoricalPlotArea.fn.appendChart,

        createCharts: function() {
            var plotArea = this,
                series = plotArea.filterVisibleSeries(plotArea.series),
                pane = plotArea.panes[0];

            plotArea.createAreaChart(
                filterSeriesByType(series, [RADAR_AREA]),
                pane
            );

            plotArea.createLineChart(
                filterSeriesByType(series, [RADAR_LINE]),
                pane
            );

            plotArea.createBarChart(
                filterSeriesByType(series, [RADAR_COLUMN]),
                pane
            );
        },

        chartOptions: function(series) {
            var options = { series: series };
            var firstSeries = series[0];
            if (firstSeries) {
                var filteredSeries = this.filterVisibleSeries(series);
                var stack = firstSeries.stack;
                options.isStacked = stack && filteredSeries.length > 1;
                options.isStacked100 = stack && stack.type === "100%" && filteredSeries.length > 1;

                if (options.isStacked100) {
                    this._isStacked100 = true;
                }
            }

            return options;
        },

        createAreaChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var areaChart = new RadarAreaChart(this, this.chartOptions(series));
            this.appendChart(areaChart, pane);
        },

        createLineChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var lineChart = new RadarLineChart(this, this.chartOptions(series));
            this.appendChart(lineChart, pane);
        },

        createBarChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var firstSeries = series[0];
            var options = this.chartOptions(series);
            options.gap = firstSeries.gap;
            options.spacing = firstSeries.spacing;

            var barChart = new RadarBarChart(this, options);
            this.appendChart(barChart, pane);

            this._hasBarCharts = true;
        },

        seriesCategoryAxis: function() {
            return this.categoryAxis;
        },

        click: function(chart, e) {
            var plotArea = this,
                coords = chart._eventCoordinates(e),
                point = new Point2D(coords.x, coords.y),
                category,
                value;

            category = plotArea.categoryAxis.getCategory(point);
            value = plotArea.valueAxis.getValue(point);

            if (category !== null && value !== null) {
                chart.trigger(PLOT_AREA_CLICK, {
                    element: $(e.target),
                    category: category,
                    value: value
                });
            }
        }
    });

    var PolarPlotArea = PolarPlotAreaBase.extend({
        options: {
            xAxis: {},
            yAxis: {}
        },

        createPolarAxis: function() {
            var plotArea = this,
                polarAxis;

            polarAxis = new PolarAxis(plotArea.options.xAxis);

            plotArea.polarAxis = polarAxis;
            plotArea.axisX = polarAxis;
            plotArea.appendAxis(polarAxis);
        },

        valueAxisOptions: function(defaults) {
            var plotArea = this;

            return deepExtend(defaults, {
                    majorGridLines: { type: ARC },
                    minorGridLines: { type: ARC }
                }, plotArea.options.yAxis
            );
        },

        createValueAxis: function() {
            var plotArea = this;

            PolarPlotAreaBase.fn.createValueAxis.call(plotArea);
            plotArea.axisY = plotArea.valueAxis;
        },

        appendChart: function(chart, pane) {
            var plotArea = this;

            plotArea.valueAxisRangeTracker.update(chart.yAxisRanges);

            PlotAreaBase.fn.appendChart.call(plotArea, chart, pane);
        },

        createCharts: function() {
            var plotArea = this,
                series = plotArea.filterVisibleSeries(plotArea.series),
                pane = plotArea.panes[0];

            plotArea.createLineChart(
                filterSeriesByType(series, [POLAR_LINE]),
                pane
            );

            plotArea.createScatterChart(
                filterSeriesByType(series, [POLAR_SCATTER]),
                pane
            );

            plotArea.createAreaChart(
                filterSeriesByType(series, [POLAR_AREA]),
                pane
            );
        },

        createLineChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                lineChart = new PolarLineChart(plotArea, { series: series });

            plotArea.appendChart(lineChart, pane);
        },

        createScatterChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                scatterChart = new PolarScatterChart(plotArea, { series: series });

            plotArea.appendChart(scatterChart, pane);
        },

        createAreaChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                areaChart = new PolarAreaChart(plotArea, { series: series });

            plotArea.appendChart(areaChart, pane);
        },

        click: function(chart, e) {
            var plotArea = this,
                coords = chart._eventCoordinates(e),
                point = new Point2D(coords.x, coords.y),
                xValue,
                yValue;

            xValue = plotArea.axisX.getValue(point);
            yValue = plotArea.axisY.getValue(point);

            if (xValue !== null && yValue !== null) {
                chart.trigger(PLOT_AREA_CLICK, {
                    element: $(e.target),
                    x: xValue,
                    y: yValue
                });
            }
        }
    });

    // Helpers ================================================================
    function xComparer(a, b) {
        return a.value.x - b.value.x;
    }

    function angularDistance(a, b) {
        return 180 - math.abs(math.abs(a - b) - 180);
    }

    // Exports ================================================================
    PlotAreaFactory.current.register(PolarPlotArea, POLAR_CHARTS);
    PlotAreaFactory.current.register(RadarPlotArea, RADAR_CHARTS);

    SeriesBinder.current.register(POLAR_CHARTS, [X, Y], ["color"]);
    SeriesBinder.current.register(RADAR_CHARTS, ["value"], ["color"]);

    dataviz.DefaultAggregates.current.register(
        RADAR_CHARTS,
        { value: "max", color: "first" }
    );

    deepExtend(dataviz, {
        PolarAreaChart: PolarAreaChart,
        PolarAxis: PolarAxis,
        PolarLineChart: PolarLineChart,
        PolarPlotArea: PolarPlotArea,
        RadarAreaChart: RadarAreaChart,
        RadarBarChart: RadarBarChart,
        RadarCategoryAxis: RadarCategoryAxis,
        RadarClusterLayout: RadarClusterLayout,
        RadarLineChart: RadarLineChart,
        RadarNumericAxis: RadarNumericAxis,
        RadarPlotArea: RadarPlotArea,
        SplinePolarAreaSegment:  SplinePolarAreaSegment,
        SplineRadarAreaSegment: SplineRadarAreaSegment,
        RadarStackLayout: RadarStackLayout
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
