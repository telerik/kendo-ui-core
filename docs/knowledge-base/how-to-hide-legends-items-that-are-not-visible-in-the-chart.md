---
title: How to hide legends that have no visual appearance in chart
description: An example on how to hide legends that have no visual appearance in chart.
type: how-to
page_title: How to hide legends items that are not visible in the Chart
slug: how-to-hide-legends-items-that-are-not-visible-in-the-chart
tags: chart, legend
ticketid: 1125941
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Chart for Progress® Kendo UI®</td>
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

We have a chart that is showing legends for all the series multiplied by the grouping configured against the data source.
Some times we will have no data against some of the dynamically created series and under those circumstances we would like to hide those specific legend items.

## Solution

The desired result can be achieved using the [legend.item.visual](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#configuration-legend.item.visual) property of the Chart.
It will allow using custom logic to determine which legend item has to be added and which does not.

Please check the following example demonstrating this:

````html
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
````

