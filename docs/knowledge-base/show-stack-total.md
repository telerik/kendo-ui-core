---
title: Show a Total Sum for Stacked Chart Series
page_title: Show a Total Sum for Stacked Chart Series
description: "Learn how to place a label with the stack total on top of column or bar series in a Kendo UI Chart."
previous_url: /controls/charts/how-to/various/show-stack-total
slug: howto_showtotalstacked_charts
tags: chart, total, sum, for, stacked, series
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

How can I place a label with the stack total on top of column or bar Chart series?

## Solution

Starting with the 2016 R3 release, a `stackValue` field is available in the label template, the series visual, and the event arguments.

It is possible to use this configuration to display the cumulative point value for stacked series.

```dojo
    <div id="chart"></div>
    <script>
      $(function(){
        $("#chart").kendoChart({
          dataSource:{
            data:[{
              a: 22,
              b: 11,
              c: 33
            },{
              a: 2,
              b: 1,
              c: 3
            }]
          },
          seriesDefaults: {
            type: "column",
            stack: true
          },
          series: [{
            field: "a",
            name: "a"
          },{
            field: "b",
            name: "b"
          },{
            field: "c",
            name: "c",
            labels: {
                template: "#= stackValue #",
                visible: true
            }
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
