using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.UI;
using Kendo.Mvc.Examples.Models.Scheduler;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class SchedulerController : SchedulerEventController<SchedulerEvent>
    {
        public SchedulerController()
            : base(new SchedulerEventService<SchedulerEvent>())
        {
        }

        public ActionResult Index()
        {
            return View();
        }

    }
}
