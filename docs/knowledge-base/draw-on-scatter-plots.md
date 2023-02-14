---
title: Draw on Scatter Chart Plots Surface
page_title: Draw on Scatter Chart Plots Surface
description: "Learn how to draw freely on the surface of a Kendo UI Chart with scatter series."
previous_url: /controls/charts/how-to/draw-on-scatter-plots, /controls/charts/how-to/appearance/draw-on-scatter-plots
slug: howto_drawonscatterplotssurface_charts
tags: chart, draw, scatter, plots, surface
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

How can I freely draw on the surface of a Kendo UI Chart with scatter series?

## Solution

To achieve this behavior:

1. Draw a rectangle with gradient fill on a scatter plot at specified coordinates.
2. Create custom elements in the [`render` event](/api/javascript/dataviz/ui/chart/events/render) to ensure they survive redraws.

For a list of all available drawing primitives, refer to the introductory article on the [Drawing API]({% slug overview_kendoui_drawingapi %}).

The following example demonstrates how to draw freely on the Scatter plot surface.

```dojo
    <div id="chart" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.LinearGradient({
        start: [ 0, 0 ], // Bottom left
        end: [ 0, 1 ],   // Top left
        stops: [{
          offset: 0,
          color: "#f00",
          opacity: 0
        }, {
          offset: 1,
          color: "#f00",
          opacity: 1
        }]
      });

      $("#chart").kendoChart({
        series: [{
          type: "scatter",
          data: [[1, 1], [-100, -100]]
        }],
        xAxis: {
          name: "xAxis"
        },
        yAxis: {
          name: "yAxis"
        },
        render: function(e) {
            var chart = e.sender;
            var xAxis = chart.getAxis("xAxis");
            var yAxis = chart.getAxis("yAxis");
            var xSlot = xAxis.slot(-80, -20);
            var ySlot = yAxis.slot(-20, -80);

            var rect = new geom.Rect([
              // Origin X, Y
              xSlot.origin.x, ySlot.origin.y
            ], [
              // Width, height
              xSlot.width(), ySlot.height()
            ]);

            var path = draw.Path.fromRect(rect, {
              stroke: null,
              fill: gradient
            });

            chart.surface.draw(path);
        }
      });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
