using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Bullet_ChartsController : Controller
    {
        public ActionResult Remote_Data()
        {
            return View();
        }

        [HttpPost]
        public ActionResult _AprilSales()
        {
            return Json(ChartDataRepository.AprilSalesData());
        }
    }
}