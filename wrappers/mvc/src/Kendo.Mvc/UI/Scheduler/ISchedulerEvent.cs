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

        //Recurrence
        string Recurrence
        {
            get;
            set;
        }
    }
}
