---
title: Modifying Hover Effect to Darken Colors in Kendo UI for jQuery Charts
description: Customizing the hover effect of the chart elements in Kendo UI for jQuery Chart component.
type: how-to
page_title: How to Customize Hover Effect in Kendo UI for jQuery Charts
meta_title: Adjusting Hover Effect for Darker Colors in Kendo UI for jQuery Charts
slug: adjusting-hover-effect-darker-colors-kendo-ui-jquery-charts
tags: chart, kendo ui for jquery, hover effect, series.highlight.visual, customization
res_type: kb
ticketid: 1681143
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Chart </td>
</tr>
<tr>
<td> Version </td>
<td> 2026.1.212 </td>
</tr>
</tbody>
</table>

## Description

When hovering over chart elements in Kendo UI for jQuery, the default behavior changes the color to a lighter shade. I want the hover effect to darken the colors of the chart elements instead. 

This knowledge base article also answers the following questions:
- How to change the hover effect color for Kendo UI for jQuery Charts?
- How to darken chart element colors on hover in Kendo UI for jQuery?

## Solution

To achieve this, use the [`series.highlight.visual`](/api/javascript/dataviz/ui/chart/configuration/series.highlight#serieshighlightvisual) property to customize the hover effect of the chart elements. This property allows you to define a visual representation of the hovered element, enabling you to apply a darker color.

### Implementation Example

Below is an example configuration to modify the hover effect:

```javascript
highlight: {
    visual: function(e) {
        var origin = e.rect.origin;
        var bottomRight = e.rect.bottomRight();
        var topRight = e.rect.topRight();
        var topLeft = e.rect.topLeft();

        var fillColor = "green"; // Define the fill color for hover
        var borderColor = "#555"; // Define the border color

        var path = new kendo.drawing.Path({
            fill: {
                color: fillColor,
                opacity: 1,
            },
            stroke: {
                color: borderColor,
                opacity: 0.7,
                width: 2,
            },
        })
        .moveTo(origin.x, bottomRight.y)
        .lineTo(bottomRight.x, bottomRight.y)
        .lineTo(topRight.x, topRight.y)
        .lineTo(topLeft.x, topLeft.y)
        .close();

        return path;
    },
},
```

### Steps

1. Add the `highlight.visual` property to the respective chart configuration.
2. Define custom `fill` and `stroke` properties inside the `visual` function to specify the desired colors.
3. Use the provided `e.rect` values to create the visual path for the hovered element.
4. Apply the configuration to your chart types such as Donut Chart, Stacked Chart, Funnel Chart, etc.

### Example 

```dojo
<div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        title: {
          text: "EUC Risk Rating by Department",
          font: "16px Segoe UI",
        },
        legend: {
          visible: true,
          labels: { font: "14px Segoe UI" },
        },
        seriesDefaults: {
          type: "bar",
          stack: true,
          labels: { font: "14px Segoe UI" },
        },
        series: [
          {
            name: "High Risk",
            data: [40, 32, 34],
            overlay: { gradient: "none" },
            color: "#fa938d",
            highlight: {
              visual: function (e) {
                var origin = e.rect.origin;
                var bottomRight = e.rect.bottomRight();
                var topRight = e.rect.topRight();
                var topLeft = e.rect.topLeft();

                var c = "#f56b5b";
                var bc = "#555";

               console.log(origin)
                var path = new kendo.drawing.Path({
                  fill: {
                    color: c,
                    opacity: 1,
                  },
                  stroke: {
                    color: bc,
                    opacity: 0.7,
                    width: 2,
                  },
                })                 
                  .moveTo(origin.x, bottomRight.y)
                  .lineTo(bottomRight.x, bottomRight.y)
                  .lineTo(topRight.x, topRight.y)
                  .lineTo(topLeft.x, topLeft.y)
                  .close();

                return path;
              },
            },
          },
          {
            name: "Medium Risk",
            data: [19, 25, 21],
            overlay: { gradient: "none" },
            color: "#51ccd0",
            highlight: {
              visual: function (e) {
                var origin = e.rect.origin;
                var bottomRight = e.rect.bottomRight();
                var topRight = e.rect.topRight();
                var topLeft = e.rect.topLeft();

                var c = "#637cf8";
                var bc = "#555";

                var path = new kendo.drawing.Path({
                  fill: {
                    color: c,
                    opacity: 1,
                  },
                  stroke: {
                    color: bc,
                    opacity: 0.7,
                    width: 2,
                  },
                })
                  .moveTo(origin.x, bottomRight.y)
                  .lineTo(bottomRight.x, bottomRight.y)
                  .lineTo(topRight.x, topRight.y)
                  .lineTo(topLeft.x, topLeft.y)
                  .close();

                return path;
              },
            },
          },
          {
            name: "Low Risk",
            data: [17, 17, 16],
            overlay: { gradient: "none" },
            color: "#99cb34",
            highlight: {
              visual: function (e) {
                var origin = e.rect.origin;
                var bottomRight = e.rect.bottomRight();
                var topRight = e.rect.topRight();
                var topLeft = e.rect.topLeft();

                var c = "#19bb06";
                var bc = "#555";

                var path = new kendo.drawing.Path({
                  fill: {
                    color: c,
                    opacity: 1,
                  },
                  stroke: {
                    color: bc,
                    opacity: 0.7,
                    width: 2,
                  },
                })
                  .moveTo(origin.x, bottomRight.y)
                  .lineTo(bottomRight.x, bottomRight.y)
                  .lineTo(topRight.x, topRight.y)
                  .lineTo(topLeft.x, topLeft.y)
                  .close();

                return path;
              },
            },
          },
        ],
        valueAxis: {
          max: 100,
          line: { visible: false },
          minorGridLines: { visible: true },
          labels: { font: "14px Segoe UI" },
        },
        categoryAxis: {
          categories: ["Administrator", "Development", "Service"],
          majorGridLines: { visible: false },
          labels: { font: "14px Segoe UI" },
        },
        tooltip: {
          visible: true,
          template: "#= series.name #: #= value #",
          font: "14px Segoe UI",
          color: "white", // Tooltip text color
          padding: {
            top: 5,
            bottom: 5,
            left: 10,
            right: 10,
          },
        },
      });
    </script>
```

## See Also

- [Kendo UI Chart API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart)
- [Kendo UI for jQuery Chart Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/overview)

