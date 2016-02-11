---
title: Line Charts
page_title: Line Charts | Kendo UI Charts
description: "Learn how to create a Kendo UI Line Chart and configure its options."
slug: linetypeoscharts_widget
---

# Line Charts

The [Kendo UI Line Chart widget](http://demos.telerik.com/kendo-ui/line-charts/index) displays data as continuous lines that pass through points defined by the values of their items. It is  useful for rendering a trend over time and comparing several sets of similar data.

## Configuration

Use the `line` series type to create a Kendo UI Line Chart.

### Orientation

The Line Chart orientation can be changed by using `verticalLine`.

###### Example

    $("#chart").kendoChart({
        title: {
            text: "Internet Users"
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            type: "line"
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


**Figure 1. A sample Line Chart**

![Line Chart](/controls/charts/chart-types/chart-line.png)

### Types of Lines

The default line type is solid. However, dash styles are also available through the `dashType` option, as demonstrated in the example below.

###### Example

  series: [{
      name: "World",
      data: [15.7, 16.7, 20, 23.5, 26.6],
      dashType: "dot"
  }]

**Figure 2. Dash line types**

![Dash Type](/controls/charts/chart-types/chart-dash-types.png)

### Line Styles

Kendo UI Line Charts support the rendering of lines between the points with different styles. The supported styles can be set via the [`style`](/api/dataviz/chart#configuration-series.style) option and are:

* Normal&mdash;This is the default style. It produces a straight line between data points.
* Step&mdash;The style renders the connection between data points through vertical and horizontal lines. It is suitable for indicating that the value is constant between the changes.
* Smooth&mdash;This style causes the Area Chart to display a fitted curve through data points. It is suitable when the data requires to be displayed with a curve, or when you wish to connect the points with smooth instead of straight lines.

**Figure 3. A step Line Chart**

![Step Line Chart](/controls/charts/chart-types/chart-step-line.png)

**Figure 4. A smooth Line Chart**

![Smooth Line Chart](/controls/charts/chart-types/chart-smooth-line.png)

## See Also

Other articles on Kendo UI Charts and chart types:

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Series Charts]({% slug seriestypeofcharts_widget %})
* [Area Charts]({% slug areacharts_widget %})
* [Bar Charts]({% slug bartypeofcharts_widget %})
* [Bubble Charts]({% slug bubblecharts_widget %})
* [Line Charts]({% slug linetypeoscharts_widget %})
* [Pie Charts]({% slug pietypecharts_widget %})
* [Scatter Charts]({% slug scattercharts_widget %})
* [Sparklines]({% slug overview_kendoui_sparklinescharts %})
* [Stock Charts]({% slug overview_kendoui_stockcharts %})
* [TreeMap]({% slug overview_treemap_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
