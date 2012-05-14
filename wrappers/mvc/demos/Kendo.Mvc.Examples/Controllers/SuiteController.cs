using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public class SuiteController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Navigation = NavigationProvider.SuiteWidgets();
            return View();
        }
    }
}
