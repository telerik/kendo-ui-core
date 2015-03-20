---
title: Overview
page_title: How to use MultiSelect HtmlHelper extension | Kendo UI documentation
description: User Guide for server-side wrapper for Kendo UI MultiSelect for ASP.NET MVC widget.
---

# MultiSelect

The MultiSelect HtmlHelper extension is a server-side wrapper for the [Kendo UI MultiSelect](/api/web/multiselect) widget.

## Getting Started

There are two ways to bind a Kendo MultiSelect for ASP.NET MVC:

*   **server** - the data will be serialized to the client. No Ajax requests will be made.
*   **ajax** - the multiselect will make ajax request to get the data.

### Configure the Kendo MultiSelect for server binding

Here is how to configure the Kendo MultiSelect for server binding to the Northwind Products table using Linq to SQL:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method and pass the Products table as the model:

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }
3.  Make your view strongly typed:
    - WebForms

            <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
               Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Product>>" %>
    - Razor

            @model IEnumerable<MvcApplication1.Models.Product>
4.  Add a server bound multiselect:
    - WebForms

            <%: Html.Kendo().MultiSelect()
                .Name("productMultiSelect") //The name of the multiselect is mandatory. It specifies the "id" attribute of the widget.
                .DataTextField("ProductName") //Specifies which property of the Product to be used by the multiselect as a text.
                .DataValueField("ProductID") //Specifies which property of the Product to be used by the multiselect as a value.
                .BindTo(Model)   //Pass the list of Products to the multiselect.
            %>
    - Razor

            @(Html.Kendo().MultiSelect()
              .Name("productMultiSelect") //The name of the multiselect is mandatory. It specifies the "id" attribute of the widget.
              .DataTextField("ProductName") //Specifies which property of the Product to be used by the multiselect as a text.
              .DataValueField("ProductID") //Specifies which property of the Product to be used by the multiselect as a value.
              .BindTo(Model)   //Pass the list of Products to the multiselect.
            )

### Configure the Kendo MultiSelect for ajax binding

Here is how to configure the Kendo MultiSelect for ajax binding to the Northwind Products table using Linq to SQL:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create an action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Create a new action method and pass the Products table as Json result:

        public JsonResult GetProducts()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products, JsonRequestBehavior.AllowGet);
        }
4.  Add an ajax bound multiselect:
    - WebForms

            <%: Html.Kendo().MultiSelect()
                .Name("productMultiSelect") //The name of the multiselect is mandatory. It specifies the "id" attribute of the widget.
                .DataTextField("ProductName") //Specifies which property of the Product to be used by the multiselect as a text.
                .DataValueField("ProductID") //Specifies which property of the Product to be used by the multiselect as a value.
                .Filter(FilterType.Contains)
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("GetProducts", "Home"); //Set the Action and Controller name
                    })
                    .ServerFiltering(true); //If true the DataSource will not filter the data on the client.
                })
            %>
    - Razor

            @(Html.Kendo().MultiSelect()
                .Name("productMultiSelect") //The name of the multiselect is mandatory. It specifies the "id" attribute of the widget.
                .DataTextField("ProductName") //Specifies which property of the Product to be used by the multiselect as a text.
                .DataValueField("ProductID") //Specifies which property of the Product to be used by the multiselect as a value.
                .Filter(FilterType.Contains)
                .DataSource(source =>
                {
                   source.Read(read =>
                   {
                        read.Action("GetProducts", "Home"); //Set the Action and Controller name
                   })
                   .ServerFiltering(true); //If true the DataSource will not filter the data on the client.
                })
            )

> **Important:** **ToDataSourceResult()** extension method will modify structure of the result and the widget will not be able to bind to it. Please return simple array of data in this case.

### Configure the Kendo MultiSelect to work with ToDataSourceResult instance

Here is how to configure the multiselect to use a custom datasource and thus to bind to a ToDataSourceResult instance.

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create an action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Create a new action method and pass the Products table as Json result:

        public JsonResult GetProducts([DataSourceRequest] DataSourceRequest request)
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products.ToDataSourceResult(request));
        }
