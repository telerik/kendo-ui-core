---
title: Create Fixed-Size Pie or Donut Charts
page_title: Create Fixed-Size Pie or Donut Charts
description: "Learn how to create fixed-size Pie or Donut Kendo UI Charts."
previous_url: /controls/charts/how-to/fixed-size-pie-or-donut, /controls/charts/how-to/appearance/fixed-size-pie-or-donut
slug: howto_fixedsizepiedonut_charts
tags: chart, create, fixed-size pie, donut
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I render Pie or Donut Charts that have the same diameter?

## Solution

Normally, the plot area size is determined by the free space left by other Chart elements such as the title, the legend, and others, which ultimately leads to this issue. To work around the problem, remove the legend from the normal element flow by setting the [`legend` position](/api/javascript/dataviz/ui/chart/configuration/legend.position) to `"custom"`.

To make room for the legend, set a fixed `plotArea.height` for all charts and position it by using the [`offsetX`/`offsetY`](/api/javascript/dataviz/ui/chart/configuration/legend.offsetx) configuration options.

The following example demonstrates how to store and load the axis range. The changes are detected in the [`drag`](/api/javascript/dataviz/ui/chart/events/drag) and [`zoom`](/api/javascript/dataviz/ui/chart/events/zoom) events. The axis range is restored in the [`dataBound` event](/api/javascript/dataviz/ui/chart/events/databound).

```dojo
    <style>
        .k-chart {
            width: 300px;
            height: 300px;
            float: left;
        }
    </style>
    <div id="chart-1"></div>
    <div id="chart-2"></div>
    <script>
        $(function() {
            var CONTAINER_SIZE = 300;
            var LEGEND_SIZE = 50;
            var LEGEND_OFFSET = CONTAINER_SIZE - LEGEND_SIZE;

            var legend = {
                position: "custom",
                orientation: "horizontal",
                offsetY: LEGEND_OFFSET
            };

            var plotArea = {
                height: LEGEND_OFFSET
            };

            $("#chart-1").kendoChart({
              legend: legend,
              plotArea: plotArea,
              seriesDefaults: {
                type: "donut"
              },
              series: [{
                name: "2011",
                data: [{
                  category: "Asia",
                  value: 30.8,
                  color: "#9de219"
                },{
                  category: "Europe",
                  value: 21.1,
                  color: "#90cc38"
                },{
                  category: "Latin America",
                  value: 16.3,
                  color: "#068c35"
                },{
                  category: "Africa",
                  value: 17.6,
                  color: "#006634"
                },{
                  category: "Middle East",
                  value: 9.2,
                  color: "#004d38"
                },{
                  category: "North America",
                  value: 4.6,
                  color: "#033939"
                }]
              }]
            });

            $("#chart-2").kendoChart({
              legend: legend,
              plotArea: plotArea,
              seriesDefaults: {
                type: "donut"
              },
              series: [{
                name: "2011",
                data: [{
                  category: "Foo Foo Foo Foo Foo Foo Foo Foo",
                  value: 21.1,
                  color: "#90cc38"
                },{
                  category: "Bar Bar Bar Bar Bar Bar Bar Bar",
                  value: 16.3,
                  color: "#068c35"
                },{
                  category: "Baz Baz Baz Baz Baz Baz Baz Baz",
                  value: 17.6,
                  color: "#006634"
                }]
              }]
            });
        });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
