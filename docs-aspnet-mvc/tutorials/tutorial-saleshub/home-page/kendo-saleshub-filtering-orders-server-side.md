---
title: Filter Orders on the Server
page_title: Filter Orders on the Server | Kendo UI Sales Hub Tutorial
description: "Learn how to do server-side filtering of customer orders in the Kendo UI Sales Hub project by using Telerik UI for ASP.NET MVC."
previous_url: /kendo-ui/tutorials/asp.net/saleshub/home-page/kendo-saleshub-filtering-orders-server-side
slug: filterordersonserver_saleshubtutorial_aspnetmvc
position: 3
---

# Filter Orders on the Server

![kendo-saleshub-customer-TreeView-and-grid-screenshot](/tutorials/tutorial-saleshub/home-page/images/kendo-saleshub-customer-treeview-and-grid-screenshot.png)

Since **SalesHub** contains a lot of orders for various customers, it would not be very efficient for **all**
of the orders to be returned when the orders grid renders. To reduce wait times and cut back on the amount of bandwidth
that is used when retrieving orders from the server, the [Kendo DataSource](http://demos.telerik.com/kendo-ui/web/datasource/index.html)
that the orders grid uses has been configured to do server-side operations.

## Configuration

### Enable Server Operations

To support filtering on the server side in the **Orders** Grid, enable `ServerOperation` for the Grid on the DataSource declaration.

The following example is an excerpt from the declaration of the **Orders** Grid&mdash;which can be found in **Views/Home/Index.cshtml**&mdash;which shows the configuration of the DataSource.

###### Example

    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(builder => builder.Url("/api/CustomerOrders/GetOrdersForCustomer/").Type(HttpVerbs.Get))
        .Model(model => model.Id("OrderId"))
        .ServerOperation(true)
        .PageSize(20)

The most important part of the DataSource configuration is the `ServerOperation(true)` function call. The passing of `true` to this function makes the resulting client-side Kendo UI DataSource include any [filters](../../../../kendo-ui/api/javascript/data/datasource#methods-filter) that are applied to it in the request, which it sends to the server. In passing along any filters that need to be applied, the DataSource will also pass up any paging information (if it has been configured for it) to the server in its request.

For the full declaration for the **Orders** Grid, refer to **Views/Home/Index.cshtml**.

### Support Server-Side Operations

To make the supporting server-side filtering easier, the Kendo UI MVC extensions expose a few classes and functions which handle this approach. The extensions provide `DataSourceRequest`, `DataSourceResponse`, and `ToDataSourceResult` to help with the server-side filtering.

The following example demonstrates part of the code in `Api/CustomerOrdersController.cs` that supports this behavior.

###### Example

    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;
    using SalesHub.Client.ViewModels.Api;
    using SalesHub.Core.Models;
    using SalesHub.Core.Repositories;

    namespace SalesHub.Client.Api
    {
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public class CustomerOrdersController : Controller
        {
            private readonly IOrderRepository _orderRepository;

            public CustomerOrdersController(IOrderRepository orderRepository)
            {
                _orderRepository = orderRepository;
            }

            public JsonResult GetOrdersForCustomer([DataSourceRequest] DataSourceRequest request)
            {
                IQueryable<Order> orders = _orderRepository.GetAllOrders();

                DataSourceResult response = orders.ToDataSourceResult(request, o => new CustomerOrderViewModel
                {
                    IsActive = o.IsActive,
                    OrderDate = o.OrderDate,
                    OrderId = o.OrderId,
                    OrderNumber = o.OrderNumber,
                    Value = o.ContractAmount,
                    Weight = o.ContractWeight
                });
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }
    }
<--*-->

The implementation for the `CustomerOrdersController` is short, because the Kendo UI MVC extensions greatly reduce the amount of code you have to write to support filtering.

**Breakdown of Code**

The following example demonstrates the first chunk of code.

###### Example

    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;

The `using` statements in the implementation of the Controller are important because they include the namespaces, which contain the DataSource
request helpers that are used later.

###### Example

    [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]


<--*-->
Though not related to Kendo UI, this attribute is useful when trying to prevent some browsers (for example, Internet Explorer) from caching AJAX calls to the service. They need to be included on the Controller because the underlying data might change any time and the data has to be updated for the user to see.

###### Example

    public JsonResult GetOrdersForCustomer([DataSourceRequest] DataSourceRequest request)

In the previous example, an MVC Action for the `CustomerOrdersController` is declared. The return value of the function is a `JsonResult` because it is a data service. As filtering data will be received from the client-side DataSource, you have to take a `DataSourceRequest` object as a parameter. The `[DataSourceRequest]` attribute, which is applied to the parameter, is used by the MVC framework when it binds data from the request to parameters that the Action takes.

###### Example

    IQueryable<Order> orders = _orderRepository.GetAllOrders();

    DataSourceResult response = orders.ToDataSourceResult(request, o => new CustomerOrderViewModel
    {
        IsActive = o.IsActive,
        OrderDate = o.OrderDate,
        OrderId = o.OrderId,
        OrderNumber = o.OrderNumber,
        Value = o.ContractAmount,
        Weight = o.ContractWeight
    });
    return Json(response, JsonRequestBehavior.AllowGet);

<--_-->
In the body of the function you get all orders from the database in the form of a Queryable. Then you need to call an extension method, `ToDataSourceResult`, on the Queryable of orders. This extension method is provided by the Kendo UI MVC extensions and handles the filtering of the Queryable of orders based on the `DataSourceRequest` that you get from DataSource.

The `ToDataSourceResult` also provides an overload which allows you to specify a selector function. This selector function is the same as what is normally passed to the standard `Select` LINQ function. In this case, you have to convert each order to a `CustomerOrderViewModel` before it is returned to the client.

The `DataSourceResult` you get from calling `ToDataSourceResult` contains the filtered list of Orders, which can now be returned to the client by calling the `Json` function and passing in the response.

### Filter Orders by Customer

To display orders for the currently selected Customer in the TreeView, you need to write some custom JavaScript. The JavaScript you now have only listens to the `select` event of the Customer TreeView and updates the filters on the DataSource, which is used by the **Orders** Grid.

The following code snippets are located in **Scripts/home.js**.

###### Example

    var updateGridCustomerFilter = function (customerId) {
        var ordersGrid = $("#ordersGrid").data("kendoGrid");
        ordersGrid.dataSource.filter({ field: "CustomerId", operator: "eq", value: customerId });
    };

    window.SalesHub.CustomerTreeView_Select = function (e) {
        var node = $(e.node);
        var dataItem = e.sender.dataItem(e.node);

        if (!dataItem.hasChildren) {
            updateGridCustomerFilter(node.data("customer-id"));
        }
    };

During its [setup](kendo-saleshub-customer-TreeView), a `select` event handler is configured for the customer TreeeView and the `window.SalesHub.CustomerTreeView_Select` event handler is stated.

###### Example

    window.SalesHub.CustomerTreeView_Select = function (e) {
        var node = $(e.node);
        var dataItem = e.sender.dataItem(e.node);

        if (!dataItem.hasChildren) {
            updateGridCustomerFilter(node.data("customer-id"));
        }
    };

The event handler contains an `e` parameter. This is the event object that you get from the Kendo UI TreeView when a new node is selected in it. It contains information about which node is selected.

###### Example

    var node = $(e.node);
    var dataItem = e.sender.dataItem(e.node);

The first part of the event handler interacts with the `node` property on the event object. The `node` property is the DOM element that is selected. That is why you need to convert the DOM object into a jQuery object and then get the corresponding `dataItem` for that node.

The `dataItem` you get from the Kendo UI TreeView is an object that the Kendo UI TreeView uses to describe each node in the tree.

###### Example

    if (!dataItem.hasChildren) {
        updateGridCustomerFilter(node.data("customer-id"));
    }

After the `dataItem` and the jQuery object for the node are present, you need to check if the node that was selected was actually a customer. To achieve this, see if the `dataItem` has any children. If the `dataItem` has no children, a customer was selected.

Now you need to call the `updateGridCustomerFilter` function, which takes a `customerId` as a parameter. Because the `data-customer-id` attribute was added to all of the customer nodes when the TreeView was generated on the server side, you need to retrieve that value from the jQuery object by calling the `data` function on it.

The following example demonstrates the function which commands the update of the filters on the Grid.

###### Example

    var updateGridCustomerFilter = function (customerId) {
        var ordersGrid = $("#ordersGrid").data("kendoGrid");
        ordersGrid.dataSource.filter({ field: "CustomerId", operator: "eq", value: customerId });
    };

First, you have to find the **Orders** Grid element on the page by using a jQuery selector locating it by id. Once you get the Grid on the page, get the `kendoGrid` object that is associated with it.

After you got the `kendoGrid` object, access the DataSource for it through the `dataSource` property. Call the `filter` function on it and pass in a new filter object to it by using the DataSource.

###### Example

    { field: "CustomerId", operator: "eq", value: customerId }

The filter you add to the DataSource indicates that the DataSource has to contain only items, which have a `CustomerId` equal to the `customerId` that you got as a parameter to the function. By adding this filter, the DataSource sends a request to the server asking only for Orders that belong to the specified customer.

## See Also

Other articles on the Kendo UI Sales Hub project and its **Home** and **Order** pages:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_saleshubtutorial_aspnetmvc %})
* [Create the Customer TreeView]({% slug createcustomtreeview_saleshubtutorial_aspnetmvc %})
* [Create the Orders Grid]({% slug createordersgrid_saleshubtutorial_aspnetmvc %})
* [Create and Edit Orders]({% slug createeditorders_saleshubtutorial_aspnetmvc %})
* [Handle Order Details]({% slug handleorderdetails_saleshubtutorial_aspnetmvc %})
* [Create the Search Box]({% slug createsearchbox_saleshubtutorial_aspnetmvc %})
