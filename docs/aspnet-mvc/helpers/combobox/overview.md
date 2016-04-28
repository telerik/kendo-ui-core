---
title: Overview
page_title: Overview | Kendo UI ComboBox HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI ComboBox widget for ASP.NET MVC."
slug: overview_combobox_aspnetmvc
position: 1
---

# ComboBox HtmlHelper Overview

The ComboBox HtmlHelper extension is a server-side wrapper for the [Kendo UI ComboBox](/api/javascript/ui/combobox) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI ComboBox for ASP.NET MVC:

* `server`&mdash;The data is serialized to the client. No Ajax requests are made.
* `ajax`&mdash;The ComboBox makes Ajax requests to get the data.

### Server Binding

Below are listed the steps for you to follow when configuring the Kendo UI ComboBox for server binding to the Northwind **Products** table using Linq to SQL.

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

**Step 4**  Add a server-bound ComboBox.

###### Example

```tab-ASPX

        <%: Html.Kendo().ComboBox()
            .Name("productComboBox") //The name of the ComboBox is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the ComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the ComboBox as a value.
            .BindTo(Model)   //Pass the list of Products to the ComboBox.
            .SelectedIndex(10) //Select an item with index 10. Note that the indexes are zero-based.
        %>
```
```tab-Razor

        @(Html.Kendo().ComboBox()
          .Name("productComboBox") //The name of the ComboBox is mandatory. It specifies the "id" attribute of the widget.
          .DataTextField("ProductName") //Specify which property of the Product to be used by the ComboBox as a text.
          .DataValueField("ProductID") //Specify which property of the Product to be used by the ComboBox as a value.
          .BindTo(Model)   //Pass the list of Products to the ComboBox.
          .SelectedIndex(10) //Select an item with index 10. Note that the indexes are zero-based.
        )
```

### Ajax Binding

Below are listed the steps for you to follow when configuring the Kendo UI ComboBox for Ajax binding to the Northwind **Products** table using Linq to SQL.

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

**Step 4** Add an Ajax-bound ComboBox.

###### Example

```tab-ASPX

        <%: Html.Kendo().ComboBox()
            .Name("productComboBox") //The name of the ComboBox is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the ComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the ComboBox as a value.
            .Filter(FilterType.Contains)
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home"); //Set the Action and Controller names.
                })
                .ServerFiltering(true); //If true, the DataSource will not filter the data on the client.
            })
            .SelectedIndex(0) //Select the first item.
        %>
```
```tab-Razor

        @(Html.Kendo().ComboBox()
            .Name("productComboBox") //The name of the ComboBox is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the ComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the ComboBox as a value.
            .Filter(FilterType.Contains)
            .DataSource(source =>
            {
               source.Read(read =>
               {
                    read.Action("GetProducts", "Home"); //Set the Action and Controller names.
               })
               .ServerFiltering(true); //If true, the DataSource will not filter the data on the client.
            })
            .SelectedIndex(0) //Select the first item.
        )
```

> **Important**
>
> The `ToDataSourceResult()` extension method modifies the structure of the result and the widget is not able to bind to it. In this case, return a simple array of data.

### ToDataSourceResult Binding

Below are listed the steps for you to follow when configuring the Kendo UI ComboBox to use a custom DataSource and thus bind to a `ToDataSourceResult` instance.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create an action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Create a new action method and pass the Products table as JSON result.

###### Example

        public JsonResult GetProducts([DataSourceRequest] DataSourceRequest request)
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products.ToDataSourceResult(request));
        }

**Step 4** Add an Ajax-bound ComboBox.

###### Example

