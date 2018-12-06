---
title: Sorting
page_title: Sorting | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the sorting functionality of the Kendo UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_sorting
position: 2
---

# Grid Sorting

By default, the sorting functionality of the Kendo UI Grid for ASP.NET Core is disabled.

The sorting functionality of the Grid is controlled by the `Sortable` option:

###### Example

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Sortable()
        ...


The Grid sorting supports single and multiple columns sorting through the `SortMode` property. You can also specify if the columns could be unsorted by setting the `AllowUnsort` property to `true` or `false`.

With multi column sorting you can also configure the Grid to display the sort indexes in the header by setting the `ShowIndexes` property to `true`:


###### Example

    .Sortable(sortable => sortable
            .AllowUnsort(true)
            .SortMode(GridSortMode.MultipleColumn)
            .ShowIndexes(true))

