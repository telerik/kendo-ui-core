---
title: Overlay Chart Bar Series
description: How to display overlaid column/bar series where the top series is narrower tan the overlid one
type: how-to
page_title: Display Chart Bar Series Overlaid on Top of Each Other
slug: chart-overlay-bar-series
position: 
tags: chart, visual
ticketid: 1158675, 1154649
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1.221</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Chart</td>
	</tr>
</table>


## Description
I have a requirement to create a Chart in which we have two values in one category where:

1. One bar is overlaid on the other.
2. The top bar is narrower than the base one. 

How can I accomplish this with Column/Bar charts in Kendo UI?

## Solution
You can implement this with the Kendo UI Column/Bar series using:

1. The [series.spacing](/api/javascript/dataviz/ui/chart/configuration/series.spacing) property with a -1 value to place one series on top of the other.
2. A custom [visual](/api/javascript/dataviz/ui/chart/configuration/series.visual) for the top series to make their bar narrower.

The following examples show how to implement this approach for Bar and Column series separately because the custom visual paths for the two series types differ.

### Example - Overlay Chart Bar Series

````html
    <div id="chart"></div>
    <script>
      function createChart() {
        $("#chart").kendoChart({
          seriesDefaults: {
            type: "bar",
            spacing: -1
          },
          series: [{
            name: "Total Visits",
            data: [56000, 63000, 74000, 91000, 117000, 138000]
          }, {
            name: "Unique visitors",
            data: [52000, 34000, 23000, 48000, 67000, 83000],
            visual: function (e) {
              var rect = e.rect;
              var origin = rect.origin;
              var bottomRight = rect.bottomRight();
              var offset = (bottomRight.y - origin.y) / 3;
              var path = new kendo.drawing.Path({
                fill: {
                  color: e.options.color
                },
                stroke: {
                  color: "#939393",
                  width: 0.5
                }
              })

              .moveTo(origin.x, bottomRight.y - offset)
              .lineTo(bottomRight.x, bottomRight.y - offset)
              .lineTo(bottomRight.x, origin.y + offset)
              .lineTo(origin.x, origin.y + offset)
              .close();

              return path;
            }
          }],
          categoryAxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
          }
        });
      }

      $(document).ready(createChart);
    </script>
````

### Example - Overlay Chart Column Series

````html
    <div id="chart"></div>
    <script>
      function createChart() {
        $("#chart").kendoChart({
          seriesDefaults: {
            type: "column",
            spacing: -1
          },
          series: [{
            name: "Total Visits",
            data: [56000, 63000, 74000, 91000, 117000, 138000]
          }, {
            name: "Unique visitors",
            data: [52000, 34000, 23000, 48000, 67000, 83000],
            visual: function (e) {
              var origin = e.rect.origin;
              var bottomRight = e.rect.bottomRight();

              var offset = (bottomRight.x - origin.x) / 3;
              var path = new kendo.drawing.Path({
                fill: {
                  color: e.options.color
                },
                stroke: {
                  color: "#939393",
                  width: 0.5
                }
              })
              .moveTo(origin.x + offset, bottomRight.y)
              .lineTo(bottomRight.x - offset, bottomRight.y)
              .lineTo(bottomRight.x - offset, origin.y)
              .lineTo(origin.x + offset, origin.y)
              .close();

              return path;
            }
          }],
          categoryAxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
          }
        });
      }

      $(document).ready(createChart);
    </script>
````