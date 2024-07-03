---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Scheduler component for {{ site.framework }}."
slug: scheduler_events
position: 4
---

# Events

The Telerik UI Scheduler for {{ site.framework }} [exposes multiple events](/api/kendo.mvc.ui.fluent/schedulereventbuilder) like `Add`, `Edit`, `Resize`, and more, that allows you to control the behavior of the UI component.

For a complete example of how to handle all Scheduler events triggered by user interaction, refer to the [demo on using the events of the  Scheduler ](https://demos.telerik.com/{{ site.platform }}/scheduler/events). For a runnable example on the `Move` and `Resize` events, refer to the [demo on handling the specific events](https://demos.telerik.com/{{ site.platform }}/scheduler/move-resize).


## Handling by Handler Name

The following example demonstrates how to subscribe to the `DataBound` and `DataBinding` events by a handler name.

```HtmlHelper
    @(Html.Kendo().Scheduler<TaskViewModel>()
        .Name("scheduler")
        .Events(e => 
        {
            e.DataBinding("scheduler_dataBinding");
            e.DataBound("scheduler_dataBound");
        })
        // Additional configuration.
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-scheduler name="scheduler"
        on-data-binding="scheduler_dataBinding"
        on-data-bound="scheduler_dataBound">
        <!-- Additional configuration -->
    </kendo-scheduler>
```
{% endif %}
```Scripts
    <script>
        function scheduler_dataBinding(e) {
            // Handle the DataBinding event that fires before the Scheduler binds to its DataSource.
        }

        function scheduler_dataBound(e) {
            // Handle the DataBound event that triggers when the Scheduler is bound to data from its DataSource.
        }
    </script>
```
## Handling by Template Delegate

The following example demonstrates how to subscribe to the `DataBound` and `DataBinding` events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Scheduler<TaskViewModel>()
        .Name("scheduler")
        .Events(e => e
            .DataBinding(@<text>
                function() {
                    // Handle the DataBinding event inline.
                }
            </text>)
            .DataBound(@<text>
                function() {
                    // Handle the DataBound event inline.
                }
            </text>)
        )
        // Additional configuration.
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-scheduler name="scheduler"
        on-data-binding="function() {
            // Handle the DataBinding event inline.
        }"
        on-data-bound="function() {
            // Handle the DataBound event inline.
        }">
        <!-- Additional configuration -->
    </kendo-scheduler>
```
{% endif %}

## Applying Resource Restrictions

By handling the client-side events of the Scheduler, you can restrict the creation of events when resources are not available.

```HtmlHelper
    @(Html.Kendo().Scheduler<TaskViewModel>()
        .Name("scheduler")
        .Resources(resource =>
        {
            resource.Add(m => m.RoomID)
                .Title("Room")
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] {
                        new { Text = "Meeting Room 101", Value = 1, Color = "#6eb3fa" },
                        new { Text = "Meeting Room 201", Value = 2, Color = "#f58a8a" }
                });
            resource.Add(m => m.Attendees)
                .Title("Attendees")
                .Multiple(true)
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
        .Events(e => e.Add("onAdd"))
        // Additional configuration.
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

        var attendeesData = new[]
        {
            new { Text = "Alex", Value = 1, Color = "#f8a398" },
            new { Text = "Bob", Value = 2, Color = "#51a0ed" },
            new { Text = "Charlie", Value = 3, Color = "#56ca85" }
        };

        string defaultTitle = "No Title";
    }

    <kendo-scheduler name="scheduler" on-add="onAdd">
        <resources>
            <resource field="RoomID" title="Room" datatextfield="Text" datavaluefield="Value" datacolorfield="Color" bind-to="@roomsData">
            </resource>
            <resource field="Attendees" title="Attendees" multiple="true" datatextfield="Text" datavaluefield="Value" datacolorfield="Color" bind-to="@attendeesData">
            </resource>
        </resources>
        <scheduler-datasource type="@DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Meetings_Read", "Scheduler")" />
                <create url="@Url.Action("Meetings_Create", "Scheduler")" />
                <destroy url="@Url.Action("Meetings_Destroy", "Scheduler")" />
                <update url="@Url.Action("Meetings_Update", "Scheduler")" />
            </transport>
            <schema data="Data" total="Total" errors="Errors">
                <scheduler-model id="MeetingID">
                    <fields>
                        <field name="MeetingID" type="number"></field>
                        <field name="title" from="Title" type="string" default-value="@defaultTitle"></field>
                        <field name="start" from="Start" type="date"></field>
                        <field name="end" from="End" type="date"></field>
                        <field name="description" from="Description" type="string"></field>
                        <field name="recurrenceId" from="RecurrenceID" type="number" default-value=null></field>
                        <field name="recurrenceRule" from="RecurrenceRule" type="string" ></field>
                        <field name="recurrenceException" from="RecurrenceException" type="string"></field>
                        <field name="startTimezone" from="StartTimezone" type="string"></field>
                        <field name="endTimezone" from="EndTimezone" type="string"></field>
                        <field name="isAllDay" from="IsAllDay" type="boolean"></field>
                    </fields>
                </scheduler-model>
            </schema>
        </scheduler-datasource>
        <!-- Additional configuration -->
    </kendo-scheduler>
```
{% endif %}
```Scripts
    function onAdd(e){
        if (!checkAvailability(e.event.start, e.event.end, e.event)) {
            e.preventDefault();
        }
    }

    function roomIsOccupied(start, end, event, resources) {
        var occurrences = occurrencesInRangeByResource(start, end, "RoomID", event, resources);
        if (occurrences.length > 0) {
            return true;
        }
        return false;
    }

    function checkAvailability(start, end, event, resources) {
        if (attendeeIsOccupied(start, end, event, resources)) {
            setTimeout(function () {
                alert("This person is not available in this time period.");
            }, 0);

            return false;
        }

        if (roomIsOccupied(start, end, event, resources)) {
            setTimeout(function () {
                alert("This room is not available in this time period.");
            }, 0);

            return false;
        }

        return true;
    }

```

## Next Steps

* [Using the Scheduler Events (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/events)

## See Also

* [Using the API of the Scheduler for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/api)
* [Assigning predefined resources to the Scheduler (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/resources)
* [Client-Side API of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [Server-Side API of the Scheduler](/api/scheduler)
{% if site.core %}
* [Server-Side API of the Scheduler TagHelper](/api/taghelpers/scheduler)
{% endif %}