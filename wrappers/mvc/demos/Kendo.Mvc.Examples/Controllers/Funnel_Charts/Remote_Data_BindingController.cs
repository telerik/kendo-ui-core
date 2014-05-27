using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Funnel_ChartsController : Controller
    {
        public ActionResult Remote_Data_Binding()
        {   
            return View();
        }

        [HttpPost]
        public ActionResult SpainElectricityProduction()
        {
            return Json(ChartDataRepository.SpainElectricityProduction());
        }
    }
}