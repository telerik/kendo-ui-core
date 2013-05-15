namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class SchedulerEvent : ISchedulerEvent
    {
        public int Id
        {
            get;
            set;
        }

        [Required]
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
        public bool AllDayEvent
        {
            get;
            set;
        }

        [Required]
        public DateTime Start
        {
            get;
            set;
        }

        [Required]
        public DateTime End
        {
            get;
            set;
        }

        public IList<string> RecurrenceRules
        {
            get;
            set;
        }
    }
}
