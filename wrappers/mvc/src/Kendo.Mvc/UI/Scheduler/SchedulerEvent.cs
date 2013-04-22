using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI
{
    public class SchedulerEvent : ISchedulerEvent
    {
        //content lines
        public string Title { get; set; }
        public string Description { get; set; }

        //duration
        public bool AllDayEvent { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public IList<string> RecurrenceRules { get; set; }
    }
}
