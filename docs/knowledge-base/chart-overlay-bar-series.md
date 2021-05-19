---
title: Overlay Bar Chart Series
description: An example on how to display overlaid Column or Bar Chart series where the top series is narrower tan the overlaid series.
type: how-to
page_title: Display Bar Chart Series That Are Overlaid on Top of Each Other | Kendo UI Chart for jQuery
slug: chart-overlay-bar-series
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

How can I create a Kendo UI Column or Bar Chart with two values in the same category where:
1. One of the bars overlays the other?
2. The top bar is narrower than the base bar?

## Solution

1. Use the [`series.spacing`](/api/javascript/dataviz/ui/chart/configuration/series.spacing) property with a value of `-1` (minus one) to place one series on top of the other.
2. Apply a custom [`visual`](/api/javascript/dataviz/ui/chart/configuration/series.visual) for the top series to make their bar narrower.

The following example demonstrates how to apply the suggested approach to a Bar Chart series.

````dojo
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

The following example demonstrates how to apply the suggested approach to a Column Chart series.

````dojo
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
