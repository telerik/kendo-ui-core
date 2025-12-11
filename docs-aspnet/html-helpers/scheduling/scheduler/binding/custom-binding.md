---
title: Custom Binding
page_title: Custom Binding
description: "Get started with the Scheduler component for {{ site.framework }} and learn how to configure it for Custom binding."
components: ["scheduler"]
slug: htmlhelpers_scheduler_custombinding_aspnetcore
position: 3
---

# Binding to a Custom DataSource

The Custom DataSource type of data binding is the default type of binding and provides full control over the [client-side API options of the Kendo UI for jQuery DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource).

Using a custom DataSource gives you complete control when it comes to:

* Determining the request and response formats for the established remote services.
* Defining Schema settings for consuming the established remote service.
* Stating separately the server operations, such as `server-filtering`, `server-sorting`, `server-paging`, `server-grouping`, and `server-aggregates`.

The Custom DataSource supports the following custom types:

* `aspnetmvc-ajax`&mdash;uses the traditional [`Ajax Binding`](https://docs.telerik.com/aspnet-mvc/html-helpers/data-management/grid/binding/ajax-binding).
* `odata`&mdash;supports the [`OData`](https://www.odata.org/) v.2 protocol
* `odata-v4`&mdash;partially supports [`OData v4`](https://www.odata.org/documentation/).
* `signalR`&mdash;simplifies adding real-time web functionality to apps by using the [`SignalR`](https://dotnet.microsoft.com/en-us/apps/aspnet/signalr) open-source library.

The following example demonstrates how to declare the {{ site.product }} Scheduler with a Custom DataSource.

```HtmlHelper
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2022, 6, 13))
        .StartTime(new DateTime(2022, 6, 13, 7, 00, 00))
        .Height(600)
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
            views.MonthView();
            views.AgendaView();
        })
        .Timezone("Etc/UTC")
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
            .Custom() // Declare a Custom DataSource.
            .Batch(true)
            .Schema(schema => schema // Compose the Model's schema.
                .Model(m =>
                {
                    m.Id(f => f.MeetingID);
                    m.Field("title", typeof(string)).DefaultValue("No   title").From("Title");
                    m.Field("start", typeof(DateTime)).From("Start");
                    m.Field("end", typeof(DateTime)).From("End");
                    m.Field("description", typeof(string)).From ("Description");
                    m.Field("recurrenceID", typeof(int)).From   ("RecurrenceID");
                    m.Field("recurrenceRule", typeof(string)).From  ("RecurrenceRule");
                    m.Field("recurrenceException", typeof(string)).From ("RecurrenceException");
                    m.Field("isAllDay", typeof(bool)).From("IsAllDay");
                    m.Field("startTimezone", typeof(string)).From   ("StartTimezone");
                    m.Field("endTimezone", typeof(string)).From ("EndTimezone");
                })
            )
            .Transport(transport => transport // Set up the transport operations.
                .Read(read => read.Url("https://demos.telerik.com/service/v2/core/meetings")
                    .ContentType("application/json"))
                .Create(create => create.Url("https://demos.telerik.com/service/v2/core/meetings/create")
                    .ContentType("application/json")
                    .Type(HttpVerbs.Post))
                .Destroy(destroy => destroy.Url(""https://demos.telerik.com/service/v2/core/meetings/destroy")
                    .ContentType("application/json")
                    .Type(HttpVerbs.Post))
                .Update(update => update.Url("https://demos.telerik.com/service/v2/core/meetings/update")
                    .ContentType("application/json")
                    .Type(HttpVerbs.Post))
                .ParameterMap("parameterMap") // Wire to a handler that will alter the request format.
            )
        )
    )

    <script>
        function parameterMap(options, operation) { // Handler that alters the request format.
            if (operation !== "read" && options.models) {
                kendo.stringify(options.models);
            }
        }
    </script>
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

    <kendo-scheduler name="scheduler" 
        date="new DateTime(2022, 6, 13)"
        start-time="new DateTime(2022, 6, 13, 7, 00, 00)"
        height="600"
        timezone="Etc/UTC">
        <views>
            <view type="day"></view>
            <view type="week" selected="true"></view>
            <view type="month"></view>
            <view type="agenda"></view>
        </views>
        <resources>
            <resource field="RoomID" title="Room" datatextfield="Text"  datavaluefield="Value" datacolorfield="Color" bind-to="@roomsData">
            </resource>
            <resource field="Attendees" title="Attendees" multiple="true"   datatextfield="Text" datavaluefield="Value" datacolorfield="Color"    bind-to="@attendeesData">
            </resource>
        </resources>
        <scheduler-datasource type="@DataSourceTagHelperType.Custom" batch="true">
            <transport parameter-map="parameterMap">
                <read url="https://demos.telerik.com/service/v2/core/meetings"/>
                <create url="https://demos.telerik.com/service/v2/core/meetings/create" type="POST" content-type="application/json" />
                <destroy url="https://demos.telerik.com/service/v2/core/meetings/destroy" type="POST" content-type="application/json" />
                <update url="https://demos.telerik.com/service/v2/core/meetings/update" type="POST" content-type="application/json" />
            </transport>
            <schema>
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

    <script>
        function parameterMap(options, operation) { // Handler that alters the request format.
            if (operation !== "read" && options.models) {
                kendo.stringify(options.models);
            }
        }
    </script>
```
{% endif %}

For a complete example on the Custom DataSource Binding, refer to the [demo on custom datasource binding of the Scheduler](https://demos.telerik.com/{{ site.platform }}/scheduler/custom-datasource).

## See Also

* [Custom DataSource Binding in the Scheduler (Demo)](https://demos.telerik.com/{{ site.platform }}/menu/menu-bind-attributes)
* [Server-Side API of the Scheduler HtmlHelper](/api/scheduler)
{% if site.core %}
* [Server-Side API of the Scheduler TagHelper](/api/taghelpers/scheduler)
{% endif %}
* [Client-Side API of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
