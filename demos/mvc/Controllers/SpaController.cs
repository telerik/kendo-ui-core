using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class SpaController : BaseController
    {
        public ActionResult Sushi()
        {
#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif
            return View("~/Views/demos/spa/Sushi.cshtml");
        }

        public ActionResult Aeroviewr()
        {
#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif
            return View("~/Views/demos/spa/Aeroviewr.cshtml");
        }

        public ActionResult AeroviewrCallback()
        {
            return View("~/Views/demos/spa/AeroviewrCallback.cshtml");
        }
    }
}
