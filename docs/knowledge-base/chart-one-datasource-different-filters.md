---
title: Apply the Same Data on Different Chart Instances
description: An example on how to fetch data once and use it with different filters for different Kendo UI Charts for jQuery.
type: how-to
page_title: Fetch a Single Data Set with Different Filters for Different Charts | Kendo UI Chart for jQuery
slug: chart-one-datasource-different-filters
tags: fetch, same, data, apply, different, chart, instances
ticketid: 1424758
res_type: kb
---

## Environment

<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>Data Source for Progress® Kendo UI®</td>
	    </tr>
    </tbody>
</table>


## Description

How can I have a single POST from a data source, retrieve all possible data, and then filter the data in different ways for each Kendo UI Chart? When I apply filters or sorting on the data source, they get applied to all charts and other widgets that are attached to the same data source. How can I make those operations independent?

## Solution

1. Fetch the data with your own call (for example, `$.ajax()`).
1. When you have the data, instantiate the actual widgets and set a new instance of a Kendo UI Data Source to their `dataSource` field.
1. Provide the array of data you got from the service to the `data` field of the data source.
1. Individually set the desired filters, grouping, or sorting on each data source.

```dojo
<div id="chart1"></div>
<div id="chart2"></div>
<script>
    $.ajax({
        url: "/myActualEndpoint"
    }).always(function(realData) { //this uses always for the demo, use real code

        // In a real use-case scenario, you will get the real data here. This example hardcodes some
        // to demonstrate how to have independent data sources in the Charts based on remote data from a controller.

        var myData = [{
            field1: 10,
            field2: 3
        }, {
            field1: 20,
            field2: 7
        }, {
            field1: 15,
            field2: 6
        }];

        createCharts(myData);
    })

    function createCharts(theData) {

        $("#chart1").kendoChart({
            dataSource: new kendo.data.DataSource({
                data: theData,
                sort: [{ // apply desired data source operations
                        field: "field1",
                        dir: "desc"
                    }]
            }),
            series: [{
                field: "field1"
            }]
        });

        $("#chart2").kendoChart({
            dataSource: new kendo.data.DataSource({
                data: theData,
                filter: { // apply desired data source operations
                    filters: [{
                        field: "field2",
                        operator: "gt",
                        value: 5
                    }]
                },
            }),
            series: [{
                field: "field2"
            }]
        });
    }
</script>
```
