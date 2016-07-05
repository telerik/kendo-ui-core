---
title: Overview
page_title: Overview | Kendo UI DropDownList HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI DropDownList widget for ASP.NET MVC."
slug: overview_dropdownlisthelper_aspnetmvc
position: 1
---

# DropDownList HtmlHelper Overview

The DropDownList HtmlHelper extension is a server-side wrapper for the [Kendo UI DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/index) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI DropDownList for ASP.NET MVC:

* `server`&mdash;The data is serialized to the client. No Ajax requests are made.
* `ajax`&mdash;The DropDownList makes Ajax requests to get the data.

### Server Binding

Below are listed the steps for you to follow when configuring the Kendo UI DropDownList for server binding to the Northwind **Products** table using Linq to SQL.

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

**Step 4** Add a server bound dropdownlist.

###### Example

```tab-ASPX

        <%: Html.Kendo().DropDownList()
            .Name("productDropDownList") //The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the DropDownList as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the DropDownList as a value.
            .BindTo(Model)   //Pass the list of Products to the DropDownList.
            .SelectedIndex(10) //Select an item with index 10. Note that the indexes are zero-based.
        %>
```
```tab-Razor

        @(Html.Kendo().DropDownList()
          .Name("productDropDownList") //The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
          .DataTextField("ProductName") //Specify which property of the Product to be used by the DropDownList as a text.
          .DataValueField("ProductID") //Specify which property of the Product to be used by the DropDownList as a value.
          .BindTo(Model)   //Pass the list of Products to the DropDownList.
          .SelectedIndex(10) //Select an item with index 10. Note that the indexes are zero-based.
        )
```

### Ajax Binding

Below are listed the steps for you to follow when configuring the Kendo UI DropDownList for Ajax binding to the Northwind **Products** table using Linq to SQL.

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

**Step4** Add an Ajax-bound DropDownList.

###### Example

```tab-ASPX

        <%: Html.Kendo().DropDownList()
            .Name("productDropDownList") //The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the DropDownList as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the DropDownList as a value.
            .DataSource(source =>
            {
                   source.Read(read =>
                   {
                        read.Action("GetProducts", "Home"); //Set the Action and Controller names.
                   })
                   .ServerFiltering(true); //If true, the DataSource will not filter the data on the client.
            })
            .SelectedIndex(0) //Select first item.
        %>
```
```tab-Razor

        @(Html.Kendo().DropDownList()
            .Name("productDropDownList") //The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the DropDownList as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the DropDownList as a value.
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

## ToDataSourceResult Binding

Below are listed the steps for you to follow when configuring the Kendo UI DropDownList to use a custom DataSource and thus bind to a `ToDataSourceResult` instance.

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

**Step 4** Add an Ajax-bound DropDownList.

###### Example

```tab-ASPX

        <%: Html.Kendo().DropDownList()
            .Name("productDropDownList") //The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the DropDownList as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the DropDownList as a value.
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
        %>
