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
        bool IsAllDay
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

        string RecurrenceRule
        {
            get;
            set;
        }

        string RecurrenceException
        {
            get;
            set;
        }
    }
}
