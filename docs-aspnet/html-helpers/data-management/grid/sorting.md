---
title: Sorting
page_title: Sorting
description: "Learn how to enable the sorting functionality of the Telerik UI Grid for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_sorting
position: 7
---

# Sorting

By default, the sorting functionality of the Telerik UI Grid for {{ site.framework }} is disabled.

## Getting Started

To control the sorting in the Grid, use the [`Sortable`](/api/kendo.mvc.ui.fluent/gridbuilder#sortable) option. as a result, the default [single-column sorting](#single-column-sorting) functionality will be applied.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Sortable()
        ...
    )
```
{% if site.core %}
```TagHelper
     <kendo-grid name="Grid">
        <sortable enabled="true"/>
     </kendo-grid>
```
{% endif %} 

> Only columns that are [bound to a field](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.field) can be sortable. To enable sorting on a column bound to an object, [bind the column to a field of that object](https://docs.telerik.com/aspnet-core/knowledge-base/grid-enable-operations-for-object-column).

## Sort Modes

The Grid supports the following sort modes:
* [Single-column sort mode](#single-column-sorting)
* [Multi-column sort mode](#multi-column-sorting)
* [Mixed-column sort mode](#mixed-column-sorting)

### Single-Column Sorting

By default, the Grid applies single-column sorting when the `Sortable()` method is enabled. Alternatively, you can configure single-column sort mode by setting the [`SortMode`]{% if site.core %}(/api/kendo.mvc.ui.fluent/gridsortablesettingsbuilder#sortmodekendomvcuigridsortmode){% else %}(/api/kendo.mvc.ui.fluent/gridsortsettingsbuilder#sortmodekendomvcuigridsortmode){% endif %}.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Sortable(sortable => sortable
            .SortMode(GridSortMode.SingleColumn))
        ...
    )
```
{% if site.core %}
```TagHelper
     <kendo-grid name="Grid">
        <sortable enabled="true" mode="single"/>
     </kendo-grid>
```
{% endif %} 


### Multi-Column Sorting

To allow the multi-column sorting, set the [`SortMode()`]{% if site.core %}(/api/kendo.mvc.ui.fluent/gridsortablesettingsbuilder#sortmodekendomvcuigridsortmode){% else %}(/api/kendo.mvc.ui.fluent/gridsortsettingsbuilder#sortmodekendomvcuigridsortmode){% endif %} method to `MultipleColumn`.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Sortable(sortable => sortable
            .SortMode(GridSortMode.MultipleColumn))
        ...
    )
```
{% if site.core %}
```TagHelper
     <kendo-grid name="Grid">
        <sortable enabled="true" mode="multiple"/>
     </kendo-grid>
```
{% endif %} 

You can also specify if the columns can be unsorted by setting the [`AllowUnsort`](/api/kendo.mvc.ui.fluent/gridboundcolumnsortablebuilder#allowunsortsystemboolean) property to `true` or `false`. for a runnable example, refer to the [demo on sorting in the grid](https://demos.telerik.com/{{ site.platform }}/grid/sorting).

With the multi-column sorting you can configure the Grid to display the sort indexes in the header by enabling the [`ShowIndexes`]{% if site.core %}(/api/kendo.mvc.ui.fluent/gridsortablesettingsbuilder#showindexessystemboolean){% else %}(/api/kendo.mvc.ui.fluent/gridsortsettingsbuilder#showindexessystemboolean){% endif %} property.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Sortable(sortable => sortable
            .AllowUnsort(true)
            .SortMode(GridSortMode.MultipleColumn)
            .ShowIndexes(true))
        ...
    )
```
{% if site.core %}
```TagHelper
     <kendo-grid name="Grid">
        <sortable enabled="true" allow-unsort="true" mode="multiple" show-indexes="true"/>
     </kendo-grid>
```
{% endif %} 

### Mixed-Column Sorting

The mixed sorting allows you to [single-sort](#single-column-sorting) columns by clicking their header and [multi-sort](#multi-column-sorting) columns by holding the `CTRL` key and clicking the columns header. A single-click (without holding the `CTRL` key) on any column un-sorts the currently sorted columns and applies single-sorting to the clicked column.

To enable the mixed-column sorting, set the [`SortMode()`]{% if site.core %}(/api/kendo.mvc.ui.fluent/gridsortablesettingsbuilder#sortmodekendomvcuigridsortmode){% else %}(/api/kendo.mvc.ui.fluent/gridsortsettingsbuilder#sortmodekendomvcuigridsortmode){% endif %} option to `Mixed`.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Sortable(sortable => sortable
            .SortMode(GridSortMode.Mixed))
        ...
    )
```
{% if site.core %}
```TagHelper
     <kendo-grid name="Grid">
        <sortable enabled="true" mode="mixed"/>
     </kendo-grid>
```
{% endif %} 

## Defining Field Type

If you want to sort a column as a different type than the original one in the database (for example, decimal<->string and vice versa), you can use the following approach:

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Sortable()
        ...
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(m =>
            {
                m.Id("OrderID");
                m.Field("Freight", typeof(string));
            })
            .ServerOperation(false)
            .PageSize(20)
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
```
{% if site.core %}
```TagHelper
     <kendo-grid name="Grid">
        <sortable enabled="true"/>
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20" server-operation="false">
            <schema>
               <model id="OrderID">
                   <fields>
                       <field name="Freight" type="string"></field>
                   </fields>
               </model>
            </schema>
            <transport>
                <read url="@Url.Action("Orders_Read","Grid")"/>
            </transport>
        </datasource>
     </kendo-grid>
```
{% endif %} 

## See Also

* [Sorting by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/sorting)
* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/grid)
