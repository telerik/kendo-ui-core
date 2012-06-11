using System;

namespace Kendo.Mvc.Examples.Models
{
    public class StockDataPoint
    {
        public DateTime Date { get; set; }

        public double Close { get; set; }

        public int Volume { get; set; }
        
        public double Open { get; set; }

        public double High { get; set; }

        public double Low { get; set; }

        public string Symbol { get; set; }
    }
}
