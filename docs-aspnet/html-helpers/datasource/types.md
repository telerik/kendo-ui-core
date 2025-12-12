---
title: Types
page_title: Types
description: "Learn about the types of DataSource that are supported by the Telerik UI DataSource component for {{ site.framework }}."
components: ["datasource"]
slug: htmlhelper_datasourcetypes_aspnetcore
position: 2
---

# DataSource Types

The DataSource component supports built-in types of data binding.

To include the default data source types, add the `<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>` script to your `_Layout.cshtml` file after the Kendo UI scripts.

The available DataSource types of data binding are:
* [Ajax](#ajax-datasource)
* [WebAPI](#webapi-datasource)
* [Custom](#custom-datasource)

## Ajax DataSource

The Ajax DataSource type of data binding is the most popular data source type and performs Ajax requests to retrieve or update data. It formats the request filter, sort, group, page, page size, and aggregates, and, out of the box, binds the model to a controller which expects a [`[DataSourceRequest]DataSourceRequest request`](/api/Kendo.Mvc.UI/DataSourceRequest) parameter. This allows you to use the [`ToDataSourceResult()`](/api/Kendo.Mvc.Extensions/QueryableExtensions) extension method and to return a collection that corresponds to the request without having to deal with data operations programmatically.

Additionally, you can use the `server-operation` or `.ServerOperation` property to enable or disable server operations:

* When enabled, all data operations like paging, sorting, grouping, etc. will be performed server-side. 
* When disabled, all data operations will be performed on the client, and the entire data set will be available for the DataSource. This approach is also applicable for the [WebAPI](#webapi-datasource) type of binding.


```HtmlHelper
     @(Html.Kendo().DataSource<OrderViewModel>()
        .Name("myDataSource")
        .Ajax(dataSource =>
        {
          dataSource
            .Read(read => read.Action("ReadOrders", "Home"))
            .Create(create => create.Action("CreateOrders", "Home"))
            .Update(update => update.Action("UpdateOrders", "Home"))
            .Destroy(destroy => destroy.Action("DestroyOrders", "Home"))
            .Sort(sort => sort.Add(field => field.ShipCountry).Ascending())
            .Filter(filter=>filter.Add(field=>field.ShipCountry).StartsWith("A"))
            .Group(group=>group.Add(field=>field.OrderID))
            .Aggregates(aggregates=>aggregates.Add(field=>field.ShipCountry).Count())
            .PageSize(2)
            .ServerOperation(true)
            .Model(model =>
                {
                model.Id(field => field.OrderID);
                model.Field(field => field.OrderID).Editable(false);
                model.Field(field => field.ShipCountry).DefaultValue("USA");
            });
        })
    )

    <script>
        $(document).ready(function () {
            myDataSource.read(); // A POST request will be sent to the HomeController ReadOrders action
        });
    </script>  
```
{% if site.core %}
```TagHelper
    @{
        var ShipCountry_default = "USA";
        var filterValue = "A";
    }
    <kendo-datasource name="myDataSource" type="DataSourceTagHelperType.Ajax" server-operation="true" page-size="2">
        <transport>
            <read url="@Url.Action("ReadOrders","Home")" />
            <create url="@Url.Action("CreateOrders","Home")" />
            <update url="@Url.Action("UpdateOrders","Home")" />
            <destroy url="@Url.Action("DestroyOrders","Home")" />
        </transport>
        <sorts>
            <sort field="ShipCountry" direction="asc"/>
        </sorts>
        <filters>
            <datasource-filter field="ShipCountry" operator="startswith" value="@filterValue"></datasource-filter>
        </filters>
        <groups>
            <group field="OrderID" />
        </groups>
        <aggregates>
            <aggregate field="ShipCountry" aggregate="count" />
        </aggregates>
        <schema>
            <model id="OrderID">
                <fields>
                    <field name="OrderID" type="number" editable="false"></field>
                    <field name="ShipCountry" type="string" default-value="@ShipCountry_default"></field>
                </fields>
            </model>
        </schema>
    </kendo-datasource>

    <script>
        $(document).ready(function () {
            myDataSource.read(); // A POST request will be sent to the HomeController ReadOrders action
        });
    </script>   
```
{% endif %}
```C# HomeController

    public ActionResult ReadOrders([DataSourceRequest]DataSourceRequest request)
    {
        // Orders can be IQueriable or IEnumerable.
        // The result is a filtered, paged, grouped, and sorted collection.
        var result = orders.ToDataSourceResult(request);

        // response object : { AggregateResults: [], Data: [{},{}], Errors: null, Total: 7 }
        return Json(result);
    }

    public ActionResult CreateOrders([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
    {
        if (order != null && ModelState.IsValid)
        {
            orderService.Create(order);
        }
        return Json(new[] { order }.ToDataSourceResult(request, ModelState));
    }

    public ActionResult UpdateOrders([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
    {
        if (order != null && ModelState.IsValid)
        {
            orderService.Update(order);
        }
        return Json(new[] { order }.ToDataSourceResult(request, ModelState));
    }

    public ActionResult DestroyOrders([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
    {
        if (order != null)
        {
            orderService.Destroy(order);
        }
        return Json(new[] { order }.ToDataSourceResult(request, ModelState));
    }
```

## WebAPI DataSource
  
The WebAPI DataSource maps the CRUD operations to standard HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`) and supports the following data operations:

- Paging  
- Sorting  
- Filtering  
- Grouping and Aggregates  

```HtmlHelper
@(Html.Kendo().DataSource<ProductViewModel>()
    .Name("myDataSource")
    .WebApi(webapi =>
    {
        webapi.Read(read => read.Action("Get", "Product"));
        webapi.Create(create => create.Action("Post", "Product"));
        webapi.Update(update => update.Action("Put", "Product", new { id = "{0}" }));
        webapi.Destroy(destroy => destroy.Action("Delete", "Product", new { id = "{0}" }));
        webapi.Model(model =>
        {
            model.Id(p => p.ProductID);
            model.Field(p => p.ProductName).DefaultValue("New Product");
        });
    })
)

<script>
    $(document).ready(function () {
        myDataSource.read(); // A GET request will be sent to api/product
    });
</script>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-datasource name="myDataSource" type="DataSourceTagHelperType.WebApi">
    <transport>
        <read url="/aspnet-core/api/product" type="GET"/>
        <create url="/aspnet-core/api/product" type="POST"/>
        <update url="/aspnet-core/api/product/{0}" type="PUT"/>
        <destroy url="/aspnet-core/api/product/{0}" type="DELETE"/>
    </transport>
    <schema>
        <model id="ProductID">
            <fields>
                <field name="ProductID" type="number" editable="false"></field>
                <field name="ProductName" type="string" default-value="New Product"></field>
                <field name="UnitPrice" type="number"></field>
                <field name="UnitsInStock" type="number"></field>
                <field name="Discontinued" type="boolean"></field>
            </fields>
        </model>
    </schema>
</kendo-datasource>

<script>
    $(document).ready(function () {
        myDataSource.read(); // A GET request will be sent to api/product
    });
</script>
```
```C# ProductController
[ApiController]
[Route("api/[controller]")]
public class ProductController : Controller
{
    private readonly IProductService service;

    public ProductController(IProductService productService)
    {
        service = productService;
    }

    // GET: api/product
    [HttpGet]
    public DataSourceResult Get([DataSourceRequest] DataSourceRequest request)
    {
        return service.Read().ToDataSourceResult(request);
    }

    // POST: api/product
    [HttpPost]
    public IActionResult Post([FromForm] ProductViewModel product)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(
                ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(error => error.ErrorMessage)
            );
        }

        service.Create(product);

        return new ObjectResult(
            new DataSourceResult
            {
                Data = new[] { product },
                Total = 1
            }
        );
    }

    // PUT: api/product/{id}
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromForm] ProductViewModel product)
    {
        if (ModelState.IsValid && id == product.ProductID)
        {
            try
            {
                service.Update(product);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return Ok();
        }

        return BadRequest(
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(error => error.ErrorMessage)
        );
    }

    // DELETE: api/product/{id}
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        try
        {
            service.Destroy(new ProductViewModel { ProductID = id });
        }
        catch (DbUpdateConcurrencyException)
        {
            return NotFound();
        }

        return Ok();
    }
}
```
{% endif %}
{% if site.mvc %}
```C# ProductController
public class ProductController : System.Web.Http.ApiController
{
    ProductService service;
    public ProductController()
    {
        service = new ProductService(new DemoDBContext());
    }
    protected override void Dispose(bool disposing)
    {
        service.Dispose();
        base.Dispose(disposing);
    }
    // GET api/product
    public DataSourceResult Get([System.Web.Http.ModelBinding.ModelBinder(typeof(WebApiDataSourceRequestModelBinder))]DataSourceRequest request)
    {
        return service.Read().ToDataSourceResult(request);
    }
    // POST api/product
    public HttpResponseMessage Post(ProductViewModel product)
    {
        if (ModelState.IsValid)
        {
            service.Create(product);
            var response = Request.CreateResponse(HttpStatusCode.Created, new DataSourceResult { Data = new[] { product }, Total = 1 });
            response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = product.ProductID }));
            return response;
        }
        else
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(error => error.ErrorMessage);
            return Request.CreateResponse(HttpStatusCode.BadRequest, errors);
        }
    }
    // PUT api/product/5
    public HttpResponseMessage Put(int id, ProductViewModel product)
    {
        if (ModelState.IsValid && id == product.ProductID)
        {
            try
            {
                service.Update(product);
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }
        else
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(error => error.ErrorMessage);
            return Request.CreateResponse(HttpStatusCode.BadRequest, errors);
        }
    }
    // DELETE api/product/5
    public HttpResponseMessage Delete(int id)
    {
        ProductViewModel product = service.Read().FirstOrDefault(p => p.ProductID == id);
        if (product == null)
        {
            return Request.CreateResponse(HttpStatusCode.NotFound);
        }
        try
        {
            service.Destroy(product);
        }
        catch (DbUpdateConcurrencyException)
        {
            return Request.CreateResponse(HttpStatusCode.NotFound);
        }
        return Request.CreateResponse(HttpStatusCode.OK, product);
    }
}
```
{% endif %}

## Custom DataSource

The Custom DataSource type of data binding is the default type of binding and provides full control over the [client-side API options of the Kendo UI for jQuery DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource). For example, instead of using the `serverOperation` property, which is only applicable for the Ajax and WebApi types of data binding, you have to separately state the server operations (server-filtering, server-sorting, server-paging, server-grouping, and server-aggregates).

> The custom DataSource type of data binding is suitable for working with the `oData` and `oData-v4` services because of the [`type`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/type) property and of the usage of predefined transport and schema settings for consuming such services. Since the custom type binding is the default type, you can omit it in the DataSource declaration.

The following example demonstrates how to consume an OData service.

```HtmlHelper
	@(Html.Kendo().DataSource<AspNet{{ site.framework_short }}Grid.Models.OrderViewModel>()
        .Name("myDataSource")
        .Custom(dataSource =>
        {
            dataSource
            .Type("odata-v4")
            .PageSize(20)
            .ServerPaging(true)
            .ServerFiltering(true)
            .ServerSorting(true)
            .Transport(transport => 
            {
                transport.Read(read => read.Url("https://demos.telerik.com/service/v2/odata/Orders"));
            });
        })
    )
    
    <script>
        $(document).ready(function () {
            myDataSource.fetch();
        });
    </script>
```
{% if site.core %}
```TagHelper
	<kendo-datasource name="myDataSource" 
        type="DataSourceTagHelperType.Custom" 
        custom-type="odata-v4"
        page-size="20"
        server-paging="true"
        server-sorting="true"
        server-filtering="true">
	    <transport>
	        <read url="https://demos.telerik.com/service/v2/odata/Orders" />
	    </transport>
	</kendo-datasource>

    <script>
        $(document).ready(function () {
            myDataSource.fetch();
        });
    </script>
```
{% endif %}

## See Also

* [Server-Side API](/api/datasource)
