---
title: The Telerik UI Grid in RazorPages
page_title: The Telerik UI Grid in RazorPages
description: "Telerik UI Grid for {{ site.framework }} in a RazorPages application."
slug: razorpages_gridhelper_aspnetcore
position: 1
---

# Telerik UI Grid in Razor Pages


Razor Pages are an alternative to the MVC pattern. Razor Pages make page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cs` file (generally, the two files have the same name). You can seamlessly integrate the Telerik UI Grid for {{ site.framework }} in Razor Pages applications.


For a runnable example, refer to the [Grid in RazorPages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Grid/GridCrudOperations.cshtml).

## Getting Started

To enable CRUD operations in the Telerik UI Grid within a `RazorPage`:


1. Setup CRUD URLs in the `DataSource` along with a `Model.Id`. The URL in these methods must refer to the name of the method in the `PageModel`.


    ```
        .DataSource(ds => ds.Ajax()
            .Read(r => r.Url("/Grid/GridCrudOperations?handler=Read").Data("forgeryToken"))
            .Update(u => u.Url("/Grid/GridCrudOperations?handler=Update").Data("forgeryToken"))
            .Create(c => c.Url("/Grid/GridCrudOperations?handler=Create").Data("forgeryToken"))
            .Destroy(d => d.Url("/Grid/GridCrudOperations?handler=Destroy").Data("forgeryToken"))
            .Model(m => m.Id(id => id.OrderID))
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
            public IList<OrderViewModel> orders;

            //other ActionMethods
        }
    ```

1. Declare the PageModel at the top of the RazorPage

    ```
        @model GridPageModel
    ```

1. Bind the Grid to the collection property

    ```
        @(Html.Kendo().Grid<OrderViewModel>(Model.orders)
            .Name("grid")
        )
    ```

## See Also

* [Server-Side API](/api/grid)
