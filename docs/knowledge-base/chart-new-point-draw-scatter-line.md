---
title: Add New Points to a Scatter Line Chart
description: An example demonstrating how to dynamically draw points onto a Kendo UI Scatter Line Chart
type: how-to
page_title: Inserting Points into Scatter Line Chart - Kendo UI Chart for jQuery
slug: chart-new-point-draw-scatter-line
tags: chart, new, point, draw, scatter, line
ticketid: 1398949
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
 </tr>

  <td>Product Version</td>
  <td>2019.1.220</td>
 </tr>
</table>

## Description

How can I dynamically add points to a new series into a Kendo UI Scatter Line Chart?

## Solution

As an example of the desired scenario, enable the user to input information into two Kendo UI NumericTextBoxes (X and Y values) and click a button to add the point:

1. During the [`click` event](/api/javascript/ui/button/events/click), reference the Chart, its options, and the two NumericTextBoxes.  
1. Get the [values of the NumericTextBoxes](/api/javascript/ui/numerictextbox/methods/value).  
1. Create a series if it has not been created yet.
1. Push the new values into a global array.
1. Set the new series data to the array.
1. Call the [`redraw` method of the Chart](/api/javascript/dataviz/ui/chart/methods/redraw).

```javascript
var myarray = [];

function AddPoint(e){

  var chart =  $("#chart").data("kendoChart");  //1
  var chartOptions = chart.options;
  var inputXNumBox = $("#inputX").data("kendoNumericTextBox");
  var inputYNumBox = $("#inputY").data("kendoNumericTextBox");

  var xValue = inputXNumBox.value();  //2
  var yValue = inputYNumBox.value();

  if (!chartOptions.series[3]){  //3
    chartOptions.series.push({"name":"Your Data"});
  }
  myarray.push([xValue, yValue]);  //4
  chartOptions.series[3].data = myarray;  //5

  chart.redraw();  //6
}
```

```dojo
    <div id="example">
      <div class="demo-section k-content wide">
        <div id="chart"></div>

        <label for="inputX">X:</label>
        <input id="inputX" />

        <label for="inputY">Y:</label>
        <input id="inputY" />

        <button id="btnAddPoint" class="k-primary">Add Point to New Series</button>
      </div>
      <script>
        $( document ).ready(function() {

          $("#btnAddPoint").kendoButton({
            click: AddPoint
          });

          $("#chart").kendoChart({
            title: {
              text: "Draw on this Scatter Line Chart"
            },
            legend: {
              visible: true
            },
            seriesDefaults: {
              type: "scatterLine"
            },
            series: [{
              name: "0.8C",
              data: [[10, 10], [15, 20], [20, 25], [32, 40], [43, 50], [55, 60], [60, 70], [70, 80], [90, 100]]
            }, {
              name: "1.6C",
              data: [[10, 40], [17, 50], [18, 70], [35, 90], [47, 95], [60, 100]]
            }, {
              name: "3.1C",
              data: [[10, 70], [13, 90], [25, 100]]
            }],
            xAxis: {
              max: 90,
              labels: {
                format: "{0}m"
              },
              title: {
                text: "Time"
              }
            },
            yAxis: {
              max: 100,
              labels: {
                format: "{0}%"
              },
              title: {
                text: "Charge"
              }
            },
            tooltip: {
              visible: true,
              format: "{1}% in {0} minutes"
            }
          });

          $("#inputX").kendoNumericTextBox({
            decimals: 0,
            format: "n0"
          });

          $("#inputY").kendoNumericTextBox({
            decimals: 0,
            format: "n0"
          });
          var myarray = [];

          function AddPoint(e){

            var chart =  $("#chart").data("kendoChart");  //1
            var chartOptions = chart.options;
            var inputXNumBox = $("#inputX").data("kendoNumericTextBox");
            var inputYNumBox = $("#inputY").data("kendoNumericTextBox");

            var xValue = inputXNumBox.value();  //2
            var yValue = inputYNumBox.value();

            if (!chartOptions.series[3]){  //3
              chartOptions.series.push({"name":"Your Data"});
            }
            myarray.push([xValue, yValue]);  //4
            chartOptions.series[3].data = myarray;  //5

            chart.redraw();  //6
          }
        });

      </script>
    </div>
```
