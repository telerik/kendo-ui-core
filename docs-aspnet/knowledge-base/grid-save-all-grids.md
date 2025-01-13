---
title: Saving Changes in All Grids
page_title: Saving Changes in All Grids
description: "Learn how to enable the user to save the changes in all Grids when working with the Telerik UI for {{ site.framework }} components."
slug: grid-save-all-grids
tags: grid, all, save, changes, core, mvc, telerik
component: grid
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.314 version</td>
 </tr>
</table>


## Description

How can I consolidate the save operations of all the {{ site.product }} Grids through an external **Save** button?

## Solution

To achieve the desired scenario:

1. Create an external **Save** Button and subscribe to its [`Click`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/buttoneventbuilder#clicksystemstring) event.
1. Within the `Click` handler, loop through all utilized Grids by accessing them through the `.k-grid` class and save the changes by using the [`saveChanges()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/savechanges) method.

```Index.cshtml
    @(Html.Kendo().Button()
      .Name("saveBtn")
      .Content("Save changes")
      .Events(e=>e.Click("onClickHandler"))
    )

    <h1>Grid #1</h1>
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid1")
        .Columns(columns => {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(140);
            columns.Command(command => command.Destroy()).Width(150);
        })
        .ToolBar(toolbar => {
            toolbar.Create();
        })
        .Scrollable()
        .Height(200)
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Batch(true)
            .PageSize(20)
            .ServerOperation(false)
            .Model(model => model.Id(p => p.ProductID))
            .Create("Editing_Create", "Grid")
            .Read("Editing_Read", "Grid")
            .Update("Editing_Update", "Grid")
            .Destroy("Editing_Destroy", "Grid")
        )
    )

    <h1>Grid #2</h1>
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid2")
        .Columns(columns => {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(140);
            columns.Command(command => command.Destroy()).Width(150);
        })
        .ToolBar(toolbar => {
            toolbar.Create();
        })
        .Height(200)
        .Scrollable()
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Batch(true)
            .PageSize(20)
            .ServerOperation(false)
            .Model(model => model.Id(p => p.ProductID))
            .Create("Editing_Create", "Grid")
            .Read("Editing_Read", "Grid")
            .Update("Editing_Update", "Grid")
            .Destroy("Editing_Destroy", "Grid")
        )
    )
```
```Script.js
    <script type="text/javascript">
            function onClickHandler(e){
                $(".k-grid").each(function (index, value) {
                     var grid = $(this).data("kendoGrid"); // Get the reference of the current Grid widget instance.
                     grid.saveChanges(); // Save the changes for the current Grid widget instance.
                });
            }
    </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on saving all changes in  Grids](https://netcorerepl.telerik.com/QnEeQhEV26Fi4SlI30).

## More {{ site.framework }} Grid Resources
* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)
{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid  for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid  for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik REPL: Save Changes in All Grids](https://netcorerepl.telerik.com/QnEeQhEV26Fi4SlI30)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)