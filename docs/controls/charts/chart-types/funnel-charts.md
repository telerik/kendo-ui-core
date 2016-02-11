---
title: Funnel Charts
page_title: Funnel Charts | Kendo UI Charts
description: "Learn how to create a Kendo UI Funnel Chart and use the different options it provides."
slug: funnelcharts_widget
---

# Funnel Charts

The [Kendo UI Funnel Chart widget](http://demos.telerik.com/kendo-ui/funnel-charts/index) displays a single series of data in progressively decreasing or increasing proportions, organized in segments, where each segment represents the value for the particular item from the series. The values of the items can also influence the height and the shape of the corresponding segments.

## Basic Usage

### Suitability

Kendo UI Funnel Charts are often used to represent stages in a sales process and to show the amount of potential revenue from each stage. They are also useful when identifying potential problem areas in the sales processes of an organization. The Funnel Charts are similar to the [Kendo UI Stacked Bar Charts](http://demos.telerik.com/kendo-ui/bar-charts/stacked-bar) and are well suited for displaying several values.

### Concepts

The basic conceptual options of a Kendo UI Funnel Chart are:

* `dynamicHeight`&mdah;It specifies whether the different elements should have equal height, when equal to `false`, or the height of each element should be based on its value.
* `dynamicSlope`&mdash;When disabled, the `neckRatio` option is taken into account. When enabled, the `neckRatio` is neglected and each segment creates its form based on the ratio between the current value and the next value.
* `neckRatio`&mdash;It specifies the ratio between the top and the bottom bases of the whole funnel series. For example, if set to `ten`, the top base will be ten times smaller than the bottom base, as demonstrated below.

**Figure 1. A Funnel Chart with its `neckRatio` set to 10**

![Funnel Chart](/controls/charts/chart-types/funnel-neckratio.png)

## Getting Started

### Create the Funnel Chart

The example below demonstrates the way the widths of the bases for each segment are based on the `currentValue/nextValue` ratio.

###### Example

    <div id="chart"></div>
    <script>
        var data = [{
            value: 20
            },{
            value: 40
            },{
            value: 80
            },{
            value: 40
            },{
            value: 10
        }];
        $("#chart").kendoChart({
            series:[{
                type: "funnel",
                dynamicSlope: true,
                data : data,
                dynamicHeight : false,
                labels: {
                    visible: true
                }
            }]
        });
    </script>

**Figure 2. A sample Funnel Chart**

![Funnel Chart](/controls/charts/chart-types/funnel-dynamicslope.png)

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
