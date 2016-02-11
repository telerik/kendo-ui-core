---
title: Pie Charts
page_title: Pie Charts | Kendo UI Charts
description: "Learn how to create a Kendo UI Pie Chart and specify its point value, category label, and other properties."
slug: pietypecharts_widget
---

# Pie Charts

The [Kendo UI Pie Chart widget](http://demos.telerik.com/kendo-ui/pie-charts/index) displays data as single-series sectors from a two-dimensional circle. It is useful for rendering data as a part of the whole.

The [Kendo UI Donut Chart widget](http://demos.telerik.com/kendo-ui/donut-charts/index) is a Kendo UI Pie Chart variation with the same ability to display a single data series in a two-dimensional circle and is likewise useful for displaying data as a part of the whole.

## Getting Started

### Create the Pie Chart

To create a Kendo UI Pie Chart, define a single series of type `"pie"`. Additional series are not supported and each data point is an object that specifies the point value, category label, and other properties, as demonstrated in the example below.

###### Example

    $("#chart").kendoChart({
        title: {
            text: "Break-up of Spain Electricity Production for 2008"
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            labels: {
                visible: true,
                format: "{0}%"
            }
        },
        series: [{
            type: "pie",
            data: [ {
                category: "Hydro",
                value: 22
            }, {
                category: "Solar",
                value: 2
            }, {
                category: "Nuclear",
                value: 49
            }, {
                category: "Wind",
                value: 27
            } ]
        }]
    });


**Figure 1. A sample Pie Chart**

![Pie Chart](/controls/charts/chart-types/chart-pie.png)

## Configuration

### Effects Overlay

Each segment has a transparent effect overlay that adds depth to the two-dimensional shape. The overlay transparent gradient is configurable, as demonstrated below.

###### Example

    $("#chart").kendoChart({
        series: [{
            type: "pie",
            overlay: {
                gradient: "none"
            }
        }]
    });


The following gradient options are available:

* `roundedBevel`&mdash;This is the default gradient option.
* `sharpBevel`
* none

The figure below demonstrate the usage of each of these options.

**Figure 2. A Pie Chart with the `roundedBevel` overlay applied**

![Pie Chart with roundedBevel overlay](/controls/charts/chart-types/chart-pie-overlay-roundbevel.png)

**Figure 3. A Pie Chart with the `sharpBevel` overlay applied**

![Pie Chart with sharpBevel overlay](/controls/charts/chart-types/chart-pie-overlay-sharpbevel.png)

**Figure 4. A Pie Chart with no overlay**

![Pie Chart with no overlay](/controls/charts/chart-types/chart-pie-overlay-none.png)

## See Also

Other articles on Kendo UI Charts and chart types:

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Series Charts]({% slug seriestypeofcharts_widget %})
* [Area Charts]({% slug areacharts_widget %})
* [Bar Charts]({% slug bartypeofcharts_widget %})
* [Bubble Charts]({% slug bubblecharts_widget %})
* [Funnel Charts]({% slug funnelcharts_widget %})
* [Line Charts]({% slug linetypeoscharts_widget %})
* [Scatter Charts]({% slug scattercharts_widget %})
* [Sparklines]({% slug overview_kendoui_sparklinescharts %})
* [Stock Charts]({% slug overview_kendoui_stockcharts %})
* [TreeMap]({% slug overview_treemap_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
