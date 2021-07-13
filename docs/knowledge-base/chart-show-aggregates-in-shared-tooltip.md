---
title: Show Aggregates of the Series Points in the Chart Shared Tooltip
description: An example on how to show an total of all points in a shared tooltip template in the Kendo Chart.
type: how-to
page_title: Custom Shared Chart tooltip with aggregates | Kendo UI Chart for jQuery
slug: chart-show-aggregates-in-shared-tooltip
tags: chart, shared, tooltip, sum, aggregates, sharedTooltip, template, sum, total
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Created with Product Version</td>
		<td>2017.3.1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Chart</td>
	</tr>
</table>


## Description

How can I show the total of all the series points in the shared tooltip template?

## Solution

1. Use the [`tooltip.sharedTemplate`](/api/javascript/dataviz/ui/chart/configuration/tooltip#tooltipsharedtemplate) fields to calulate and display the sum of all points.

```
    <script id="template" type="text/x-kendo-template">
        #var sum = 0 #
         <div>#: category #</div>
         # for (var i = 0; i < points.length; i++) { #
          # sum += points[i].value #
        <div style='background-color:#:points[i].color#'>#: points[i].series.name.split(" ")[0]# : #: points[i].value # </div>
         # } #
        <strong>Total: #:kendo.toString(sum,"c2")  # </strong>
    </script>
```

```dojo
    <div id="chart"></div>
    <script id="template" type="text/x-kendo-template">
        #var sum = 0 #
         <div>#: category #</div>
         # for (var i = 0; i < points.length; i++) { #
          # sum += points[i].value #
        <div style='background-color:#:points[i].color#'>#: points[i].series.name.split(" ")[0]# : #: points[i].value # </div>
         # } #
        <strong>Total: #:kendo.toString(sum,"c2")  # </strong>
    </script>
    <script>
      $("#chart").kendoChart({
        title: {
          text: "Gross domestic product growth \n /GDP annual %/"
        },
        legend: {
          position: "bottom",
          labels: {
            font: "10px DejaVu Sans"
          }
        },
        chartArea: {
          background: ""
        },
        seriesDefaults: {
          type: "line",
          style: "smooth"
        },
        series: [{
          name: "India Lorem ipsum dolor sit amet, consectetur adipisicing elit",
          data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
        },{
          name: "World Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
          data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
        },{
          name: "Russian Federation Lorem ipsum dolor sit amet, consectetur adipisicing elit",
          data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
        },{
          name: "Haiti  Lorem ipsum dolor sit amet, consectetur adipisicing elits",
          data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
        }],
        axisDefaults:{
          crosshair:{
            visible:true,
          }
        },
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
          shared: true,
          sharedTemplate: kendo.template($("#template").html()),
          visible:true
        }
      });
    </script>    
```
