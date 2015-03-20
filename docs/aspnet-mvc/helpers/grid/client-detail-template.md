---
title: Client Detail Template
page_title: Configure Kendo UI Grid Client Detail Template
description: Set the detail template of Kendo UI Grid used during ajax binding
---

# Client Detail Template

## Introduction

Kendo UI Grid for ASP.NET MVC provides the ability to show additional info for a data item. This is done by setting the detail template of the grid
This help topic shows how to use detail template which is used in ajax binding scenarios.

## Client details

The following tutorial shows how to configure Kendo UI Grid for ASP.NET MVC to display additional details of the **Product** entity from the **Northwind** database.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
Name the application "KendoGridClientDetailTemplate". If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions followe the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Add a new "Entity Framework Data Model". Right click the `~/Models` folder in the solution explorer and pick "Add ->  New Item". Choose "Data -> ADO.NET Entity Data Model" in the "Add New Item" dialog.
Name the model "Northwind.edmx" and click "Next". This will start the "Entity Data Model Wizard".
![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1.  Pick the "Generate from database" option and click "Next". Configure a connection to the Northwind database. Click "Next".
![Choose the connection](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1.  Choose the "Products" table from the "Which database objects do you want to include in your model?". Leave all other options as they are set by default. Click "Finish".
![Choose the Products table](/aspnet-mvc/helpers/grid/images/grid-database-objects.png)
1.  Open HomeController.cs and add a new action method which will return the Products as JSON. The grid will make ajax requests to this action.

        public ActionResult Products_Read()
        {
        }
1.  Add a new parameter of type `Kendo.Mvc.UI.DataSourceRequest` to the action. This parameter will contain the current grid request information - page, sort, group and filter.
Decorate that parameter with the `Kendo.Mvc.UI.DataSourceRequestAttribute`. That attribute will populate the `DataSourceRequest` object from the posted data. You need to import the `Kendo.Mvc.UI` namespace.

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
        }
1.  Use the `ToDataSourceResult` extension method to convert the Products to a `Kendo.Mvc.UI.DataSourceResult` object. That extension method will page, filter, sort or group your data using the information provided by the
`DataSourceRequest` object. To use the `ToDataSourceResult` extension method import the `Kendo.Mvc.Extensions` namespace.

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Product> products = northwind.Products;
                DataSourceResult result = products.ToDataSourceResult(request);
            }
        }
1.  Return the `DataSourceResult` as JSON. Now let's configure Kendo UI Grid for ajax binding.

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Product> products = northwind.Products;
                DataSourceResult result = products.ToDataSourceResult(request);
                return Json(result);
            }
        }
1.  In the view configure the grid to use the action method created in the previous steps.

    ```Razor
    @(Html.Kendo().Grid<KendoGridClientDetailTemplate.Models.Product>()
          .Name("grid")
          .DataSource(dataSource => dataSource
              .Ajax()
              .Read(read => read.Action("Products_Read", "Home"))
           )
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
          })
          .Pageable()
    )
    ```
    ```ASPX
    <%: Html.Kendo().Grid<KendoGridClientDetailTemplate.Models.Product>()
          .Name("grid")
          .DataSource(dataSource => dataSource
              .Ajax()
              .Read(read => read.Action("Products_Read", "Home"))
           )
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
          })
          .Pageable()
    %>
    ```
1.  Define the client template using [Kendo UI Template](/framework/templates/overview) syntax. The context of the template is the data item (Product entity) to which the current grid row is bound.
> Any "#" symbols that are not part of a template expression (#: #, # # or #= #) must be escaped ("\\#").

        <script id="client-template" type="text/x-kendo-template">
          <div>ProductID: #: ProductID #</div>
          <div>ProductName: #: ProductName #</div>
          <div>UnitsInStock: #: UnitsInStock #</div>
          <div>UnitPrice: #: UnitPrice #</div>
          <div>UnitsOnOrder: #: UnitsOnOrder #</div>
          <div>Discontinued: #: Discontinued #</div>
        </script>
1.  Specify the id of the template using the `ClientDetailTemplateId` method.

    ```Razor
    @(Html.Kendo().Grid<KendoGridClientDetailTemplate.Models.Product>()
          .Name("grid")
          .DataSource(dataSource => dataSource
              .Ajax()
              .Read(read => read.Action("Products_Read", "Home"))
           )
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
          })
          .Pageable()
          .ClientDetailTemplateId("client-template")
    )
    ```
    ```ASPX
    <%: Html.Kendo().Grid<KendoGridClientDetailTemplate.Models.Product>()
          .Name("grid")
          .DataSource(dataSource => dataSource
              .Ajax()
              .Read(read => read.Action("Products_Read", "Home"))
           )
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID);
              columns.Bound(product => product.ProductName);
          })
          .Pageable()
          .ClientDetailTemplateId("client-template")
    %>
    ```
1. Build and run
![Client detail template](/aspnet-mvc/helpers/grid/images/grid-detail-template.png)

[Download Visual Studio Project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/client-detail-template)

## Client hierarchy

The following tutorial shows how to configure Kendo UI Grid for ASP.NET MVC to display all **Product** entities available per **Category** entity from the **Northwind** database.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
Name the application "KendoGridClientHierarchy". If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions followe the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Add a new "Entity Framework Data Model". Right click the `~/Models` folder in the solution explorer and pick "Add ->  New Item". Choose "Data -> ADO.NET Entity Data Model" in the "Add New Item" dialog.
Name the model "Northwind.edmx" and click "Next". This will start the "Entity Data Model Wizard".
![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1.  Pick the "Generate from database" option and click "Next". Configure a connection to the Northwind database. Click "Next".
![Choose the connection](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1.  Choose the "Products" and "Categories" tables from the "Which database objects do you want to include in your model?". Leave all other options as they are set by default. Click "Finish".
1.  Open HomeController.cs and add a new action method which will return the Category entities as JSON. The grid will make ajax requests to this action.

        public ActionResult Categories_Read()
        {
        }
1.  Add a new parameter of type `Kendo.Mvc.UI.DataSourceRequest` to the action. This parameter will contain the current grid request information - page, sort, group and filter.
Decorate that parameter with the `Kendo.Mvc.UI.DataSourceRequestAttribute`. That attribute will populate the `DataSourceRequest` object from the posted data. You need to import the `Kendo.Mvc.UI` namespace.

        public ActionResult Categories_Read([DataSourceRequest]DataSourceRequest request)
        {
        }
1.  Use the `ToDataSourceResult` extension method to convert the Categories to a `Kendo.Mvc.UI.DataSourceResult` object. That extension method will page, filter, sort or group your data using the information provided by the
`DataSourceRequest` object. To use the `ToDataSourceResult` extension method import the `Kendo.Mvc.Extensions` namespace.

        public ActionResult Categories_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Category> categories = northwind.Categories;
                // Flatten the Category to avoid circular references during JSON serialization
                DataSourceResult result = categories.ToDataSourceResult(request, category => new {
                    category.CategoryID,
                    category.CategoryName
                });
            }
        }
1.  Return the `DataSourceResult` as JSON. Now let's configure Kendo UI Grid for ajax binding.

        public ActionResult Categories_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Category> categories = northwind.Categories;
                // Flatten the Category to avoid circular references during JSON serialization
                DataSourceResult result = categories.ToDataSourceResult(request, category => new {
                    category.CategoryID,
                    category.CategoryName
                });
                return Json(result);
            }
        }
