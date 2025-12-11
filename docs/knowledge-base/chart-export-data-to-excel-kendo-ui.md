---
title: Exporting Chart Data to Excel - Kendo UI Chart
description: Learn how to implement the export to Excel functionality for a Kendo UI Chart.
type: how-to
page_title: Exporting Chart Data to Excel - Kendo UI Chart
slug: chart-export-data-to-excel-kendo-ui
tags: kendo ui, chart, export, excel
res_type: kb
components: ["chart"]
---

## Environment

| Product | Version |
|---------|---------|
| Progress® Kendo UI® Chart for jQuery | 2023.3.1114 |

## Description

I want to be able to export data from a Kendo UI Chart to Excel.  How can I achieve this?

## Solution

You can implement the export to Excel functionality for a Kendo UI Chart by following these steps:

1. Reference the [Kendo UI Chart and DataSource](/api/javascript/dataviz/ui/chart/fields/datasource).
2. Define the [column headers](https://docs.telerik.com/kendo-ui/framework/excel/get-started?#3-configure-the-workbook-settings) in a rows array.
3. Get the [Chart's DataSource data](/api/javascript/data/datasource/methods/data), and push it to the rows array.
4. Define a [Kendo UI ooxml.Workbook and include the rows](https://docs.telerik.com/kendo-ui/framework/excel/get-started?#2-instantiate-a-workbook).
5. Use the [Kendo.saveAs method](/api/javascript/kendo/methods/saveas) to [save the Excel file with the data](https://docs.telerik.com/kendo-ui/framework/excel/get-started?#4-convert-the-workbook-to-data-uri).

Here is an example of how to achieve this using JavaScript:

```Dojo
  <button id="exportButton">Export to Excel</button>
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/content/dataviz/js/spain-electricity.json",
              dataType: "json"
            }
          },
          sort: {
            field: "year",
            dir: "asc"
          }
        },
        title: {
          text: "Spain electricity production (GWh)"
        },
        legend: {
          position: "top"
        },
        seriesDefaults: {
          type: "column"
        },
        series:
        [{
          field: "nuclear",
          categoryField: "year",
          name: "Nuclear"
        }, {
          field: "hydro",
          categoryField: "year",
          name: "Hydro"
        }, {
          field: "wind",
          categoryField: "year",
          name: "Wind"
        }],
        categoryAxis: {
          labels: {
            rotation: -90
          },
          majorGridLines: {
            visible: false
          }
        },
        valueAxis: {
          labels: {
            format: "N0"
          },
          majorUnit: 10000,
          line: {
            visible: false
          }
        },
        tooltip: {
          visible: true,
          format: "N0"
        }
      });

      $("#exportButton").kendoButton({
        click: function(e){
          // Reference Chart
          let chart = $("#chart").data("kendoChart");

          // Reference Chart DataSource
          let chartDataSource = chart.dataSource;

          // Define Column Headers
          let rows = [{
            cells: [
              { value: "Year" },
              { value: "Nuclear" },
              { value: "Hydro" },
              { value: "Wind" }
            ]
          }];

          // Get DataSource Data
          let data = chartDataSource.data();

          for (var i = 0; i < data.length; i++){
            // Push single row for every record.
            rows.push({
              cells: [
                { value: data[i].year },
                { value: data[i].nuclear },
                { value: data[i].hydro },
                { value: data[i].wind }
              ]
            })
          }

          // Define Workbook
          var workbook = new kendo.ooxml.Workbook({
            sheets: [
              {
                columns: [
                  // Column settings (width).
                  { autoWidth: true },
                  { autoWidth: true },
                  { autoWidth: true },
                  { autoWidth: true }
                ],
                // The title of the sheet.
                title: "Chart Title",
                // The rows of the sheet.
                rows: rows
              }
            ]
          });

          workbook.toDataURLAsync().then(function(dataURL) {

            kendo.saveAs({
              dataURI: dataURL,
              fileName: "Test.xlsx"
            });
          });
        }
      });
    </script>
```

Please refer to this [Progress Kendo UI Dojo](https://dojo.telerik.com/aQiHeQaK) for a live example demonstrating this approach.

## See Also

* [Exporting DataSource](https://docs.telerik.com/kendo-ui/framework/excel/extract-datasoruce)
