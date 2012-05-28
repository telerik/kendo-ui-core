using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetProducts()
        {
            return Json(new NorthwindDataContext().Products, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCustomers()
        {
            return Json(new NorthwindDataContext().Customers, JsonRequestBehavior.AllowGet);
        }
    }
}
