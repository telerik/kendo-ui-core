---
title: Server Detail Templates
page_title: Server Detail Templates | Kendo UI Grid HtmlHelper
description: "Set the detail template used during server binding of the Kendo UI Grid for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/grid/server-detail-template
slug: servertemplates_grid_aspnetmvc
position: 3
---

# Server Detail Templates

This article demonstrates how to set the detail template used during the server binding of a Kendo UI Grid for ASP.NET MVC.

## Overview

Kendo UI Grid for ASP.NET MVC enables you to show additional information for a data item. This is done by setting the detail template of the Grid.

## Getting Started

### Server Details

Below are the steps for you to follow when configuring the Kendo UI Grid for ASP.NET MVC to display additional details of the **Product** entity from the **Northwind** database.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#requirements), create a Telerik UI for ASP.NET MVC application. Name the application `KendoGridServerDetailTemplate`. If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Add a new `Entity Framework Data Model`. Right-click the `~/Models` folder in the solution explorer and pick **Add** > **New Item**. Choose **Data** > **ADO.NET Entity Data Model** in the **Add New Item** dialog. Name the model `Northwind.edmx` and click **Next**. This starts the **Entity Data Model Wizard**.

**Figure 1. A new entity data model**

![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 3** Select **Generate from database** and click **Next**. Configure a connection to the **Northwind** database. Click **Next**.

**Figure 2. Choosing a connection**

![Choose the connection](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 4** Choose the **Products** table from **Which database objects do you want to include in your model?**. Leave all other options as they are set by default. Click **Finish**.

**Figure 3. Choosing the Products table**

![Choose the Products table](/aspnet-mvc/helpers/grid/images/grid-database-objects.png)

**Step 5** Open `HomeController.cs` and edit the `Index` action method.

###### Example

        public ActionResult Index()
        {
            var northwind = new NorthwindEntities();
            ViewBag.Products = northwind.Products;
            return View();
        }

**Step 6** In the view, configure the Grid for server binding to `ViewBag.Products`.

###### Example

```tab-ASPX

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
```tab-Razor

      @(Html.Kendo().Grid((IEnumerable<KendoGridServerDetailTemplate.Models.Product>)ViewBag.Products)
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(product => product.ProductID);
                columns.Bound(product => product.ProductName);
            })
      )
```

**Step 7** Set the detail template.

###### Example

```tab-ASPX

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
```tab-Razor

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

**Step 8** Build and run the project.

**Figure 4. Choosing the Products table**

![Server detail template](/aspnet-mvc/helpers/grid/images/grid-detail-template.png)

To download the Visual Studio Project, refer to [this GitHub repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/server-detail-template).

### Server Hierarchy

Below are listed the steps for you to follow when configuring the Kendo UI Grid for ASP.NET MVC to display all **Product** entities available per **Category** entity from the **Northwind** database.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#requirements), create a Telerik UI for ASP.NET MVC application. Name the application `KendoGridServerHierarchy`. If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Add a new `Entity Framework Data Model`. Right-click the `~/Models` folder in the solution explorer and pick **Add** > **New Item**. Choose **Data** > **ADO.NET Entity Data Model** in the **Add New Item** dialog. Name the model `Northwind.edmx` and click **Next**. This starts the **Entity Data Model Wizard**.

**Figure 1. A new entity data model**

![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 3** Select **Generate from database** and click **Next**. Configure a connection to the **Northwind** database. Click **Next**.

**Figure 2. Choosing the connection**

![Choose the connection](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 4** Choose the **Products** and **Categories** tables from the **Which database objects do you want to include in your model?**. Leave all other options as they are set by default. Click **Finish**.

**Step 5** Open `HomeController.cs` and edit the `Index` action method.

###### Example

        public ActionResult Index()
        {
            var northwind = new NorthwindEntities();
            ViewBag.Categories = northwind.Categories;
            return View();
        }

**Step 6** In the view, configure the Grid for server binding to `ViewBag.Categories`.

###### Example

```tab-ASPX

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
```tab-Razor

        @(Html.Kendo().Grid((IEnumerable<KendoGridServerHierarchy.Models.Category>)ViewBag.Categories)
              .Name("grid")
              .Columns(columns =>
              {
                  columns.Bound(category => category.CategoryID);
                  columns.Bound(category => category.CategoryName);
              })
        )
```

**Step 7** Set the detail template. Define another Grid which is bound to the `Products` property of the category entity. Make sure the name of the Grid is unique.

###### Example

```tab-ASPX

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
                      .Name(string.Format("product_grid_{0}", item.CategoryID)) // The Name() should be unique.
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
```tab-Razor

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
                      .Name(string.Format("product_grid_{0}", item.CategoryID)) // The Name() should be unique.
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

**Step 8** Build and run the project.

**Figure 3. The final result**

![Server hierarchy](/aspnet-mvc/helpers/grid/images/grid-hierarchy.png)

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
* [Download Visual Studio Project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/server-hierarchy)
