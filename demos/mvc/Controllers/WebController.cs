using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class WebController : Controller
    {
        //
        // GET: /Web/

        public ActionResult Index(string section, string example)
        {
            ViewBag.section = section;
            ViewBag.example = example;
            return View();
        }

    }
}
