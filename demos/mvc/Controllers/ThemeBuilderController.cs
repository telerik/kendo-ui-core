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

            return View();
        }

        public ActionResult ThemeBuilderIndex()
        {
            return RedirectPermanent(Url.Action("Index"));
        }
    }
}
