---
title: Trendlines
description: "Explore data trends by using trendlines in the Kendo UI for jQuery Chart."
slug: trendlines_chart_charts
---

# Trendlines
Trendlines (or trend lines) are automatically generated indicators that show the overall trends in the series data. They are defined as a special type of series that are linked to the main series by name.

## Trendline Types

The Chart supports the following types of trendlines - Linear Trendline and Moving Average Trendline.

### Linear Trendline

A linear trendline is usually used to show if a particular quantity is increasing or decreasing in time.

The following example demonstrates how to create a linear trendline for Categorical series.

```dojo
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            series: [
                {
                    name: "World",
                    data: [15.7, 16.7, 20, 23.5, 26.6]
                },
                {
                    name: 'Sales Forecast (LINEAR)',
                    type: 'linearTrendline', // linearTrendline, movingAverageTrendline
                    for: 'World',
                    color:"lime"
                }
            ],
            tooltip: {
                visible: true,
                shared: true
            },            
            categoryAxis: {
                categories: [2005, 2006, 2007, 2008, 2009]
            }
        });
    </script>
```

### Moving Average Trendline

The moving average trendline is used to smooth out the variations in the data by averaging all points in a period. By default, the period is set to `2` chart intervals.

The following example demonstrates how to create a moving average trendline for Categorical series.

```dojo
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            series: [
                {
                    name: "World",
                    data: [15.7, 16.7, 20, 23.5, 26.6]
                },
                {
                    name: 'Sales Forecast (Moving AVG.)',
                    type: 'movingAverageTrendline', // linearTrendline, movingAverageTrendline
                    for: 'World',
                    color:"lime"
                }
            ],
            tooltip: {
                visible: true,
                shared: true
            },            
            categoryAxis: {
                categories: [2005, 2006, 2007, 2008, 2009]
            }     
        });
    </script>
```

## Data Binding

Trendline series use the data from the main series and do not support binding to a different data set.

### Date Series and Aggregates

If the main series is using `aggregates`, as is most common for [Date Series]({% slug dateseries_charts_widget %}), the trendlines will bind to the aggregated data. For example, if you're using a `"sum"` aggregate, the trendline will plot the trend for the sums in each category.

## Supported Series Types

Trendlines are supported for the following [chart types]({% slug overview_charttypes_charts %}):
 * `"area"`
 * `"bar"`
 * `"boxPlot"`
 * `"bubble"`
 * `"bullet"`
 * `"candlestick"`
 * `"column"`
 * `"horizontalWaterfall"`
 * `"line"`
 * `"ohlc"`
 * `"pie"`
 * `"polarArea"`
 * `"polarLine"`
 * `"polarScatter"`
 * `"radarArea"`
 * `"radarColumn"`
 * `"radarLine"`
 * `"rangeArea"`
 * `"rangeBar"`
 * `"rangeColumn"`
 * `"scatter"`
 * `"scatterLine"`
 * `"verticalArea"`
 * `"verticalBoxPlot"`
 * `"verticalBullet"`
 * `"verticalLine"`
 * `"verticalRangeArea"`
 * `"waterfall"`

## See Also

* [Getting Started with the Kendo UI for jQuery Chart]({% slug getting_started_kendoui_chart_widget %})
* [API Reference of the Chart](/api/javascript/dataviz/ui/chart)
* [Knowledge Base](/knowledge-base)
