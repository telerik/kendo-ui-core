---
title: Same data on different chart instances
description: how to fetch data once and use it with different filters for different charts
type: how-to
page_title: One data set with different filters for different charts
slug: chart-one-datasource-different-filters
position: 
tags: 
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
I want to have a single POST from a datasource retrieve all the possible data and then filter it in different ways for each chart. 

Applying filters or sorting on the data source, however, applies them to all charts (or other widgets) attached to the same data source. How can I make those operations independent?

## Solution
1. Fetch the data with your own call (e.g., `$.ajax()`)
1. When you have the data, instantiate the actual widgets, and set a new instance of a Kendo Data Source to their `dataSource` field.
1. Provide the array of data you got from the service to the `data` field of the data source.
1. Set the desired filters/grouping/sorting on each data source individually

```dojo
<div id="chart1"></div>
<div id="chart2"></div>
<script>
    $.ajax({
        url: "/myActualEndpoint"
    }).always(function(realData) { //this uses always for the demo, use real code
      
        //in a real case, you should get the real data here. In this example, we will hardcode some
        //to show how to have independend data sources in the charts based on remote data from a controller

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

