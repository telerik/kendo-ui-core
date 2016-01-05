---
title: Area Charts
page_title: Area Charts | Kendo UI Charts
description: "Learn how to define Kendo UI Area Charts."
slug: areacharts_widget
---

# Area Charts

The [Kendo UI Area Chart widget](http://demos.telerik.com/kendo-ui/area-charts/index) is suitable for displaying quantitative data by using continuous lines passing through points defined by the values of their items. The portion of the graph beneath the lines is filled with a particular color for each series. The different colors in an Area Chart are useful for emphasizing changes in values coming from several sets of similar data.

## Configuration

Use `area` and `verticalArea` to define the Kendo UI Area Charts.

### Axes

Axes are configured through `categoryAxis` and `valueAxis`. Multiple value axes are supported.

###### Example

    $("#chart").kendoChart({
        title: {
            text: "Internet Users"
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            type: "area"
        },
        series: [{
            name: "World",
            data: [15.7, 16.7, 20, 23.5, 26.6]
        }, {
            name: "United States",
            data: [67.96, 68.93, 75, 74, 78]
        }],
        valueAxis: {
            labels: {
                format: "{0}%"
            }
        },
        categoryAxis: {
            categories: [2005, 2006, 2007, 2008, 2009]
        }
    });


This configuration results in the Area Chart below.

**Figure 1. A sample Area Chart**

![Area Chart](/controls/charts/chart-types/chart-area.png)

### Line Styles

Kendo UI Area Charts support the rendering of lines between the points with different styles. The supported styles can be set via the [`line.style`](/api/dataviz/chart#configuration-series.line.style) option and are:

* Normal&mdash;This is the default style. It produces a straight line between data points.
* Step&mdash;The style renders the connection between data points through vertical and horizontal lines. It is suitable for indicating that the value is constant between the changes.
* Smooth&mdash;This style causes the Area Chart to display a fitted curve through data points. It is suitable when the data requires to be displayed with a curve, or when you wish to connect the points with smooth instead of straight lines.

**Figure 2. A step-line Area Chart**

![Step Line Chart](/controls/charts/chart-types/chart-step-area.png)

**Figure 3. A smooth-line Area Chart**

![Smooth Line Chart](/controls/charts/chart-types/chart-smooth-area.png)

## See Also

Other articles on Kendo UI Charts and chart types:

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Series Charts]({% slug seriestypeofcharts_widget %})
* [Bar Charts]({% slug bartypeofcharts_widget %})
* [Bubble Charts]({% slug bubblecharts_widget %})
* [Funnel Charts]({% slug funnelcharts_widget %})
* [Line Charts]({% slug linetypeoscharts_widget %})
* [Pie Charts]({% slug pietypecharts_widget %})
* [Scatter Charts]({% slug scattercharts_widget %})
* [Sparklines]({% slug overview_kendoui_sparklinescharts %})
* [Stock Charts]({% slug overview_kendoui_stockcharts %})
* [TreeMap]({% slug overview_treemap_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
