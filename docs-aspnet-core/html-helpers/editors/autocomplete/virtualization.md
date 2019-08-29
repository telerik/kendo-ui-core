---
title: Virtualization
page_title: Virtualization | Telerik UI AutoComplete HtmlHelper for ASP.NET Core
description: "Implement virtualization in a model-bound Telerik UI AutoComplete HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: virtualization_autocomplete_aspnetcore
position: 3
---

# Virtualization

You can configure an AutoComplete that is [bound to a model field]({% slug modelbinding_autocomplete_aspnetcore %}) to use virtualization.

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

* [Virtualization by the AutoComplete HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/autocomplete/virtualization)
* [Server-Side API](/api/autocomplete)
