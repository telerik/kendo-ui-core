---
title: Resources
page_title: Resources | Telerik UI for ASP.NET Core Scheduler HtmlHelper
description: "Get started with the Scheduler HtmlHelper for ASP.NET Core and learn how to configure its resources."
slug: htmlhelpers_scheduler_resources_aspnetcore
position: 3
---

# Resources

The Scheduler HtmlHelper allows you to assign events to a set of predefined resources.

The widget supports multiple resources. Multiple instances of the same resource type can be assigned to a single Scheduler event. The Scheduler provides you with the option to assign resources via the Scheduler event edit form.

## Instance Resources

### Single Instance Resources

A single instance resource is a resource of which only one instance can be assigned to a Scheduler event. A typical example is a Scheduler displaying a list of meetings (Scheduler events), which are held in two rooms (resources). Since a meeting can be held in one room it can be considered a single resource.

The example below demonstrates how to use a single instance resource.

###### Example

```
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
        })
        .Timezone("Etc/UTC")
        .Resources(resource =>
        {
            resource.Add(m => m.RoomID) // The field of the Scheduler event, which contains the resource identifier.
                .Title("Room") // The label displayed in the Scheduler edit form for this resource.
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
                    m.Field(f => f.Title).DefaultValue("No title");
                })
            .Read("Meetings_Read", "Scheduler")
            .Create("Meetings_Create", "Scheduler")
            .Destroy("Meetings_Destroy", "Scheduler")
            .Update("Meetings_Update", "Scheduler")
        )
    )
```

If a resource instance has its `color` field set, the Scheduler will use this value as background for all events assigned to that instance.

### Multiple Instance Resources

A multiple instance resource is a resource of which more than one instance can be assigned to a Scheduler event. A typical example is a Scheduler displaying a list of meetings and the meeting attendees. Since more than one attendee can participate in a meeting, it can be considered a multiple instance resource.

The example below demonstrates how to use multiple instance resources.

###### Example

```
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
            views.MonthView();
            views.AgendaView();
            views.TimelineView();
        })
        .Timezone("Etc/UTC")
        .Resources(resource =>
        {
            resource.Add(m => m.Attendees) // The field of the Scheduler event, which contains the resource identifier.
                .Title("Attendees") // The label displayed in the Scheduler edit form for this resource.
                .Multiple(true) // Indicate that this is a multiple instance resource.
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] {
                        new { Text = "Alex", Value = 1, Color = "#f8a398" },
                        new { Text = "Bob", Value = 2, Color = "#51a0ed" },
                        new { Text = "Charlie", Value = 3, Color = "#56ca85" }
                });
        })
        .DataSource(d => d
                .Model(m =>
                {
                    m.Id(f => f.MeetingID);
                    m.Field(f => f.Title).DefaultValue("No title");
                    m.RecurrenceId(f => f.RecurrenceID);
                    m.Field(f => f.Title).DefaultValue("No title");
                })
            .Read("Meetings_Read", "Scheduler")
            .Create("Meetings_Create", "Scheduler")
            .Destroy("Meetings_Destroy", "Scheduler")
            .Update("Meetings_Update", "Scheduler")
        )
    )
```

The scheduler will use the `color` of the first resource instance as background for the Scheduler events.

## Multiple Resource Types

Kendo UI Scheduler supports multiple resource types. For example, you are able to combine a single and multiple instance resources at the same time, as demonstrated in the example below.

###### Example

```
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
            views.MonthView();
            views.AgendaView();
            views.TimelineView();
        })
        .Timezone("Etc/UTC")
        .Resources(resource =>
        {
            // First resource type definition
            resource.Add(m => m.RoomID) // The field of the Scheduler event, which contains the resource identifier.
                .Title("Room") // The label displayed in the Scheduler edit form for this resource.
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] {
                        new { Text = "Meeting Room 101", Value = 1, Color = "#6eb3fa" },
                        new { Text = "Meeting Room 201", Value = 2, Color = "#f58a8a" }
                });
            // Second resource type definition
            resource.Add(m => m.Attendees) // The field of the Scheduler event, which contains the resource identifier.
                .Title("Attendees") // The label displayed in the Scheduler edit form for this resource.
                .Multiple(true) // Indicate that this is a multiple instance resource.
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] {
                        new { Text = "Alex", Value = 1, Color = "#f8a398" },
                        new { Text = "Bob", Value = 2, Color = "#51a0ed" },
                        new { Text = "Charlie", Value = 3, Color = "#56ca85" }
                });
        })
        .DataSource(d => d
                .Model(m =>
                {
                    m.Id(f => f.MeetingID);
                    m.Field(f => f.Title).DefaultValue("No title");
                    m.RecurrenceId(f => f.RecurrenceID);
                    m.Field(f => f.Title).DefaultValue("No title");
                })
            .Read("Meetings_Read", "Scheduler")
            .Create("Meetings_Create", "Scheduler")
            .Destroy("Meetings_Destroy", "Scheduler")
            .Update("Meetings_Update", "Scheduler")
        )
    )
```

## Further Reading

For more information on how to configure Kendo UI resources, see [this API article](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/resources).

To build a better understanding of resources, see the [online demo](https://demos.telerik.com/aspnet-core/scheduler/resources).

## See  Also

* [Overview of the Scheduler HtmlHelper]({% slug htmlhelpers_scheduler_aspnetcore %})
* [JavaScript API Reference of the Scheduler](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug knownissues_aspnetmvc6_aspnetmvc %})
