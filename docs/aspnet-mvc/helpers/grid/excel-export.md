---
title: Excel Export
page_title: Excel Export | Kendo UI Grid HtmlHelper
description: "Export the Kendo UI Grid for ASP.NET MVC to Excel."
slug: excelexport_gridhelper_aspnetmvc
position: 4
---

# Excel Export

As of Kendo UI Q3 2014 (2014.3.1119) version, the Kendo UI Grid can export its data in the form of an Excel document.

## Configuration

### Enable Excel Export

To enable Excel export include the corresponding toolbar command and configure the export settings.

For more information on this issue, refer to [this online demo](http://demos.telerik.com/aspnet-mvc/grid/excel-export).

The example below demonstrates how to enable the Excel export functionality.

###### Example

```tab-ASPX
    <%: Html.Kendo().Grid<MvcApplication.Models.ProductViewModel>()
        .Name("grid")
        .ToolBar(tools => tools.Excel())
        .Excel(excel => excel
            .FileName("Products.xlsx")
        )
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>
```
```tab-Razor
    @(Html.Kendo().Grid<MvcApplication.Models.ProductViewModel>()
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
```

To initiate the Excel export through code, call the [`saveAsExcel`](/api/javascript/ui/grid.html#methods-saveAsExcel) method.

> **Important**
>
> Older browsers, such as Internet Explorer 9 and below and Safari, require the implementation of a [server proxy]({% slug overview_savingfiles_kendoui %}).

### Output the Result

Through its default configuration, the Kendo UI Grid exports the current page of the data with sorting, filtering, grouping, and aggregates applied. To export all pages, refer to [this section](#export-all-data).

The Grid uses the current column order, visibility, and dimensions to generate the Excel file. It does not export the current CSS theme in the Excel file. For more information on changing the visual appearance of the Excel document, refer to [this section](#customize-the-excel-document).

> **Important**
> * The Grid exports only data-bound columns. Template and command columns are ignored.
> * The `Format` option is not used during export. For more information on this, refer to [this section](#column-format).
> * The `ClientTemplate` option is not used during export. For more information on this, refer to [this section](#column-template).
> * The `DetailTemplate` option is not used during export. For more information on this, refer to [this section](#detail-template).

## Common Scenarios

### Export All Data

By default, the Kendo UI Grid exports only the current page of data. To export all pages, set the `AllPages` option to `true`.

> **Important**
>
> When the `AllPages` option is set to `true` the Grid makes a `read` request for all data. If the data items are too many, the browser may become unresponsive. Consider implementing server-side export for such cases.

The example below demonstrates how to export all the data.

###### Example

```tab-ASPX
    <%: Html.Kendo().Grid<MvcApplication.Models.ProductViewModel>()
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
    %>
```
```tab-Razor
    @(Html.Kendo().Grid<MvcApplication.Models.ProductViewModel>()
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
```

### Customize Excel Documents

The [`excelExport`](/api/javascript/ui/grid#events-excelExport) event allows the customization of the generated Excel document. The `workbook` event argument exposes the generated Excel workbook configuration.

For more information on how the Excel documents work, refer to [this article]({% slug introduction_excelexport_kendoui %}).

For more information on a possible approach to customize the generated Excel document, refer to [this runnable how-to example]({% slug howto_alternatingrows_aspnetmvcgrid %}).

### Set the Column Templates

Kendo UI Grid does not use the `ClientTemplate` during Excel export. It exports only the data. The reason is that a column template may contain arbitrary HTML which cannot be converted to Excel column values.

For more information on how to use a column template that does not contain HTML, refer to [this runnable how-to example]({% slug howto_columntemplatexport_aspnetmvcgrid %}).

### Define the Column Format

The Kendo UI Grid does not use the `Format` option during Excel export because some Kendo UI formats are incompatible with Excel. To format the cell values, set the [`format`](/api/javascript/ooxml/workbook.html#configuration-sheets.rows.cells.format) option of the cells.

The [page on creating a custom number format](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4) describes the formats supported by Excel.

For more information on how to format the cell values, refer to [this runnable how-to example]({% slug howto_cellformat_aspnetmvcgrid %}).

### Use the Detail Template

The Kendo UI Grid does not export its `DetailTemplate` for the same reason it does not export the column templates. If the detail template contains another Grid, follow [this runnable how-to example]({% slug howto_detailgridexcelexport_aspnetmvcgrid %}).

### Export Multiple Grids

For more information on how to export multiple Grids to a separate Excel sheet in a single Excel document, refer to [this runnable how-to example]({% slug howto_multiplegridexport_aspnetmvcgrid %}).

## See Also

* [Create Excel Documents with Kendo UI]({% slug introduction_excelexport_kendoui %})
* [Save Files with Kendo UI]({% slug overview_savingfiles_kendoui %})
* [API Reference: kendo.ooxml.Workbook](/api/javascript/ooxml/Workbook)

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Binding of the Grid HtmlHelper]({% slug ajaxbinding_grid_aspnetmvc %})
* [Editing of the Grid HtmlHelper]({% slug ajaxediting_grid_aspnetmvc %})
* [Templating of the Grid HtmlHelper]({% slug clientdetailtemplate_grid_aspnetmvc %})
* [Troubleshooting for the Grid HtmlHelper]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [API Reference of the Grid HtmlHelper](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget]({% slug overview_kendoui_grid_widget %})

Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
