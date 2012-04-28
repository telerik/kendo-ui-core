using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KendoUI.Mvc.Web.Examples.Models;

namespace KendoUI.Mvc.Web.Examples.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return RedirectToRoute("RazorDefault", new { controller = "Suite" });
        }
    }
}
