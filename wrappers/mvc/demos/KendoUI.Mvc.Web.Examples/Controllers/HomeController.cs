using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KendoUI.Mvc.Web.Examples.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return RedirectToRoute("RazorDefault", new { action = "BundleIndex" });
        }

        public ActionResult BundleIndex()
        {
            return View();
        }
    }
}
