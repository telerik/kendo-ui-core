---
title: Server Detail Template
page_title: Configure Kendo UI Grid Server Detail Template
description: Set the detail template of Kendo UI Grid used during server binding
---

# Server Detail Template

## Introduction

Kendo UI Grid for ASP.NET MVC provides the ability to show additional info for a data item. This is done by setting the detail template of the grid
This help topic shows how to use detail template which is used in server binding scenarios.

## Server details

The following tutorial shows how to configure Kendo UI Grid for ASP.NET MVC to display additional details of the **Product** entity from the **Northwind** database.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
Name the application "KendoGridServerDetailTemplate". If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions followe the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Add a new "Entity Framework Data Model". Right click the `~/Models` folder in the solution explorer and pick "Add ->  New Item". Choose "Data -> ADO.NET Entity Data Model" in the "Add New Item" dialog.
Name the model "Northwind.edmx" and click "Next". This will start the "Entity Data Model Wizard".
![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1.  Pick the "Generate from database" option and click "Next". Configure a connection to the Northwind database. Click "Next".
![Choose the connection](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1.  Choose the "Products" table from the "Which database objects do you want to include in your model?". Leave all other options as they are set by default. Click "Finish".
![Choose the Products table](/aspnet-mvc/helpers/grid/images/grid-database-objects.png)
1.  Open HomeController.cs and edit the "Index" action method.

        public ActionResult Index()
        {
            var northwind = new NorthwindEntities();
            ViewBag.Products = northwind.Products;
            return View();
        }
1. In the view configure the grid for server binding to `ViewBag.Products`

    ```Razor
    @(Html.Kendo().Grid((IEnumerable<KendoGridServerDetailTemplate.Models.Product>)ViewBag.Products)
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
          })
    )
    ```
    ```ASPX
    <% Html.Kendo().Grid((IEnumerable<KendoGridServerDetailTemplate.Models.Product>)ViewBag.Products)
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
          })
          .Render();
    %>
    ```
1. Set the detail template.

    ```Razor
    @(Html.Kendo().Grid((IEnumerable<KendoGridServerDetailTemplate.Models.Product>)ViewBag.Products)
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
          })
          .Pageable()
          .DetailTemplate(@<text>
              <div>ProductID: @item.ProductID</div>
              <div>ProductName: @item.ProductName</div>
              <div>UnitsInStock: @item.UnitsInStock</div>
              <div>UnitPrice: @item.UnitPrice</div>
              <div>UnitsOnOrder: @item.UnitsOnOrder</div>
              <div>Discontinued: @item.Discontinued</div>
          </text>)
    )
    ```
    ```ASPX
    <%: Html.Kendo().Grid((IEnumerable<KendoGridServerDetailTemplate.Models.Product>)ViewBag.Products)
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
          })
          .Pageable()
          .DetailTemplate(product => {
          %>
              <div>ProductID: <%: product.ProductID %></div>
              <div>ProductName: <%: product.ProductName %></div>
              <div>UnitsInStock: <%: product.UnitsInStock %></div>
              <div>UnitPrice: <%: product.UnitPrice %></div>
              <div>UnitsOnOrder: <%: product.UnitsOnOrder %></div>
              <div>Discontinued: <%: product.Discontinued %></div>
          <%
          })
          .Render();
    %>
    ```
1. Build and run.
![Server detail template](/aspnet-mvc/helpers/grid/images/grid-detail-template.png)

[Download Visual Studio Project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/server-detail-template)

## Server hierarchy

The following tutorial shows how to configure Kendo UI Grid for ASP.NET MVC to display all **Product** entities available per **Category** entity from the **Northwind** database.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
Name the application "KendoGridServerHierarchy". If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions followe the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Add a new "Entity Framework Data Model". Right click the `~/Models` folder in the solution explorer and pick "Add ->  New Item". Choose "Data -> ADO.NET Entity Data Model" in the "Add New Item" dialog.
Name the model "Northwind.edmx" and click "Next". This will start the "Entity Data Model Wizard".
![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1.  Pick the "Generate from database" option and click "Next". Configure a connection to the Northwind database. Click "Next".
![Choose the connection](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1.  Choose the "Products" and "Categories" tables from the "Which database objects do you want to include in your model?". Leave all other options as they are set by default. Click "Finish".
1.  Open HomeController.cs and edit the "Index" action method.

        public ActionResult Index()
        {
            var northwind = new NorthwindEntities();
            ViewBag.Categories = northwind.Categories;
            return View();
        }
1. In the view configure the grid for server binding to `ViewBag.Categories`

    ```Razor
    @(Html.Kendo().Grid((IEnumerable<KendoGridServerHierarchy.Models.Category>)ViewBag.Categories)
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(category => category.CategoryID);
              columns.Bound(category => category.CategoryName);
          })
    )
    ```
    ```ASPX
    <% Html.Kendo().Grid((IEnumerable<KendoGridServerHierarchy.Models.Category>)ViewBag.Categories)
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(category => category.CategoryID);
              columns.Bound(category => category.CategoryName);
          })
          .Render();
    %>
    ```
1. Set the detail template. Define another grid which is bound to the `Products` property of the category entity. Make sure the name of the grid is unique.

    ```Razor
    @(Html.Kendo().Grid((IEnumerable<KendoGridServerHierarchy.Models.Category>)ViewBag.Categories)
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(category => category.CategoryID);
              columns.Bound(category => category.CategoryName);
          })
          .Pageable()
          .DetailTemplate(@<text>
            @(Html.Kendo().Grid(item.Products)
                  .Name(string.Format("product_grid_{0}", item.CategoryID)) // the Name() should be unique
                  .Columns(columns =>
                  {
                      columns.Bound(product => product.ProductID);
                      columns.Bound(product => product.ProductName);
                  })
                  .Pageable()
            )
          </text>)
    )
    ```
    ```ASPX
    <% Html.Kendo().Grid((IEnumerable<KendoGridServerHierarchy.Models.Category>)ViewBag.Categories)
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(category => category.CategoryID);
              columns.Bound(category => category.CategoryName);
          })
          .DetailTemplate(category => {
          %>
            <% Html.Kendo().Grid(item.Products)
                  .Name(string.Format("product_grid_{0}", item.CategoryID)) // the Name() should be unique
                  .Columns(columns =>
                  {
                      columns.Bound(product => product.ProductID);
                      columns.Bound(product => product.ProductName);
                  })
                  .Pageable()
                  .Render();
            %>
          <%
          })
          .Render();
    %>
    ```
1. Build and run.
![Server hierarchy](/aspnet-mvc/helpers/grid/images/grid-hierarchy.png)

[Download Visual Studio Project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/server-hierarchy)
