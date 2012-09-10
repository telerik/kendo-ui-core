using System;
using System.Configuration;
using System.Linq;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class ThemeBuilderController : BaseController
    {
        //
        // GET: /themebuilder/index.html

        private readonly Dictionary<string,string> suites =
            new Dictionary<string, string>
            {
                { "web", "Web" },
                { "dataviz", "DataViz" },
                { "mobile", "Mobile" }
            };

        public ActionResult Index(string suite)
        {
            ViewBag.Suite = "themebuilder";

            suite = suite.ToLower();

            if (!suites.ContainsKey(suite))
            {
                suite = "web";
            }

#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif

            ViewBag.DeployRoot = Url.Content(ConfigurationManager.AppSettings["THEMEBUILDER_ROOT"]);

            ViewBag.scripts = Kendo.Models.ScriptGroups.All;
            ViewBag.styles = Kendo.Models.StyleGroups.All;

            ViewBag.Title = "ThemeBuilder for Kendo UI " + suites[suite];

            return View(suite.ToLower());
        }

        public ActionResult ThemeBuilderIndex()
        {
            return RedirectPermanent(Url.Action("Index", "ThemeBuilder", new { suite = "web" }));
        }
    }
}
