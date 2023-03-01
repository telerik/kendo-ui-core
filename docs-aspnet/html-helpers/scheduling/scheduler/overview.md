---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Scheduler component for {{ site.framework }}."
previous_url: /helpers/html-helpers/scheduler, /helpers/scheduling/scheduler/overview
slug: htmlhelpers_scheduler_aspnetcore
position: 1
---

# {{ site.framework }} Scheduler Overview

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
                        <field name="title" from="Title" type="string" default-value="@defaultTitle"></field>
                        <field name="start" from="Start" type="date"></field>
                        <field name="end" from="End" type="date"></field>
                        <field name="description" from="Description" type="string"></field>
                        <field name="recurrenceId" from="RecurrenceID" type="number" default-value=null></field>
                        <field name="recurrenceRule" from="RecurrenceRule" type="string" ></field>
                        <field name="recurrenceException" from="RecurrenceException" type="string"></field>
                        <field name="startTimezone" from="StartTimezone" type="string"></field>
                        <field name="endTimezone" from="EndTimezone" type="string"></field>
                        <field name="isAllDay" from="IsAllDay" type="boolean"></field>
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
        var roomsData = new[]
        {
            new { Text = "Meeting Room 101", Value = 1, Color = "#6eb3fa" },
            new { Text = "Meeting Room 201", Value = 2, Color = "#f58a8a" }
        };

        string defaultTitle = "No Title";
    }
    <kendo-scheduler name="scheduler" 
        date="new DateTime(2013, 6, 13)" 
        start-time="new DateTime(2013, 6, 13, 7, 00, 00)"
        timezone="Etc/UTC"
        height="600">
        <current-time-marker enabled="true" />
        <editable enabled="true" />
        <pdf file-name="SchedulerExport.pdf" proxy-url="@Url.Action("Pdf_Export_Save", "Scheduler")" />
        <toolbar>
            <scheduler-toolbar-button name="pdf"></scheduler-toolbar-button>
        </toolbar>
        <views>
            <view type="day"></view>
            <view type="week"></view>
            <view type="month" selected="true"></view>
            <view type="agenda"></view>
            <view type="timeline"></view>
        </views>
        <group orientation="vertical" date="true">
            <resources>
                <group-resource name="Rooms" />
            </resources>
        </group>
        <resources>
            <resource field="RoomID" title="Room" name="Rooms" datatextfield="Text" datavaluefield="Value" datacolorfield="Color" bind-to="@roomsData"></resource>
        </resources>
        <scheduler-datasource type="@DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Date_Grouping_Read", "Scheduler")" />
                <create url="@Url.Action("Date_Grouping_Create", "Scheduler")" />
                <destroy url="@Url.Action("Date_Grouping_Destroy", "Scheduler")" />
                <update url="@Url.Action("Date_Grouping_Update", "Scheduler")" />
            </transport>
            <schema data="Data" total="Total" errors="Errors">
                <scheduler-model id="MeetingID">
                    <fields>
                        <field name="MeetingID" type="number"></field>
                        <field name="title" from="Title" type="string" default-value="@defaultTitle"></field>
                        <field name="start" from="Start" type="date"></field>
                        <field name="end" from="End" type="date"></field>
                        <field name="description" from="Description" type="string"></field>
                        <field name="recurrenceId" from="RecurrenceID" type="number" default-value=null></field>
                        <field name="recurrenceRule" from="RecurrenceRule" type="string" ></field>
                        <field name="recurrenceException" from="RecurrenceException" type="string"></field>
                        <field name="startTimezone" from="StartTimezone" type="string"></field>
                        <field name="endTimezone" from="EndTimezone" type="string"></field>
                        <field name="isAllDay" from="IsAllDay" type="boolean"></field>
                    </fields>
                </scheduler-model>
            </schema>
        </scheduler-datasource>
    </kendo-scheduler>
```
{% endif %}

## Functionality and Features

* [Binding]({% slug htmlhelpers_scheduler_ajaxbinding_aspnetcore %})&mdash;You can use Ajax, server, or SignalR data-binding with the Scheduler.
* [Adaptive Rendering]({% slug htmlhelpers_scheduler_adaptiverendering_aspnetcore %})&mdash;The Scheduler supports adaptive enhancements, such as changes in styling and behavior in order to improve the user experience on different devices.
* [Resources]({% slug htmlhelpers_scheduler_resources_aspnetcore %})&mdash;You can assign resources to the Scheduler events.
* [Timezones]({% slug htmlhelpers_scheduler_timezones_aspnetcore %})&mdash;For global scheduling, you can set a timezone to the Scheduler. Then users from different time zones will see the correct event start and end times for their time zone. 

## Next Steps

* [Getting Started with the Scheduler]({% slug scheduler_aspnetcore_get_started %})
* [Basic Usage of the Scheduler HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/index)
{% if site.core %}
* [Basic Usage of the Scheduler TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/scheduler/tag-helper)
{% endif %}

## See Also

* [Using the API of the Scheduler HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/api)
* [Server-Side API](/api/scheduler)
