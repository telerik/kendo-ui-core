---
title: Model Binding
page_title: Model Binding | Telerik UI AutoComplete HtmlHelper for ASP.NET Core
description: "Implement model binding for the Telerik UI AutoComplete HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC) with local or remote data."
slug: modelbinding_autocomplete_aspnetcore
position: 2
---

# Model Binding

The AutoComplete enables you to implement model binding with [local data](#local-data) and [remote data](#remote-data).

## Local Data

Local data is the data that is available on the client when the AutoComplete is initialized.

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

## Remote Data

You can configure the AutoComplete to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

            public IActionResult Index()
            {
                return View(new ProductViewModel
                {
                    ProductID = 4,
                    ProductName = "ProductName4"
                });
            }

            public JsonResult GetProductsAjax()
            {
                var products = Enumerable.Range(0, 500).Select(i => new ProductViewModel
                {
                    ProductID = i,
                    ProductName = "ProductName" + i
                });

                return Json(products);
            }

1. Add the AutoComplete to the view and configure its DataSource to use remote data.

            @model MvcApplication1.Models.ProductViewModel


            @(Html.Kendo().AutoCompleteFor(m => m.ProductName)
                .Filter("contains")
                .DataTextField("ProductName")
                .Placeholder("Select product...")
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("GetProductsAjax", "Home");
                    })
                    .ServerFiltering(false);
                })
            )

## See Also

* [Server-Side API](/api/autocomplete)
