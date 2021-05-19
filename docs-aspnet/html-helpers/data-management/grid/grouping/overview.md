---
title: Overview
page_title: Grouping
description: "Learn how to enable the grouping functionality of the Telerik UI Grid for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_grouping
position: 1
---

# Grouping

By default, the grouping functionality of the Telerik UI Grid for {{ site.framework }} is disabled.

For a runnable example, refer to the [demo on using aggregates in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/aggregates).

To control grouping in the Grid, use the [`Groupable()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridBuilder#groupable) method.

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

* [Grouping with Aggregates by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/aggregates)
* [Server-Side API](/api/grid)
