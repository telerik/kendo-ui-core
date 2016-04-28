---
title: Server Binding
page_title: Server Binding | Kendo UI Grid HtmlHelper
description: "Set the data source and render the view to bind Kendo UI Grid for ASP.NET MVC with data by using server binding."
previous_url: /aspnet-mvc/helpers/grid/server-binding
slug: serverbinding_grid_aspnetmvc
position: 2
---

# Server Binding

By default, the Kendo UI Grid for ASP.NET MVC performs server side requests&mdash;`HTTP`, `GET`&mdash;when doing paging, sorting, and filtering.

## The Basics

To bind the Grid to data, set its data source and render the view.

There are a few ways to do this:
* Bind to the view model
* Bind to items from `ViewData` or `ViewBag`
* Use the `BindTo` method
* Pass additional data to an action method

## Configuration

### Bind to the View Model

The examples below demonstrate how to bind to the view model.

###### Example

```tab-Controller

    public ActionResult Index()
    {
        var northwind = new NorthwindEntities();
        var products = northwind.Products;
        return View(products);
    }
```
```tab-ASPX

    <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
       Inherits="System.Web.Mvc.ViewPage<IEnumerable<KendoGridServerBinding.Models.Product>>" %>

    <%: Html.Kendo().Grid(Model) // Bind the grid to the Model property of the view
            .Name("Grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.ProductID);   //Create a column bound to the "ProductID" property
                columns.Bound(p => p.ProductName); //Create a column bound to the "ProductName" property
                columns.Bound(p => p.UnitPrice);   //Create a column bound to the "UnitPrice" property
                columns.Bound(p => p.UnitsInStock);//Create a column bound to the "UnitsInStock" property
            })
            .Pageable() //Enable paging
    %>
```
```tab-Razor

    @model IEnumerable<KendoGridServerBinding.Models.Product>

    @(Html.Kendo().Grid(Model) //Bind the Grid to the Model property of the view.
          .Name("Grid")
          .Columns(columns =>
          {
              columns.Bound(p => p.ProductID);   //Create a column bound to the "ProductID" property
              columns.Bound(p => p.ProductName); //Create a column bound to the "ProductName" property
              columns.Bound(p => p.UnitPrice);   //Create a column bound to the "UnitPrice" property
              columns.Bound(p => p.UnitsInStock);//Create a column bound to the "UnitsInStock" property
          })
         .Pageable() //Enable paging.
    )
```

To download the Visual Studio Project, refer to [this GitHub repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/server-binding).

### Use ViewData or ViewBag Items Binding

The example below demonstrates how to bind to an item from the `ViewData` or `ViewBag`.

###### Example

```tab-Action

    public ActionResult Index()
    {
        var products = new NorthwindDataContext().Products;

        ViewData["products"] = products;

        return View();
    }
```
```tab-ASPX

    <%: Html.Kendo().Grid((IEnumerable<MvcApplication1.Models.Product>)ViewData["products"])
            .Name("Grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.ProductID);
                columns.Bound(p => p.ProductName);
                columns.Bound(p => p.UnitPrice);
                columns.Bound(p => p.UnitsInStock);
            })
    %>
```
```tab-Razor

    @(Html.Kendo().Grid((IEnumerable<MvcApplication1.Models.Product>)ViewData["products"])
          .Name("Grid")
          .Columns(columns =>
          {
              columns.Bound(p => p.ProductID);
              columns.Bound(p => p.ProductName);
              columns.Bound(p => p.UnitPrice);
              columns.Bound(p => p.UnitsInStock);
          })
    )
```

### Apply the BindTo Method

The example below demonstrates how to use the `BindTo` method.

```tab-Action

    public ActionResult Index()
    {
        var products = new NorthwindDataContext().Products;

        ViewBag.Products = products;

        return View();
    }
```
```tab-ASPX

    <%: Html.Kendo().Grid<MvcApplication1.Models.Product>() // Specify the type of the grid
            .Name("Grid")
            .BindTo((IEnumerable<MvcApplication1.Models.Product>)ViewBag.Products)
            .Columns(columns =>
            {
                columns.Bound(p => p.ProductID);
                columns.Bound(p => p.ProductName);
                columns.Bound(p => p.UnitPrice);
                columns.Bound(p => p.UnitsInStock);
            })
    %>
```
```tab-Razor

    @(Html.Kendo().Grid<MvcApplication1.Models.Product>() // Specify the type of the grid
        .Name("Grid")
        .BindTo((IEnumerable<MvcApplication1.Models.Product>)ViewBag.Products)
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductID);
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice);
            columns.Bound(p => p.UnitsInStock);
        })
    )
```

The Grid makes `HTTP GET` requests to the action method which initially renders the view. The Grid page, sort, filter, and group information is passed as query string parameters.

For more information on how a typical URL would look like, refer to [this location](http://localhost:4939/?Grid-sort=ProductName-asc&amp;Grid-page=2\). The `Name` of the Grid will be used as a prefix of the query string parameters. In this way, more than one server-bound Grid can coexist in the same view. The prefix can be disabled through the `PrefixUrlParameters` method.

###### Example

    <%: Html.Kendo().Grid(Model)
            .Name("Grid")
            .PrefixUrlParameters(false)
    %>


### Pass Additional Data to Action Methods

Sometimes the action method, which renders the view containing the Grid, may need additional data.

The example below demonstrates how to pass them.

###### Example

```tab-Action

    public ActionResult Index(string firstName, string lastName)
    {
        var products = new NorthwindDataContext().Products;

        return View(products);
    }
```
```tab-ASPX

    <%: Html.Kendo().Grid(Model)
            .Name("Grid")
            .DataSource(dataSource => dataSource
                .Server() //specify server type
                .Read(read => read.Action("Index", "Home", new { firstName = "John", lastName = "Doe } ))
            )
    %>
```
```tab-Razor

    @(Html.Kendo().Grid(Model)
          .Name("Grid")
          .DataSource(dataSource => dataSource
              .Server() //specify server type
              .Read(read => read.Action("Index", "Home", new { firstName = "John", lastName = "Doe } ))
          )
    )
```

## Supported Client-Side Events

The following client-side events are supported in the server binding mode:

- `Change`
- `ColumnHide`
- `ColumnLock`
- `ColumnMenuInit`
- `ColumnReorder`
- `ColumnResize`
- `ColumnShow`
- `ColumnUnlock`
- `DetailCollapse`
- `DetailExpand`
- `ExcelExport`
- `FilterMenuInit`
- `PdfExport`

> **Important**
>
> The other client-side events, which are related to data-binding and CRUD data operations, will not be raised when the Grid is configured for server binding.

## See Also

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Editing of the Grid HtmlHelper]({% slug ajaxediting_grid_aspnetmvc %})
* [Templating of the Grid HtmlHelper]({% slug clientdetailtemplate_grid_aspnetmvc %})
* [Troubleshooting of the Grid HtmlHelper]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [API Reference of the Grid HtmlHelper](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget]({% slug overview_kendoui_grid_widget %})

Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
