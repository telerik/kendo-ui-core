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
        // GET: /themebuilder
        public ActionResult Index()
        {
            ViewBag.Product = "themebuilder";

#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif

            ViewBag.DeployRoot = Url.Content(ConfigurationManager.AppSettings["THEMEBUILDER_ROOT"]);

            ViewBag.scripts = Kendo.Models.ScriptGroups.All;
            ViewBag.styles = Kendo.Models.StyleGroups.All;

            SetTheme();

            return View();
        }

        // GET: /mobilethemebuilder
        public ActionResult MobileIndex()
        {
            ViewBag.Product = "mobile-themebuilder";

#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif

            ViewBag.scripts = Kendo.Models.ScriptGroups.All;
            ViewBag.styles = Kendo.Models.StyleGroups.Mobile;

            return View();
        }
    }
}
