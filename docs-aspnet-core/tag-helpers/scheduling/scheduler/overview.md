---
title: Overview
page_title: Scheduler | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Scheduler tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/scheduler, /aspnet-core/helpers/tag-helpers/scheduler
slug: taghelpers_scheduler_aspnetcore
position: 1
---

# Scheduler Tag Helper Overview

The Scheduler tag helper helps you configure the Kendo UI Scheduler widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Scheduler by using the Scheduler tag helper.

###### Example

<kendo-scheduler name="scheduler"></kendo-scheduler>

## Configuration

The Scheduler tag helper configuration options are passed as attributes of the tag. For more details on the Scheduler configurations, refer to the overview of the [MVC Scheduler HtmlHelper](https://docs.telerik.com/aspnet-mvc/helpers/scheduler) and the [Kendo Scheduler for jQuery](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler).

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

## Event Selection

The Scheduler supports selection of events. The `selectable` option is disabled by default.

```cshtml
        @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
        .Name("scheduler")
        .Height(600)
        .Selectable(true)
        )
```
```tagHelper
        <kendo-scheduler name="scheduler" height="600" selectable="true">
        </kendo-scheduler>
```

## Grouping

The Scheduler supports resource grouping. The `group.resources` option is disabled by default.

```cshtml
        @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
            .Name("scheduler")
            .Date(new DateTime(2013, 6, 13))
            .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
            .Height(600)
            .Group(group => { group.Resources("Owner"); })
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
        <kendo-scheduler name="scheduler" height="600" date="new DateTime(2013, 6, 13)" selectable="true" start-time="new DateTime(2013, 6, 13, 7, 0, 0, 0)" timezone="Etc/UTC">
            <views>
                <view type="day"></view>
                <view type="workWeek" selected="true"></view>
                <view type="week"></view>
                <view type="month"></view>
                <view type="agenda"></view>
                <view type="timeline"></view>
            </views>
            <group>
                <resources>
                    <group-resource name="Owner" />
                </resources>
            </group>
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

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
