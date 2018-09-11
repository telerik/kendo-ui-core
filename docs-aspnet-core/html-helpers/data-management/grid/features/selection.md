---
title: Selection
page_title: Selection | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the selection functionality of the Kendo UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_selection
position: 5
---

# Grid Selection

By default, the selection functionality of the Kendo UI Grid for ASP.NET Core is disabled.

The selection functionality of the Grid is controlled by the `Selectable` property:

###### Example
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("rowSelection")
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple))
		...	


The Selectable Mode could be set to `Multiple` or `Single`. Additionally, there is `Row` and `Cell` select type, which allows multiple or single selection over the rows or over the cells:
		
###### Example		
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("cellSelection")
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .Type(GridSelectionType.Cell))
        ...
		
The Grid also provides built-in functionality for persisting the selection by setting the `PersistSelection` property to `true`. However, in order for the persisting functionality to work, the DataSource of the Grid should have configured `ID` field in the schema:

###### Example
        .PersistSelection(true)
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.OrderID))
			
			