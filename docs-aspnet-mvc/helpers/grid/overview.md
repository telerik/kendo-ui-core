---
title: Overview
page_title: Overview | Kendo UI Grid HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Grid widget for ASP.NET MVC."
slug: overview_gridhelper_aspnetmvc
position: 1
---

# Grid HtmlHelper Overview

The Grid HtmlHelper extension is a server-side wrapper for the [Kendo UI Grid](https://demos.telerik.com/kendo-ui/grid/index) widget. It allows you to configure the Kendo UI Grid from server-side code and helps with data binding and editing.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI Grid for ASP.NET MVC:

* `server`&mdash;The widget makes HTTP GET requests when binding.
* `ajax`&mdash;The widget makes Ajax requests when binding.

Here are some of the differences between server and AJAX bound modes:

|**Feature**  |**Server Binding** |**Ajax Binding** |
|:---         |:---               |:---             |
|**Templates** |In the server-bound mode, the Grid templates use server-side expressions and .NET code&mdash;C# or Visual Basic. Templates are executed server-side. |In the Ajax-bound mode, the Grid uses Kendo UI Templates. Templates are executed on the client side and use JavaScript. |
|**Full-Page Updates** |The Grid makes HTTP GET requests to ASP.NET MVC action methods which cause a full-page refresh. |The Grid makes Ajax requests which cause partial page update. The Grid retrieves only the data needed for the current page.|

### Server Binding

Below are listed the steps for you to follow when configuring the Kendo UI Grid for server binding to the Northwind **Products** table using.

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#requirements), create a Telerik UI for ASP.NET MVC application. Name the application `KendoGridServerBinding`. If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

1. Add a new `Entity Framework Data Model`. Right-click the `~/Models` folder in the solution explorer and pick **Add new item**. Choose **Data** > **ADO.NET Entity Data Model** in the **Add New Item** dialog. Name the model `Northwind.edmx` and click **Next**. This starts the **Entity Data Model Wizard**.

    **Figure 1. A new entity data model**

    ![New entity data model](/helpers/grid/images/grid-entity-data-model.png)

1.  Pick the **Generate from database** option and click **Next**. Configure a connection to the Northwind database. Click **Next**.

    **Figure 2. Choose the connection**

    ![Choose the connection](/helpers/grid/images/grid-entity-data-model.png)

1. Choose the **Products** table from the `Which database objects do you want to include in your model?`. Leave all other options as they are set by default. Click **Finish**.

    **Figure 3. Choose the Products table**

    ![Choose the Products table](/helpers/grid/images/grid-database-objects.png)

1. Open **HomeController.cs** and modify the `Index` action method.

    ###### Example

          public ActionResult Index()
          {
              ViewBag.Message = "Welcome to ASP.NET MVC!";
              var northwind = new NorthwindEntities();
              //Get the Products entities and add them to the ViewBag.
              ViewBag.Products = northwind.Products;
              return View();
          }

1. Add a Kendo UI Grid to the `Index` view.

    ###### Example

    ```tab-ASPX

          <%: Html.Kendo().Grid((IEnumerable<KendoGridServerBinding.Models.Product>)ViewBag.Products) //Bind the grid to ViewBag.Products
                  .Name("grid")
                  .Columns(columns =>
                  {
                      //Create a column bound to the ProductID property.
                      columns.Bound(product => product.ProductID);
                      //Create a column bound to the ProductName property.
                      columns.Bound(product => product.ProductName);
                      //Create a column bound to the UnitsInStock property.
                      columns.Bound(product => product.UnitsInStock);
                  })
                  .Pageable() //Enable the paging.
                  .Sortable() //Enable the sorting.
          %>
    ```
    ```tab-Razor

          @(Html.Kendo().Grid((IEnumerable<KendoGridServerBinding.Models.Product>)ViewBag.Products) //Bind the grid to ViewBag.Products
                .Name("grid")
                .Columns(columns =>
                {
                    //Create a column bound to the ProductID property.
                    columns.Bound(product => product.ProductID);
                    //Create a column bound to the ProductName property.
                    columns.Bound(product => product.ProductName);
                    //Create a column bound to the UnitsInStock property.
                    columns.Bound(product => product.UnitsInStock);
                })
                .Pageable() //Enable the paging.
                .Sortable() //Enable the sorting.
          )
    ```

1. Build and run the application.

    **Figure 4. The final result**

    ![Final result](/helpers/grid/images/grid-bound-grid.png)

## Reference

### Existing Instances

To reference an existing Kendo UI Grid instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Grid API](../../../kendo-ui/api/javascript/ui/grid#methods) to control its behavior.

###### Example

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
            //Notice that the Name() of the Grid is used to get its client-side instance.
            var grid = $("#grid").data("kendoGrid");
        });
        </script>

## Event Handling

You can subscribe to all Grid [events](../../../kendo-ui/api/javascript/ui/grid#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().Grid(Model)
                .Name("grid")
                .Events(e => e
                    .DataBound("grid_dataBound")
                    .Change("grid_change")
                )
        %>
        <script>
        function grid_dataBound() {
            //Handle the dataBound event.
        }

        function grid_change() {
            //Handle the change event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().Grid(Model)
              .Name("grid")
              .Events(e => e
                  .DataBound("grid_dataBound")
                  .Change("grid_change")
              )
        )
        <script>
        function grid_dataBound() {
            //Handle the dataBound event.
        }

        function grid_change() {
            //Handle the change event.
        }
        </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

    @(Html.Kendo().Grid(Model)
          .Name("grid")
          .Events(e => e
              .DataBound(@<text>
                  function() {
                      //Handle the dataBound event inline.
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

## See Also

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [ASP.NET MVC API Reference: GridBuilder](/api/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Binding of the Grid HtmlHelper]({% slug ajaxbinding_grid_aspnetmvc %})
* [Editing of the Grid HtmlHelper]({% slug ajaxediting_grid_aspnetmvc %})
* [Templating of the Grid HtmlHelper]({% slug clientdetailtemplate_grid_aspnetmvc %})
* [Troubleshooting for the Grid HtmlHelper]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [API Reference of the Grid HtmlHelper](/api/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget](http://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)

Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
