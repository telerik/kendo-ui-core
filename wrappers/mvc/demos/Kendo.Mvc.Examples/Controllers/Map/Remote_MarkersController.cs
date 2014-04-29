using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MapController : Controller
    {
        public ActionResult Remote_Markers()
        {
            return View();
        }

        [HttpPost]
        public ActionResult _StoreLocations()
        {
            return Json(MapDataRepository.StoreLocations());
        }
    }
}
