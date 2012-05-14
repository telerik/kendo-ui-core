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
        public ActionResult Index(string suite)
        {
            ViewBag.Navigation = NavigationProvider.SuiteWidgets(suite);
            
            return View();
        }
    }
}
