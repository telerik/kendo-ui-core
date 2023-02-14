---
title: Render Custom Plot Bands in the Chart
page_title: Render Custom Plot Bands in the Chart
description: "Learn how to create your own plot bands as a custom overlay in a Kendo UI Chart."
previous_url: /controls/charts/how-to/custom-plot-bands, /controls/charts/how-to/appearance/custom-plot-bands
slug: howto_rendercustomplotbands_charts
tags: chart, render, custom, plot, bands
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

I need to create my own custom plot bands as a custom overlay of the Chart. How can I achieve this behavior?

## Solution

To accomplish this scenario, create custom elements in the [`render` event](/api/javascript/dataviz/ui/chart/events/render) of the Chart to ensure they survive redraws. Note that you can extend the techniques shown here to create much more complex annotations as well.

For a list of all available drawing primitives, refer to the introductory article on the [Drawing API]({% slug overview_kendoui_drawingapi %}).

The following examples demonstrate the implementation of the scenario in the Column and Bar Charts.

### Column Charts

The following example demonstrates how to render a custom plot band in a Column Kendo UI Chart.

```dojo
    <div id="chart" />
    <script>
      $("#chart").kendoChart({
        valueAxis: {
          name: "valueAxis",
          min: 0,
          max: 700
        },
        categoryAxis: {
          name: "categoryAxis"
        },
        series: [{
          type: "column",
          data: [500, 650]
        }],
        render: function(e) {
          // Locate value slot
          //
          // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/chart/chart_axis/methods/slot
          var valueAxis = e.sender.getAxis("valueAxis");
          var valueSlot = valueAxis.slot(650);

          // Locate right-most category slot
          //
          var categoryAxis = e.sender.getAxis("categoryAxis");
          var lastCategoryIndex = Math.max(1, categoryAxis.range().max);
          var minCategorySlot = categoryAxis.slot(0);
          var maxCategorySlot = categoryAxis.slot(lastCategoryIndex);

          // Render a line element
          //
          // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
          var line = new kendo.drawing.Path({
            stroke: {
              color: "red",
              width: 3
            }
          });
          line.moveTo(valueSlot.origin).lineTo([maxCategorySlot.origin.x, valueSlot.origin.y]);

          // Render a text element
          //
          // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
          var labelPos = [maxCategorySlot.origin.x - 50, valueSlot.origin.y - 20];
          var label = new kendo.drawing.Text("MAX", labelPos, {
            fill: {
              color: "red"
            },
            font: "14px sans"
          });

          var group = new kendo.drawing.Group();
          group.append(line, label);

          // Draw on chart surface
          //
          // https://docs.telerik.com/kendo-ui/framework/drawing/overview
          e.sender.surface.draw(group);
        }
      });
    </script>
```

### Bar Charts

The following example demonstrates how to render a custom plot band in a Bar Kendo UI Chart.

```dojo
    <div id="chart" />
    <script>
      $("#chart").kendoChart({
        valueAxis: {
          name: "valueAxis",
          min: 0,
          max: 700
        },
        categoryAxis: {
          name: "categoryAxis"
        },
        series: [{
          type: "bar",
          data: [500, 650]
        }],
        render: function(e) {
          // Locate value slot
          //
          // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/chart/chart_axis/methods/slot
          var valueAxis = e.sender.getAxis("valueAxis");
          var valueSlot = valueAxis.slot(650);

          // Locate right-most category slot
          //
          var categoryAxis = e.sender.getAxis("categoryAxis");
          var lastCategoryIndex = Math.max(1, categoryAxis.range().max);
          var minCategorySlot = categoryAxis.slot(0);
          var maxCategorySlot = categoryAxis.slot(lastCategoryIndex);

          // Render a line element
          //
          // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
          var line = new kendo.drawing.Path({
            stroke: {
              color: "red",
              width: 3
            }
          });
          line.moveTo(valueSlot.origin).lineTo([valueSlot.origin.x, minCategorySlot.origin.y]);

          // Render a text element
          //
          // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
          var labelPos = [valueSlot.origin.x + 10, maxCategorySlot.origin.y - 30];
          var label = new kendo.drawing.Text("MAX", labelPos, {
            fill: {
              color: "red"
            },
            font: "14px sans"
          });

          var group = new kendo.drawing.Group();
          group.append(line, label);

          // Draw on chart surface
          //
          // https://docs.telerik.com/kendo-ui/framework/drawing/overview
          e.sender.surface.draw(group);
        }
      });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
