using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Scatter_ChartsController : Controller
    {
        public ActionResult Multiple_Axes()
        {
            return View(ChartDataRepository.EngineData());
        }
    }
}