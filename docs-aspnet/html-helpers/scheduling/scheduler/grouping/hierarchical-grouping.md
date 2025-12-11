---
title: Hierarchical Grouping
page_title: Hierarchical Grouping
description: "Learn how to enable the hierarchical grouping of the Telerik UI for {{ site.framework }} Scheduler resources."
components: ["scheduler"]
slug: scheduler_resources_grouping_hierarchical
position: 5
---

# Hierarchical Grouping

The hierarchical resource grouping feature allows you to group the resources of the Scheduler horizontally or vertically and display the resources in a parent-child structure.

When you enable the hierarchical grouping, the groups consist of parents and children, where each parent resource member can have a different child resource group. For example, if the Scheduler has **Rooms** as a parent resource, different **Attendees** can be assigned to each room. In this setup, the parent resources (such as rooms, attendees, equipment, and more) are displayed as rows or columns based on the defined orientation ([vertical]({% slug scheduler_resources_grouping_vertical %}) or [horizontal]({% slug scheduler_resources_grouping_horizontal %})), with child resources nested beneath them.

To configure the hierarchical grouping of the Scheduler's resources:

1. Add the desired resources in the [`Resources()`](/api/kendo.mvc.ui.fluent/schedulergroupbuilder#resourcessystemstring) configuration. The order of the resources must follow the parent-child relation. The last resource in the `Resources()` configuration must not be a parent.
1. Use the [`DataParentValueField()`](/api/kendo.mvc.ui.fluent/schedulerresourcebuilder#dataparentvaluefieldsystemstring) option in the child resource to specify the name of the field that holds the parent value (the parent value equals the value of the field defined as `DataValueField` in the parent resource.)

    ```HtmlHelper
        @(Html.Kendo().Scheduler<MeetingViewModel>()
            .Name("scheduler")
            .Resources(resource =>
            {
                resource.Add(m => m.RoomID) // Parent resource.
                .Title("Room")
                .Name("Rooms")
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] {
                        new { Text = "Meeting Room 101", Value = 1, Color = "#6eb3fa" },
                        new { Text = "Meeting Room 201", Value = 2, Color = "#f58a8a" }
                });

                resource.Add(m => m.Attendees) // Child resource.
                .Title("Attendees")
                .Name("Attendees")
                .Multiple(true)
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .DataParentValueField("Parent") // The "Parent" field in the "SchedulerResourceModel" Model holds the value of the "Value" field in the "Room" resource.
                .BindTo(new List<SchedulerResourceModel>() {
                        new SchedulerResourceModel(){ Text = "Alex", Color="red", Value = 1},
                        new SchedulerResourceModel(){ Text = "Bob", Color="green",  Value = 2, Parent = 1 } ,
                        new SchedulerResourceModel(){ Text = "Charlie",Color="yellow",  Value = 3, Parent = 2 }
                });
            })
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

            var attendeesData = new List<SchedulerResourceModel>() {
                new SchedulerResourceModel(){ Text = "Alex", Color="red", Value = 1},
                new SchedulerResourceModel(){ Text = "Bob", Color="green",  Value = 2, Parent = 1 } ,
                new SchedulerResourceModel(){ Text = "Charlie",Color="yellow",  Value = 3, Parent = 2 }
            };
        }
        <kendo-scheduler name="scheduler">
            <resources>
                <resource field="RoomID" title="Room" name="Rooms" datatextfield="Text" datavaluefield="Value" datacolorfield="Color" bind-to="@roomsData"> // Parent resource.
                </resource>
                <resource  // Child resource.
                    field="Attendees" 
                    title="Attendees" 
                    name="Attendees" 
                    multiple="true" 
                    datatextfield="Text" 
                    datavaluefield="Value" 
                    datacolorfield="Color" 
                    dataparentvaluefield="Parent" // The "Parent" field in the "SchedulerResourceModel" Model holds the value of the "Value" field in the "Room" resource.
                    bind-to="@attendeesData">
                </resource>
            </resources>
            <!--Additional configuration-->
        </kendo-scheduler>
    ```
    {% endif %}

    > Only the last one of the resources can be configured to allow [multiple instance resources]({% slug htmlhelpers_scheduler_resources_aspnetcore %}#multiple-resource-types).

1. Add the [`Group()`](/api/kendo.mvc.ui.fluent/schedulerbuilder#groupsystemaction) configuration and specify the names of the resources in the `Resources()` option. 
1. To group the resources vertically, set the [`Orientation()`](/api/kendo.mvc.ui.fluent/schedulergroupbuilder#orientationkendomvcuischedulergrouporientation) option to `SchedulerGroupOrientation.Vertical`. The available options of the `SchedulerGroupOrientation` setting are `Default` (horizontal), `Horizontal`, and `Vertical`.

    ```HtmlHelper
        @(Html.Kendo().Scheduler<MeetingViewModel>()
            .Name("scheduler")
            .Group(group => group.Resources("Rooms", "Attendees").Orientation(SchedulerGroupOrientation.Vertical))
            ...// Additional configuration.
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-scheduler name="scheduler">
            <group orientation="vertical">
                <resources>
                    <group-resource name="Rooms" />
                    <group-resource name="Attendees" />
                </resources>
            </group>
            <!--Additional configuration-->
        </kendo-scheduler>
    ```
    {% endif %}

## Next Steps

* [Implementing Date Grouping of the Scheduler Resources]({% slug scheduler_resources_grouping_date %})

## See Also

* [Hierarchical Grouping by the Scheduler for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/resources-grouping-hierarchical)
* [Server-Side API of the Scheduler HtmlHelper](/api/scheduler)
{% if site.core %}
* [Server-Side API of the Scheduler TagHelper](/api/taghelpers/scheduler)
{% endif %}
* [Client-Side API of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)