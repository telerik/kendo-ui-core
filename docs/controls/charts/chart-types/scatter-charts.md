---
title: Scatter Charts
page_title: Scatter Charts | Kendo UI Charts
description: "Learn how to create a Kendo UI Scatter Chart and use the different options it provides."
slug: scattercharts_widget
---

# Scatter Charts

The [Kendo UI Scatter Chart widget](http://demos.telerik.com/kendo-ui/scatter-charts/index) shows data as points defined by the values of their items. Scatter Charts are useful for displaying the relation between different sets of data, such as scientific experimental results, and plotting two-dimensional data.

## Getting Started

### Create the Scatter Chart

Each data point is an array that contains two values&mdash;`X` and `Y`.

The example below demonstrates how to create a Scatter Line Chart.

###### Example

    $("#chart").kendoChart({
        title: {
            text: "Charge current vs. charge time"
        },
        legend: {
            visible: true
        },
        seriesDefaults: {
            type: "scatterLine"
        },
        series: [{
            name: "0.8C",
            data: [[10, 10], [15, 20], [20, 25], [32, 40], [43, 50], [55, 60], [60, 70], [70, 80], [90, 100]]
        }, {
            name: "1.6C",
            data: [[10, 40], [17, 50], [18, 70], [35, 90], [47, 95], [60, 100]]
        }, {
            name: "3.1C",
            data: [[10, 70], [13, 90], [25, 100]]
        }],
        xAxis: {
            max: 90,
            labels: {
                format: "{0}m"
            },
            title: {
                text: "Time"
            }
        },
        yAxis: {
            max: 100,
            labels: {
                format: "{0}%"
            },
            title: {
                text: "Charge"
            }
        }
    });


**Figure 1. A sample Scatter Line Chart.**

 ![Scatter Line Chart](/controls/charts/chart-types/chart-scatter-line.png)

## Configuration

### Types of Lines

The default line type is solid. However, dash styles are also available through the `dashType` option, as demonstrated in the example below.

###### Example

  series: [{
      type: "scatterLine",
      name: "3.1C",
      data: [[10, 70], [13, 90], [25, 100]],
      dashType: "dot"
  }]

**Figure 2. Dash line types**

![Dash Type](/controls/charts/chart-types/chart-dash-types.png)

### Removal of Connecting Lines

To remove the connecting lines, specify `"scatter"` instead of `"scatterLine"`, which results in the Scatter Chart below.

**Figure 3. A Scatter Chart with removed connecting lines**

![Scatter Chart](/controls/charts/chart-types/chart-scatter.png)

## See Also

Other articles on Kendo UI Charts and chart types:

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Series Charts]({% slug seriestypeofcharts_widget %})
* [Area Charts]({% slug areacharts_widget %})
* [Bar Charts]({% slug bartypeofcharts_widget %})
* [Bubble Charts]({% slug bubblecharts_widget %})
* [Funnel Charts]({% slug funnelcharts_widget %})
* [Line Charts]({% slug linetypeoscharts_widget %})
* [Pie Charts]({% slug pietypecharts_widget %})
* [Sparklines]({% slug overview_kendoui_sparklinescharts %})
* [Stock Charts]({% slug overview_kendoui_stockcharts %})
* [TreeMap]({% slug overview_treemap_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
