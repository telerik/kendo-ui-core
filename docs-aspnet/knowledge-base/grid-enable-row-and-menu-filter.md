---
title: Enabling the Menu and Row Filter Mode in the Grid
page_title: Enabling the Menu and Row Filter Mode in the Grid
description: "An example on how to enable the menu and row filter mode in the {{ site.product }} Grid."
slug: grid-enable-row-and-menu-filter
tags: telerik, grid, filter, row, menu, mode
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.802 version</td>
 </tr>
</table>

## Description

How can I enable both the row and menu filter modes in the {{ site.product }} Grid? 

## Solution

To achieve the desired behavior, change the options of the Grid and enable both the menu and row filter modes by using the [`setOptions()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) method.


```Index.cshtml

@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.OrderID);
        columns.Bound(p => p.ShipName);
        columns.Bound(p => p.OrderDate);
    })
    .Pageable()
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Read(read => read.Action("Orders_Read", "Grid"))
     )
)

```
```Script.js
    <script>
        $(document).ready(function () {
            let grid = $("#grid").data("kendoGrid")
            let opt = grid.getOptions();
            opt.filterable = { mode: "row,menu" };
            grid.setOptions(opt)
        })
    </script>
```


For the complete implementation of the suggested approach, refer to the [Telerik REPL example on enabling the menu and row filter modes in the Grid](https://netcorerepl.telerik.com/GcPbQvbH48if6J6G15).

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

* [Telerik REPL: Enabling the Menu and Row Filter Modes in the Grid](https://netcorerepl.telerik.com/GcPbQvbH48if6J6G15)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
