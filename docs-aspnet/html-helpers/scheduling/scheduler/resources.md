---
title: Resources
page_title: Resources
description: "Get started with the Scheduler component for {{ site.framework }} and learn how to configure its resources."
previous_url: /helpers/scheduling/scheduler/mvc-scheduler-resources
slug: htmlhelpers_scheduler_resources_aspnetcore
position: 4
---

# Resources

The Scheduler allows you to assign events to a set of predefined resources.

You can assign multiple instances of the same resource type to a single Scheduler event and also assign resources through the Scheduler event edit form. For a runnable example, refer to the [demo on setting the Scheduler resources](https://demos.telerik.com/{{ site.platform }}/scheduler/resources).

## Single Instance Resources

A single instance resource is a resource of which only one instance can be assigned to a Scheduler event&mdash;for example, a Scheduler which displays a list of meetings (Scheduler events) which are held in two rooms (resources). Since a meeting can be held in one room, it can be considered a single resource. If a resource instance has its `color` field set, the Scheduler will use this value as a background for all events that are assigned to that instance.

```HtmlHelper
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
            resource.Add(m => m.RoomID) // The field of the Scheduler event which contains the resource identifier.
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
                })
            .Read("Meetings_Read", "Scheduler")
            .Create("Meetings_Create", "Scheduler")
            .Destroy("Meetings_Destroy", "Scheduler")
            .Update("Meetings_Update", "Scheduler")
        )
    )
```

## Multiple Instance Resources

A multiple instance resource is a resource of which more than one instance can be assigned to a Scheduler event&mdash;for example, a Scheduler which displays a list of meetings and the meeting attendees. Since more than one attendee can participate in a meeting, it can be considered a multiple instance resource. The Scheduler uses the `color` of the first resource instance as a background for its events.

```HtmlHelper
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
                })
            .Read("Meetings_Read", "Scheduler")
            .Create("Meetings_Create", "Scheduler")
            .Destroy("Meetings_Destroy", "Scheduler")
            .Update("Meetings_Update", "Scheduler")
        )
    )
```

## Multiple Resource Types

The Scheduler supports multiple resource types. For example, you can combine single and multiple instance resources at the same time.

```HtmlHelper
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
            resource.Add(m => m.Attendees) // The field of the Scheduler event which contains the resource identifier.
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
                })
            .Read("Meetings_Read", "Scheduler")
            .Create("Meetings_Create", "Scheduler")
            .Destroy("Meetings_Destroy", "Scheduler")
            .Update("Meetings_Update", "Scheduler")
        )
    )
```

## Hierarchical Resource Grouping

Starting with <strong>2021 R2</strong> release Scheduler supports hierarchical resource grouping. With this improvement, it is allowed to have different child resource groups for each parent resource member. For example, if Scheduler has 'Rooms' as parent resource, different Attendees could be assigned to each room. 
The `DataParentValueField` can be used to configure which is the field in the child resource that holds the parent value. If the child resource member has no parent value specified, it will be rendered for each of the parent resources. 

The order of the resources should follow the parent-child relation. The last resource could not be a parent. 
Only the last one of the resources could be configured to allow multiple instance resource.

```HtmlHelper
	@(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>()
		.Name("scheduler")
		.Date(new DateTime(2020,6 ,13))
		.Height(600)
		.Views(views =>
		{
			views.DayView();
			views.WeekView();
			views.MonthView(weekView => weekView.Selected(true));
			views.AgendaView();
			views.TimelineView();
		})
		.MajorTick(720)
		.Timezone("Etc/UTC")
		.Group(group => group.Resources("Rooms", "Attendees").Orientation(SchedulerGroupOrientation.Vertical))
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
			resource.Add(m => m.Attendees)
				.Title("Attendees")
				.Name("Attendees")
				.Multiple(true)
				.DataTextField("Text")
				.DataValueField("Value")
				.DataColorField("Color")
				.DataParentValueField("Parent")
				.BindTo(new List<SchedulerResourceModel>() {
						new SchedulerResourceModel(){ Text = "Alex", Color="red", Value = 1},
						new SchedulerResourceModel(){ Text = "Bob", Color="green",  Value = 2, Parent = 1 } ,
						new SchedulerResourceModel(){ Text = "Charlie",Color="yellow",  Value = 3, Parent = 2 }
				});
		})
		.DataSource(d => d
				.Model(m => {
					m.Id(f => f.MeetingID);
					m.Field(f => f.Title).DefaultValue("No title");
					m.RecurrenceId(f => f.RecurrenceID);
				})
				.Read("Grouping_Hierarchical_Read", "Scheduler")
					.Create("Grouping_Hierarchical_Create", "Scheduler")
					.Destroy("Grouping_Hierarchical_Destroy", "Scheduler")
					.Update("Grouping_Hierarchical_Update", "Scheduler")
		)
	)
```

## See Also

* [Server-Side API](/api/scheduler)
