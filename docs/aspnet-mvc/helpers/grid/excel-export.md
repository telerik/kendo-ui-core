---
title: Excel Export
description: Kendo UI Grid for ASP.NET MVC Excel Export
---

# Excel Export

Kendo UI Grid can export its data as Excel document since the Q3 2014 (2014.3.1119) version.

- [Enable Excel Export](#enable-excel-export)
- [What is Exported](#what-is-exported)
- [How To](#how-to)
    - [Export All Data](#export-all-data)
    - [Customize the Excel Document](#customize-the-excel-document)
    - [Column Templates](#column-templates)
    - [Column Format](#column-format)
    - [Detail Template](#detail-template)
    - [Export Multiple Grids](#export-multiple-grids)
- [Troubleshooting](#troubleshooting)
- [Further Reading](#further-reading)

## Enable Excel Export

To enable Excel export include the corresponding toolbar command and configure the export settings.

* [Online demo](http://demos.telerik.com/aspnet-mvc/grid/excel-export)

#### Example - enable Excel export

```Razor
@(Html.Kendo().Grid<MvcApplication.Models.ProductViewModel>()
    .Name("grid")
    .ToolBar(tools => tools.Excel())
    .Excel(excel => excel
        .FileName("Products.xslx")
    )
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
    )
)
```
```ASPX
<%: Html.Kendo().Grid<MvcApplication.Models.ProductViewModel>()
    .Name("grid")
    .ToolBar(tools => tools.Excel())
    .Excel(excel => excel
        .FileName("Products.xslx")
    )
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
    )
%>
```

To initiate Excel export via code call the [saveAsExcel](/api/javascript/ui/grid.html#methods-saveAsExcel) method.

> Important: Older browsers (IE9 and below, Safari) require the implementation of a [server proxy](/framework/save-files/introduction#browser-support).

## What is Exported

With the default configuration Kendo UI Grid exports the current page of the data with sorting, filtering, grouping and aggregates applied. [Export All Data](#export-all-data) shows how to export all pages.

The grid uses the current column order, visibility and dimensions to generate the Excel file.

The grid doesn't export the current CSS theme in the Excel file. Check [Customize the Excel Document](#customize-the-excel-document) for information about changing the visual appearance of the Excel document.

The grid exports only data-bound columns. Template and command columns are **ignored**.

The `Format` option is **not** used during export. Check [Column Format](#column-format) for more info.

The `ClientTemplate` option is **not** used during export. Check [Column Template](#column-template) for more info.

The `DetailTemplate` option is **not** used during export. Check [Detail Template](#detail-template) for more info.

## How To

### Export all data

By default the Kendo UI Grid exports only the current page of data. To export all pages set the `AllPages` option to `true`.

> When the `AllPages` option is set to `true` the grid will make a "read" request for **all** data. In case the data items are too many the browser may become unresponsive. Consider implementing server-side export for such cases.

#### Example - export all data
```Razor
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
```ASPX
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
%>

```
### Customize the Excel Document

The [excelExport](/api/javascript/ui/grid#events-excelExport) event allows customization of the generated Excel document.
The `workbook` event argument exposes the generated Excel workbook configuration.

To understand how Excel documents work check the [Excel Introduction](/framework/excel/introduction#create-excel-document) help topic.

The [Color Alternating Rows](/aspnet-mvc/helpers/grid/how-to/excel/alternating-rows) tutorial shows one way to customize the generated Excel document.

### Column Templates

Kendo UI Grid doesn't use the `ClientTemplate` during Excel export - it exports only the data. The reason is simple - a column template may contain arbitrary HTML which can't be converted to Excel column values.

The [Column Template](/aspnet-mvc/helpers/grid/how-to/excel/column-template-export) tutorial shows how to use a column template that doesn't contain HTML.

### Column Format

Kendo UI Grid doesn't use the `Format` option during Excel export because some Kendo UI formats are incompatible with Excel.

To format the cell values set the [format](/api/javascript/ooxml/workbook.html#configuration-sheets.rows.cells.format) option of the cells.

The [Create a custom number format](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4) page describes the formats that Excel supports.

The [Cell Format](/aspnet-mvc/helpers/grid/how-to/excel/cell-format) tutorial shows how to format the cell values.

### Detail Template

Kendo UI Grid doesn't export its `DetailTemplate` for the same reason as column templates.

If the detail template contains another grid you can follow the [Detail Grid Export](/aspnet-mvc/helpers/grid/how-to/excel/detail-grid-export) tutorial.

### Export Multiple Grids

The [Multiple Grid Export](/aspnet-mvc/helpers/grid/how-to/excel/multiple-grid-export) tutorial shows how to export multiple grids in a single Excel document. Each grid is exported in a separate Excel sheet.

## Troubleshooting

### JavaScript error that JSZip is not found

Clicking the "Export to Excel" button or calling the `saveAsExcel` throws an exception if the JSZip JavaScript library isn't found. Including JSZip in the page solves the problem.
Further info is available in the [Excel Export Introduction](/framework/excel/introduction#requirements)

### Export does not work in Internet Explorer and Safari

Internet Explorer versions below 10 and Safari can't save a file and require the implementation of a [server proxy](/framework/save-files/introduction#browser-support).
Set the `ProxyURL` option to specify the server proxy URL.

#### Example - user server proxy

```Controller
public class ProxyController : Controller
{
    [HttpPost]
    public ActionResult Save(string contentType, string base64, string fileName)
    {
        var fileContents = Convert.FromBase64String(base64);

        return File(fileContents, contentType, fileName);
    }
}
```
```Razor
@(Html.Kendo().Grid<MvcApplication.Models.ProductViewModel>()
    .Name("grid")
    .ToolBar(tools => tools.Excel())
    .Excel(excel => excel
        .AllPages(true)
        .ProxyURL(Url.Action("Save", "Proxy"))
    )
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
    )
)
```
```ASPX
<%: Html.Kendo().Grid<MvcApplication.Models.ProductViewModel>()
    .Name("grid")
    .ToolBar(tools => tools.Excel())
    .Excel(excel => excel
        .AllPages(true)
        .ProxyURL(Url.Action("Save", "Proxy"))
    )
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
    )
%>
```

## Further Reading

* [Create Excel Documents with Kendo UI](/framework/excel/introduction)
* [Save Files with Kendo UI](/framework/save-files/introduction)
* [kendo.ooxml.Workbook API Reference](/api/javascript/ooxml/Workbook)
