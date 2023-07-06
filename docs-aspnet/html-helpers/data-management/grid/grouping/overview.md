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

To control grouping in the Grid, use the [`Groupable()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridbuilder#groupable) method.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.CustomerViewModel>()
        .Name("grid")
        .Groupable()
    	...
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" >
        <groupable enabled="true"/>
        ...
    </kendo-grid>
```
{% endif %}

> Only columns that are [bound to a field](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.field) can be groupable. To enable grouping on a column bound to an object, [bind the column to a field of that object](https://docs.telerik.com/aspnet-core/knowledge-base/grid-enable-operations-for-object-column).

You can also render groups by setting group expressions in the DataSource of the Grid even without enabling `Groupable`.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.CustomerViewModel>()
        .Name("Grid")       
        .DataSource(dataSource => dataSource
            .Ajax()
            .Group(groups => groups.Add(p => p.UnitsInStock))
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <datasource page="0" type="DataSourceTagHelperType.Ajax" page-size="10" server-operation="true">
            <groups>
                <group field="UnitsInStock"></group>
            </groups>
        </datasource>
    </kendo-grid>
```
{% endif %}
## See Also

* [Grouping with Aggregates by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/aggregates)
* [Server-Side API](/api/grid)
