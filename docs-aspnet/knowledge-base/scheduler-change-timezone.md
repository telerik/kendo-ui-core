---
title: Changing the Time Zone of the Scheduler Dynamically
description: Learn how to dynamically change the timezone of the {{ site.product }} Scheduler.
type: how-to
page_title: Changing the Time Zone of the Scheduler
slug: scheduler-change-timezone
tags: scheduler, timezone, telerik, core, mvc
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Scheduler</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2025.1.227</td>
 </tr>
</table>

## Description

How can I change the time zone in {{ site.framework }} Scheduler component after initialization?

## Solution

By default, the Scheduler alters its displayed data depending on the defined .Timezone() setting. In some cases, you may want to allow the end user to change the time zone of the scheduler dynamically, even after it has been initialized.

To achieve this requirement, you can create a standalone DataSource instance and then pass it to the Scheduler definition.

Then, you can present the user with a selection component like a DropDownList and when he makes a selection, you can reset the Scheduler's DataSource:

```Razor
<script src="https://kendo.cdn.telerik.com/2025.1.227/js/kendo.timezones.min.js"></script>

<script>
    $(document).ready(function(){
            $(".k-nav-current").after(`<select id='timeZoneChooser' onchange='changeTimeZone(this);' >
				    <option>Etc/UTC</option>
				    <option>Europe/London</option>
				</select>`);
            $("#timeZoneChooser").kendoDropDownList();
            changeTimeZone($("#timeZoneChooser")[0]);
    });

    function changeTimeZone(selectEl){
        var scheduler=$("#scheduler").data().kendoScheduler;
        scheduler.setDataSource(getDataSource(selectEl.value));
    }

    function getDataSource(timeZoneName)
    {
        return new kendo.data.SchedulerDataSource({
                                            "type": (function() {
                                                if (kendo.data.transports['aspnetmvc-ajax']) {
                                                    return 'aspnetmvc-ajax';
                                                } else {
                                                    throw new Error('The kendo.aspnetmvc.min.js script is not included.');
                                                }
                                            }
                                            )(),
                                            "transport": {
                                                "read": {
                                                    "url": "/aspnet-core/scheduler/events_read"
                                                },
                                                "prefix": "",
                                                "update": {
                                                    "url": "/aspnet-core/scheduler/events_update"
                                                },
                                                "create": {
                                                    "url": "/aspnet-core/scheduler/events_create"
                                                },
                                                "destroy": {
                                                    "url": "/aspnet-core/scheduler/events_destroy"
                                                },
                                                "stringifyDates": true
                                            },
                                            "schema": {
                                                "timezone": timeZoneName,
                                                "data": "Data",
                                                "total": "Total",
                                                "errors": "Errors",
                                                "model": {
                                                    "id": "TaskID",
                                                    "fields": {
                                                        "TaskID": {
                                                            "type": "number"
                                                        },
                                                        "title": {
                                                            "from": "Title",
                                                            "type": "string",
                                                            "defaultValue": "No title"
                                                        },
                                                        "description": {
                                                            "from": "Description",
                                                            "type": "string"
                                                        },
                                                        "start": {
                                                            "from": "Start",
                                                            "type": "date"
                                                        },
                                                        "startTimezone": {
                                                            "from": "StartTimezone",
                                                            "type": "string"
                                                        },
                                                        "end": {
                                                            "from": "End",
                                                            "type": "date"
                                                        },
                                                        "endTimezone": {
                                                            "from": "EndTimezone",
                                                            "type": "string"
                                                        },
                                                        "recurrenceRule": {
                                                            "from": "RecurrenceRule",
                                                            "type": "string"
                                                        },
                                                        "recurrenceId": {
                                                            "from": "RecurrenceID",
                                                            "type": "number",
                                                            "defaultValue": null
                                                        },
                                                        "recurrenceException": {
                                                            "from": "RecurrenceException",
                                                            "type": "string"
                                                        },
                                                        "isAllDay": {
                                                            "from": "IsAllDay",
                                                            "type": "boolean"
                                                        },
                                                        "OwnerID": {
                                                            "type": "number",
                                                            "defaultValue": null
                                                        }
                                                    }
                                                }
                                            }
                                        });
    }
</script>

@(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
    .Name("scheduler")
    .Date(new DateTime(2025, 6, 13))
    .StartTime(new DateTime(2025, 6, 13, 14, 00, 00))
    .Height(600)
    .Selectable(true)
    .Views(views =>
    {
        views.DayView();
        views.WeekView(weekView => weekView.Selected(true));
        views.MonthView();
        views.AgendaView();
        views.TimelineView();
    })
)


<style>
    .k-list-content.k-list-scroller{
        height: 60px;
    }
</style>
```

You can see the solution in action with this live example:
https://netcorerepl.telerik.com/QTaHmels14bMwUio16

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
* [Server-Side TagHelper API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/scheduler)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

