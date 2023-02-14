---
title: Shorten Chart Labels
page_title: Shorten Chart Labels
description: "Learn how to shorten long Kendo UI Chart labels to a more readable format."
previous_url: /controls/charts/how-to/shorten-chart-labels, /controls/charts/how-to/appearance/shorten-chart-labels
slug: howto_shortenchartlabels_charts
tags: chart, shorten, labels
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

How can I make a long Kendo UI Chart label short to make it more structured and comprehensible?

## Solution

The following example demonstrates how to shorten long Chart labels and turn them into a more readable format.

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
          name: "Series 1",
          data: [10, 20, 30]
        }],
        categoryAxis: {
          categories: ["Long category", "Very long category", "Very Very long category"],
          labels: {
            template: "#= shortLabels(value)#"
          }
        },
        tooltip: {
          visible: true,
          format: "{0}%",
          template: "#= series.name #: #= value #"
        }
      });
      function shortLabels(value) {
        if (value.length > 5) {
          value = value.substring(0, 10);
          return value + "...";
        }
      }
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
