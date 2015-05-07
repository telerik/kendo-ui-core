---
title: Excel Export
description: Kendo UI Grid Excel Export feature
---

# Excel Export

Kendo UI Grid can export its data as Excel document since the Q3 2014 (2014.3.1119) version.

- [Enable Excel Export](#enable-excel-export)
- [What is Exported](#what-is-exported)
- [How To](#how-to)
    - [Export All Data](#export-all-data)
    - [Customize the Excel Document](#customize-the-excel-document)
    - [RTL](#rtl)
    - [Column Templates](#column-templates)
    - [Column Format](#column-format)
    - [Detail Template](#detail-template)
    - [Export Multiple Grids](#export-multiple-grids)
    - [Save File on Server](#save-file-on-server)
- [Troubleshooting](#troubleshooting)
- [Further Reading](#further-reading)

## Enable Excel Export

To enable Excel export include the corresponding toolbar command and configure the export settings.

* [Toolbar configuration](/api/javascript/ui/grid#configuration-toolbar)
* [Excel export configuration](/api/javascript/ui/grid#configuration-excel)
* [Online demo](http://demos.telerik.com/kendo-ui/grid/excel-export)

#### Example - enable Excel export

```html
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            fileName: "Kendo UI Grid Export.xlsx"
        },
        dataSource: {
            type: "odata",
            transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
            },
            pageSize: 7
        },
        sortable: true,
        pageable: true,
        columns: [
            { width: 300, field: "ProductName", title: "Product Name" },
            { field: "UnitsOnOrder", title: "Units On Order" },
            { field: "UnitsInStock", title: "Units In Stock" }
        ]
    });
</script>
```

To initiate Excel export via code call the [saveAsExcel](/api/javascript/ui/grid.html#methods-saveAsExcel) method.


## What is Exported

With the default configuration Kendo UI Grid exports the current page of the data with sorting, filtering, grouping and aggregates applied. [Export All Data](#export-all-data) shows how to export all pages.

The grid uses the current column order, visibility and dimensions to generate the Excel file.

The grid doesn't export the current CSS theme in the Excel file. Check [Customize the Excel Document](#customize-the-excel-document) for information about changing the visual appearance of the Excel document.

The grid exports only data-bound columns. All columns that don't have their [field](/api/javascript/ui/grid#configuration-columns.field) option set are ignored.

The [format](/api/javascript/ui/grid#configuration-columns.format) option is **not** used during export. Check [Column Format](#column-format) for more info.

The [template](/api/javascript/ui/grid#configuration-columns.template) option is **not** used during export. Check [Column Templates](#column-templates) for more info.

The [detailTemplate](/api/javascript/ui/grid#configuration-detailTemplate) option is **not** used during export. Check [Detail Template](#detail-template) for more info.

## How To

### Export all data

By default the Kendo UI Grid exports only the current page of data. To export all pages set the [allPages](/api/javascript/ui/grid#configuration-excel.allPages) option to `true`.

> When the `allPages` option is set to `true` and `serverPaging` is enabled the grid will make a "read" request for **all** data. In case the data items are too many the browser may become unresponsive. Consider implementing server-side export for such cases.

#### Example - export all data
```html
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            allPages: true
        },
        dataSource: {
            type: "odata",
            transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
            },
            pageSize: 7
        },
        pageable: true,
        columns: [
            { width: 300, field: "ProductName", title: "Product Name" },
            { field: "UnitsOnOrder", title: "Units On Order" },
            { field: "UnitsInStock", title: "Units In Stock" }
        ]
    });
</script>
```
### Customize the Excel Document

The [excelExport](/api/javascript/ui/grid#events-excelExport) event allows customization of the generated Excel document.
The `workbook` event argument exposes the generated Excel workbook configuration.

To understand how Excel documents work check the [Excel Introduction](/framework/excel/introduction#create-excel-document) help topic.

The [Color Alternating Rows](/web/grid/how-to/excel/alternating-rows) tutorial shows one way to customize the generated Excel document.

### RTL

The [excelExport](/api/javascript/ui/grid#events-excelExport) event allows reversing the cells and setting the text alignment in order to support right-to-left languages.

#### Example - RTL export
```html
<div class="k-rtl">
  <div id="grid" ></div>
</div>
<script>
  $("#grid").kendoGrid({
    toolbar: ["excel"],
    excel: {
      allPages: true
    },
    dataSource: {
      type: "odata",
      transport: {
        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
      },
      pageSize: 7
    },
    excelExport: function(e) {
      var sheet = e.workbook.sheets[0];
      for (var i = 0; i < sheet.rows.length; i++) {
        sheet.rows[i].cells.reverse();
        for (var ci = 0; ci < sheet.rows[i].cells.length; ci++) {
          sheet.rows[i].cells[ci].hAlign = "right";
        }
      }
    },
    pageable: true,
    columns: [
      { width: 300, field: "ProductName", title: "Product Name" },
      { field: "UnitsOnOrder", title: "Units On Order" },
      { field: "UnitsInStock", title: "Units In Stock" }
    ]
  });
</script>
```

### Column Templates

Kendo UI Grid doesn't use [column templates](/api/javascript/ui/grid#configuration-columns.template) during Excel export - it exports only the data. The reason is simple - a column template may contain arbitrary HTML which can't be converted to Excel column values.

The [Column Template](/web/grid/how-to/excel/column-template-export) tutorial shows how to use a column template that doesn't contain HTML.

### Column Format

Kendo UI Grid doesn't use [column formats](/api/javascript/ui/grid.html#configuration-columns.format) during Excel export because some Kendo UI formats are incompatible with Excel.

To format the cell values set the [format](/api/javascript/ooxml/workbook.html#configuration-sheets.rows.cells.format) option of the cells.

The [Create a custom number format](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4) page describes the formats that Excel supports.

The [Cell Format](/web/grid/how-to/excel/cell-format) tutorial shows how to format the cell values.

### Detail Template

Kendo UI Grid doesn't export its [detail template](/api/javascript/ui/grid#configuration-detailTemplate) for the same reason as column templates.

If the detail template contains another grid you can follow the [Detail Grid Export](/web/grid/how-to/excel/detail-grid-export) tutorial.

### Export Multiple Grids

The [Multiple Grid Export](/web/grid/how-to/excel/multiple-grid-export) tutorial shows how to export multiple grids in a single Excel document. Each grid is exported in a separate Excel sheet.

### Save File on Server

In some cases it is useful to send the generated file to a remote service. This can be done by preventing the default file saving and posting the base64 encoded contents.

#### Example - post file to server

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["excel"],
            dataSource: {
                type: "odata",
                transport: {
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                pageSize: 7
            },
            pageable: true,
            columns: [
                { width: 300, field: "ProductName", title: "Product Name" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ],
            excelExport: function(e) {
                // Prevent the default behavior which will prompt the user to save the generated file.
                e.preventDefault();
                // Get the Excel file as a data URL.
                var dataURL = new kendo.ooxml.Workbook(e.workbook).toDataURL();
                // Strip the data URL prologue.
                var base64 = dataURL.split(";base64,")[1];
                // Post the base64 encoded content to the server which can save it.
                $.post("/server/save", {
                    base64: base64,
                    fileName: "ExcelExport.xlsx"
                });
            }
        });
    </script>

## Troubleshooting

### JavaScript error that JSZip is not found

Clicking the "Export to Excel" button or calling the `saveAsExcel` throws an exception if the JSZip JavaScript library isn't found. Including JSZip in the page solves the problem.
Further info is available in the [Excel Export Introduction](/framework/excel/introduction#requirements)

### Export does not work in Internet Explorer and Safari

Internet Explorer versions below 10 and Safari can't save a file and require the implementation of a [server proxy](/framework/save-files/introduction#browser-support).
Set the [proxyURL](/api/javascript/ui/grid#configuration-excel.proxyURL) option to specify the server proxy URL.

#### Example - user server proxy

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["excel"],
            excel: {
                fileName: "Kendo UI Grid Export.xlsx",
                proxyURL: "/proxy"
            },
            dataSource: {
                type: "odata",
                transport: {
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                pageSize: 7
            },
            sortable: true,
            pageable: true,
            columns: [
                { width: 300, field: "ProductName", title: "Product Name" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ]
        });
    </script>


## Further Reading

* [Create Excel Documents with Kendo UI](/framework/excel/introduction)
* [Save Files with Kendo UI](/framework/save-files/introduction)
* [kendo.ooxml.Workbook API Reference](/api/javascript/ooxml/Workbook)
