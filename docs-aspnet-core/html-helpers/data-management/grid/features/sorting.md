---
title: Sorting
page_title: Sorting | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the sorting functionality of the Kendo UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_sorting
position: 2
---

# Sorting

By default, the sorting functionality of the Kendo UI Grid for ASP.NET Core is disabled.

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

* [JavaScript API Reference of the Grid](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Grid HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview)
* [Grid Official Demos](http://demos.telerik.com/aspnet-core/grid/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
