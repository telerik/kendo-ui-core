---
title: Local Binding
page_title: Local Binding | Telerik UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to implement Local Binding with Telerik UI Grid HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_grid_aspnetcore_localbinding
position: 3
---

# Local Binding

When configured for local binding, the Grid for ASP.NET Core will serialize the data as part of its data source and will perform all data operations, such as paging, sorting, filtering, grouping, and aggregating, on the client.

For a runnable example, refer to the [demo on local binding of the Grid](https://demos.telerik.com/aspnet-core/grid/local-data-binding).  

To configure the Grid for ASP.NET Core to do local binding:

1. Define a model class or use an existing one from your application.

        public class OrderViewModel
        {

            public int OrderID
            {
                get;
                set;
            }

            public string ShipCountry
            {
                get;
                set;
            }
        }

1. Open the `HomeController.cs` and return an `IEnumerable` of the model type with the View. This is the `View()` which holds the Grid definition.

        public IActionResult Index()
        {
            // Returns a collection of OrderViewModels.
            var model = orderService.Read();

             /* For a quick test, you can mock the data, and copy and paste this snippet.
            var model = Enumerable.Range(1, 20).Select(i => new OrderViewModel
            {
                OrderID = i,
                ShipCountry = i % 2 == 0 ? "ShipCountry 1" : "ShipCountry 2"
            });
            */

            return View(model);
        }

1. In the `Index.cshtml` view, configure the Grid to accept the model in its constructor and set `ServerOperations(false)`.

        @model IEnumerable<AspNetCoreGrid.Models.OrderViewModel>
        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(2)
                .ServerOperation(false)
             )
            .ToolBar(tools =>
            {
                tools.Pdf().Text("Custom PDF button text");
                tools.Excel().Text("Custom Excel button text");
            })
            .Pageable()
            .Sortable()
            .Groupable()
            .Columns(columns =>
            {
                columns.Bound(f => f.OrderID);
                columns.Bound(f => f.ShipCountry);
            })
        )

1. Build and run the application.

## See Also

* [Custom Ajax Binding by the Grid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/customajaxbinding)
* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/grid)
