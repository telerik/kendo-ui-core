---
title: Vertical Grouping
page_title: Vertical Grouping
description: "Learn how to group the resources of the Telerik UI for {{ site.framework }} Scheduler vertically."
slug: scheduler_resources_grouping_vertical
position: 3
---

# Vertical Grouping

The grouping feature allows you to group the resources of the Scheduler vertically.

The vertical grouping displays the resources (such as rooms, attendees, equipment, and more) as rows along the left side of the Scheduler, with the time slots remaining on the vertical axis for `Day` and `Week` views and on the horizontal axis for `Month` and `Timeline` views. As a result, each resource is represented as a separate row, allowing the user to review all events associated with each resource one below the other. With the vertical layout, more detailed information can be displayed for each resource, as the entire row is dedicated to showing the time and events of that specific resource.

To enable the vertical resources grouping:

1. Add the [`Group()`](/api/kendo.mvc.ui.fluent/schedulerbuilder#groupsystemaction) configuration and specify the names of the resources in the [`Resources()`](/api/kendo.mvc.ui.fluent/schedulergroupbuilder#resourcessystemstring) option.
1. Set the [`Orientation()`](/api/kendo.mvc.ui.fluent/schedulergroupbuilder#orientationkendomvcuischedulergrouporientation) option to `SchedulerGroupOrientation.Vertical`. The available options of the `SchedulerGroupOrientation` setting are `Default` (horizontal), `Horizontal`, and `Vertical`.
  The Scheduler requests and retrieves the data as usual and renders the events based on the grouped resources.
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

* [Implementing Vertical Virtual Grouping of the Scheduler Resources]({% slug scheduler_resources_grouping_virtual_vertical %})

## See Also

* [Vertical Grouping by the Scheduler for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/resources-grouping-vertical)
* [Server-Side API of the Scheduler HtmlHelper](/api/scheduler)
{% if site.core %}
* [Server-Side API of the Scheduler TagHelper](/api/taghelpers/scheduler)
{% endif %}
* [Client-Side API of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)