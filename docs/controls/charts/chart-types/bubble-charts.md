---
title: Bubble Charts
page_title: Bubble Charts | Kendo UI Charts
description: "Learn how to create a Kendo UI Bubble Chart to visualize data points and how to set its properties."
slug: bubblecharts_widget
---

# Bubble Charts

The [Kendo UI Bubble Chart widget](http://demos.telerik.com/kendo-ui/bubble-charts/index) displays data as points with coordinates and sizes defined by the value of their items. It is similar to the [Kendo UI Scatter Charts](http://demos.telerik.com/kendo-ui/scatter-charts/index), in which the data points are replaced with bubbles. This allows a Bubble Chart to display three-dimensional data&mdash;two values for the items' coordinates and one for their size. A Bubble Chart is useful for visualizing different scientific relationships, e.g. economic or social. The X-axis of the Bubble Charts is numerical and does not require items.

## Basic Usage

### Suitability

Kendo UI Bubble Charts are well suited for displaying dozens to hundreds of values. They come in handy especially when you wish to visualize size values, differing by several orders of magnitude. As the size value is represented by a circle area, it is a best practice to plot positive values.

### Negative Values

By default, negative values are not displayed. Yet, if you wish to show these, their area is going to be calculated as if their value was positive. The point label displays their actual value and they are also going to have a different color. This behavior is controlled by using the `negativeValues.visible` and `negativeValues.color` options that are applicable to each series.

## Getting Sarted

### Create the Bubble Chart

The example below visualizes several data points.

###### Example

    var salesData = [{
        numberOfSales: 10,
        volume: 12000,
        marketShare: 0.1
    }, {
        numberOfSales: 24,
        volume: 62000,
        marketShare: 0.25
    }];

    $("#chart").kendoChart({
        dataSource: {
            data: salesData
        },
        series: [{
            name: "Sales",
            type: "bubble",
            xField: "numberOfSales",
            yField: "volume",
            sizeField: "marketShare"
        }]
    });

**Figure 1. A sample Bubble Chart**

 ![Bubble Chart](/controls/charts/chart-types/chart-bubble.png)

## See Also

 Other articles on Kendo UI Charts and chart types:

 * [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
 * [Data Series Charts]({% slug seriestypeofcharts_widget %})
 * [Area Charts]({% slug areacharts_widget %})
 * [Bar Charts]({% slug bartypeofcharts_widget %})
 * [Funnel Charts]({% slug funnelcharts_widget %})
 * [Line Charts]({% slug linetypeoscharts_widget %})
 * [Pie Charts]({% slug pietypecharts_widget %})
 * [Scatter Charts]({% slug scattercharts_widget %})
 * [Sparklines]({% slug overview_kendoui_sparklinescharts %})
 * [Stock Charts]({% slug overview_kendoui_stockcharts %})
 * [TreeMap]({% slug overview_treemap_widget %})
 * [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
