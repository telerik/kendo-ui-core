---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Scheduler TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/scheduler, /helpers/tag-helpers/scheduler
slug: taghelpers_scheduler_aspnetcore
position: 1
---

# Scheduler TagHelper Overview

The Telerik UI Scheduler TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Scheduler widget.

The Scheduler displays a set of events, appointments, or tasks. It supports the display of scheduled events in different views&mdash;single days, whole weeks, or months, or as a list of tasks which need to be accomplished.

> As of the Kendo UI for jQuery R1 2017 release, exceptions are no longer automatically removed when the user edits a series. Changes that are made to specific occurrences are persisted during series editing. If a series contains an exception, the Scheduler renders a **Reset Series** button within the **Edit** dialog of the series which allows the user to reset the series by removing existing exceptions.

* [Demo page for the Scheduler](https://demos.telerik.com/aspnet-core/scheduler/tag-helper)

## Initializing the Scheduler

The following example demonstrates how to define the Scheduler by using the Scheduler TagHelper.

    <kendo-scheduler name="scheduler"></kendo-scheduler>

## Basic Configuration

The Scheduler TagHelper configuration options are passed as attributes of the tag. For more details on the Scheduler configurations, refer to the overview of the [MVC Scheduler HtmlHelper](https://docs.telerik.com/aspnet-mvc/helpers/scheduler) and the [Kendo Scheduler for jQuery](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler).

```cshtml
        @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Views(views =>
        {
                views.DayView();
                views.WorkWeekView(workWeekView =>
                {
                workWeekView.Selected(true);
                });
                views.WeekView();
                views.MonthView();
                views.AgendaView();
                views.TimelineView();
        })
        .Timezone("Etc/UTC")
        .Resources(resource =>
        {
                resource.Add(m => m.OwnerID)
                .Title("Owner")
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] {
                        new { Text = "Alex", Value = 1, Color = "#f8a398" } ,
                        new { Text = "Bob", Value = 2, Color = "#51a0ed" } ,
                        new { Text = "Charlie", Value = 3, Color = "#56ca85" }
                });
        })
        .DataSource(d => d
                .Events(e => e.Error("onError"))
                .Model(m =>
                {
                m.Id(f => f.TaskID);
                m.Field(f => f.Title).DefaultValue("No title");
                m.Field(f => f.OwnerID).DefaultValue(1);
                m.RecurrenceId(f => f.RecurrenceID);
                })
                .Read("Read", "Scheduler")
                .Create("Create", "Scheduler")
                .Destroy("Destroy", "Scheduler")
                .Update("Update", "Scheduler")
                .Filter(filters =>
                {
                filters.Add(model => model.OwnerID).IsEqualTo(1).Or().IsEqualTo(2);
                })
        )
        )
```
```tagHelper
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

## Functionality and Features

* [Selection of events]({% slug selection_scheduler_aspnetcore %})
* [Grouping]({% slug grouping_scheduler_aspnetcore %})

## See Also

* [Basic Usage of the Scheduler TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/scheduler/tag-helper)
* [Server-Side API](/api/scheduler)
