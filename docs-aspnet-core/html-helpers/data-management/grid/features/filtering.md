---
title: Filtering
page_title: Filtering | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the filtering functionality of the Kendo UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_filtering
position: 3
---

# Filtering

By default, the filtering functionality of the Kendo UI Grid for ASP.NET Core is disabled.

To control filtering in the Grid, use the `Filterable` property.

###### Example

	@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Filterable() // Enables the Menu filter mode
		...

The filtering of the Grid supports the `Menu` and `Row` modes. To configure the filter mode, use the `Filterable->Mode` property.

You can enable checkbox list filtering in the filter menu of the Grid HtmlHelper by specifying the `Multi(true)` setting for the relevant Grid columns.

###### Example		

	...
	columns.Bound(p => p.UnitsInStock).Width(140).Filterable(ftb => ftb.Multi(true).CheckAll(true));


Each `Filterable` configuration of the columns allows the setting of a custom DataSource.

###### Example		
	...
	columns.Bound(e => e.LastName).Width(220).Filterable(ftb => ftb.Multi(true)
		.DataSource(ds => ds.Read(r => r.Action("Unique", "Grid").Data("{ field: 'LastName' }")))
    );            .ShowIndexes(true))

## See Also

* [JavaScript API Reference of the Grid](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Grid HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview)
* [Grid Official Demos](http://demos.telerik.com/aspnet-core/grid/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
