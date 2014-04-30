using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public class SuiteController : Controller
    {
        public ActionResult Index()
        {
            var widgets = NavigationProvider.SuiteWidgets().Where(widget => widget.ShouldInclude);

            ViewBag.Navigation = widgets;

            return View();
        }

    }
}
