using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI
{
    public interface ISchedulerEvent
    {
        //content lines
        string Title { get; set; }
        string Description { get; set; }

        //duration
        bool AllDayEvent { get; set; }
        DateTime Start { get; set; }
        DateTime End { get; set; }
       
        //recurrence
        IList<string> RecurrenceRules { get; set; } //RRULE        
    }
}
