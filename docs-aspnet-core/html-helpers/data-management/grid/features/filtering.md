---
title: Filtering
page_title: Filtering | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the filtering functionality of the Kendo UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_filtering
position: 3
---

# Grid Filtering

By default, the filtering functionality of the Kendo UI Grid for ASP.NET Core is disabled.

The filtering functionality of the Grid is controlled by the `Filterable` property:

###### Example

	@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Filterable() // Enables the Menu filter mode
		...


The Grid filtering supports `Menu` and `Row` modes. The filter mode is configured through the `Filterable->Mode` property.

You can enable checkbox list filtering in the filter menu of the Grid HtmlHelper by specifying `Columns -> Filterable -> Multi(true)` setting for the relevant grid columns:

###### Example		
	...
	columns.Bound(p => p.UnitsInStock).Width(140).Filterable(ftb => ftb.Multi(true).CheckAll(true));

	
Each `Filterable` configuration of the columns allow setting custom DataSource:
		
###### Example		
	...
	columns.Bound(e => e.LastName).Width(220).Filterable(ftb => ftb.Multi(true)
		.DataSource(ds => ds.Read(r => r.Action("Unique", "Grid").Data("{ field: 'LastName' }")))
    );            .ShowIndexes(true))
	  
