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
            ViewBag.Navigation = FilterEmptyCategories(NavigationProvider.SuiteWidgets(suite));
            ViewBag.SuiteTitle = SuiteTitles[suite];
            
            return View();
        }

        private dynamic FilterEmptyCategories(IDictionary<string, NavigationWidget[]> navigation)
        {
            var result = new Dictionary<string, NavigationWidget[]>();

            foreach (string category in navigation.Keys)
            {
                foreach (NavigationWidget widget in navigation[category])
                {
                    if (widget.ShouldInclude)
                    {
                        result.Add(category, navigation[category]);
                        break;
                    }
                }
            }

            return result;
        }
    }
}
