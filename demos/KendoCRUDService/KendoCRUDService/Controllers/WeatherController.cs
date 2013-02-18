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
    }
}
