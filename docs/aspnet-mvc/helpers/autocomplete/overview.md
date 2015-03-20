---
title: Overview
page_title: Help Guide for AutoComplete HtmlHelper extension | Kendo UI documentation
description: Instructions how to configure the Kendo UI AutoComplete for ASP.NET MVC widget for server binding and add AutoComplete HtmlHelper extension.
---

# AutoComplete

The AutoComplete HtmlHelper extension is a server-side wrapper for the [Kendo UI AutoComplete](/api/web/autocomplete) widget.

## Getting Started

There are two ways to bind a Kendo AutoComplete for ASP.NET MVC:

*   **server** - the data will be serialized to the client. No Ajax requests will be made.
*   **ajax** - the autocomplete will make ajax requests to get the data.

### Configure the Kendo AutoComplete for server binding

Here is how to configure the Kendo AutoComplete for server binding to the Northwind Products table using Linq to SQL:

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
 4.  Add a server bound autocomplete:
     - WebForms

             <%: Html.Kendo().AutoComplete()
                 .Name("productAutoComplete") //The name of the autocomplete is mandatory. It specifies the "id" attribute of the widget.
                 .DataTextField("ProductName") //Specifies which property of the Product to be used by the autocomplete.
                 .BindTo(Model)   //Pass the list of Products to the autocomplete.
                 .Filter("contains") //Define the type of the filter, which autocomplete will use.
             %>
     - Razor

             @(Html.Kendo().AutoComplete()
               .Name("productAutoComplete") //The name of the autocomplete is mandatory. It specifies the "id" attribute of the widget.
               .DataTextField("ProductName") //Specifies which property of the Product to be used by the autocomplete.
               .BindTo(Model)   //Pass the list of Products to the autocomplete.
               .Filter("contains") //Define the type of the filter, which autocomplete will use.
             )

### Configure the Kendo AutoComplete for ajax binding

Here is how to configure the Kendo AutoComplete for ajax binding to the Northwind Products table using Linq to SQL:

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
4.  Add a ajax bound autocomplete:
     - WebForms

             <%: Html.Kendo().AutoComplete()
                 .Name("productAutoComplete") //The name of the autocomplete is mandatory. It specifies the "id" attribute of the widget.
                 .DataTextField("ProductName") //Specifies which property of the Product to be used by the autocomplete.
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

             @(Html.Kendo().AutoComplete()
               .Name("productAutoComplete") //The name of the autocomplete is mandatory. It specifies the "id" attribute of the widget.
               .DataTextField("ProductName") //Specifies which property of the Product to be used by the autocomplete.
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

### Configure the Kendo AutoComplete to work with ToDataSourceResult instance

Here is how to configure the autocomplete to use a custom datasource and thus to bind to a ToDataSourceResult instance.

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
4.  Add a ajax bound autocomplete:
    - WebForms

            <%: Html.Kendo().AutoComplete()
                .Name("productAutoComplete")
                .DataTextField("ProductName") //Specifies which property of the Product to be used by the autocomplete as a text.
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

            @(Html.Kendo().AutoComplete()
                .Name("productAutoComplete")
                .DataTextField("ProductName") //Specifies which property of the Product to be used by the autocomplete as a text.
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

Here is how to configure the Kendo ComboBox to send parameters to the server:

- WebForms

        <%: Html.Kendo().ComboBox()
                .Name("productAutoComplete")
                .DataTextField("ProductName") //Specifies which property of the Product to be used by the autocomplete.
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
                    text: $("#productAutoComplete").val()
                };
            }
        </script>

- Razor

        @(Html.Kendo().ComboBox()
              .Name("productAutoComplete")
              .DataTextField("ProductName") //Specifies which property of the Product to be used by the autocomplete.
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

## Accessing an Existing AutoComplete

You can reference an existing AutoComplete instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/autocomplete#methods) to control its behavior.

### Accessing an existing AutoComplete instance

    //Put this after your Kendo AutoComplete for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the autocomplete is used to get its client-side instance
        var autocomplete = $("#productAutoComplete").data("kendoAutoComplete");
    });
    </script>


## Handling Kendo UI AutoComplete events

You can subscribe to all [events](/api/web/autocomplete#events) exposed by Kendo UI autocomplete:

### WebForms - subscribe by handler name

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
            //Handle the select event
        }

        function autocomplete_change() {
            //Handle the change event
        }
    </script>


### Razor - subscribe by handler name

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
            //Handle the select event
        }

        function autocomplete_change() {
            //Handle the change event
        }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().AutoComplete()
      .Name("autocomplete")
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

