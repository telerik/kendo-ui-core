---
title: Popup
page_title: Popup
description: "Define commands and set the edit mode to configure the Telerik UI Grid HtmlHelper for {{ site.framework }} for popup editing."
slug: popupediting_grid_aspnetcore
position: 3
---

# Popup Editing

You can define commands and set the edit mode to configure the Telerik UI Grid for {{ site.framework }} for popup editing.

For runnable examples, refer to the [demos on implementing the editing approaches in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/editing).

## Setting the Popup Edit Mode

1. Add a new class to the `~/Models` folder. The following example uses the `OrderViewModel` name.

        public class OrderViewModel
        {
            // The example will use this as a unique model Id.
            public int OrderID { get; set; }

            public string ShipCountry { get; set; }

            public int Freight { get; set; }
        }

1. Add an empty MVC Controller `GridController.cs` and add a new action method `ReadOrders` which will return the **Orders** as JSON in the expected format. The Grid will make Ajax requests to this action.

        using AspNetCoreGrid.Models;
        using Kendo.Mvc.Extensions; // You need this to be able to use the ToDataSourceResult() method for processing the request.
        using Kendo.Mvc.UI; // You need this to be able to use the DataSourceRequest class and attribute to parse the request.

        public class GridController : Controller
        {
            // The example will add some dummy data but you can use a data base Select() if you like.
            public static List<OrderViewModel> orders = Enumerable.Range(1, 10).Select(i => new OrderViewModel
            {
                OrderID = i,
                ShipCountry = i % 2 == 0 ? "ShipCountry 1" : "ShipCountry 2",
                Freight = i * 10
            }).ToList();

            public IActionResult ReadOrders([DataSourceRequest]DataSourceRequest request)
            {
                return Json(orders.ToDataSourceResult(request));
            }
        }

1. Add a new action method to `GridController.cs`. It will be responsible for saving the new data items. Name the method `CreateOrders`.  The `Create` method has to return a collection of the created records with the assigned Id field.

        public IActionResult CreateOrders([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
        {
            if (ModelState.IsValid)
            {
                // Add a model Id so that the dataSource will treat this item as existing next time.
                order.OrderID = orders.Count + 1;

                // Save the item in the data base.
                orders.Add(order);
            }

            // Return a collection which contains only the newly created item and any validation errors.
            return Json(new[] { order }.ToDataSourceResult(request, ModelState));
        }

1. Add a new action method to `GridController.cs`. It will be responsible for saving the updated data items. Name the method `UpdateOrders`.

        public IActionResult UpdateOrders([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
        {
            if (ModelState.IsValid)
            {
                // Save the item in the data base or follow with the dummy data.
                for (int i = 0; i < orders.Count; i++)
                {
                    // The example uses the model Id to identify the model that needs to be updated.
                    if(orders[i].OrderID == order.OrderID)
                    {
                        orders[i] = order;
                        break;
                    }
                }
            }

            // Return a collection which contains only the updated item and any validation errors.
            return Json(new[] { order }.ToDataSourceResult(request, ModelState));
        }

1. Add a new action method to `GridController.cs`. It will be responsible for saving the deleted data items. Name the method `DestroyOrders`.

        public IActionResult DestroyOrders([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
        {
            // Delete the item in the data base or follow with the dummy data.
            orders.Remove(order);

            // Return a collection which contains only the destroyed item.
            return Json(new[] { order }.ToDataSourceResult(request));
        }

1. In the view, configure the Grid to use the action methods created in the previous steps. The `Create`, `Update`, and `Destroy` action methods have to return a collection with the modified or deleted records so the DataSource on the client is aware of the server-side changes.

        @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
            .Name("grid")
            .ToolBar(tools=>
            {
                tools.Create();
            })
            .Columns(columns =>
            {
                columns.Bound(f => f.OrderID);
                columns.Bound(f => f.ShipCountry);
                columns.Bound(f => f.Freight);
                columns.Command(command => {
                    command.Edit();
                    command.Destroy();
                });
            })
            .Editable(editable => editable.Mode(GridEditMode.PopUp))
            .DataSource(d =>
            {
                d.Ajax()
                .Model(model =>
                {
                    model.Id(product => product.OrderID); // Specify the property which is the unique identifier of the model.
                    model.Field(product => product.OrderID).Editable(false); // Make the OrderID property not editable.
                })
                .Create(create => create.Action("CreateOrders", "Grid")) // Action invoked when the user saves a new data item.
                .Read(read => read.Action("ReadOrders", "Grid"))  // Action invoked when the Grid needs data.
                .Update(update => update.Action("UpdateOrders", "Grid"))  // Action invoked when the user saves an updated data item.
                .Destroy(destroy => destroy.Action("DestroyOrders", "Grid")); // Action invoked when the user removes a data item.
            })
        )

## Handling ModelState Errors

When editing is performed, server validation is often needed. This section demonstrates how to use the `AddModelError` method with the Telerik UI Grid for {{ site.framework }}.

1. Perform all steps from the previous section.
1. Add some validation code to the `UpdateOrders` method. For example, check the length of the `ShipCountry` property.

         public IActionResult UpdateOrders([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
        {
            if (order.ShipCountry.Length < 3)
            {
                ModelState.AddModelError("ShipCountry", "ShipCountry should be at least three characters long.");
            }

            if (ModelState.IsValid)
            {
                // Save the item in the data base or follow with the dummy data.
                for (int i = 0; i < orders.Count; i++)
                {
                    // The example uses the model Id to identify the model that needs to be updated.
                    if(orders[i].OrderID == order.OrderID)
                    {
                        orders[i] = order;
                        break;
                    }
                }
            }

            // Return a collection which contains only the updated item and the ModelState which holds the custom error.
            return Json(new[] { order }.ToDataSourceResult(request, ModelState));
        }

1. Subscribe to the [`DataSource.Error()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/DataSourceEventBuilder#errorsystemstring) event handler. It is fired when model state errors or other unexpected problem occur when making the Ajax request. To prevent the popup from closing, get the Grid instance in the error event handler, prevent the Grid from `DataBinding`, and display the errors as a tooltip.

        .DataSource(d =>
        {
            d.Ajax()
            .Model(model =>
            {
                model.Id(product => product.OrderID);
                model.Field(product => product.OrderID).Editable(false);
            })
            .Create(create => create.Action("CreateOrders", "Grid"))
            .Read(read => read.Action("ReadOrders", "Grid"))
            .Update(update => update.Action("UpdateOrders", "Grid"))
            .Destroy(destroy => destroy.Action("DestroyOrders", "Grid"))
            .Events(events => events.Error("onError")); // Add the error handler to the DataSource.
        })

        <script>
            function onError(args) {
                var errors = args.errors;
                if (errors) {
                    var grid = $("#grid").data("kendoGrid");
                        grid.one("dataBinding", function (e) {
                           e.preventDefault();
                           $.each(errors, function (key, value) {
                               var message = "";
                               if ('errors' in value) {
                                   $.each(value.errors, function() {
                                     message += this + "\n";
                                   });
                               }

                                // As long as the key matches the field name, this line of code will be displayed as validation message in the popup.
                               grid.editable.element.find("[data-valmsg-for='" + key + "']").replaceWith('<div class="k-widget k-tooltip k-tooltip-error" style="margin:0.5em"><span class="k-icon k-i-warning"> </span>' + message + '<div class="k-callout k-callout-n"></div></div>').show();
                        });
                    });
                }
            }
        </script>

## See Also

* [Editing Approaches by the Grid HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/editing)
* [Server-Side API](/api/grid)
