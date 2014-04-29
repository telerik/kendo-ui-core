using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Polar_ChartsController : Controller
    {
        public ActionResult Smooth_Polar_Line()
        {
            return View(ChartDataRepository.SunPosition());
        }
    }
}