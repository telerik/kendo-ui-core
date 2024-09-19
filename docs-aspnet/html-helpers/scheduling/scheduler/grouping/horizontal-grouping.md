---
title: Horizontal Grouping
page_title: Horizontal Grouping
description: "Learn how to group the resources of the Telerik UI for {{ site.framework }} Scheduler horizontally."
slug: scheduler_resources_grouping_horizontal
position: 2
---

# Horizontal Grouping

The grouping feature allows you to group the resources of the Scheduler horizontally.

When you enable the horizontal grouping of the Scheduler, the resources (such as rooms, attendees, equipment, and more) are displayed as columns across the top of the Scheduler. At the same time, the time slots remain on the vertical axis for `Day` and `Week` views and on the horizontal axis for `Month` and `Timeline` views. As a result, each resource is represented as a separate column, and the user can review all events associated with each resource side by side.

> The `Agenda` view always displays the grouped resources vertically.

To enable the horizontal resources grouping, add the [`Group()`](/api/kendo.mvc.ui.fluent/schedulerbuilder#groupsystemaction) configuration and specify the names of the resources in the [`Resources()`](/api/kendo.mvc.ui.fluent/schedulergroupbuilder#resourcessystemstring) option. The Scheduler requests and retrieves the data as usual and renders the events based on the grouped resources.

```HtmlHelper
    @(Html.Kendo().Scheduler<MeetingViewModel>()
        .Name("scheduler")
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
        .Group(group => group.Resources("Rooms")) // "Rooms" matches the "Name()" option of the defined resource within the "Resources()" configuration.
        ...// Additional configuration.
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    @{
        var roomsData = new[]
        {
            new { Text = "Meeting Room 101", Value = 1, Color = "#6eb3fa" },
            new { Text = "Meeting Room 201", Value = 2, Color = "#f58a8a" }
        };
    }
    <kendo-scheduler name="scheduler">
        <resources>
            <resource name="Rooms" field="RoomID" title="Room" datatextfield="Text" datavaluefield="Value" datacolorfield="Color" bind-to="@roomsData">
            </resource>
        </resources>
        <group>
            <resources>
                <group-resource name="Rooms"/> // "Rooms" matches the "name" attribute of the defined resource within the "resources" tag.
            </resources>
        </group>
        <!--Additional configuration-->
    </kendo-scheduler>
```
{% endif %}

## Next Steps

* [Implementing Vertical Grouping of the Scheduler Resources]({% slug scheduler_resources_grouping_vertical %})

## See Also

* [Horizontal Grouping by the Scheduler for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/resources-grouping-horizontal)
* [Server-Side API of the Scheduler HtmlHelper](/api/scheduler)
{% if site.core %}
* [Server-Side API of the Scheduler TagHelper](/api/taghelpers/scheduler)
{% endif %}
* [Client-Side API of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)