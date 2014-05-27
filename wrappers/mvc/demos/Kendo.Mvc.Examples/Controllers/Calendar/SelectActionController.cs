using System;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class CalendarController : Controller
    {
        public ActionResult SelectAction(DateTime? date)
        {
            ViewBag.date = date;

            return View();
        }
    }
}