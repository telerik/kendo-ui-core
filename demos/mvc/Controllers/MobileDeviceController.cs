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
            LoadNavigation("mobile");
            return View();
        }

        //
        // GET: /m/{section}/{example}.html
        public ActionResult Example(string section, string example)
        {
            return View(
                string.Format("~/Views/mobile/{0}/{1}.cshtml", section, example),
                "~/Views/Shared/NoLayout.cshtml"
            );
        }
    }
}
