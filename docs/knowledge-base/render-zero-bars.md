---
title: Render Element for Zero Chart Bars
page_title: Render Element for Zero Chart Bars
description: "Learn how to render an element for the bars with a zero value with the Kendo UI Charts."
previous_url: /controls/charts/how-to/render-zero-bars, /controls/charts/how-to/appearance/render-zero-bars
slug: howto_renderzerobars_charts
tags: chart, render, element, zero, chart, bars
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

How can I render bars with a zero value in the Chart?

## Solution

By default, these are not rendered because they have a zero size.

To overwrite this limitation, refer to the following example. It demonstrates how to use the [`series.visual`](/api/javascript/dataviz/ui/chart/configuration/series.visual) function to render an element for zero bars.

```dojo
    <div id="chart"></div>
    <script>
        var ZERO_BAR_SIZE = 2;

        $("#chart").kendoChart({
          seriesDefaults: {
            type: "column",
            visual: function(e) {
              var visual;
              if (e.value === 0) {
                e.rect.origin.y -= ZERO_BAR_SIZE;
                e.rect.size.height = ZERO_BAR_SIZE;

                visual = new kendo.drawing.Rect(e.rect, {
                  fill: {
                    color: e.options.color
                  },
                  stroke: null
                });
              } else {
                visual = e.createVisual();
              }

              return visual;
            }
          },
          series: [{
            data: [1, 0, 1]
          }, {
            data: [0, 1, 1]
          }]
        });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
