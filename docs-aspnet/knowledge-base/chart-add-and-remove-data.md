---
title: Dynamically Add and Remove Data in the Chart
description: Learn how to dynamically add, remove, and randomize data points in the Telerik UI Chart for ASP.NET Core using the setOptions method, including a live-updating Candlestick Chart.
type: how-to
page_title: Add and Remove Data Dynamically in the Chart for {{ site.product }}
slug: chart-add-and-remove-data
tags: chart, add, remove, data, dynamic, setOptions, candlestick, live, update
res_type: kb
component: chart
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Chart</td>
 </tr>
</table>

## Description

How can I dynamically add data points, remove data points, randomize values, and stream live data into a Telerik UI for {{ site.product_short }} Chart?

## Solution

Use the `setOptions` client-side method to update the Chart series data at runtime. This works for any series type, including Line and Candlestick charts.

The following approach demonstrates how to:

1. Initialize the Chart using the HtmlHelper or TagHelper, then update it with data through the `setOptions` method on the client.
2. Add a single data point or a batch of data points to a Line Chart.
3. Remove the last data point from the series.
4. Randomize all existing data values.
5. Stream live Candlestick data at regular intervals with play/pause control.

### Line Chart Configuration

```HtmlHelper
@(Html.Kendo().Chart()
    .Name("lineChart")
    .HtmlAttributes(new { style = "height: 400px; border: 1px solid #dee2e6; border-radius: 4px;" })
    .Title("Volume Inspection")
    .Legend(legend => legend.Visible(false))
    .SeriesDefaults(seriesDefaults =>
        seriesDefaults.Line().Style(ChartLineStyle.Smooth)
    )
    .Series(series =>
    {
        series.Line(new double[] { 6, 5.47, 8, 5.24, 4.76, 4.72, 4.67, 5.05, 4.76, 3.96, 1, 6.1, 2.85 })
            .Name("East Asia & Pacific");
    })
    .CategoryAxis(axis => axis.MajorGridLines(lines => lines.Visible(false)))
    .ValueAxis(axis => axis.Numeric().Line(line => line.Visible(false)))
    .Tooltip(tooltip => tooltip.Visible(true).Format("{0}"))
)
```
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chart name="lineChart" style="height: 400px; border: 1px solid #dee2e6; border-radius: 4px;">
    <chart-title text="Volume Inspection"></chart-title>
    <chart-legend visible="false"></chart-legend>
    <series-defaults>
        <line style="ChartSeriesLineStyle.Smooth" />
    </series-defaults>
    <series>
        <series-item type="ChartSeriesType.Line"
            style="smooth"
            name="East Asia & Pacific"
            data='new double[] { 6, 5.47, 8, 5.24, 4.76, 4.72, 4.67, 5.05, 4.76, 3.96, 1, 6.1, 2.85 }'>
        </series-item>
    </series>
    <category-axis>
        <category-axis-item>
            <major-grid-lines visible="false" />
        </category-axis-item>
    </category-axis>
    <value-axis>
        <value-axis-item>
            <line visible="false" />
        </value-axis-item>
    </value-axis>
    <tooltip visible="true" format="{0}"></tooltip>
</kendo-chart>
```

### Candlestick Chart Configuration

```HtmlHelper
@(Html.Kendo().Chart()
    .Name("stockChart")
    .HtmlAttributes(new { style = "height: 600px; border: 1px solid #dee2e6; border-radius: 4px;" })
    .Title("The Boeing Company\nNYSE:BA")
    .Legend(legend => legend.Visible(false))
    .Series(series =>
    {
        series.Candlestick(new object[] { }).Name("Boeing");
    })
    .CategoryAxis(axis => axis
        .Labels(labels => labels.Rotation("auto"))
        .MajorGridLines(lines => lines.Visible(true))
    )
    .ValueAxis(axis => axis.Numeric().Line(line => line.Visible(false)))
    .Tooltip(tooltip => tooltip.Visible(true))
)
```

### Client-Side Dynamic Data Operations

The following JavaScript uses `setOptions` to add, remove, randomize data points, and stream live Candlestick data.

```JavaScript
var initialLineData = [6, 5.47, 8, 5.24, 4.76, 4.72, 4.67, 5.05, 4.76, 3.96, 1, 6.1, 2.85];

