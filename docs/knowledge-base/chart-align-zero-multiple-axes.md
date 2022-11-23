---
title: Align Zero With Multiple Axes in Chart
page_title: Align Zero With Multiple Axes in Chart - Kendo UI Chart for jQuery
description: An example on how to align the zero value for multiple value axes in a Kendo UI Chart.
type: how-to
slug: chart-align-zero-multiple-axes
tags: chart, align, zero, multiple, axes
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Chart for Progress® Kendo UI®</td>
 </tr>
</table>

## Description

I have a chart with multiple axes. One has negative values and the other does not. I want the zero on the two axes to be aligned and to show the negative values on one axis.

## Solution

1. Update the [min](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/valueaxis.min) and [max](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/valueaxis.max) setting for the value axes so they include both positive and negative values.
1. Specify a function for the [valueAxis.labels.template](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/valueaxis.labels#valueaxislabelstemplate) of the axes where only positive values should be displayed. 
1. Check the values in the template handler and return only the positive values. For the negative values return an empty string.


```dojo
<div id="chart"></div>
</div>

<script>
    function onlyPositive(e) {
        if (e.value < 0) {
            return '';
        }

        return e.value;
    }


    $("#chart").kendoChart({
        title: {
            text: "Hybrid car mileage report"
        },
        legend: {
            position: "top"
        },
        series: [{
            type: "column",
            data: [20, 40, 45, 30, 50],
            stack: true,
            name: "on battery",
            color: "#cc6e38"
        }, {
            type: "column",
            data: [20, 30, 35, 35, 40],
            stack: true,
            name: "on gas",
            color: "#ef955f"
        }, {
            type: "line",
            data: [30, 38, 40, 32, 42],
            name: "mpg",
            color: "#ec5e0a",
            axis: "mpg"
        }, {
            type: "line",
            data: [-7.8, 6.2, 5.9, 7.4, 5.6],
            name: "l/100 km",
            color: "#4e4141",
            axis: "l100km"
        }],
        valueAxes: [{
            title: { text: "miles" },
            min: -100,
            max: 100,
            labels: { template: onlyPositive }
        }, {
            name: "km",
            title: { text: "km" },
            min: -192,
            max: 192,
            majorUnit: 32,
            labels: { template: onlyPositive }
        }, {
            min: -60,
            max: 60,
            name: "mpg",
            title: { text: "miles per gallon" },
            color: "#ec5e0a",
            labels: { template: onlyPositive }
        }, {
            name: "l100km",
            title: { text: "liters per 100km" },
            color: "#4e4141"
        }],
        categoryAxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            // Align the first two value axes to the left
            // and the last two to the right.
            //
            // Right alignment is done by specifying a
            // crossing value greater than or equal to
            // the number of categories.
            axisCrossingValues: [0, 0, 10, 10]
        }
    }); 

</script>
```
