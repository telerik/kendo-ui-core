using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Bubble_ChartsController : Controller
    {
        public ActionResult Grouped_Data()
        {
            return View();
        }

        public ActionResult _JobGrowthDataComparative()
        {
            return Json(ChartDataRepository.JobGrowthDataComparative());
        }
    }
}