---
title: Creating Fixed Headers on Scroll
description: How can I create fixed headers on scroll for the {{ site.product }} Grid?
type: how-to
page_title: Creating Fixed Headers on Scroll
slug: grid-fixed-headers-on-scroll
tags: aspnet, mvc, grid, fixed, headers, on, scroll
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for {{ site.product_short }} </td>
 </tr>
</table>

## Description

How can I create fixed headers on scroll in the Grid for {{ site.product_short }}?

## Solution 

To create fixed headers on scroll, apply the following CSS rule:

```C# style.css
<style>
    #second > table > thead,
    #first > table > thead {
        position: sticky;
        top: 0;
    }
</style>
```
```Razor Index.cshtml
    @(Html.Kendo().Grid<GridFixedHeaders.Models.OrderViewModel>()
        .Name("first")
        .Columns(columns => {
            columns.Bound(p => p.OrderDate);
            columns.Bound(o => o.ShipName).Width(200);
            columns.Bound(p => p.Freight).Width(200);
            columns.Bound(p => p.OrderDate).Format("{0:dd/MM/yyyy}");
        })
        .Pageable(pageable => pageable.ButtonCount(5))
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple))
        .PersistSelection(true)
        .Navigatable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Model(model => model.Id(p => p.OrderID))
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )

    <br />
    <br />

    @(Html.Kendo().Grid<GridFixedHeaders.Models.OrderViewModel>()
        .Name("second")
        .Columns(columns => {
            columns.Bound(p => p.OrderDate);
            columns.Bound(p => p.Freight).Width(200);
            columns.Bound(o => o.ShipName).Width(200);
            columns.Bound(p => p.OrderDate).Format("{0:dd/MM/yyyy}");
        })
        .Pageable(pageable => pageable.ButtonCount(5))
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .Type(GridSelectionType.Cell))
        .Navigatable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
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
