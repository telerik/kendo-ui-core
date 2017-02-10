---
title: Create the Orders Grid
page_title: Create the Orders Grid | Kendo UI Sales Hub Tutorial
description: "Learn how to create the Orders grid in the Kendo UI Sales Hub project by using Telerik UI for ASP.NET MVC."
previous_url: /kendo-ui/tutorials/asp.net/saleshub/home-page/kend-saleshub-orders-grid, /tutorials/tutorial-saleshub/home-page/kend-saleshub-orders-grid
slug: createordersgrid_saleshubtutorial_aspnetmvc
position: 2
---

# Create the Orders Grid

After you have created the customer TreeView, you need to set up the Grid of orders by using the Kendo UI MVC extensions in the Kendo UI Sales Hub.

**Figure 1. The Orders list in the Kendo UI Sales Hub**

![kendo-saleshub-orders-grid-screenshot](/tutorials/tutorial-saleshub/home-page/images/kendo-saleshub-orders-grid-screenshot.png)

## Configuration

### Create the Data-Bound Grid

To find the Grid, refer to **Views/Home/Index.cshtml**.

###### Example

    @Html.Kendo().Grid<CustomerOrderViewModel>().Name("ordersGrid")

The first part of the declaration from this example instructs the Kendo UI MVC extensions to create a Kendo UI Grid that will be bound against objects of the `CustomerOrderViewModel` type and that the Grid needs to have an `id` of `"ordersGrid"` in the final HTML markup.

### Define Columns

The following example declares what columns the Grid needs to have.

###### Example

    .Columns(columns =>
    {
        columns.Bound(p => p.OrderNumber).Title("Order Number");
        columns.Bound(p => p.OrderDate).Title("Order Date").Format("{0:d}");
        columns.Bound(p => p.IsActive).Title("Status").ClientTemplate("#= IsActive ? 'Active' : 'Inactive' #");
        columns.Bound(p => p.Weight).Title("Weight").Format("{0:n}");
        columns.Bound(p => p.Value).Title("Value").Format("{0:c}");
        columns.Template(model => null)
            .ClientTemplate("<a href='" + Url.RouteUrl("Default", new { controller = "Order", action = "Edit" }) + "/#= OrderId #'>Edit</a>");
    })

Since a type to the `Grid()` call is specified, now it is possible for you to create `Bound` columns based on properties that exist on that type. A bound column essentially means that only values for the specified property will be displayed in that column. For example, the `columns.Bound(p => p.OrderNumber)` configuration creates a column that displays the `Order Number` for each `CustomerOrderViewModel` object that is bound to the Grid.

You also need to format the values for some fields before they are displayed to the user by using the `Format` function. The `Format` function takes a string that contains the [formatting syntax of Kendo UI](../../../../kendo-ui/api/javascript/kendo#methods-format).

The last column of the Grid works differently from the other columns. This is because it does not actually display information from a property on the `CustomerOrderViewModel`. The last column contains a link which redirects the user to a page where they can edit the order.

### Apply Column Templates

It is not possible to specify a template for the column by using the `Template` function because the Grid will be bound on the client side. Instead, you have to call the `ClientTemplate` function which allows the specification of a Kendo UI template. In this case, you need to generate an `<a>` with a `href` attribute that links to the edit page and contains the id of the order to edit.

###### Example

    columns.Template(model => null)
            .ClientTemplate("<a href='" + Url.RouteUrl("Default", new { controller = "Order", action = "Edit" }) + "/#= OrderId #'>Edit</a>");

Then, you need to supply a template for the Toolbar of the Grid. This template contains an `<a>` that is used to redirect the user to the page for creating an order. This behavior is handled by some custom JavaScript, which is located in **Scripts/home.js** and which will be described further in this article.

###### Example

        .ToolBar(toolbar => toolbar.Template("<a id='createOrderButton' class='k-button k-button-icontext k-grid-add' href='#'>Create order</a>"))

### Use Filter Columns

By using the code from the example below, you instruct the Grid that it is possible for the user to filter the columns. It also allows them to select an entire row and configures the page sizes, from which the user can select.

###### Example

        .Filterable()
        .Selectable(settings => settings.Mode(GridSelectionMode.Single))
        .Pageable(builder => builder.PageSizes(new[] { 10, 20 }))

### Set Up the DataSource

Finally, you need to set up the DataSource that the Grid will use.

To achieve this, get the data from a remote service&mdash;the `Ajax()` function. The code from the example below instructs it what URL to hit when it is expected to read data from the server and that it needs to make a GET request when it queries the server.

You also have to communicate to the DataSource what property on the model the Id is&mdash;in this case, it is `"OrderID"`.

The last two function calls tell the DataSource that the server will handle the filtering and that you want to get only 20 orders back from the server.

###### Example

        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(builder => builder.Url("/api/CustomerOrders/GetOrdersForCustomer/").Type(HttpVerbs.Get))
            .Model(model => model.Id("OrderId"))
            .ServerOperation(true)
            .PageSize(10)
        ))

### Configure the Button

The `"Create an Order"` button was previously set up in the toolbar of the Grid. Currently, it does not function and you need to configure its behavior.

Get the URL of the page, to which the user will be redirected for creating an order. You do not have to hardcode it to that page in your JavaScript because it might change later. That is why you have to inject it into a JavaScript variable by using Razor. The code is located in **Views/Home/Index.cshtml**.

###### Example

    <script>
        window.SalesHub.createOrderUrl = "@Url.RouteUrl("Default", new { controller = "Order", action = "New" }, Request.Url.Scheme)";
    </script>

Now that the URL is placed in a variable that can be accessed from your JavaScript function, set up the code which will redirect the user to that page when the **Create Order** button is clicked.

###### Example

    $("#createOrderButton").on("click", function() {
        window.location.href = window.SalesHub.createOrderUrl + '/' + window.SalesHub.selectedCustomerId;
    });

The code from the previous example uses jQuery to find the button created earlier in the toolbar and to register a click event handler to it. When the button is clicked, the URL stored earlier is accessed, the id of the currently selected Customer is concatenated, and the result to the location of the window is set.

## See Also

Other articles on the Kendo UI Sales Hub project and its **Home** and **Order** pages:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_saleshubtutorial_aspnetmvc %})
* [Create the Customer TreeView]({% slug createcustomtreeview_saleshubtutorial_aspnetmvc %})
* [Filter Orders on the Server]({% slug filterordersonserver_saleshubtutorial_aspnetmvc %})
* [Create and Edit Orders]({% slug createeditorders_saleshubtutorial_aspnetmvc %})
* [Handle Order Details]({% slug handleorderdetails_saleshubtutorial_aspnetmvc %})
* [Create the Search Box]({% slug createsearchbox_saleshubtutorial_aspnetmvc %})
