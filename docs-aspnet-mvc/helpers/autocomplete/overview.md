---
title: Overview
page_title: AutoComplete | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI AutoComplete widget for ASP.NET MVC."
slug: overview_autocompletehelper_aspnetmvc
position: 1
---

# AutoComplete HtmlHelper Overview

The AutoComplete HtmlHelper extension is a server-side wrapper for the [Kendo UI AutoComplete](http://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI AutoComplete for ASP.NET MVC:

* `server`&mdash;The data is serialized to the client. No Ajax requests are made.
* `ajax`&mdash;The AutoComplete makes Ajax requests to get the data.

### Server Binding

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete for server binding to the Northwind **Products** table using Linq to SQL.

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

1. Add a server bound AutoComplete.

    ```ASPX
        <%: Html.Kendo().AutoComplete()
            .Name("productAutoComplete") //The name of the AutoComplete is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the AutoComplete.
            .BindTo(Model)   //Pass the list of Products to the AutoComplete.
            .Filter("contains") //Define the type of the filter, which AutoComplete will use.
        %>
    ```
    ```Razor
        @(Html.Kendo().AutoComplete()
            .Name("productAutoComplete") //The name of the AutoComplete is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the AutoComplete.
            .BindTo(Model) //Pass the list of Products to the AutoComplete.
            .Filter("contains") //Define the type of the filter, which AutoComplete will use.
        )
    ```

### Ajax Binding

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete for Ajax binding to the Northwind **Products** table using Linq to SQL.

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

1. Add an Ajax-bound AutoComplete.

    ```ASPX
        <%: Html.Kendo().AutoComplete()
            .Name("productAutoComplete") //The name of the AutoComplete is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the AutoComplete.
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
        @(Html.Kendo().AutoComplete()
          .Name("productAutoComplete") //The name of the AutoComplete is mandatory. It specifies the "id" attribute of the widget.
          .DataTextField("ProductName") //Specify which property of the Product to be used by the AutoComplete.
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

> **Important**
>
> The `ToDataSourceResult()` extension method modifies the structure of the result and the widget is not able to bind to it. In this case, return a simple array of data.

### ToDataSourceResult Binding

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete to use a custom DataSource and thus bind to a `ToDataSourceResult` instance.

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

1. Add an Ajax bound AutoComplete.

    ```ASPX
        <%: Html.Kendo().AutoComplete()
            .Name("productAutoComplete")
            .DataTextField("ProductName") //Specify which property of the Product to be used by the autocomplete as a text.
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
                          schema.Data("Data") //Define the [data](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.data) option.
                                .Total("Total"); //Define the [total](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.total) option.
                      });
            })
        %>
    ```
    ```Razor
        @(Html.Kendo().AutoComplete()
            .Name("productAutoComplete")
            .DataTextField("ProductName") //Specify which property of the Product to be used by the autocomplete as a text.
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
                          schema.Data("Data") //Define the [data](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.data) option.
                                .Total("Total"); //Define the [total](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.total) option.
                      });
            })
        )
    ```

### Model Binding

You can implement model binding both with [local data](#local-data) and [remote data](#remote-data), and in combination with [virtualization](#virtualization).

#### Local Data

Local data is the data that is available on the client when the AutoComplete is initialized.

1. Pass the data to the view through `ViewData`.

    ###### Example

        public ActionResult Index()
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

    ```Razor
        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().AutoCompleteFor(m => m.ProductName)
            .DataTextField("ProductName")
            .BindTo((System.Collections.IEnumerable)ViewData["products"])
        )
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
        Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

        <%: Html.Kendo().AutoCompleteFor(m => m.ProductName)
            .DataTextField("ProductName")
            .BindTo((System.Collections.IEnumerable)ViewData["products"])
        %>
    ```

#### Remote Data

You can configure the AutoComplete to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

    ###### Example

        public ActionResult Index()
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

            return Json(products, JsonRequestBehavior.AllowGet);
        }


1. Add the AutoComplete to the view and configure its DataSource to use remote data.

    ```Razor
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
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
        Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

        <%: Html.Kendo().AutoCompleteFor(m => m.ProductName)
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
        %>
    ```

#### Virtualization

You can configure an AutoComplete that is bound to a model field to use [virtualization](https://docs.telerik.com/kendo-ui/controls/editors/combobox/virtualization).

> **Important**
>
> The value type to which the AutoComplete can be bound on the server can only be a primitive type or an enum value.

1. Create the `Read` and `ValueMapper` actions.

    ###### Example

        public ActionResult Index()
        {
            return View(new ProductViewModel
            {
                ProductID = 4,
                ProductName = "ProductName4"
            });
        }

        [HttpPost]
        public ActionResult ProductsVirtualization_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetProducts().ToDataSourceResult(request));
        }

        public ActionResult Products_ValueMapper(int[] values)
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

            return Json(indices, JsonRequestBehavior.AllowGet);
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

    ```Razor
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
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
        Inherits="System.Web.Mvc.ViewPage<MvcApplication1.Models.ProductViewModel>" %>

        <%: Html.Kendo().AutoCompleteFor(m => m.ProductName)
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
        %>

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
    ```

### Parameter Sending to Server

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete to send parameters to the server.

```ASPX
    <%: Html.Kendo().AutoComplete()
        .Name("productAutoComplete")
        .DataTextField("ProductName") //Specify which property of the Product to be used by the autocomplete as a text.
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
                      schema.Data("Data") //Define the [data](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.data) option.
                            .Total("Total"); //Define the [total](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.total) option.
                  });
        })
    %>
```
```Razor
    @(Html.Kendo().AutoComplete()
        .Name("productAutoComplete")
        .DataTextField("ProductName") //Specify which property of the Product to be used by the AutoComplete.
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home")
                    .Data("onAdditionalData");
            });
        })
    )

    <script>
        function onAdditionalData() {
            return {
                text: $("#productAutoComplete").val()
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

### Grouping

The AutoComplete supports binding to a grouped data source. Define a `datasource` group expression to group the data by using the [Custom DataSource configuration]({% slug customdatasource_aspnetmvc %}).

For more information, refer to the [demo on grouping](http://demos.telerik.com/aspnet-mvc/autocomplete/grouping).

> **Important**
>
> The data source sorts the grouped data either in ascending or descending order. To persist a specific group order, use the [server grouping feature](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverGrouping). To define the `serverGrouping` option, use the DataSource `ServerGrouping` method.

## Event Handling

You can subscribe to all AutoComplete [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```ASPX
    <%: Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("autocomplete_select")
            .Change("autocomplete_change")
        )
    %>
    <script>
        function autocomplete_select() {
            //Handle the select event.
        }

        function autocomplete_change() {
            //Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("autocomplete_select")
            .Change("autocomplete_change")
        )
    )
    <script>
        function autocomplete_select() {
            //Handle the select event.
        }

        function autocomplete_change() {
            //Handle the change event.
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```Razor
    @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
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
```

## Reference

### Existing Instances

To reference an existing Kendo UI AutoComplete instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [AutoComplete API](http://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete#methods) to control its behavior.

###### Example

    //Put this after your Kendo AutoComplete for ASP.NET MVC declaration.
    <script>
        $(function() {
            //Notice that the Name() of the AutoComplete is used to get its client-side instance.
            var autocomplete = $("#productAutoComplete").data("kendoAutoComplete");
        });
    </script>

## See Also

* [Telerik UI for ASP.NET MVC API Reference: AutoCompleteBuilder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/AutoCompleteBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI AutoComplete Widget](http://docs.telerik.com/kendo-ui/controls/editors/autocomplete/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
