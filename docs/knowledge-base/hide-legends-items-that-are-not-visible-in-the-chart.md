---
title: Hide Chart Legends That Have No Visual Appearance
description: An example on how to hide the Kendo UI Chart legends which have no visual appearance in the widget.
type: how-to
page_title: Hide the Non-Visible Legends Items | Kendo UI Chart
slug: hide-legends-items-that-are-not-visible-in-the-chart
previous_url: /knowledge-base/how-to-hide-legends-items-that-are-not-visible-in-the-chart
tags: chart, legend
ticketid: 1125941
res_type: kb
component: charts
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Chart</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>60.0.3112.101 (Official Build) (64-bit)</td>
 </tr>
</table>


## Description

My Chart shows legends for all the series that are multiplied by the grouping and configured against the data source. Sometimes I will have no data against some of the dynamically created series.

How can I hide the specific legend items for which I will not have any data to show?

## Solution

To allow the use of custom logic and determine whether a legend item will be added or not, use the [`legend.item.visual`](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/legend.item.visual) property of the Chart.

```dojo
  <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        legend: {
          item: {
            visual: function (e) {
              var color = e.options.markers.background;
              var labelColor = e.options.labels.color;
              var rect = new kendo.geometry.Rect([0, 0], [100, 50]);
              var layout = new kendo.drawing.Layout(rect, {
                spacing: 5,
                alignItems: "center"
              });
              var allZeroValues = false;
              if(e.series.data.length == 0 ){
                allZeroValues = true;
              }

              if(!allZeroValues){
                var marker = new kendo.drawing.Path({
                  fill: {
                    color: color
                  }
                }).moveTo(10, 0).lineTo(15, 10).lineTo(5, 10).close();

                var label = new kendo.drawing.Text(e.series.name, [0, 0], {
                  fill: {
                    color: labelColor
                  }
                });

                layout.append(marker, label);
                layout.reflow()
              }


              return layout;
            }
          }
        },
        series: [
          { name: "Series 1", data: [] },
          { name: "Series 2", data: [3, 4, 5] }
        ]
      });
    </script>
```
