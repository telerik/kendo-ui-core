---
title: Grouping
page_title: Grouping | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the grouping functionality of the Kendo UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_grouping
position: 4
---

# Grouping

By default, the grouping functionality of the Kendo UI Grid for ASP.NET Core is disabled.

To control grouping in the Grid, use the `Groupable` property.

###### Example

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.CustomerViewModel>()
        .Name("grid")
        .Groupable()
		...


You can also render groups by setting group expressions in the DataSource of the Grid even without enabling `Groupable`.

###### Example

    .Name("Grid")       
    .DataSource(dataSource => dataSource
        .Ajax()
        .Group(groups => groups.Add(p => p.UnitsInStock))

## See Also

* [JavaScript API Reference of the Grid](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Grid HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview)
* [Grid Official Demos](http://demos.telerik.com/aspnet-core/grid/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
