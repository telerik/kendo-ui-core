---
title: Date Grouping
page_title: Date Grouping
description: "Learn how to group the resources of the Telerik UI for {{ site.framework }} Scheduler by date."
components: ["scheduler"]
slug: scheduler_resources_grouping_date
position: 6
---

# Date Grouping

The date grouping feature allows you to group the resources of the Scheduler by date based on the selected view.

When you enable the date grouping of the Scheduler, the resources (such as rooms, attendees, equipment, and more) are displayed as columns and the dates are displayed as rows or columns based on the defined orientation ([vertical]({% slug scheduler_resources_grouping_vertical %}) or [horizontal]({% slug scheduler_resources_grouping_horizontal %})).

* Horizontal orientation&mdash;The dates or time slots are rendered above the resources as columns. The `Agenda` view always displays the dates vertically.
* Vertical orientation&mdash;The dates or time slots are rendered as rows along the left side of the Scheduler.

To enable the date grouping of the resources, add the [`Group()`](/api/kendo.mvc.ui.fluent/schedulerbuilder#groupsystemaction) configuration, specify the names of the resources in the [`Resources()`](/api/kendo.mvc.ui.fluent/schedulergroupbuilder#resourcessystemstring) option, and set the [`Date(true)`](/api/kendo.mvc.ui.fluent/schedulergroupbuilder#datesystemboolean) option.

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
        .Group(group => { group.Resources("Rooms"); group.Date(true); }) // "Rooms" matches the "Name()" option of the defined resource within the "Resources()" configuration.
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
        <group date="true">
            <resources>
                <group-resource name="Rooms" /> // "Rooms" matches the "name" attribute of the defined resource within the "resources" tag.
            </resources>
        </group>
        <!--Additional configuration-->
    </kendo-scheduler>
```
{% endif %}

By default, the resources will be grouped by date horizontally. To group the resources vertically, set the [`Orientation()`](/api/kendo.mvc.ui.fluent/schedulergroupbuilder#orientationkendomvcuischedulergrouporientation) option to `SchedulerGroupOrientation.Vertical`. The available options of the `SchedulerGroupOrientation` setting are `Default` (horizontal), `Horizontal`, and `Vertical`.

## See Also

* [Date Grouping by the Scheduler for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/date-grouping)
* [Server-Side API of the Scheduler HtmlHelper](/api/scheduler)
{% if site.core %}
* [Server-Side API of the Scheduler TagHelper](/api/taghelpers/scheduler)
{% endif %}
* [Client-Side API of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)