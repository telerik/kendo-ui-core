---
title: Sorting
page_title: Sorting | Telerik UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the sorting functionality of the Telerik UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_sorting
position: 2
---

# Sorting

By default, the sorting functionality of the Telerik UI Grid for ASP.NET Core is disabled.

To control the sorting in the Grid, use the `Sortable` option.

###### Example

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Sortable()
        ...


The Grid supports single and multiple columns sort modes through its `SortMode` property. You can also specify if the columns can be unsorted by setting the `AllowUnsort` property to `true` or `false`.

With multi-column sorting you can also configure the Grid to display the sort indexes in the header by setting the `ShowIndexes` property to `true`.

###### Example

    .Sortable(sortable => sortable
            .AllowUnsort(true)
            .SortMode(GridSortMode.MultipleColumn)
            .ShowIndexes(true))

## See Also

* [Sorting by the Grid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/sorting)
* [JavaScript API Reference of the Grid HtmlHelper for ASP.NET Core](/api/grid)
