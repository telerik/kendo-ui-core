---
title: Overview
page_title: Scheduler Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Scheduler HtmlHelper for ASP.NET MVC."
slug: overview_schedulerhelper_aspnetmvc
previous_url: /helpers/scheduler/mvc-scheduler-overview
position: 1
---

# Scheduler HtmlHelper Overview

The Telerik UI Scheduler HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Scheduler widget.

The Scheduler displays a set of events, appointments, or tasks. It supports the display of scheduled events in different views&mdash;single days, whole weeks, or months, or as a list of tasks which need to be accomplished.

> As of the R1 2017 release, exceptions are no longer automatically removed when the user edits a series. Changes that are made to specific occurrences are persisted during series editing. If a series contains an exception, the Scheduler renders a **Reset Series** button within the **Edit** dialog of the series which allows the user to reset the series by removing existing exceptions.

* [Demo page for the Scheduler](https://demos.telerik.com/aspnet-mvc/scheduler)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which inherits the `ISchedulerEvent` interface.

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

1. Create a new action method which passes the `List` of projections to the view.

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

1. Add a Scheduler.

    ```ASPX
        <%= Html.Kendo().Scheduler<KendoUISchedulerDemo.Models.Projection>()
            .Name("scheduler")
            .Date(new DateTime(2013, 6, 13))
            .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
            .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
            .Editable(false)
            .Height(600)
            .BindTo(Model)
        %>
    ```
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

## Functionality and Features

* [Ajax binding]({% slug ajaxbinding_schedulerhelper_aspnetmvc %})
* [Adaptive rendering]({% slug adaptiverendering_schedulerhelper_aspnetmvc %})
* [Resources]({% slug resourcesscheduler_aspnetmvc %})
* [Scaffolding]({% slug scaffoldingscheduler_aspnetmvc %})

## Events

You can subscribe to all Scheduler [events](/api/scheduler). For a complete example on basic Scheduler events, refer to the [demo on using the events of the Scheduler](https://demos.telerik.com/aspnet-mvc/scheduler/events). For a runnable example on the `move` and `resize` events, refer to the [demo on the specific events](https://demos.telerik.com/aspnet-mvc/scheduler/move-resize).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
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
            // Handle the dataBound event.
        }

        function scheduler_dataBinding(e) {
            // Handle the dataBinding event.
        }
    </script>
```
```Razor
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
            // Handle the dataBound event.
        }

        function scheduler_dataBinding(e) {
            // Handle the dataBinding event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

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
                    // Handle the dataBound event.
                }
            </text>);
            e.DataBinding(@<text>
                function (e) {
                    // Handle the dataBinding event.
                }
            </text>);
        })
    )

## Referencing Existing Instances

To reference an existing Scheduler instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Scheduler client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#methods) to control its behavior.  

    // Place the following after the Scheduler for ASP.NET MVC declaration.
    <script>
        $(function () {
            // The Name() of the Scheduler is used to get its client-side instance.
            var scheduler = $("#scheduler").data("kendoScheduler");
        });
    </script>

## See Also

* [Basic Usage of the Scheduler HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/scheduler)
* [Using the API of the Scheduler HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/scheduler/api)
* [SchedulerBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/SchedulerBuilder)
* [Scheduler Server-Side API](/api/scheduler)
