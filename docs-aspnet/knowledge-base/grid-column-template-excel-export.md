---
title: Exporting Grid ColumnTemplates to Excel
description: Learn how to export to Excel the content of the Grid's custom ColumnTemplates when using {{ site.product }} 
type: how-to
page_title: Export Grid ColumnTemplates to Excel
slug: grid-column-template-excel-export 
tags: grid, excel, export, column, template
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.3.913 version</td>
 </tr>
</table>


## Description
I use the Grid's Excel Export configuration but I also need to export the content of the ColumnTemplates. How can I achieve this?

## Solution
To export the content of the ColumnTemplates:
{% if site.core %}
1. Subscribe to the [ExcelExport Event](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#excelexportsystemstring) of the Grid.
{% else %}
1. Subscribe to the [ExcelExport Event](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#excelexportsystemstring)  of the Grid.
{% endif %}
1. In the handler get the first sheet of the [workbook](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook#configuration). This allows you to modify its rows later.
1. Access the Grid's client-side instance&mdash;it is available in the event's content. Then get the column by its index.
1. Evaluate the template.
1. Get the `dataItems` set that is currently loaded in the Grid.
1. Iterate the `dataItems`. Use the evaluated template as a value for the respective columns.

```C#
@{
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
	.Name("grid")
	
	.Columns(columns =>
	{
		columns.Bound(p => p.ProductName).Width(300);
		columns.Bound(p => p.UnitPrice).ClientTemplate("Price per unit: #: kendo.format('{0:c}', UnitPrice) #").Width(300);
		columns.Bound(p => p.UnitsOnOrder).Width(300);
		columns.Bound(p => p.UnitsInStock).Width(300);
	})
	.ToolBar(tools => tools.Excel())
	.Pageable()
	.Sortable()
	.Scrollable()
	.Groupable()
	.Excel(excel => excel
		.FileName("Kendo UI Grid Export.xlsx")
		.Filterable(true)
		.ProxyURL(Url.Action("Excel_Export_Save", "Grid"))
	)
	.Events(e => e.ExcelExport("excelExport"))
	.Reorderable(r => r.Columns(true))
	.Resizable(r => r.Columns(true))
	.ColumnMenu()
	.DataSource(dataSource => dataSource
		.Ajax()
		.PageSize(10)
		.Read(read => read.Action("Excel_Export_Read", "Grid"))
	)
)
```
```JavaScript
    function excelExport(e) {
        var sheet = e.workbook.sheets[0];
        var template = kendo.template(this.columns[1].template);
        var data = this.dataSource.view();
        for (var i = 0; i < data.length; i++) {
            sheet.rows[i + 1].cells[1].value = template(data[i]);
        }
    } 
```

For the complete implementation of the suggested approach, refer to this [Telerik REPL Example](https://netcorerepl.telerik.com/GGajGWPJ51YAIs9257).

## See Also

* [Client-side API of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Client-side API of the Grid's ExcelExport Event ](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport)
* [Kendo UI Templates Docs Article](https://docs.telerik.com/kendo-ui/framework/templates/overview)