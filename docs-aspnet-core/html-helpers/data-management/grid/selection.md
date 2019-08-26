---
title: Selection
page_title: Selection | Telerik UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the selection functionality of the Telerik UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_selection
position: 8
---

# Selection

By default, the selection functionality of the Telerik UI Grid for ASP.NET Core is disabled.

## Getting Started

To control the selection in the Grid, use the `Selectable` property.

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("rowSelection")
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple))
		...

## Select Modes

The Grid supports the following select modes:
* [Single and multiple selection (demo)](https://demos.telerik.com/aspnet-core/grid/selection)
* [Checkbox selection (demo)](https://demos.telerik.com/aspnet-core/grid/checkbox-selection)

You can set the select mode to `Multiple` or `Single`. Additionally, the Grid provides the `Row` and `Cell` select types which allow multiple or single selection of rows or cells.

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("cellSelection")
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .Type(GridSelectionType.Cell))
        ...


## Persisting the Selection

The Grid also provides a built-in functionality for persisting the selection through the `PersistSelection` property and its setting it to `true`. You also need to configure the `ID` field in the schema of the DataSource. For a runnable example, refer to the [demo on persisting the state of the Grid](https://demos.telerik.com/aspnet-core/grid/persist-state).

        .PersistSelection(true)
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.OrderID))

## See Also

* [Multiple Selection by the Grid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/selection)
* [Checkbox Selection by the Grid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/checkbox-selection)
* [Persisting the State of the Grid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/persist-state)
* [Server-Side API](/api/grid)
