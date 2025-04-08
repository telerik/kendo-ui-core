---
title: OData-v4 Binding
page_title: OData-v4 Binding
description: "Learn how to implement OData-v4 binding with the Telerik UI TreeList component for {{ site.framework }}."
slug: htmlhelpers_treelist_odatav4-binding
position: 8
---

# OData-v4 Binding

[OData (Open Data Protocol)](https://www.odata.org/) defines best practices when it comes to building and consuming RESTful APIs in a dependable manner. It enables you to mimic a Web API but with built-in support for filtering, selecting, and expanding amongst other capabilities. Binding the {{ site.framework }} TreeList through OData-v4 allows you to elevate its REST API by introducing advanced querying options.

For a runnable example, refer to the [demo on OData binding of the TreeList component](https://demos.telerik.com/{{ site.platform }}/treelist/odata).

## Installing the OData Package 

{% if site.core %}
To install the required dependencies for using OData, install the autonomous `Microsoft.AspNetCore.OData` NuGet package in your project.
{% else %}
To install the required dependencies for using OData, install the autonomous `Microsoft.AspNet.OData` and `Microsoft.AspNet.WebApi.WebHost` NuGet packages in your project.
{% endif %}


{% if site.core %}
## Building the Edm Model and Configuring the Service in ASP.NET Core 6

For applications using .NET Core 6 and the minimal hosting model, the Edm model and service need to be configured through the `Program.cs` file in the following way:

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
        builder.EntitySet<Product>("Products"); // Model that will be used for the TreeList.
        return builder.GetEdmModel();
    }
```

## Building the Edm Model and Configuring the Service in ASP.NET Core 3.1 and ASP.NET Core 5

For applications using .NET Core 3.1 and 5, the Edm model and service need to be configured through the `ConfigureServices` method in the following way:

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
      builder.EntitySet<Product>("Products"); // Model that will be used for the TreeList.
      return builder.GetEdmModel();
  }
```

{% else %}
## Building the Edm Model and Configuring OData in an ASP.NET MVC Environment

To ensure that the application is configured for both WebApi and OData binding capabilities:

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
1. Create a file named `WebApiConfig.cs` inside the `App_Start` folder and configure the Edm model and OData services.
  
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

To support writing and reading data using the OData formats, the `ODataController` base class needs to be inherited for a given controller instance.

```C#
    public class ProductsController : ODataController
    {
        ...
    }
```

## Configuring the TreeList for OData-v4 Binding

To implement the OData binding within the boundaries of the Telerik UI for {{ site.framework }} TreeList, specify the `.Type("odata-v4")` configuration method within the DataSource. This ensures that the requests can be sent to the OData endpoint in the expected format and out of the box.

```HtmlHelper
    @(Html.Kendo().TreeList<Product>()
        .Name("treelist")
        .Columns(columns =>
        {
            columns.Add().Field(f => f.ProductName).Width(250);
            columns.Add().Field(e => e.UnitsInStock);
            columns.Add().Field(e => e.Discontinued).Title("Ext");
        })
        .Filterable()
        .Sortable()
        .DataSource(ds => ds
            .Custom()
            .Type("odata-v4")
            .Schema(sch => sch.Model(m =>
            {
                m.Id(i => i.ProductID);
                m.Field("parentId", typeof(int?)).From("IsPartOf").DefaultValue(null);
            }))
            .Transport(t => t.Read(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "read" } }))
        )
    )
    <script>
        function read(dataItem){
            if(!dataItem.hasOwnProperty('id')){
                return "/odata/Products"
            }

            return `/odata/Products?key=${dataItem.id}`;
        }
    </script>
```
{% if site.core %}
```TagHelper
    <script>
        $(document).ready( function () {
            var dataSource = new kendo.data.TreeListDataSource({
                type: "odata-v4",
                transport: {
                    read: {
                        url: function (item) {
                            if (item.hasOwnProperty('id')) {
                                return `/odata/Products?key=${dataItem.id}`;
                            } else {
                                return "/odata/Products";
                            }
                        }
                    }
                },
                schema: {
                    model: {
                        id: "ProductID",
                        parentId: "IsPartOf",
                        fields: {
                            IsPartOf: { field: "IsPartOf", nullable: true },
                            ProductID: { field: "ProductID", type: "number" }
                        }
                    }
                }
            });

            $("#treelist").getKendoTreeList().setDataSource(dataSource);
        });
    </script>

    <kendo-treelist name="treelist">
        <columns>
            <treelist-column field="ProductName" width="220px"></treelist-column>
            <treelist-column field="UnitsInStock"></treelist-column>
            <treelist-column field="Discontinued"></treelist-column>
        </columns>
        <filterable enabled="true"/>
        <sortable enabled="true"/>
    </kendo-treelist>
```
```Controller
    public class ProductsController : ODataController
    {

        private static List<Product> GetData() // Return Mocked Data.
        {
            return new List<Product>()
            {
                new Product {ProductID = 1, Discontinued = true, IsPartOf = null, hasChildren = true, ProductName = "Fruit", UnitPrice = 1254M},
                new Product {ProductID = 2, Discontinued = true, IsPartOf = 1, hasChildren = false, ProductName = "Banana", UnitPrice = 1254M},
                new Product {ProductID = 3, Discontinued = true, IsPartOf = null, hasChildren = true, ProductName = "Vegatables", UnitPrice = 1254M},
                new Product {ProductID = 4, Discontinued = true, IsPartOf = 3, hasChildren = false, ProductName = "Potato", UnitPrice = 1254M},
            };
        }

        private string[] ParseQuery() // Common function for passing the HttpContext Request's query string.
        {
            return HttpContext.Request.QueryString.ToString()
                                .Split("%")[0]
                                .Replace('?', ' ')
                                .Split("=");
        }

        [HttpGet]
        public List<Product> GetProducts()
        {
            var queryKeyValuePairs = ParseQuery();

            int? key = null;

            if (queryKeyValuePairs[0].Trim() == "key")
            {
                key = int.Parse(queryKeyValuePairs[1].Replace("&", ""));

            }
            List<Product> data = GetData();

            data = data.Where(v => key.HasValue ? v.IsPartOf == key : v.IsPartOf == null)
                   .ToList();


            return data.ToList();
        }
    }
```
{% else %}
```Controller
    public class ProductsController : ODataController
    {
        private static List<Product> GetData() // Return Mocked Data.
        {
            return new List<Product>()
            {
                new Product {ProductID = 1, Discontinued = true, IsPartOf = null, hasChildren = true, ProductName = "Fruit", UnitPrice = 1254M},
                new Product {ProductID = 2, Discontinued = true, IsPartOf = 1, hasChildren = false, ProductName = "Banana", UnitPrice = 1254M},
                new Product {ProductID = 3, Discontinued = true, IsPartOf = null, hasChildren = true, ProductName = "Vegatables", UnitPrice = 1254M},
                new Product {ProductID = 4, Discontinued = true, IsPartOf = 3, hasChildren = false, ProductName = "Potato", UnitPrice = 1254M},
            };
        }

        // GET: odata/Products(5)
        [EnableQuery]
        public IQueryable<Product> GetProducts([FromODataUri] int? key)
        {
            List<Product> data = GetData();

            data = data.Where(v => key.HasValue ? v.IsPartOf == key : v.IsPartOf == null)
                   .ToList();

            return data.ToList();
        }
    }

```
{% endif %}

```Model
    public class Product
    {
        public int ProductID { get; set; }

        public string ProductName { get; set; }

        public decimal UnitPrice { get; set; }

        public bool Discontinued { get; set; }

        public int? IsPartOf { get; set; }

        public bool hasChildren { get; set; }
    }
```

## See Also

* [OData-v4 Binding by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/odata)
{% if site.core %}
* [Official Microsoft Documentation on Getting Started with {{ site.framework }} OData-v4](https://learn.microsoft.com/en-us/odata/webapi-8/getting-started?tabs=net60%2Cvisual-studio-2022%2Cvisual-studio)
{% else %}
* [Official Microsoft Documentation on Getting Started with {{ site.framework }} OData-v4](https://learn.microsoft.com/en-us/aspnet/web-api/overview/odata-support-in-aspnet-web-api/odata-v4/create-an-odata-v4-endpoint)
{% endif %}
* [Server-Side API](/api/treelist)
