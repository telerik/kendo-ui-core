using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public class ChartController : Controller
    {
        public ActionResult _SpainElectricity()
        {
            return Json(SpainElectricityStats.GetProductionByYear());
        }

        public ActionResult _SpainElectricitySources()
        {
            return Json(SpainElectricityStats.GetSourceBreakdown());
        }
    }
}
