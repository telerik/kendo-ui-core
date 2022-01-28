---
title: Customize the Excel Export Filename of the Grid by Adding Current Date and Time
description: How can I add the current date and time to the Excel export filename of the Grid?
type: how-to
page_title: Customize The Excel Filename of the Grid
slug: grid-export-custom-file-name
tags: grid, export, custom, file, name, excel
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Grid for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I add the current date and time to the Excel export filename of the Grid?

## Solution
Use the [excelExport](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event which has the workbook in its event data to rename it.

With the help of the [kendo.toString()](https://docs.telerik.com/kendo-ui/globalization/intl/dateformatting) method or another way to format the date, concatenate the date to the filename.

```Index.cshtml
@(Html.Kendo().Grid<GridExportCustomName.Models.OrderViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(e => e.OrderID);
        columns.Bound(e => e.Freight);
    })
    .ToolBar(t => 
    {
        t.Excel();
    })
    .Events(ev=>ev.ExcelExport("onExcelExport"))
    .DataSource(dataSource => dataSource
        .Custom()
        .Type("odata")
        .Transport(transport =>
           transport.Read(read => read.Url("https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"))
        )
        .PageSize(10)
    )

)
```
```script.js
    function onExcelExport(e) {
        e.workbook.fileName = kendo.toString(new Date, "dd/MM/yyyy HH:mm") + " Grid.xlsx";
    }
```
