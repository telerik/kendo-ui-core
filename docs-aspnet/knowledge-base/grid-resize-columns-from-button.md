---
title: Resizing Columns from a Button
description: How can I resize the columns of the {{ site.product }} Grid by using a custom button?
type: how-to
page_title: Resize Columns from a Button
slug: grid-resize-columns-from-button
tags: aspnet, mvc, grid, resize, columns, from, button
res_type: kb
component: grid, button
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
</table>

## Description

How can I resize the columns of the {{ site.product }} Grid by using a custom button?

## Solution 

The following example demonstrates how to resize the columns of the Grid by using a custom button.

```Index.cshtml
@(Html.Kendo().Grid<ResizeColumnsFromButton.Models.OrderViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.OrderID).Filterable(false).Width(150);
        columns.Bound(p => p.Freight);
        columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
        columns.Bound(p => p.ShipName);
        columns.Bound(p => p.ShipCity);
        columns.Command(c => c.Custom("resize").Click("onResizeClick").Text("Resize"));
    })
    .Pageable()
    .Sortable()
    .Scrollable()
    .Filterable()
    .HtmlAttributes(new { style = "height:550px;" })
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Read(read => read.Action("Orders_Read", "Grid"))
    )
)

<button class="k-button myBtn">Disable Resizing</button>
```
```script.js

    $(".myBtn").on("click", function () {
        $(function () {
            $("button.k-grid-resize").attr("disabled", true);
        });
    })
    function onResizeClick(e) {
        var grid = $("#grid").data("kendoGrid");
        var options = grid.getOptions();
        options.columns[0].width = '250px';
        grid.setOptions(options);
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
