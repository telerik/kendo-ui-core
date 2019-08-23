---
title: WebAPI Editing
page_title: WebAPI Editing | Telerik UI Grid HtmlHelper for ASP.NET MVC
description: "Implement CRUD data operations with a WebAPI controller for the Kendo UI Grid for ASP.NET MVC."
previous_url: /helpers/grid/webapi-editing
slug: webapi_editing_grid_aspnetmvc
---

# WebAPI Editing

You can implement the CRUD (Create, Read, Update, Destroy) data operations and a [WebAPI](http://www.asp.net/web-api) controller for the Telerik UI Grid for ASP.NET MVC.

For runnable examples, refer to the [demos on editing of the Grid](https://demos.telerik.com/aspnet-mvc/grid/editing).

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#requirements), create a Telerik UI for ASP.NET MVC Web application. Name the application `KendoGridWebApiCRUD`. If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug aspnetmvc4_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Add a new `Entity Framework Data Model`. Right-click the `~/Models` folder in the solution explorer and pick **Add** > **New Item**. Choose **Data** > **ADO.NET Entity Data Model** in the **Add New Item** dialog. Name the model `Northwind.edmx` and click **Next**. This starts the **Entity Data Model Wizard**.

    ![A new entity data model](../images/grid-entity-data-model.png)

1. Select **Generate from database** and click **Next**. Configure a connection to the Northwind database. Click **Next**.
1. Select the **Products** table. Leave all other options as they are set by default. Click **Finish** to create the Entity Framework model.

    ![Choosing the Products table](../images/grid-database-objects.png)

1. Right click the `Controllers` folder in Visual Studio solution explorer. Select **Add** > **Controller**.
1. Set **ProductsController** as **Controller name**. Select **API controller with read/write actions, using Entity Framework** as **Template**. Select **Product (KendoGridWebApiCRUD.Models)** as **Model class** and **NorthwindEntities (KendoGridWebApiCRUD.Models)** as **Data context class**. Click **Add** to create the WebAPI controller.

    ![Adding the Controller](../images/grid-api-controller.png)

1. Open `Controllers/ProductsController.cs`.
1. Update the `GetProducts` method as demonstrated by The following example.

        public DataSourceResult GetProducts([System.Web.Http.ModelBinding.ModelBinder(typeof(WebApiDataSourceRequestModelBinder))]DataSourceRequest request)
        {
            return db.Products.ToDataSourceResult(request);
        }

1. Update the `PostProduct` method as demonstrated in The following example.

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

1. In the view, configure the Grid to use the Products WebAPI controller.

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
                    commands.Edit(); // The "edit" command will edit and update data items.
                    commands.Destroy(); // The "destroy" command removes data items.
                }).Title("Commands").Width(200);
            })
            .ToolBar(toolbar => toolbar.Create()) // The "create" command adds new data items.
            .Editable(editable => editable.Mode(GridEditMode.InLine)) // Use inline edit mode.
            .DataSource(dataSource => dataSource
                .WebApi()
                .Model(model =>
                {
                    model.Id(product => product.ProductID); // Specify the property which is the unique identifier of the model.
                    model.Field(product => product.ProductID).Editable(false); // Make the ProductID property not editable.
                })
                .Create(create => create.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products" }))) // Action invoked when the user saves a new data item.
                .Read(read => read.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products" }))) // Action invoked when the Grid needs data.
                .Update(update => update.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products", id = "{0}" })))  // Action invoked when the user saves an updated data item.
                .Destroy(destroy => destroy.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products", id = "{0}" }))) // Action invoked when the user removes a data item.
            )
            .Pageable()
        %>
    ```
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
                    commands.Edit(); // The "edit" command will edit and update data items.
                    commands.Destroy(); // The "destroy" command removes data items.
                }).Title("Commands").Width(200);
            })
            .ToolBar(toolbar => toolbar.Create()) // The "create" command adds new data items.
            .Editable(editable => editable.Mode(GridEditMode.InLine)) // Use inline edit mode.
            .DataSource(dataSource => dataSource
                .WebApi()
                .Model(model =>
                {
                    model.Id(product => product.ProductID); // Specify the property which is the unique identifier of the model.
                    model.Field(product => product.ProductID).Editable(false); // Make the ProductID property not editable.
                })
                .Create(create => create.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products" }))) // Action invoked when the user saves a new data item.
                .Read(read => read.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products" }))) // Action invoked when the Grid needs data.
                .Update(update => update.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products", id = "{0}" })))  // Action invoked when the user saves an updated data item
                .Destroy(destroy => destroy.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Products", id = "{0}" }))) // Action invoked when the user removes a data item.
            )
            .Pageable()
        )
    ```

1. Build and run the application.

    ![The final result](../images/grid-inline-grid.png)

## See Also

* [Editing Approaches by the Grid HtmlHelper for ASP.NET MVC (Demos)](https://demos.telerik.com/aspnet-mvc/grid/editing)
* [Server-Side API](/api/grid)
