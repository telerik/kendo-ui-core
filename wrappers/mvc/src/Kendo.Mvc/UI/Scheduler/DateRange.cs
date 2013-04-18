using System;

namespace Kendo.Mvc.UI
{
    public class DateRange
    {
        public DateRange(DateTime start, DateTime end)
        {
            this.Start = start;
            this.End = end;
        }

        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
