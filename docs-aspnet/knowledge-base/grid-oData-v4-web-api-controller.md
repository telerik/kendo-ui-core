---
title: Bind Grid to OData-v4 Using WebAPI Controller
page_title: Bind Grid to OData-v4 Using WebAPI Controller
description: "Configure the {{ site.product }} Grid to bind to OData-v4 through a WebAPI Controller."
previous_url: /kendo-ui/aspnet-mvc/helpers/grid/how-to/oData-v4-web-api-controller, /aspnet-mvc/helpers/grid/how-to/binding/oData-v4-web-api-controller, /helpers/data-management/grid/how-to/Binding/oData-v4-web-api-controller, /html-helpers/data-management/grid/how-to/Binding/oData-v4-web-api-controller
slug: howto_useodata4webapicontroller_gridaspnetmvc
component: grid
type: how-to
res_type: kb
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

How can I bind the Grid to OData-v4 using WebAPI endpoints?

## Solution

OData-v4 is not fully supported, and the approaches for processing `DateTime` properties are limited.

The reason is that WebAPI does not support the `DateTime` data type any more. Instead, WebAPI now uses the `DateTimeOffset` type as a main data type when it comes to dates. However, to keep information for both date and offset, the `DateTimeOffet` requires the Model (that the DataSource creates), which is not possible with the current architecture of the DataSource and Model.

You can achieve this requirement using the following implementation:

1. Configure the Grid's DataSource as per the example below:

    ```HtmlHelper
        .DataSource(dataSource => dataSource
            .Custom()
            .Batch(true)
            .Schema(sch =>
            {
                sch.Model(m=>{
                    m.Id("ProductID");
                    m.Field(f=>f.ProductID).Editable(false);
                    m.Field("UnitPrice", typeof(Decimal));
                });
            })
            .Type("odata-v4")
            .Transport(t =>
            {
                t.Read(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "readProduct" } });
                t.Update(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "updateProduct" } });
                t.Create(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "createProduct" } });
                t.Destroy(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "destroyProduct" } });
                t.Batch(new { url = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "batchProduct" } });
            })
            .PageSize(20)
            .ServerPaging(true)
            .ServerSorting(true)
            .ServerFiltering(true)
        )
    ```

1. Define the JavaScript functions that return the respective URL:

    ```JS
        function batchProduct() {
            return "https://demos.telerik.com/kendo-ui/service-v4/odata/$batch";
        }

        function readProduct() {
            return "https://demos.telerik.com/kendo-ui/service-v4/odata/Products";
        }

        function updateProduct(dataItem) {
            return "https://demos.telerik.com/kendo-ui/service-v4/odata/Products(" + dataItem.ProductID + ")";
        }

        function createProduct(dataItem) {
            delete dataItem.ProductID;
            return "https://demos.telerik.com/kendo-ui/service-v4/odata/Products";
        }

        function destroyProduct(dataItem) {
            return "https://demos.telerik.com/kendo-ui/service-v4/odata/Products(" + dataItem.ProductID + ")";
        }
    ```

1. Set up the `ODataController`:

    ```C# ODataWebApiWrappersProductsController.cs
     public class ODataWebApiWrappersProductsController : ODataController
    {
        private ODataWebApiWrappersEntities db = new ODataWebApiWrappersEntities();

        // GET: odata/ODataWebApiWrappersProducts
        [EnableQuery]
        public IQueryable<ODataWebApiWrappersProduct> GetProducts()
        {
            return db.Products;
        }

        // PUT: odata/ODataWebApiWrappersProducts(5)
        public IHttpActionResult Put([FromODataUri] int key, ODataWebApiWrappersProduct product)
        {   
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != product.ProductID)
            {
                return BadRequest();
            }

            db.Products.Attach(product);
            db.Entry(product).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(product);
        }

        public IHttpActionResult Post(ODataWebApiWrappersProduct product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Products.Add(product);
            //db.SaveChanges();
            return Created(product);
        }

        private bool ProductExists(int key)
        {
            return db.Products.Count(e => e.ProductID == key) > 0;
        }
    }
    ```

To review the complete example, refer to the [project on how to configure the Grid's DataSource to communicate with the WebAPI Controller through the OData-v4 protocol](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/ODataWebApiWrappers).

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
