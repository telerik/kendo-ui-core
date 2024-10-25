---
title: Display Checkboxes next to Legend Items in Charts
page_title: Display Checkboxes next to Legend Items in Charts
description: "Learn how to customize the appearance of legend items in Kendo UI Charts."
previous_url: /controls/charts/how-to/legend-with-checkboxes, /controls/charts/how-to/appearance/legend-with-checkboxes
slug: howto_displaycheckboxes_nexttolegenditems_charts
tags: chart, display, chackboxes, next, to, legend, items
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
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I draw a checkbox that matches the visible state of the Chart series?

## Solution

The [`legend.item.visual`](/api/javascript/dataviz/ui/chart/configuration/legend.item.visual) can be overridden to render custom text, images, and shapes.

For example, you might need to draw a checkbox that matches the visible state of the series. In this case, the checkbox is represented by using an [Unicode Ballot Box symbol](https://en.wikipedia.org/wiki/Checkbox#Unicode).

For a list of all available drawing primitives, refer to the [Drawing API article]({% slug overview_kendoui_drawingapi %}).

The following example demonstrates how to customize the appearance of the legend items in a Kendo UI Chart.

```dojo
    <div id="chart" />
    <script>
      $("#chart").kendoChart({
        legend: {
          item: {
            visual: function (e) {
              var color = e.options.markers.background;
              var labelColor = e.options.labels.color;
              // This will give us the default box + text
              var defaultVisual = e.createVisual();
              var defaultSize = defaultVisual.bbox().size;
              // Define the target dimensions for the legend item
              var rect = new kendo.geometry.Rect([0, 0], [defaultSize.width + 30, defaultSize.height]);

              // A layout will hold the checkbox and the default visual
              //
              // https://docs.telerik.com/kendo-ui/api/javascript/drawing/layout
              var layout = new kendo.drawing.Layout(rect, {
                spacing: 5,
                alignItems: "center"
              });

              // Cheat a bit by rendering the checkbox using the Unicode ballot symbol
              //
              // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
              var cbSymbol = e.active ? "☑" : "☐";
              var cb = new kendo.drawing.Text(cbSymbol, [0, 0], {
                fill: {
                  color: labelColor
                },
                font: "14px sans-serif"
              });


              // Reflow them together
              layout.append(cb, defaultVisual);
              layout.reflow()

              return layout;
            }
          }
        },
        series: [
          { name: "Series 1 with longer name", data: [1, 2, 3] },
          { name: "Series 2", data: [3, 4, 5] }
        ]
      });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
