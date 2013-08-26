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

        dataviz = kendo.dataviz,
        ChartElement = dataviz.ChartElement,
        PlotAreaBase = dataviz.PlotAreaBase,
        PlotAreaFactory = dataviz.PlotAreaFactory,
        Point2D = dataviz.Point2D,
        SeriesBinder = dataviz.SeriesBinder,
        Text = dataviz.Text,
        TextBox = dataviz.TextBox,
        append = dataviz.append,
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
                    legend: plotArea.options.legend
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
            chart.legendItems = [];
            chart.render();
        },

        options: {
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

                chart.createSegment(value, deepExtend({
                    index: i,
                    owner: chart,
                    series: series,
                    dataItem: data[i],
                    percentage: value / total,
                    visibleInLegend: fields.visibleInLegend,
                    visible: fields.visible
                }, fields));
            }
        },

        createSegment: function(value, fields) {
            var chart = this,
                segment,
                options;

            //chart.createLegendItem(value, fields);

            if (fields.visible !== false) {
                var segmentOptions = deepExtend({}, fields.series);

                //chart.evalSegmentOptions(segmentOptions, value, fields);

                segment = new FunnelSegment(value, segmentOptions);
                extend(segment, fields);

                chart.append(segment);
                chart.segments.push(segment);
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

        reflow: function(box) {
            var chart = this,
                segments = chart.segments,
                i;

            for (i = 0; i < segments.length; i++) {
                segments[i].points = box.points();
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

        reflow: function(targetBox) {
            var segment = this,
                options = segment.options;

            segment.box = targetBox;
        },

        getViewElements: function(view) {
            var segment = this,
                options = segment.options,
                elements = [];

            elements.push(
                view.createPolyline(segment.points, true, {
                    fill: options.color
                })
            );

            return elements;
        }
    });

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
