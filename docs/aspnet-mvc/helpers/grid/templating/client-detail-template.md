---
title: Client Detail Templates
page_title: Client Detail Templates | Kendo UI Grid HtmlHelper
description: "Set the detail template used during Ajax binding of the Kendo UI Grid for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/grid/client-detail-template
slug: clientdetailtemplate_grid_aspnetmvc
position: 1
---

# Client Detail Templates

This article demonstrates how to set the detail template used during Ajax binding of the Kendo UI Grid for ASP.NET MVC.

## Overview

The Kendo UI Grid for ASP.NET MVC enables you to show additional info for a data item. This is done by setting the detail template of the Grid.

## Getting Started

### Client Details

Below are listed the steps for you to follow when configuring the Kendo UI Grid for ASP.NET MVC to display additional details of the **Product** entity from the **Northwind** database.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#requirements), create a Telerik UI for ASP.NET MVC application. Name the application `KendoGridClientDetailTemplate`. If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Add a new `Entity Framework Data Model`. Right-click the `~/Models` folder in the solution explorer and pick **Add** > **New Item**. Choose **Data** > **ADO.NET Entity Data Model** in the **Add New Item** dialog. Name the model `Northwind.edmx` and click **Next**. This starts the **Entity Data Model Wizard**.

**Figure 1. A new entity data model**

![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 3** Select **Generate from database** and click **Next**. Configure a connection to the **Northwind** database. Click **Next**.

**Figure 2. Choosing a connection**

![Choose the connection](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 4** Choose the **Products** table from the **Which database objects do you want to include in your model?**. Leave all other options as they are set by default. Click **Finish**.

**Figure 3. Choosing the Products table**

![Choose the Products table](/aspnet-mvc/helpers/grid/images/grid-database-objects.png)

**Step 5** Open `HomeController.cs` and add a new action method which will return the Products as JSON. The Grid makes Ajax requests to this action.

###### Example

        public ActionResult Products_Read()
        {
        }

**Step 6** Add a new parameter of type `Kendo.Mvc.UI.DataSourceRequest` to the action. This parameter will contain the current Grid request information&mdash;page, sort, group, and filter. Decorate that parameter with the `Kendo.Mvc.UI.DataSourceRequestAttribute`. This attribute will populate the `DataSourceRequest` object from the posted data. Import the `Kendo.Mvc.UI` namespace.

###### Example

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
        }

**Step 7** Use the `ToDataSourceResult` extension method to convert the Products to a `Kendo.Mvc.UI.DataSourceResult` object. That extension method will page, filter, sort, or group your data using the information provided by the `DataSourceRequest` object. To use the `ToDataSourceResult` extension method, import the `Kendo.Mvc.Extensions` namespace.

###### Example

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Product> products = northwind.Products;
                DataSourceResult result = products.ToDataSourceResult(request);
            }
        }

**Step 8** Return the `DataSourceResult` as JSON. Now configure Kendo UI Grid for Ajax binding.

###### Example

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Product> products = northwind.Products;
                DataSourceResult result = products.ToDataSourceResult(request);
                return Json(result);
            }
        }

**Step 9** In the view, configure the Grid to use the action method created in the previous steps.

###### Example

```tab-ASPX

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
```tab-Razor

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

**Step 10** Define the client template using the [Kendo UI template]({% slug overview_kendoui_templatescomponent %}) syntax. The context of the template is the data item&mdash;Product entity&mdash;to which the current Grid row is bound.

> **Important**  
>
> Each `#` symbol that is not part of a template expression&mdash;`#: #`, `# #` or `#= #`&mdash;must be escaped&mdash;`\\#`.

###### Example

        <script id="client-template" type="text/x-kendo-template">
          <div>ProductID: #: ProductID #</div>
          <div>ProductName: #: ProductName #</div>
          <div>UnitsInStock: #: UnitsInStock #</div>
          <div>UnitPrice: #: UnitPrice #</div>
          <div>UnitsOnOrder: #: UnitsOnOrder #</div>
          <div>Discontinued: #: Discontinued #</div>
        </script>

**Step 11** Specify the id of the template using the `ClientDetailTemplateId` method.

###### Example

```tab-ASPX

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
```tab-Razor

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

**Step 12** Build and run the project.

**Figure 4. The final result**

![Client detail template](/aspnet-mvc/helpers/grid/images/grid-detail-template.png)

To download the Visual Studio Project, refer to [this GitHub repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/client-detail-template).

### Client Hierarchy

Below are listed the steps for you to follow when configuring the Kendo UI Grid for ASP.NET MVC to display all **Product** entities available per **Category** entity from the **Northwind** database.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#requirements), create a Telerik UI for ASP.NET MVC application. Name the application `KendoGridClientHierarchy`. If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Add a new `Entity Framework Data Model`. Right-click the `~/Models` folder in the solution explorer and pick **Add** > **New Item**. Choose **Data** > **ADO.NET Entity Data Model** in the **Add New Item** dialog. Name the model `Northwind.edmx` and click **Next**. This starts the **Entity Data Model Wizard**.

