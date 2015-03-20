---
title: Funnel Charts
page_title: jQuery Funnel Chart UI in Kendo UI DataViz
description: Overview of Kendo jQuery Funnel Chart with Funnel Series. How to create it and use the different options it provides.
---

## Funnel Chart

The Funnel Chart represents its data in trapezoid area splitted into several segments.

Each segment represents the different values for each of the items of the series. The value of the dataItem can control both the height and/or the form of the different segments.

### When to use a Funnel Chart
Funnel charts are a type of chart, often used to represent stages in a sales process and show the amount of potential revenue for each stage. This type of chart can also be useful in identifying potential problem areas in an organization’s sales processes. A funnel chart is similar to a stacked percent bar chart. The Funnel charts are well suited for displaying several values.

### Understanding dynamicHeight, dynamicSlope and neckRatio

Dynamic Height specifies whether the different elements should have equal height (when dynamicHeight is equal to false) or the height of each element should be based on its value.

If dynamicSlope is disabled then the neckRatio option is taken into account which specifies the ratio between the top and the bottom bases of the whole funnel series.
For example if neckRatio is set to ten then the top base will be ten times smaller than the bottom base.
The following example shows a funnel chart with neckRatio set to 10.

![Funnel Chart](/dataviz/chart/chart-types/funnel-neckratio.png)

When dynamicSlope is enabled then the neckRatio is neglected and each segment creates its form based on the ratio between the current value and the next value.

You can see how the widths of the bases for each segment are based on the ratio currentValue/nextValue in the next example.

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

![Funnel Chart](/dataviz/chart/chart-types/funnel-dynamicslope.png)
