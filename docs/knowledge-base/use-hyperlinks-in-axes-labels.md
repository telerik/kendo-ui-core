---
title: Use Hyperlinks in Axes Chart Labels
page_title: Use Hyperlinks in Axes Chart Labels
description: "Learn how to display a daily timeline for two users in a Kendo UI Chart."
previous_url: /controls/charts/how-to/use-hyperlinks-in-axes-labels, /controls/charts/how-to/various/use-hyperlinks-in-axes-labels
slug: howto_usehyperlinks_inaxislabels_charts
tags: chart, use, hyperlinks, in, axes, labels
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

How can I use hyperlinks in the axes labels of the Chart?

## Solution

The following example demonstrates how to achieve this behavior.

```dojo
    <div id="chart"></div>
    <script>
      var data = [ {
        "blog": "My blog",
        "day": "1",
        "value": 3,
        "userColor": "#ffd600",
        "url": "http://www.example.com"
      }, {
        "blog": "My blog",
        "day": "2",
        "value": 7,
        "userColor": "#ffd600",
        "url": "http://www.example.com"
      }, {
        "blog": "My blog",
        "day": "3",
        "value": 12,
        "userColor": "#ffd600",
        "url": "http://www.example.com"
      }];

      $("#chart").kendoChart({
        dataSource: {
          data: data
        },
        title: {
          align: "left",
          text: "Comments per day"
        },
        legend: {
          visible: false
        },
        seriesDefaults: {
          type: "column"
        },
        series: [{
          field: "value",
          colorField: "userColor"
        }],
        valueAxis: {
          majorGridLines: {
            visible: false
          },
          visible: false
        },
        categoryAxis: {
          field: "day",
          majorGridLines: {
            visible: false
          },
          line: {
            visible: false
          },
		  labels: {
            color: "#0487c4",
            cursor: "pointer",
            padding: {
              top: 2,
              bottom: 2,
              left: 3,
              right: 3
            },
            border: {
              width: 1,
              color: "#0487c4"
            }
          }
        },
        axisLabelClick: function(e) {
          window.location = e.dataItem.url;
        }
      });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
