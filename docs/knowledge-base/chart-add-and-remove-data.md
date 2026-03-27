---
title: Dynamically Add and Remove Data in the Chart
description: Learn how to dynamically add, remove, and randomize data points in the Kendo UI for jQuery Chart using the setOptions method, including a live-updating Candlestick Chart.
type: how-to
page_title: Add and Remove Data Dynamically - Kendo UI for jQuery Chart
slug: chart-add-and-remove-data
tags: chart, add, remove, data, dynamic, setOptions, candlestick, live, update
res_type: kb
components: ["chart"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
 </tr>
</table>

## Description

How can I dynamically add data points, remove data points, randomize values, and stream live data into a Kendo UI for jQuery Chart?

## Solution

Use the [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/methods/setoptions) method to update the Chart series data at runtime. This approach works for any series type, including Line and Candlestick charts.

The following approach demonstrates how to:

1. Add a single data point or a batch of data points to a Line Chart.
2. Remove the last data point from the series.
3. Randomize all existing data values.
4. Stream live Candlestick data at regular intervals with play/pause control.

### Line Chart with Dynamic Data

```javascript
var initialLineData = [6, 5.47, 8, 5.24, 4.76, 4.72, 4.67, 5.05, 4.76, 3.96, 1, 6.1, 2.85];

$("#lineChart").kendoChart({
    title: { text: "Volume Inspection" },
    legend: { visible: false },
    seriesDefaults: { line: { style: "smooth" } },
    transitions: false,
    series: [{
        type: "line",
        style: "smooth",
        name: "East Asia & Pacific",
        data: initialLineData.slice()
    }],
    categoryAxis: { majorGridLines: { visible: false } },
    valueAxis: { line: { visible: false } },
    tooltip: { visible: true, format: "{0}" }
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
        var data = series.data.slice(0, -1);
        chart.setOptions({
            series: [{ type: "line", style: "smooth", name: series.name, data: data }]
        });
    }
});

// Randomize all existing data points.
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
```

### Candlestick Chart with Live Data

```javascript
var stockData = [
    { Date: "2024-01", Close: 51.37, Open: 51.38, High: 51.46, Low: 41.63 },
    { Date: "2024-02", Close: 45.65, Open: 45.65, High: 45.87, Low: 42.16 },
    { Date: "2024-03", Close: 45.02, Open: 45.04, High: 45.07, Low: 41.05 }
    // ... additional data entries
];

$("#stockChart").kendoChart({
    title: { text: "The Boeing Company\nNYSE:BA" },
    legend: { visible: false },
    transitions: false,
    series: [{
        type: "candlestick",
        openField: "Open",
        highField: "High",
        lowField: "Low",
        closeField: "Close",
        data: stockData.slice()
    }],
    categoryAxis: { field: "Date", labels: { rotation: "auto" } },
    valueAxis: { line: { visible: false } },
    tooltip: { visible: true }
});

var isPlaying = true;
var updateInterval = setInterval(appendCandlestick, 1000);

function appendCandlestick() {
    var chart = $("#stockChart").data("kendoChart");
    var series = chart.options.series[0];
    var currentData = series.data.slice();
    var lastDate = currentData[currentData.length - 1].Date;
    var sourceEntry = stockData[currentData.length % stockData.length];

    currentData.push({
        Date: incrementMonth(lastDate),
        Open: sourceEntry.Open,
        High: sourceEntry.High,
        Low: sourceEntry.Low,
        Close: sourceEntry.Close
    });

    chart.setOptions({
        series: [{
            type: "candlestick",
            openField: "Open",
            highField: "High",
            lowField: "Low",
            closeField: "Close",
            data: currentData
        }]
    });
}

// Toggle play/pause.
$("#togglePlayBtn").on("click", function () {
    if (isPlaying) {
        clearInterval(updateInterval);
    } else {
        updateInterval = setInterval(appendCandlestick, 1000);
    }
    isPlaying = !isPlaying;
});

function incrementMonth(dateStr) {
    var parts = dateStr.split("-");
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    month++;
    if (month > 12) { month = 1; year++; }
    return year + "-" + (month < 10 ? "0" : "") + month;
}
```

For a runnable example, refer to this [Chart Add and Remove Data dojo sample](https://dojo.telerik.com/mfQHkwuh).

## See Also

* [Chart setOptions() Method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/methods/setoptions)
* [Chart Series Configuration](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series)
* [Kendo UI for jQuery Chart Demos](https://demos.telerik.com/kendo-ui/line-charts)
