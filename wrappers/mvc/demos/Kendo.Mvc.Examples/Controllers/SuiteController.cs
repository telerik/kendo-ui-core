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
        private readonly Dictionary<string, string> SuiteTitles =
            new Dictionary<string, string>()
            {
                { "web", "Web" },
                { "dataviz", "DataViz" }
            };

        public ActionResult Index(string suite)
        {
            ViewBag.Navigation = NavigationProvider.SuiteWidgets(suite);
            ViewBag.SuiteTitle = SuiteTitles[suite];
            
            return View();
        }
    }
}
