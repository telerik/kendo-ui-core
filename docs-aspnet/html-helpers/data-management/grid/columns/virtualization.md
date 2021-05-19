---
title: Virtualization
page_title: Column Virtualization
description: "Get started with the Telerik UI Grid HtmlHelper for {{ site.framework }} and learn how to enable its column virtualization."
slug: columnvirtualization_aspnet_grid
---

# Column Virtualization

The Grid provides a built-in option for virtualizing its columns. To enable it, set `Scrollable(scrollable => scrollable.Virtual(GridVirtualizationMode.Columns))`. As a result, the columns outside the current visible aria of the Grid will not be rendered and this will improve the rendering performance. When scrolling is performed the visual subset of columns is changed accordingly.

> To work properly, the column virtualization requires you to set the columns width with their `Width()` method.

To enable virtualized columns:

```
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Scrollable(s=>s.Virtual(GridVirtualizationMode.Columns))
    )
```

To enable both virtualized columns and rows:

```
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Scrollable(s=>s.Virtual(GridVirtualizationMode.RowsAndColumns))
    )

```

## See Also

* [Column Virtualization by the Grid (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/column-virtualization)
* [Virtual Scrolling of the {{ site.product }} Grid]({% slug virtual_scrolling_aspnetcore_grid %})
* [Column Widths]({% slug column_widths_grid_aspnetcore %})
* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/grid)
