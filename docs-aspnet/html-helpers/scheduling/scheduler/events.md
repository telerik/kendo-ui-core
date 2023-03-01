---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Scheduler component for {{ site.framework }}."
slug: scheduler_events
position: 8
---

# Events

The Telerik UI Scheduler for {{ site.framework }} [exposes a number of JavaScript events](/api/Kendo.Mvc.UI.Fluent/SchedulerEventBuilder) that allow you to control the behavior of the UI component.

For a complete example of how to handle all Scheduler events triggered by user interaction, refer to the [demo on using the events of the  Scheduler ](https://demos.telerik.com/{{ site.platform }}/scheduler/events). For a runnable example on the `move` and `resize` events, refer to the [demo on the specific events](https://demos.telerik.com/{{ site.platform }}/scheduler/move-resize).


## Subscribing to Events

The following example demonstrates how to subscribe to the `dataBound` and `dataBinding` events.

```HtmlHelper
    @(Html.Kendo().Scheduler<KendoUISchedulerDemo.Models.Projection>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
        .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
        .Editable(false)
        .Height(600)
        .BindTo(Model)
        .Events(e => {
            e.DataBound("scheduler_dataBound");
            e.DataBinding("scheduler_dataBinding");
        })
    )
```
{% if site.core %}
```TagHelper
    @{
        string defaultTitle = "No Title";
    }
    <kendo-scheduler name="scheduler" 
        on-data-bound="scheduler_dataBound" 
        on-data-binding="scheduler_dataBinding"
        date="new DateTime(2013, 6, 13)" 
        start-time="new DateTime(2013, 6, 13, 10, 00, 00)"
        end-time="new DateTime(2013, 6, 13, 23, 00, 00)"
        timezone="Etc/UTC"
        height="600">
        <editable enabled="false" />
        <scheduler-datasource type="@DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Date_Grouping_Read", "Scheduler")" />
                <create url="@Url.Action("Date_Grouping_Create", "Scheduler")" />
                <destroy url="@Url.Action("Date_Grouping_Destroy", "Scheduler")" />
                <update url="@Url.Action("Date_Grouping_Update", "Scheduler")" />
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
    </kendo-scheduler>
```
{% endif %}
```JavaScript
    <script>
        function scheduler_dataBound(e) {
            //Handle the dataBound event.
        }

        function scheduler_dataBinding(e) {
            //Handle the dataBinding event.
        }
    </script>
```

## Applying Resource Restrictions

By handling the JavaScript events of the Scheduler, you can restrict the creation of events when resources are not available.

```HtmlHelper
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
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
        .Events(e=>e.Add("onAdd"))
    )
```
{% if site.core %}
```TagHelper
    <kendo-scheduler name="scheduler" 
        on-add="onAdd">
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
    </kendo-scheduler>
```
{% endif %}
```JavaScript>
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

* [Using the Scheduler Events (Demo)](https://demos.telerik.com/aspnet-core/scheduler/events)

## See Also

* [Using the API of the Scheduler for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/api)
* [Assigning predefined resources to the Scheduler (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/resources)
* [Server-Side API of the Scheduler](/api/scheduler)
* [Client-Side API of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)