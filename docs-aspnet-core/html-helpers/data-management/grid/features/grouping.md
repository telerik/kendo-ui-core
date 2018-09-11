---
title: Grouping
page_title: Grouping | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the grouping functionality of the Kendo UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_grouping
position: 4
---

# Grid Grouping

By default, the grouping functionality of the Kendo UI Grid for ASP.NET Core is disabled.

The grouping functionality of the Grid is controlled by the `Groupable` property:

###### Example
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.CustomerViewModel>()
        .Name("grid")
        .Groupable()
		...


Rendering groups is also possible by setting group expressions in the DataSource of the Grid, even without enabling `Groupable`:
		
###### Example		
    .Name("Grid")       
    .DataSource(dataSource => dataSource
        .Ajax()
        .Group(groups => groups.Add(p => p.UnitsInStock)) 
