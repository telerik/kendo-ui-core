---
title: Create Stacked and Grouped Series Bound to Remote Data in Charts
page_title: Create Stacked and Grouped Series Bound to Remote Data in Charts
description: "Learn how to bind a Kendo UI Chart with multiple stack groups to remote data."
previous_url: /controls/charts/how-to/grouped-and-stacked-remote-series
slug: howto_stackedgroupedseriesremote_charts
tags: chart, create, stacked, grouped, series, bound, to, remote, data
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI Grid for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2025.2.520</td>
</tr>
</tbody>
</table>

## Description

How can I create Stacked and Grouped Chart series that are grouped to remote data?

## Solution

To implement this scenario:

1. Assign an unique Group ID value to each **Gender** / **Age Group** combination.
1. Set the stack name for each series to match the **Gender** field in the [`dataBound` event](/api/javascript/dataviz/ui/chart/events/databound).

To see the same scenario for inline data, refer to the [Bar Charts / Stacked and grouped bars demo](https://demos.telerik.com/kendo-ui/bar-charts/grouped-stacked-bar).

The following example demonstrates how to implement the steps previously described.

```dojo
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            dataSource: {
                transport: {
                    read: {
                    url: "https://runner.telerik.io/fullscreen/NwWpHzwQ.json",
                    }
                },
                group: {
                    field: "groupId",
                    dir: "asc"
                }
            },
            series: [{
                type: "column",
                field: "num",
                categoryField: "year"
            }],
            seriesColors: ["#cd1533", "#d43851", "#dc5c71", "#009bd7", "#26aadd", "#93d4ed" ],
            dataBound: function(e) {
                var series = e.sender.options.series;
                for (var i = 0; i < series.length; i++) {
                    series[i].stack = series[i].data[0].gender;
                }
            }
        });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