var stockData = [
    { Date: "2024-01", Close: 51.37, Open: 51.38, High: 51.46, Low: 41.63 },
    { Date: "2024-02", Close: 45.65, Open: 45.65, High: 45.87, Low: 42.16 },
    { Date: "2024-03", Close: 45.02, Open: 45.04, High: 45.07, Low: 41.05 }
    // ... additional data entries
];

$(document).on("kendoReady", function () {
    initLineChart();
    initStockChart();
});

function initLineChart() {
    var lineChart = $("#lineChart").data("kendoChart");

    lineChart.setOptions({
        transitions: false,
        series: [{
            type: "line", style: "smooth",
            name: "East Asia & Pacific",
            data: initialLineData.slice()
        }]
    });

    // Add a single data point.
    $("#addDataBtn").on("click", function () {
        var chart = $("#lineChart").data("kendoChart");
        var series = chart.options.series[0];
        var data = series.data.concat([parseFloat((Math.random() * 10).toFixed(2))]);
        chart.setOptions({
            series: [{ type: "line", style: "smooth", name: series.name, data: data }]
        });
    });

    // Add three data points at once.
    $("#addDatasetBtn").on("click", function () {
        var chart = $("#lineChart").data("kendoChart");
        var series = chart.options.series[0];
        var data = series.data.concat([
            parseFloat((Math.random() * 10).toFixed(2)),
            parseFloat((Math.random() * 10).toFixed(2)),
            parseFloat((Math.random() * 10).toFixed(2))
        ]);
        chart.setOptions({
            series: [{ type: "line", style: "smooth", name: series.name, data: data }]
        });
    });

    // Remove the last data point.
    $("#removeDataBtn").on("click", function () {
        var chart = $("#lineChart").data("kendoChart");
        var series = chart.options.series[0];
        if (series.data.length > 0) {
            chart.setOptions({
                series: [{ type: "line", style: "smooth", name: series.name, data: series.data.slice(0, -1) }]
            });
        }
    });

    // Randomize all data points.
    $("#randomizeBtn").on("click", function () {
        var chart = $("#lineChart").data("kendoChart");
        var series = chart.options.series[0];
        var data = series.data.map(function () {
            return parseFloat((Math.random() * 10).toFixed(2));
        });
        chart.setOptions({
            series: [{ type: "line", style: "smooth", name: series.name, data: data }]
        });
    });
}

function initStockChart() {
    var stockChart = $("#stockChart").data("kendoChart");

    stockChart.setOptions({
        transitions: false,
        series: [{
            type: "candlestick",
            openField: "Open", highField: "High", lowField: "Low", closeField: "Close",
            data: stockData.slice()
        }],
        categoryAxis: { field: "Date", labels: { rotation: "auto" } }
    });

    var isPlaying = true;
    var updateInterval = startStockUpdate();

    $("#togglePlayBtn").on("click", function () {
        if (isPlaying) {
            clearInterval(updateInterval);
        } else {
            updateInterval = startStockUpdate();
        }
        isPlaying = !isPlaying;
    });
}

function startStockUpdate() {
    return setInterval(function () {
        var chart = $("#stockChart").data("kendoChart");
        var series = chart.options.series[0];
        var currentData = series.data.slice();
        var lastDate = currentData[currentData.length - 1].Date;
        var sourceEntry = stockData[currentData.length % stockData.length];

        currentData.push({
            Date: incrementMonth(lastDate),
            Open: sourceEntry.Open, High: sourceEntry.High,
            Low: sourceEntry.Low, Close: sourceEntry.Close
        });

        chart.setOptions({
            series: [{
                type: "candlestick",
                openField: "Open", highField: "High", lowField: "Low", closeField: "Close",
                data: currentData
            }]
        });
    }, 1000);
}

function incrementMonth(dateStr) {
    var parts = dateStr.split("-");
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    month++;
    if (month > 12) { month = 1; year++; }
    return year + "-" + (month < 10 ? "0" : "") + month;
}
```

For a runnable example, refer to the [Chart Add and Remove Data demo](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Chart/AddAndRemoveData.cshtml).

## See Also

* [{{ site.framework }} Chart Documentation]({%slug htmlhelpers_charts_aspnetcore%})

* [{{ site.framework }} Chart Demos](https://demos.telerik.com/{{ site.platform }}/line-charts)

{% if site.core %}
* [{{ site.framework }} Chart Product Page](https://www.telerik.com/aspnet-core-ui/charts)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Chart Product Page](https://www.telerik.com/aspnet-mvc/charts)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
