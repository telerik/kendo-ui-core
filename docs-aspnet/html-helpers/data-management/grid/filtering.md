---
title: Filtering
page_title: Filtering
description: "Learn how to enable the filtering functionality of the Telerik UI Grid for {{ site.framework }}."
components: ["grid"]
slug: htmlhelpers_grid_aspnetcore_filtering
position: 6
---

# Filtering

By default, the filtering functionality of the Telerik UI Grid for {{ site.framework }} is disabled.

## Getting Started

To control filtering in the Grid, use the `Filterable` property.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Filterable() // Enable the Menu filter mode.
        ...
```
{% if site.core %}
```TagHelper
   <kendo-grid name="Grid">
      <filterable enabled="true" />
   </kendo-grid>
```
{% endif %}

Each `Filterable` configuration of the columns allows the setting of a custom DataSource.

```HtmlHelper
    ...
    columns.Bound(e => e.LastName).Width(220).Filterable(ftb => ftb.Multi(true)
        .DataSource(ds => ds.Read(r => r.Action("Unique", "Grid").Data("{ field: 'LastName' }")))
    );
    .ShowIndexes(true))
```
{% if site.core %}
```TagHelper
   ...
   <columns>
	    <column field="LastName" width="220">
	        <filterable enabled="true" multi="true">
				<datasource>
					<transport>
						<read url="@Url.Action("Unique","Grid")" data="{ field: 'LastName' }" />
					</transport>
				</datasource>
			</filterable>
	    </column>
   </columns>
```
{% endif %}

> Only columns [bound to a field](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.field) can be filterable. To enable filtering on a column bound to an object, [bind the column to a field of that object](https://docs.telerik.com/aspnet-core/knowledge-base/grid-enable-operations-for-object-column).

## Filter Modes

The Grid supports the following filter modes:
* [Filter row (demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-row)
* [Filter checkboxes (demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-multi-checkboxes)
* [Filter menu (demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-menu-customization)

To set the desired filter mode, use the `Filterable->Mode` property. You can enable checkbox list filtering in the filter menu of the Grid component by specifying the `Multi(true)` setting for the relevant Grid columns.

```HtmlHelper
    ...
    columns.Bound(p => p.UnitsInStock).Width(140).Filterable(ftb => ftb.Multi(true).CheckAll(true));
```
{% if site.core %}
```TagHelper
   ...
   <columns>
	    <column field="UnitsInStock" width="140">
	        <filterable enabled="true" multi="true" check-all="true" />
	    </column>
   </columns>
```
{% endif %}

## Filter Operators

* [List of the operators for the different data types](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/filterable.operators#related-properties)

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Filter Rows by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-row)
* [Filter Checkboxes by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-multi-checkboxes)
* [Customizing the Filter Menu by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-menu-customization)
* [Server-Side API](/api/grid)