1.  Open HomeController.cs and add a new action method which will return the Product entities for a given category as JSON. The child grid will make ajax requests to this action.

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request, int categoryId)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Product> products = northwind.Products.Where(product => product.CategoryID == categoryId);
                // Flatten the Product to avoid circular references during JSON serialization
                DataSourceResult result = products.ToDataSourceResult(request, product => new {
                    product.ProductID,
                    product.ProductName
                });
                return Json(result);
            }
        }
1. In the view configure the grid for ajax binding to `Categories_Read`

    ```Razor
    @(Html.Kendo().Grid<KendoGridClientHierarchy.Models.Category>()
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(category => category.CategoryID);
              columns.Bound(category => category.CategoryName);
          })
          .DataSource(dataSource =>
            dataSource.Ajax().Read(read => read.Action("Categories_Read", "Home"))
          )
    )
    ```
    ```ASPX
    <%: Html.Kendo().Grid<KendoGridClientHierarchy.Models.Category>()
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(category => category.CategoryID);
              columns.Bound(category => category.CategoryName);
          })
          .DataSource(dataSource =>
            dataSource.Ajax().Read(read => read.Action("Categories_Read", "Home"))
          )
    %>
    ```
1. Define the client template using [Kendo UI Template](/framework/templates/overview) syntax. The context of the template is the Category entity to which the current grid row is bound. The template itself
contains another grid which is bound to the `Products_Read` action.
> **Always** call the `ToClientTemplate` method when using Telerik UI for ASP.NET MVC widgets in a client template.
>
>**Important:** The "#" characters used for a template expression should be escaped when using a column `ClientTemplate` in a detail template so that the expression is evaluated in the correct context.

        <script id="client-template" type="text/x-kendo-template">
        @(Html.Kendo().Grid<KendoGridClientHierarchy.Models.Product>()
              .Name("grid_#=CategoryID#") // make sure the Name is unuque
              .Columns(columns =>
              {
                  columns.Bound(product => product.ProductID);
                  columns.Bound(product => product.ProductName).ClientTemplate("<strong>\\#:ProductName\\#</strong>"); // escape the "#" characters
              })
              .DataSource(dataSource =>
                  // Make request to Products_Read and provide the current CategoryID as a route parameter
                  dataSource.Ajax().Read(read => read.Action("Products_Read", "Home", new { categoryId = "#=CategoryID#" }))
              )
              .Pageable()
              .ToClientTemplate()
        )
        </script>
1. Specify the id of the template using the `ClientDetailTemplateId` method.

    ```Razor
    @(Html.Kendo().Grid<KendoGridClientHierarchy.Models.Category>()
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(category => category.CategoryID);
              columns.Bound(category => category.CategoryName);
          })
          .DataSource(dataSource =>
              dataSource.Ajax().Read(read => read.Action("Categories_Read", "Home"))
          )
          .ClientDetailTemplateId("client-template")
    )
    ```
    ```ASPX
    <%: Html.Kendo().Grid<KendoGridClientHierarchy.Models.Category>()
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(category => category.CategoryID);
              columns.Bound(category => category.CategoryName);
          })
          .DataSource(dataSource =>
              dataSource.Ajax().Read(read => read.Action("Categories_Read", "Home"))
          )
          .ClientDetailTemplateId("client-template")
    %>
    ```
1. Build and run.
![Client hierarchy](/aspnet-mvc/helpers/grid/images/grid-hierarchy.png)

[Download Visual Studio Project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/client-hierarchy)
