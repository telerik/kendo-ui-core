---
title: Resources
page_title: Resources | Telerik UI Scheduler HtmlHelper for ASP.NET MVC
description: "Get started with the Scheduler HtmlHelper for ASP.NET MVC and learn how to configure its resources."
slug: resourcesscheduler_aspnetmvc
position: 4
---

# Resources

The Scheduler HtmlHelper allows you to assign events to a set of predefined resources.

You can assign multiple instances of the same resource type to a single Scheduler event and also assign resources through the Scheduler event edit form. For a runnable example, refer to the [demo on setting the Scheduler HtmlHelper resources](https://demos.telerik.com/aspnet-mvc/scheduler/resources).

## Single Instance Resources

A single instance resource is a resource of which only one instance can be assigned to a Scheduler event&mdash;for example, a Scheduler which displays a list of meetings (Scheduler events) which are held in two rooms (resources). Since a meeting can be held in one room, it can be considered a single resource. If a resource instance has its `color` field set, the Scheduler will use this value as a background for all events that are assigned to that instance.

    @(Html.Kendo().Scheduler<KendoSchedulerAjaxEditing.Models.TaskViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Resources(resource =>
        {
            // Specify the field from the model which contains the resource id.
            resource.Add(m => m.OwnerID)
                 // Set the title of the resource.
                .Title("Owner")
                 // Set the field which contains the text of the resource.
                .DataTextField("Text")
                 // Set the field which contains the value of the resource.
                .DataValueField("Value")
                 // Set the field which contains the color of the resource.
                .DataColorField("Color")
                // Set the local data.
                .BindTo(new[] {
                    new {
                        Text = "Alex", // The text of the resource instance.
                        Value = 1, // The identifier of the resource instance. Use that value to assign an event to this instance.
                        Color = "#ff7663" // Used as the background of events that are assigned to this resource.
                    } ,
                    new { Text = "Bob", Value = 2, Color = "#3a8bd8" } ,
                    new { Text = "Charlie", Value = 3, Color = "#3ba96a" }
                });
        })
        .Editable(false)
        .Timezone("Etc/UTC")
        .BindTo(Model)
    )

## Multiple Resource Types

## Multiple Instance Resources

A multiple instance resource is a resource of which more than one instance can be assigned to a Scheduler event&mdash;for example, a Scheduler which displays a list of meetings and the meeting attendees. Since more than one attendee can participate in a meeting, it can be considered a multiple instance resource. The Scheduler uses the `color` of the first resource instance as a background for its events.

    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2013,6 ,13))
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Timezone("Etc/UTC")
        .Resources(resource =>
             {
                // The event room resource, a single resource.
                resource.Add(m => m.RoomID)
                    .Title("Room")
                    .DataTextField("Text")
                    .DataValueField("Value")
                    .DataColorField("Color")
                    .BindTo(new[] {
                        new { Text = "Meeting Room 101", Value = 1, Color = "#1c9ec4" },
                        new { Text = "Meeting Room 201", Value = 2, Color = "#ff7663" }
                    });
                // The event attendees resource, a multiple resource.
                resource.Add(m => m.Atendees)
                    .Title("Atendees")
                    // Set the Multiple option to true.
                    .Multiple(true)
                    .DataTextField("Text")
                    .DataValueField("Value")
                    .DataColorField("Color")
                    .BindTo(new[] {
                        new { Text = "Alex", Value = 1, Color = "#ff7663" } ,
                        new { Text = "Bob", Value = 2, Color = "#3a8bd8" } ,
                        new { Text = "Charlie", Value = 3, Color = "#3ba96a" }
                    });
             })
        .Editable(false)
        .BindTo(Model)
    )

## See Also

* [Setting the Resources in the Scheduler HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/scheduler/resources)
* [SchedulerBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/SchedulerBuilder)
* [Scheduler Server-Side API](/api/scheduler)
