using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kendo.Mvc.UI;
using System.Data;

namespace Kendo.Mvc.Examples.Models.Scheduler
{
    public partial class Task : ISchedulerEvent
    {
        private new EntityKey EntityKey { get; set; }

        private new EntityState EntityState { get; set; }
    }
}