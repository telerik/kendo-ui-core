---
title: Resources
page_title: Resources and Scheduler HtmlHelper extension | Kendo UI documentation
description: How to add Resources to Scheduler HtmlHelper extension for Kendo UI Scheduler widget.
---

# Scheduler Resources

The Scheduler HtmlHelper extension supports assigning scheduler events to a set of predefined [resources](/web/scheduler/resources).


## Getting Started

Here is how to add a simple scheduler resource and bind it to local data:

### Example - single single resources

    @(Html.Kendo().Scheduler<KendoSchedulerAjaxEditing.Models.TaskViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Resources(resource =>
        {
            //specify the field from the model which contains the resource id
            resource.Add(m => m.OwnerID)
                 //set the title of the resource
                .Title("Owner")
                 //set the field which contains the text of the resource
                .DataTextField("Text")
                 //set the field which contains the value of the resource
                .DataValueField("Value")
                 //set the field which contains the color of the resource
                .DataColorField("Color")
                //set local data
                .BindTo(new[] {
                    new {
                        Text = "Alex", //text of the resource instance
                        Value = 1, //Identifier of the resource instance, use that value to assign an event to this instance.
                        Color = "#ff7663" //Used as the background of events assigned to this resource.
                    } ,
                    new { Text = "Bob", Value = 2, Color = "#3a8bd8" } ,
                    new { Text = "Charlie", Value = 3, Color = "#3ba96a" }
                });
        })
        .Editable(false)
        .Timezone("Etc/UTC")
        .BindTo(Model)
    )


## Multiple resource types

The Scheduler HtmlHelper extension supports unlimited resource types. For example we can combine the single and multiple resource examples in a single one.

> Widget requires the first resource to have a color field, because the event background color is get from the first resource.

### Example - multiple resource types

    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2013,6 ,13))
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Timezone("Etc/UTC")
        .Resources(resource =>
             {
                //event room resource - single resource
                resource.Add(m => m.RoomID)
                    .Title("Room")
                    .DataTextField("Text")
                    .DataValueField("Value")
                    .DataColorField("Color")
                    .BindTo(new[] {
                        new { Text = "Meeting Room 101", Value = 1, Color = "#1c9ec4" },
                        new { Text = "Meeting Room 201", Value = 2, Color = "#ff7663" }
                    });
                //event atendees resource - multiple resource
                resource.Add(m => m.Atendees)
                    .Title("Atendees")
                    //set the Multiple option to true
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
