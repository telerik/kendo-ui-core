---
title: Overview
page_title: Overview | Kendo UI Scheduler HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Scheduler widget for ASP.NET MVC."
slug: overview_schedulerhelper_aspnetmvc
position: 1
---

# Scheduler

The Scheduler HtmlHelper extension is a server-side wrapper for the [Kendo UI Scheduler](https://demos.telerik.com/kendo-ui/scheduler/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Scheduler.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which inherits the `ISchedulerEvent` interface.

###### Example

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

**Step 3** Create a new action method which passes the `List` of projections to the view.

###### Example

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

**Step 4** Add a Scheduler.

###### Example

```tab-ASPX

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
```tab-Razor

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

## Event Handling

You can subscribe to all Scheduler [events](/api/javascript/ui/scheduler#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

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
                 //Handle the dataBound event.
             }

             function scheduler_dataBinding(e) {
                 //Handle the dataBinding event.
             }
        </script>
```
```tab-Razor

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
                //Handle the dataBound event.
            }

            function scheduler_dataBinding(e) {
                //Handle the dataBinding event.
            }
        </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

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
                              //Handle the dataBound event.
                          }
                      </text>);
                      e.DataBinding(@<text>
                          function (e) {
                              //Handle the dataBinding event.
                          }
                      </text>);
                  })
          )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI Scheduler instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Scheduler API](/api/javascript/ui/scheduler#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Scheduler for ASP.NET MVC declaration.
        <script>
            $(function () {
                //Notice that the Name() of the Scheduler is used to get its client-side instance.
                var scheduler = $("#scheduler").data("kendoScheduler");
            });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Scheduler:

* [ASP.NET MVC API Reference: SchedulerBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SchedulerBuilder)
* [Overview of the Scheduler HtmlHelper]({% slug overview_schedulerhelper_aspnetmvc %})
* [Ajax Binding of the Scheduler HtmlHelper]({% slug ajaxbinding_schedulerhelper_aspnetmvc %})
* [Scaffolding of the Scheduler HtmlHelper]({% slug scaffoldingscheduler_aspnetmvc %})
* [Resources of the Scheduler HtmlHelper]({% slug scaffoldingscheduler_aspnetmvc %})
* [Scheduler HtmlHelper How-To Examples]({% slug howto_bindtowebapicontroller_scheduleraspnetmvc %})
* [Overview of the Kendo UI Scheduler Widget]({% slug overview_kendoui_scheduler_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
