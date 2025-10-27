---
title: Overview
page_title: Telerik UI Scheduler Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} Scheduler using various data binding approaches."
slug: htmlhelpers_scheduler_databinding
position: 0
---

# Data Binding Overview

The {{ site.product }} Scheduler provides flexible data binding capabilities that allow you to manage and display scheduling data from various sources. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The Scheduler supports the following data binding methods:

### Local Data Binding

Bind the Scheduler to a local dataset by passing an arbitrary model directly within the boundaries of the component. This approach is optimal for:
- Small to medium-sized datasets that can be loaded in memory.
- Static data that does not require frequent updates.
- Scenarios where all data is available at render time.

For detailed implementation instructions, refer to the [Local Data Binding]({% slug htmlhelpers_scheduler_serverbinding_aspnetcore %}) documentation.

### Remote Data Binding

Connect the Scheduler to a remote endpoint using AJAX operations. This enables:
- Dynamic data loading with paging, sorting, and filtering.
- Real-time data updates and synchronization from external sources.
- Improved performance with large event datasets through server-side processing.

For more information and examples, refer to the [Ajax Data Binding]({% slug htmlhelpers_scheduler_ajaxbinding_aspnetcore %}) documentation.

### Custom DataSource Binding

Implement custom data binding scenarios with full control over the data retrieval process:
- Custom data processing logic based on the remote server structure and requirements.
- Custom data operations such as paging, sorting, and filtering.
- Connection to [OData](https://www.odata.org/) service.

For more information, refer to the [Custom DataSource Binding]({% slug htmlhelpers_scheduler_custombinding_aspnetcore %}) documentation.

### Web API Data Binding

Connect the Scheduler to Web API endpoints for RESTful data operations:
- RESTful API integration with automatic HTTP verb mapping.
- Standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) for CRUD operations.
- JSON data exchange format.
- Clean separation between client and server logic.

For more information, refer to the [Web API Binding]({% slug htmlhelpers_scheduler_webapi_binding %}) documentation.

### SignalR Data Binding

Enable real-time data synchronization using SignalR for live scheduling updates:
- Real-time event synchronization across multiple clients.
- Automatic Scheduler updates when data changes on the server.
- Live collaboration features for shared calendars.
- Push notifications for data modifications without page refresh.

For detailed implementation instructions, see [SignalR Data Binding]({% slug htmlhelpers_scheduler_signalr_binding_aspnetcore %}) documentation.

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the Scheduler component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [Scheduler in Razor Pages]({% slug htmlhelpers_scheduler_razorpage_aspnetcore %}) article.
{% endif %}

## Key Considerations

When selecting a data binding approach for the Scheduler, evaluate the following factors:

* **Performance**&mdash;Local binding offers faster initial rendering for small datasets, while remote binding provides better performance with large datasets through on-demand loading and server-side operations.
* **Data volume**&mdash;Large datasets require remote binding, custom DataSource, or Web API binding to leverage server-side paging, sorting, and filtering for optimal performance.
* **Security**&mdash;Remote binding provide better control over data access through server-side validation and authorization.
* **Real-time requirements**&mdash;SignalR binding is essential for scenarios requiring live data updates and multi-client synchronization.
* **API architecture**&mdash;Web API binding is optimal for RESTful services, while Custom DataSource binding provides flexibility for OData or custom endpoints.

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

* [Server-Side API of the Scheduler HtmlHelper](/api/scheduler)
{% if site.core %}
* [Server-Side API of the Scheduler TagHelper](/api/taghelpers/scheduler)
{% endif %}