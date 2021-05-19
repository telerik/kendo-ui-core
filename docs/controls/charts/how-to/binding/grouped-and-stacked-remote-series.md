---
title: Create Stacked and Grouped Series Bound to Remote Data
page_title: Create Stacked and Grouped Series Bound to Remote Data | Kendo UI Charts
description: "Learn how to bind a Kendo UI Chart with multiple stack groups to remote data."
previous_url: /controls/charts/how-to/grouped-and-stacked-remote-series
slug: howto_stackedgroupedseriesremote_charts
---

# Create Stacked and Grouped Series Bound to Remote Data

To create Stacked and Grouped Chart series that are grouped to remote data:

1. Assign an unique Group ID value to each **Gender** / **Age Group** combination.
1. Set the stack name for each series to match the **Gender** field in the [`dataBound` event](/api/javascript/dataviz/ui/chart/events/databound).

To see the same scenario for inline data, refer to the [**Bar Charts / Stacked and grouped bars** demo](https://demos.telerik.com/kendo-ui/bar-charts/grouped-stacked-bar).

The following example demonstrates how to implement the steps previously described.

```dojo
    <div id="chart"></div>
    <script>
        var dataUrl = "https://www.mocky.io/v2/5bfc002c3100006f0039bbff";

        $("#chart").kendoChart({
            dataSource: {
                transport: {
                    read: {
                    url: dataUrl,
                    }
                },
                group: {
                    field: "groupId",
                    dir: "asc"
                }
            },
            series: [{
                type: "column",
                field: "value",
                categoryField: "year"
            }],
            seriesColors: ["#cd1533", "#d43851", "#dc5c71", "#e47f8f", "#eba1ad",
                           "#009bd7", "#26aadd", "#4db9e3", "#73c8e9", "#99d7ef"],
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
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
