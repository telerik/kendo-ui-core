---
title: Filtering
page_title: Filtering
description: "Learn how to enable the filtering functionality of the Telerik UI Grid for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_filtering
position: 4
---

# Filtering

By default, the filtering functionality of the Telerik UI Grid for {{ site.framework }} is disabled.

## Getting Started

To control filtering in the Grid, use the `Filterable` property.

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Filterable() // Enable the Menu filter mode.
        ...

Each `Filterable` configuration of the columns allows the setting of a custom DataSource.

    ...
    columns.Bound(e => e.LastName).Width(220).Filterable(ftb => ftb.Multi(true)
        .DataSource(ds => ds.Read(r => r.Action("Unique", "Grid").Data("{ field: 'LastName' }")))
    );
    .ShowIndexes(true))

## Filter Modes

The Grid supports the following filter modes:
* [Filter row (demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-row)
* [Filter checkboxes (demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-multi-checkboxes)
* [Filter menu (demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-menu-customization)

To set the desired filter mode, use the `Filterable->Mode` property. You can enable checkbox list filtering in the filter menu of the Grid HtmlHelper by specifying the `Multi(true)` setting for the relevant Grid columns.

	...
	columns.Bound(p => p.UnitsInStock).Width(140).Filterable(ftb => ftb.Multi(true).CheckAll(true));

## See Also

* [Filter Rows by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-row)
* [Filter Checkboxes by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-multi-checkboxes)
* [Customizing the Filter Menu by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-menu-customization)
* [Server-Side API](/api/grid)
