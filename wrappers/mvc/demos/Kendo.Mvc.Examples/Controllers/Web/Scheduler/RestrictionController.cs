namespace Kendo.Mvc.Examples.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.Examples.Models.Scheduler;

    public partial class SchedulerController
    {
        public ActionResult Restriction()
        {
            var meetings = new List<MeetingViewModel> {
                new MeetingViewModel {
                    MeetingID = 1,
                    Title = "Call Charlie about the project",
                    Start = new DateTime(2013,6,13,10,30,00 , DateTimeKind.Utc),
                    End = new DateTime(2013,6,13,11,30,00, DateTimeKind.Utc),
                    RoomID = 1,
                    Atendees = new [] { 1 } 
                },
                new MeetingViewModel {
                    MeetingID = 2,
                    Title = "Call Charlie about the project",
                    Start = new DateTime(2013,6,13,9,00,00 , DateTimeKind.Utc),
                    End = new DateTime(2013,6,13,12,30,00, DateTimeKind.Utc),
                    RoomID = 2,
                    Atendees = new [] { 2 } 
                },
                new MeetingViewModel {
                    MeetingID = 1,
                    Title = "Call Charlie about the project",
                    Start = new DateTime(2013,6,13,13,00,00 , DateTimeKind.Utc),
                    End = new DateTime(2013,6,13,14,30,00, DateTimeKind.Utc),
                    RoomID = 1,
                    Atendees = new [] { 1 } 
                }
            };

            return View(meetings);
        }
    }
}
