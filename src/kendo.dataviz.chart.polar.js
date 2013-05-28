kendo_module({
    id: "dataviz.chart.polar",
    name: "Polar Charts",
    category: "dataviz",
    depends: ["dataviz.chart"],
    hidden: true
});

(function ($, undefined) {
    // Imports ================================================================
    var math = Math,

        kendo = window.kendo,
        deepExtend = kendo.deepExtend,

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
        DonutSegment = dataviz.DonutSegment,
        LineChart = dataviz.LineChart,
        LineSegment = dataviz.LineSegment,
        NumericAxis = dataviz.NumericAxis,
        PlotAreaBase = dataviz.PlotAreaBase,
        PlotAreaFactory = dataviz.PlotAreaFactory,
        Point2D = dataviz.Point2D,
        Ring = dataviz.Ring,
        ScatterChart = dataviz.ScatterChart,
        ScatterLineChart = dataviz.ScatterLineChart,
        append = dataviz.append,
        defined = dataviz.defined,
        getSpacing = dataviz.getSpacing,
        filterSeriesByType = dataviz.filterSeriesByType,
        limitValue = dataviz.limitValue,
        round = dataviz.round,
        singleItemOrArray = dataviz.singleItemOrArray;

    // Constants ==============================================================
    var
        ARC = "arc",
        BLACK = "#000",
        COORD_PRECISION = dataviz.COORD_PRECISION,
        RADAR_AREA = "radarArea",
        RADAR_COLUMN = "radarColumn",
        RADAR_LINE = "radarLine",
        PLOT_AREA_CLICK = "plotAreaClick",
        POLAR_AREA = "polarArea",
        POLAR_LINE = "polarLine",
        POLAR_SCATTER = "polarScatter",
        X = "x",
        Y = "y",
        ZERO = "zero",
        POLAR_CHARTS = [
            POLAR_AREA, POLAR_LINE, POLAR_SCATTER
        ],
        RADAR_CHARTS = [
            RADAR_AREA, RADAR_LINE, RADAR_COLUMN
        ] ;

    // Polar and radar charts =================================================
    var RadarCategoryAxis = CategoryAxis.extend({
        options: {
            // TODO: Document
            startAngle: 90,
            labels: {
                // TODO: Document
                margin: getSpacing(10)
            },
            majorGridLines: {
                visible: true
            },
            // TODO: Document for radar charts
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

        divisions: function(step, skipStep) {
            var axis = this,
                options = axis.options,
                categories = options.categories.length,
                startAngle = options.startAngle,
                angle = startAngle,
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

                if ((angle - startAngle) % skipAngle !== 0) {
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

        majorDivisions: function() {
            return this.divisions(1);
        },

        minorDivisions: function() {
            return this.divisions(0.5);
        },

        renderLine: $.noop,

        renderGridLines: function(view, altAxis) {
            var axis = this,
                options = axis.options,
                radius = math.abs(axis.box.center().y - altAxis.lineBox().y1),
                majorDivisions,
                minorDivisions,
                skipMajor = false,
                gridLines = [];

            if (options.majorGridLines.visible) {
                majorDivisions = axis.majorGridLineDivisions(altAxis);
                skipMajor = true;

                gridLines = axis.gridLineElements(
                    view, majorDivisions, radius, options.majorGridLines
                );
            }

            if (options.minorGridLines.visible) {
                minorDivisions = axis.minorGridLineDivisions(altAxis, skipMajor);

                append(gridLines, axis.gridLineElements(
                    view, minorDivisions, radius, options.minorGridLines
                ));
            }

            return gridLines;
        },

        gridLineElements: function(view, angles, radius, options) {
            var axis = this,
                center = axis.box.center(),
                modelId = axis.plotArea.options.modelId,
                i,
                outerPt,
                elements = [],
                lineOptions;

            lineOptions = {
                data: { modelId: modelId },
                zIndex: -1,
                strokeWidth: options.width,
                stroke: options.color,
                dashType: options.dashType
            };

            for (i = 0; i < angles.length; i++) {
                outerPt = Point2D.onCircle(center, angles[i], radius);

                // TODO: Inner radius support
                elements.push(view.createLine(
                    center.x, center.y, outerPt.x, outerPt.y,
                    lineOptions
                ));
            }

            return elements;
        },

        majorGridLineDivisions: function(altAxis) {
            return this.gridLineDivisions(altAxis, 1);
        },

        minorGridLineDivisions: function(altAxis, skipMajor) {
            return this.gridLineDivisions(altAxis, 0.5, skipMajor ? 1 : 0);
        },

        gridLineDivisions: function(altAxis, step, skipStep) {
            var result = this.divisions(step, skipStep);

            if (altAxis.options.visible) {
                result = $.grep(result, function(d) { return d !== 90; });
            }

            return result;
        },

        renderPlotBands: function(view) {
            var axis = this,
                options = axis.options,
                plotBands = options.plotBands || [],
                elements = [],
                i,
                band,
                slot,
                singleSlot,
                head,
                tail;

            for (i = 0; i < plotBands.length; i++) {
                band = plotBands[i];
                slot = axis.plotBandSlot(band);
                singleSlot = axis.getSlot(band.from);

                head = band.from - math.floor(band.from);
                slot.startAngle += head * singleSlot.angle;

                tail = math.ceil(band.to) - band.to;
                slot.angle -= (tail + head) * singleSlot.angle;

                elements.push(view.createSector(slot, {
                    fill: band.color,
                    fillOpacity: band.opacity,
                    strokeOpacity: band.opacity,
                    zIndex: -1
                }));
            }

            return elements;
        },

        plotBandSlot: function(band) {
            return this.getSlot(band.from, band.to - 1);
        },

        getSlot: function(from, to) {
            var axis = this,
                options = axis.options,
                justified = options.justified,
                box = axis.box,
                divs = axis.majorDivisions(),
                totalDivs = divs.length,
                slots,
                slotAngle = 360 / totalDivs,
                startAngle,
                angle;

            if (options.reverse && !justified) {
                from = (from + 1) % totalDivs;
            }

            from = limitValue(math.floor(from), 0, totalDivs - 1);
            startAngle = divs[from];

            if (justified) {
                startAngle = startAngle - slotAngle / 2;

                if (startAngle < 0) {
                    startAngle += 360;
                }
            }

            to = limitValue(math.ceil(to || from), from, totalDivs - 1);
            slots = to - from + 1;
            angle = slotAngle * slots;

            return new Ring(
                box.center(), 0, box.height() / 2,
                startAngle, angle
            );
        },

        getCategoryIndex: function(point) {
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

    var RadarNumericAxis = NumericAxis.extend({
        options: {
            majorGridLines: {
                // TODO: Document type[line*, arc]
                visible: true
            }
        },

        renderPlotBands: function(view) {
            var axis = this,
                options = axis.options,
                plotBands = options.plotBands || [],
                elements = [],
                // TODO: Lookup from plotArea. Should it be user changable?
                type = options.majorGridLines.type,
                altAxis = axis.plotArea.polarAxis,
                majorAngles = altAxis.majorDivisions(),
                center = altAxis.box.center(),
                i,
                band,
                bandStyle,
                slot,
                ring;

            for (i = 0; i < plotBands.length; i++) {
                band = plotBands[i];
                bandStyle = {
                    fill: band.color,
                    fillOpacity: band.opacity,
                    strokeOpacity: band.opacity,
                    zIndex: -1
                };

                slot = axis.getSlot(band.from, band.to);
                ring = new Ring(center, center.y - slot.y2, center.y - slot.y1, 0, 360);

                elements.push(type === ARC ?
                    view.createRing(ring, bandStyle) :
                    view.createPolyline(
                        axis.plotBandPoints(ring, majorAngles), true, bandStyle
                    )
                );
            }

            return elements;
        },

        plotBandPoints: function(ring, angles) {
            var innerPoints = [],
                outerPoints = [],
                i;

            for (i = 0; i < angles.length; i++) {
                innerPoints.push(Point2D.onCircle(ring.c, angles[i], ring.ir));
                outerPoints.push(Point2D.onCircle(ring.c, angles[i], ring.r));
            }

            innerPoints.reverse();
            innerPoints.push(innerPoints[0]);
            outerPoints.push(outerPoints[0]);

            return outerPoints.concat(innerPoints);
        },

        renderGridLines: function(view, altAxis) {
            var axis = this,
                options = axis.options,
                majorTicks = axis.getTickPositions(options.majorUnit),
                majorAngles = altAxis.majorDivisions(),
                minorTicks,
                minorSkipStep = 0,
                center = altAxis.box.center(),
                gridLines = [];

            if (options.majorGridLines.visible) {
                minorSkipStep = options.majorUnit;
                gridLines = axis.gridLineElements(
                    view, center, majorTicks, majorAngles, options.majorGridLines
                );
            }

            if (options.minorGridLines.visible) {
                minorTicks = axis.getTickPositions(options.minorUnit, minorSkipStep);
                append(gridLines, axis.gridLineElements(
                    view, center, minorTicks, majorAngles, options.minorGridLines
                ));
            }

            return gridLines;
        },

        gridLineElements: function(view, center, ticks, angles, options) {
            var axis = this,
                modelId = axis.plotArea.options.modelId,
                elements = [],
                elementOptions,
                points,
                tickRadius,
                tickIx,
                angleIx;

            elementOptions = {
                data: { modelId: modelId },
                zIndex: -1,
                strokeWidth: options.width,
                stroke: options.color,
                dashType: options.dashType
            };

            for (tickIx = 0; tickIx < ticks.length; tickIx++) {
                tickRadius = center.y - ticks[tickIx];
                if(tickRadius > 0) {
                    if (options.type === ARC) {
                        elements.push(view.createCircle(
                            center, tickRadius, elementOptions
                        ));
                    } else {
                        points = [];
                        for (angleIx = 0; angleIx < angles.length; angleIx++) {
                            points.push(
                                Point2D.onCircle(center, angles[angleIx], tickRadius)
                            );
                        }

                        elements.push(view.createPolyline(points, true, elementOptions));
                    }
                }
            }

            return elements;
        }
    });

    var PolarNumericAxis = Axis.extend({
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
                // TODO: Document
                margin: getSpacing(10)
            },
            // TODO: Defaults
            majorGridLines: {
                color: BLACK,
                visible: true
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
                divs = axis.majorDivisions(),
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

        divisions: function(step, skipStep) {
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

        majorDivisions: function() {
            return this.divisions(this.options.majorUnit);
        },

        minorDivisions: function() {
            return this.divisions(this.options.minorUnit);
        },

        renderLine: $.noop,

        renderGridLines: RadarCategoryAxis.fn.renderGridLines,
        gridLineElements: RadarCategoryAxis.fn.gridLineElements,
        gridLineDivisions: RadarCategoryAxis.fn.gridLineDivisions,

        majorGridLineDivisions: function(altAxis) {
            return this.gridLineDivisions(altAxis, this.options.majorUnit);
        },

        minorGridLineDivisions: function(altAxis, skipMajor) {
            return this.gridLineDivisions(altAxis, this.options.minorUnit,
                      skipMajor ? this.options.majorUnit : 0);
        },

        renderPlotBands: RadarCategoryAxis.fn.renderPlotBands,

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
            // TODO: Implement
        },

        labelsCount: NumericAxis.fn.labelsCount,
        createAxisLabel: NumericAxis.fn.createAxisLabel
    });

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
                prevSector,
                i,
                first = reverse ? childrenCount - 1 : 0,
                step = reverse ? -1 : 1;

            stack.box = new Box2D();

            for (i = first; i >= 0 && i < childrenCount; i += step) {
                childSector = children[i].sector;
                childSector.startAngle = sector.startAngle;
                childSector.angle = sector.angle;

                if (i !== first) {
                    prevSector = children[reverse ? i + 1 : i - 1].sector;
                    childSector.ir = prevSector.ir + prevSector.r;
                }
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

        valueSlot: function(valueAxis, value) {
            return valueAxis.getSlot(value);
        },

        categorySlot: function(categoryAxis, categoryIx) {
            return categoryAxis.getSlot(categoryIx);
        },

        pointSlot: function(categorySlot, valueSlot) {
            var slot = categorySlot.clone(),
                valueRadius = categorySlot.c.y - valueSlot.y1;

            slot.r = valueRadius;

            return slot;
        },

        reflow: CategoricalChart.fn.reflow,

        reflowPoint: function(point, pointSlot) {
            point.sector = pointSlot;
            point.reflow();
        }
    });

    var RadarLineChart = LineChart.extend({
        pointSlot: function(categorySlot, valueSlot) {
            var valueRadius = categorySlot.c.y - valueSlot.y1,
                slot = Point2D.onCircle(categorySlot.c, categorySlot.middle(), valueRadius);

            return new Box2D(slot.x, slot.y, slot.x, slot.y);
        },

        createSegment: function(linePoints, currentSeries, seriesIx) {
            var segment = new LineSegment(linePoints, currentSeries, seriesIx);

            if (linePoints.length === currentSeries.data.length) {
                segment.options.closed = true;
            }

            return segment;
        }
    });

    var RadarAreaSegment = AreaSegment.extend({
        points: function() {
            var segment = this,
                chart = segment.parent,
                plotArea = chart.plotArea,
                polarAxis = plotArea.polarAxis,
                center = polarAxis.box.center(),
                stackPoints = segment.stackPoints,
                points = LineSegment.fn.points.call(segment, stackPoints);

            points.unshift(center);
            points.push(center);

            return points;
        }
    });

    var RadarAreaChart = RadarLineChart.extend({
        createSegment: function(linePoints, currentSeries, seriesIx, prevSegment) {
            var chart = this,
                options = chart.options,
                stackPoints;

            if (options.isStacked && seriesIx > 0 && prevSegment) {
                stackPoints = prevSegment.linePoints.slice(0).reverse();
            }

            return new RadarAreaSegment(linePoints, stackPoints, currentSeries, seriesIx);
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
        }
    });

    var PolarLineChart = ScatterLineChart.extend({
        pointSlot: PolarScatterChart.fn.pointSlot
    });

    var PolarAreaChart = PolarLineChart.extend({
        createSegment: function(linePoints, currentSeries, seriesIx) {
            return new RadarAreaSegment(linePoints, [], currentSeries, seriesIx);
        },

        seriesMissingValues: function(series) {
            return series.missingValues || ZERO;
        },

        sortPoints: function(points) {
            return points.sort(xComparer);
        }
    });

    var RadarPlotArea = PlotAreaBase.extend({
        init: function(series, options) {
            var plotArea = this;

            plotArea.valueAxisRangeTracker = new AxisGroupRangeTracker();

            PlotAreaBase.fn.init.call(plotArea, series, options);
        },

        options: {
            categoryAxis: {
                categories: []
            },
            valueAxis: {}
        },

        render: function() {
            var plotArea = this;

            plotArea.createCategoryAxis();
            // plotArea.aggregateDateSeries();
            plotArea.createCharts();
            plotArea.createValueAxis();
        },

        reflow: PlotAreaBase.fn.reflow,

        reflowAxes: function () {
            var plotArea = this,
                valueAxis = plotArea.valueAxis,
                categoryAxis = plotArea.categoryAxis,
                box = plotArea.box,
                // TODO: Percents
                axisBox = box.clone().unpad(35),
                valueAxisBox = axisBox.clone().shrink(0, axisBox.height() / 2);

            categoryAxis.reflow(axisBox);
            valueAxis.reflow(valueAxisBox);
            var heightDiff = valueAxis.lineBox().height() - valueAxis.box.height();
            valueAxis.reflow(valueAxis.box.unpad({ top: heightDiff }));

            plotArea.alignAxes(axisBox);
        },

        alignAxes: function() {
            var plotArea = this,
                valueAxis = plotArea.valueAxis,
                slot = valueAxis.getSlot(valueAxis.options.min),
                slotEdge = valueAxis.options.reverse ? 2 : 1,
                center = plotArea.categoryAxis.getSlot(0).c,
                box = valueAxis.box.translate(
                    center.x - slot[X + slotEdge],
                    center.y - slot[Y + slotEdge]
                );

            valueAxis.reflow(box);
        },

        backgroundBox: function() {
            return this.box;
        },

        createCategoryAxis: function() {
            var plotArea = this,
                categoryAxis;

            categoryAxis = new RadarCategoryAxis(plotArea.options.categoryAxis);

            plotArea.categoryAxis = categoryAxis;
            plotArea.polarAxis = categoryAxis;
            plotArea.appendAxis(categoryAxis);
        },

        createValueAxis: function() {
            var plotArea = this,
                tracker = plotArea.valueAxisRangeTracker,
                defaultRange = tracker.query(),
                range,
                valueAxis;

            // TODO: Should we support multiple axes?
            range = tracker.query(name) || defaultRange || { min: 0, max: 1 };

            if (range && defaultRange) {
                range.min = math.min(range.min, defaultRange.min);
                range.max = math.max(range.max, defaultRange.max);
            }

            valueAxis = new RadarNumericAxis(
                range.min, range.max,
                deepExtend({ max: range.max }, plotArea.options.valueAxis)
            );

            plotArea.valueAxis = valueAxis;
            plotArea.appendAxis(valueAxis);
        },

        appendChart: CategoricalPlotArea.fn.appendChart,

        createCharts: function() {
            var plotArea = this,
                series = plotArea.series,
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

        createAreaChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                filteredSeries = plotArea.filterVisibleSeries(series),
                areaChart = new RadarAreaChart(plotArea, {
                    isStacked: firstSeries.stack && filteredSeries.length > 1,
                    series: series
                });

            plotArea.appendChart(areaChart, pane);
        },

        createLineChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                filteredSeries = plotArea.filterVisibleSeries(series),
                lineChart = new RadarLineChart(plotArea, {
                    isStacked: firstSeries.stack && filteredSeries.length > 1,
                    series: series
                });

            plotArea.appendChart(lineChart, pane);
        },

        createBarChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                filteredSeries = plotArea.filterVisibleSeries(series),
                lineChart = new RadarBarChart(plotArea, {
                    isStacked: firstSeries.stack && filteredSeries.length > 1,
                    series: series
                });

            plotArea.appendChart(lineChart, pane);
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

            // TODO: Test
            if (defined(category) && defined(value)) {
                chart.trigger(PLOT_AREA_CLICK, {
                    element: $(e.target),
                    category: singleItemOrArray(categories),
                    value: singleItemOrArray(values)
                });
            }
        }
    });
    PlotAreaFactory.current.register(RadarPlotArea, RADAR_CHARTS, 20);

    // TODO: Inherit / mixin from RadarPlotArea
    var PolarPlotArea = PlotAreaBase.extend({
        init: function(series, options) {
            var plotArea = this;

            plotArea.valueAxisRangeTracker = new AxisGroupRangeTracker();

            PlotAreaBase.fn.init.call(plotArea, series, options);
        },

        options: {
            polarAxis: {},
            valueAxis: {}
        },

        render: function() {
            var plotArea = this;

            plotArea.createPolarAxis();
            plotArea.createCharts();
            plotArea.createValueAxis();
        },

        reflow: PlotAreaBase.fn.reflow,

        reflowAxes: function () {
            var plotArea = this,
                valueAxis = plotArea.valueAxis,
                polarAxis = plotArea.polarAxis,
                box = plotArea.box,
                // TODO: Percents
                axisBox = box.clone().unpad(35),
                valueAxisBox = axisBox.clone().shrink(0, axisBox.height() / 2);

            polarAxis.reflow(axisBox);
            valueAxis.reflow(valueAxisBox);
            var heightDiff = valueAxis.lineBox().height() - valueAxis.box.height();
            valueAxis.reflow(valueAxis.box.unpad({ top: heightDiff }));

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
        },

        appendChart: function(chart, pane) {
            var plotArea = this;

            plotArea.valueAxisRangeTracker.update(chart.yAxisRanges);

            PlotAreaBase.fn.appendChart.call(plotArea, chart, pane);
        },

        createPolarAxis: function() {
            var plotArea = this,
                polarAxis;

            polarAxis = new PolarNumericAxis(plotArea.options.xAxis);

            plotArea.polarAxis = polarAxis;
            plotArea.axisX = polarAxis;
            plotArea.appendAxis(polarAxis);
        },

        createValueAxis: function() {
            var plotArea = this,
                tracker = plotArea.valueAxisRangeTracker,
                defaultRange = tracker.query(),
                range,
                valueAxis;

            // TODO: Should we support multiple axes?
            range = tracker.query(name) || defaultRange || { min: 0, max: 1 };

            if (range && defaultRange) {
                range.min = math.min(range.min, defaultRange.min);
                range.max = math.max(range.max, defaultRange.max);
            }

            valueAxis = new RadarNumericAxis(
                range.min, range.max,
                deepExtend({
                    max: range.max,
                    majorGridLines: { type: ARC },
                    minorGridLines: { type: ARC }
                }, plotArea.options.yAxis)
            );

            plotArea.valueAxis = valueAxis;
            plotArea.axisY = valueAxis;
            plotArea.appendAxis(valueAxis);
        },

        createCharts: function() {
            var plotArea = this,
                series = plotArea.series,
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
            // TODO: Implement
        }
    });
    PlotAreaFactory.current.register(PolarPlotArea, POLAR_CHARTS, 10);

    // Helpers ================================================================
    function xComparer(a, b) {
        return a.value.x - b.value.x;
    }

    // Exports ================================================================
    deepExtend(dataviz, {
        PolarNumericAxis: PolarNumericAxis,
        PolarPlotArea: PolarPlotArea,
        RadarBarChart: RadarBarChart,
        RadarCategoryAxis: RadarCategoryAxis,
        RadarClusterLayout: RadarClusterLayout,
        RadarNumericAxis: RadarNumericAxis,
        RadarPlotArea: RadarPlotArea,
        RadarStackLayout: RadarStackLayout
    });

})(window.kendo.jQuery);
