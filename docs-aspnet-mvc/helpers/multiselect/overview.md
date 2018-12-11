---
title: Overview
page_title: MultiSelect | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI MultiSelect widget for ASP.NET MVC."
slug: overview_multiselecthelper_aspnetmvc
position: 1
---

# MultiSelect HtmlHelper Overview

The MultiSelect HtmlHelper extension is a server-side wrapper for the [Kendo UI MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/index) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI MultiSelect for ASP.NET MVC:

* `server`&mdash;The data is serialized to the client. No Ajax requests are made.
* `ajax`&mdash;The MultiSelect makes Ajax requests to get the data.

### Server Binding

Below are listed the steps for you to follow when configuring the Kendo UI MultiSelect for server binding to the Northwind **Products** table using Linq to SQL.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method and pass the **Products** table as the model.

    ###### Example

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

1. Make your view strongly typed.

    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
            Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Product>>" %>
    ```
    ```Razor
        @model IEnumerable<MvcApplication1.Models.Product>
    ```
1. Add a server bound MultiSelect.

    ```ASPX
        <%: Html.Kendo().MultiSelect()
            .Name("productMultiSelect") //The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiSelect as a value.
            .BindTo(Model)   //Pass the list of Products to the MultiSelect.
        %>
    ```
    ```Razor
        @(Html.Kendo().MultiSelect()
            .Name("productMultiSelect") //The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiSelect as a value.
            .BindTo(Model)   //Pass the list of Products to the MultiSelect.
        )
    ```

### Ajax Binding

Below are listed the steps for you to follow when configuring the Kendo UI MultiSelect for Ajax binding to the Northwind **Products** table using Linq to SQL.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create an action method which renders the view.

    ###### Example

        public ActionResult Index()
        {
            return View();
        }

1. Create a new action method and pass the **Products** table as JSON result.

    ###### Example

        public JsonResult GetProducts()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products, JsonRequestBehavior.AllowGet);
        }

1. Add an Ajax-bound MultiSelect.

    ```ASPX
        <%: Html.Kendo().MultiSelect()
            .Name("productMultiSelect") //The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiSelect as a value.
            .Filter(FilterType.Contains)
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home"); //Set the Action and Controller names.
                })
                .ServerFiltering(true); //If true, the DataSource will not filter the data on the client.
            })
        %>
    ```
    ```Razor
        @(Html.Kendo().MultiSelect()
            .Name("productMultiSelect") //The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiSelect as a value.
            .Filter(FilterType.Contains)
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home"); //Set the Action and Controller names.
                })
                .ServerFiltering(true); //If true, the DataSource will not filter the data on the client.
            })
        )
    ```

> **Important:**
>
> The `ToDataSourceResult()` extension method modifies the structure of the result and the widget is not able to bind to it. In this case, return a simple array of data.

### ToDataSourceResult Binding

Below are listed the steps for you to follow when configuring the Kendo UI MultiSelect to use a custom DataSource and thus bind to a `ToDataSourceResult` instance.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create an action method which renders the view.

    ###### Example

        public ActionResult Index()
        {
            return View();
        }

1. Create a new action method and pass the **Products** table as JSON result.

    ###### Example

        public JsonResult GetProducts([DataSourceRequest] DataSourceRequest request)
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products.ToDataSourceResult(request));
        }

1. Add an Ajax-bound MultiSelect.

    ```ASPX
        <%: Html.Kendo().MultiSelect()
            .Name("productMultiSelect")
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiSelect as a value.
            .DataSource(source =>
            {
                source.Custom()
                    .ServerFiltering(true)
                    .Type("aspnetmvc-ajax") //Set this type if you want to use DataSourceRequest and ToDataSourceResult instances
                    .Transport(transport =>
                    {
                        transport.Read("GetProducts", "Home");
                    })
                    .Schema(schema =>
                    {
                        schema.Data("Data") //define the [data](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.data) option
                            .Total("Total"); //define the [total](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.total) option
                    });
            })
        %>
    ```
    ```Razor
        @(Html.Kendo().MultiSelect()
            .Name("productMultiSelect")
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiSelect as a value.
            .DataSource(source =>
            {
                source.Custom()
                    .ServerFiltering(true)
                    .Type("aspnetmvc-ajax") //Set this type if you want to use DataSourceRequest and ToDataSourceResult instances.
                    .Transport(transport =>
                    {
                        transport.Read("GetProducts", "Home");
                    })
                    .Schema(schema =>
                    {
                        schema.Data("Data") //define the [data](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.data) option
                            .Total("Total"); //define the [total](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.total) option
                    });
            })
        )
    ```

### Model Binding

You can implement model binding both with [local data](#local-data) and [remote data](#remote-data), and in combination with [virtualization](#virtualization).

#### Local Data

Local data is the data that is available on the client when the MultiSelect is initialized.

1. Pass the data to the view through the view model.

    ###### Example

        public ActionResult Index()
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

    ```Razor
        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
            .DataValueField("OrderID")
            .DataTextField("OrderName")
            .BindTo(Model.Orders)
        )
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
        Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

        <%: Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
            .DataValueField("OrderID")
            .DataTextField("OrderName")
            .BindTo(Model.Orders)
        %>
    ```

#### Remote Data

You can configure the MultiSelect to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

    ###### Example

        public ActionResult Index()
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

            return Json(orders.ToList(), JsonRequestBehavior.AllowGet);
        }

1. Add the MultiSelect to the view and configure its DataSource to use remote data.

    ```Razor
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
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
        Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

        <%: Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
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
        %>
    ```

#### Virtualization

You can configure a MultiSelect that is bound to a model field to use [virtualization](https://docs.telerik.com/kendo-ui/controls/editors/combobox/virtualization).

> **Important**
>
> If the `AutoBind` option of the MultiSelect is set to `false`, the widget will not be able to display pre-selected items until it is focused.

1. Create the `Read` and `ValueMapper` actions.

    ###### Example

        public ActionResult Index()
        {
            return View(new ProductViewModel
            {
                SelectedOrders = new int[] { 1, 3 }
            });
        }

        [HttpPost]
        public ActionResult OrdersVirtualization_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetOrders().ToDataSourceResult(request));
        }

        public ActionResult Orders_ValueMapper(int[] values)
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

            return Json(indices, JsonRequestBehavior.AllowGet);
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

    ```Razor
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
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
        Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

        <%: Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
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
        %>
    ```

### Parameter Sending to Server

Below are listed the steps for you to follow when configuring the Kendo UI MultiSelect to send parameters to the server.

```ASPX
    <%: Html.Kendo().MultiSelect()
        .Name("productMultiSelect") //The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
        .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiSelect as a text.
        .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiSelect as a value.
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
                source.Read(read =>
                {
                        read.Action("GetProducts", "Home")
                            .Data("onAdditionalData");
                });

                source.serverFiltering(true);
        })
    %>
    <script>
        function onAdditionalData() {
            return {
                text: $("#productMultiSelect").data("kendoMultiSelect").input.val()
            };
        }
    </script>
