using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class IntegrationController : BaseController
    {
        //
        // GET: /m
        public ActionResult Sushi()
        {
#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif
            return View();
        }
    }
}
