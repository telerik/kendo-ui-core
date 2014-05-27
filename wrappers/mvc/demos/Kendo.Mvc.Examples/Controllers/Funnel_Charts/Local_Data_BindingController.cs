using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Funnel_ChartsController : Controller
    {
        public ActionResult Local_Data_Binding()
        {
            ViewData["before"] = ChartDataRepository.BeforeOptimizationData();
            ViewData["after"] = ChartDataRepository.AfterOptimizationData();
            return View();
        }
    }
}