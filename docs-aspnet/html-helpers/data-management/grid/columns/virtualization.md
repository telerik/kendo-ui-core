---
title: Virtualization
page_title: Column Virtualization
description: "Learn how to enable Grid column virtualization in Telerik UI for {{ site.framework }} and improve rendering performance."
components: ["grid"]
slug: columnvirtualization_aspnet_grid
---

# Column Virtualization

The Grid provides a built-in option for virtualizing its columns. To enable it, set `Scrollable(scrollable => scrollable.Virtual(GridVirtualizationMode.Columns))`. As a result, the Grid renders only the currently visible columns and improves rendering performance. When users scroll horizontally, the visual subset of columns updates accordingly.

>important To use column virtualization correctly, set each column width through the `Width()` method.

To enable virtualized columns:

```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Scrollable(s=>s.Virtual(GridVirtualizationMode.Columns))
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="550">
        <scrollable virtual=@("columns")/>
    </kendo-grid>
```
{% endif %}

To enable both virtualized columns and rows:

```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Scrollable(s=>s.Virtual(GridVirtualizationMode.RowsAndColumns))
    )

```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="550">
        <scrollable virtual=@("rows, columns")/>
    </kendo-grid>
```
{% endif %}

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Column Virtualization by the Grid (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/column-virtualization)
* [Virtual Scrolling of the {{ site.product }} Grid]({% slug virtual_scrolling_aspnetcore_grid %})
* [Column Widths]({% slug column_widths_grid_aspnetcore %})
* [Grid Knowledge Base Articles](/knowledge-base)
* [Grid Server-Side API Reference](/api/grid)
