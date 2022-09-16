---
title: Sort Categories in Grouped Charts
page_title: Sort Categories in Grouped Charts
description: "Learn how to sort the categories in a grouped Kendo UI Chart."
previous_url: /controls/charts/how-to/sort-category-groups, /controls/charts/how-to/sorting/sort-category-groups
slug: howto_sortcategorisinagroupedchart_charts
tags: chart, sort, categories, in, grouped, charts
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Chart for jQuery</td>
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

How can I set the order of the categories in a grouped Chart?

## Solution

The order of the categories in a grouped chart cannot be set through the `sort` option of the data source.

The reason for this behavior is that the grouping overrides the sort order as part of its implementation. In effect, the sort order is respected only within the resulting groups. Still, you can influence the final order of the categories during the `dataBound` event.

The following example demonstrates how to sort categories in a grouped Kendo UI Chart.

```dojo
    <div id="chart"></div>
    <script>
      var data = [{
        daysOut: 1,
        type: "A",
        requestor: "Adam"
      },{
        daysOut: 2,
        type: "A",
        requestor: "Bonnie"
      },{
        daysOut: 1,
        type: "A",
        requestor: "Connor"
      },{
        daysOut: 1,
        type: "B",
        requestor: "Zach"
      },{
        daysOut: 1,
        type: "B",
        requestor: "Amber"
      }];

      $("#chart").kendoChart({
        "dataSource": {
          data: data,
          group: {
            field: "type"
          }
        },
        series: [{
          field: "daysOut",
          type: "bar",
          categoryField: "requestor",

          // Grouping will generate two series - "A" and "B" in each category
          // Since we only have data for one of them we use stacking to remove the empty space
          stack: true
        }],
        dataBound: function(e) {
          var axis = e.sender.options.categoryAxis;
          axis.categories = axis.categories.sort();
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
