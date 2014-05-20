using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            if (IsMobileDevice())
            {
                return Redirect(Url.RouteUrl("MobileDeviceIndex"));
            }

            ViewBag.Product = CurrentProduct();
            LoadNavigation();
            LoadCategories();
#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif
            return View();
        }
    }
}