```
```tab-Razor

        @(Html.Kendo().DropDownList()
            .Name("productDropDownList") //The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the DropDownList as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the DropDownList as a value.
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

Below are listed the steps for you to follow when configuring the Kendo UI DropDownList to send parameters to the server.

###### Example

```tab-ASPX

        <%: Html.Kendo().DropDownList()
                .Name("productDropDownList") //The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
                .DataTextField("ProductName") //Specify which property of the Product to be used by the DropDownList as a text.
                .DataValueField("ProductID") //Specify which property of the Product to be used by the DropDownList as a value.
                .Filter(FilterType.Contains)
                .DataSource(source =>
                {
                        source.Read(read =>
                       {
                                read.Action("GetProducts", "Home")
                                    .Data("onAdditionalData");
                       });
                })
         %>
         <script>
            function onAdditionalData() {
                return {
                    text: $("#productDropDownList").data("kendoDropDownList").text()
                };
            }
        </script>
```
```tab-Razor

        @(Html.Kendo().DropDownList()
              .Name("productDropDownList") //The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
              .DataTextField("ProductName") //Specify which property of the Product to be used by the DropDownList as a text.
              .DataValueField("ProductID") //Specify which property of the Product to be used by the DropDownList as a value.
              .Filter(FilterType.Contains)
              .DataSource(source =>
              {
                 source.Read(read =>
                 {
                      read.Action("GetProducts", "Home") //Set the Action and Controller names.
                          .Data("onAdditionalData");
                 });
              })
        )

        <script>
            function onAdditionalData() {
                return {
                    text: $("#productDropDownList").data("kendoDropDownList").filterInput.val()
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
> The DropDownList has a default event handler for the Data callback of the DataSource. It is used when no event handler is defined.

The example below demonstrates the default event handler for the Data callback of the DataSource.

###### Example

        function requestData(selector) {
            var dropdownlist = $(selector).data("kendoDropDownList"),
                filters = dropdownlist.dataSource.filter(),
                value = dropdownlist.filterInput.val();

            if (!filter || !filter.filters.length) {
                value = "";
            }

            return { text: value };
        }

As seen from the example above, the DropDownList sends the input's value only if the end-user starts to type in it.

### Grouping

The DropDownList supports binding to a grouped data source. Define a `datasource` group expression to group the data by using the [Custom DataSource configuration]({% slug customdatasource_aspnetmvc %}).

For more information, refer to the [demo on grouping](http://demos.telerik.com/aspnet-mvc/autocomplete/grouping).

> **Important**
>
> The data source sorts the grouped data either in ascending or descending order. If you want to persist a specific group order, use the [server grouping feature](/api/javascript/data/datasource#configuration-serverGrouping). Use the DataSource `ServerGrouping` method to define the `serverGrouping` option.

## Event Handling

You can subscribe to all DropDownList [events](/api/javascript/ui/dropdownlist#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().DropDownList()
            .Name("dropdownlist")
            .BindTo(new string[] { "Item1", "Item2", "Item3" })
            .Events(e => e
                .Select("dropdownlist_select")
                .Change("dropdownlist_change")
            )
        %>
        <script>
        function dropdownlist_select() {
            //Handle the select event.
        }

        function dropdownlist_change() {
            //Handle the change event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().DropDownList()
          .Name("dropdownlist")
          .BindTo(new string[] { "Item1", "Item2", "Item3" })
          .Events(e => e
                .Select("dropdownlist_select")
                .Change("dropdownlist_change")
          )
        )
        <script>
        function dropdownlist_select() {
            //Handle the select event.
        }

        function dropdownlist_change() {
            //Handle the change event.
        }
        </script>
```

### By Template Delegate

###### Example

```tab-Razor

        @(Html.Kendo().DropDownList()
          .Name("dropdownlist")
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

You can reference an existing Kendo UI DropDownList instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [DropDownList API](/api/javascript/ui/dropdownlist#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI DropDownList for ASP.NET MVC declaration.
        <script>
        $(function() {
        //Notice that the Name() of the DropDownList is used to get its client-side instance.
        var dropdownlist = $("#productDropDownList").data("kendoDropDownList");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the DropDownList:

* [ASP.NET MVC API Reference: DropDownListBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DropDownListBuilder)
* [How to Cascade DropDownLists Using WebApi Service in ASP.NET MVC Apps]({% slug howto_cascadeddlusingwebapiservice_ddlaspnetmvc %})
* [How to Cascade DropDownLists with Enabled Virtualization in ASP.NET MVC Apps]({% slug howto_cascadeddlenabledvirtualization_ddlaspnetmvc %})
* [How to Use Custom DataSource to Bind to ToDataSourceResult Output in ASP.NET MVC Apps]({% slug howto_usecustomdatasource_bindtodatasourceoutput_ddlaspnetmvc %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI DropDownList Widget]({% slug overview_kendoui_dropdownlist_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
