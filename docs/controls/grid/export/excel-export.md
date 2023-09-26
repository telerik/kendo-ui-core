---
title: Excel Export
page_title: jQuery Grid Documentation - Excel Export
description: "Get started with the jQuery Grid by Kendo UI and learn how to set the Excel export functionality."
previous_url: /excel-export
slug: exporting_excel_kendoui_grid_widget
position: 1
---

# Excel Export

As of the Kendo UI Q3 2014 (2014.3.1119) release, the Grid component provides built-in Excel export functionality.

For runnable examples, refer to:
* [Demo on exporting the Grid to Excel](https://demos.telerik.com/kendo-ui/grid/excel-export)
* [Demo on copying data to Excel](https://demos.telerik.com/kendo-ui/grid/copy-to-excel)

## Getting Started

To enable the Excel export option of the Grid:

1. Include the corresponding toolbar command and set the export settings.
    * [Toolbar configuration](/api/javascript/ui/grid/configuration/toolbar)
    * [Excel export configuration](/api/javascript/ui/grid/configuration/excel)
1. Include the JSZip script on the page. For more information, refer to the article with the [requirements]({% slug introduction_excelexport_kendoui %}#requirements).

To initiate Excel export through code, call the [`saveAsExcel`](/api/javascript/ui/grid/methods/saveasexcel) method.

> * By default, the Grid exports the current page of the data with sorting, filtering, grouping, and aggregates applied.
> * The Grid uses the current column order, visibility, and dimensions to generate the Excel file.
> * The Grid does not export the current CSS theme in the Excel file. For more information on how to change the visual appearance of the Excel document, refer to the below section about [customization of the Excel document]({% slug exporting_excel_kendoui_grid_widget %}#excel-customization).
> * The Grid exports only data-bound columns. All columns that do not have their [field](/api/javascript/ui/grid/configuration/columns.field) option set are ignored.
> * The [`format`](/api/javascript/ui/grid/configuration/columns.format) option is not used during export. For more information, refer to the section on [column formats](#known-limitations).
> * The [`template`](/api/javascript/ui/grid/configuration/columns.template) option is not used during export. For more information, refer to the section on [column templates](#known-limitations).
> * The [`detailTemplate`](/api/javascript/ui/grid/configuration/detailtemplate) option is not used during export. For more information, refer to the section on [detail templates](#known-limitations).

For more information, refer to the [online demo on Excel export](https://demos.telerik.com/kendo-ui/grid/excel-export).

The following example demonstrates how to enable the Excel export functionality of the Grid.

```dojo
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

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
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

## Configuration

With regard to its Excel export, the Grid enables you to:
* [Export all its pages to Excel](#exporting-all-pages)
* [Customize the exported files](#customizing-exported-files)
* [Export RTL content](#exporting-right-to-left-content)
* [Export multiple Grids](#exporting-multiple-grids)
* [Save files on the server](#saving-files-on-the-server)

### Exporting All Pages

By default, the Grid exports only the current page of data. To export all pages, set the [`allPages`](/api/javascript/ui/grid/configuration/excel.allpages) option to `true`.

> When the `allPages` option is set to `true` and `serverPaging` is enabled, the Grid will make a `"read"` request for all data. If the data items are too many, the browser may become unresponsive. In such cases, use [server-side export](#server-side-processing).

```dojo
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

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
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

### Customizing Exported Files

To customize the generated Excel file, use the [`excelExport`](/api/javascript/ui/grid/events/excelexport) event. The `workbook` event argument exposes the generated Excel workbook configuration.

* For more information on Excel export, refer to the [introductory article on Excel]({% slug introduction_excelexport_kendoui %}#excel-document-creation) and the [Excel Export Appearance article]({% slug appearance_excelexport_kendoui %}).
* For more information on setting the background color of alternating rows while exporting the Grid to Excel, refer to [this example]({% slug howto_configure_color_alternating_rows_grid %}).

### Exporting Right-to-Left Content

The [`excelExport`](/api/javascript/ui/grid/events/excelexport) event allows you to reverse the cells and set the text alignment to support right-to-left (RTL) languages. To render the document in the right-to-left flow in Excel, enable the [`rtl`](/api/javascript/ooxml/workbook/configuration/rtl) option of the workbook.

Each row has a `type` field that can be used to distinguish between the various row types in the Grid. The supported values are:
- `"header"`
- `"footer"`
- `"group-header"`
- `"group-footer"`
- `"data"`

```dojo
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

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
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
          },
          pageSize: 7
        },
        excelExport: function(e) {
          var workbook = e.workbook;
          var sheet = workbook.sheets[0];

          workbook.rtl = true;
          for (var i = 0; i < sheet.rows.length; i++) {
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

### Exporting Multiple Grids

By default, each Grid exports its content in a separate Excel sheet. For more information, refer to the example on [exporting multiple Grids in a single Excel document]({% slug howto_export_excel_multiple_grids_grid %}).

### Saving Files on the Server

To send the generated file to a remote service, prevent the default file saving and post the `base64` encoded contents.

```dojo
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["excel"],
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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
```

## Server-Side Processing

To export large datasets to Excel, use the [RadSpreadStreamProcessing library](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) which is part of [Telerik Document Processing (TDP) by Progress](https://docs.telerik.com/devtools/document-processing/introduction).

* For examples on exporting Excel files, refer to the [RadSpreadProcessing library](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview).
* For more information on the Grid server-side processing, refer to [this article](https://docs.telerik.com/aspnet-mvc/helpers/grid/excel-export#use-server-side-processing).

## Exclude Column From Exporting

In some scenarios, you may want to hide given column or multiple columns from being exported. This can be achieved using the [Exportable](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.exportable) setting.

You can also set it to an Object containing different values for Excel and PDF exporting modes, providing separate options for each:

```javascript
columns: [
   { 
       field: 'ContactTitle',
       exportable: { pdf: true, excel: false }
   }
]
```

## Known Limitations

* The Grid and its DataSource contain only the data items from the current page during client-side export. As a result, either make the export in chunks, or disable the paging feature.
* The maximum size of the exported file has a system-specific limit. For large data sets, use the server-side solution which is provided by the [RadSpreadStreamProcessing](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) as part of the [Document Processing Library](https://docs.telerik.com/devtools/document-processing/introduction).
* Exporting the Grid to Excel in older browsers, such as Internet Explorer 9 and Safari, requires the implementation of a server proxy. For more information, refer to [the `proxyUrl` configuration section](/api/javascript/ui/grid/configuration/excel.proxyurl).
* If you use Kendo UI Q2 2014 SP2 (2014.2.1008) or earlier, the export requires a custom implementation. To achieve that task, either:
    * Use a server-side implementation to directly export the data that is otherwise displayed by the Grid, or
    * Use a client-side implementation to export the table HTML markup or the dataSource items of the Grid.
* The Grid does not use [column templates](/api/javascript/ui/grid/configuration/columns.template) during the Excel export&mdash;it exports only the data. The reason for this behavior is that a column template may contain arbitrary HTML which cannot be converted to Excel column values. For more information on how to use a column template that does not contain HTML, refer to [this column template example]({% slug howto_use_column_template_grid %}).
* The Grid does not export its [detail template](/api/javascript/ui/grid/configuration/detailtemplate) for the same reason as it does not export its column templates. If the detail template contains another Grid, follow [the example on the exporting a detail Grid]({% slug howto_exportto_excel_masterand_detail_grid %}).
* The Grid does not use [column formats](/api/javascript/ui/grid/configuration/columns.format) during the Excel export because some Kendo UI formats are incompatible with Excel. To format the cell values, set the [`format`](/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.format) option of the cells.

  For more information on the formats that are supported by Excel, refer to [this page](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4). For more information on how to format cell values, refer to [this example]({% slug howto_format_cell_values_grid %}).

## Further Reading

* [Exporting Kendo UI Grid to Excel](https://www.telerik.com/support/code-library/export-grid-to-excel-8d91dd145501)
* [Creating Excel Documents with Kendo UI](/framework/excel/introduction)
* [Saving Files with Kendo UI](/framework/save-files/introduction)
* [JavaScript API Reference: kendo.ooxml.Workbook](/api/javascript/ooxml/workbook)

## KB Articles on Excel Export

* [Formatting Cell Values]({% slug howto_format_cell_values_grid %})
* [Using the Column Template]({% slug howto_use_column_template_grid %})
* [Exporting Detail Grids]({% slug howto_exportto_excel_masterand_detail_grid %})
* [Exporting Checked Columns Only]({% slug howto_export_checked_columns_only_grid %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Exporting the Grid to Excel (Demo)](https://demos.telerik.com/kendo-ui/grid/excel-export)
* [Export Images to Excel]({% slug export-images-in-grid %})
* [Copying Data to Excel (Demo)](https://demos.telerik.com/kendo-ui/grid/copy-to-excel)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
