---
title: Trigger SaveChanges outside the Grid
description: An example on how to invoke the saveChanges method from a button in the Telerik UI Grid for {{ site.framework }}.
type: how-to
page_title: Save Grid Changes from External Button
slug: grid-savechanges-external-button
tags: grid, saveChanges, button
ticketid: 1544067
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product Version</td>
  <td>2021.3.1109</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
</table>

## Description

How can I save the changes in the {{ site.product }} Grid by using an outside button?

## Solution

1. Add an event handler for the `Click` event of the external button.
1. Get a [`reference`](https://docs.telerik.com/aspnet-core/getting-started/helper-basics/fundamentals#referencing-client-side-objects) to the Grid.
1. Use the client-side [`saveChanges`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/savechanges) method.

```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("Grid")
        .Columns(columns => {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(140);
            columns.Bound(p => p.UnitsInStock).Width(140);
            columns.Bound(p => p.Discontinued).Width(100);
            columns.Command(command => command.Destroy()).Width(150);
        })
        .ToolBar(toolbar => {
            toolbar.Create();
        })
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Pageable()
        .Navigatable()
        .Sortable()
        .Scrollable()
        .Events(events => events.Sort("onSort"))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Batch(true)
            .PageSize(20)
            .ServerOperation(false)
            .Events(events => events.Error("error_handler"))
            .Model(model => model.Id(p => p.ProductID))
            .Create("Editing_Create", "Grid")
            .Read("Editing_Read", "Grid")
            .Update("Editing_Update", "Grid")
            .Destroy("Editing_Destroy", "Grid")
        )
    )
    @(Html.Kendo().Button()
      .Name("saveBtn")
      .Content("Save changes")
      .Events(e=>e.Click("onClickHandler"))
    )
```
```script.js
    function onClickHandler() {
        var grid = $("#grid").data("kendoGrid");
        grid.saveChanges();
    }
```

For a runnable example based on the code above, refer to the [Telerik REPL project on saving Grid changes through an external button](https://netcorerepl.telerik.com/wFlbwpOV22rd6T9S11) example.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Save Grid Changes through External Button](https://netcorerepl.telerik.com/wFlbwpOV22rd6T9S11)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