```tab-ASPX

        <%: Html.Kendo().ComboBox()
            .Name("productComboBox")
            .DataTextField("ProductName") //Specify which property of the Product to be used by the ComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the ComboBox as a value.
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

        @(Html.Kendo().ComboBox()
            .Name("productComboBox")
            .DataTextField("ProductName") //Specify which property of the Product to be used by the ComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the ComboBox as a value.
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

Below are listed the steps for you to follow when configuring the Kendo UI ComboBox to send parameters to the server.

###### Example

```tab-ASPX

     <%: Html.Kendo().ComboBox()
              .Name("productComboBox") //The name of the ComboBox is mandatory. It specifies the "id" attribute of the widget.
              .DataTextField("ProductName") //Specify which property of the Product to be used by the ComboBox as a text.
              .DataValueField("ProductID") //Specify which property of the Product to be used by the ComboBox as a value.
              .Filter(FilterType.Contains)
              .DataSource(source =>
              {
                      source.Read(read =>
                     {
                              read.Action("GetProducts", "Home")
                                  .Data("onAdditionalData");
                     });
              })
              .SelectedIndex(0) //Select the first item.
       %>
       <script>
          function onAdditionalData() {
              return {
                  text: $("#productComboBox").data("kendoComboBox").text()
              };
          }
      </script>
```
```tab-Razor

      @(Html.Kendo().ComboBox()
            .Name("productComboBox") //The name of the ComboBox is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the ComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the ComboBox as a value.
            .Filter(FilterType.Contains)
            .DataSource(source =>
            {
               source.Read(read =>
               {
                    read.Action("GetProducts", "Home") //Set the Action and Controller names.
                        .Data("onAdditionalData");
               });
            })
            .SelectedIndex(0) //Select the first item.
      )

      <script>
          function onAdditionalData() {
              return {
                  text: $("#productComboBox").data("kendoComboBox").text()
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
> The Kendo UI ComboBox has a default event handler for the Data callback of the DataSource. It is used when no event handler is defined.

The example below demonstrates the default event handler for the Data callback of the DataSource.

###### Example

      function requestData(selector) {
          var combobox = $(selector).data("kendoComboBox"),
              filters = combobox.dataSource.filter(),
              value = combobox.input.val();

          if (!filter || !filter.filters.length) {
              value = "";
          }

          return { text: value };
      }

As seen from the example above, the ComboBox sends the input's value only if the end-user starts to type in it.

### Grouping

The ComboBox supports binding to a grouped data source. Define a `datasource` group expression to group the data by using the [Custom DataSource configuration]({% slug customdatasource_aspnetmvc %}).

For more information, refer to the [demo on grouping](http://demos.telerik.com/aspnet-mvc/autocomplete/grouping).

> **Important**
>
> The data source sorts the grouped data either in ascending or descending order. If you want to persist a specific group order, use the [server grouping feature](/api/javascript/data/datasource#configuration-serverGrouping). Use the DataSource `ServerGrouping` method to define the `serverGrouping` option.

## Event Handling

You can subscribe to all ComboBox [events](/api/javascript/ui/combobox#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

    <%: Html.Kendo().ComboBox()
        .Name("combobox")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("combobox_select")
            .Change("combobox_change")
        )
    %>
    <script>
    function combobox_select() {
        //Handle the select event.
    }

    function combobox_change() {
        //Handle the change event.
    }
    </script>
```
```tab-Razor

    @(Html.Kendo().ComboBox()
      .Name("combobox")
      .BindTo(new string[] { "Item1", "Item2", "Item3" })
      .Events(e => e
            .Select("combobox_select")
            .Change("combobox_change")
      )
    )
    <script>
    function combobox_select() {
        //Handle the select event.
    }

    function combobox_change() {
        //Handle the change event.
    }
    </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

    @(Html.Kendo().ComboBox()
      .Name("combobox")
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

You can reference an existing Kendo UI ComboBox instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [ComboBox API](/api/javascript/ui/combobox#methods) to control its behavior.

###### Example

    //Put this after your Kendo UI ComboBox for ASP.NET MVC declaration.
    <script>
    $(function() {
    //Note that the Name() of the ComboBox is used to get its client-side instance.
    var combobox = $("#productComboBox").data("kendoComboBox");
    });
    </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ComboBox:

* [ASP.NET MVC API Reference: ComboBoxBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ComboBoxBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI ComboBox Widget]({% slug overview_kendoui_combobox_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
