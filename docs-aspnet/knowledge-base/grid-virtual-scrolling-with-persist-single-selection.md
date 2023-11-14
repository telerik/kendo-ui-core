---
title: Persist Single-Row Selection on Virtual Scrolling in Grid
description: How can I persist the single-row selection when the virtual scrolling functionality of the {{ site.product }} Grid is enabled?
type: how-to
page_title: Persist Single-Row Selection in Grid with Virtual Scrolling
slug: grid-virtual-scrolling-persist-row-selection
tags: grid, virtual, scrolling, virtualization, persist, selection
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
			<td>Grid for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I persist the selected row in the Grid when the virtual scrolling functionality is enabled?

## Solution

The example below is implemented as per the following steps:

1. Handle the [`Change`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#changesystemstring) event of the Grid.
1. Use the [`select()` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/select) to get the selected table row.
1. Get the data item of the selected row by using the [`dataItem()` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem).
1. Use the private `_selectedIds` object of the Grid to save the selected row.


```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()    
        .Name("grid")
        .Columns(columns => {
            columns.Bound(p => p.OrderID).Filterable(false).Width(100);
            columns.Bound(p => p.Freight).Width(100);
            columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}").Width(140);
            columns.Bound(p => p.ShipName).Width(100);
            columns.Bound(p => p.ShipCity).Width(150);
        })
        .Events(ev => ev.Change("onChange"))
        .Pageable(p =>
            p.Info(true)
            .Numeric(false)
            .PreviousNext(false)
            .Messages(m=>m.Display("Showing {2} data items"))
        )
        .Scrollable(scrollable => scrollable.Virtual(true))
        .Selectable()
        .PersistSelection(true)
        .HtmlAttributes(new { style = "height:543px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(100)
            .Model(m =>
            {
                m.Id(p => p.OrderID);
            })
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
```
```JavaScript
    <script>
        function onChange(e) {
            var selectedRows = this.select();
            var dataItem = this.dataItem(selectedRows[0]);
            e.sender._selectedIds= {};
            e.sender._selectedIds[ dataItem.OrderID ]= true;
        }
    </script>
```

For a runnable example based on the code above, refer to [this REPL](https://netcorerepl.telerik.com/cGuAGClJ24i9B8RT11).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Persist Single-Row Selection on Virtual Scrolling in Grid](https://netcorerepl.telerik.com/cGuAGClJ24i9B8RT11)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)