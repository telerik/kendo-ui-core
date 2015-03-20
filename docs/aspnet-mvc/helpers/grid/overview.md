---
title: Overview
page_title: How to use the Kendo UI Grid HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Grid widget
description: Learn how to bind Kendo UI Grid for ASP.NET MVC, handle Kendo UI Grid Events, access an existing grid with Grid HtmlHelper extension documentation.
position: 1
---

# Grid

The Grid HtmlHelper extension is a server-side wrapper for the [Kendo UI Grid](/api/web/grid) widget. It allows you to configure the Kendo UI grid
from server-side code, helps with data binding and editing.

## Introduction

Kendo UI Grid for ASP.NET MVC supports two ways of data-binding:

*   [server](/aspnet-mvc/helpers/grid/server-binding)- the widget makes HTTP GET requests when binding
*   [ajax](/aspnet-mvc/helpers/grid/ajax-binding)- the widget will make ajax requests when binding

Here are some of the differences between server and ajax bound modes:

*  Templates
    - In server-bound mode the grid templates use server-side expressions and .NET code (C# or Visual Basic). Templates are executed server-side.
    - In ajax-bound mode the grid uses Kendo UI Templates. Templates are executed client-side and use JavaScript.

*  Full page updates
    - In server-bound mode the grid makes HTTP get requests to ASP.NET MVC action methods which cause a full page refresh.
    - In ajax-bound mode the grid makes ajax requests which cause partial page update. The grid retrieves only the data needed for the current page.

## Getting started

The following tutorial shows how to configure Kendo UI Grid for ASP.NET MVC to do server binding to the Northwind database (the Products table).

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)). Name the application "KendoGridServerBinding".
If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions followe the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Add a new "Entity Framework Data Model". Right click the `~/Models` folder in the solution explorer and pick "Add new item". Choose "Data->ADO.NET Entity Data Model" in the "Add New Item" dialog.
Name the model "Northwind.edmx" and click "Next". This will start the "Entity Data Model Wizard".
![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1.  Pick the "Generate from database" option and click "Next". Configure a connection to the Northwind database. Click "Next".
![Choose the connection](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1.  Choose the "Products" table from the "Which database objects do you want to include in your model?". Leave all other options as they are set by default. Click "Finish".
![Choose the Products table](/aspnet-mvc/helpers/grid/images/grid-database-objects.png)
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";
            var northwind = new NorthwindEntities();
            // Get the Products entities and add them in the ViewBag
            ViewBag.Products = northwind.Products;
            return View();
        }
1.  Add a Kendo UI Grid to the Index view
    - Index.aspx (ASPX)

            <%: Html.Kendo().Grid((IEnumerable<KendoGridServerBinding.Models.Product>)ViewBag.Products) //Bind the grid to ViewBag.Products
                    .Name("grid")
                    .Columns(columns =>
                    {
                        // Create a column bound to the ProductID property
                        columns.Bound(product => product.ProductID);
                        // Create a column bound to the ProductName property
                        columns.Bound(product => product.ProductName);
                        // Create a column bound to the UnitsInStock property
                        columns.Bound(product => product.UnitsInStock);
                    })
                    .Pageable() // Enable paging
                    .Sortable() // Enable sorting
            %>
    - Index.cshtml (Razor)

            @(Html.Kendo().Grid((IEnumerable<KendoGridServerBinding.Models.Product>)ViewBag.Products) //Bind the grid to ViewBag.Products
                  .Name("grid")
                  .Columns(columns =>
                  {
                      // Create a column bound to the ProductID property
                      columns.Bound(product => product.ProductID);
                      // Create a column bound to the ProductName property
                      columns.Bound(product => product.ProductName);
                      // Create a column bound to the UnitsInStock property
                      columns.Bound(product => product.UnitsInStock);
                  })
                  .Pageable() // Enable paging
                  .Sortable() // Enable sorting
            )
1. Build and run the application
![Final result](/aspnet-mvc/helpers/grid/images/grid-bound-grid.png)

## Getting reference to the Kendo UI Grid widget

To get a reference to a grid instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/web/grid#methods) of the grid.

### Example - get reference to a Kendo UI Grid instance

    @(Html.Kendo().Grid((IEnumerable<KendoGridServerBinding.Models.Product>)ViewBag.Products)
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
              columns.Bound(product => product.UnitsInStock);
          })
    )
    <script>
    $(function() {
        // Notice that the Name() of the grid is used to get its client-side instance
        var grid = $("#grid").data("kendoGrid");
    });
    </script>


## Handling Kendo UI Grid events

You can subscribe to all [events](/api/web/grid#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <%: Html.Kendo().Grid(Model)
            .Name("grid")
            .Events(e => e
                .DataBound("grid_dataBound")
                .Change("grid_change")
            )
    %>
    <script>
    function grid_dataBound() {
        //Handle the dataBound event
    }

    function grid_change() {
        //Handle the change event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().Grid(Model)
          .Name("grid")
          .Events(e => e
              .DataBound("grid_dataBound")
              .Change("grid_change")
          )
    )
    <script>
    function grid_dataBound() {
        //Handle the dataBound event
    }

    function grid_change() {
        //Handle the change event
    }
    </script>


### Example - subscribe to event via Razor delegate

    @(Html.Kendo().Grid(Model)
          .Name("grid")
          .Events(e => e
              .DataBound(@<text>
                  function() {
                      //Handle the dataBound event inline
                  }
              </text>)
              .Change(@<text>
                  function() {
                      //Handle the change event inline
                  }
              </text>)
          )
    )

## Further reading

1. [API reference](/api/wrappers/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder)
1. [Configuration](/aspnet-mvc/helpers/grid/configuration)
1. [FAQ](/aspnet-mvc/helpers/grid/faq)
1. [Ajax Binding](/aspnet-mvc/helpers/grid/ajax-binding)
1. [Server Binding](/aspnet-mvc/helpers/grid/server-binding)
1. [Troubleshooting](/aspnet-mvc/helpers/grid/troubleshooting)
