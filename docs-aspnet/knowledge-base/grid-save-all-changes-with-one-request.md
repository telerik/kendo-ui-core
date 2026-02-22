---
title: Save All Pending Changes in Grid through a Single Request
page_title: Save All Pending Changes in Grid through a Single Request
description: "Save all pending changes in the {{ site.product }} Grid through a single request in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/editing/save-all-changes-with-one-request, /html-helpers/data-management/grid/how-to/editing/save-all-changes-with-one-request
slug: howto_saveallchangeswithonerequest_gridaspnetmv
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

How can I save all pending changes in an InCell editable Grid through a single request to the server?

## Solution

The solution relies on the following key steps:

1. Create an InCell editable Grid:

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridEditSyncChangesWithOneRequest.Models.Order>()
        .Name("Grid")
        .ToolBar(toolBar => toolBar.Create())
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .DataSource(dataSource => dataSource
            .Ajax()
            .ServerOperation(false)
            .Model(model => {
                model.Id(p => p.OrderID);
                model.Field(p => p.OrderID).Editable(false);
            })
            .Create(create => create.Action("Create", "Home"))
            .Destroy(destroy => destroy.Action("Delete", "Home"))
            .Read(read => read.Action("Read", "Home"))
            .Update(update => update.Action("Update", "Home"))
        )
        ... // Additional configuration.
    )
    ```

1. Add an external button that will submit all current Grid changes by triggering an Ajax request to the server:

    ```JS
    <button onclick="sendData()">Save Changes</button>

    <script>
        function sendData() {
            var grid = $("#Grid").data("kendoGrid"),
                parameterMap = grid.dataSource.transport.parameterMap;

            // Get the new and the updated records.
            var currentData = grid.dataSource.data();
            var updatedRecords = [];
            var newRecords = [];

            for (var i = 0; i < currentData.length; i++) {
                if (currentData[i].isNew()) {
                    // A new record.
                    newRecords.push(currentData[i].toJSON());
                } else if (currentData[i].dirty) {
                    updatedRecords.push(currentData[i].toJSON());
                }
            }

            // Deleted records.
            var deletedRecords = [];
            for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
                deletedRecords.push(grid.dataSource._destroyed[i].toJSON());
            }

            var data = {};
            $.extend(data, parameterMap({ updated: updatedRecords }), parameterMap({ deleted: deletedRecords }), parameterMap({ new: newRecords }));

            $.ajax({
                url: "@Url.Action( "UpdateCreateDelete", "Home")",
                data: data,
                type: "POST",
                success: function () {
                    alert("update on server is completed");
                    grid.dataSource._destroyed = [];
                    // Refresh the grid (optional)
                    grid.dataSource.read();
                }
            });
        }
    </script>
    ```
    ```C# HomeController
    public ActionResult UpdateCreateDelete(
        [Bind(Prefix = "updated")] List<Order> updatedOrders,
        [Bind(Prefix = "new")] List<Order> newOrders,
        [Bind(Prefix = "deleted")] List<Order> deletedOrders)
    {
        if (updatedOrders != null && updatedOrders.Count > 0)
        {
            for (int i = 0; i < updatedOrders.Count; i++)
            {
                var target = orderList.Where(o => o.OrderID == updatedOrders[i].OrderID).FirstOrDefault();

                if (target != null)
                {
                    int targetIndex = orderList.IndexOf(target);
                    orderList[targetIndex].OrderDate = updatedOrders[i].OrderDate;
                    orderList[targetIndex].EmployeeID = updatedOrders[i].EmployeeID;
                    orderList[targetIndex].OrderDescription = updatedOrders[i].OrderDescription;
                }
            }
        }

        if (newOrders != null && newOrders.Count > 0)
        {
            for (int i = 0; i < newOrders.Count; i++)
            {
                newOrders[i].OrderID = orderList[orderList.Count - 1].OrderID + 1;
                orderList.Add(newOrders[i]);
            }
        }

        if (deletedOrders != null && deletedOrders.Count > 0)
        {
            for (int i = 0; i < deletedOrders.Count; i++)
            {
                var target = orderList.Where(o => o.OrderID == deletedOrders[i].OrderID).FirstOrDefault();

                if (target != null)
                {
                    orderList.Remove(target);
                }
            }
        }

        return Json("Success!");
    }
    ```

To review the complete example, refer to the [project on how to save all changes in a Telerik UI Grid using a single request to the server](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditSyncChangesWithOneRequest) in ASP.NET MVC applications.

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

