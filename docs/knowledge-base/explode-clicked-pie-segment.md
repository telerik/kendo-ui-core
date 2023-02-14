---
title: Expand a Clicked Pie Chart Segment
page_title: Expand a Clicked Pie Chart Segment
description: "Learn how to explode a clicked segment in a Kendo UI Pie Chart."
previous_url: /controls/charts/how-to/explode-clicked-pie-segment, /controls/charts/how-to/interaction/explode-clicked-pie-segment
slug: howto_explodeclickedsegment_piecharts
tags: chart, expand, clicked, pie, segment
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

How can I improve the visualization of the data illustrated in the Pie Chart by expanding a segment that was clicked by the user?

## Solution

The following example demonstrates how to achieve this behavior.

```dojo
    <div id="chart"></div>
    <script>
      var data = [{
        "source": "Hydro",
        "percentage": 22,
        "explode": true
      },                  {
        "source": "Solar",
        "percentage": 2
      },                  {
        "source": "Nuclear",
        "percentage": 49
      },                  {
        "source": "Wind",
        "percentage": 27
      }];

      $("#chart").kendoChart({
        dataSource: {
          transport: {
            read: function(e) {
              e.success(data);
            }
          }
        },
        series: [{
          type: "pie",
          field: "percentage",
          categoryField: "source",
          explodeField: "explode",
          labels: {
            visible: true,
            background: "transparent",
            template: "#= category #: \n #= value#%"
          }
        }],
        seriesClick: function(e){
          $.each(e.sender.dataSource.view(), function() {
            // Clean up exploded state
            this.explode = false;
          });

          // Disable animations
          e.sender.options.transitions = false;

          // Explode the current slice
          e.dataItem.explode = true;
          e.sender.refresh();
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
