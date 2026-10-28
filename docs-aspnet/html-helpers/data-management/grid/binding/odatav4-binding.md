---
title: OData-v4 Binding
page_title: OData-v4 Binding
description: "Learn how to configure OData-v4 binding, CRUD operations, and batch editing for the Telerik UI Grid in {{ site.framework }}."
components: ["grid"]
previous_url: /helpers/data-management/grid/binding/odatav4-binding
slug: htmlhelpers_grid_aspnetcore_odatav4-binding
position: 8
---

# OData-v4 Binding

[OData (Open Data Protocol)](https://www.odata.org/) defines best practices for building and consuming RESTful APIs. It provides built-in support for filtering, selecting, and expanding, among other query capabilities. By binding the {{ site.framework }} Grid to OData-v4, you can extend your REST API with advanced query options.

For a runnable example, refer to the [Grid OData-v4 binding demo](https://demos.telerik.com/{{ site.platform }}/grid/odatav4).

## Installing the OData Package

{% if site.core %}
Install the required OData dependency by adding the `Microsoft.AspNetCore.OData` NuGet package to your project.
{% else %}
Install the required OData dependencies by adding the `Microsoft.AspNet.OData` and `Microsoft.AspNet.WebApi.WebHost` NuGet packages to your project.
{% endif %}

{% if site.core %}
## Building the EDM Model and Configuring the Service in ASP.NET Core 6

For applications that use .NET 6 and the minimal hosting model, configure the EDM model and OData service in `Program.cs`:

```C#
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


## Building the EDM Model and Configuring the Service in ASP.NET Core 3.1 and ASP.NET Core 5

For applications that use .NET Core 3.1 or ASP.NET Core 5, configure the EDM model and OData service in `ConfigureServices`:

```C#
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
## Building the EDM Model and Configuring OData in an ASP.NET MVC Environment

To configure the application for both Web API and OData binding:

1. Configure Web API by calling `GlobalConfiguration.Configure` in the `Application_Start` method.
  
  ```C#
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
  ```
2. Create a file named `WebApiConfig.cs` in the `App_Start` folder, and configure the EDM model and OData services.
  
  ```C#
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

To support read and write operations in OData format, inherit from the `ODataController` base class.

```C#
    public class ProductsController : ODataController
    {
        ...
    }
```

Then, decorate the REST API endpoints with the `EnableQuery` attribute so the query options from the URL are applied automatically.

{% if site.core %}
```C#
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

```C#
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

To bind the Telerik UI for {{ site.framework }} Grid to OData-v4, set `.Type("odata-v4")` in the DataSource configuration. This setting sends requests to the OData endpoint in the expected format.

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
                        UnitsOnOrder: { type: "number" },
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

To configure CRUD operations for OData-v4 binding, add `ClientHandlerDescriptor` handlers that map each request to the corresponding OData-v4 endpoint.

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
                        UnitsOnOrder: { type: "number" },
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

    ```C#
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

2. In the Grid, configure the batch operation with `ClientHandlerDescriptor`, and enable the DataSource `Batch()` option.

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
                        UnitsOnOrder: { type: "number" },
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

### Enabling Batch Editing in OData-v4 Binding Scenarios with ASP.NET Core 3.1 and 5

1. Add a default batch handler in the `AddOData()` extension method, and inject the `UseODataBatching()` middleware in `Startup.cs`.

  ```C#
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

2. In the Grid, configure the batch operation with `ClientHandlerDescriptor`, and enable the DataSource `Batch()` option.

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
                        UnitsOnOrder: { type: "number" },
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

To enable batch editing in an ASP.NET MVC environment:

1. Add a default batch handler inside the `WebApiConfig` file.
  ```C#
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


2. In the Grid, configure the batch operation with `ClientHandlerDescriptor`, and enable the DataSource `Batch()` option.

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

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [OData-v4 Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/odata)
{% if site.core %}
* [GitHub Example](https://github.com/telerik/ui-for-aspnet-core-examples/commit/1a513aae311b339349d61e65d4f12fe954e2afc8)
* [Official Microsoft Documentation on Getting Started with {{ site.framework }} OData-v4](https://learn.microsoft.com/en-us/odata/webapi-8/getting-started?tabs=net60%2Cvisual-studio-2022%2Cvisual-studio)
{% else %}
* [Official Microsoft Documentation on Getting Started with {{ site.framework }} OData-v4](https://learn.microsoft.com/en-us/aspnet/web-api/overview/odata-support-in-aspnet-web-api/odata-v4/create-an-odata-v4-endpoint)
{% endif %}
* [Grid Server-Side API](/api/grid)