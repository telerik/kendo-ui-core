kendo_module({
    id: "dataviz.chart.funnel",
    name: "Funnel Chart",
    category: "dataviz",
    depends: ["dataviz.chart"],
    hidden: true
});

(function ($, undefined) {

    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,
        extend = $.extend,
        isFn = kendo.isFunction,
        template = kendo.template,

        dataviz = kendo.dataviz,
        ChartElement = dataviz.ChartElement,
        PlotAreaBase = dataviz.PlotAreaBase,
        PlotAreaFactory = dataviz.PlotAreaFactory,
        Point2D = dataviz.Point2D,
        Box2D = dataviz.Box2D,
        SeriesBinder = dataviz.SeriesBinder,
        Text = dataviz.Text,
        TextBox = dataviz.TextBox,
        append = dataviz.append,
        autoFormat = dataviz.autoFormat,
        evalOptions = dataviz.evalOptions,
        limitValue = dataviz.limitValue,
        uniqueId = dataviz.uniqueId;

    // Constants ==============================================================
    var CATEGORY = "category",
        COLOR = "color",
        FUNNEL = "funnel",
        VALUE = "value",
        WHITE = "white";

    // Funnel chart ===========================================================
    var FunnelPlotArea = PlotAreaBase.extend({
        render: function() {
            var plotArea = this,
                series = plotArea.series;

            plotArea.createFunnelChart(series);
        },

        createFunnelChart: function(series) {
            var plotArea = this,
                firstSeries = series[0],
                funnelChart = new FunnelChart(plotArea, {
                    series: series,
                    segmentMethod:firstSeries.segmentMethod,
                    legend: plotArea.options.legend,
                    neckSize: firstSeries.neckSize,
                    segmentSpacing:firstSeries.segmentSpacing
                });

            plotArea.appendChart(funnelChart);
        },

        appendChart: function(chart, pane) {
            PlotAreaBase.fn.appendChart.call(this, chart, pane);
            append(this.options.legend.items, chart.legendItems);
        }
    });

    var FunnelChart = ChartElement.extend({
        init: function(plotArea, options) {
            var chart = this;

            ChartElement.fn.init.call(chart, options);

            chart.plotArea = plotArea;
            chart.segments = [];
            chart.labels = [];
            chart.legendItems = [];
            chart.render();
        },

        options: {
            neckSize: 0.3,
            width: 300,
            segmentMethod:"none",
            segmentSpacing:0,
            labels: {
                visible: true,
                align: "center",
                position: "center" // top, bottom
            }
        },

        render: function() {
            var chart = this,
                options = chart.options,
                colors = chart.plotArea.options.seriesColors || [],
                colorsCount = colors.length,
                series = options.series[0],
                pointData, fields,
                data = series.data,
                total = chart.pointsTotal(series),
                value,
                i;

            for (i = 0; i < data.length; i++) {
                pointData = SeriesBinder.current.bindPoint(series, i);
                value = pointData.valueFields.value;
                fields = pointData.fields;

                if (!isFn(series.color)) {
                    series.color = fields.color || colors[i % colorsCount];
                }

                fields = deepExtend({
                    index: i,
                    owner: chart,
                    series: series,
                    category: fields.category,
                    dataItem: data[i],
                    percentage: value / total,
                    visibleInLegend: fields.visibleInLegend,
                    visible: fields.visible
                }, fields);

                var segment = chart.createSegment(value, fields);
                var label = chart.createLabel(value, fields);

                if (segment && label) {
                    segment.append(label);
                }
            }
        },

        evalSegmentOptions: function(options, value, fields) {
            var series = fields.series;

            evalOptions(options, {
                value: value,
                series: series,
                dataItem: fields.dataItem,
                index: fields.index
            }, { defaults: series._defaults, excluded: ["data"] });
        },

        createSegment: function(value, fields) {
            var chart = this,
                segment,
                options;

            //chart.createLegendItem(value, fields);

            if (fields.visible !== false) {
                var segmentOptions = deepExtend({}, fields.series);
                chart.evalSegmentOptions(segmentOptions, value, fields);

                segment = new FunnelSegment(value, segmentOptions);
                extend(segment, fields);

                chart.append(segment);
                chart.segments.push(segment);

                return segment;
            }
        },

        createLabel: function(value, fields) {
            var chart = this,
                series = fields.series,
                dataItem = fields.dataItem,
                labels = deepExtend({}, chart.options.labels, series.labels),
                text = value,
                textBox;

            if (labels.visible && value) {
                if (labels.template) {
                    labelTemplate = template(labels.template);
                    text = labelTemplate({
                        dataItem: dataItem,
                        value: value,
                        series: series
                    });
                } else if (labels.format) {
                    text = autoFormat(labels.format, text);
                }

                chart.evalSegmentOptions(labels, value, fields);

                textBox = new TextBox(text, deepExtend({
                        vAlign: labels.position,
                        id: uniqueId()
                    }, labels)
                );

                chart.labels.push(textBox);

                return textBox;
            }
        },

        // TODO: Same as PieChart.pointsTotal
        // -> Extract into base class / method
        pointsTotal: function(series) {
            var data = series.data,
                length = data.length,
                sum = 0,
                value, i, pointData;

            for (i = 0; i < length; i++) {
                pointData = SeriesBinder.current.bindPoint(series, i);
                value = pointData.valueFields.value;
                if (typeof value === "string") {
                    value = parseFloat(value);
                }

                if (value && pointData.fields.visible !== false) {
                    sum += value;
                }
            }

            return sum;
        },

        labelPadding: function() {
            var labels = this.labels,
                label,
                align,
                width,
                padding = { left: 0, right: 0 },
                i;

            for (i = 0; i < labels.length; i++) {
                label = labels[i];
                align = label.options.align;
                if (align !== "center") {
                    width = labels[i].box.width();

                    if(align === "left") {
                        padding.left = Math.max(padding.left, width);
                    } else {
                        padding.right = Math.max(padding.right, width);
                    }
                }
            }

            return padding;
        },

        reflow: function(chartBox) {
            var chart = this,
                options = chart.options,
                segments = chart.segments,
                count = segments.length,
                i,
                segmentSpacing = options.segmentSpacing,
                segmentMethod = options.segmentMethod,
                box = chartBox.clone().unpad(chart.labelPadding()),
                width = box.width(),
                totalHeight = box.height() - segmentSpacing * (count-1),
                neckSize = options.neckSize*width;

            if(segmentMethod=="height"){
                var finalNarrow = (width - neckSize)/2,
                height,
                offset,
                previousHeight = 0,
                previousOffset = 0;

                for (i = 0; i < count; i++) {
                    points = segments[i].points = [],
                    percentage = segments[i].percentage,
                    offset = finalNarrow * percentage,
                    height = totalHeight * percentage;
                    points.push(new Point2D(box.x1 + previousOffset, box.y1 + previousHeight));
                    points.push(new Point2D(box.x1+width - previousOffset, box.y1 + previousHeight));
                    points.push(new Point2D(box.x1+width - previousOffset - offset, box.y1 + height + previousHeight));
                    points.push(new Point2D(box.x1+ previousOffset + offset,box.y1 + height + previousHeight));
                    previousOffset += offset;
                    previousHeight += height + segmentSpacing;
                }
            }
            else if(segmentMethod==="relation"){
                //TODO make the data sorted 
                var lastUpperSide = width,
                    previousHeight = 0,
                    previousOffset = 0;

                for (i = 0; i < count; i++) {
                    points = segments[i].points = [],
                    percentage = segments[i].percentage,
                    nextSegment = segments[i+1],
                    nextPercentage = (nextSegment ? nextSegment.percentage : percentage),
                    height = totalHeight * percentage,
                    offset = (width - lastUpperSide* (nextPercentage / percentage))/2;
                    offset = limitValue(offset, 0, width);

                    points.push(new Point2D(box.x1 + previousOffset, box.y1 + previousHeight));
                    points.push(new Point2D(box.x1+width - previousOffset, box.y1 + previousHeight));
                    points.push(new Point2D(box.x1+width - offset, box.y1 + height + previousHeight));
                    points.push(new Point2D(box.x1+ offset,box.y1 + height + previousHeight));
                    previousOffset = offset;
                    previousHeight += height + segmentSpacing;
                    lastUpperSide *= nextPercentage/percentage;
                    lastUpperSide = limitValue(lastUpperSide, 0, width);
                }
            }
            else {
                var offset = 0,
                //TODO support pixels and string as neckSize
                narrowSize = (width - neckSize) / (count * 2) ,
                segmentHeight = (box.height()-(segmentSpacing *(count-1))) / count,
                narrowOffset = 0;

                for (i = 0; i < count; i++) {
                    points = segments[i].points = [];
                    points.push(new Point2D(box.x1 + narrowOffset, box.y1 + offset));
                    points.push(new Point2D(box.x1+width - narrowOffset, box.y1 + offset));
                    points.push(new Point2D(box.x1+width - narrowOffset - narrowSize, box.y1 + offset + segmentHeight));
                    points.push(new Point2D(box.x1+ narrowOffset + narrowSize,box.y1 + offset + segmentHeight));

                    narrowOffset += narrowSize;
                    offset += segmentHeight + segmentSpacing;
                }
            }

            for (i = 0; i < count; i++) {
                segments[i].reflow(chartBox);
           }
        }
    });

    var FunnelSegment = ChartElement.extend({
        init: function(value, options) {
            var segment = this;

            ChartElement.fn.init.call(segment, options);

            segment.value = value;
            segment.options.id = uniqueId();
            segment.enableDiscovery();
        },

        options: {
            color: WHITE,
            border: {
                width: 1
            }
        },

        reflow: function(chartBox) {
            var segment = this,
                points = segment.points,
                label = segment.children[0];

            segment.box = new Box2D(points[0].x, points[0].y, points[1].x, points[2].y);

            if (label) {
                label.reflow(new Box2D(chartBox.x1, points[0].y, chartBox.x2, points[2].y));
            }
        },

        getViewElements: function(view) {
            var segment = this,
                options = segment.options,
                elements = [];

            elements.push(
                view.createPolyline(segment.points, true, {
                    id: options.id,
                    fill: options.color,
                    data: { modelId: options.modelId }
                })
            );

            append(elements, ChartElement.fn.getViewElements.call(segment, view));

            return elements;
        },

        tooltipAnchor: function(tooltipWidth, tooltipHeight) {
            var box = this.box;

            return new Point2D(
                box.center().x - (tooltipWidth / 2),
                box.y1
            );
        }
    });
    deepExtend(FunnelSegment.fn, dataviz.PointEventsMixin);

    // Exports ================================================================
    PlotAreaFactory.current.register(FunnelPlotArea, [FUNNEL]);

    SeriesBinder.current.register(
        [FUNNEL],
        [VALUE], [CATEGORY, COLOR, "visibleInLegend", "visible"]
    );

    deepExtend(dataviz, {
        FunnelChart: FunnelChart
    });

})(window.kendo.jQuery);
