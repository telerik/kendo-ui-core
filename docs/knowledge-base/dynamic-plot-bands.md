---
title: Create Dynamic Plot Bands in Charts
page_title: Create Dynamic Plot Bands in Charts
description: "Learn how to create dynamic plot bands for Kendo UI Charts."
previous_url: /controls/charts/how-to/dynamic-plot-bands, /controls/charts/how-to/appearance/dynamic-plot-bands
slug: howto_createdynamicplotbands_charts
tags: chart, create, dynamic, plot, bands
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

How can I highlight data in a Kendo UI Chart by using dynamic plot bands?

## Solution

The following example demonstrates how to achieve this behavior.

```dojo
   <div id="chart"></div>
   <button>Change plot band</button>

    <script>
      $("#chart").kendoChart({
        categoryAxis: {
          type: "date",
          categories: [new Date("2014/01/01"), new Date("2014/01/02"), new Date("2014/01/31")],
          plotBands: [{
            from: new Date("2014/01/02"),
            to: new Date("2014/01/02"),
            color: "red"
          }]
        }
      });

      function showPlotBand(element, band) {
        var plotBands = [ band ];
        var axisNames = ["valueAxis", "xAxis", "categoryAxis"];
        var options = {};

        for (var i = 0; i < axisNames.length; i++) {
          options[axisNames[i]] = { plotBands: plotBands };
        }

        var chart = $(element).data("kendoChart");
        chart.setOptions(options);
      }

      $("button").click(function(){
        // shows a random plot band
        var start = new Date(2014, 0, 1 + Math.floor(Math.random() * 30));
        var end = new Date(start.getTime() + 1000 * 3600 * 24); // 24 hours after start

        showPlotBand("#chart", {
            from: start,
            to: end,
            color: "green"
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
