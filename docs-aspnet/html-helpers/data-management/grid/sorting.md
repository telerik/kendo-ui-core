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

To control the sorting in the Grid, use the `Sortable` option.

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Sortable()
        ...

> Only columns that are [bound to a field](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.field) can be sortable. To enable sorting on a column bound to an object, [bind the column to a field of that object](https://docs.telerik.com/aspnet-core/knowledge-base/grid-enable-operations-for-object-column).

## Sort Modes

The Grid supports single and multiple columns sort modes which can be set through its `SortMode` property. You can also specify if the columns can be unsorted by setting the `AllowUnsort` property to `true` or `false`. For a runnable example, refer to the [demo on sorting in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/sorting).

With multi-column sorting you can also configure the Grid to display the sort indexes in the header by setting the `ShowIndexes` property to `true`.

    .Sortable(sortable => sortable
            .AllowUnsort(true)
            .SortMode(GridSortMode.MultipleColumn)
            .ShowIndexes(true))

## Defining Field Type

If you want to sort a column as a different type than the original one in the database, e.g. decimal<->string and vice versa, you can use the following approach:

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

## See Also

* [Sorting by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/sorting)
* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/grid)
