using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetProducts(string filterText)
        {
            var products = new NorthwindDataContext().Products.AsQueryable();

            if (filterText.HasValue())
            {
                products = products.Where(p => p.ProductName.Contains(filterText));
            }

            return Json(products, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCustomers()
        {
            return Json(new NorthwindDataContext().Customers, JsonRequestBehavior.AllowGet);
        }
    }
}
