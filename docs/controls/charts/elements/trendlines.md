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

A linear trendline is typically used to show if a particular value is increasing or decreasing in time.

Linear trendlines are best suited for data sets that have a steady rate of change. They can be used with both positive and negative values.

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
                    type: 'linearTrendline',
                    for: 'World',
                    color: 'lime',
                    forecast: {
                        after: 3
                    }
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

### Exponential Trendline

Exponential trendlines are most suitable for data sets with accelerating rate of growth or decline. They can be used only for positive values.

The following example demonstrates how to create a exponential trendline for Categorical series.

```dojo
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            series: [
                {
                    name: "Growth",
                    data: [15.7, 32.7, 40, 84.5, 126.6]
                },
                {
                    name: 'Sales Forecast (EXP)',
                    type: 'exponentialTrendline',
                    for: 'Growth',
                    color: 'lime'
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

### Logarithmic Trendline

Logarithmic trendlines are best suited for data sets that grow quickly at the beginning and then taper off. They can only be use with both positive and negative values.

The following example demonstrates how to create a logarithmic trendline for Categorical series.

```dojo
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            series: [
                {
                    name: "Growth",
                    data: [-5.07, 12.7, 22, 24.5, 26.6]
                },
                {
                    name: 'Trend (LOG)',
                    type: 'logarithmicTrendline',
                    for: 'Growth',
                    color: 'lime'
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

### Power Trendline

Power trendlines are suitable for data that has a steady increase or decrease in the rate of growth or decline. They can be used only with positive values.

The following example demonstrates how to create a power trendline for Categorical series.

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
                    name: 'Sales Forecast (POWER)',
                    type: 'powerTrendline',
                    for: 'World',
                    color: 'lime'
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

### Polynomial Trendline

Polynomial trendlines are best suited for data series that alternates between growth and decline.

This type of trendlines accepts an [series.trendline.order](/api/javascript/dataviz/ui/chart#configuration-series.trendline.order) parameter that specifies the degree of the polynomial.
The default order is 2. Accepted values are from 2 to 6:
* 2: a Quadratic polynomial with a single extreme point (minimum or maximum) point.
* 3: a Cubic polynomial with up to 2 extreme points.
* 4: a polynomial of 4th degree with up to 3 extreme points.
* 5: a polynomial of 5th degree with up to 4 extreme points.
* 6: a polynomial of 6th degree with up to 5 extreme points.

The following example demonstrates how to create a polynomial trendline for Categorical series.

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
                    name: "Trend (POLY)",
                    type: "polynomialTrendline",
                    for: "World",
                    color: "lime",
                    trendline: {
                        order: 3
                    }
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
                    name: "Moving Average",
                    type: "movingAverageTrendline",
                    for: "World",
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

## Forecasts

To create a forecast, extend the trendline by specifying the number of intervals using the [series.trendline.after](/api/javascript/dataviz/ui/chart#configuration-series.trendline.after) setting. It's also possible to extend the forecast in reverse direction using the [series.trendline.before](/api/javascript/dataviz/ui/chart#configuration-series.trendline.before) setting. By default, the trendline does not display a forecast.

> The `forecast` option is supported for **linear**, **exponential**, **logarithmic** and **power** trendlines. The parent series must be either a [Date Series]({% slug dateseries_charts_widget %}), "scatter" or "scatterLine".

#### Example - set the trendline forecast

	  <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [
          {
              period: "2021 Q1",
              date: new Date(2021, 0, 1),
              count: 669590.0
          },
          {
              period: "2021 Q2",
              date: new Date(2021, 3, 1),
              count: 793564.0
          },
          {
              period: "2021 Q3",
              date: new Date(2021, 6, 1),
              count: 941133.0
          },
          {
              period: "2021 Q4",
              date: new Date(2021, 9, 1),
              count: 1133020.0
          }
        ]
      },
      series: [{
        name: "Sales By Quarter",
        type: "line",
        field: "count",
        categoryField: "date"
      }, {
        name: "Sales Trend",
        type: "linearTrendline",
        for: "Sales By Quarter",
        trendline: {
          forecast: {
            before: 3,
            after: 5
          }
        }
      }]
    });
    </script>

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
