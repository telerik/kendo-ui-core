---
title: Creating the Orders Grid
page_title: Tutorial SalesHub - Creating the Orders Grid
previous_url: /tutorials/asp.net/saleshub/home-page/kend-saleshub-orders-grid
---

# Tutorial: SalesHub: Creating the Orders Grid

![kendo-saleshub-orders-grid-screenshot](/aspnet-mvc/tutorial-saleshub/home-page/images/kendo-saleshub-orders-grid-screenshot.png)

In this section we'll show you how the Orders grid is set up using the Kendo UI MVC Extensions.

The Orders grid can be found in **Views/Home/Index.cshtml**

    @Html.Kendo().Grid<CustomerOrderViewModel>().Name("ordersGrid")

The first part of the declaration tells the Kendo UI MVC extensions that we want to create a Kendo Grid that will be bound against objects of type `CustomerOrderViewModel` and that we want the grid
to have an `id` of "ordersGrid" in the final HTML markup.

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

Here we declare what columns the grid should have. Since we specified a type to the `Grid()`
call, we can create `Bound` columns based on properties that exist on that type. A bound column
essentially means that only values for the specified property will be displayed in that column.
For example, with `columns.Bound(p => p.OrderNumber)` creates a column which displays the `Order
Number` for each CustomerOrderViewModel object that is bound to the grid.

For some fields we also want to format the values a little before we display them to the user.
That's where the `Format` function comes in handy. The `Format` function takes a string that
contains [Kendo's formatting syntax](/api/framework/kendo#methods-format).

The last column of the Grid works a little differently than the other columns. This is because
we're not actually displaying information from a property on the `CustomerOrderViewModel`. The
last column contains a link which will redirect the user to a page where they can edit the order.

    columns.Template(model => null)
            .ClientTemplate("<a href='" + Url.RouteUrl("Default", new { controller = "Order", action = "Edit" }) + "/#= OrderId #'>Edit</a>");

Since the Grid will be bound client-side, we can't specify a template for the column using the
`Template` function. Instead we have to call the `ClientTemplate` function which allows us to
specify a Kendo Template. In our case we generate an `<a>` with an `href` that links to
the edit page and contains the Id of the order to edit.

        .ToolBar(toolbar => toolbar.Template("<a id='createOrderButton' class='k-button k-button-icontext k-grid-add' href='#'>Create order</a>"))

Next we supply a template for the Toolbar of the grid. This template contains an `<a>` that
is used to redirect the user to the page for creating an order. This is handled by some custom JavaScript which can be found in **Scripts/home.js**.
This JavaScript will be described later in this article.

        .Filterable()
        .Selectable(settings => settings.Mode(GridSelectionMode.Single))
        .Pageable(builder => builder.PageSizes(new[] { 10, 20 }))

Here we tell the grid that columns can be filtered by the user. We also make it so that users can
select an entire row, and we set up some page sizes that the user can select from.

        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(builder => builder.Url("/api/CustomerOrders/GetOrdersForCustomer/").Type(HttpVerbs.Get))
            .Model(model => model.Id("OrderId"))
            .ServerOperation(true)
            .PageSize(10)
        ))

Finally we set up the DataSource that the grid will use. We'll be getting our data from a remote
service we call the `Ajax()` function. We tell it what URL to hit when it needs to read data
from the server, then tell it that it needs to make a GET request when it queries the server.
We also need to tell the DataSource what property on model is the Id (in this case it's "OrderID").
The last two function calls tell the DataSource that the server will handle filtering and that we
only want to get 20 orders back from the server.

Earlier we set up the "Create an Order" button in the Grids toolbar, but it doesn't actually do
anything. So let's wire that up to do something useful.

Since we'll be redirecting the user page for creating an Order, we'll need the URL to that page. We
don't want to hardcode the URL to that page in our JavaScript, since it could change later, so let's
inject the URL we need into a JavaScript variable using Razor. This can be found in **Views/Home/Index.cshtml**.

    <script>
        window.SalesHub.createOrderUrl = "@Url.RouteUrl("Default", new { controller = "Order", action = "New" }, Request.Url.Scheme)";
    </script>

Now that we have the URL in a variable that we can access from our JavaScript function, we can
set up the code which actually redirects the user to that page when the "Create order" button
is clicked.

    $("#createOrderButton").on("click", function() {
        window.location.href = window.SalesHub.createOrderUrl + '/' + window.SalesHub.selectedCustomerId;
    });

Here we use jQuery to find the button we created earlier in the toolbar and register a click
event handler to it. When the button is clicked we access the URL that we stored earlier and
concatenate the id of the currently selected Customer and set the result to the window's location.
