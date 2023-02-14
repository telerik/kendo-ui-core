---
title: Use Fixed Bar Sizes in Charts
page_title: Use Fixed Bar Sizes in Charts
description: "Learn how to use bars of a fixed size when working with the Kendo UI Charts."
previous_url: /controls/charts/how-to/fixed-bar-size, /controls/charts/how-to/appearance/fixed-bar-size
slug: howto_usefixedbarsize_charts
tags: chart, customize, themes
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

How can I set the size of the default drawing element of the Chart bars to the same size?

## Solution

The following example demonstrates how to use the [`series.visual`](/api/javascript/dataviz/ui/chart/configuration/series.visual) function to scale the default drawing element of the bars and achieve this behavior.

```dojo
    <div id="chart"></div>
    <script>
      var BAR_SIZE = 10;
      $("#chart").kendoChart({
        series: [{
          type: "bar",
          data: [1, 2],
          visual: function(e) {
            //create the default visual
            var visual = e.createVisual();
            //scale it so that it has the predefined size
            visual.transform(kendo.geometry.transform().scale(1, BAR_SIZE / e.rect.size.height, e.rect.center() ));
            return visual;
          }
        }]
      });
    </script>
    </div>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
