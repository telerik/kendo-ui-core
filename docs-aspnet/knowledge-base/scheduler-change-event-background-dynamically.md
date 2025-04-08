---
title: Change the Background Color of an Event Dynamically in the Scheduler
description: Learn how to dynamically change the dynamically color of the entire event in the {{ site.product }} Scheduler.
page_title: Change the Background Color of an Event Dynamically in the Scheduler
slug: scheduler-change-event-background
tags: background, change, databound, scheduler, telerik, core, mvc, wrappers,
ticketid: 1642965
res_type: kb
component: scheduler
---


## Environment
<table>
    <tbody>
        <tr>
            <td>Product Version</td>
            <td>2024.1.130</td>
        </tr>
        <tr>
            <td>Product</td>
            <td>{{ site.product }} Scheduler</td>
        </tr>
    </tbody>
</table>


## Description

How can I change the color of the entire element of the {{ site.product }} Scheduler component's events dynamically?

## Solution

1. Create a property within the Scheduler Model that will hold the `Color` field. 
2. Subscribe to the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/schedulereventbuilder#databoundsystemstring) event of the Scheduler.
3. Within the event handler, iterate over the event records and their DOM element counterparts and explicitly change their background color by using the jQuery [`css()`](https://api.jquery.com/css/) method.

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().Scheduler<SchedulerModel>()
        .Name("scheduler")
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Editable(false)
        .Events(events => events.DataBound("onDataBound"))
        .Views(views =>
        {
            views.DayView();
            views.WorkWeekView(workWeekView =>
            {
                workWeekView.Selected(true);
            });
            views.WeekView();
            views.MonthView();
        })
        .Timezone("Etc/UTC")
        .BindTo(@data)
    )
```
```TagHelper
    <kendo-scheduler name="scheduler" 
        height="400"
        timezone="Etc/UTC"
        on-data-bound="onDataBound">
        <views>
            <view type="day"></view>
            <view type="week" selected="true"></view>
            <view type="month"></view>
            <view type="agenda"></view>
            <view type="timeline"></view>
        </views>
        <scheduler-datasource type="DataSourceTagHelperType.Ajax" page-size="20"    server-operation="false" data="@data">
             <schema data="Data" total="Total" errors="Errors">
                <scheduler-model id="TaskID">
                    <fields>
                        <field name="TaskID" type="number"></field>
                        <field name="title" from="Title" type="string"></field>
                        <field name="start" from="Start" type="date"></field>
                        <field name="end" from="End" type="date"></field>
                        <field name="description" from="Description" type="string"></field>
                        <field name="recurrenceId" from="RecurrenceID" type="number"    default-value=null></field>
                        <field name="recurrenceRule" from="RecurrenceRule" type="string" ></    field>
                        <field name="recurrenceException" from="RecurrenceException"    type="string"></field>
                        <field name="OwnerID" type="number" default-value="1"></field>
                        <field name="startTimezone" from="StartTimezone" type="string"></   field>
                        <field name="endTimezone" from="EndTimezone" type="string"></field>
                        <field name="isAllDay" from="IsAllDay" type="boolean"></field>
                    </fields>
                </scheduler-model>
            </schema>
        </scheduler-datasource>
    </kendo-scheduler>
```
{% else %}
```Razor Index.cshtml
    @(Html.Kendo().Scheduler<SchedulerModel>()
        .Name("scheduler")
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Editable(false)
        .Events(events => events.DataBound("onDataBound"))
        .Views(views =>
        {
            views.DayView();
            views.WorkWeekView(workWeekView =>
            {
                workWeekView.Selected(true);
            });
            views.WeekView();
            views.MonthView();
        })
        .Timezone("Etc/UTC")
        .BindTo(@data)
    )
```
{% endif %}
```C# SchedulerModel.cs
public class SchedulerModel : ISchedulerEvent
    {
        public int TaskID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public string Color {get;set;} // Property that will be used in the DataBound event handler.

        private DateTime start;
        public DateTime Start
        {
            get
            {
                return start;
            }
            set
            {
                start = value.ToUniversalTime();
            }
        }

        public string StartTimezone { get; set; }

        private DateTime end;
        public DateTime End
        {
            get
            {
                return end;
            }
            set
            {
                end = value.ToUniversalTime();
            }
        }

        public string EndTimezone { get; set; }

        public string RecurrenceRule { get; set; }
        public int? RecurrenceID { get; set; }
        public string RecurrenceException { get; set; }
        public bool IsAllDay { get; set; }
        public int? OwnerID { get; set; }

        public Task ToEntity()
        {
            return new Task
            {
                TaskID = TaskID,
                Title = Title,
                Start = Start,
                StartTimezone = StartTimezone,
                End = End,
                EndTimezone = EndTimezone,
                Description = Description,
                RecurrenceRule = RecurrenceRule,
                RecurrenceException = RecurrenceException,
                RecurrenceID = RecurrenceID,
                IsAllDay = IsAllDay,
                OwnerID = OwnerID
            };
        }
    }
```
```JS script.js
    <script>
        function onDataBound(e) {
            var view = this.view();
            var events = this.dataSource.view(); // 1. Gather the currently present events  in the view.
            var eventElement; // 2. Create Flag variables for the event DOM element and  event object representation.
            var event;
            debugger;
            for (var idx = 0, length = events.length; idx < length; idx++) { // 3. Iterate  over each of the event entries.
                event = events[idx];
                eventElement = view.element.find("[data-uid=" + event.uid + "]"); // 4.     Gather the DOM representation of the currently iterated event.
                // Set the background of the element.
                eventElement.css("background-color", event.Color); // 5. Change the color   based on the established color field coming from the event model.
            }
        }
    </script>
```

{% if site.core %}
To see a full implementation of the aforementioned approach refer to the following Telerik REPL examples:

* [Telerik REPL for ASP.NET Core HtmlHelper example](https://netcorerepl.telerik.com/Qeanlele03s7oTLW20)
* [Telerik REPL for ASP.NET Core TagHelper example](https://netcorerepl.telerik.com/cyuRlIPI10U2pTvP54)

{% else %}
To see a full implementation of the aforementioned approach refer to the following [REPL example on dynamically changing the background color of specified events in the Scheduler](https://netcorerepl.telerik.com/Qeanlele03s7oTLW20).
{% endif %}

## More {{ site.framework }} Scheduler Resources

* [{{ site.framework }} Scheduler Documentation]({%slug htmlhelpers_scheduler_aspnetcore%})

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
* [Client-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [Server-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/scheduler)
{% if site.core %}
* [TagHelper API reference of the Scheduler](https://docs.telerik.com/aspnet-core/api/taghelpers/scheduler)
{% endif %}
* [Change Scheduler event background dynamically Telerik REPL (HtmlHelper)](https://netcorerepl.telerik.com/Qeanlele03s7oTLW20)
{% if site.core %}
* [Change Scheduler event background dynamically Telerik REPL (TagHelper)](https://netcorerepl.telerik.com/cyuRlIPI10U2pTvP54)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
