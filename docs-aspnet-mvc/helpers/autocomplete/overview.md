---
title: Overview
page_title: Overview | Kendo UI AutoComplete HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI AutoComplete widget for ASP.NET MVC."
slug: overview_autocompletehelper_aspnetmvc
position: 1
---

# AutoComplete HtmlHelper Overview

The AutoComplete HtmlHelper extension is a server-side wrapper for the [Kendo UI AutoComplete](../../../kendo-ui/api/javascript/ui/autocomplete) widget.

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

    ###### Example

    ```tab-ASPX

         <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
         Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Product>>" %>
    ```
    ```tab-Razor

         @model IEnumerable<MvcApplication1.Models.Product>
    ```

1. Add a server bound AutoComplete.

    ###### Example

    ```tab-ASPX

        <%: Html.Kendo().AutoComplete()
            .Name("productAutoComplete") //The name of the AutoComplete is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the AutoComplete.
            .BindTo(Model)   //Pass the list of Products to the AutoComplete.
            .Filter("contains") //Define the type of the filter, which AutoComplete will use.
        %>
    ```
    ```tab-Razor

        @(Html.Kendo().AutoComplete()
          .Name("productAutoComplete") //The name of the AutoComplete is mandatory. It specifies the "id" attribute of the widget.
          .DataTextField("ProductName") //Specify which property of the Product to be used by the AutoComplete.
          .BindTo(Model)   //Pass the list of Products to the AutoComplete.
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

    ###### Example

    ```tab-ASPX

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
    ```tab-Razor

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

    ###### Example

    ```tab-ASPX

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
    ```tab-Razor

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

### Parameter Sending to Server

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete to send parameters to the server.

###### Example

```tab-ASPX

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
```tab-Razor

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
> The data source sorts the grouped data either in ascending or descending order. To persist a specific group order, use the [server grouping feature](../../../kendo-ui/api/javascript/data/datasource#configuration-serverGrouping). To define the `serverGrouping` option, use the DataSource `ServerGrouping` method.

## Event Handling

You can subscribe to all AutoComplete [events](../../../kendo-ui/api/javascript/ui/autocomplete#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

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
```tab-Razor

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

```tab-Razor

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

To reference an existing Kendo UI AutoComplete instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [AutoComplete API](../../../kendo-ui/api/javascript/ui/autocomplete#methods) to control its behavior.

###### Example

      //Put this after your Kendo AutoComplete for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the Name() of the AutoComplete is used to get its client-side instance.
          var autocomplete = $("#productAutoComplete").data("kendoAutoComplete");
      });
      </script>

## See Also

* [ASP.NET MVC API Reference: AutoCompleteBuilder](/api/Kendo.Mvc.UI.Fluent/AutoCompleteBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI AutoComplete Widget](http://docs.telerik.com/kendo-ui/controls/editors/autocomplete/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
