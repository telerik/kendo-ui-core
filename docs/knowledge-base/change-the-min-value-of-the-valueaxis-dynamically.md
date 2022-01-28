---
title: Set the Min Value of the ValueAxis Dynamically
page_title: Change the Min Value of the ValueAxis Dynamically | Kendo UI Chart for jQuery
description: An example on how to dynamically set the min value of the valueAxis in the Kendo UI Chart.
type: how-to
slug: change-the-min-value-of-the-valueaxis-dynamically
tags: chart, valueaxis, min, dynamically
ticketid: 1125680
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
  <td>Windows 2008 Server R2</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>60.0</td>
 </tr>
</table>

## Description

How can I dynamically set the min value of the `valueAxis` when the data or the visible Chart series are changed?

## Solution

1. Loop through the visible series values.
1. Based on the visible lines, set the minimum value on the [`render`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/render) event of the Chart.  

For the full implementation, refer to [this Dojo example](https://dojo.telerik.com/ukITOJ/2).

```
   <div id="example">
      <div class="demo-section k-content wide">
        <div id="chart" style="background: center no-repeat url('../content/shared/styles/world-map.png');"></div>
      </div>
      <script>

        function createChart() {
          $("#chart").kendoChart({
            render:function(e){
              var currentMin = 100000;
              var series = e.sender.options.series
              for (let i = 0; i<series.length; i++){
                for(let k = 0; k <series[i].data.length; k++){
                  if(series[i].data[k] < currentMin && series[i].visible == true ){                    
                    currentMin = series[i].data[k]
                  }
                }                   
              }
              var oldMin = e.sender.options.valueAxis.min
              if(oldMin != currentMin){
                e.sender.options.valueAxis.min = currentMin;     
                e.sender.redraw()
              }
            },
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
              name: "India",
              data: [-1.66, 1.55, 1.848, 1.284, 1.263, 1.801, 1.890, 1.238, 1.552, 12.855]
            },{
              name: "World",
              data: [1.988, 1.733, 1.994, 1.464, 1.001, 1.939, 1.333, 1.245, 1.339, 1.727]
            },{
              name: "Russian Federation",
              data: [1.743, 1.295, 1.175, 1.376, 1.153, 1.535, 1.247, 1.832, 1.3, 1.3]
            },{
              name: "Haiti",
              data: [1.253, 1.362, 1.519, 1.799, 1.252, 1.343, 1.843, 1.877, 1.416, 1.590]
            }],
            valueAxis: {
              min:0,
              labels: {
                format: "{0:n2}"
              },
              line: {
                visible: false
              }
            },
            categoryAxis: {
              categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
              majorGridLines: {
                visible: false
              },
              labels: {
                rotation: "auto"
              }
            }
          });
        }

        $(document).ready(createChart);
        $(document).bind("kendo:skinChange", createChart);
      </script>
    </div>
```
