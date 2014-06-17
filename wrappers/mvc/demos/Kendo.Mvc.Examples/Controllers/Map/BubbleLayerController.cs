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
        public ActionResult Bubble_Layer()
        {
            return View();
        }

        [HttpPost]
        public ActionResult _UrbanAreas()
        {
            IEnumerable<UrbanArea> result;

            using (var db = new SampleEntities())
            {
                result = (from u in db.UrbanAreas select u).ToList();
            }

            return Json(result);
        }
    }
}
