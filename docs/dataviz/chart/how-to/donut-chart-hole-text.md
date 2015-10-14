---
title: Donut chart hole text
page_title: Donut chart hole text
description: Donut chart hole text
---

# Donut chart hole text

The example below demonstrates how to add text in the Donut chart center.

#### Example - Donut chart hole text

```html
    <div class="donut-wrapper">
      <div id="chart" class="donut-chart"></div>
      <div class="inner-content"></div>
    </div>

    <script>
	$(document).ready(function() {
       var data = [{
          category: "Asia",
          value: 3.6,
          color: "#a2ccef"
        },{
          category: "Europe",
          value: 2.4,
          color: "#eeeeef"
        }]

        var ds = new kendo.data.DataSource({
          data: data
        });

        $("#chart").kendoChart({
          title: {
            visible: false
          },
          dataSource: ds,
          legend: {
            visible: false
          },
          chartArea: {
            background: ""
          },
          seriesDefaults: {
            type: "donut",
            startAngle: 90,
            holeSize: 120,
          },
          series: [{
            name: "2011",
            field: "value"
          }],
          tooltip: {
            visible: true,
            template: "#= category # (#= series.name #): #= value #%"
          }
        });

        var text = "Custom Text"
        $(".inner-content").text(text);
	});
    </script>

 	<style>
      .donut-wrapper {
        position: relative;
        width: 280px;
        height: 280px;
        background-color: #3f3f3f;
      }

      /* Width and Height of the chart must be equal to the width and height of the .donut-wrapper in order to be horizontally and vertically centered  */
      .donut-chart {
        width: 280px; 
        height: 280px;
      }

      .inner-content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        font-size: 16px;
        line-height: 100px;
        vertical-align: middle;
        text-align: center;
        color: #a2ccef;
      }
    </style>
```
