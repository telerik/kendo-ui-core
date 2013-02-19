using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KendoCRUDService.Models
{
    public static class WeatherRepository
    {
        public static IList<WeatherModel> ByStation(string station)
        {
            var sessionKey = "w_byStation_" + station;
            var result = HttpContext.Current.Session[sessionKey] as IList<WeatherModel>;

            if (result == null)
            {
                HttpContext.Current.Session[sessionKey] = result =
                    new SampleDataContext().Weather.Select(w => new WeatherModel
                     {
                         Date = w.Date,
                         TMax = w.TMax,
                         TMin = w.TMin,
                         Rain = w.Rain,
                         Wind = w.Wind
                     }).ToList();
            }

            return result;
        }

        public static IList<WeatherModel> ByMonth(string station, int year, int month)
        {
            var sessionKey = "w_byMonth_" + station + year + month;
            var result = HttpContext.Current.Session[sessionKey] as IList<WeatherModel>;

            if (result == null)
            {
                using (var db = new SampleDataContext()) {
                    HttpContext.Current.Session[sessionKey] = result =
                        ByStation(station)
                            .Where(w => w.Date.Year == year && w.Date.Month == month)
                            .ToList();
                }
            }

            return result;
        }
    }
}