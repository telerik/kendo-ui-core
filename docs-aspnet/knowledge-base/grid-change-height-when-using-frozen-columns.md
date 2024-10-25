---
title: Changing Grid Height When Using Frozen Columns
description: How can I resize a {{ site.product }} Grid which has frozen columns?
type: how-to
page_title: Changing Grid Height When Using Frozen Columns
slug: grid-change-height-when-using-frozen-columns
tags: aspnet, mvc, grid, change, height, when, using, frozen, columns, locked
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

How can I resize a {{ site.product }} Grid which has frozen columns?

## Solution

The frozen column functionality requires the Grid to have fixed height. However, the suggested approach ensures that the Grid is able to calculate and construct its layout properly during resizing.

The following example demonstrates how to change the height style of the `div` wrapper element and then call the [`resize`](https://docs.telerik.com/kendo-ui/styles-and-layout/using-kendo-in-responsive-web-pages#individual-widget-resizing) method of the Grid.

```Index.cshtml

<p>Group by the ShipCountry column and collapse some groups.</p>

@(Html.Kendo().Grid<GridHeightFrozenColumns.Models.OrderViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.OrderID).Filterable(false).Locked(true).Lockable(false).Width(150);
        columns.Bound(p => p.Freight).Width(150);
        columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}").Width(150);
        columns.Bound(p => p.ShipCountry).Width(150);
    })
    .Pageable()
    .Groupable()
    .Scrollable()
    .Height("550")
    .Events(ev =>
    {
        ev.DataBinding("onDataBinding");
        ev.DataBound("onDataBound");
    })
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Read(read => read.Action("Orders_Read", "Grid"))
    )
)

```
```script.js

    function attachGroupResizeHandler(grid) {
        grid.wrapper.find(".k-grouping-row .k-icon").on("click", function () {
            resizeGrid(grid);
        });
    }
    function onDataBinding(e) {
        e.sender.wrapper.find(".k-grouping-row .k-icon").off("click")
    }
    function onDataBound(e) {
        attachGroupResizeHandler(e.sender); 
        resizeGrid(e.sender);
    }
    function resizeGrid(grid) {
        setTimeout(function () {
            var lockedContent = grid.wrapper.children(".k-grid-content-locked")
            var content = grid.wrapper.children(".k-grid-content");

            grid.wrapper.height("");
            lockedContent.height("");
            content.height("");

            grid.wrapper.height(grid.wrapper.height());

            grid.resize();
        });
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
