using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class SparklinesController : Controller
    {
        public ActionResult Remote_Data()
        {
            return View();
        }

        [HttpPost]
        public ActionResult _Weather(string station, int year, int month)
        {
            IEnumerable<Weather> result;

            using (var db = new WeatherDataContext())
            {
                var q = from w in db.Weather
                        where w.Station == station && w.Date.Year == year && w.Date.Month == month
                        select w;

                result = q.ToList();
            }

            return Json(result);
        }
    }
}