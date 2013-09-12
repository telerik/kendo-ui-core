using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult EditingCustomValidation()
        {
            return View();
        }

        public ActionResult EditingCustomValidation_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(productService.Read()
                .Select(p => new CustomValidationProductViewModel {
                    ProductID = p.ProductID,
                    ProductName = p.ProductName,
                    UnitPrice = p.UnitPrice
                }).ToDataSourceResult(request)
            );
        }       

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditingCustomValidation_Update([DataSourceRequest] DataSourceRequest request, CustomValidationProductViewModel product)
        {
            if (product != null && ModelState.IsValid)
            {
                productService.Update(new ProductViewModel
                {
                    ProductID = product.ProductID,
                    ProductName = product.ProductName,
                    UnitPrice = product.UnitPrice
                });
            }            

            return Json(new[]{product}.ToDataSourceResult(request,ModelState));
        }        
    }
}
