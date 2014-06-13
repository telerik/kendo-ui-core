using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Range_Bar_ChartsController : Controller
    {
        public ActionResult Remote_Data_Binding()
        {
            return View();
        }

        [HttpPost]
        public ActionResult _DownloadSpeeds()
        {
            return Json(ChartDataRepository.DownloadSpeeds());
        }
    }
}
