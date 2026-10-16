---
title: Show a Loading Spinner While Exporting the Grid to Excel
description: Learn how to display a loading indicator while the Kendo UI for jQuery Grid exports a large data set to Excel and hide it when the file is generated.
type: how-to
page_title: Show a Loading Spinner During Excel Export - Kendo UI for jQuery Data Grid
slug: show-loading-spinner-excel-export
tags: grid, excel, export, loading, spinner, indicator, progress, large data, saveasexcel, excelexport
res_type: kb
components: ["grid"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the {{ site.cdnVersion }} version</td>
 </tr>
</table>

## Description

When I export a large data set from the Grid to Excel, the file generation takes some time. How can I display a loading spinner while the file is being generated and hide it when the export completes? Is there an event that fires after the file is downloaded?

This KB also answers the following questions:

* Why should I call `saveAsExcel()` in a `setTimeout` callback after showing the loading indicator?
* How can I generate the workbook asynchronously and save it with `kendo.saveAs()`?
* How can I hide the loading indicator after workbook generation succeeds or fails?

## Solution

To display a loading spinner while exporting the Grid to Excel, you can use the [`excelExport`](/api/ui/grid/events/excelexport) event, which fires when the workbook configuration is ready and before the Excel file is generated. The [`saveAsExcel`](/api/ui/grid/methods/saveasexcel) method returns no promise and does not display a loading indicator. The built-in **Export to Excel** toolbar tool displays a loading indicator over the Grid.

The following example demonstrates the full implementation of the suggested approach. The Grid is bound to 20,000 records and exports all pages.

```dojo
<style>
    #grid {
        position: relative;
    }
</style>

<button id="export">Export to Excel</button>
<div id="grid"></div>

<script>
    var products = [];

    for (var i = 1; i <= 20000; i++) {
        products.push({
            ProductID: i,
            ProductName: "Product " + i,
            UnitPrice: (i % 100) + 0.99,
            UnitsInStock: i % 75,
            Discontinued: i % 7 === 0
        });
    }

    $("#export").kendoButton();

    $("#grid").kendoGrid({
        dataSource: {
            data: products,
            pageSize: 20
        },
        height: 550,
        pageable: true,
        excel: {
            fileName: "Products.xlsx",
            allPages: true
        },
        columns: [
            { field: "ProductID", title: "ID", width: 100 },
            { field: "ProductName", title: "Product Name" },
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 150 },
            { field: "UnitsInStock", title: "Units In Stock", width: 150 },
            { field: "Discontinued", width: 150 }
        ],
        excelExport: function(e) {
            var grid = e.sender;
            var workbook = new kendo.ooxml.Workbook(e.workbook);

            e.preventDefault();

            workbook.toDataURLAsync().done(function(dataURL) {
                kendo.saveAs({
                    dataURI: dataURL,
                    fileName: grid.options.excel.fileName
                });
            }).always(function() {
                kendo.ui.progress(grid.element, false);
            });
        }
    });

    $("#export").on("click", function() {
        var grid = $("#grid").data("kendoGrid");

        kendo.ui.progress(grid.element, true);

        setTimeout(function() {
            grid.saveAsExcel();
        });
    });
</script>
```

The greatest part of the delay for large data sets is the generation of the Excel file from the workbook. To display a loading indicator for that time when you export the Grid from custom code:

1. In the `click` handler of a custom **Export to Excel** button, display the loading indicator over the Grid by using the [`kendo.ui.progress`](/api/ui/ui/methods/progress) method.
1. Call the `saveAsExcel` method in a `setTimeout` callback, so that the browser renders the loading indicator before the export starts.

    ```
    $("#export").on("click", function() {
        var grid = $("#grid").data("kendoGrid");

        kendo.ui.progress(grid.element, true);

        setTimeout(function() {
            grid.saveAsExcel();
        });
    });
    ```

1. In the `excelExport` event handler, call `e.preventDefault()` to stop the built-in file saving.
1. Create a [`kendo.ooxml.Workbook`](/api/ooxml/workbook) from `e.workbook` and call its [`toDataURLAsync`](/api/ooxml/workbook/methods/todataurlasync) method to generate the file.
1. Save the file with the [`kendo.saveAs`](/api/kendo/methods/saveas) method and hide the loading indicator when the promise of `toDataURLAsync` is resolved or rejected.

    ```
    excelExport: function(e) {
        var grid = e.sender;
        var workbook = new kendo.ooxml.Workbook(e.workbook);

        e.preventDefault();

        workbook.toDataURLAsync().done(function(dataURL) {
            kendo.saveAs({
                dataURI: dataURL,
                fileName: grid.options.excel.fileName
            });
        }).always(function() {
            kendo.ui.progress(grid.element, false);
        });
    }
    ```

The loading indicator uses an animated image. When the browser is busy with the export on the main thread, the animation may pause until the file is generated.

## See Also

* [JavaScript API Reference of the jQuery Data Grid](/api/ui/grid)
* [Excel Export of the jQuery Data Grid]({% slug exporting_excel_kendoui_grid_widget %})
* [Excel Export Customization of the jQuery Data Grid]({% slug excelexport_customization_kendoui_grid %})
* [Display a Loading Indicator While Exporting a Hidden Grid to PDF]({% slug display-loading-indicator-grid-pdf %})
