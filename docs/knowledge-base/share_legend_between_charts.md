---
title: Share Legend Between Charts
description: How to create a shared legend to show and hide series in two or more charts
type: how-to
page_title: How to Create a Common Legend for Two Progress® Kendo UI® Charts
slug: share_legend_between_charts
position: 0
tags: chart, legend, series, kendo-ui
teampulseid:
ticketid: 1114263
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Chart for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress® Kendo UI® version</td>
  <td>2017.2.621</td>
 </tr>
</table>


## Description
I need a way to "share" a legend between two charts. Is there a way that if I click on the legend of one chart, it will hide/show the series of both charts?

## Solution

To achieve this, you can handle the [legendItemClick](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#events-legendItemClick) event of the first Chart and manually toggle the series visibility in the other Charts. The following snippet demonstrates such an approach:  
```html
<!DOCTYPE html>
<html>
  <head>
    <style>html { font-size: 14px; font-family: Arial, Helvetica, sans-serif; }</style>
    <title></title>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.2.621/styles/kendo.common.min.css" />
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.2.621/styles/kendo.material.min.css" />

    <script src="https://kendo.cdn.telerik.com/2017.2.621/js/jquery.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2017.2.621/js/kendo.all.min.js"></script>
  </head>
  <body>
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


  </body>
</html>
```

## Notes
If the series order may differ between Charts, you can also [access series by their name](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#methods-findSeriesByName).  