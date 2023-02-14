---
title: Show Chart Category Axis Labels on Multiple Lines
page_title: Show Chart Category Axis Labels on Multiple Lines
description: "Learn how to insert line breaks in Category Axis labels when working with Kendo UI Charts."
previous_url: /controls/charts/how-to/show-axis-labels-in-two-rows, /controls/charts/how-to/appearance/show-axis-labels-in-two-rows
slug: howto_showlabelsintworows_charts
tags: chart, show, category, axis, labels, multiple, lines
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

How can I display long labels in a Kendo UI Chart and make the content look more compact and better organized?

## Solution

It is possible to break the content of the Chart labels into multiple lines.   

The following example demonstrates how to insert newline symbols in the Category Axis labels to achieve this behavior.

```dojo

    <div id="chart"></div>
    <script>
      var data = [{
        value: 1,
        category: "Category Foo"
      },{
        value: 2,
        category: "Category Bar"
      }, {
        value: 3,
        category: "Category Baz"
      }];

      $("#chart").kendoChart({
        dataSource: {
          data: data
        },
        series: [{
          type: "column",
          name: "Series Name",
          field: "value"
        }],
        categoryAxis: {
          field: "category",
          labels: {
            template: labelTemplate
          }
        }
      });

      function labelTemplate(e) {
        return e.value.split(" ").join("\n");
      }
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
