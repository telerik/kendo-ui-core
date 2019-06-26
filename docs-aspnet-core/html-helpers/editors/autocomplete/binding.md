---
title: Model Binding
page_title: Model Binding | Kendo UI AutoComplete HtmlHelper for ASP.NET Core
description: "Implement model binding for the Kendo UI AutoComplete HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC) with local or remote data and add virtualization."
slug: modelbinding_autocomplete_aspnetcore
position: 2
---

# Model Binding

The AutoComplete enables you to implement model binding with [local data](#local-data) and [remote data](#remote-data) as well as in combination with [virtualization](#virtualization).

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

## Virtualization

You can configure an AutoComplete that is bound to a model field to use [virtualization](https://docs.telerik.com/kendo-ui/controls/editors/combobox/virtualization).

> The value to which the AutoComplete will be bound on the server can only be of a primitive type or an enum value.

1. Create the `Read` and `ValueMapper` actions.

            public IActionResult Index()
            {
                return View(new ProductViewModel
                {
                    ProductID = 4,
                    ProductName = "ProductName4"
                });
            }

            [HttpPost]
            public IActionResult ProductsVirtualization_Read([DataSourceRequest] DataSourceRequest request)
            {
                return Json(GetProducts().ToDataSourceResult(request));
            }

            public IActionResult Products_ValueMapper(int[] values)
            {
                var indices = new List<int>();

                if (values != null && values.Any())
                {
                    var index = 0;

                    foreach (var product in GetProducts())
                    {
                        if (values.Contains(product.ProductID))
                        {
                            indices.Add(index);
                        }

                        index += 1;
                    }
                }

                return Json(indices);
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

1. Add the AutoComplete to the view and configure it to use virtualization.

            @model MvcApplication1.Models.ProductViewModel

            @(Html.Kendo().AutoCompleteFor(m => m.ProductName)
                .Filter("contains")
                .DataTextField("ProductName")
                .DataSource(source =>
                {
                    source.Custom()
                        .ServerFiltering(true)
                        .ServerPaging(true)
                        .PageSize(80)
                        .Type("aspnetmvc-ajax")
                        .Transport(transport =>
                        {
                            transport.Read("ProductsVirtualization_Read", "Home");
                        })
                        .Schema(schema =>
                        {
                            schema.Data("Data")
                                    .Total("Total");
                        });
                })
                .Virtual(v => v.ItemHeight(26).ValueMapper("valueMapper"))
            )

            <script>
                function valueMapper(options) {
                    $.ajax({
                        url: "@Url.Action("Products_ValueMapper", "Home")",
                        data: convertValues(options.value),
                        success: function (data) {
                            options.success(data);
                        }
                    });
                }

                function convertValues(value) {
                    var data = {};

                    value = $.isArray(value) ? value : [value];

                    for (var idx = 0; idx < value.length; idx++) {
                        data["values[" + idx + "]"] = value[idx];
                    }

                    return data;
                }
            </script>

## See Also

* [Virtualization by the AutoComplete HtmlHelper fro ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/autocomplete/virtualization)
* [JavaScript API Reference of the AutoComplete](http://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete)
