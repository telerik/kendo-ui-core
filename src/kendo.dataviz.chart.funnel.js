(function(f, define){
    define([ "./kendo.dataviz.chart", "./kendo.drawing" ], f);
})(function(){

var __meta__ = {
    id: "dataviz.chart.funnel",
    name: "Funnel Chart",
    category: "dataviz",
    depends: [ "dataviz.chart" ],
    hidden: true
};

(function ($, undefined) {

    // Imports ================================================================
    var kendo = window.kendo,
        deepExtend = kendo.deepExtend,
        extend = $.extend,
        isFn = kendo.isFunction,
        template = kendo.template,

        util = kendo.util,
        append = util.append,

        draw = kendo.drawing,
        geom = kendo.geometry,
        dataviz = kendo.dataviz,
        Color = kendo.drawing.Color,
        ChartElement = dataviz.ChartElement,
        PieChartMixin = dataviz.PieChartMixin,
        PlotAreaBase = dataviz.PlotAreaBase,
        PlotAreaFactory = dataviz.PlotAreaFactory,
        Point2D = dataviz.Point2D,
        Box2D = dataviz.Box2D,
        SeriesBinder = dataviz.SeriesBinder,
        TextBox = dataviz.TextBox,
        autoFormat = dataviz.autoFormat,
        evalOptions = dataviz.evalOptions,
        limitValue = util.limitValue,
        seriesTotal = dataviz.seriesTotal;

    // Constants ==============================================================
    var CATEGORY = "category",
        COLOR = "color",
        FUNNEL = "funnel",
        VALUE = "value",
        BLACK = "black",
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
                    legend: plotArea.options.legend,
                    neckRatio: firstSeries.neckRatio,
                    dynamicHeight: firstSeries.dynamicHeight,
                    dynamicSlope:firstSeries.dynamicSlope,
                    segmentSpacing:firstSeries.segmentSpacing,
                    highlight:firstSeries.highlight
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
            chart.points = [];
            chart.labels = [];
            chart.legendItems = [];
            chart.render();
        },

        options: {
            neckRatio: 0.3,
            width: 300,
            dynamicSlope:false,
            dynamicHeight:true,
            segmentSpacing:0,
            labels: {
                visible: false,
                align: "center",
                position: "center"
            }
        },

        formatPointValue:function(point,format){
            return autoFormat(format,point.value);
        },

        render: function() {
            var chart = this,
                options = chart.options,
                colors = chart.plotArea.options.seriesColors || [],
                colorsCount = colors.length,
                series = options.series[0],
                pointData, fields,
                data = series.data;

            if(!data){
                return;
            }

            var total = seriesTotal(series),
                value,
                i;

            for (i = 0; i < data.length; i++) {
                pointData = SeriesBinder.current.bindPoint(series, i);
                value = pointData.valueFields.value;

                if (value === null || value === undefined) {
                   continue;
                }

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
                    percentage: Math.abs(value) / total,
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
                segment;

            var seriesOptions = deepExtend({}, fields.series);
            chart.evalSegmentOptions(seriesOptions,  value, fields);

            chart.createLegendItem(value, seriesOptions, fields);

            if (fields.visible !== false) {

                segment = new FunnelSegment(value, seriesOptions, fields);
                extend(segment, fields);

                chart.append(segment);
                chart.points.push(segment);

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

            if (labels.visible) {
                if (labels.template) {
                    var labelTemplate = template(labels.template);
                    text = labelTemplate({
                        dataItem: dataItem,
                        value: value,
                        percentage : fields.percentage,
                        category: fields.category,
                        series: series
                    });
                } else if (labels.format) {
                    text = autoFormat(labels.format, text);
                }

                if (!labels.color&&labels.align==="center") {
                    var brightnessValue = new Color(series.color).percBrightness();
                    if (brightnessValue > 180) {
                        labels.color = BLACK;
                    } else {
                        labels.color = WHITE;
                    }
                }

                chart.evalSegmentOptions(labels, value, fields);

                textBox = new TextBox(text, deepExtend({
                        vAlign: labels.position
                    }, labels)
                );

                chart.labels.push(textBox);

                return textBox;
            }
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
                segments = chart.points,
                count = segments.length,
                decreasingWidth = options.neckRatio<=1,
                i,
                height,
                lastUpperSide,
                points,
                percentage,
                offset,
                box = chartBox.clone().unpad(chart.labelPadding()),
                width = box.width(),
                previousHeight = 0,
                previousOffset = decreasingWidth ? 0 :(width-width/options.neckRatio)/2,
                segmentSpacing = options.segmentSpacing,
                dynamicSlope = options.dynamicSlope,
                totalHeight = box.height() - segmentSpacing * (count-1),
                neckRatio = decreasingWidth ? options.neckRatio*width : width;

            if(!count){
                return;
            }

            if(dynamicSlope){
                var firstSegment = segments[0],
                    maxSegment = firstSegment;

                $.each(segments,function(idx,val){
                   if(val.percentage>maxSegment.percentage){
                       maxSegment = val;
                   }
                });

                lastUpperSide = (firstSegment.percentage/maxSegment.percentage)*width;
                previousOffset = (width - lastUpperSide) / 2;

                for (i = 0; i < count; i++) {
                    percentage = segments[i].percentage;

                    var nextSegment = segments[i+1],
                        nextPercentage = (nextSegment ? nextSegment.percentage : percentage);

                    points = segments[i].points = [];
                    height = (options.dynamicHeight)? (totalHeight * percentage): (totalHeight / count);
                    offset = (width - lastUpperSide* (nextPercentage / percentage))/2;
                    offset = limitValue(offset, 0, width);

                    points.push(new geom.Point(box.x1 + previousOffset, box.y1 + previousHeight));
                    points.push(new geom.Point(box.x1+width - previousOffset, box.y1 + previousHeight));
                    points.push(new geom.Point(box.x1+width - offset, box.y1 + height + previousHeight));
                    points.push(new geom.Point(box.x1+ offset,box.y1 + height + previousHeight));

                    previousOffset = offset;
                    previousHeight += height + segmentSpacing;
                    lastUpperSide *= nextPercentage/percentage;
                    lastUpperSide = limitValue(lastUpperSide, 0, width);
                }
            }
            else {
                var topMostWidth = decreasingWidth ? width : width - previousOffset*2,
                    finalNarrow = (topMostWidth - neckRatio)/2;

                for (i = 0; i < count; i++) {
                    points = segments[i].points = [];
                    percentage = segments[i].percentage;
                    offset = (options.dynamicHeight)? (finalNarrow * percentage): (finalNarrow / count);
                    height = (options.dynamicHeight)? (totalHeight * percentage): (totalHeight / count);

                    points.push(new geom.Point(box.x1+previousOffset, box.y1 + previousHeight));
                    points.push(new geom.Point(box.x1+width - previousOffset, box.y1 + previousHeight));
                    points.push(new geom.Point(box.x1+width - previousOffset - offset, box.y1 + height + previousHeight));
                    points.push(new geom.Point(box.x1+previousOffset + offset,box.y1 + height + previousHeight));
                    previousOffset += offset;
                    previousHeight += height + segmentSpacing;
                }
            }

            for (i = 0; i < count; i++) {
                segments[i].reflow(chartBox);
            }
        }
    });

    deepExtend(FunnelChart.fn, PieChartMixin);

    var FunnelSegment = ChartElement.extend({
        init: function(value, options, segmentOptions) {
            var segment = this;

            ChartElement.fn.init.call(segment, options);

            segment.value = value;
            segment.options.index = segmentOptions.index;
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

        createVisual: function() {
            ChartElement.fn.createVisual.call(this);

            var options = this.options;
            var border = options.border;
            var path = draw.Path.fromPoints(this.points, {
                fill: {
                    color: options.color,
                    opacity: options.opacity
                },
                stroke: {
                    color: border.color,
                    opacity: border.opacity,
                    width: border.width
                }
            }).close();

            this.visual.append(path);
        },

        createHighlight: function(style) {
            return draw.Path.fromPoints(this.points, style);
        },

        highlightOverlay: function(view, opt) {
            var options = this.options,
                hlOptions = options.highlight || {};
            if(hlOptions.visible===false){
                return;
            }
            var border = hlOptions.border || {};
            var calcOptions = extend({},opt,{
                fill:hlOptions.color,
                stroke: border.color,
                strokeOpacity: border.opacity,
                strokeWidth: border.width,
                fillOpacity:hlOptions.opacity
            });
            var element = view.createPolyline(this.points,true,calcOptions);
            return element;
        },

        tooltipAnchor: function(tooltipWidth) {
            var box = this.box;
            return new Point2D(
                box.center().x - (tooltipWidth / 2),
                box.y1
            );
        },
        formatValue: function(format){
            var point = this;
            return point.owner.formatPointValue(point,format);
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

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
