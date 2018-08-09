---
title: Overview
page_title: DropDownList | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the DropDownList HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_dropdownlist_aspnetcore
position: 21
previous_url: /aspnet-core/helpers/html-helpers/dropdownlist
---

# DropDownList HtmlHelper Overview

The DropDownList HtmlHelper extension is a server-side wrapper for the [Kendo UI DropDownList](http://demos.telerik.com/kendo-ui/dropdownlist/index) widget.

It allows you to configure the Kendo UI DropDownList widget from server-side code. The [DropDownList](http://docs.telerik.com/kendo-ui/controls/editors/dropdownlist/overview) displays a list of values and allows for a single selection from the list. The user input is restricted within the predefined options.

For more information on the HtmlHelper, refer to the article on the [DropDownList HtmlHelper for ASP.NET MVC](https://docs.telerik.com/aspnet-mvc/helpers/dropdownlist/overview).

## Basic Usage

The following example demonstrates how to define the DropDownList by using the DropDownList HtmlHelper.

###### Example

```tab-Razor
    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .DataSource(source => {
            source.Read(read =>
            {
                read.Action("Products_Read", "DropDownList");
            });
        })
    )
```
```tab-Controller

    public class DropDownListController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Products_Read()
        {
            var result = Enumerable.Range(0, 50).Select(i => new ProductViewModel
            {
                ProductID = "" + i,
                ProductName = "Product " + i
            });

            return Json(result);
        }
    }
```

## Configuration

The following example demonstrates the basic configuration of the DropDownList HtmlHelper and how to get the DropDownList instance.

```
    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .HtmlAttributes(new { style = "width:100%" })
        .Filter("contains")
        .MinLength(3)
        .Height(290)
        .HeaderTemplate(
            "<div class=\"dropdown-header k-widget k-header\">" +
                "<span>Products</span>" +
            "</div>")
        .FooterTemplate("Total <strong>#: instance.dataSource.total() #</strong> items found")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read2", "DropDownList");
            })
            .ServerFiltering(false);
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
        $(function () {
            //Notice that the Name() of the DropDownList is used to get its client-side instance.
            var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
            console.log(dropdownlist);
        });
    </script>
```

## Model Binding

You can implement model binding both with [local data](#local-data) and [remote data](#remote-data), and in combination with [virtualization](#virtualization).

### Local Data

Local data is the data that is available on the client when the DropDownList is initialized.

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


1. Add a DropDownList to the view and bind it to the data that is saved in the `ViewData`.

    ###### Example

            @model MvcApplication1.Models.ProductViewModel

            @(Html.Kendo().DropDownListFor(m => m.ProductID)
                .DataValueField("ProductID")
                .DataTextField("ProductName")
                .BindTo((System.Collections.IEnumerable)ViewData["products"])
            )

### Remote Data

You can configure the DropDownList to get its data from a remote source by making an AJAX request.

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


1. Add the DropDownList to the view and configure its DataSource to use remote data.

    ###### Example

            @model MvcApplication1.Models.ProductViewModel


            @(Html.Kendo().DropDownListFor(m => m.ProductID)
                .Filter("contains")
                .DataTextField("ProductName")
                .DataValueField("ProductID")
                .OptionLabel("Select product...")
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

You can configure a DropDownList that is bound to a model field to use [virtualization](https://docs.telerik.com/kendo-ui/controls/editors/combobox/virtualization).

> **Important**
>
> The value type to which the DropDownList can be bound on the server can only be a primitive type or an enum value.

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


1. Add a DropDownList to the view and configure it to use virtualization.

    ###### Example

            @model MvcApplication1.Models.ProductViewModel

            @(Html.Kendo().DropDownListFor(m => m.ProductID)
                .Filter("contains")
                .DataTextField("ProductName")
                .DataValueField("ProductID")
                .OptionLabel("Select product...")
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


1. If the `AutoBind` option of the DropDownList is set to `false` and you need the widget to display the model value as selected, set the `Text` configuration option by passing the field set as `DataTextField` to the `Text` option.

###### Example

        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().DropDownListFor(m => m.ProductID)
            .AutoBind(false)
            .Text(Model.ProductName)
            .DataTextField("ProductName")
            //...additional configuration
        )


## See Also

* [JavaScript API Reference of the DropDownList](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [DropDownList HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/dropdownlist/overview)
* [DropDownList Official Demos](http://demos.telerik.com/aspnet-core/dropdownlist/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
