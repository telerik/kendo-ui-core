---
title: Hide Series of the Pie Chart by Filtering the Grid
description: An example on how to show and hide series of the Kendo UI Pie Chart by filtering the Kendo UI Grid.
type: how-to
page_title: Filter Grid to Hide Chart Series | Kendo UI Grid for jQuery
slug: grid-filter-hides-series-chart
tags: grid, pie chart, filter, hide, series
ticketid: 1145170
res_type: kb
component: grid
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
		<td>Progress Kendo UI Chart</td>
	</tr>
</table>


## Description

How can I hide series from the Pie Chart by filtering the Grid and vice versa?

## Solution

To hide the Chart series by filtering the Grid:

1. In the [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filter) event handler of the Grid, based on the filters, programmatically click on the legend labels of the Chart.
1. In the [`legendItemClick`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/legenditemclick) event handler of the Chart, based on the hidden series, filter the Grid.

```dojo
<div id="grid"></div>
<div id="chart"></div>
<script>
    var hiddenChartSeries = [];
    var chartCategories = ["Category 1", "Category 2"]; //add all the categories here

    $("#grid").kendoGrid({
        columns: [{
                field: "type",
                filterable: {
                    operators: {
                        string: {
                            neq: "Not equal to"
                        }
                    }
                }
            },
            {
                field: "value",
                filterable: false
            }
        ],
        dataSource: [{
                type: "Category 1",
                value: 1
            },
            {
                type: "Category 2",
                value: 2
            }
        ],
        filterable: true,
        filter: function(e) {
            if (e.filter) {
                var chart = $("#chart").data("kendoChart");
                var grid = e.sender;
                var filters = e.filter.filters;
                var itemsToClick = [];

                filters.forEach(function(e) {
                    var currIndex = chartCategories.indexOf(e.value);
                    var hiddenCharSeriesCurrIndex = hiddenChartSeries.indexOf(currIndex);

                    if (hiddenCharSeriesCurrIndex === -1) {
                        itemsToClick.push(currIndex);
                        hiddenChartSeries.push(currIndex);
                    }
                });

                itemsToClick.forEach(function(e) {
                    //debugger;
                    chart._legendItemClick(0, e);
                });
            } else {
                var chart = $("#chart").data("kendoChart");
                hiddenChartSeries.forEach(function(e) {
                    chart._legendItemClick(0, e);
                });
                hiddenChartSeries = [];
            }
        }
    });
    $("#chart").kendoChart({
        series: [{
            type: "pie",
            categoryField: "type",
            data: [{
                    type: "Category 1",
                    value: 1
                },
                {
                    type: "Category 2",
                    value: 2
                }
            ]
        }],
        legendItemClick: function(e) {
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            var text = e.text;
            var dsFilter = dataSource.filter();
            var newFilter = {
                field: "type",
                operator: "neq",
                value: text
            };
            var removeFilterIndex = -1;
            var pointIndex = e.pointIndex;
            var hiddenCharSeriesCurrIndex = hiddenChartSeries.indexOf(pointIndex);

            if (hiddenCharSeriesCurrIndex === -1) {
                hiddenChartSeries.push(pointIndex)
            } else {
                hiddenChartSeries.splice(hiddenCharSeriesCurrIndex, 1)
            }

            if (dsFilter) {
                var currFilters = dsFilter.filters;
                currFilters.forEach(function(e) {
                    if (e.value === text) {
                        removeFilterIndex = currFilters.indexOf(e);
                    }
                });

                if (removeFilterIndex === -1) {
                    currFilters.push(newFilter);
                } else {
                    currFilters.splice(removeFilterIndex, 1);
                }
                dataSource.filter(currFilters);
            } else {
                dataSource.filter(newFilter)
            }
        }
    });
</script>
```
