---
title: Selection
page_title: Selection | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the selection functionality of the Kendo UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_selection
position: 5
---

# Selection

By default, the selection functionality of the Kendo UI Grid for ASP.NET Core is disabled.

To control the selection in the Grid, use the `Selectable` property.

###### Example

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("rowSelection")
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple))
		...


You can set the selectable mode to `Multiple` or `Single`. Additionally, the Grid provides the `Row` and `Cell` select types which allow multiple or single selection of rows or cells.

###### Example		

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("cellSelection")
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .Type(GridSelectionType.Cell))
        ...

The Grid also provides built-in functionality for persisting the selection through the `PersistSelection` property and its setting it to `true`. However, in order for the persisting functionality to work, you have to configure the `ID` field in the schema of the DataSource.

###### Example

        .PersistSelection(true)
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.OrderID))

## See Also

* [JavaScript API Reference of the Grid](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Grid HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview)
* [Grid Official Demos](http://demos.telerik.com/aspnet-core/grid/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
