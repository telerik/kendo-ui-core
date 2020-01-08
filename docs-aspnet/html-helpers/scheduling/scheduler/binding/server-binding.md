---
title: Server Binding
page_title: Server Binding
description: "Get started with the Scheduler HtmlHelper for {{ site.framework }} and learn how to bind it to a model."
slug: htmlhelpers_scheduler_serverbinding_aspnetcore
position: 2
---

# Server Binding

You can bind the Scheduler to a model.

1. Create a new model which inherits the `ISchedulerEvent` interface.

        public class Projection : ISchedulerEvent
        {
            public string Title { get; set; }
            public DateTime Start { get; set; }
            public DateTime End { get; set; }
            public string Description { get; set; }
            public bool IsAllDay { get; set; }
            string StartTimezone { get; set; }
            string EndTimezone { get; set; }
            public string RecurrenceRule { get; set; }
            public string RecurrenceException { get; set; }
        }

1. Create a new action method which passes the `List` of projections to the view.

        public IActionResult Index()
        {
            List<Projection> cinemaSchedule = new List<Projection> {
                new Projection {
                    Title = "Fast and furious 6",
                    Start = new DateTime(2013,6,13,17,00,00),
                    End= new DateTime(2013,6,13,18,30,00)
                },
                new Projection {
                    Title= "The Internship",
                    Start= new DateTime(2013,6,13,14,00,00),
                    End= new DateTime(2013,6,13,15,30,00)
                },
                new Projection {
                    Title = "The Perks of Being a Wallflower",
                    Start =  new DateTime(2013,6,13,16,00,00),
                    End =  new DateTime(2013,6,13,17,30,00)
                }};

            return View(cinemaSchedule);
        }

1. Add a Scheduler.

    ```Razor
        @(Html.Kendo().Scheduler<KendoUISchedulerDemo.Models.Projection>()
            .Name("scheduler")
            .Date(new DateTime(2013, 6, 13))
            .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
            .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
            .Editable(false)
            .Height(600)
            .BindTo(Model)
        )
    ```


## See Also

* [Server-Side API](/api/scheduler)
