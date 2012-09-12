using System;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class MobileThemeBuilderController : BaseController
    {
        //
        // GET: /mobilethemebuilder/index.html

        public ActionResult Index()
        {
            ViewBag.Suite = "mobilethemebuilder";
            ViewBag.Title = "MobileThemeBuilder";

#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif

            ViewBag.scripts = Kendo.Models.ScriptGroups.All;
            ViewBag.styles = Kendo.Models.StyleGroups.All;

            return View();
        }

        public ActionResult MobileThemeBuilderIndex()
        {
            return RedirectPermanent(Url.Action("Index"));
        }
    }
}
