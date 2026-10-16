---
title: Display a Loading Indicator While Exporting a Hidden Grid to PDF
description: Learn how to display a loading indicator over the visible Kendo UI for jQuery Grid while a hidden Grid is exported to PDF.
type: how-to
page_title: Display a Loading Indicator During PDF Export - Kendo UI for jQuery Data Grid
slug: display-loading-indicator-grid-pdf
tags: grid, pdf, export, loading, indicator, spinner, progress, hidden grid, saveaspdf
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

You want to display a loading indicator over the visible Grid while a hidden Grid is exported to a PDF document.

This KB also answers the following questions:

* Why should the export Grid be positioned off-screen instead of hidden with `display: none`?
* Why should the loading indicator appear over the visible Grid during export?
* When is the export promise available in the `pdfExport` event?

## Solution

You can export a hidden Grid when the PDF document has to contain different data or columns from the Grid that is rendered on the page. The built-in **Export to PDF** toolbar tool displays a loading indicator over the Grid that is exported. However, the [`saveAsPDF`](/api/ui/grid/methods/saveaspdf) method does not display a loading indicator, and any indicator over a hidden Grid is not visible to the user.

The following example demonstrates the full implementation of the suggested approach. The visible Grid shows a single page with three columns, while the hidden Grid exports all records with an additional column.

```dojo
<script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>

<style>
    #grid {
        position: relative;
    }

    #exportGrid {
        position: absolute;
        top: 0;
        left: -10000px;
        width: 1000px;
    }
</style>

<button id="export">Export to PDF</button>
<div id="grid"></div>
<div id="exportGrid"></div>

<script>
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: "https://demos.telerik.com/service/v2/core/Products"
        },
        pageSize: 10
    });

    $("#export").kendoButton();

    $("#grid").kendoGrid({
        dataSource: dataSource,
        height: 450,
        pageable: true,
        columns: [
            { field: "ProductName", title: "Product Name" },
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 150 },
            { field: "UnitsInStock", title: "Units In Stock", width: 150 }
        ]
    });

    $("#exportGrid").kendoGrid({
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Products"
            },
            pageSize: 10
        },
        pageable: true,
        pdf: {
            fileName: "Products.pdf",
            allPages: true,
            paperSize: "A4",
            landscape: true,
            margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" }
        },
        columns: [
            { field: "ProductID", title: "ID", width: 80 },
            { field: "ProductName", title: "Product Name" },
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 150 },
            { field: "UnitsInStock", title: "Units In Stock", width: 150 },
            { field: "Discontinued", width: 150 }
        ]
    });

    $("#export").on("click", function() {
        var visibleGrid = $("#grid");
        var exportGrid = $("#exportGrid").data("kendoGrid");

        kendo.ui.progress(visibleGrid, true);

        setTimeout(function() {
            exportGrid.saveAsPDF().always(function() {
                kendo.ui.progress(visibleGrid, false);
            });
        });
    });
</script>
```

To display a loading indicator over the visible Grid:

1. Render the Grid that you will export outside of the visible area of the page. The Drawing library cannot draw elements that have the `display: none` or `visibility: hidden` styles, so position the Grid off-screen instead.

    ```
    #exportGrid {
        position: absolute;
        top: 0;
        left: -10000px;
        width: 1000px;
    }
    ```

1. Set the `position: relative` style to the visible Grid, so that the loading overlay covers only the Grid.
1. In the `click` handler of a custom **Export to PDF** button, display the loading indicator over the visible Grid by using the [`kendo.ui.progress`](/api/ui/ui/methods/progress) method.
1. Call the `saveAsPDF` method of the hidden Grid in a `setTimeout` callback, so that the browser renders the loading indicator before the export starts.
1. Hide the loading indicator when the promise that `saveAsPDF` returns is resolved or rejected.

    ```
    $("#export").on("click", function() {
        var visibleGrid = $("#grid");
        var exportGrid = $("#exportGrid").data("kendoGrid");

        kendo.ui.progress(visibleGrid, true);

        setTimeout(function() {
            exportGrid.saveAsPDF().always(function() {
                kendo.ui.progress(visibleGrid, false);
            });
        });
    });
    ```

The same promise is available in the event data of the [`pdfExport`](/api/ui/grid/events/pdfexport) event as `e.promise`. If you call `e.preventDefault()` in the `pdfExport` event handler, `saveAsPDF` returns no promise.

The loading indicator uses an animated image. When the browser is busy with the export on the main thread, the animation may pause until the export completes.

## See Also

* [JavaScript API Reference of the jQuery Data Grid](/api/ui/grid)
* [PDF Export of the jQuery Data Grid]({% slug exporting_pdf_kendoui_grid_widget %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Show a Loading Spinner While Exporting the Grid to Excel]({% slug show-loading-spinner-excel-export %})
