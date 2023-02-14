---
title: Show PivotGrid Data in a Chart
description: "An example demonstrating how to render a Kendo UI Chart using the data of the PivotGrid."
type: how-to
page_title: Show PivotGrid Data in a Chart - Kendo UI Grid for jQuery
slug: pivotgrid-show-resize-data-in-chart
tags: pivotgrid, chart, data, bar, column
ticketid: 1359517
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® PivotGrid for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the 2021.3.1109 version</td>
 </tr>
</table>

## Description

I want to create a [`Kendo UI Chart`](/controls/charts/overview) using the data of the [`Kendo UI PivotGrid`](/controls/data-management/pivotgrid/overview). How can I achieve this?

## Solution

1. Define two separate [`views`](/api/javascript/view) for the PivotGrid and the Chart. Refer to the `showGrid()` and `showChart()` methods in the snippet below.
1. Convert the tree structure of the PivotGrid data to a simple array of objects. Refer to the `convertData()` method.
1. Create a [`Kendo UI DropDownList`](/controls/editors/dropdownlist/overview) which will be used to select the [`type`](/api/javascript/dataviz/ui/chart/configuration/series.type) of the chart.
1. Handle the [`change`](/api/javascript/ui/dropdownlist/events/change) event of the DropDownList to update the type of the displayed chart. Refer to the `fillChartPicker()` method.

This solution is courtesy of a Telerik Feedback Portal user. You can find the original post in the following thread:

