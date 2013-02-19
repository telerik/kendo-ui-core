using System;
using System.Linq;
using System.Web.Mvc;
using KendoCRUDService.Models;
using KendoCRUDService.Common;

namespace KendoCRUDService.Controllers
{
    public class WeatherController : Controller
    {
        //
        // GET: /Weather/SOFIA

        public ActionResult Index(string station)
        {
            return this.Jsonp(WeatherRepository.ByStation(station));
        }

        //
        // GET: /Weather/SOFIA/2012/1
        // (January)

        public ActionResult ByMonth(string station, int year, int month)
        {
            return this.Jsonp(WeatherRepository.ByMonth(station, year, month));
        }
    }
}
