---
title: Place Labels under Panes in CategoryAxis
description: An example on how to position the CategoryAxis labels of the Kendo UI Chart below each series in a pane.
type: how-to
page_title: Position CategoryAxis Labels under Multiple Panes | Kendo UI Chart
slug: chart-label-position-pane-category-axis
tags: chart, label, position, pane, category, axis
ticketid: 1411207
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Chart for Progress® Kendo UI®</td>
 </tr>

  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

How can I position the `categoryAxis` labels below multiple panes in a Kendo UI Chart?  

## Solution

Set the [`categoryAxis.labels.position` configuration](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryaxislabelsposition) to `start`.

```javascript
        categoryAxis: [{
          categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
          pane: "bottom-pane",
          labels: {
            position: "start"
          },
        },{
          categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
          pane: "top-pane",
          labels: {
            position: "start"
          },
        }]
```

The following example demonstrates the full implementation of the suggested approach.

```dojo
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [
          { data: [1, 2, 3] },
          { data: [1, 2, 3, 4], axis: "bottom" }
        ],
        valueAxis: [
          { pane: "top-pane" },
          { pane: "bottom-pane", name: "bottom" }
        ],
        panes: [
          { name: "top-pane" },
          { name: "bottom-pane" }
        ],
        categoryAxis: [{
          categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
          pane: "bottom-pane",
          labels: {
            position: "start"
          },
        },{
          categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
          pane: "top-pane",
          labels: {
            position: "start"
          },
        }]
      });
    </script>
```

## See Also

* [API Reference of categoryAxis.labels.position](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryaxislabelsposition)
