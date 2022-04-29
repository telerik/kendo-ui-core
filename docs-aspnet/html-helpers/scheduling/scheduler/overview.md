---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Scheduler component for {{ site.framework }}."
previous_url: /helpers/html-helpers/scheduler, /helpers/scheduling/scheduler/overview
slug: htmlhelpers_scheduler_aspnetcore
position: 1
---

# Scheduler Overview

{% if site.core %}
The Telerik UI Scheduler TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Scheduler widget.
{% else %}
The [Telerik UI Scheduler HtmlHelper for {{ site.framework }}](https://www.telerik.com/aspnet-core-ui/scheduler) is a server-side wrapper for the Kendo UI Scheduler widget.
{% endif %}

The Scheduler displays a set of events, appointments, or tasks. It supports the display of scheduled events in different views&mdash;single days, whole weeks, or months, or as a list of tasks which need to be accomplished.

> As of the R1 2017 release, exceptions are no longer automatically removed when the user edits a series. Changes that are made to specific occurrences are persisted during series editing. If a series contains an exception, the Scheduler renders a **Reset Series** button within the **Edit** dialog of the series which allows the user to reset the series by removing existing exceptions.

* [Demo page for the Scheduler HtmlHelper](https://demos.telerik.com/{{ site.platform }}/scheduler/index)
{% if site.core %}
* [Demo page for the Scheduler TagHelper](https://demos.telerik.com/aspnet-core/scheduler/tag-helper)
{% endif %}

## Initializing the Scheduler

The following example demonstrates how to define the Scheduler.

```HtmlHelper
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
            views.TimelineView();
        })
        .Timezone("Etc/UTC")
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.TaskID);
                m.RecurrenceId(f => f.RecurrenceID);
                m.Field(f => f.Title).DefaultValue("No title");
                m.Field(f => f.OwnerID).DefaultValue(1);
            })
            .Read("Read", "Scheduler")
            .Create("Create", "Scheduler")
            .Destroy("Destroy", "Scheduler")
            .Update("Update", "Scheduler")
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    @{
        string defaultTitle = "No Title";
    }

    <kendo-scheduler name="scheduler"
        date="new DateTime(2013, 6, 13)"
        start-time="new DateTime(2013, 6, 13, 7, 0, 0, 0)"
        height="600"
        timezone="Etc/UTC">
        <views>
            <view type="day"></view>
            <view type="week" selected="true"></view>
            <view type="timeline"></view>
        </views>
        <scheduler-datasource type="@DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Read", "Scheduler")" />
                <create url="@Url.Action("Create", "Scheduler")" />
                <destroy url="@Url.Action("Destroy", "Scheduler")" />
                <update url="@Url.Action("Update", "Scheduler")" />
            </transport>
            <schema data="Data" total="Total" errors="Errors">
                <scheduler-model id="TaskID">
                    <fields>
                        <field name="TaskID" type="number"></field>
                        <field name="recurrenceId" from="RecurrenceID" type="number"></field>
                        <field name="title" from="Title" type="string" default-value="@defaultTitle"></field>
                        <field name="OwnerID" type="number" default-value="1"></field>
                    </fields>
                </scheduler-model>
            </schema>
        </scheduler-datasource>
    </kendo-scheduler>
```
{% endif %}
```Controller
    public class SchedulerController : Controller
    {
        private ISchedulerEventService<TaskViewModel> taskService;

        public SchedulerController(
            ISchedulerEventService<TaskViewModel> schedulerTaskService)
        {
            taskService = schedulerTaskService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public virtual JsonResult Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(taskService.GetAll().ToDataSourceResult(request));
        }

        public virtual JsonResult Destroy([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Delete(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Create([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Insert(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Update([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            //example custom validation:
            if (task.Start.Hour < 8 || task.Start.Hour > 22)
            {
                ModelState.AddModelError("start", "Start date must be in working hours (8h - 22h)");
            }

            if (ModelState.IsValid)
            {
                taskService.Update(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }
    }
```

## Basic Configuration

The following example demonstrates the basic configuration of the Scheduler.

```HtmlHelper
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>()
        .Name("scheduler")
        .CurrentTimeMarker(true)
        .Editable(true)
        .Date(new DateTime(2013, 6, 13))
        .Pdf(pdf => pdf
            .FileName("SchedulerExport.pdf")
            .ProxyURL(Url.Action("Pdf_Export_Save", "Scheduler"))
        )
        .Timezone("Etc/UTC")
        .Toolbar(t => t.Pdf())
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Views(views =>
        {
            views.DayView();
            views.WeekView();
            views.MonthView(monthView => monthView.Selected(true));
            views.AgendaView();
            views.TimelineView();
        })
        .Group(group => { group.Resources("Rooms"); group.Date(true); })
        .Resources(resource =>
        {
            resource.Add(m => m.RoomID)
                .Title("Room")
                .Name("Rooms")
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] {
                        new { Text = "Meeting Room 101", Value = 1, Color = "#6eb3fa" },
                        new { Text = "Meeting Room 201", Value = 2, Color = "#f58a8a" }
                });

        })
        .DataSource(d => d
                .Model(m =>
                {
                    m.Id(f => f.MeetingID);
                    m.Field(f => f.Title).DefaultValue("No title");
                    m.RecurrenceId(f => f.RecurrenceID);
                })
                .Read("Date_Grouping_Read", "Scheduler")
                .Create("Date_Grouping_Create", "Scheduler")
                .Destroy("Date_Grouping_Destroy", "Scheduler")
                .Update("Date_Grouping_Update", "Scheduler")
        )
    )
```
{% if site.core %}
```TagHelper
        @{
            var resources = new[]
            {
                new { Text = "Alex", Value = 1, Color = "#f8a398" },
                new { Text = "Bob", Value = 2, Color = "#51a0ed" },
                new { Text = "Charlie", Value = 3, Color = "#56ca85" },
            };
        }
        <kendo-scheduler name="scheduler" height="600" date="new DateTime(2013, 6, 13)" start-time="new DateTime(2013, 6, 13, 7, 0, 0, 0)" timezone="Etc/UTC">
            <views>
                <view type="day"></view>
                <view type="workWeek" selected="true"></view>
                <view type="week"></view>
                <view type="month"></view>
                <view type="agenda"></view>
                <view type="timeline"></view>
            </views>
            <resources>
                <resource name="Owner" datacolorfield="Color" datatextfield="Text" datavaluefield="Value" field="OwnerID" bind-to="@resources">
                </resource>
            </resources>
            <scheduler-datasource>
                <transport>
                    <read url="https://demos.telerik.com/kendo-ui/service/tasks" type="jsonp" />
                    <update url="https://demos.telerik.com/kendo-ui/service/tasks/update" type="jsonp" />
                </transport>
                <schema data="Data" total="Total" errors="Errors">
                    <scheduler-model id="TaskID">
                        <fields>
                            <field name="TaskID" type="number"></field>
                            <field name="title" from="Title" type="string"></field>
                            <field name="start" from="Start" type="date"></field>
                            <field name="end" from="End" type="date"></field>
                            <field name="description" from="Description" type="number"></field>
                            <field name="recurrenceId" type="number" from="RecurrenceID"></field>
                            <field name="recurrenceRule" type="string" from="RecurrenceRule"></field>
                            <field name="recurrenceException" type="string" from="RecurrenceException"></field>
                            <field name="OwnerID" type="number"></field>
                            <field name="startTimezone" from="StartTimeZone" type="string"></field>
                            <field name="endTimezone" from="EndTimeZone" type="string"></field>
                            <field name="isAllDay" from="IsAllDay" type="boolean"></field>
                        </fields>
                    </scheduler-model>
                </schema>
            </scheduler-datasource>
        </kendo-scheduler>
```
{% endif %}

## Functionality and Features

* [Binding]({% slug htmlhelpers_scheduler_ajaxbinding_aspnetcore %})
* [Adaptive Rendering]({% slug htmlhelpers_scheduler_adaptiverendering_aspnetcore %})
* [Resources]({% slug htmlhelpers_scheduler_resources_aspnetcore %})
* [Timezones]({% slug htmlhelpers_scheduler_timezones_aspnetcore %})

## Events

You can subscribe to all Scheduler events. For a complete example on basic Scheduler events, refer to the [demo on using the events of the Scheduler](https://demos.telerik.com/{{ site.platform }}/scheduler/events). For a runnable example on the `move` and `resize` events, refer to the [demo on the specific events](https://demos.telerik.com/{{ site.platform }}/scheduler/move-resize).

The following example demonstrates how to subscribe to the `dataBound` and `dataBinding` events.

```HtmlHelper
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

## Referencing Existing Instances

To reference an existing Telerik UI Scheduler instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Scheduler client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#methods) to control its behavior.

    // Place the following after your Telerik UI Scheduler for {{ site.framework }} declaration.
    <script>
        $(document).ready(function() {
            // The Name() of the Scheduler is used to get its client-side instance.
            var scheduler = $("#scheduler").data("kendoScheduler");
        });
    </script>

## See Also

* [Basic Usage of the Scheduler HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler)
{% if site.core %}
* [Basic Usage of the Scheduler TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/scheduler/tag-helper)
{% endif %}
* [Using the API of the Scheduler HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/api)
* [Server-Side API](/api/scheduler)
