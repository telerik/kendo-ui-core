using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Models.Scheduler
{
    public partial class SchedulerEvent : ISchedulerEvent
    {
        public IList<string> RecurrenceRules
        {
            get;
            set;
        }
    }
}