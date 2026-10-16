---
title: Export Chart Data to CSV
description: Learn how to export the data of the Kendo UI for jQuery Chart to a CSV file.
type: how-to
page_title: Export Chart Data to CSV - Kendo UI for jQuery Chart
slug: chart-export-data-to-csv
tags: chart, export, csv, data, saveas, download
res_type: kb
components: ["chart"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the {{ site.cdnVersion }} version</td>
 </tr>
</table>

## Description

How can I export the data that is displayed in the Kendo UI for jQuery Chart to a CSV (comma-separated values) file?

This KB also answers the following questions:

* How to export the data of a Kendo UI for jQuery Chart to a CSV file.
* How to handle special characters and formatting when exporting to CSV.
* How to include the CSV BOM for proper encoding in Excel.

## Solution

To export the data behind the Chart, build the CSV content from the records of the Chart [`dataSource`](/api/dataviz/ui/chart/fields/datasource) and save the file with the [`kendo.saveAs`](/api/kendo/methods/saveas) method.

The following example demonstrates the full implementation of the suggested approach with a multi-series Column Chart.

```dojo
<button id="exportButton">Export to CSV</button>
<div id="chart"></div>

<script>
    function escapeCsvValue(value) {
        if (value === null || value === undefined) {
            return "";
        }

        var text = String(value);

        if (typeof value === "string" && /^[=+\-@]/.test(text)) {
            text = "'" + text;
        }

        if (/[",\r\n]/.test(text)) {
            text = '"' + text.replace(/"/g, '""') + '"';
        }

        return text;
    }

    function chartToCsv(chart) {
        var series = chart.options.series;
        var categoryField = series[0].categoryField;
        var data = chart.dataSource.data();
        var header = ["Month"];
        var lines = [];

        for (var i = 0; i < series.length; i++) {
            header.push(series[i].name);
        }

        lines.push(header.map(escapeCsvValue).join(","));

        for (var j = 0; j < data.length; j++) {
            var row = [data[j][categoryField]];

            for (var k = 0; k < series.length; k++) {
                row.push(data[j][series[k].field]);
            }

            lines.push(row.map(escapeCsvValue).join(","));
        }

        return lines.join("\r\n");
    }

    $("#chart").kendoChart({
        dataSource: {
            data: [
                { month: "Jan", north: 123, south: 165, west: 56 },
                { month: "Feb", north: 276, south: 210, west: 140 },
                { month: "Mar", north: 310, south: 287, west: 195 },
                { month: "Apr", north: 212, south: 144, west: 46 },
                { month: "May", north: 240, south: 190, west: 123 },
                { month: "Jun", north: 156, south: 167, west: 78 },
                { month: "Jul", north: 98, south: 212, west: 95 }
            ]
        },
        title: {
            text: "Sales by Region"
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            type: "column"
        },
        series: [
            { field: "north", categoryField: "month", name: "North, Central" },
            { field: "south", categoryField: "month", name: "South" },
            { field: "west", categoryField: "month", name: "West \"Pacific\"" }
        ],
        tooltip: {
            visible: true
        }
    });

    $("#exportButton").kendoButton({
        click: function() {
            var chart = $("#chart").data("kendoChart");
            var csv = chartToCsv(chart);
            var blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });

            kendo.saveAs({
                dataURI: blob,
                fileName: "chart-data.csv"
            });
        }
    });
</script>
```

The steps to export the chart data to CSV are as follows:

1. Get the records of the Chart DataSource by using the [`data`](/api/data/datasource/methods/data) method.
1. Use the [`categoryField`](/api/dataviz/ui/chart/configuration/series#seriescategoryfield), [`field`](/api/dataviz/ui/chart/configuration/series#seriesfield), and [`name`](/api/dataviz/ui/chart/configuration/series#seriesname) options of the series to define the CSV columns and headers.
1. Escape every value. Wrap values that contain commas, double quotes, or line breaks in double quotes and double any double quotes inside them. To prevent spreadsheet applications from evaluating text values as formulas, prefix text values that start with `=`, `+`, `-`, or `@` with an apostrophe.

    ```
    function escapeCsvValue(value) {
        if (value === null || value === undefined) {
            return "";
        }

        var text = String(value);

        if (typeof value === "string" && /^[=+\-@]/.test(text)) {
            text = "'" + text;
        }

        if (/[",\r\n]/.test(text)) {
            text = '"' + text.replace(/"/g, '""') + '"';
        }

        return text;
    }
    ```

1. Create a `Blob` with the `text/csv` content type and pass it to `kendo.saveAs` together with the file name. Prepend the UTF-8 byte order mark (BOM), `\uFEFF`, to the content so that Microsoft Excel detects the encoding and displays non-ASCII characters correctly.

    ```
    var blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });

    kendo.saveAs({
        dataURI: blob,
        fileName: "chart-data.csv"
    });
    ```

Browsers that do not support client-side file saving require a [server proxy]({% slug overview_savingfiles_kendoui %}). The proxy accepts only Base64-encoded data URIs. If you use the [`proxyURL`](/api/kendo/methods/saveas) option, convert the `Blob` to a data URI first, for example, with the `readAsDataURL` method of the `FileReader`.

If the Chart is bound to inline [`series.data`](/api/dataviz/ui/chart/configuration/series#seriesdata) arrays and [`categoryAxis.categories`](/api/dataviz/ui/chart/configuration/categoryaxis#categoryaxiscategories) instead of a DataSource, build the rows from `chart.options.categoryAxis.categories` and the `data` array of each series in `chart.options.series`.

## See Also

* [JavaScript API Reference of the jQuery Chart](/api/dataviz/ui/chart)
* [Export Chart Data to Excel]({% slug chart-export-data-to-excel-kendo-ui %})
* [Export of the jQuery Chart]({% slug exporting_kendoui_chart_widget %})
* [Saving Files]({% slug overview_savingfiles_kendoui %})
* [CSV Export of the jQuery Data Grid]({% slug exporting_csv_kendoui_grid_widget %})
