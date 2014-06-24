using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class TreeMapController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult _PopulationUSA()
        {
            return Json(TreeMapDataRepository.PopulationUSAData(), JsonRequestBehavior.AllowGet);
        }
    }
}