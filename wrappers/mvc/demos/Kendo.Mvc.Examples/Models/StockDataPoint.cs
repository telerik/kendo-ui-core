using System;

namespace Kendo.Mvc.Examples.Models
{
    public class StockDataPoint
    {
        public DateTime Date { get; set; }

        public decimal Close { get; set; }

        public long Volume { get; set; }

        public decimal Open { get; set; }

        public decimal High { get; set; }

        public decimal Low { get; set; }

        public string Symbol { get; set; }
    }
}
