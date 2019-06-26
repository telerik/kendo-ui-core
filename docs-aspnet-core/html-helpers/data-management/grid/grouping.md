---
title: Grouping
page_title: Grouping | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the grouping functionality of the Kendo UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_grouping
position: 5
---

# Grouping

By default, the grouping functionality of the Kendo UI Grid for ASP.NET Core is disabled.

For a runnable example, refer to the [demo on using aggregates in the Grid](https://demos.telerik.com/aspnet-core/grid/aggregates).

To control grouping in the Grid, use the `Groupable` property.

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.CustomerViewModel>()
        .Name("grid")
        .Groupable()
		...

You can also render groups by setting group expressions in the DataSource of the Grid even without enabling `Groupable`.

    .Name("Grid")       
    .DataSource(dataSource => dataSource
        .Ajax()
        .Group(groups => groups.Add(p => p.UnitsInStock))

## See Also

* [Grouping with Aggregates by the Grid (Demo)](https://demos.telerik.com/aspnet-core/grid/aggregates)
* [JavaScript API Reference of the Kendo UI Grid](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
