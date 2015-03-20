---
title: Web API Editing
page_title: Web API Controller Editing with Kendo UI Grid for ASP.NET MVC
description: Tutorial showing how to implement CRUD operations with a Web API controller.
---

# Web API Editing

This tutorial shows how to implement CRUD (Create, Read, Update, Destroy) with Kendo UI Grid for ASP.NET MVC and a [Web API](http://www.asp.net/web-api) controller.
The example uses the Products table from the Northwind database.

1. Create a new **ASP.NET MVC 4 Web Application** (or **Telerik MVC Web Application** if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
Name the application "KendoGridWebApiCRUD". If you decided not to use the Visual Studio Extensions follow the steps from the [introduction](/aspnet-mvc/asp-net-mvc-4) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1. Add a new "Entity Framework Data Model". Right click the **Models** folder in Visual Studio solution explorer and pick **Add -> New Item**. Choose **Data -> ADO.NET Entity Data Model** from the **Add New Item** dialog.
Name the model "Northwind.edmx" and click **Next**. This will start the **Entity Data Model Wizard**.
![New entity data model](/aspnet-mvc/helpers/grid/images/grid-entity-data-model.png)
1. Select **Generate from database** option and click **Next**. Configure a connection to the Northwind database. Click **Next**.
1. Select the **Products** table. Leave all other options as they are set by default. Click **Finish** to create the Entity Framework model.
![Choose the Products table](/aspnet-mvc/helpers/grid/images/grid-database-objects.png)
1. Right click the **Controllers** folder in Visual Studio solution explorer. Select **Add -> Controller**.
1. Set "ProductsController" as **Controller name**. Select **API controller with read/write actions, using Entity Framework** as **Template**. Select **Product (KendoGridWebApiCRUD.Models)** as **Model class** and
**NorthwindEntities (KendoGridWebApiCRUD.Models)** as **Data context class**. Click **Add** to create the Web API controller.
![Add Controller](/aspnet-mvc/helpers/grid/images/grid-api-controller.png)
1. Open **Controllers/ProductsController.cs**
1. Update the **GetProducts** method to

        public DataSourceResult GetProducts([System.Web.Http.ModelBinding.ModelBinder(typeof(WebApiDataSourceRequestModelBinder))]DataSourceRequest request)
        {
            return db.Products.ToDataSourceResult(request);
        }
1. Update the **PostProduct** method to

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
1.  In the view configure the grid to use the Products Web API controller.

    ```Razor
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
    ```ASPX
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
1. Build and run the application
![Final result](/aspnet-mvc/helpers/grid/images/grid-inline-grid.png)

[Download Visual Studio Project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/webapi-crud)
