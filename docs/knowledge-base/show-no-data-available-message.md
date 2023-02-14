---
title: Show a Message When the Chart Has No Data
page_title: Show a Message When the Chart Has No Data
description: "Learn how to show a message if the data source of a Kendo UI Chart is empty."
previous_url: /controls/charts/how-to/show-no-data-available-message, /controls/charts/how-to/appearance/show-no-data-available-message
slug: howto_showemptymessage_whencharthasnodata_charts
tags: chart, show, message, when, charts, have, no, data
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

How can I display a message in the Chart when its data source is empty?

## Solution

The following example demonstrates how to achieve such behavior. Note that the `<div>` element of the message is positioned and decorated through CSS.

```dojo
    <div class="container">
      <div id="chart"></div>
      <div class="overlay"><div>No data available</div></div>
    </div>

    <script>
     $("#chart").kendoChart({
        dataSource: {
          transport: {
            read: function(e) {
              setTimeout(function() {
                e.success([{
                  value: 1
                }, {
                  value: 2
                }]);
              }, 2000);
            }
          }
        },
        seriesDefaults: {
          type: "pie"
        },
        series: [{
          field: "value",
          name: "Foo"
        }],
        dataBound: function(e) {
          var view = e.sender.dataSource.view();
          $(".overlay").toggle(view.length === 0);
        }
      });
    </script>

    <style>
      .container {
        position: relative;
      }

      .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: .2;
        background-color: #6495ed;
        text-align: center;
      }

      .overlay div {
        position: relative;
        font-size: 34px;
        margin-top: -17px;
        top: 50%;
      }
    </style>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
