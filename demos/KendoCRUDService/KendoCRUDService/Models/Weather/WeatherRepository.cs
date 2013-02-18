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
            var sessionKey = "Weather" + station;
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
    }
}