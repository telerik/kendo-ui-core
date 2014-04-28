using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class MobileDeviceController : BaseController
    {
        //
        // GET: /m
        public ActionResult Index()
        {
#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif
            LoadNavigation();
            return View();
        }

        //
        // GET: /m/{section}/{example}
        public ActionResult Example(string section, string example)
        {
            return View(
                string.Format("~/Views/demos/{0}/{1}.cshtml", section, example),
                "~/Views/Shared/NoLayout.cshtml"
            );
        }
    }
}
