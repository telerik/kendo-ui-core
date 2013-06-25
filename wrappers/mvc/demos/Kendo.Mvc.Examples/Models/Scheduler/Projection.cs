namespace Kendo.Mvc.Examples.Models.Scheduler
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using Kendo.Mvc.UI;

    public class Projection : ISchedulerEvent
    {
        public string Title { get; set; }

        public string Image { get; set; }

        public string Imdb { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public string Description { get; set; }

        public bool IsAllDay { get; set; }

        public string Recurrence { get; set; }

        public string RecurrenceRule { get; set; }

        public string RecurrenceException { get; set; }
    }
}