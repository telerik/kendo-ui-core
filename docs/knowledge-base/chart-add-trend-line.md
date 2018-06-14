---
title: Add Trend Line or Average Line to Chart
description: An example demonstrating how to insert a trend line or average line in a chart
type: how-to
page_title: Add Trend or Average Line to Chart | Kendo UI Charts
slug: chart-add-trend-line
tags: chart, trendline, average, mean, sampling
ticketid: 1163517
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Chart for Progress® Kendo UI®</td>
 </tr>
 <tr>
	 <td>Product Version</td>
	 <td>2018.2.516</td>
 </tr>
</table>

## Description

I'm working on an application that uses a Kendo UI Chart and would like to add a trend line and/or average line to it.

## Solution

To add a trend line and/or an average line:

1. Add an additional [`series`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series) to the Chart with the average values.
2. Remove the [`markers`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.markers) so it stands out as a line instead of a series by using its [`visible` property](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.markers.visible).

```html
<div id="example">
  <div class="demo-section k-content wide">
    <div id="chart" style="background: center no-repeat url('../content/shared/styles/world-map.png');"></div>
  </div>
  <script>
    $(document).ready(function() {
      $("#chart").kendoChart({
        title: {
          text: "Gross domestic product growth \n /GDP annual %/"
        },
        legend: {
          position: "bottom"
        },
        chartArea: {
          background: ""
        },
        seriesDefaults: {
          type: "line",
          style: "smooth"
        },
        series: [{
          name: "Trend",
          color: "red",
          markers:{ 
            size: 0 
          },
          dashType: "dash",
          data: [-4, -2, 0, 2, 4, 6, 8, 10, 12]
        },{
          name: "World",
          data: [-5.988, -3.733, 1.464, 6.001, 3.539, 1.333, 8.245, 14.339, 10.727]
        }],
        valueAxis: {
          labels: {
            format: "{0}%"
          },
          line: {
            visible: false
          },
          axisCrossingValue: -10
        },
        categoryAxis: {
          categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
          majorGridLines: {
            visible: false
          },
          labels: {
            rotation: "auto"
          }
        },
        tooltip: {
          visible: true,
          format: "{0}%",
          template: "#= series.name #: #= value #"
        }
      });
    });
  </script>
</div>
```
