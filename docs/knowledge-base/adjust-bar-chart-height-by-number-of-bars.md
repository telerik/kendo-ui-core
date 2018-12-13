---
title: Adjust the Chart Height Dynamically
description: An example on how to dynamically adjust the height of a Kendo UI Bar Chart depending on the number of the available bars.
type: how-to
page_title: Dynamically Adjust the Height According to the Number of Bars | Kendo UI Chart
slug: adjust-bar-chart-height-by-number-of-bars
tags: chart, bar chart, height, adjust, bars
ticketid: 1097053
res_type: kb
component: chart
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Chart</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I render a Bar Chart without previously knowing the number of bars for its final display?

## Solution

In such scenarios, it is helpful to adjust the size of the Chart depending on the number of series it contains.

To adjust the height of the Chart container:

1. Multiply the number of elements in the data by the desired amount of pixels.

1. Use the jQuery `css` method.

```dojo
	<div>
        <div id="chart"></div>
    </div>
    <script>
        function createChart() {
            /* Set chart container height */
         	  var data = [560, 630, 740, 910, 1170, 1380,100, 150, 100, 100, 300];
        	  var chartHeight = data.length * 50;
          	$("#chart").css("height", chartHeight);

            $("#chart").kendoChart({
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: "bar"
                },
                series: [{
                    data: data,
                    tooltip: {
                       position: "inside"
                    }
                }],
                valueAxis: {
                    max: 1400,
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: true
                    },
                    labels: {
                        rotation: "auto"
                    }
                },
                categoryAxis: {
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    majorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= value #",
                }
            });
        }

        $(document).ready(createChart);
        $(document).bind("kendo:skinChange", createChart);
    </script>
```

For the full implementation of the approach, refer to [this Dojo example](http://dojo.telerik.com/idiVu).

## See Also

* [jQuery css Method](https://www.w3schools.com/jquery/jquery_css.asp)
