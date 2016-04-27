---
title: Web API Editing
page_title: Web API Editing | Kendo UI Grid HtmlHelper
description: "Implement CRUD data operations with a Web API controller for the Kendo UI Grid for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/grid/webapi-editing
slug: webapi_editing_grid_aspnetmvc
position: 3
---

# Web API Editing

This article demonstrates how to implement the CRUD (Create, Read, Update, Destroy) data operations with the Kendo UI Grid for ASP.NET MVC and a [Web API](http://www.asp.net/web-api) controller.

## Getting Started

### Configuration

Below are listed the steps for you to follow when implementing the CRUD data operations with a Web API controller for the Kendo UI Grid for ASP.NET MVC. The configuration example uses the **Products** table from the Northwind database.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#requirements), create a Telerik UI for ASP.NET MVC Web application. Name the application `KendoGridWebApiCRUD`. If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug aspnetmvc4_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Add a new `Entity Framework Data Model`. Right-click the `~/Models` folder in the solution explorer and pick **Add** > **New Item**. Choose **Data** > **ADO.NET Entity Data Model** in the **Add New Item** dialog. Name the model `Northwind.edmx` and click **Next**. This starts the **Entity Data Model Wizard**.

**Figure 1. A new entity data model**

![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)

**Step 3** Select **Generate from database** and click **Next**. Configure a connection to the Northwind database. Click **Next**.

**Step 4** Select the **Products** table. Leave all other options as they are set by default. Click **Finish** to create the Entity Framework model.

**Figure 2. Choosing the connection**

![Choose the Products table](/aspnet-mvc/helpers/grid/images/grid-database-objects.png)

**Step 4** Right click the `Controllers` folder in Visual Studio solution explorer. Select **Add** > **Controller**.

**Step 5** Set **ProductsController** as **Controller name**. Select **API controller with read/write actions, using Entity Framework** as **Template**. Select **Product (KendoGridWebApiCRUD.Models)** as **Model class** and **NorthwindEntities (KendoGridWebApiCRUD.Models)** as **Data context class**. Click **Add** to create the Web API controller.

**Figure 2. Adding the Controller**

![Add Controller](/aspnet-mvc/helpers/grid/images/grid-api-controller.png)

**Step 6** Open `Controllers/ProductsController.cs`.

**Step 7** Update the `GetProducts` method as demonstrated by the example below.

###### Example

        public DataSourceResult GetProducts([System.Web.Http.ModelBinding.ModelBinder(typeof(WebApiDataSourceRequestModelBinder))]DataSourceRequest request)
        {
            return db.Products.ToDataSourceResult(request);
        }

**Step 8** Update the `PostProduct` method as demonstrated in the example below.

###### Example

        public HttpResponseMessage PostProduct(Product product)
        {
            if (ModelState.IsValid)
            {
                db.Products.Add(product);
                db.SaveChanges();

                DataSourceResult result = new DataSourceResult
                {
                    Data = new[] { product },
                    Total = 1
                };
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, result);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = product.ProductID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

**Step 9** In the view, configure the Grid to use the Products Web API controller.

###### Example

```tab-ASPX

    <%: Html.Kendo().Grid<KendoGridWebApiCRUD.Models.Product>()
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID).Width(100);
              columns.Bound(product => product.ProductName);
              columns.Bound(product => product.UnitsInStock).Width(250);
              columns.Command(commands =>
              {
                  commands.Edit(); // The "edit" command will edit and update data items
                  commands.Destroy(); // The "destroy" command removes data items
              }).Title("Commands").Width(200);
          })
          .ToolBar(toolbar => toolbar.Create()) // The "create" command adds new data items
          .Editable(editable => editable.Mode(GridEditMode.InLine)) // Use inline editing mode
          .DataSource(dataSource => dataSource
                .WebApi()
                .Model(model =>
                {
                    model.Id(product => product.ProductID); // Specify the property which is the unique identifier of the model
                    model.Field(product => product.ProductID).Editable(false); // Make the ProductID property not editable
                })
                .Create(create => create.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products" }))) // Action invoked when the user saves a new data item
                .Read(read => read.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products" }))) // Action invoked when the grid needs data
                .Update(update => update.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products", id = "{0}" })))  // Action invoked when the user saves an updated data item
                .Destroy(destroy => destroy.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products", id = "{0}" }))) // Action invoked when the user removes a data item
          )
          .Pageable()
    %>
```
```tab-Razor

    @(Html.Kendo().Grid<KendoGridWebApiCRUD.Models.Product>()
          .Name("grid")
          .Columns(columns =>
          {
              columns.Bound(product => product.ProductID).Width(100);
              columns.Bound(product => product.ProductName);
              columns.Bound(product => product.UnitsInStock).Width(250);
              columns.Command(commands =>
              {
                  commands.Edit(); // The "edit" command will edit and update data items
                  commands.Destroy(); // The "destroy" command removes data items
              }).Title("Commands").Width(200);
          })
          .ToolBar(toolbar => toolbar.Create()) // The "create" command adds new data items
          .Editable(editable => editable.Mode(GridEditMode.InLine)) // Use inline editing mode
          .DataSource(dataSource => dataSource
                .WebApi()
                .Model(model =>
                {
                    model.Id(product => product.ProductID); // Specify the property which is the unique identifier of the model
                    model.Field(product => product.ProductID).Editable(false); // Make the ProductID property not editable
                })
                .Create(create => create.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products" }))) // Action invoked when the user saves a new data item
                .Read(read => read.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products" }))) // Action invoked when the grid needs data
                .Update(update => update.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products", id = "{0}" })))  // Action invoked when the user saves an updated data item
                .Destroy(destroy => destroy.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products", id = "{0}" }))) // Action invoked when the user removes a data item
          )
          .Pageable()
    )
```

**Step 10** Build and run the application.

**Figure 3. The final result**

![Final result](/aspnet-mvc/helpers/grid/images/grid-inline-grid.png)

## See Also

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Binding of the Grid HtmlHelper]({% slug ajaxbinding_grid_aspnetmvc %})
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
* [Download Visual Studio Project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/webapi-crud)
