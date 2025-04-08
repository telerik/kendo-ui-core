---
title: Coloring the Alternating Rows of a Grid Exported to Excel
description: How can I set the background color of the alternating rows of an exported Grid to Excel when working with {{ site.product }}?
type: how-to
page_title: Color Alternating Rows of Excel Export
slug: grid-export-color-alternating-rows
tags: grid, export, excel, color, alternating, rows
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

How can I set the background color of the alternating rows of an exported Grid to Excel when working with {{ site.product }}?

## Solution

Use the [`background`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.background) option of the Workbook cell to set the background color of the alternating table rows.

1. Handle the [`ExcelExport`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/grideventbuilder#excelexportsystemstring) event of the Grid.
1. Get the Workbook sheet and loop through the array of the sheet rows.
1. Loop through the cells of the even rows.
1. Specify the desired background color.


```Razor Index.cshtml
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
                if (rowIndex % 2 == 0) { //Check if the row index is even.
                    var row = sheet.rows[rowIndex];
                    for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) { //Loop through the row cells.
                        row.cells[cellIndex].background = "#aabbcc"; //Set the cell background color.
                    }
                }
            }
        }
    </script>
```

Refer to [this REPL](https://netcorerepl.telerik.com/QwkUmrbe596vygos11) for a runnable example.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Coloring the Alternating Rows of a Grid Exported to Excel](https://netcorerepl.telerik.com/QwkUmrbe596vygos11)
* [Exporting to Excel (Overview)](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/grid/export/excel-export)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