[Feedback Portal: Chart chooser for PivotGrid](https://feedback.telerik.com/kendo-jquery-ui/1359517-chart-chooser-for-pivotgrid)

The following example demonstrates the full implementation of the suggested approach.

```dojo
<div id="app"></div>

<script>
    var layout = new kendo.Layout("<section id='content'></section>");

    $(document).ready(function () {
        layout.render($("#app"));
        showGrid(layout, dataSource);
    });
</script>

<script id="template" type="text/x-kendo-template">
			<div>
    			<div>Rows: #:rowText#</div>
    			<div>Columns: #:columnText#</div>
   				<div>Value: #:value ? value : "N/A" #</div>
      </div>
    </script>

<script id="pivotgrid">
    function showGrid(layout, dataSource) {
        var pivot = new kendo.View(
            "<input id=\"chartPicker\" value=\"View as chart\" style=\"margin: 0 0 10px 1px;\" /></div><div id=\"configurator\"></div><div id=\"pivotgrid\"></div>");

        layout.showIn("#content", pivot);

        var collapsed = {
            columns: [],
            rows: []
        };

        var pivotgrid = $("#pivotgrid").kendoPivotGrid({
            filterable: true,
            // gather the collapsed members
            collapseMember: function (e) {
                var axis = collapsed[e.axis];
                var path = e.path[0];

                if (axis.indexOf(path) === -1) {
                    axis.push(path);
                }
            },
            // gather the expanded members
            expandMember: function (e) {
                var axis = collapsed[e.axis];
                var index = axis.indexOf(e.path[0]);

                if (index !== -1) {
                    axis.splice(index, 1);
                }
            },
            sortable: true,
            columnWidth: 150,
            dataSource: dataSource,
            height: "100%"
        }).data("kendoPivotGrid");

        var configurator = $("#configurator").kendoPivotConfigurator({
            dataSource: pivotgrid.dataSource,
            filterable: true,
            sortable: true,
            height: "100%"
        }).getKendoPivotConfigurator();

        fillChartPicker(layout, pivotgrid.dataSource, collapsed);
    }
</script>

<script id="chart">
    function showChart(layout, dataSource, collapsed, chartType) {
        var chart = new kendo.View(
            "<div id=\"buttonMenu\"><button id=\"pivotView\" class=\"k-button k-button-icontext\" style=\"margin: 0 0 10px 1px;\">Show pivot grid</button>"
            + "<input id=\"chartPicker\" style=\"margin: 0 0 10px 1px;\" /></div>"
            + "<div id=\"chart\"></div>");

        layout.showIn("#content", chart);

        $("#pivotView").click(function () {
            showGrid(layout, dataSource);
        });

        fillChartPicker(layout, dataSource, collapsed);

        var data = convertData(dataSource, collapsed);
        var chart = $("#chart").data("kendoChart");

        if (!chart) {
            $("#chart").kendoChart({
                zoomable: true,
                pannable: true,
                dataSource: {
                    data: data,
                    group: "row"
                },
                seriesDefaults: {
                    type: chartType
                },
                series: [{
                    field: "measure",
                    name: "#= group.value # (category)",
                    categoryField: "column",
                    stack: true
                }],
                legend: {
                    position: "bottom"
                },
                valueAxis: {
                    labels: {
                        format: "${0}"
                    }
                },
                dataBound: function (e) {
                    e.sender.options.categoryAxis.categories.sort();
                }
            });
        } else {
            chart.dataSource.data(data);
        }
    }
</script>

<script id="chartPicker">
    var charts = [{
        text: "Column",
        type: "column",
        icon: "k-i-chart-column-clustered"
    }, {
        text: "Bar",
        type: "bar",
        icon: "k-i-chart-bar-clustered"
    }];

    function fillChartPicker(layout, dataSource, collapsed) {
        $("#chartPicker").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "type",
            template: "<span class='k-icon #=data.icon#'></span> #=data.text#",
            dataSource: charts,
            optionLabel: "Show as chart...",
            change: function () {
                var chartType = $("#chartPicker").val();
                if (chartType != "") {
                    showChart(layout, dataSource, collapsed, chartType);
                }
            }
        });
    }
</script>

<script id="dataSource">
    var dataSource = {
        type: "xmla",
        columns: [{
            name: "[Date].[Calendar]",
            expand: true
        }],
        rows: [{
            name: "[Product].[Category]",
            expand: true
        }],
        measures: ["[Measures].[Reseller Freight Cost]"],
        transport: {
            connection: {
                catalog: "Adventure Works DW 2008R2",
                cube: "Adventure Works"
            },
            read: "https://demos.telerik.com/olap/msmdpump.dll"
        },
        schema: {
            type: "xmla"
        },
        error: function (e) {
            alert("error: " + kendo.stringify(e.errors[0]));
        }
    };
</script>

<script id="functions">
    // function flatten the tree of tuples that datasource returns
    function flattenTree(tuples) {
        tuples = tuples.slice();
        var result = [];
        var tuple = tuples.shift();
        var idx, length, spliceIndex, children, member;

        while (tuple) {
            // required for multiple measures
            if (tuple.dataIndex !== undefined) {
                result.push(tuple);
            }

            spliceIndex = 0;
            for (idx = 0, length = tuple.members.length; idx < length; idx++) {
                member = tuple.members[idx];
                children = member.children;
                if (member.measure) {
                    [].splice.apply(tuples, [0, 0].concat(children));
                } else {
                    [].splice.apply(tuples, [spliceIndex, 0].concat(children));
                }
                spliceIndex += children.length;
            }

            tuple = tuples.shift();
        }

        return result;
    }

    // Check whether the tuple has been collapsed
    function isCollapsed(tuple, collapsed) {
        var name = tuple.members[0].parentName;

        for (var idx = 0, length = collapsed.length; idx < length; idx++) {
            if (collapsed[idx] === name) {
                return true;
            }
        }

        return false;
    }

    // the main function that convert PivotDataSource data into understandable for
    // the Chart widget format
    function convertData(dataSource, collapsed) {
        var columnTuples = flattenTree(dataSource.axes().columns.tuples || [],
            collapsed.columns);
        var rowTuples = flattenTree(dataSource.axes().rows.tuples || [],
            collapsed.rows);
        var data = dataSource.data();
        var rowTuple, columnTuple;

        var idx = 0;
        var result = [];
        var columnsLength = columnTuples.length;

        for (var i = 0; i < rowTuples.length; i++) {
            rowTuple = rowTuples[i];

            if (!isCollapsed(rowTuple, collapsed.rows)) {
                for (var j = 0; j < columnsLength; j++) {
                    columnTuple = columnTuples[j];

                    if (!isCollapsed(columnTuple, collapsed.columns)) {
                        if (idx > columnsLength && idx % columnsLength !== 0) {
                            result.push({
                                measure: Number(data[idx].value),
                                column: columnTuple.members[0].caption,
                                row: rowTuple.members[0].caption
                            });
                        }
                    }
                    idx += 1;
                }
            }
        }

        return result;
    }
</script>
```