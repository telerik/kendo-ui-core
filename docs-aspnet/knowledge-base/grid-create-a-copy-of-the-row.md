---
title: Creating Duplicate Grid Rows
description: An example on how to create a copy of a row in the Telerik UI Grid for {{ site.framework }}.
type: how-to
page_title: Create Copies of Grid Rows
slug: grid-create-a-copy-of-the-row
tags: grid, copy, row
res_type: kb
components: ["general"]
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2021.3.1109</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Telerik {{site.product_short}} Grid</td>
	</tr>
</table>

## Description

How can I create a copy of a Grid row when the user clicks a button?

## Solution

1. Create a [`custom command button`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.command#columnscommand) and provide a handler inside the [`click`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.command#columnscommandclick) method.
1. Initialize the `click` handler.
1. In the `click` handler, get the current table row and the data item bound to it through the [`dataitem`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem) method.
1. Add a new record to the grid [`dataSource`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/datasource) with the corresponding properties of the current data item. 

```Razor Index.cshtml
	@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
	    .Name("grid")
	    .Columns(columns =>
	    {
	        columns.Bound(p => p.ProductName);
	        columns.Bound(p => p.UnitPrice).Width(100);
	        columns.Bound(p => p.UnitsInStock).Width(100);
	        columns.Bound(p => p.Discontinued).Width(100);
	        columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
	        columns.Command(c => c.Custom("Add duplicate row").Click("onClickHandler")).Width(200);
	    })
	    .ToolBar(toolbar => toolbar.Create())
	    .Editable(editable => editable.Mode(GridEditMode.InLine).CreateAt(GridInsertRowPosition.Top))
	    .Pageable()
	    .Sortable()
	    .Scrollable()
	    .HtmlAttributes(new { style = "height:430px;" })
	    .DataSource(dataSource => dataSource
	        .Ajax()
	        .PageSize(5)
	        .Events(events => events.Error("error_handler"))
	        .Model(model => model.Id(p => p.ProductID))
	        .Create(update => update.Action("EditingInline_Create", "Grid"))
	        .Read(read => read.Action("EditingInline_Read", "Grid"))
	        .Update(update => update.Action("EditingInline_Update", "Grid"))
	        .Destroy(update => update.Action("EditingInline_Destroy", "Grid"))
	    )
	)
```
```JS script.js
<script type="text/javascript">
	function onClickHandler(e){
	   // prevent page scroll position change
	          e.preventDefault();
	          var grid = $("#grid").getKendoGrid();
	          // e.target is the DOM element representing the button
	          var tr = $(e.target).closest("tr"); // get the current table row (tr)
	          // get the data bound to the current table row
	          var dataItem = grid.dataItem(tr);
	          grid.dataSource.add({
	                ProductName:dataItem.ProductName,
	                UnitPrice:dataItem.UnitPrice,
	                UnitsInStock:dataItem.UnitsInStock,
	                Discontinued:dataItem.Discontinued
	          });
	}
</script>
```
For more information on how to implement the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/mFvcYAaB11ZFNfF510) example.

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

* [Telerik REPL: Creating Copies of Grid Rows](https://netcorerepl.telerik.com/mFvcYAaB11ZFNfF510)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
