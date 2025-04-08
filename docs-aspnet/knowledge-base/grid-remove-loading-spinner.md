---
title: Hiding the Grid Loading Spinner
description: How can I remove the loading spinner from the {{ site.product }} Grid? 
type: how-to
page_title: Hide the Grid Loading Spinner
slug: grid-remove-loading-spinner
tags: grid, remove, loading, spinner
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>{{ site.product }} Grid</td>
		</tr>
	</tbody>
</table>

## Description

How can I remove the loading spinner from the {{ site.product }} Grid?

## Solution

1. Configure handler for the [`RequestStart`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/events/requeststart) event.
2. Use a jQuery selector to get the div with the `k-loading-image` class.
3. Use the [`hide`](https://api.jquery.com/hide/) jQuery method.

Example: 

```Razor Index.cshtml
@(Html.Kendo().Grid<GridRemoveLoading.Models.OrderViewModel>()
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
    .Sortable()
    .Scrollable()
    .Filterable()
    .HtmlAttributes(new { style = "height:550px;" })
    .DataSource(dataSource => dataSource
        .Ajax()
        .Events(ev=>ev.RequestStart("onRequestStart"))
        .PageSize(20)
        .Read(read => read.Action("Orders_Read", "Grid"))
    )
)
```
```JS script.js
   function onRequestStart(e) {
        setTimeout(function (e) {
            $(".k-loading-image").hide();
        })
    }
```

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

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
