using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class WindowController : Controller
    {
        public ActionResult Animation(string animation, bool? opacity)
        {
            ViewBag.animation = animation ?? "expand";
            ViewBag.opacity = opacity ?? true;            
            return View();
        }
    }
}