4.  Add a ajax bound multiselect:
    - WebForms

            <%: Html.Kendo().MultiSelect()
                .Name("productMultiSelect")
                .DataTextField("ProductName") //Specifies which property of the Product to be used by the multiselect as a text.
                .DataValueField("ProductID") //Specifies which property of the Product to be used by the multiselect as a value.
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
    - Razor

            @(Html.Kendo().MultiSelect()
                .Name("productMultiSelect")
                .DataTextField("ProductName") //Specifies which property of the Product to be used by the multiselect as a text.
                .DataValueField("ProductID") //Specifies which property of the Product to be used by the multiselect as a value.
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
            )

### Sending parameters to the server

Here is how to configure the Kendo MultiSelect to send parameters to the server:

- WebForms

        <%: Html.Kendo().MultiSelect()
                .Name("productMultiSelect") //The name of the multiselect is mandatory. It specifies the "id" attribute of the widget.
                .DataTextField("ProductName") //Specifies which property of the Product to be used by the multiselect as a text.
                .DataValueField("ProductID") //Specifies which property of the Product to be used by the multiselect as a value.
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

- Razor

        @(Html.Kendo().MultiSelect()
              .Name("productMultiSelect") //The name of the multiselect is mandatory. It specifies the "id" attribute of the widget.
              .DataTextField("ProductName") //Specifies which property of the Product to be used by the multiselect as a text.
              .DataValueField("ProductID") //Specifies which property of the Product to be used by the multiselect as a value.
              .Filter(FilterType.Contains)
              .DataSource(source =>
              {
                 source.Read(read =>
                 {
                      read.Action("GetProducts", "Home") //Set the Action and Controller name
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

Here is how the **GetProducts** method looks like:

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

> The Kendo MultiSelect has default event handler for the DataSource's Data callback. If you do not
define event handler, it will be used.

*Default event handler for the DataSource's Data callback*

    function requestData(selector) {
        return { text: $(selector).data("kendoMultiSelect").input.val() };
    }

As you can see the multiselect sends the input's value only if the end-user starts to type in it.

## Pre-select values on initial loading

When deffered binding (AutoBind: false) is used you will need to specify a list of data items instead of just list of strings.
This functionality is supported in Q1 SP1 2013 release and later versions of Kendo UI.

- WebForms

        <%= Html.Kendo().MultiSelect()
                .Name("productMultiSelect") //The name of the multiselect is mandatory. It specifies the "id" attribute of the widget.
                .DataTextField("ProductName") //Specifies which property of the Product to be used by the multiselect as a text.
                .DataValueField("ProductID") //Specifies which property of the Product to be used by the multiselect as a value.
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

- Razor

        @(Html.Kendo().MultiSelect()
              .Name("productMultiSelect") //The name of the multiselect is mandatory. It specifies the "id" attribute of the widget.
              .DataTextField("ProductName") //Specifies which property of the Product to be used by the multiselect as a text.
              .DataValueField("ProductID") //Specifies which property of the Product to be used by the multiselect as a value.
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

## Accessing an Existing MultiSelect

You can reference an existing MultiSelect instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/multiselect#methods) to control its behavior.


### Accessing an existing MultiSelect instance

    //Put this after your Kendo MultiSelect  for ASP.NET MVC declaration
    <script>
    $(function() {
    // Notice that the Name() of the multiselect is used to get its client-side instance
    var multiselect = $("#productMultiSelect").data("kendoMultiSelect");
    });
    </script>


## Handling Kendo UI MultiSelect events

You can subscribe to all [events](/api/web/multiselect#events) exposed by Kendo UI MultiSelect:

### WebForms - subscribe by handler name

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
        //Handle the select event
    }

    function multiselect_change() {
        //Handle the change event
    }
    </script>


### Razor - subscribe by handler name

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
        //Handle the select event
    }

    function multiselect_change() {
        //Handle the change event
    }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().MultiSelect()
      .Name("multiselect")
      .BindTo(new string[] { "Item1", "Item2", "Item3" })
      .Events(e => e
          .Select(@<text>
            function() {
                //Handle the select event inline
            }
          </text>)
          .Change(@<text>
            function() {
                //Handle the change event inline
            }
            </text>)
      )
    )

