---
title: Increase the Stroke Size in the Chart Legend
page_title: Change the Legend Stroke Size | Kendo UI Chart for jQuery
description: An example on how to change the size of the legend stroke in the Kendo UI Chart.
type: how-to
slug: chart-legend-stroke-size
tags: chart, legend, stroke, size
ticketid: 1142102
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td> Kendo UI®</td>
  <td>Progress Kendo UI Chart</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I change the size of the stroke next to the legend text in the Kendo UI Chart?

## Solution

1. Handle the [`render`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/render) event of the Chart.
1. In the `render` event handler, select the desired `path` with jQuery.
1. Change the `stroke-width` attribute of the `path`.

```dojo
<div id="chart"></div>
<script>
    $("#chart").kendoChart({
        legend: {
            labels: {
                font: "60px sans-serif"
            }
        },
        series: [{
                name: "Series 1",
                data: [1, 2, 3]
            },
            {
                name: "Series 2",
                data: [3, 4, 5]
            }
        ],
        render: function(e) {
            var el = e.sender.element;
            el.find("text:contains(Series 1)")
                .parent()
                .prev("path")
                .attr("stroke-width", 5);

            el.find("text:contains(Series 2)")
                .parent()
                .prev("path")
                .attr("stroke-width", 5);
        }
    });
</script>
```
