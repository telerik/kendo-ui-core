using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers.Mobile
{
    public partial class ListViewController : Controller
    {       
        public ActionResult Editing()
        {
            return View();
        }

        public ActionResult EditDetails(int productID)
        {
            var target = SessionProductRepository.One(p => p.ProductID == productID);

            return View(target);
        }
    
        public ActionResult Editing_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(SessionProductRepository.All().ToDataSourceResult(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Editing_Destroy([DataSourceRequest] DataSourceRequest request, ProductViewModel product)
        {
            if (product != null)
            {
                SessionProductRepository.Delete(product);
            }

            return Json(ModelState.ToDataSourceResult());
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Editing_Update(ProductViewModel product)
        {
            if (product != null && ModelState.IsValid)
            {
                var target = SessionProductRepository.One(p => p.ProductID == product.ProductID);
                if (target != null)
                {
                    target.ProductName = product.ProductName;
                    target.UnitPrice = product.UnitPrice;
                    target.UnitsInStock = product.UnitsInStock;
                    target.LastSupply = product.LastSupply;
                    target.Discontinued = product.Discontinued;
                    SessionProductRepository.Update(target);
                }
            }
            
            return RedirectToAction("Editing");
        }
    }
}
