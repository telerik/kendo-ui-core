---
title: Format Cells when Export the Grid to Excel
description: How can I format the cell values during the export of the Grid to Excel?
type: how-to
page_title: Format Cells of Excel Export
slug: grid-export-format-cells
tags: grid, export, excel, format, cells
res_type: kb
component: grid
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.2.621</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for ASP.NET Core</td>
		</tr>
	</tbody>
</table>

## Description

How can I format the cell values during the export of the Grid to Excel?

## Solution

Use the [format](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.format) option of the Workbook cell to set the format of the cell value.

1. Handle the [`ExcelExport`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#excelexportsystemstring) event of the Grid.
1. Get the Workbook sheet and loop through the array of the sheet rows.
1. Specify the required cell format.


```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice);
            columns.Bound(p => p.UnitsOnOrder);
            columns.Bound(p => p.UnitsInStock);
        })
        .Events(e => e.ExcelExport("excelExport"))
        .ToolBar(tools => tools.Excel())
        .Pageable()
        .Sortable()
        .Scrollable()
        .Groupable()
        .Excel(excel => excel
            .FileName("Kendo UI Grid Export.xlsx")
            .Filterable(true)
        )
        .Reorderable(r => r.Columns(true))
        .Resizable(r => r.Columns(true))
        .ColumnMenu()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Excel_Export_Read", "Grid"))
        )
    )
```
```JavaScript
    <script>
        function excelExport(e) {
            var sheet = e.workbook.sheets[0]; //Workbook sheet.
            for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                var row = sheet.rows[rowIndex];
                row.cells[1].format = "[Red](#,##0.0);0.0;" //Format the data in the second column.
            }
        }
    </script>
```

Refer to [this REPL](https://netcorerepl.telerik.com/mGEqwBFT22vhFHwi46) for a runnable example.

## See Also
 * [Excel Export Overview](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/export/excel-export)
 * [kendo.ooxml.Workbook client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook)
