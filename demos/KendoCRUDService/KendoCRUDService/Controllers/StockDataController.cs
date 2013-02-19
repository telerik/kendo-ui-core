using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using KendoCRUDService.Common;
using KendoCRUDService.Models;
using KendoCRUDService.Models.EF;

namespace KendoCRUDService.Controllers
{
    public class StockDataController : Controller
    {
        private readonly DateTime MIN_DATE = new DateTime(1990, 1, 1);
        private readonly BaseUnit DEFAULT_UNIT = BaseUnit.Months;
        private const int DAYS_PER_WEEK = 7;
        private const int DAYS_PER_MONTH = 31;
        private const int TARGET_RESULT_SIZE = 75;

        public ActionResult Index()
        {
            var dateFrom = MIN_DATE;
            var dateTo = DateTime.Now;
            var baseUnit = DEFAULT_UNIT;
            IEnumerable<StockDataPoint> result;

            using (var db = new SampleEntities())
            {
                var filter = this.DeserializeObject<DataFilter>("filter");
                if (filter != null && filter.Filters != null)
                {
                    dateFrom = DateTime.Parse(filter.Filters[0].Value.ToString());
                    dateTo = DateTime.Parse(filter.Filters[1].Value.ToString());
                    baseUnit = GetBaseUnit(dateFrom, dateTo);
                }

                var groupedData =
                    from s in db.Intraday
                    where s.Date >= dateFrom && s.Date <= dateTo
                    group s by new
                    {
                        Year = s.Date.Year,
                        Month = baseUnit >= BaseUnit.Months ? s.Date.Month : 1,
                        Day = baseUnit >= BaseUnit.Weeks ? s.Date.Day : 1,
                        Hour = baseUnit >= BaseUnit.Hours ? s.Date.Hour : 0,
                        Minute = baseUnit >= BaseUnit.Minutes ? s.Date.Minute : 0
                    } into g
                    select g;

                var points =
                    from g in groupedData.ToList()
                    select new StockDataPoint
                    {
                        Date = new DateTime(g.Key.Year, g.Key.Month, g.Key.Day, g.Key.Hour, g.Key.Minute, 0),
                        Open = g.Max(s => s.Open),
                        High = g.Max(s => s.High),
                        Low = g.Min(s => s.Low),
                        Close = g.Max(s => s.Close),
                        Volume = g.Sum(s => s.Volume)
                    };

                result = points.ToList();
            }

            return this.Jsonp(result);
        }

        private BaseUnit GetBaseUnit(DateTime dateFrom, DateTime dateTo)
        {
            var diff = dateTo.Subtract(dateFrom);
            var days = diff.TotalDays;
            var result = BaseUnit.Years;

            // Try to maintain groups count below TARGET_RESULT_SIZE
            if (diff.TotalMinutes < TARGET_RESULT_SIZE)
            {
                result = BaseUnit.Minutes;
            }
            else if (diff.TotalHours < TARGET_RESULT_SIZE)
            {
                result = BaseUnit.Hours;
            }
            else if (days < TARGET_RESULT_SIZE)
            {
                result = BaseUnit.Days;
            }
            else if (days / DAYS_PER_WEEK < TARGET_RESULT_SIZE)
            {
                result = BaseUnit.Weeks;
            }
            else if (days / DAYS_PER_MONTH < TARGET_RESULT_SIZE)
            {
                result = BaseUnit.Months;
            }

            return result;
        }
    }
}
