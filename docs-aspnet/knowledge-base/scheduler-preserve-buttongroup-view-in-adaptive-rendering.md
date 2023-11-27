---
title: Preserving the ButtonGroup View for Mobile Rendering in Scheduler
page_title: Preserving the ButtonGroup View for Mobile Rendering in Scheduler
description: "Learn how to preserve the ButtonGroup View for Mobile Rendering when working with the Telerik UI for {{ site.framework }} Scheduler component."
slug: scheduler-preserve-buttongroup-view-in-adaptive-rendering
tags: scheduler, button, group, mobile, rendering, adaptive ,core, mvc, telerik, view, calendar
component: scheduler
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} Scheduler</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.3.1114 version</td>
 </tr>
</table>


## Description

How can I prevent the transmutation from a ButtonGroup to a DropDownList for different screen sizes when working with the Telerik UI for {{ site.framework }} Scheduler with Adaptive Rendering ?


## Solution

Follow the steps below to achieve the desired scenario:

1. Create a variable that will hold the DOM representation of the ButtonGroup. Which will contain the `day`, `month`, `agenda`, and `week`, `timeline`, and `year` buttons.
1. Subscribe to the [document.ready()](https://learn.jquery.com/using-jquery-core/document-ready/) event.
1. Within the handler, replace the transformed DropDownList element by using the [replaceWith()](https://api.jquery.com/replaceWith/) method.
1. From there, add a click handler to each of the buttons from the previously created ButtonGroup. And based on an assertion, call the client-side [view()](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/methods/view) method of the Scheduler with the appropriate view name.
1. To change a given button's state upon selection, add the [`k-selected`](https://docs.telerik.com/kendo-ui/styles-and-layout/components-rendering-overview#state-classes) state class.
1. Subscribe to the [window.resize](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event) event and replace the transformed DropDownList when the view dimensions are changed.

```Index.cshtml
@(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>()
    .Name("scheduler")
    .Date(new DateTime(2022, 6, 13))
    .StartTime(new DateTime(2022, 6, 13, 7, 00, 00))
    .Height(600)
    .Views(views =>
    {
        views.DayView();
        views.WeekView();
        views.MonthView(mv => mv.Selected(true));
        views.YearView();
        views.AgendaView();
        views.TimelineView();
    })
    .Mobile(MobileMode.Phone)
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
            .Custom()
            .Batch(true)
            .Schema(schema => schema
                .Model(m =>
                {
                    m.Id(f => f.MeetingID);
                    m.Field("title", typeof(string)).DefaultValue("No title").From("Title");
                    m.Field("start", typeof(DateTime)).From("Start");
                    m.Field("end", typeof(DateTime)).From("End");
                    m.Field("description", typeof(string)).From("Description");
                    m.Field("recurrenceID", typeof(int)).From("RecurrenceID");
                    m.Field("recurrenceRule", typeof(string)).From("RecurrenceRule");
                    m.Field("recurrenceException", typeof(string)).From("RecurrenceException");
                    m.Field("isAllDay", typeof(bool)).From("IsAllDay");
                    m.Field("startTimezone", typeof(string)).From("StartTimezone");
                    m.Field("endTimezone", typeof(string)).From("EndTimezone");
                }))
            .Transport(transport => transport
                .Read(read => read.Url("https://demos.telerik.com/kendo-ui/service/meetings")
                      .DataType("jsonp"))
                .Create(create => create.Url("https://demos.telerik.com/kendo-ui/service/meetings/create")
                      .DataType("jsonp"))
                .Destroy(destroy => destroy.Url("https://demos.telerik.com/kendo-ui/service/meetings/destroy")
                      .DataType("jsonp"))
                .Update(update => update.Url("https://demos.telerik.com/kendo-ui/service/meetings/update")
                      .DataType("jsonp"))
                .ParameterMap("parameterMap"))
    )
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

<kendo-scheduler name="scheduler" 
    date="new DateTime(2022, 6, 13)"
    start-time="new DateTime(2022, 6, 13, 7, 00, 00)"
    height="600"
    timezone="Etc/UTC">
    <views>
        <view type="day"></view>
        <view type="week" selected="true"></view>
        <view type="month"></view>
        <view type="year"></view>
        <view type="agenda"></view>
        <view type="timeline"></view>
    </views>
    <resources>
        <resource field="RoomID" title="Room" datatextfield="Text" datavaluefield="Value" datacolorfield="Color" bind-to="@roomsData">
        </resource>
        <resource field="Attendees" title="Attendees" multiple="true" datatextfield="Text" datavaluefield="Value" datacolorfield="Color" bind-to="@attendeesData">
        </resource>
    </resources>
    <scheduler-datasource type="@DataSourceTagHelperType.Custom" batch="true">
        <transport parameter-map="parameterMap">
            <read url="https://demos.telerik.com/kendo-ui/service/meetings" dataType="jsonp"/>
            <create url="https://demos.telerik.com/kendo-ui/service/meetings/create" dataType="jsonp"/>
            <destroy url="https://demos.telerik.com/kendo-ui/service/meetings/destroy" dataType="jsonp" />
            <update url="https://demos.telerik.com/kendo-ui/service/meetings/update" dataType="jsonp"/>
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
```
{% endif %}
```Script.js
    <script>
         var buttonGroup = `<span data-role='buttongroup' class='k-widget   k-button-group k-toolbar-button-group' role='group'   data-uid='f01bcb47-94d9-4c40-8e55-53a28b45134d'>
             <button class='k-view-day k-button k-button-md k-rounded-md k-button-solid     k-button-solid-base k-toggle-button k-toolbar-tool k-group-start    k-button-rectangle' data-name='day'    data-uid='dda9916c-3486-4407-9a69-4d5acca5ab52'    data-parentuid='f01bcb47-94d9-4c40-8e55-53a28b45134d'  data-role='togglebutton' type='button' role='button' aria-disabled='false'   tabindex='-1' aria-pressed='false' data-group='views'>
                 <span class='k-button-text'>Day</span>
             </button>
             <button class='k-view-week k-button k-button-md k-rounded-md   k-button-solid k-button-solid-base k-toggle-button k-toolbar-tool     k-button-rectangle' data-name='week'    data-uid='faac8830-48a5-4b51-9574-9a6c39166b45'    data-parentuid='f01bcb47-94d9-4c40-8e55-53a28b45134d'  data-role='togglebutton' type='button' role='button' aria-disabled='false'   tabindex='-1' aria-pressed='false' data-group='views'>
                 <span class='k-button-text'>Week</span>
             </button>
             <button class='k-view-month k-button k-button-md k-rounded-md  k-button-solid k-button-solid-base k-toggle-button k-toolbar-tool    k-button-rectangle k-selected' data-name='month'   data-uid='be7bd46b-e9db-49ee-9d1f-aaee385d1884'   data-parentuid='f01bcb47-94d9-4c40-8e55-53a28b45134d'     data-role='togglebutton' type='button' role='button' aria-disabled='false'  tabindex='-1' aria-pressed='true' data-group='views'>
                 <span class='k-button-text'>Month</span>
             </button>
             <button class='k-view-year k-button k-button-md k-rounded-md   k-button-solid k-button-solid-base k-toggle-button k-toolbar-tool     k-button-rectangle' data-name='year'    data-uid='d5aa93e5-ea56-48b7-a878-5f427722fb18'    data-parentuid='f01bcb47-94d9-4c40-8e55-53a28b45134d'  data-role='togglebutton' type='button' role='button' aria-disabled='false'   tabindex='-1' aria-pressed='false' data-group='views'>
                 <span class='k-button-text'>Year</span>
             </button>
             <button class='k-view-agenda k-button k-button-md k-rounded-md     k-button-solid k-button-solid-base k-toggle-button k-toolbar-tool   k-button-rectangle' data-name='agenda'    data-uid='bb93961e-ebe4-4e7a-bbaa-8fc4b8d69a90'    data-parentuid='f01bcb47-94d9-4c40-8e55-53a28b45134d'  data-role='togglebutton' type='button' role='button' aria-disabled='false'   tabindex='-1' aria-pressed='false' data-group='views'>
                 <span class='k-button-text'>Agenda</span>
             </button>
             <button class='k-view-timeline k-button k-button-md k-rounded-md   k-button-solid k-button-solid-base k-toggle-button k-toolbar-tool     k-group-end k-button-rectangle' data-name='timeline'    data-uid='f137d9d3-02be-47a9-8b3c-9f13513f8090'    data-parentuid='f01bcb47-94d9-4c40-8e55-53a28b45134d'  data-role='togglebutton' type='button' role='button' aria-disabled='false'   tabindex='-1' aria-pressed='false' data-group='views'>
                 <span class='k-button-text'>Timeline</span>
             </button>
       </span>`;


        $(document).ready(function () {
             $(".k-scheduler-mobile-views").replaceWith(buttonGroup);

             $("button[class*='k-view'] > .k-button-text").click(function (e) {
                 var scheduler = $("#scheduler").data("kendoScheduler");
                 var view = $(e.target).text().toLowerCase()

                 $(this).parent().addClass("k-selected");
                 $(this).parent().siblings().removeClass("k-selected");    

                 switch(view){
                     case 'day':
                         scheduler.view("day")
                         break;
                      case 'month':
                         scheduler.view("month")
                         break;
                     case 'agenda':
                         scheduler.view("agenda")
                         break;
                     case 'week':
                         scheduler.view("week")
                         break;
                     case 'timeline':
                         scheduler.view("timeline")
                         break;
                     case 'year':
                         scheduler.view("year")
                         break;      
                 }
             })
        })
        $(window).resize(function () {
            if (window.innerWidth < 1024) {
                $(".k-scheduler-mobile-views").replaceWith(buttonGroup);
            }
        })
        function parameterMap(options, operation) {
            if (operation !== "read" && options.models) {
                return { models: kendo.stringify(options.models) };
            }
        }
    </script>
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/GRbPcElf56LgXM3126) example.

## More {{ site.framework }} Scheduler Resources
* [{{ site.framework }} Scheduler Documentation]({%slug htmlhelpers_scheduler_aspnetcore %})
* [{{ site.framework }} Scheduler Demos](https://demos.telerik.com/{{ site.platform }}/scheduler/index)
{% if site.core %}
* [{{ site.framework }} Scheduler Product Page](https://www.telerik.com/aspnet-core-ui/scheduler)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)
{% else %}
* [{{ site.framework }} Scheduler Product Page](https://www.telerik.com/aspnet-mvc/scheduler)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Preserve the ButtonGroup View for Mobile Rendering in the Scheduler](https://netcorerepl.telerik.com/GRbPcElf56LgXM3126)
* [Client-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [Server-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/scheduler)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Scheduler for ASP.NET Core](https://docs.telerik.com/aspnet-core/api/taghelpers/scheduler)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)