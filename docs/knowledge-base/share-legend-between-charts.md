---
title: Share Legend Between Charts
description: An example on how to create a shared legend to show and hide series in two or more Kendo UI Charts.
type: how-to
page_title: Create Common Legend for Two or More Charts | Kendo UI Chart
slug: share-legend-between-charts
tags: chart, legend, series, kendo-ui
ticketid: 1114263
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
  <td>Progress Kendo UI version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description

Can I click on the legend of one Kendo UI Chart and have the series of the other Charts hide or show?

## Solution

Handle the [`legendItemClick`](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/legenditemclick) event of the first Chart and manually toggle the series visibility in the other Charts.

The following example demonstrates the full implementation of the approach.  

```dojo
    <div id="example">
      <div class="demo-section k-content wide">
        <div id="chart" style="width:400px; height: 250px"></div>
        <div id="chart2"  style="width:400px; height: 220px"></div>
      </div>
      <script>
        function createChart() {
          $("#chart").kendoChart({
            legend: {
              position: "top"
            },
            legendItemClick: function(e){
              var series = $("#chart2").data("kendoChart").findSeriesByIndex(e.seriesIndex);

              series.toggleVisibility(!series._options.visible);
            },
            title: {
              text: "Site Visitors \n /UK/"
            },
            seriesDefaults: {
              type: "bar"
            },
            series: [{
              name: "Total Visits",
              data: [72000, 84000, 64000, 82000, 108000, 118000]
            }, {
              name: "Unique visitors",
              data: [52000, 34000, 23000, 48000, 67000, 83000]
            }],
            categoryAxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              majorGridLines: {
                visible: false
              }
            },
            tooltip: {
              visible: true,
              template: "#= series.name #: #= value #"
            }
          });
          $("#chart2").kendoChart({
            title: {
              text: "Site Visitors \n /France/"
            },
            legend: {
              visible: false
            },
            seriesDefaults: {
              type: "bar"
            },
            series: [{
              name: "Total Visits",
              data: [56000, 63000, 72000, 96000, 115000, 128000]
            }, {
              name: "Unique visitors",
              data: [52000, 34000, 23000, 48000, 67000, 83000]
            }],

            categoryAxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              majorGridLines: {
                visible: false
              }
            }
          });
        }

        $(document).ready(createChart);
      </script>
    </div>
```

## Notes

If the order of the series is different across the Charts, you can also [access the series by their names](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/methods/findseriesbyname).  
