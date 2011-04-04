using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AeroViewr.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult IndexMaster()
        {
            ViewBag.PageTitle = "AeroViewr";

            return View();
        }

        public ActionResult Index()
        {
            ViewBag.PageTitle = "AeroViewr";

            return View();
        }
    }
}