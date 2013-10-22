namespace Kendo.Mvc.UI
{
    using System;

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

        string StartTimezone
        {
            get;
            set;
        }

        string EndTimezone
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
