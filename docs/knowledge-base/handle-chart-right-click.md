---
title: Handle Right Click in Charts
page_title: Handle Right Click in Charts
description: "Learn how to handle the right click in Kendo UI Charts."
previous_url: /controls/charts/how-to/handle-chart-right-click, /controls/charts/how-to/interaction/handle-chart-right-click
slug: howto_handlerightclick_charts
tags: chart, handle, right, clicks
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

How can I manage the right click in the Chart?

## Solution

The following example demonstrates how to handle the right click in Kendo UI Charts.

```dojo
    <div id="chart"></div>
    <script>
       $("#chart").kendoChart({
          title: {
            text: "Gross domestic product growth /GDP annual %/"
          },
          legend: {
            position: "top"
          },
          seriesDefaults: {
            type: "column"
          },
          series: [{          
            name: "World",
            data: [1, 2, 3, 4, 5]
          }],         
          categoryAxis: {
            categories: [2002, 2003, 2004, 2005, 2006]
          }
        });

        $("#chart").on("contextmenu", function(e) {
          e.preventDefault();        
          	alert("Right clicked!");
        });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
