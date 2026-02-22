---
title: Using Grid in InCell Batch Edit Mode and WebAPI Binding
page_title: Using Grid in InCell Batch Edit Mode and WebAPI Binding
description: "Configure the {{ site.product }} InCell editable Grid with enabled batch mode for WebAPI data binding."
previous_url: /helpers/data-management/grid/how-to/editing/incell-batch-editing-webapi, /html-helpers/data-management/grid/how-to/editing/incell-batch-editing-webapi
slug: howto_editincellbatchmodewebapi_gridaspnetmvc
component: grid
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I set up a batch editable Grid for [WebAPI data binding]({% slug htmlhelpers_grid_webapi_binding%})?

## Solution

The example relies on the following key steps:

1. Enable the InCell batch editing of the Grid, set the type of the DataSource to `WebApi()`, and specify the `Read`, `Create`, `Update`, and `Destroy` endpoints.

    ```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            ...// Define the desired columns.
            columns.Command(command => command.Destroy());
        })
        .ToolBar(tools =>
        {
            tools.Create();
            tools.Save();
        })
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .DataSource(dataSource => dataSource
            .WebApi()
            .Model(model =>
            {
                model.Id(p => p.ProductID);
            })
            .Batch(true)
            .Read(read => read.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Product", action = "get" })))
            .Create(create => create.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Product", action = "post" })))
            .Update(update => update.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Product", action = "put", id = "{0}" })))
            .Destroy(destroy => destroy.Url(Url.HttpRouteUrl("DefaultApi", new { controller = "Product", action = "delete", id = "{0}" })))
        )
    )
    ```

1. Add a `WebApi.config` file in the `App_Start` folder:

    ```C#
    public class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            RouteTable.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional });
        }
    }
    ```

1. Implement the WebAPI Controller:

    ```C#
    public class ProductController : ApiController
    {
        private GridEditingInCellWebApiEntities db;

        public ProductController()
        {
            db = new GridEditingInCellWebApiEntities();
        }
        protected override void Dispose(bool disposing)
        {
            db.Dispose();

            base.Dispose(disposing);
        }

        // GET api/product
        public DataSourceResult Get([System.Web.Http.ModelBinding.ModelBinder(typeof(WebApiDataSourceRequestModelBinder))]DataSourceRequest request)
        {
            return db.Products.Select(p => new ProductViewModel
            {
                ProductID = p.ProductID,
                ProductName = p.ProductName,
                UnitPrice = p.UnitPrice ?? 0,
                Discontinued = p.Discontinued,
                UnitsInStock = p.UnitsInStock ?? 0
            }).ToDataSourceResult(request);
        }
        
        // POST api/product
        public HttpResponseMessage Post(ProductsRequest request)
        {
            if (ModelState.IsValid)
            {
                var products = db.AddProducts(request);
                
                var response = Request.CreateResponse(HttpStatusCode.Created, new DataSourceResult { Data =  products });
                response.Headers.Location = new Uri(Url.Link("DefaultApi", null));
                return response;
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(error => error.ErrorMessage);

                return Request.CreateResponse(HttpStatusCode.BadRequest, errors);
            }
        }

        // PUT api/product/5
        public HttpResponseMessage Put(ProductsRequest request) // the ProductsRequest is required in order the list of Product to be correctly bind from the request
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.UpdateProducts(request); 
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
        public HttpResponseMessage Delete(ProductsRequest request)
        {
            try
            {
                db.RemoveProducts(request);
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, new DataSourceResult { Data = request.Models });
        }

        private bool ProductExists(int key)
        {
            return db.Products.Count(e => e.ProductID == key) > 0;
        }
    }
    ```

To review the complete example, refer to the [ASP.NET MVC project on how to configure the DataSource to communicate with the WebAPI Controller when the Grid is set up for InCell batch editing](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingInCellWebApi).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
