---
title: Overview
page_title: MultiSelect | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the MultiSelect HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_multiselect_aspnetcore
position: 41
previous_url: /aspnet-core/helpers/html-helpers/multiselect
---

# MultiSelect HtmlHelper Overview

The MultiSelect HtmlHelper extension is a server-side wrapper for the [Kendo UI MultiSelect](http://demos.telerik.com/kendo-ui/multiselect/index) widget.

It allows you to configure the Kendo UI MultiSelect widget from server-side code. The [MultiSelect](http://docs.telerik.com/kendo-ui/controls/editors/multiselect/overview) displays a list of options and allows multiple selections from this list. The widget represents a richer version of the `<select>` element and provides support for local and remote data binding, item and tag templates, and configurable options for controlling the list behavior.

For more information on the HtmlHelper, refer to the article on the [MultiSelect HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/multiselect/overview).

## Basic Usage

The following example demonstrates how to define the MultiSelect by using the MultiSelect HtmlHelper.

###### Example

```tab-Razor
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Value(new[] { 2, 7 })
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "Home");
            })
            .ServerFiltering(true);
        })
    )
```
```tab-Controller
    public class MultiSelectController : Controller
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

The following example demonstrates the basic configuration of the MultiSelect HtmlHelper and how to get the MultiSelect instance.

```
   @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Placeholder("Select product...")
        .ItemTemplate("<span class=\"product-id-id\">#= ProductID #</span> #= ProductName #")
        .Value(new[] { 2, 7 })
        .Height(520)
        .TagMode(MultiSelectTagMode.Single)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "Home");
            })
            .ServerFiltering(true);
        })
        .Events(events => events
            .Change("onChange")
            .Select("onSelect")
            .Deselect("onDeselect")
            .Open("onOpen")
            .Close("onClose")
            .DataBound("onDataBound")
            .Filtering("onFiltering")
        )
    )

     <script type="text/javascript">
        $(function () {
            //Notice that the Name() of the MultiSelect is used to get its client-side instance.
            var multiselect = $("#multiselect").data("kendoMultiSelect");
            console.log(multiselect);
        });
    </script>
```

## Model Binding

You can implement model binding both with [local data](#local-data) and [remote data](#remote-data), and in combination with [virtualization](#virtualization).

### Local Data

Local data is the data that is available on the client when the MultiSelect is initialized.

1. Pass the data to the view through the view model.

    ###### Example

            public IActionResult Index()
            {
                return View(new ProductViewModel
                {
                    Orders = GetOrders(),
                    SelectedOrders = new int[] { 1, 3 }
                });
            }

            private static List<Order> GetOrders()
            {
                var orders = Enumerable.Range(0, 2000).Select(i => new Order
                {
                    OrderID = i,
                    OrderName = "OrderName" + i
                });

                return orders.ToList();
            }


1. Add the MultiSelect to the view and bind it to a property of the view model.

    ###### Example

            @model MvcApplication1.Models.ProductViewModel

            @(Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
                .DataValueField("OrderID")
                .DataTextField("OrderName")
                .BindTo(Model.Orders)
            )


### Remote Data

You can configure the MultiSelect to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

    ###### Example

            public IActionResult Index()
            {
                return View(new ProductViewModel
                {
                    SelectedOrders = new int[] { 1, 3 }
                });
            }

            public JsonResult GetOrdersAjax()
            {
                var orders = Enumerable.Range(0, 2000).Select(i => new Order
                {
                    OrderID = i,
                    OrderName = "OrderName" + i
                });

                return Json(orders.ToList());
            }


1. Add the MultiSelect to the view and configure its DataSource to use remote data.

    ###### Example

            @model MvcApplication1.Models.ProductViewModel


            @(Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
                .Filter("contains")
                .DataValueField("OrderID")
                .DataTextField("OrderName")
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("GetOrdersAjax", "Home");
                    })
                    .ServerFiltering(false);
                })
            )

### Virtualization

You can configure a MultiSelect that is bound to a model field to use [virtualization](https://docs.telerik.com/kendo-ui/controls/editors/combobox/virtualization).

> **Important**
>
> If the `AutoBind` option of the MultiSelect is set to `false`, the widget will not be able to display pre-selected items until it is focused.

1. Create the `Read` and `ValueMapper` actions.

    ###### Example

            public IActionResult Index()
            {
                return View(new ProductViewModel
                {
                    SelectedOrders = new int[] { 1, 3 }
                });
            }

            [HttpPost]
            public IActionResult OrdersVirtualization_Read([DataSourceRequest] DataSourceRequest request)
            {
                return Json(GetOrders().ToDataSourceResult(request));
            }

            public IActionResult Orders_ValueMapper(int[] values)
            {
                var indices = new List<int>();

                if (values != null && values.Any())
                {
                    var index = 0;

                    foreach (var order in GetOrders())
                    {
                        if (values.Contains(order.OrderID))
                        {
                            indices.Add(index);
                        }

                        index += 1;
                    }
                }

                return Json(indices);
            }

            private static List<Order> GetOrders()
            {
                var orders = Enumerable.Range(0, 2000).Select(i => new Order
                {
                    OrderID = i,
                    OrderName = "OrderName" + i
                });

                return orders.ToList();
            }


1. Add the MultiSelect to the view and configure it to use virtualization.

    ###### Example

            @model MvcApplication1.Models.ProductViewModel

            @(Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
                .Filter("contains")
                .DataValueField("OrderID")
                .DataTextField("OrderName")
                .DataSource(source =>
                {
                    source.Custom()
                        .ServerFiltering(true)
                        .ServerPaging(true)
                        .PageSize(80)
                        .Type("aspnetmvc-ajax")
                        .Transport(transport =>
                        {
                            transport.Read("OrdersVirtualization_Read", "Home");
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
                        url: "@Url.Action("Orders_ValueMapper", "Home")",
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

* [JavaScript API Reference of the MultiSelect](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [MultiSelect HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/multiselect/overview)
* [MultiSelect Official Demos](http://demos.telerik.com/aspnet-core/multiselect/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
