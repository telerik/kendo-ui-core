---
title: Excel Export
page_title: Excel Export | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Export the Kendo UI Grid for ASP.NET Core to Excel."
slug: excelexport_gridhelper_aspnetcore
position: 8
---

# Excel Export

The Grid enables you to export its content to Excel.

For a runnable example, refer to the [demo on Excel export by the Grid](https://demos.telerik.com/aspnet-core/grid/excel-export).

## Enabling Excel Export

To enable Excel export:

1. Include the corresponding toolbar command.
1. Configure the export settings.

        @(Html.Kendo().Grid<.ProductViewModel>()
            .Name("grid")
            .ToolBar(tools => tools.Excel())
            .Excel(excel => excel
                .FileName("Products.xlsx")
            )
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

To initiate the Excel export through code, call the [`saveAsExcel`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid.html#methods-saveAsExcel) method.

> Earlier browser versions, such as Internet Explorer 9 and earlier and Safari, require the implementation of a [server proxy](http://docs.telerik.com/kendo-ui/framework/save-files/introduction).

## Outputting the Result

Through its default configuration, the Kendo UI Grid for ASP.NET Core exports the current page of the data with sorting, filtering, grouping, and aggregates applied. To export all pages, refer to [this section](#export-all-data).

The Grid uses the current column order, visibility, and dimensions to generate the Excel file. It does not export the current CSS theme in the Excel file. For more information on changing the visual appearance of the Excel document, refer to [this section](#customize-excel-documents).

> * The Grid exports only data-bound columns. Template and command columns are ignored.
> * The `Format` option is not used during export. For more information on this, refer to [this section](#define-the-column-format).
> * The `ClientTemplate` option is not used during export. For more information on this, refer to [this section](#set-the-column-templates).
> * The `DetailTemplate` option is not used during export. For more information on this, refer to [this section](#use-the-detail-template).

## Exporting All Data

By default, the Kendo UI Grid for ASP.NET Core exports only the current page of data. To export all pages, set the `AllPages` option to `true`.

> When the `AllPages` option is set to `true` the Grid makes a `read` request for all data. If the data items are too many, the browser may become unresponsive. Consider implementing server-side export for such cases.

    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .ToolBar(tools => tools.Excel())
        .Excel(excel => excel
            .AllPages(true)
        )
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

## Customizing Excel Documents

The [`excelExport`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-excelExport) event allows the customization of the generated Excel document. The `workbook` event argument exposes the generated Excel workbook configuration.

For more information on how the Excel documents work, refer to [this article](http://docs.telerik.com/kendo-ui/framework/excel/introduction). For more information on a possible approach to customize the generated Excel document, refer to [this runnable how-to example](https://docs.telerik.com/aspnet-mvc/helpers/grid/how-to/Export/alternating-rows).

## Setting the Column Templates

Kendo UI Grid for ASP.NET Core does not use the `ClientTemplate` during Excel export. It exports only the data. The reason is that a column template may contain arbitrary HTML which cannot be converted to Excel column values. For more information on how to use a column template that does not contain HTML, refer to [this how-to example](https://docs.telerik.com/aspnet-mvc/helpers/grid/how-to/Export/column-template-export).

## Defining the Column Format

The Kendo UI Grid for ASP.NET Core does not use the `Format` option during Excel export because some Kendo UI formats are incompatible with Excel. To format the cell values, set the [`format`](http://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook.html#configuration-sheets.rows.cells.format) option of the cells.

The [page on creating a custom number format](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4) describes the formats supported by Excel. For more information on how to format the cell values, refer to [this how-to example](https://docs.telerik.com/aspnet-mvc/helpers/grid/how-to/Export/cell-format).

## Using the Detail Template

The Kendo UI Grid for ASP.NET Core does not export its `DetailTemplate` for the same reason it does not export the column templates. If the detail template contains another Grid, follow [this how-to example](https://docs.telerik.com/aspnet-mvc/helpers/grid/how-to/Export/detail-grid-export).

## Exporting Multiple Grids

For more information on how to export multiple Grids to a separate Excel sheet in a single Excel document, refer to [this runnable how-to example](https://docs.telerik.com/aspnet-mvc/helpers/grid/how-to/Export/multiple-grid-export).

## See Also

* [Excel Export by the Grid (Demo)](https://demos.telerik.com/aspnet-core/grid/excel-export)
* [Copying to Excel by the Grid (Demo)](https://demos.telerik.com/aspnet-core/grid/copy-to-excel)
* [JavaScript API Reference of the Kendo UI Grid](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
