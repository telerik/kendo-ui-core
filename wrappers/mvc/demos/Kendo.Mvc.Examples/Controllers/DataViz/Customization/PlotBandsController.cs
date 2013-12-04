using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class CustomizationController : Controller
    {
        public ActionResult PlotBands()
        {
            return View();
        }

        [HttpPost]
        public ActionResult _SpainElectricityProduction()
        {
            return Json(ChartDataRepository.SpainElectricityProduction());
        }
    }
}