---
title: Resources
page_title: Resources | Kendo UI Scheduler HtmlHelper
description: "Add Resources to the Scheduler HtmlHelper extension for the Kendo UI Scheduler widget in ASP.NET MVC applications."
slug: resourcesscheduler_aspnetmvc
position: 4
---

# Resources

The Scheduler HtmlHelper extension supports assigning Scheduler events to a set of predefined [resources](http://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/overview).

## Configuration

### Single Resources

The following example demonstrates how to add a Scheduler resource and bind it to local data.

###### Example

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

### Multiple Resource Types

The Scheduler HtmlHelper extension supports unlimited resource types. For example, it enables you to combine the single and the multiple resource examples in a single one.

> **Important**
>
> The widget requires the first resource to have a color field, because the event background color is taken from the first resource.

###### Example

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

## See Also

* [Overview of the Scheduler HtmlHelper]({% slug overview_schedulerhelper_aspnetmvc %})
* [Ajax Binding of the Scheduler HtmlHelper]({% slug ajaxbinding_schedulerhelper_aspnetmvc %})
* [Scaffolding of the Scheduler HtmlHelper]({% slug scaffoldingscheduler_aspnetmvc %})
* [Scheduler HtmlHelper How-To Examples]({% slug howto_bindtowebapicontroller_scheduleraspnetmvc %})
* [Overview of the Kendo UI Scheduler Widget](http://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/overview)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/kendo-ui/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
