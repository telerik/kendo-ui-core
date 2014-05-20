using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class MobileAppsController : BaseController
    {
        public ActionResult Index(string app)
        {
#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif

            @ViewBag.App = app;
            return View("~/Views/demos/mobile-apps/Simulator.cshtml");
        }

        public ActionResult App(string app)
        {
#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif

            return View(
                string.Format("~/Views/demos/mobile-apps/{0}.cshtml", app)
            );
        }
    }
}