```
```Razor
    @(Html.Kendo().MultiSelect()
        .Name("productMultiSelect") //The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
        .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiSelect as a text.
        .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiSelect as a value.
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home") //Set the Action and Controller names.
                    .Data("onAdditionalData");
            });
            source.ServerFiltering(true);
        })
    )

    <script>
        function onAdditionalData() {
            return {
                text: $("#productMultiSelect").data("kendoMultiSelect").input.val()
            };
        }
    </script>
```

The following example demonstrates how the `GetProducts` method is used.

###### Example

    public JsonResult GetProducts(string text)
    {
        var northwind = new SampleEntities();

        var products = northwind.Products.Select(product => new ProductViewModel
                {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitPrice = product.UnitPrice ?? 0,
                UnitsInStock = product.UnitsInStock ?? 0,
                UnitsOnOrder = product.UnitsOnOrder ?? 0,
                Discontinued = product.Discontinued
                });

        if (!string.IsNullOrEmpty(text))
        {
            products = products.Where(p => p.ProductName.Contains(text));
        }

        return Json(products, JsonRequestBehavior.AllowGet);
    }

> **Important**
>
> The Kendo UI MultiSelect has a default event handler for the Data callback of the DataSource. It is used when no event handler is defined.

The following example demonstrates how to use the default event handler for the Data callback of the DataSource.

###### Example

    function requestData(selector) {
        return { text: $(selector).data("kendoMultiSelect").input.val() };
    }

As seen, the MultiSelect sends the value of the input only if the end-user starts to type in it.

### Pre-select Values on Initial Load

When deferred binding&mdash;`AutoBind: false`&mdash;is used, specify a list of data items instead of just a list of strings. This functionality is supported in Kendo UI Q1 SP1 2013 and later versions.

```ASPX
    <%= Html.Kendo().MultiSelect()
        .Name("productMultiSelect") //The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
        .DataTextField("ProductName") //Specifies which property of the Product to be used by the MultiSelect as a text.
        .DataValueField("ProductID") //Specifies which property of the Product to be used by the MultiSelect as a value.
        .Filter(FilterType.Contains)
        .AutoBind(false)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home") //Set the Action and Controller name
                    .Data("onAdditionalData");
            });
        })
        .Value(new List<Product> {
            new Product { ProductName = "Chai", ProductID = 1 },
            new Product { ProductName = "Chang", ProductID = 2 }
        })
    %>
