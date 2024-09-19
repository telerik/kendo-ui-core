---
title: Virtual Vertical Grouping
page_title: Virtual Vertical Grouping
description: "Learn how to enable the vertical virtualization feature of the Telerik UI for {{ site.framework }} Scheduler that has resources."
slug: scheduler_resources_grouping_virtual_vertical
position: 4
---

# Virtual Vertical Grouping

The vertical virtualization feature of the Scheduler groups the resources vertically and optimizes the rendering of the view by using a DOM virtualization.

When you enable the virtual vertical grouping, a batch of resources (such as rooms, attendees, equipment, and more) are displayed as rows along the left side of the Scheduler. As the user scrolls down, additional resources are dynamically loaded and rendered. At the same time, the time slots remain on the vertical axis for `Day` and `Week` views and on the horizontal axis for the `Month` view. As a result, each resource is represented as a separate row, allowing the user to review all events associated with each resource one below the other. Vertical virtualization is suitable when dealing with an extensive list of resources and allows the user to focus on specific resources.

> The views that support virtual vertical grouping are: `Day`, `Week`, `WorkWeek`, and `Month`.

To enable the vertical virtualization of the Scheduler's resources:

1. Add the [`Group()`](/api/kendo.mvc.ui.fluent/schedulerbuilder#groupsystemaction) configuration and specify the names of the resources in the [`Resources()`](/api/kendo.mvc.ui.fluent/schedulergroupbuilder#resourcessystemstring) option. 
1. Set the [`Orientation()`](/api/kendo.mvc.ui.fluent/schedulergroupbuilder#orientationkendomvcuischedulergrouporientation) option to `SchedulerGroupOrientation.Vertical`. The available options of the `SchedulerGroupOrientation` setting are `Default` (horizontal), `Horizontal`, and `Vertical`. The Scheduler requests and retrieves the data as usual and renders the events based on the grouped resources.
1. Include the `Virtual(true)` option to each view that must be virtualized.

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
            .Views(views =>
            {
                views.DayView(view => view.Virtual(true));
                views.WeekView(view => view.Selected(true).Virtual(true));
                views.WorkWeekView(view => view.Virtual(true));
                views.MonthView(view => view.Virtual(true));
            })
            .Group(group => group.Resources("Rooms").Orientation(SchedulerGroupOrientation.Vertical)) // "Rooms" matches the "Name()" option of the defined resource within the "Resources()" configuration.
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
            <views>
                <view type="day" virtual="true"></view>
                <view type="week" selected="true" virtual="true"></view>
                <view type="workWeek" virtual="true"></view>
                <view type="month" virtual="true"></view>
            </views>
            <group orientation="vertical">
                <resources>
                    <group-resource name="Rooms"/> // "Rooms" matches the "name" attribute of the defined resource within the "resources" tag.
                </resources>
            </group>
            <!--Additional configuration-->
        </kendo-scheduler>
    ```
    {% endif %}

## Next Steps

* [Implementing Hierarchical Grouping of the Scheduler Resources]({% slug scheduler_resources_grouping_hierarchical %})

## See Also

* [Virtual Vertical Grouping by the Scheduler for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/resources-grouping-vertical-virtual)
* [Server-Side API of the Scheduler HtmlHelper](/api/scheduler)
{% if site.core %}
* [Server-Side API of the Scheduler TagHelper](/api/taghelpers/scheduler)
{% endif %}
* [Client-Side API of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)