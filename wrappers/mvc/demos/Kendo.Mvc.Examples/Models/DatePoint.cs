using System;

namespace Kendo.Mvc.Examples.Models
{
    public class DatePoint
    {
        public DatePoint(double value, DateTime date)
        {
            Value = value;
            Date = date;
        }

        public DateTime Date { get; set; }
        public double Value { get; set; }
    }
}
