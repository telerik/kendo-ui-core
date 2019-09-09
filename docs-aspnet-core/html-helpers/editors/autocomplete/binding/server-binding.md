---
title:  Server Binding
page_title: Server Binding | Telerik UI AutoComplete HtmlHelper for ASP.NET Core
description: "Learn how to implement server binding in the Telerik UI AutoComplete HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_autocomplete_serverbinding_aspnetcore
position: 3
---

# Server Binding

Local data is the data that is available on the client when the AutoComplete is initialized.

You can bind the AutoComplete locally on the server by passing the appropriate collection to the HTML helper `BindTo()` method.

1. Pass the data to the view through `ViewData`.

            public IActionResult Index()
            {
                ViewData["products"] = GetProducts();

                return View(new ProductViewModel
                {
                    ProductID = 4,
                    ProductName = "ProductName4"
                });
            }

            private static IEnumerable<ProductViewModel> GetProducts()
            {
                var products = Enumerable.Range(0, 2000).Select(i => new ProductViewModel
                {
                    ProductID = i,
                    ProductName = "ProductName" + i
                });

                return products;
            }

1. Add the AutoComplete to the view and bind it to the data that is saved in `ViewData`.

            @model MvcApplication1.Models.ProductViewModel

            @(Html.Kendo().AutoCompleteFor(m => m.ProductName)
                .DataTextField("ProductName")
                .BindTo((System.Collections.IEnumerable)ViewData["products"])
            )

## See Also

* [Ajax Data Binding]({% slug htmlhelpers_autocomplete_ajaxbinding_aspnetcore %})
* [Ajax Data Binding by the AutoComplete HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/autocomplete/serverfiltering)
* [Server-Side API](/api/dropdownlist)
