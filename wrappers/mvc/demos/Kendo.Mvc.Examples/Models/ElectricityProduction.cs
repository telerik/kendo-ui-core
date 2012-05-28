using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public class ElectricityProduction
    {
        public ElectricityProduction(int year, int solar, int hydro, int wind, int nuclear)
        {
            Year = year;
            Solar = solar;
            Hydro = hydro;
            Wind = wind;
            Nuclear = nuclear;
        }

        public int Year { get; set; }
        public int Solar { get; set; }
        public int Nuclear { get; set; }
        public int Hydro { get; set; }
        public int Wind { get; set; }
    }
}