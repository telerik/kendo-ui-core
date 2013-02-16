using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MenuController : Controller
    {
        public ActionResult Animation(string animation, bool? opacity, int? delay)
        {
            ViewBag.animation = animation ?? "toggle";
            ViewBag.opacity = opacity ?? true;
            ViewBag.delay = delay ?? 100;
            return View();
        }
    }
}
