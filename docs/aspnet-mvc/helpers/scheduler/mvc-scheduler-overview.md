---
title: Overview
page_title: Scheduler HtmlHelper extension | Kendo UI documentation
description: How to add Scheduler HtmlHelper extension for Kendo UI Scheduler widget and operate values, access and existing server-side wrapper.
---

# Scheduler

The Scheduler HtmlHelper extension is a server-side wrapper for the [Kendo UI Scheduler](/api/web/scheduler) widget.



## Getting Started

Here is how to configure a simple Kendo Scheduler:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new Projection class which to inherit the ISchedulerEvent interface:


        public class Projection : ISchedulerEvent
        {
            public string Title { get; set; }
            public DateTime Start { get; set; }
            public DateTime End { get; set; }
            public string Description { get; set; }
            public bool IsAllDay { get; set; }
            public string Recurrence { get; set; }
            public string RecurrenceRule { get; set; }
            public string RecurrenceException { get; set; }
        }



2.  Create a new action method which to pass List of projections to the view:

        public ActionResult Index()
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
3.  Add a scheduler:
    - WebForms

            <%= Html.Kendo().Scheduler<KendoUISchedulerDemo.Models.Projection>()
                    .Name("scheduler")
                    .Date(new DateTime(2013, 6, 13))
                    .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
                    .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
                    .Editable(false)
                    .Height(600)
                    .BindTo(Model)
             %>
    - Razor

            @(Html.Kendo().Scheduler<KendoUISchedulerDemo.Models.Projection>()
                    .Name("scheduler")
                    .Date(new DateTime(2013, 6, 13))
                    .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
                    .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
                    .Editable(false)
                    .Height(600)
                    .BindTo(Model)
            )

## Accessing an Existing Scheduler

You can reference an existing Scheduler instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/scheduler#methods) to control its behavior.


### Accessing an existing Scheduler instance

    //Put this after your Kendo Scheduler for ASP.NET MVC declaration
    <script>
        $(function () {
            // Notice that the Name() of the scheduler is used to get its client-side instance
            var scheduler = $("#scheduler").data("kendoScheduler");
        });
    </script>


### Handling Kendo UI Scheduler events

You can subscribe to all [events](/api/web/scheduler#events) exposed by Kendo UI Scheduler:



### WebForms - subscribe by handler name

    <%=Html.Kendo().Scheduler<KendoUISchedulerDemo.Models.Projection>()
            .Name("scheduler")
            .Date(new DateTime(2013, 6, 13))
            .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
            .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
            .Editable(false)
            .Height(600)
            .BindTo(Model)
            .Events(e =>
            {
                e.DataBound("scheduler_dataBound");
                e.DataBinding("scheduler_dataBinding");
            })
     %>

     <script>
         function scheduler_dataBound(e) {
             //Handle the dataBound event
         }

         function scheduler_dataBinding(e) {
             //Handle the dataBinding event
         }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().Scheduler<KendoUISchedulerDemo.Models.Projection>()
            .Name("scheduler")
            .Date(new DateTime(2013, 6, 13))
            .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
            .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
            .Editable(false)
            .Height(600)
            .BindTo(Model)
            .Events(e => {
                e.DataBound("scheduler_dataBound");
                e.DataBinding("scheduler_dataBinding");
            })
    )

    <script>
        function scheduler_dataBound(e) {
            //Handle the dataBound event
        }

        function scheduler_dataBinding(e) {
            //Handle the dataBinding event
        }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Projection>()
            .Name("scheduler")
            .Date(new DateTime(2013, 6, 13))
            .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
            .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
            .Editable(false)
            .Height(600)
            .BindTo(Model)
            .Events(e => {
                e.DataBound(@<text>
                    function (e) {
                        //Handle the dataBound event
                    }
                </text>);
                e.DataBinding(@<text>
                    function (e) {
                        //Handle the dataBinding event
                    }
                </text>);
            })
    )
