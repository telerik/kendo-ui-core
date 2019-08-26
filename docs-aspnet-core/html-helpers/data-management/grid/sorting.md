---
title: Sorting
page_title: Sorting | Telerik UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the sorting functionality of the Telerik UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_sorting
position: 7
---

# Sorting

By default, the sorting functionality of the Telerik UI Grid for ASP.NET Core is disabled.

## Getting Started

To control the sorting in the Grid, use the `Sortable` option.

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Sortable()
        ...

## Sort Modes

The Grid supports single and multiple columns sort modes which can be set through its `SortMode` property. You can also specify if the columns can be unsorted by setting the `AllowUnsort` property to `true` or `false`. For a runnable example, refer to the [demo on sorting in the Grid](https://demos.telerik.com/aspnet-core/grid/sorting).

With multi-column sorting you can also configure the Grid to display the sort indexes in the header by setting the `ShowIndexes` property to `true`.

    .Sortable(sortable => sortable
            .AllowUnsort(true)
            .SortMode(GridSortMode.MultipleColumn)
            .ShowIndexes(true))

## See Also

* [Sorting by the Grid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/sorting)
* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/grid)
