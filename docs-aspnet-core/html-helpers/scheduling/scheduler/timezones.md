---
title: Timezones
page_title: Timezones | Telerik UI for ASP.NET Core Scheduler HtmlHelper
description: "Get started with the Scheduler HtmlHelper for ASP.NET Core and learn how to configure its timezone."
slug: htmlhelpers_scheduler_timezones_aspnetcore
position: 4
---

# Timezones

A [timezone](http://www.timeanddate.com/time/time-zones.html) refers to any of the 24 regions loosely divided by longitude, where the same standard time is kept.

## Configuration

You can define a [timezone](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/timezone) option to Scheduler HtmlHelper. It indicates to the widget what timezone to apply when displaying the appointment dates.

The example below demonstrates how to set `"Etc/UTC"` timezone to the Scheduler.

###### Example

```
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
        .Height(600)
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
        })
        .Timezone("Etc/UTC")
        .DataSource(d => d
                .Model(m =>
                {
                    m.Id(f => f.MeetingID);
                    m.Field(f => f.Title).DefaultValue("No title");
                    m.RecurrenceId(f => f.RecurrenceID);
                    m.Field(f => f.Title).DefaultValue("No title");
                })
            .Read("Meetings_Read", "Scheduler")
            .Create("Meetings_Create", "Scheduler")
            .Destroy("Meetings_Destroy", "Scheduler")
            .Update("Meetings_Update", "Scheduler")
        )
    )
```

The timezones option is not set by default and, therefore, the event dates will be created based on the current client timezone offset. This means that users from different timezones will see different start and end times. On the other hand, setting the Scheduler [timezone](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/timezone) will force the widget to show the same start and end times regardless of the user's timezone.

> **Important**
> * When you use remote binding, the Scheduler expects to receive UTC dates. Respectively, it will send them back to the server in UTC. The service in use is responsible for keeping the dates in UTC, without offsetting them against its local time.
> * When you bind the Scheduler to a remote service, keep the `timezone` option always set to, for example, `"Etc/UTC"`.
> * When the `timezone` option of the Scheduler is not set, the current system timezone offset is used.
> * The recommended `Date` format for sending and receiving Scheduler event dates is [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) with a **Z** zone designator (UTC date). The same format is used by the [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method, which converts JavaScript `Date` objects to JSON strings.

### Read Events from Data Source

If the [`timezone`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/timezone) option is defined, the widget removes the local timezone offset, converting dates to UTC. Then, it applies the defined timezone value, e.g. **America/New_York**.

### Send Events to Remote Service

1. If the [`timezone`](/api/javascript/ui/scheduler/configuration/timezone) option is defined, the widget removes the applied timezone offset, e.g. **America/New_York**, converting dates to UTC. Then, it applies the local time.

2. [`SchedulerEvent`](/api/javascript/data/schedulerevent) instances are serialized using [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). In the process, the dates are converted to UTC and then formatted according to the [ISO8601 format](https://en.wikipedia.org/wiki/ISO_8601).

### Scheduler with No Timezone Option

If you choose not to define a timezone option, your system timezone settings will apply by default. 

## See Also

* [Overview of the Scheduler HtmlHelper]({% slug htmlhelpers_scheduler_aspnetcore %})
* [Adaptive Rendering of the Scheduler (Demo)](https://demos.telerik.com/aspnet-core/scheduler/adaptiverendering)
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug knownissues_aspnetmvc6_aspnetmvc %})
