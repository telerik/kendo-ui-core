---
title: Exporting
description: Kendo UI Grid Excel Export feature
---

# Exporting

When using **Kendo UI Q1 2015 and newer versions**, the PivotGrid provides built-in PDF and Excel export functionality.

## PDF Export

The PDF export is enabled by default when `kendo.all.min.js`, `kendo.web.min.js` or custom build that includes PDF scripts are loaded on the page.
To setup the PDF export refer to the PDF configuration option:

* [PDF export configuration](/api/javascript/ui/pivotgrid#configuration-pdf)

The most important thing to point out is that exporting in older browsers (IE9 and below, Safari) requires the implementation of a server proxy
(more information is available in the `proxyUrl` configuration sections above). **PDF export is not supported in IE8 and below.**

## Excel Export

Kendo UI Grid can export its data as Excel document since the Q1 2015 version .

- [Enable Excel Export](#enable-excel-export)
- [What is Exported](#what-is-exported)
- [How To](#how-to)
    - Customize the Excel Document
    - Templates
- [Troubleshooting](#troubleshooting)
- [Further Reading](#further-reading)

### Enable Excel Export

The Excel export is enabled by default when `kendo.ooxml.min.js` is loaded on the page. Note that it is included in `kendo.all.min.js` and `kendo.web.min.js`.
To setup the Excel export refer to the Excel configuration option:

* [Excel export configuration](/api/javascript/ui/pivotgrid#configuration-excel)
* [Online demo](http://demos.telerik.com/kendo-ui/pivotgrid/excel-export)

To initiate Excel export via code call the [saveAsExcel](/api/javascript/ui/pivotgrid.html#methods-saveAsExcel) method.


### What is Exported

With the default configuration Kendo UI PivotGrid exports the current data with sorting, filtering applied.

The pivotgrid doesn't export the current CSS theme in the Excel file. Check [Customzie the Excel Document](#customize-the-excel-document) for information about changing the visual appearance of the Excel document.

The [dataCellTemplate](/api/javascript/ui/pivotgrid#configuration-dataCellTemplate), [columnHeaderTemplate](/api/javascript/ui/pivotgrid#configuration-columnHeaderTemplate) and
[rowHeaderTemplate](/api/javascript/ui/pivotgrid#configuration-rowHeaderTemplate) options are **not** used during export. Check [Templates](#templates) for more info.

### How To

#### Customize the Excel Document

The [excelExport](/api/javascript/ui/grid#events-excelExport) event allows customization of the generated Excel document.
The `workbook` event argument exposes the generated Excel workbook configuration.

To understand how Excel documents work check the [Excel Introduction](/framework/excel/introduction#create-excel-document) help topic.

#### Templates

Kendo UI PivotGrid doesn't use [dataCellTemplate](/api/javascript/ui/pivotgrid#configuration-dataCellTemplate), [columnHeaderTemplate](/api/javascript/ui/pivotgrid#configuration-columnHeaderTemplate) and
[rowHeaderTemplate](/api/javascript/ui/pivotgrid#configuration-rowHeaderTemplate) during Excel export - it exports only the data. The reason is simple - the templates may contain arbitrary HTML which can't be converted to Excel column values.

### Troubleshooting

#### JavaScript error that JSZip is not found

Clicking the "Export to Excel" button or calling the `saveAsExcel` throws an exception if the JSZip JavaScript library isn't found. Including JSZip in the page solves the problem.
Further info is available in the [Excel Export Introduction](/framework/excel/introduction#requirements)

#### Export does not work in Internet Explorer and Safari

Internet Explorer versions below 10 and Safari can't save a file and require the implementation of a [server proxy](/framework/save-files/introduction#browser-support).
Set the [proxyURL](/api/javascript/ui/pivotgrid#configuration-excel.proxyURL) option to specify the server proxy URL.

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


### Further Reading

* [Create Excel Documents with Kendo UI](/framework/excel/introduction)
* [Save Files with Kendo UI](/framework/save-files/introduction)
* [kendo.ooxml.Workbook API Reference](/api/javascript/ooxml/Workbook)
