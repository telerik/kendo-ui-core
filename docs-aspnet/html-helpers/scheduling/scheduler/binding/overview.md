---
title: Overview
page_title: Data Binding
description: "Learn the basics approaches for binding the Telerik UI Scheduler component for {{ site.framework }}."
slug: htmlhelpers_scheduler_databinding
position: 0
---

# Data Binding

The Scheduler provides a set of options for binding it to data.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

The supported data-binding approaches are:

* [Ajax binding]({% slug htmlhelpers_scheduler_ajaxbinding_aspnetcore %})
* [Server binding]({% slug htmlhelpers_scheduler_serverbinding_aspnetcore %})
* [Custom binding]({% slug htmlhelpers_scheduler_custombinding_aspnetcore %})
* [SignalR binding]({% slug htmlhelpers_scheduler_signalr_binding_aspnetcore %})
* [Web API binding]({% slug htmlhelpers_scheduler_webapi_binding %})
{% if site.core %}
* [Razor Pages binding]({% slug htmlhelpers_scheduler_razorpage_aspnetcore %})
{% endif %}

## Model Requirements

The model that binds to the Scheduler extends the `ISchedulerEvent` interface, which has the following properties: 

```C#
 public interface ISchedulerEvent
 {
     //Content Lines
     string Title
     {
         get;
         set;
     }
     string Description
     {
         get;
         set;
     }

     //Duration
     bool IsAllDay
     {
         get;
         set;
     }

     DateTime Start
     {
         get;
         set;
     }

     DateTime End
     {
         get;
         set;
     }

     string StartTimezone
     {
         get;
         set;
     }

     string EndTimezone
     {
         get;
         set;
     }

     string RecurrenceRule
     {
         get;
         set;
     }

     string RecurrenceException
     {
         get;
         set;
     }
 }
```

The next table lists the required model properties of the Scheduler and their default values.

| Property            | Mandatory | Default Value        | Description                                                                 |
|---------------------|-----------|----------------------|-----------------------------------------------------------------------------|
| `Id`                | Yes       | none                 | The unique model identifier of the Scheduler event. Required for creating, editing, and deleting records. |
| `Title`               | Yes       | none                 | The title or subject of the event.                                          |
| `Start`               | Yes       | none                 | The starting date and time of the event.                                    |
| `End`                 | Yes       | none                 | The ending date and time of the event. Must be later than Start.            |
| `RecurrenceRule`      | No        | null                 | The rule that defines the recurrence pattern. If not provided or set to null, the event is not treated as a recurring event. |
| `RecurrenceID`        | No        | null                 | Links an exception or occurrence to its recurring master event.             |
| `RecurrenceException` | No        | null                 | A comma-separated list of dates when the recurring event will be skipped.   |
| `IsAllDay`            | No        | false                | Indicates whether the event spans the entire day.                           |
| `Description`         | No        | empty string ("")    | Optional text description of the event.                                     |

When using HtmlHelper Scheduler, the model properties are automatically mapped to camelCase fields on the client.

{% if site.core %}

When using TagHelper Scheduler, you need to set the "name" and "from" attributes manually in the schema configuration of the DataSource.

The following example shows how to set the properties of the DataSource for the TagHelper:

```TagHelper
    <scheduler-datasource type="@DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("Overview_Read", "Scheduler")" />
            <create url="@Url.Action("Overview_Create", "Scheduler")" />
            <destroy url="@Url.Action("Overview_Destroy", "Scheduler")" />
            <update url="@Url.Action("Overview_Update", "Scheduler")" />
        </transport>
        <schema data="Data" total="Total" errors="Errors">
            <scheduler-model id="ID">
                <fields>
                    <field name="ID" type="number"></field>
                    <field name="title" from="Title" type="string" default-value="@defaultTitle"></field>
                    <field name="start" from="Start" type="date"></field>
                    <field name="end" from="End" type="date"></field>
                    <field name="description" from="Description" type="string"></field>
                    <field name="recurrenceId" from="RecurrenceID" type="number" default-value=null></field>
                    <field name="recurrenceRule" from="RecurrenceRule" type="string" ></field>
                    <field name="recurrenceException" from="RecurrenceException" type="string"></field>
                    <field name="Attendee" type="number" default-value="1"></field>
                    <field name="startTimezone" from="StartTimezone" type="string"></field>
                    <field name="endTimezone" from="EndTimezone" type="string"></field>
                    <field name="isAllDay" from="IsAllDay" type="boolean"></field>
                </fields>
            </scheduler-model>
        </schema>
    </scheduler-datasource>
```
{% endif %}

## See Also

* [Server-Side API](/api/scheduler)