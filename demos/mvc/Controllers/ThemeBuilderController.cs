using System;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class ThemeBuilderController : BaseController
    {
        //
        // GET: /themebuilder/index.html

        public ActionResult Index()
        {
            ViewBag.Suite = "themebuilder";
            ViewBag.Title = "ThemeBuilder";

#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif

            ViewBag.DeployRoot = Url.Content(ConfigurationManager.AppSettings["THEMEBUILDER_ROOT"]);

            ViewBag.scripts = Kendo.Models.ScriptGroups.All;
            ViewBag.styles = Kendo.Models.StyleGroups.All;

            return View();
        }

        public ActionResult ThemeBuilderIndex()
        {
            return RedirectPermanent(Url.Action("Index"));
        }
    }
}
