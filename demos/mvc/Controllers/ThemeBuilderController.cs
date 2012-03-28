using System;
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
            ViewBag.DeployRoot = Url.Content("~/themebuilder/deploy");
#else
            ViewBag.Debug = false;
            ViewBag.DeployRoot = "http://themebuilder.kendoui.com";
#endif

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
