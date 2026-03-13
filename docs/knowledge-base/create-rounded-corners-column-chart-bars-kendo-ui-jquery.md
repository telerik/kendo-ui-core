---
title: Creating Rounded Corners for Chart Bars in Kendo UI for jQuery
description: Learn how to create rounded corners for chart bars in Kendo UI for jQuery using the Kendo Drawing API.
type: how-to
page_title: How to Create Rounded Corners for Chart Bars in Kendo UI for jQuery
meta_title: How to Create Rounded Corners for Chart Bars in Kendo UI for jQuery
slug: create-rounded-corners-column-chart-bars-kendo-ui-jquery
tags: chart, kendo-ui-for-jquery, rounded-corners, drawing-api, path
res_type: kb
ticketid: 1710368
---

## Environment
<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery Chart
</td>
</tr>
<tr>
<td> Version </td>
<td>
2026.1.212
</td>
</tr>
</tbody>
</table>

## Description

I need to create rounded corners for chart bars in [Kendo UI for jQuery Chart](https://docs.telerik.com/kendo-ui/controls/charts/overview). This involves customizing the bar appearance by drawing shapes with curves that simulate rounded ends.

This knowledge base article also answers the following questions:
- How can I make column chart bars pill-shaped in Kendo UI for jQuery?
- How can I implement bezier curves for rounded corners in Kendo UI for jQuery charts?

## Solution

Use the Kendo Drawing API's `Path` to draw bars with rounded corners by incorporating cubic bezier curves for semicircular caps on both ends. Follow these steps:

1. Define a corner radius as half the bar's height (`height / 2`) for consistent pill-shaped ends.
2. Apply bezier curves with the standard approximation factor `0.5523 * radius` for accurate semicircles.
3. Use `lineTo` segments to connect the rounded ends.
4. Apply a linear gradient horizontally for visual depth.

Here is a runnable example demonstrating this approach:

```dojo
 <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: "bar",
          data: [1, -3, 2, 8, -4],
          visual: function (e) {
            var rect = e.rect;
            var height = rect.size.height;
            var width = rect.size.width;
            var x = rect.origin.x;
            var y = rect.origin.y;
            // Use half the bar height as the radius for perfect semicircular ends
            var radius = height / 2;
            var isPositive = e.value >= 0;
            var baseColor = isPositive ? "pink" : "lightblue";
            var gradient = new kendo.drawing.LinearGradient({
              start: [0, 0.5],
              end: [1, 0.5],
              stops: [
                { offset: 0.3, color: baseColor, opacity: 0.6 },
                { offset: 1, color: baseColor, opacity: 1 },
              ],
            });

            // Bezier control point offset for a quarter-circle approximation
            var k = 0.5523 * radius;

            var path = new kendo.drawing.Path({
              fill: gradient,
              stroke: { color: "none" },
            })
              // Start at top-left of straight part
              .moveTo(x + radius, y)
              // Top straight line to right
              .lineTo(x + width - radius, y)
              // Right semicircle: top → rightmost
              .curveTo([x + width - radius + k, y], [x + width, y + radius - k], [x + width, y + radius])
              // Right semicircle: rightmost → bottom
              .curveTo([x + width, y + radius + k], [x + width - radius + k, y + height], [x + width - radius, y + height])
              // Bottom straight line to left
              .lineTo(x + radius, y + height)
              // Left semicircle: bottom → leftmost
              .curveTo([x + radius - k, y + height], [x, y + radius + k], [x, y + radius])
              // Left semicircle: leftmost → top
              .curveTo([x, y + radius - k], [x + radius - k, y], [x + radius, y])
              .close();

            return path;
          }
        }]
      });
    </script>
```


## See Also

- [Kendo UI for jQuery Chart Documentation](https://docs.telerik.com/kendo-ui/controls/charts/overview)
- [Kendo UI for jQuery Chart API](/api/javascript/dataviz/ui/chart)
- [Kendo Drawing Overview Documentation](https://docs.telerik.com/kendo-ui/framework/drawing/overview)
