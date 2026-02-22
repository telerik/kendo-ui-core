---
title: Edit Hierarchical Grids in InCell Mode
page_title: Edit Hierarchical Grids in InCell Mode
description: "Edit hierarchical {{ site.product }} Grids in InCell editing mode in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/editing/edit-hierarchical-grids-in-incell-mode, /html-helpers/data-management/grid/how-to/editing/edit-hierarchical-grids-in-incell-mode
slug: howto_edithierarchicalinincellmode_gridaspnetmvc
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

How can I edit hierarchical Grids in InCell edit mode?

## Solution

You can achieve this requirement using the following implementation:

1. Create a hierarchical Grid and configure it for InCell editing:

    ```HtmlHelper
    @(Html.Kendo().Grid<EmployeeViewModel>()
        .Name("Employees")
        .Columns(columns =>
        {
            columns.Bound(e => e.FirstName).Width(140);
            columns.Bound(e => e.LastName).Width(140);
            columns.Bound(e => e.Title).Width(200);
            columns.Bound(e => e.Country).Width(200);
            columns.Bound(e => e.City);
            columns.Command(command =>
                {
                    command.Destroy();
                });
        })
        .ToolBar(tools => {
            tools.Create();
            tools.Save();
        })
        .Scrollable()
        .Editable(e => e.Mode(GridEditMode.InCell))
        .Pageable()
        .Sortable()
        .Filterable()
        .Navigatable()
        .DataSource(source => source
            .Ajax()
            .Model(model =>
            {
                model.Id(e => e.EmployeeID);
                model.Field(e => e.EmployeeID).Editable(false);
            })
            .Read(read => read.Action("Read_Employees", "Employees"))
            .Update(update => update.Action("Update_Employee", "Employees"))
            .Create(create => create.Action("Create_Employee", "Employees"))
            .Destroy(destroy => destroy.Action("Destroy_Employee", "Employees")))
        .ClientDetailTemplateId("OrdersTemplate")
    )
    ```

1. Define the detail Grid within the [Kendo UI template](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external):

    ```HtmlHelper
    <script type="text/kendo-tmpl" id="OrdersTemplate">
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("Orders_#=EmployeeID#")
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderID).Width(101);
            columns.Bound(o => o.ShipCountry).Width(140);
            columns.Bound(o => o.ShipAddress).Width(200);
            columns.Bound(o => o.ShipName).Width(200);
            columns.Bound(o => o.ShippedDate).Format("{0:d}");
            columns.Command(command =>
            {
                command.Edit();
                command.Destroy();
            });
        })
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
            .Destroy(destroy => destroy.Action("Destroy_Order", "Orders")))
        .ToClientTemplate()
    )
    </script>
    ```

1. Handle the `keydown` event on the main Grid's table and set the currently focused cell in edit mode when `Enter` is pressed:

    ```JS
        $(function () {
            $("#Employees table").on("keydown", function (e) {
                // If current key is "Enter".
                if (e.keyCode == 13) {
                    // Prevent the "keydown" event action.
                    e.stopImmediatePropagation();
                    var grid = $("#Employees").data("kendoGrid");
                    var currentCell = grid.current();

                    if (currentCell.is(".k-edit-cell")) {
                        setTimeout(function () {
                            grid.closeCell();
                            grid.table.focus();
                        });
                    } else {
                        if (!currentCell.hasClass("k-hierarchy-cell")) {
                            grid.editCell(currentCell);
                        }
                    }
                }
            });
        });
    ```

For review the complete example, refer to the [project on how to edit a hierarchical Grid that is set up for InCell editing](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridHierarchyInCellEditing) in ASP.NET MVC applications.

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
