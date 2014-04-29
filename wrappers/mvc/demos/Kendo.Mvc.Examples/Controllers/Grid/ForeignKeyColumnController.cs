using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult ForeignKeyColumn()
        {            
            PopulateCategories();
            return View();
        }

        public ActionResult ForeignKeyColumn_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(productService.Read().ToDataSourceResult(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ForeignKeyColumn_Update([DataSourceRequest] DataSourceRequest request, 
            [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
        {
            if (products != null && ModelState.IsValid)
            {
                foreach (var product in products)
                {
                    productService.Update(product);                    
                }
            }

            return Json(products.ToDataSourceResult(request,ModelState));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ForeignKeyColumn_Create([DataSourceRequest] DataSourceRequest request, 
            [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
        {
            var results = new List<ProductViewModel>();
            if (products != null && ModelState.IsValid)
            {
                foreach (var product in products)
                {
                    productService.Create(product);
                    results.Add(product);
                }
            }

            return Json(results.ToDataSourceResult(request, ModelState));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ForeignKeyColumn_Destroy([DataSourceRequest] DataSourceRequest request,
            [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
        {
            foreach (var product in products)
            {
                productService.Destroy(product);
            }

            return Json(products.ToDataSourceResult(request, ModelState));
        }
    }
}
