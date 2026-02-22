---
title: Use Grid with ContextMenu
page_title: Use Grid with ContextMenu Component
description: "Use the {{ site.product }} Grid with the {{ site.product }} ContextMenu in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/Integration/use-grid-with-contextmenu, /html-helpers/data-management/grid/how-to/Integration/use-grid-with-contextmenu
slug: howto_usegridwithontextmenu_gridaspnetmv
component: grid
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid, <br/>
    {{ site.product }} ContextMenu
  </td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I integrate the ContextMenu component into the Grid?

## Solution

You can achieve this requirement using the following implementation:

1. Define an editable Grid:

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridContextMenu.Models.Order>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.OrderID);
            columns.ForeignKey(p => p.EmployeeID, (System.Collections.IEnumerable) ViewData["employees"], "EmployeeID", "Name");
            columns.Bound(p => p.OrderDescription);
            columns.Bound(p => p.OrderDate).Format("{0:d}");
            columns.Bound(p => p.OrderTotal).Format("{0:c}");
            columns.Bound(p => p.IsCompleted);
            columns.Command(c =>
            {
                c.Edit();
                c.Destroy();
            });
        })
        .ToolBar(toolBar => toolBar.Create())
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .Pageable()
        .Sortable()
        .Scrollable()
        .Filterable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .ServerOperation(false)
            .Model(model =>
            {
                model.Id(p => p.OrderID);
                model.Field(p => p.OrderID).Editable(false);
            })
            .Create(create => create.Action("Create", "Home").Data("sendCulture"))
            .Destroy(destroy => destroy.Action("Delete", "Home").Data("sendCulture"))
            .Read(read => read.Action("Read", "Home").Data("sendCulture"))
            .Update(update => update.Action("Update", "Home").Data("sendCulture"))
        )
    )
    ```

1. Define the ContextMenu component and handle its `Select` event to handle the selected action:

    ```HtmlHelper
    @(Html.Kendo().ContextMenu()
        .Name("contextMenu")
        .Target("#grid table")
        .Filter("tr")
        .Events(e => e.Select("onSelect"))
        .Items(items =>
        {
            items.Add()
                .Text("Delete").HtmlAttributes(new { @class = "k-grid-delete" });

            items.Add()
                .Text("Edit").HtmlAttributes(new { @class = "k-grid-edit" });
        })
    )
    ```
    ```JS Scripts
        function onSelect(e) {
            var row = $(e.target);
            var grid = $("#grid").data("kendoGrid");
            var item = $(e.item);
            if (item.hasClass("k-grid-delete")) {
                grid.removeRow(row);
            } else {
                grid.editRow(row);
            }
        }
    ```

To review the complete example, refer to the [project on how to use the Grid with the ContextMenu component](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridContextMenu) in ASP.NET MVC applications.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)


