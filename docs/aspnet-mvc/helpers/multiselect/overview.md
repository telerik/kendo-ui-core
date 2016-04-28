---
title: Overview
page_title: Overview | Kendo UI MultiSelect HtmlHelper
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

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method and pass the **Products** table as the model.

###### Example

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

**Step 3** Make your view strongly typed.

###### Example

```tab-ASPX

        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
           Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Product>>" %>
```
```tab-Razor

        @model IEnumerable<MvcApplication1.Models.Product>
```

**Step 4** Add a server bound MultiSelect.

###### Example

```tab-ASPX

        <%: Html.Kendo().MultiSelect()
            .Name("productMultiSelect") //The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiSelect as a value.
            .BindTo(Model)   //Pass the list of Products to the MultiSelect.
        %>
```
```tab-Razor

        @(Html.Kendo().MultiSelect()
          .Name("productMultiSelect") //The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
          .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiSelect as a text.
          .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiSelect as a value.
          .BindTo(Model)   //Pass the list of Products to the MultiSelect.
        )
```

### Ajax Binding

Below are listed the steps for you to follow when configuring the Kendo UI MultiSelect for Ajax binding to the Northwind **Products** table using Linq to SQL.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create an action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Create a new action method and pass the **Products** table as JSON result.

###### Example

        public JsonResult GetProducts()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products, JsonRequestBehavior.AllowGet);
        }

**Step 4** Add an Ajax-bound MultiSelect.

###### Example

```tab-ASPX

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
```tab-Razor

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

#### ToDataSourceResult Binding

Below are listed the steps for you to follow when configuring the Kendo UI MultiSelect to use a custom DataSource and thus bind to a `ToDataSourceResult` instance.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create an action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Create a new action method and pass the **Products** table as JSON result.

###### Example

        public JsonResult GetProducts([DataSourceRequest] DataSourceRequest request)
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products.ToDataSourceResult(request));
        }

**Step 4** Add an Ajax-bound MultiSelect.

###### Example

```tab-ASPX

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
```tab-Razor

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

### Parameter Sending to Server

Below are listed the steps for you to follow when configuring the Kendo UI MultiSelect to send parameters to the server.

###### Example

```tab-ASPX

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
```tab-Razor

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

The example below demonstrates how the `GetProducts` method is used.

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

The example below demonstrates how to use the default event handler for the Data callback of the DataSource.

###### Example

    function requestData(selector) {
        return { text: $(selector).data("kendoMultiSelect").input.val() };
    }

As seen, the MultiSelect sends the value of the input only if the end-user starts to type in it.

### Pre-select Values on Initial Load

When deferred binding&mdash;`AutoBind: false`&mdash;is used, specify a list of data items instead of just a list of strings. This functionality is supported in Kendo UI Q1 SP1 2013 and later versions.

###### Example

```tab-ASPX

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
```tab-Razor

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
> The data source sorts the grouped data either in ascending or descending order. If you want to persist a specific group order, use the [server grouping feature](/api/javascript/data/datasource#configuration-serverGrouping). Use the DataSource `ServerGrouping` method to define the `serverGrouping` option.

## Event Handling

You can subscribe to all MultiSelect [events](/api/javascript/ui/mutliselect#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

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
```tab-Razor

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

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

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
```

## Reference

### Existing Instances

You can reference an existing Kendo UI MultiSelect instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [MultiSelect API](/api/javascript/ui/multiselect#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI MultiSelect  for ASP.NET MVC declaration.
        <script>
        $(function() {
        //Notice that the Name() of the MultiSelect is used to get its client-side instance.
        var multiselect = $("#productMultiSelect").data("kendoMultiSelect");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the MultiSelect:

* [ASP.NET MVC API Reference: MultiSelectBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MultiSelectBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI MultiSelect Widget]({% slug overview_kendoui_multiselect_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
