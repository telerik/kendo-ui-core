---
title: OData-v4 Binding
page_title: OData-v4 Binding
description: "Learn how to implement OData-v4 binding with the Telerik UI Grid component for {{ site.framework }}."
previous_url: /helpers/data-management/grid/binding/odatav4-binding
slug: htmlhelpers_grid_aspnetcore_odatav4-binding
position: 8
---

# OData-v4 Binding

[OData (Open Data Protocol)](https://www.odata.org/) defines best practices when it comes to building and consuming RESTful APIs in a dependable manner. It enables you to mimic a Web API but with built-in support for filtering, selecting, and expanding amongst other capabilities. Binding the {{ site.framework }} Grid through OData-v4, allows you to elevate its REST API by introducing advanced querying options.

For a runnable example, refer to the [demo on OData binding of the Grid component](https://demos.telerik.com/{{ site.platform }}/grid/odatav4).

## Installing the OData Package 

{% if site.core %}
To install the required dependencies for using OData, install the autonomous `Microsoft.AspNetCore.OData` NuGet package in your project.
{% else %}
To install the required dependencies for using OData, install the autonomous `Microsoft.AspNet.OData` and `Microsoft.AspNet.WebApi.WebHost` NuGet packages in your project.
{% endif %}

{% if site.core %}
## Building the Edm Model and Configuring the Service in ASP.NET Core 6

For applications using .NET Core 6 and the minimal hosting model, the Edm model and service need to be configured through the `Program.cs` file in the following way:

```
    builder.Services.AddControllers().AddOData(options =>
    {
        options.AddRouteComponents("odata", GetEdmModel());
        options.Select() // Querying options.
               .Filter()
               .Count()
               .OrderBy()
               .Expand()
               .Select()
               .SetMaxTop(null);
    });

    static IEdmModel GetEdmModel()
    {
        ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
        builder.EntitySet<Product>("Products"); // Model that will be used for the Grid.
        return builder.GetEdmModel();
    }
```


## Building the Edm Model and Configuring the Service in ASP.NET Core 3.1 and ASP.NET Core 5

For applications using .NET Core 3.1 and 5, the Edm model and service need to be configured through the `ConfigureServices` method in the following way:

```
  public void ConfigureServices(IServiceCollection services)
  {
      services.AddControllers().AddOData(
          options => options.Select().Filter().OrderBy().Expand().Count().SetMaxTop(null).AddRouteComponents(
              "odata",
              modelBuilder.GetEdmModel()));
  }

  static IEdmModel GetEdmModel()
  {
      ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
      builder.EntitySet<Product>("Products"); // Model that will be used for the Grid.
      return builder.GetEdmModel();
  }
```
{% else %}
## Building the Edm Model and Configuring OData in an ASP.NET MVC Environment

To ensure that the application is configured for both WebApi and OData binding capabilities:

1. Configure Web API by calling `GlobalConfiguration.Configure` in the `Application_Start` method.
  
  ```
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
  ```
2. Create a file named `WebApiConfig.cs` inside the `App_Start` folder and configure the Edm model and OData services.
  
  ```
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services.

            // Web API routes.
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var builder = new ODataConventionModelBuilder();
            builder.EntitySet<Product>("Products");

            config.Count().Filter().OrderBy().Expand().Select().MaxTop(null);
            config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
        }
    }
  ```


{% endif %}
## Adding an OData Controller

To support writing and reading data using the OData formats, the `ODataController` base class needs to be inherited for a given controller instance.

```
    public class ProductsController : ODataController
    {
        ...
    }
```

From there, the REST API endpoints need to be decorated with the `EnableQuery` attribute. This attribute is responsible for applying the query options that are passed in the query string.

{% if site.core %}
```
    public class ProductsController : ODataController
    {
        [HttpGet]
        [EnableQuery]
        public List<Product> GetProducts()
        {
            var products = GetProducts(); // Call to the database.

            return products;
        }

        [HttpPut]
        [EnableQuery]
        public IActionResult Put([FromODataUri] int key, [FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Custom update logic.
            return Updated(product);
        }
        [HttpPost]
        [EnableQuery]
        public IActionResult Post([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Custom create logic.
            return Created(product);
        }
        [HttpDelete]
        public IActionResult Delete([FromODataUri] int key)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Custom delete logic.
            return NoContent();
        }
    }
```
{% else %}

```
    public class ProductsController : ODataController
    {
        [EnableQuery]
        public List<Product> GetProducts()
        {
            var products = GetProducts(); // Call to the database.
            return products;
        }

        [EnableQuery]
        public IHttpActionResult Put([FromODataUri] int key, [FromBody] Product product)
        {
            // Custom update logic and update the Category field.
            return Updated(product);
        }
        [EnableQuery]
        public IHttpActionResult Post([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Custom create logic and update the Category field.
            return Created(product);
        }
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Custom delete logic.
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
```
{% endif %}

## Configuring the Grid for OData-v4 Binding

To implement the OData binding within the boundaries of the Telerik UI for {{ site.framework }} Grid, specify the `.Type("odata-v4")` configuration method within the DataSource. This ensures that the requests can be sent to the OData endpoint in the expected format and out of the box.

```HtmlHelper
    @(Html.Kendo().Grid<Product>()
         .Name("grid")
         .Columns(columns =>
         {
             columns.Bound(p => p.ProductName);
             columns.Bound(p => p.UnitsInStock);
             columns.Bound(p => p.Discontinued);
             columns.Bound(p => p.UnitsOnOrder);
             columns.Bound(p => p.UnitPrice).Width(150);
         })
         .Pageable()
         .DataSource(dataSource => dataSource
             .Custom()
             .Type("odata-v4")
             .Schema(schema => schema
             .Model(model =>
             {
                 model.Id(t => t.ProductID);
                 model.Field(t => t.ProductID).Editable(false);
                 model.Field(t => t.ProductName);
                 model.Field(t => t.UnitPrice);
                 model.Field(t => t.UnitsInStock);
                 model.Field(t => t.UnitsOnOrder);
                 model.Field(t => t.Discontinued);
             }))
             .Transport(transport =>
             {
                 transport.Read(read => read.Url("/odata/Products"));
             })
             .PageSize(10)
             .ServerPaging(true)
         )
    )
```
{% if site.core %}
```TagHelper
    <script>
        // Initialize DataSource with the dataStore option.
        var dataSourceOptions = {
            type: "odata-v4",
            transport: {
                read: {
                    url: function () {
                        return "/odata/Products";
                    }
                }
            },
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: { editable: false },
                        ProductName: { type: "string" },
                        UnitPrice: { type: "number" },
                        UnitsInOrder: {type: "number"},
                        Discontinued: { type: "boolean" },
                        UnitsInStock: { type: "number" }
                    }
                }
            },
            pageSize: 10
        };
        var dataSource = new kendo.data.DataSource(dataSourceOptions);
    </script>

    <kendo-grid name="Grid" datasource-id="dataSource">
        <columns>
            <column field="ProductName"/>
            <column field="UnitPrice" width="140"/>
            <column field="UnitsInStock" width="140"/>
            <column field="Discontinued" width="100"/>
        </columns>
        <pageable enabled="true"/>
    </kendo-grid>
```
{% endif %}

## Configuring the CRUD Operations

To configure CRUD operations that support OData-v4 Binding, explicitly add a `ClientHandlerDescriptor` that will be responsible for mapping the OData-v4 endpoints.

```HtmlHelper
  @(Html.Kendo().Grid<Product>()
      .Name("grid")
      .Columns(columns =>
      {
          columns.Bound(p => p.ProductName);
          columns.Bound(p => p.UnitsInStock);
          columns.Bound(p => p.Discontinued);
          columns.Bound(p => p.UnitsOnOrder);
          columns.Bound(p => p.UnitPrice).Width(150);
          columns.Command(c => {c.Edit(); c.Destroy();}).Width(150);
      })
      .Toolbar(toolbar => toolbar.Create())
      .Pageable()
      .Editable(editable => editable.Mode(GridEditMode.InLine))
      .DataSource(dataSource => dataSource
          .Custom()
          .Type("odata-v4")
          .Schema(schema => schema
          .Model(model =>
          {
              model.Id(t => t.ProductID);
              model.Field(t => t.ProductID).Editable(false);
              model.Field(t => t.ProductName);
              model.Field(t => t.UnitPrice);
              model.Field(t => t.UnitsInStock);
              model.Field(t => t.UnitsOnOrder);
              model.Field(t => t.Discontinued);
          }))
          .Transport(transport =>
          {
              transport.Read(read => read.Url("/odata/Products"));
              transport.Update(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "update" } });
              transport.Destroy(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "destroy" } });
              transport.Create(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "create" } });
          })
          .PageSize(10)
          .ServerPaging(true)
      )
    )

    <script>
        function update(dataItem){
            return "/odata/Products(" + dataItem.ProductID + ")"
        }
        function create(){
            return "/odata/Products"
        }
        function destroy(dataItem){
            return "/odata/Products(" + dataItem.ProductID + ")"
        }
    </script>
```

{% if site.core %}
```TagHelper
    <script>
        // Initialize DataSource with the dataStore option.
        var dataSourceOptions = {
            type: "odata-v4",
            transport: {
                read: {
                    url: function () {
                        return "/odata/Products";
                    }
                },
                update: {
                    url: function (dataItem) {
                        return "/odata/Products(" + dataItem.ProductID + ")";
                    }
                },
                create: {
                    url: function (dataItem) {
                        delete dataItem.ProductID;
                        return "/odata/Products";
                    }
                },
                destroy: {
                    url: function (dataItem) {
                        return "/odata/Products(" + dataItem.ProductID + ")";
                    }
                }
            },
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: { editable: false },
                        ProductName: { type: "string" },
                        UnitPrice: { type: "number" },
                        UnitsInOrder: {type: "number"},
                        Discontinued: { type: "boolean" },
                        UnitsInStock: { type: "number" }
                    }
                }
            },
            pageSize: 10
        };
        var dataSource = new kendo.data.DataSource(dataSourceOptions);
    </script>

    <kendo-grid name="Grid" datasource-id="dataSource">
        <columns>
            <column field="ProductName"/>
            <column field="UnitsInStock"/>
            <column field="Discontinued"/>
            <column field="UnitPrice" width="150"/>
            <column width="150">
                <commands>
                    <column-command text="Edit" name="edit"></column-command>
                    <column-command text="Delete" name="destroy"></column-command>
                </commands>
            </column>
        </columns>
        <editable mode="inline"/>
        <toolbar>
            <toolbar-button name="create"></toolbar-button> 
        </toolbar>
        <pageable enabled="true"/>
    </kendo-grid>
```
{% endif %}

## Configuring Batch Editing

{% if site.core %}
### Enabling Batch Editing in OData-v4 Binding Scenarios with ASP.NET Core 6

1. Add a default batch handler within the `AddOData()` extensions method and inject the `UseODataBatching()` middleware.

    ```
      var defaultBatchHandler = new DefaultODataBatchHandler();
      defaultBatchHandler.MessageQuotas.MaxNestingDepth = 2;

      builder.Services.AddControllers()
                      .AddOData(options =>
                      {
                          options.AddRouteComponents("odata", GetEdmModel(), defaultBatchHandler);
                          options.Select()
                                 .Filter()
                                 .Count()
                                 .OrderBy()
                                 .Expand()
                                 .Select()
                                 .SetMaxTop(null);
                      });


      app.UseODataBatching();
    ```

2. Within the Grid, set the Batch operation with `ClientHandlerDescriptor` to support batching and enable the `Batch()` option of the Grid's DataSource.

   ```HtmlHelper
      @(Html.Kendo().Grid<ProductViewModel>()
          .Name("grid")
           .Columns(columns =>
              {
                  columns.Bound(p => p.ProductName);
                  columns.Bound(p => p.QuantityPerUnit);
                  columns.Bound(p => p.UnitsInStock);
                  columns.Bound(p => p.Discontinued);
                  columns.Bound(p => p.UnitsOnOrder);
                  columns.Bound(p => p.UnitPrice).Width(150);
                  columns.Command(command => command.Destroy()).Width(150);
              })
              .ToolBar(toolBar =>
              {
                  toolBar.Create();
                  toolBar.Save();
              })
              .Editable(editable => editable.Mode(GridEditMode.InCell))
              .Pageable()
              .Sortable()
              .Scrollable()
              .HtmlAttributes(new { style = "height:550px;" })
              .DataSource(dataSource => dataSource
              .Custom()
              .Batch(true)
              .Type("odata-v4")
              .Schema(schema => schema
              .Model(m =>
              {
                  m.Id(t => t.ProductID);
                  m.Field(t => t.ProductID).Editable(false);
                  m.Field(t => t.ProductName);
                  m.Field(t => t.QuantityPerUnit);
                  m.Field(t => t.UnitPrice);
                  m.Field(t => t.UnitsInStock);
                  m.Field(t => t.UnitsOnOrder);
                  m.Field(t => t.Discontinued);
              }))
              .Transport(t =>
              {
                  t.Read(read => read.Url("/odata/Products"));
                  t.Update(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "update" } });
                  t.Destroy(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "destroy" } });
                  t.Create(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "create" } });
                  t.Batch(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "batch" } });
              })
              .PageSize(10)
              .ServerPaging(true)
           )
      )
      <script>
          function batch(){
              return "/odata/$batch"
          }
          function update(dataItem){
              return "/odata/Products(" + dataItem.ProductID + ")"
          }
          function create(){
              return "/odata/Products"
          }
          function destroy(dataItem){
               return "/odata/Products(" + dataItem.ProductID + ")"
          }
      </script>
  ```
  ```TagHelper
    <script>
        // Initialize DataSource with the dataStore option.
        var dataSourceOptions = {
            batch: true,
            type: "odata-v4",
            transport: {
                read: {
                    url: function () {
                        return "/odata/Products";
                    }
                },
                update: {
                    url: function (dataItem) {
                        return "/odata/Products(" + dataItem.ProductID + ")";
                    }
                },
                batch: {
                    url: function () {
                        return "/odata/$batch";
                    }
                },
                create: {
                    url: function (dataItem) {
                        delete dataItem.ProductID;
                        return "/odata/Products";
                    }
                },
                destroy: {
                    url: function (dataItem) {
                        return "/odata/Products(" + dataItem.ProductID + ")";
                    }
                }
            },
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: { editable: false },
                        ProductName: { type: "string" },
                        UnitPrice: { type: "number" },
                        UnitsInOrder: {type: "number"},
                        Discontinued: { type: "boolean" },
                        UnitsInStock: { type: "number" }
                    }
                }
            },
            pageSize: 10
        };
        var dataSource = new kendo.data.DataSource(dataSourceOptions);
    </script>

    <kendo-grid name="Grid" datasource-id="dataSource">
        <columns>
            <column field="ProductName"/>
            <column field="UnitsInStock"/>
            <column field="Discontinued"/>
            <column field="UnitPrice" width="150"/>
            <column width="150">
                <commands>
                    <column-command text="Delete" name="destroy"></column-command>
                </commands>
            </column>
        </columns>
        <editable mode="incell"/>
        <toolbar>
            <toolbar-button name="create"></toolbar-button> 
            <toolbar-button name="save"></toolbar-button> 
        </toolbar>
        <pageable enabled="true"/>
    </kendo-grid>
  ```

### Enabling Batch Editing in OData-v4 Binding Scenarios with ASP.NET Core 3.1 and 5:

1. Add a default batch handler within the `AddOData()` extensions method and inject the `UseODataBatching()` middleware within the `Startup.cs` file.

  ```
      public void ConfigureServices(IServiceCollection services)
      {
          var defaultBatchHandler = new DefaultODataBatchHandler();
          defaultBatchHandler.MessageQuotas.MaxNestingDepth = 2;
  
          services.AddControllers().AddOData(
              options => options.Select().Filter().OrderBy().Expand().Count().SetMaxTop(null).AddRouteComponents(
                  "odata",
                  modelBuilder.GetEdmModel(), defaultBatchHandler));
      }
      public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
      {
          app.UseODataBatching();
          app.UseHttpsRedirection();
          app.UseStaticFiles();
          app.UseRouting();
          ...
      }
  ```

2. Within the Grid, set the Batch operation with `ClientHandlerDescriptor` to support batching and enable the `Batch()` option of the Grid's DataSource.

  ```HtmlHelper
      @(Html.Kendo().Grid<ProductViewModel>()
          .Name("grid")
           .Columns(columns =>
              {
                  columns.Bound(p => p.ProductName);
                  columns.Bound(p => p.QuantityPerUnit);
                  columns.Bound(p => p.UnitsInStock);
                  columns.Bound(p => p.Discontinued);
                  columns.Bound(p => p.UnitsOnOrder);
                  columns.Bound(p => p.UnitPrice).Width(150);
                  columns.Command(command => command.Destroy()).Width(150);
              })
              .ToolBar(toolBar =>
              {
                  toolBar.Create();
                  toolBar.Save();
              })
              .Editable(editable => editable.Mode(GridEditMode.InCell))
              .Pageable()
              .Sortable()
              .Scrollable()
              .HtmlAttributes(new { style = "height:550px;" })
              .DataSource(dataSource => dataSource
              .Custom()
              .Batch(true)
              .Type("odata-v4")
              .Schema(schema => schema
              .Model(m =>
              {
                  m.Id(t => t.ProductID);
                  m.Field(t => t.ProductID).Editable(false);
                  m.Field(t => t.ProductName);
                  m.Field(t => t.QuantityPerUnit);
                  m.Field(t => t.UnitPrice);
                  m.Field(t => t.UnitsInStock);
                  m.Field(t => t.UnitsOnOrder);
                  m.Field(t => t.Discontinued);
              }))
              .Transport(t =>
              {
                  t.Read(read => read.Url("/odata/Products"));
                  t.Update(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "update" } });
                  t.Destroy(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "destroy" } });
                  t.Create(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "create" } });
                  t.Batch(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "batch" } });
              })
              .PageSize(10)
              .ServerPaging(true)
           )
      )
      <script>
          function batch(){
              return "/odata/$batch"
          }
          function update(dataItem){
              return "/odata/Products(" + dataItem.ProductID + ")"
          }
          function create(){
              return "/odata/Products"
          }
          function destroy(dataItem){
               return "/odata/Products(" + dataItem.ProductID + ")"
          }
      </script>
  ```
  ```TagHelper
    <script>
        // Initialize DataSource with the dataStore option.
        var dataSourceOptions = {
            batch: true,
            type: "odata-v4",
            transport: {
                read: {
                    url: function () {
                        return "/odata/Products";
                    }
                },
                update: {
                    url: function (dataItem) {
                        return "/odata/Products(" + dataItem.ProductID + ")";
                    }
                },
                batch: {
                    url: function () {
                        return "/odata/$batch";
                    }
                },
                create: {
                    url: function (dataItem) {
                        delete dataItem.ProductID;
                        return "/odata/Products";
                    }
                },
                destroy: {
                    url: function (dataItem) {
                        return "/odata/Products(" + dataItem.ProductID + ")";
                    }
                }
            },
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: { editable: false },
                        ProductName: { type: "string" },
                        UnitPrice: { type: "number" },
                        UnitsInOrder: {type: "number"},
                        Discontinued: { type: "boolean" },
                        UnitsInStock: { type: "number" }
                    }
                }
            },
            pageSize: 10
        };
        var dataSource = new kendo.data.DataSource(dataSourceOptions);
    </script>

    <kendo-grid name="Grid" datasource-id="dataSource">
        <columns>
            <column field="ProductName"/>
            <column field="UnitsInStock"/>
            <column field="Discontinued"/>
            <column field="UnitPrice" width="150"/>
            <column width="150">
                <commands>
                    <column-command text="Delete" name="destroy"></column-command>
                </commands>
            </column>
        </columns>
        <editable mode="incell"/>
        <toolbar>
            <toolbar-button name="create"></toolbar-button> 
            <toolbar-button name="save"></toolbar-button> 
        </toolbar>
        <pageable enabled="true"/>
    </kendo-grid>
  ```

{% else %}

To enable batch editing capabilities in an ASP.NET MVC Environment:

1. Add a default batch handler inside the `WebApiConfig` file.
  ```
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var builder = new ODataConventionModelBuilder();
            builder.EntitySet<Product>("Products");

            config.Count().Filter().OrderBy().Expand().Select().MaxTop(null);
            config.MapODataServiceRoute("odata", "odata", new DefaultODataBatchHandler(GlobalConfiguration.DefaultServer));
        }
    }
  ```


2. Within the Grid, set the Batch operation with `ClientHandlerDescriptor` to support batching and enable the `Batch()` option of the Grid's DataSource.

  ```HtmlHelper
      @(Html.Kendo().Grid<ProductViewModel>()
          .Name("grid")
           .Columns(columns =>
              {
                  columns.Bound(p => p.ProductName);
                  columns.Bound(p => p.QuantityPerUnit);
                  columns.Bound(p => p.UnitsInStock);
                  columns.Bound(p => p.Discontinued);
                  columns.Bound(p => p.UnitsOnOrder);
                  columns.Bound(p => p.UnitPrice).Width(150);
                  columns.Command(command => command.Destroy()).Width(150);
              })
              .ToolBar(toolBar =>
              {
                  toolBar.Create();
                  toolBar.Save();
              })
              .Editable(editable => editable.Mode(GridEditMode.InCell))
              .Pageable()
              .Sortable()
              .Scrollable()
              .HtmlAttributes(new { style = "height:550px;" })
              .DataSource(dataSource => dataSource
              .Custom()
              .Batch(true)
              .Type("odata-v4")
              .Schema(schema => schema
              .Model(m =>
              {
                  m.Id(t => t.ProductID);
                  m.Field(t => t.ProductID).Editable(false);
                  m.Field(t => t.ProductName);
                  m.Field(t => t.QuantityPerUnit);
                  m.Field(t => t.UnitPrice);
                  m.Field(t => t.UnitsInStock);
                  m.Field(t => t.UnitsOnOrder);
                  m.Field(t => t.Discontinued);
              }))
              .Transport(t =>
              {
                  t.Read(read => read.Url("/odata/Products"));
                  t.Update(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "update" } });
                  t.Destroy(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "destroy" } });
                  t.Create(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "create" } });
                  t.Batch(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "batch" } });
              })
              .PageSize(10)
              .ServerPaging(true)
           )
      )
      <script>
          function batch(){
              return "/odata/$batch"
          }
          function update(dataItem){
              return "/odata/Products(" + dataItem.ProductID + ")"
          }
          function create(){
              return "/odata/Products"
          }
          function destroy(dataItem){
               return "/odata/Products(" + dataItem.ProductID + ")"
          }
      </script>
  ```

{% endif %}


## See Also

* [OData-v4 Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/odata-v4)
{% if site.core %}
* [Official Microsoft Documentation on Getting Started with {{ site.framework }} OData-v4](https://learn.microsoft.com/en-us/odata/webapi-8/getting-started?tabs=net60%2Cvisual-studio-2022%2Cvisual-studio)
{% else %}
* [Official Microsoft Documentation on Getting Started with {{ site.framework }} OData-v4](https://learn.microsoft.com/en-us/aspnet/web-api/overview/odata-support-in-aspnet-web-api/odata-v4/create-an-odata-v4-endpoint)
{% endif %}
* [Server-Side API](/api/grid)