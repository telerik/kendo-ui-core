---
title: Filtering Order's Server-Side
page_title: Tutorial SalesHub - Filtering Orders Server-Side
previous_url: /tutorials/asp.net/saleshub/home-page/kendo-saleshub-filtering-orders-server-side
---

# Tutorial: SalesHub: Filtering Orders Server-Side

  - [Configure Grid for Server-Side Operations](#configure-grid-for-server-side-operations)
  - [Support Server-Side Operations](#support-server-side-operations)
  - [Filter Orders by Customer](#filter-orders-by-customer)

![kendo-saleshub-customer-TreeView-and-grid-screenshot](/aspnet-mvc/tutorial-saleshub/home-page/images/kendo-saleshub-customer-treeview-and-grid-screenshot.png)

Since **SalesHub** contains a lot of orders for various customers, it would not be very efficient for **all**
of the orders to be returned when the orders grid renders. To reduce wait times and cut back on the amount of bandwidth
that is used when retrieving orders from the server, the [Kendo DataSource](http://demos.telerik.com/kendo-ui/web/datasource/index.html)
that the orders grid uses has been configured to do server-side operations.

## Configure Grid for Server-Side Operations

The first step for supporting server-side filtering in the orders grid is to enable `ServerOperation` on the DataSource declaration
for the grid.

Here's an excerpt from the declaration of the orders grid (which can be found in **Views/Home/Index.cshtml**) that shows how
the DataSource is configured:

    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(builder => builder.Url("/api/CustomerOrders/GetOrdersForCustomer/").Type(HttpVerbs.Get))
        .Model(model => model.Id("OrderId"))
        .ServerOperation(true)
        .PageSize(20)

The part we care about in this DataSource configuration is the `ServerOperation(true)` function call. Passing `true` to this
function causes the resulting client-side Kendo DataSource to include any [filters](/api/framework/datasource#methods-filter)
that are being applied to it in the request that it sends to the server. In passing along any filters that need to be
applied, the DataSource will also pass up any paging information (if it has been configured for it) to the server in its
request.

The full declaration for orders grid can be found in **Views/Home/Index.cshtml**.

## Support Server-Side Operations

To make supporting server-side filtering easier the Kendo UI MVC extensions expose a few classes and functions which do all
of the hard work for you. The extensions provide `DataSourceRequest`, `DataSourceResponse`, and `ToDataSourceResult`
to help with server-side filtering. Let's look at code in the `Api/CustomerOrdersController.cs` to see how these help us.

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

As you can see, the implementation for the CustomerOrdersController isn't very big and this is because the Kendo UI MVC extensions
greatly reduce the amount of code you have to write to support filtering. Let's step through this code and see what everything does.

    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;

These are the important `using` statements in our Controller implementation. They include the namespaces which contain the DataSource
request helpers that we'll be using later.

    [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]

This isn't Kendo UI related, but this attribute is useful when trying to prevent some browsers (ex. IE) from caching AJAX calls to our service.
We want this on our controller because the underlying data could change at any time, and we don't want old data to be displayed to users.

    public JsonResult GetOrdersForCustomer([DataSourceRequest] DataSourceRequest request)

In this code snippet we declare an MVC Action for our CustomerOrdersController. Since it's a data service, the return value
of the function is a `JsonResult`. As we'll be receiving filtering data from the client-side DataSource we need to take
a `DataSourceRequest` object as a parameter. The `[DataSourceRequest]` attribute, which is applied to the parameter, is used
by the MVC framework when it binds data from the request to parameters that the Action takes.

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

In the body of the function we get all of the Orders from the database in the form of a Queryable. We then call an extension method, `ToDataSourceResult`,
on the Queryable of orders. This extension method is one that's provided by the Kendo UI MVC extenions and does all the hardwork of filtering our
Queryable of orders based on the DataSourceRequest that we got from DataSource.

`ToDataSourceResult` also provides an overload that allows you to specify a selector function. This selector function is the same as what you would
pass to the standard `Select` LINQ function. In our case we convert each Order to a `CustomerOrderViewModel` before we return it to the client.

The `DataSourceResult` that we get from calling `ToDataSourceResult` has the filtered list of Orders, which we can now return to the client by
calling the `Json` function and passing in the response.

## Filter Orders by Customer

Since we only want to display orders for the currently selected Customer in the TreeView we had to write some custom JavaScript to handle this.
The JavaScript we wrote simply listens to the `select` event of the Customer TreeView and updates the filters on the DataSource that the orders
grid is using.

The following code snippets can be found in **Scripts/home.js**.

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

If you remember how we [setup the Customer TreeView](kendo-saleshub-customer-TreeView) we specified a `select` event handler for it. This
is where we declare that event handler (`window.SalesHub.CustomerTreeView_Select`).

    window.SalesHub.CustomerTreeView_Select = function (e) {
        var node = $(e.node);
        var dataItem = e.sender.dataItem(e.node);

        if (!dataItem.hasChildren) {
            updateGridCustomerFilter(node.data("customer-id"));
        }
    };

The event handler has one parameter `e`. This is the event object that we get from the Kendo
TreeView when a new node is selected in it; it contains information about which node was
selected.

    var node = $(e.node);
    var dataItem = e.sender.dataItem(e.node);

The first part of our event handler interacts with the `node` property on the event object.
The `node` property is the element the DOM that was selected. So the first thing we do is convert
the DOM object into a jQuery object and the next thing we do is get the corresponding `dataItem` for that node.

The `dataItem` we get from the Kendo TreeView is an object that the Kendo TreeView uses to describe each node in the tree.

    if (!dataItem.hasChildren) {
        updateGridCustomerFilter(node.data("customer-id"));
    }

After we've gotten the dataItem and jQuery object for node we need to see if
the node that was selected was a actually a Customer (we don't care about the grouping or
selling company nodes). To do this we check if the dataItem has any children; if it doesn't,
that means a Customer was selected.

We then call the `updateGridCustomerFilter` function, this takes a customerId as a parameter.
Since we added a the `data-customer-id` attribute to all of the Customer nodes when we
generated the TreeView server-side, we just retrieve that value from the jQuery object
by calling the `data` function on it.

Let's talk about the function which is in charge of updating the filters on the grid:

    var updateGridCustomerFilter = function (customerId) {
        var ordersGrid = $("#ordersGrid").data("kendoGrid");
        ordersGrid.dataSource.filter({ field: "CustomerId", operator: "eq", value: customerId });
    };

First we have to find the orders grid element on the page using a jQuery selector that finds it
by id. Once we've gotten the grid on the page, we need to get the `kendoGrid` object that is
associated with it.

Once we have the `kendoGrid` object we can access the DataSource for it through the `dataSource`
property. Using the DataSource we call the `filter` function on it and pass in a new filter object
to it.

    { field: "CustomerId", operator: "eq", value: customerId }

The filter that we add to the DataSource says that we want the DataSource to only have items
which have a `CustomerId` equal to the customerId that we got as a parameter to the function.
Adding this filter causes the DataSource to send a request to the server asking for only Orders
that belong to the specified Customer.
