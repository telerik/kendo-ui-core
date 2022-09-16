---
title: Show empty Pie when no data available
description: An example on how to show an empty pie chart when no data is available.
type: how-to
page_title: Render Blank Pie Chartwhen no data | Kendo UI Chart for jQuery
slug: chart-show-empty-pie-when-no-data
tags: chart, pie, empty, blank, no data
ticketid: 1167421
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Created with Product Version</td>
		<td>2018.1.221</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Chart</td>
	</tr>
</table>


## Description

When my dataset is empty the pie chart is not showing. I want to show a blank pie chart when no data is found(i.e dataset is empty). What can I do?

## Solution

We have a [how-to article]({% slug howto_showemptymessage_whencharthasnodata_charts %}) which shows a similar case - when there is no data, an overlay is displayed.

1. Modify the article above to use a circle with some text in using any CSS styles to alter it. 
1. Add a handler to the `dataBound` event of the chart and check if there is any data(the article uses the data source [`view()`](/api/javascript/data/datasource/methods/view) method). 
1. If there is data, hide the overlay:

    ```
        dataBound: function (e) {
          var view = e.sender.dataSource.view();
          $(".overlay").toggle(view.length === 0);
        }
    ```

The following example demonstrates how to toggle a circle overlay when there is no data in the Pie Chart.

```dojo
    <div id="container">
      <div id="chart"></div>
      <div class="overlay">
        <div id="circle"><div id="no-data-text">No data available</div></div>
      </div>
    </div>
    <script>
      $("#chart").kendoChart({
        title: {
          text: "Exam Details"
        },
        legend: {
          visible: true,
          position: "top"
        },
        dataSource: { 
          transport: {
            read: function(e) {
              setTimeout(function() {
                e.success([{PrimaryModality:"A",ModalityCount:2},{PrimaryModality:"B",ModalityCount:3}]);
              }, 1500);
            }
          },
          aggregate: { field: "ModalityCount", aggregate: "sum" }
        },
        seriesDefaults: {
          labels: {
            position: "center",
            visible: true,
            background: "transparent",
            template: "#= category # \n #= value#"
          }
        },
        series: [{
          type: "pie",
          field: "ModalityCount",
          categoryField: "PrimaryModality"
        }],
        tooltip: {
          visible: true,
          template: "${ category } - ${ value }%"
        },
        dataBound: function (e) {
          var view = e.sender.dataSource.view();
          $(".overlay").toggle(view.length === 0);
        }
      });
    </script>
    <style>
      #circle {
        height: 222px;
        width: 222px;
        font-size: 20px;
        border-radius: 50%;
        line-height: 200px;
        margin: 0 auto;
        cursor: default;
        border: 1px solid #999;
        position: relative;
        top: 10%;
        background-color: lightgrey;
      }
      .container {
        position: relative;
      }
      .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;     
        text-align: center;
      }
    </style>
```