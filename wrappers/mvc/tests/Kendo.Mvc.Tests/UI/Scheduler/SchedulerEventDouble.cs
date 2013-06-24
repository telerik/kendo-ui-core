namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Kendo.Mvc.UI;

    public class SchedulerEventDouble : ISchedulerEvent
    {
        public int Id { get; set; }

        public string Title
        {
            get;
            set;
        }

        public string Description
        {
            get;
            set;
        }

        public bool IsAllDay
        {
            get;
            set;
        }

        public System.DateTime Start
        {
            get;
            set;
        }

        public System.DateTime End
        {
            get;
            set;
        }

        public string Recurrence
        {
            get;
            set;
        }


        public string RecurrenceRule
        {
            get;
            set;
        }

        public string RecurrenceException
        {
            get;
            set;
        }
    }
}
