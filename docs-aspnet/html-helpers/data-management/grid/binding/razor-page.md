---
title: Grid in Razor Pages
page_title: The Telerik UI Grid in RazorPages
description: "Telerik UI Grid for {{ site.framework }} in a RazorPages application."
slug: razorpages_gridhelper_aspnetcore
position: 2
---

# Telerik UI Grid in Razor Pages


Razor Pages are an alternative to the MVC pattern. Razor Pages make page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cs` file (generally, the two files have the same name). You can seamlessly integrate the Telerik UI Grid for {{ site.framework }} in Razor Pages applications.


For a runnable example, refer to the [Grid in RazorPages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Grid/GridCrudOperations.cshtml).

## Getting Started

To enable CRUD operations in the Telerik UI Grid within a `RazorPage`:


1. Setup CRUD URLs in the `DataSource` along with a `Model.Id`. The URL in these methods must refer to the name of the method in the `PageModel`.


    ```HtmlHelper
        @page
        @model IndexModel

        @using Kendo.Mvc.UI

        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            .Editable()
            .Scrollable()
            .Pageable()
            .ToolBar(t => t.Create())
            .Columns(columns =>
            {
                columns.Bound(column => column.Freight);
                columns.Bound(column => column.ShipName);
                columns.Bound(column => column.ShipCity);
                columns.Command(column =>
                {
                    column.Edit();
                    column.Destroy();
                }).Width(230);
            })
            .DataSource(ds => ds
                .Ajax()
                .Read(r => r.Url("/Index?handler=Read").Data("forgeryToken"))
                .Update(u => u.Url("/Index?handler=Update").Data("forgeryToken"))
                .Create(c => c.Url("/Index?handler=Create").Data("forgeryToken"))
                .Destroy(d => d.Url("/Index?handler=Destroy").Data("forgeryToken"))
                .Model(m => m.Id(id => id.OrderID))
                .PageSize(10)
            )
        )
    ```
    
1. Add an AntiForgeryToken on top of the RazorPage

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the AntiForgeryToken with each POST request of the page. Additional paratemers can also be supplied.

    ```
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```
    
1. Within the `.cs` file, introduce ActionMethod for each of the CRUD operations

    ```
        public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(orders.ToDataSourceResult(request));
        }

        public JsonResult OnPostCreate([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
        {
            order.OrderID = orders.Count + 2;
            orders.Add(order);

            return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
        }

        public JsonResult OnPostUpdate([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
        {
            orders.Where(x => x.OrderID == order.OrderID).Select(x => order);

            return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
        }

        public JsonResult OnPostDestroy([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
        {
            orders.Remove(orders.FirstOrDefault(x => x.OrderID == order.OrderID));

            return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
        }
    ```

## Binding the Grid to a PageModel property

To bind the Telerik UI Grid to a property from the PageModel:

1. Add a property to the PageModel that holds the collection of data for the grid.


    ```
        public class GridPageModel : PageModel
        {
            [BindProperty]
            public IList<OrderViewModel> orders { get; set; }

            public void OnGet()
            {
                orders = new List<OrderViewModel>();
                // Populate the collection with data.
                Enumerable.Range(1, 50).ToList().ForEach(i => orders.Add(new OrderViewModel
                {
                    OrderID = i + 1,
                    Freight = i * 10,
                    ShipName = "ShipName " + i,
                    ShipCity = "ShipCity " + i
                }));
            }
        }
    ```

1. Declare the PageModel at the top of the RazorPage

    ```
        @model GridPageModel
    ```

1. Bind the Grid to the collection property

    ```HtmlHelper
        @(Html.Kendo().Grid<OrderViewModel>(Model.orders)
            .Name("grid")
            .Scrollable()
            .Pageable()
            .Columns(columns =>
            {
                columns.Bound(column => column.Freight);
                columns.Bound(column => column.ShipName);
                columns.Bound(column => column.ShipCity);
            })
            .DataSource(ds => ds
                .Ajax()
                .PageSize(20)
                .ServerOperation(false)
            )
        )
    ```

## See Also

* [Remote Ajax Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/remote-data-binding)
* [Local Ajax Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/local-data-binding)
* [Server-Side API](/api/grid)
