namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    public interface ISchedulerEvent
    {
        //Content Lines
        string Title
        {
            get;
            set;
        }
        string Description
        {
            get;
            set;
        }

        //Duration
        bool AllDayEvent
        {
            get;
            set;
        }
        DateTime Start
        {
            get;
            set;
        }
        DateTime End
        {
            get;
            set;
        }


        //Recurrence
        IList<string> RecurrenceRules
        {
            get;
            set;
        }
    }
}
