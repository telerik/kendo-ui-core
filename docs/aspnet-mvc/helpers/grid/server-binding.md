---
title: Server Binding
page_title: Server binding in Telerik UI for ASP.NET MVC | Kendo UI Documentation
description: Set the data source and render the view to bind Kendo UI Grid for ASP.NET MVC with data by using server binding.
---

# Server Binding

By default the Kendo Grid for ASP.NET MVC will perform server side requests (HTTP GET) when doing paging, sorting and filtering.

To bind the grid with data you just need to set its data source and render the view. There are a few ways to do this:

##   Bind to the `Model` of the view:

### Controller

    public ActionResult Index()
    {
        var northwind = new NorthwindEntities();
        var products = northwind.Products;
        return View(products);
    }

### View

```Razor
@model IEnumerable<KendoGridServerBinding.Models.Product>

@(Html.Kendo().Grid(Model) // Bind the grid to the Model property of the view
      .Name("Grid")
      .Columns(columns =>
      {
          columns.Bound(p => p.ProductID);   //Create a column bound to the "ProductID" property
          columns.Bound(p => p.ProductName); //Create a column bound to the "ProductName" property
          columns.Bound(p => p.UnitPrice);   //Create a column bound to the "UnitPrice" property
          columns.Bound(p => p.UnitsInStock);//Create a column bound to the "UnitsInStock" property
      })
     .Pageable() //Enable paging
)
```
```ASPX
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

[Download Visual Studio Project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/server-binding)

##   Bind to an item from the `ViewData` or `ViewBag`:

### Action

    public ActionResult Index()
    {
        var products = new NorthwindDataContext().Products;

        ViewData["products"] = products;

        return View();
    }

### WebForms View

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

### Razor View

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
##  Use the `BindTo` method:

### Action

    public ActionResult Index()
    {
        var products = new NorthwindDataContext().Products;

        ViewBag.Products = products;

        return View();
    }

### WebForms View

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

### Razor View

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


The grid will make HTTP GET requests to the action method which rendered the view initially. The grid page, sort, filter and group info will be passed as query string parameters
Here is how a typical URL would look like: http://localhost:4939/?Grid-sort=ProductName-asc&amp;Grid-page=2\. The `Name` of the grid will be used as a prefix of the query string
parameters. Thus more than one server-boud grid can coexist in the same view. The prefix can be disabled via the `PrefixUrlParameters` method:


    <%: Html.Kendo().Grid(Model)
            .Name("Grid")
            .PrefixUrlParameters(false)
    %>


## Pass Additional Data to Action Method

Sometimes the action method which renders the view containing the grid may need additional data. Here is how to pass them:

### Action

    public ActionResult Index(string firstName, string lastName)
    {
        var products = new NorthwindDataContext().Products;

        return View(products);
    }


### WebForms View

    <%: Html.Kendo().Grid(Model)
            .Name("Grid")
            .DataSource(dataSource => dataSource
                .Server() //specify server type
                .Read(read => read.Action("Index", "Home", new { firstName = "John", lastName = "Doe } ))
            )
    %>


### Razor View

    @(Html.Kendo().Grid(Model)
          .Name("Grid")
          .DataSource(dataSource => dataSource
              .Server() //specify server type
              .Read(read => read.Action("Index", "Home", new { firstName = "John", lastName = "Doe } ))
          )
    )

## Client-Side Events And Server Binding

The following events are supported in server binding mode:

- Change
- ColumnHide
- ColumnReorder
- ColumnResize
- ColumnShow
- DetailCollapse
- DetailExpand

The other client-side events will **not** be raised when the grid is configured for server binding.
