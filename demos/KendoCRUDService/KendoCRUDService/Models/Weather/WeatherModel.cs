using System;
using System.Linq;

namespace KendoCRUDService.Models
{
    public class WeatherModel
    {
        public DateTime Date { get; set; }

        public decimal TMax { get; set; }

        public decimal TMin { get; set; }

        public decimal Wind { get; set; }

        public decimal Rain { get; set; }
    }
}