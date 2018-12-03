---
title: Overview
page_title: AutoComplete | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI AutoComplete HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/autocomplete
slug: htmlhelpers_autocomplete_aspnetcore
position: 1
---

# AutoComplete HtmlHelper Overview

The AutoComplete HtmlHelper extension is a server-side wrapper for the [Kendo UI AutoComplete](http://demos.telerik.com/kendo-ui/autocomplete/index) widget.

It enables you to configure the Kendo UI AutoComplete widget from server-side code. The [AutoComplete](http://docs.telerik.com/kendo-ui/controls/editors/autocomplete/overview) provides suggestions depending on the typed text. It also allows multiple value entries. The suggestions shown by the widget come either from a local array or from a remote data service.

For more information on the HtmlHelper, refer to the article on the [AutoComplete HtmlHelper for ASP.NET MVC](https://docs.telerik.com/aspnet-mvc/helpers/autocomplete/overview).

## Basic Usage

The following example demonstrates how to define the AutoComplete by using the AutoComplete HtmlHelper.

###### Example

```Razor
    @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .DataTextField("ProductName")
        .Filter("contains")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "AutoComplete")
                    .Data("onAdditionalData");
            })
            .ServerFiltering(true);
        })
    )

    <script type="text/javascript">
        function onAdditionalData() {
            return {
                text: $("#autocomplete").val()
            };
        }
    </script>

```
```Controller

    public class AutoCompleteController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Products_Read(string text)
        {
            var result = GetProducts();

            if (!string.IsNullOrEmpty(text))
            {
                result = result.Where(p => p.ProductName.Contains(text)).ToList();
            }

            return Json(result);
        }

        private static IEnumerable<ProductViewModel> GetProducts()
        {
            var result = Enumerable.Range(0, 50).Select(i => new ProductViewModel
            {
                ProductID = "" + i,
                ProductName = "Product " + i
            });

            return result;
        }
    }
```

## Configuration

The following example demonstrates the basic configuration of the AutoComplete HtmlHelper and how to get the AutoComplete instance.

```
    @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .DataTextField("ProductName")
        .Placeholder("Type a product name")
        .Template("#= ProductID # | For: #= ProductName #")
        .HeaderTemplate("<div class=\"dropdown-header k-widget k-header\">" +
                            "<span>Products</span>" +
                        "</div>")
        .FooterTemplate("Total <strong>#: instance.dataSource.total() #</strong> items found")
        .Filter("contains")
        .MinLength(3)
        .HtmlAttributes(new { style = "width:100%" })
        .Height(520)

        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "Home")
                    .Data("onAdditionalData");
            })
            .ServerFiltering(true);
        })
        .Events(e => e
        .Change("onChange")
        .Select("onSelect")
        .Open("onOpen")
        .Close("onClose")
        .DataBound("onDataBound")
        .Filtering("onFiltering")
        )
    )

    <script type="text/javascript">
        function onAdditionalData() {
            return {
                text: $("#autocomplete").val()
            };
        }

        $(function () {
            //Notice that the Name() of the AutoComplete is used to get its client-side instance.
            var autocomplete = $("#autocomplete").data("kendoAutoComplete");
            console.log(autocomplete);
        });
    </script>
```

## Model Binding

You can implement model binding both with [local data](#local-data) and [remote data](#remote-data), and in combination with [virtualization](#virtualization).

### Local Data

Local data is the data that is available on the client when the AutoComplete is initialized.

1. Pass the data to the view through `ViewData`.

    ###### Example

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

    ###### Example

            @model MvcApplication1.Models.ProductViewModel

            @(Html.Kendo().AutoCompleteFor(m => m.ProductName)
                .DataTextField("ProductName")
                .BindTo((System.Collections.IEnumerable)ViewData["products"])
            )

### Remote Data

You can configure the AutoComplete to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

    ###### Example

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

    ###### Example

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

### Virtualization

You can configure an AutoComplete that is bound to a model field to use [virtualization](https://docs.telerik.com/kendo-ui/controls/editors/combobox/virtualization).

> **Important**
>
> The value type to which the AutoComplete can be bound on the server can only be a primitive type or an enum value.

1. Create the `Read` and `ValueMapper` actions.

    ###### Example

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

    ###### Example

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

* [JavaScript API Reference of the AutoComplete](http://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete)
* [AutoComplete HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/autocomplete/overview)
* [AutoComplete Official Demos](http://demos.telerik.com/aspnet-core/autocomplete/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
