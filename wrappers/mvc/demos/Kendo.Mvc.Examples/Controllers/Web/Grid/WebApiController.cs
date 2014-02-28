using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System;
using System.Data.Entity.Infrastructure;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {        
        public ActionResult WebApi()
        {
            return View();
        }        
    }

    public class ProductController : System.Web.Http.ApiController
    {
        ProductService service;

        public ProductController()
        {
            service = new ProductService(new SampleEntities());
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
}