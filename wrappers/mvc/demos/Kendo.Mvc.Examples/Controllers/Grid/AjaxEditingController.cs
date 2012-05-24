using System.Web.Mvc;
using System.Web.Routing;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult AjaxEditing()
        {
            return View();
        }

        public ActionResult AjaxEditing_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(SessionProductRepository.All().ToDataSource(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult AjaxEditing_Create([DataSourceRequest] DataSourceRequest request, IEnumerable<EditableProduct> products)
        {
            if (products != null)
            {
                foreach (var product in products)
                {
                    SessionProductRepository.Insert(product);
                }
            }

            return Json(SessionProductRepository.All().ToDataSource(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult AjaxEditing_Update([DataSourceRequest] DataSourceRequest request, IEnumerable<EditableProduct> products)
        {
            if (products != null)
            {
                foreach (var product in products)
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
            }

            return Json(SessionProductRepository.All().ToDataSource(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult AjaxEditing_Destroy([DataSourceRequest] DataSourceRequest request, IEnumerable<EditableProduct> products)
        {            
            if (products.Any())
            {
                foreach (var product in products)
                {
                    SessionProductRepository.Delete(product);
                }
            }

            return Json(SessionProductRepository.All().ToDataSource(request));
        }
    }
}
