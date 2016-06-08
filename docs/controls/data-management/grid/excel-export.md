---
title: Excel Export
page_title: Excel Export | Kendo UI Grid
description: "Learn how to set the Excel export functionality of the Kendo UI Grid widget."
slug: exporting_excel_kendoui_grid_widget
position: 8
---

# Excel Export

As of the Kendo UI Q3 2014 (2014.3.1119) release, the Grid widget provides a built-in Excel export functionality.

## Set Up

To enable Excel export, include the corresponding toolbar command and configure the export settings.

* [Toolbar Configuration](/api/javascript/ui/grid#configuration-toolbar)
* [Excel Export Configuration](/api/javascript/ui/grid#configuration-excel)
* [Online Demo](http://demos.telerik.com/kendo-ui/grid/excel-export)

You need to include JSZip script on the page. For more information on the requirements to do this, refer to [Requirements]({% slug introduction_excelexport_kendoui %}#requirements).

The example below demonstrates how to enable the Excel export functionality of a Kendo UI Grid.

###### Example

```html
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

To initiate Excel export via code, call the [`saveAsExcel`](/api/javascript/ui/grid.html#methods-saveAsExcel) method.

> **Important**
> * By default, Kendo UI Grid exports the current page of the data with sorting, filtering, grouping, and aggregates applied.
> * The Grid uses the current column order, visibility, and dimensions to generate the Excel file.
> * The Grid does not export the current CSS theme in the Excel file. For more information on how to change the visual appearance of the Excel document, refer to the below section about [customization of the Excel document]({% slug exporting_excel_kendoui_grid_widget %}#customize-the-excel-document).
> * The Grid exports only data-bound columns. All columns that do not have their [field](/api/javascript/ui/grid#configuration-columns.field) option set are ignored.
> * The [`format`](/api/javascript/ui/grid#configuration-columns.format) option is not used during export. Check [Column Format]({% slug exporting_excel_kendoui_grid_widget %}#column-format) for more info.
> * The [`template`](/api/javascript/ui/grid#configuration-columns.template) option is not used during export. Check [Column Templates]({% slug exporting_excel_kendoui_grid_widget %}#column-templates) for more info.
> * The [`detailTemplate`](/api/javascript/ui/grid#configuration-detailTemplate) option is not used during export. Check [Detail Template]({% slug exporting_excel_kendoui_grid_widget %}#detail-template) for more info.

## Features

### Excel Export of All Data

By default, the Kendo UI Grid exports only the current page of data. To export all pages set the [`allPages`](/api/javascript/ui/grid#configuration-excel.allPages) option to `true`.

> **Important**
>
> When the `allPages` option is set to `true` and `serverPaging` is enabled, the Grid will make a `"read"` request for all data. If the data items are too many the browser may become unresponsive. Consider implementing server-side export for such cases.

The example below demonstrates how to export all the data from a Kendo UI Grid to Excel.

###### Example

```html
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

### Excel Customization

The [`excelExport`](/api/javascript/ui/grid#events-excelExport) event allows customization of the generated Excel document.

The `workbook` event argument exposes the generated Excel workbook configuration.

For a better understanding about how Excel documents work, check the [introductory help topic on Excel]({% slug introduction_excelexport_kendoui %}#excel-document-creation).

For information on how to use the `background` option to set the background color of alternating rows while exporting the Grid to Excel, refer to [this example]({% slug howto_configure_color_alternating_rows_grid %}).

### Right-to-Left Support

The [`excelExport`](/api/javascript/ui/grid#events-excelExport) event allows reversing the cells and setting the text alignment in order to support right-to-left (RTL) languages, as demonstrated in the example below.

###### Example

```html
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

Kendo UI Grid does not use [column templates](/api/javascript/ui/grid#configuration-columns.template) during Excel export; it exports only the data. The reason for this behavior is that a column template may contain arbitrary HTML which cannot be converted to Excel column values. For more information on how to use a column template that does not contain HTML, see the [column template example]({% slug howto_use_column_template_grid %}).

### Column Format

Kendo UI Grid does not use [column formats](/api/javascript/ui/grid.html#configuration-columns.format) during Excel export because some Kendo UI formats are incompatible with Excel. To format the cell values, set the [`format`](/api/javascript/ooxml/workbook.html#configuration-sheets.rows.cells.format) option of the cells.

For more information on the formats supported by Excel, visit [this page](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4).

For more information on how to format cell values, refer to [this example]({% slug howto_format_cell_values_grid %}).

### Detail Template

Kendo UI Grid does not export its [detail template](/api/javascript/ui/grid#configuration-detailTemplate) for the same reason as it does not export its column templates. If the detail template contains another Grid, follow [the example on the detail Grid export]({% slug howto_exportto_excel_masterand_detail_grid %}).

### Multiple Grids

Each Grid is exported in a separate Excel sheet. For more information on how to export multiple Grids in a single Excel document, see [this example]({% slug howto_export_excel_multiple_grids_grid %}).

### File Saving on Server

In some cases it is useful to send the generated file to a remote service. Do this by preventing the default file saving and posting the `base64` encoded contents.

The example below demonstrates how to post files to the server.

###### Example

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

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

### JavaScript Error Is Thrown That JSZip Is Not Found

Clicking **Export to Excel** or calling the `saveAsExcel` throws an exception if the JSZip JavaScript library is not found. To solve this issue, include JSZip in the page. For more information on this, see [the introductory help topic about exporting to Excel]({% slug howto_configure_color_alternating_rows_grid %}#requirements).

### Excel Export Is Not Working in Internet Explorer and Safari

Internet Explorer 9 and Safari do not support the option for saving a file and require the implementation of a [server proxy]({% slug overview_savingfiles_kendoui %}#browser-support). Set the [`proxyURL`](/api/javascript/ui/grid#configuration-excel.proxyURL) option to specify the server proxy URL, as shown below.

###### Example

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

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

## Known Limitations

* As discussed in the previous section, exporting in older browsers, such as Internet Explorer 9 and Safari, requires the implementation of a server proxy. For more information on this, refer to [the `proxyUrl` configuration section](/api/javascript/ui/grid#configuration-excel.proxyURL).
* If you use Kendo UI Q2 2014 SP2 (2014.2.1008) or older, exporting requires a custom implementation and there are two ways to approach the task:
    * Use a server-side implementation to directly export the data that is otherwise displayed by the Grid.
    * Use a client-side implementation to export the table HTML markup or the dataSource items of the Grid.

> **Important**
>
> The Grid and its dataSource contain only the data items from the current page during client-side export. As a result, either make the export in chunks, or disable the paging feature.

## Further Reading

* [Export Kendo UI Grid to Excel](http://www.telerik.com/support/code-library/export-grid-to-excel-8d91dd145501)
* [Export MVC Grid to Excel](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/excel-export-server-side)
* [Export MVC Grid to PDF](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/pdf-export-server-side)
* [Export MVC Grid to CSV](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/csv-export-server-side)
* [Create Excel Documents with Kendo UI](/framework/excel/introduction)
* [Save Files with Kendo UI](/framework/save-files/introduction)
* [JavaScript API Reference: kendo.ooxml.Workbook](/api/javascript/ooxml/workbook)

## See Also

Other articles on the Kendo UI Grid:

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality]({% slug editing_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Remote Data Binding]({% slug remote_data_binding_grid %})
* [Localization of Messages]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Print the Grid]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