**Figure 1. A new entity data model**

![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 3**  Select **Generate from database** and click **Next**. Configure a connection to the **Northwind** database. Click **Next**.

**Figure 2. Choosing the connection**

![Choose the connection](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 4** Choose the **Products** and **Categories** tables from **Which database objects do you want to include in your model?**. Leave all other options as they are set by default. Click **Finish**.

**Step 5** Open `HomeController.cs` and add a new action method which will return the **Category** entities as JSON. The Grid makes Ajax requests to this action.

###### Example

        public ActionResult Categories_Read()
        {
        }

**Step 6** Add a new parameter of type `Kendo.Mvc.UI.DataSourceRequest` to the action. This parameter will contain the current grid request information - page, sort, group and filter. Decorate that parameter with the `Kendo.Mvc.UI.DataSourceRequestAttribute`. That attribute will populate the `DataSourceRequest` object from the posted data. Import the `Kendo.Mvc.UI` namespace.

###### Example

        public ActionResult Categories_Read([DataSourceRequest]DataSourceRequest request)
        {
        }

**Step 7** Use the `ToDataSourceResult` extension method to convert the Categories to a `Kendo.Mvc.UI.DataSourceResult` object. That extension method will page, filter, sort, or group your data using the information provided by the `DataSourceRequest` object. To use the `ToDataSourceResult` extension method import the `Kendo.Mvc.Extensions` namespace.

###### Example

        public ActionResult Categories_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Category> categories = northwind.Categories;
                // Flatten the Category to avoid circular references during JSON serialization.
                DataSourceResult result = categories.ToDataSourceResult(request, category => new {
                    category.CategoryID,
                    category.CategoryName
                });
            }
        }

**Step 8**  Return the `DataSourceResult` as JSON. Now let's configure Kendo UI Grid for ajax binding.

###### Example

        public ActionResult Categories_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new NorthwindEntities())
            {
                IQueryable<Category> categories = northwind.Categories;
                // Flatten the Category to avoid circular references during JSON serialization.
                DataSourceResult result = categories.ToDataSourceResult(request, category => new {
                    category.CategoryID,
                    category.CategoryName
                });
                return Json(result);
            }
        }

**Step 9** Open `HomeController.cs` and add a new action method which will return the **Product** entities for a given category as JSON. The child Grid makes Ajax requests to this action.

###### Example

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

**Step 10** In the view, configure the Grid for Ajax binding to `Categories_Read`.

###### Example

```tab-ASPX

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
```tab-Razor

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

**Step 11** Define the client template using [Kendo UI Template]({% slug overview_kendoui_templatescomponent %}) syntax. The context of the template is the **Category** entity to which the current Grid row is bound. The template itself contains another Grid which is bound to the `Products_Read` action.

> **Important**  
> * Always call the `ToClientTemplate` method when using Telerik UI for ASP.NET MVC widgets in a client template.
> * Escape the `#` characters used for a template expression when using a column `ClientTemplate` in a detail template, so that the expression is evaluated in the correct context.

###### Example

        <script id="client-template" type="text/x-kendo-template">
        @(Html.Kendo().Grid<KendoGridClientHierarchy.Models.Product>()
              .Name("grid_#=CategoryID#") // make sure the Name is unuque
              .Columns(columns =>
              {
                  columns.Bound(product => product.ProductID);
                  columns.Bound(product => product.ProductName).ClientTemplate("<strong>\\#:ProductName\\#</strong>"); // escape the "#" characters
              })
              .DataSource(dataSource =>
                  // Make a request to Products_Read and provide the current CategoryID as a route parameter.
                  dataSource.Ajax().Read(read => read.Action("Products_Read", "Home", new { categoryId = "#=CategoryID#" }))
              )
              .Pageable()
              .ToClientTemplate()
        )
        </script>

**Step 12** Specify the id of the template using the `ClientDetailTemplateId` method.

###### Example

```tab-ASPX

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
```tab-Razor

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

**Step 13** Build and run the project.

**Figure 3. The final result**

![Client hierarchy](/aspnet-mvc/helpers/grid/images/grid-hierarchy.png)

To download the Visual Studio Project, refer to [this GitHub repository]((https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/client-hierarchy).

### Nested Client Template Scenarios

Nesting client templates is not an out-of-the-box feature the Kendo UI MVC wrappers support. For more information on this issue, check the Grid troubleshooting section in [invalid template errors when nesting client templates]({% slug troubleshoot_gridhelper_aspnetmvc %}#invalid-template-error-when-nesting-client-templates).

## See Also

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Binding of the Grid HtmlHelper]({% slug ajaxbinding_grid_aspnetmvc %})
* [Editing of the Grid HtmlHelper]({% slug ajaxediting_grid_aspnetmvc %})
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
