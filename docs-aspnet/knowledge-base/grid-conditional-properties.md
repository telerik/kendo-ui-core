---
title: Setting Conditional Grid Properties 
description: Learn how to set the Grid properties conditionally when working with the Data Grid for {{ site.product }}.
type: how-to
page_title: Setting Conditional Grid Properties
slug: grid-conditional-properties
position: 
tags: grid, definition
res_type: kb
---

## Environment
<table>
	<tbody>
    <tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
		</tr>
	</tbody>
</table>


## Description

How can I set some of the {{ site.product }} Grid properties depending on a condition?

## Solution

You can achieve this requirement by defining the Grid to a variable instance and then apply the logic using `if` conditional statements. Finally, you can call the `.Render()` method to display the Grid.

```C#
@{
    var isAdmin = true;

    var grid = (Html.Kendo().Grid<KendoGridProject.Models.OrderViewModel>()
                 .Name("grid")
                 .Columns(columns =>
                 {
                     columns.Bound(p => p.OrderID).Filterable(false);
                     columns.Bound(p => p.Freight);
                     columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
                     columns.Bound(p => p.ShipName);
                     columns.Bound(p => p.ShipCity);
                 })
                 .Pageable()
                 .Scrollable()
                 .HtmlAttributes(new
                 {
                     style = "height:550px;"
                 })
                 .DataSource(dataSource => dataSource
                     .Ajax()
                     .PageSize(20)
                     .Model(m=>m.Id("OrderID"))
                     .Read(read => read.Action("Orders_Read", "Grid"))
                 )
             );

    if (isAdmin)
    {
        grid.Editable();
        grid.Sortable();
        grid.Filterable();
        grid.Sortable();
    }

    grid.Render();
}
```

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

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
