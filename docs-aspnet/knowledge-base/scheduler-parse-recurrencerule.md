---
title: Parse the Scheduler RecurrenceRule with ical.net
description: An example on how parse the RecurrenceRule of a recurring event in the Telerik UI for ASP.NET Core Scheduler.
type: how-to
page_title: Parse Scheduler RecurrenceRule with ical.net
slug: scheduler-parse-recurrencerule
tags: aspnet, core, dotnet-core, scheduler, parse, recurrence, recurrencerule, ical
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Scheduler for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
</table>

## Description

How can I parse the RecurrenceRule of the Scheduler and get the dates of all the occurrences in a recurring event?

## Solution

You can use the [ical.net](https://github.com/rianjs/ical.net) library to parse the RecurrenceRule. The example below demonstrates how this can be done in the `Create` action, which will be called when a new recurring event is added in the Scheduler. 

```Controler
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        private List<AppointmentViewModel> appointments = new List<AppointmentViewModel> {
            new AppointmentViewModel {
                Description = "Task 1 Description",
                Title = "Task 1",
                Start = new DateTime(2020,6,17,12,00,00),
                End= new DateTime(2020,6,17,12,06,00),
                OwnerID = 1
            },
            new AppointmentViewModel {
                Description = "Task 2 Description",
                Title = "Task 2",
                Start = new DateTime(2020,6,17,14,00,00),
                End= new DateTime(2020,6,17,15,00,00),
                OwnerID = 2
            },
            new AppointmentViewModel {
                Title = "Test",
                Start = new DateTime(2020,6,17,10,00,00),
                End= new DateTime(2020,6,17,11,00,00),
                RecurrenceRule = "FREQ=DAILY;COUNT=3",
                OwnerID = 2
            }
        };

        public JsonResult Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(appointments.ToDataSourceResult(request));
        }

        public virtual JsonResult Delete([DataSourceRequest] DataSourceRequest request, AppointmentViewModel task)
        {
            if (ModelState.IsValid)
            {
                appointments.Remove(appointments.Where(x => x.AppointmentID == task.AppointmentID).FirstOrDefault());
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Create([DataSourceRequest] DataSourceRequest request, AppointmentViewModel task)
        {
            if (task.RecurrenceRule != null)
            {
                //pass the event's RecurrenceRule to a new RecurrencePattern instance
                var rrule = new RecurrencePattern(task.RecurrenceRule);
                var vEvent = new CalendarEvent
                {
                    //create a CalendarEvent instance and pass the actual Start and End values of the event
                    DtStart = new CalDateTime(task.Start),
                    DtEnd = new CalDateTime(task.End),
                    RecurrenceRules = new List<RecurrencePattern> { rrule },
                };

                var calendar = new Ical.Net.Calendar();
                calendar.Events.Add(vEvent);

                //get the occurrences within a specified time period
                var startSearch = new CalDateTime(task.Start);
                var endSearch = new CalDateTime(new DateTime(2020, 6, 30, 00, 00, 00));
                var occurrences = calendar.GetOccurrences(startSearch, endSearch);

                foreach(Occurrence occurrence in occurrences)
                {
                    //iterate the occurrences. You can access their StartTime and EndTime like this:
                    DateTime start = occurrence.Period.StartTime.Value;
                    DateTime end = occurrence.Period.EndTime.Value;
                }
            }

            if (ModelState.IsValid)
            {
                task.AppointmentID = ++appointments.LastOrDefault().AppointmentID;
                appointments.Add(task);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Update([DataSourceRequest] DataSourceRequest request, AppointmentViewModel task)
        {
            if (ModelState.IsValid)
            {
                var appointmentToUpdate = appointments.Where(x => x.AppointmentID == task.AppointmentID).FirstOrDefault();
                if (appointmentToUpdate != null)
                {
                    appointmentToUpdate = task;
                }
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }
    }
```
```Razor
    @(Html.Kendo().Scheduler<TelerikAspNetCoreApp1.Models.AppointmentViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2020, 6, 17))
        .StartTime(new DateTime(2020, 6, 17, 7, 00, 00))
        .Height(800)
        .AllDaySlot(false)
        .Group(group => group.Resources("Players"))
        .Views(views =>
        {
            views.DayView(dayView => { dayView.Selected(true); });
        })
        .Resources(resource =>
        {
        resource.Add(m => m.OwnerID)
            .Title("Owner")
            .Name("Players")
            .DataTextField("ResourceName")
            .DataValueField("ResourceID")
            .DataColorField("Color")
            .BindTo(new[] {
                    new { ResourceName = "Rate", ResourceID = 5},
                    new { ResourceName = "Holes", ResourceID = 6},
                    new { ResourceName = "Player 1", ResourceID = 1},
                    new { ResourceName = "Player 2", ResourceID = 2},
                    new { ResourceName = "Player 3", ResourceID = 3},
                    new { ResourceName = "Player 4", ResourceID = 4}
            });
        })
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.AppointmentID);
                m.Field(f => f.Title).DefaultValue("No title");
                m.Field(f => f.OwnerID).DefaultValue(1);
                m.RecurrenceId(f => f.RecurrenceID);
            })
            .Read(r => r.Url(Url.Action("Read", "Home")))
            .Create(r => r.Url(Url.Action("Create", "Home")))
            .Destroy(r => r.Url(Url.Action("Delete", "Home")))
            .Update(r => r.Url(Url.Action("Update", "Home")))
        )
    )
```
```Model
    public class AppointmentViewModel : ISchedulerEvent
    {
        public int AppointmentID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        private DateTime start;
        public DateTime Start
        {
            get
            {
                return start;
            }
            set
            {
                start = value.ToUniversalTime();
            }
        }

        public string StartTimezone { get; set; }

        private DateTime end;
        public DateTime End
        {
            get
            {
                return end;
            }
            set
            {
                end = value.ToUniversalTime();
            }
        }

        public string EndTimezone { get; set; }

        public string RecurrenceRule { get; set; }
        public int? RecurrenceID { get; set; }
        public string RecurrenceException { get; set; }
        public bool IsAllDay { get; set; }
        public int? OwnerID { get; set; }
    }
```

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