```
```Razor
    @(Html.Kendo().MultiSelect()
        .Name("productMultiSelect") //The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
        .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiSelect as a text.
        .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiSelect as a value.
        .Filter(FilterType.Contains)
        .AutoBind(false)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home") //Set the Action and Controller name
                    .Data("onAdditionalData");
            });
        })
        .Value(new List<Product> {
            new Product { ProductName = "Chai", ProductID = 1 },
            new Product { ProductName = "Chang", ProductID = 2 }
        })
    )
```

### Grouping

The MultiSelect supports binding to a grouped data source. Define a `datasource` group expression to group the data by using the [Custom DataSource configuration]({% slug customdatasource_aspnetmvc %}).

For more information, refer to the [demo on grouping](http://demos.telerik.com/aspnet-mvc/autocomplete/grouping).

> **Important**
>
> The data source sorts the grouped data either in ascending or descending order. If you want to persist a specific group order, use the [server grouping feature](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverGrouping). Use the DataSource `ServerGrouping` method to define the `serverGrouping` option.

## Event Handling

You can subscribe to all MultiSelect [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().MultiSelect()
        .Name("multiselect")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("multiselect_select")
            .Change("multiselect_change")
        )
    %>
    <script>
        function multiselect_select() {
            //Handle the select event.
        }

        function multiselect_change() {
            //Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("multiselect_select")
            .Change("multiselect_change")
        )
    )
    <script>
        function multiselect_select() {
            //Handle the select event.
        }

        function multiselect_change() {
            //Handle the change event.
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select(@<text>
            function() {
                //Handle the select event inline.
            }
            </text>)
            .Change(@<text>
            function() {
                //Handle the change event inline.
            }
            </text>)
        )
    )

## Reference

### Existing Instances

To reference an existing Kendo UI MultiSelect instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MultiSelect API](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect#methods) to control its behavior.

###### Example

    //Put this after your Kendo UI MultiSelect  for ASP.NET MVC declaration.
    <script>
        $(function() {
            //Notice that the Name() of the MultiSelect is used to get its client-side instance.
            var multiselect = $("#productMultiSelect").data("kendoMultiSelect");
        });
    </script>

## See Also

* [Telerik UI for ASP.NET MVC API Reference: MultiSelectBuilder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiSelectBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI MultiSelect Widget](http://docs.telerik.com/kendo-ui/controls/editors/multiselect/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
