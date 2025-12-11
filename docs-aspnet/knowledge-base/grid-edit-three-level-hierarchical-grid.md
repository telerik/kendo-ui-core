---
title: Edit Three-Level Hierarchical Grids
page_title: Edit Three-Level Hierarchical Grids
description: "Edit three-level hierarchical {{ site.product }} Grids in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/editing/edit-three-level-hierarchical-grid, /html-helpers/data-management/grid/how-to/editing/edit-three-level-hierarchical-grid
slug: howto_editthreelevelhierarchygrids_gridaspnetmvc
component: grid
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I implement a three-level hierarchical editable Grid?

## Solution

You can achieve this requirement using the following implementation:

1. Define the main InLine editable Grid:

    ```HtmlHelper
    @(Html.Kendo().Grid<GridEditing3LevelHierarchyEmployee>()
        .Name("Employees")
        .ClientDetailTemplateId("OrderDetailsTemplate")
        ... // Additional configuration.
    )
    ```

1. Define the first detail Grid with enabled InLine editing mode:

    ```HtmlHelper
    <script type="text/kendo" id="OrdersTemplate">
    @(Html.Kendo().Grid<GridEditing3LevelHierarchyOrder>()
        .Name("Orders_#=EmployeeID#")
        .Columns(columns =>
        {
            ... // Columns configuration.
        })
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .ToolBar(tools => tools.Create())
        .Pageable()
        .Sortable()
        .Filterable()
        .DataSource(source => source
            .Ajax()
            .Model(model =>
            {
                model.Id(o => o.OrderID);
                model.Field(o => o.OrderID).Editable(false);
            })
            .Read(read => read.Action("Read_Orders", "Orders", new { id = "#=EmployeeID#" }))
            .Update(update => update.Action("Update_Order", "Orders"))
            .Create(create => create.Action("Create_Order", "Orders", new { id = "#=EmployeeID#" }))
            .Destroy(destroy => destroy.Action("Destroy_Order", "Orders"))
        )
        .ClientDetailTemplateId("OrderDetailsTemplate")
        .ToClientTemplate()
    )
    </script>
    ```

1. Define the second detail Grid with enabled InLine editing mode. Its parent Grid is **Orders_#=EmployeeID#**:

    ```HtmlHelper
    <script type="text/kendo" id="OrderDetailsTemplate">
    @(Html.Kendo().Grid<GridEditing3LevelHierarchyOrder_Detail>()
        .Name("OrderDetails_#=OrderID#")
        .Columns(columns =>
        {
            ... // Columns configuration.
        })
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .ToolBar(tools => tools.Create())
        .Pageable()
        .Sortable()
        .Filterable()
        .DataSource(source=> source
            .Ajax()
            .Model(model =>
            {
                model.Id(o => o.OrderID);
                model.Field(o => o.ProductID).DefaultValue(1);
            })
            .Read(read => read.Action("Read_OrderDetails", "OrderDetails", new { id = "#=OrderID#" }))
            .Update(update => update.Action("Update_Order_Detail", "OrderDetails"))
            .Create(create => create.Action("Create_Order_Detail", "OrderDetails", new { id = "#=OrderID#" }))
            .Destroy(destroy => destroy.Action("Destroy_Order_Detail", "OrderDetails"))
        )
        .ToClientTemplate()
    )
    </script>
    ```

To review the complete example, refer to the [project on how to implement editable Grids of a three-level hierarchy](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditing3LevelHierarchy) in ASP.NET MVC applications.

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
