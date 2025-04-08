---
title: Creating Scatter Charts with Object Data and Legends in Kendo UI for jQuery
description: Learn how to create a Kendo UI for jQuery Scatter Chart using object data with legends that match data item colors.
type: how-to
page_title: How to Create Scatter Charts with Legends and Object Data in Kendo UI for jQuery
slug: create-scatter-charts-with-legends-and-object-data-kendo-ui-jquery
tags: kendo, ui, jquery, chart, scatter, legends, object, data, datasource, color
res_type: kb
ticketid: 1682349
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Chart</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Description

I need to create a scatter chart in Kendo UI for jQuery that utilizes object data and includes a legend. My data items are objects because I require additional information for tooltips, and my application needs to access the data later through the chart's dataSource.data(). Each data item must be grouped by a specific property, and the legend should display each unique group with its corresponding color. How can I achieve this functionality?

This knowledge base article also answers the following questions:
- How to group data in a Kendo UI for jQuery Scatter Chart?
- How to dynamically set series colors in a Kendo UI for jQuery Scatter Chart?
- How to match legend colors with series colors in a Kendo UI for jQuery Scatter Chart?

## Solution

To create a Kendo UI for jQuery Scatter Chart with object data and a corresponding legend, follow these steps:

1. Group your data by the specified property (e.g., `nameForGrouping`).
2. Set series colors dynamically based on your data items' `colourForGrouping` property.
3. Enable tooltips to display your custom `tooltipText`.
4. Use the `dataSource` option for the Chart to bind your object data.
5. Adjust legend colors to match series colors.

Here is an example of how you can set it up:

```dojo
<div id="chart"></div>
        <script>
            function createChart() {
                $("#chart").kendoChart({
                    dataSource: {
                      	data: [
                			{ id: "1", xValue: 20, yValue: 2000, tooltipText: "Unique tooltip text!", nameForGrouping: "pink", colourForGrouping: "#FFC0CB" },
                			{ id: "2", xValue: 3, yValue: 2010, tooltipText: "Different tooltip text!", nameForGrouping: "purple", colourForGrouping: "#800080" },
                			{ id: "3", xValue: 12, yValue: 2032, tooltipText: "Tooltip text for pink!", nameForGrouping: "pink", colourForGrouping: "#FFC0CB" },
                			{ id: "4", xValue: 37, yValue: 2030, tooltipText: "Tooltip for purple!", nameForGrouping: "purple", colourForGrouping: "#800080" }
            				],
                		group: { field: "nameForGrouping" }
                    },
                    title: {
                        text: "Scatter Chart with Object Data & Legend"
                    },
                    legend: {
                        position: "bottom"			
                    },
                    seriesDefaults: {
                        type: "scatter"
                    },
                    series: [{
                        xField: "xValue",
                        yField: "yValue",
                        name: "#= group.value #",
                        color: function(e) { return e.dataItem.colourForGrouping }
                    }],
                  dataBound: function(e) {
                    var chart = e.sender;
  		    chart.options.series[0].color = chart.options.series[0].data[0].colourForGrouping;
                    chart.options.series[1].color = chart.options.series[1].data[1].colourForGrouping;
                  },
                    xAxis: {
                        title: { text: "X Value" },
                        min: 0,
                        max: 40
                    },
                    yAxis: {
                        title: { text: "Y Value" },
                        min: 1995,
                        max: 2040
                    },
                    tooltip: {
                        visible: true,
                        template: "#= dataItem.tooltipText #"
                    }
                });
            }

            $(document).ready(createChart);
            $(document).bind("kendo:skinChange", createChart);
        </script>
```

Remember to use the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/databound) event to adjust the legend colors to match the series colors. This step is necessary because the legend colors are not automatically synced with the dynamic series colors.

## See Also

- [Official Kendo UI for jQuery Chart Documentation](https://docs.telerik.com/kendo-ui/controls/charts/overview/)
- [Kendo UI for jQuery Chart Series Colors Documentation](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.color)
- [Kendo UI for jQuery Chart dataBound API Documentation](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/databound)
