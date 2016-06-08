---
title: Timezones
page_title: Timezones | Kendo UI Scheduler
description: "Learn more about how to configure the timezones in the Kendo UI Scheduler widget."
slug: timezones_kendoui_scheduler_widget
position: 3
---

# Timezones

A [timezone](http://www.timeanddate.com/time/time-zones.html) refers to any of the 24 regions loosely divided by longitude, where the same standard time is kept.

## Basics

### JavaScript Date Object

In JavaScript the `Date` object represents a single moment in time, measured in the number of milliseconds since 01 January, 1970 UTC. The `Date` objects are [always created by using the current browser timezone offset](http://www.ecma-international.org/ecma-262/6.0/#sec-localtime).

The example below demonstrates how to construct a new `Date` object.

###### Example

    new Date(2014,1,1,12,0,0);

The result in the browser console shows that your current timezone offset is already applied:

    Sat Feb 01 2014 12:00:00 GMT+0200 (FLE Standard Time)

### The JSON.stringify Method

If you try to convert the previously created JavaScript `Date` to a JSON string by using the [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method, the result is:

    ""2014-02-01T10:00:00.000Z""

## Configuration

You can define a [timezone](/api/javascript/ui/scheduler#configuration-timezone) option to Kendo UI Scheduler. It idicates to the widget what timezone to apply when displaying the appointment dates.

The timezones option is not set by default and, therefore, the [event dates will be created based on the current client timezone offset](#configuration-Scheduler). This means that users from different timezones will see different start and end times. On the other hand, setting the Scheduler [timezone](/api/javascript/ui/scheduler#configuration-timezone) will force the widget to show the same start and end times regardless of the user's timezone.

> **Important**  
> * When you use remote binding, Kendo UI Scheduler expects to receive UTC dates. Respectively, it will send them back to the server in UTC. The service in use is responsible for keeping the dates in UTC, without offsetting them against its local time.
> * When you bind the Scheduler to a remote service, it is recommended that you keep the `timezone` option always set, for example, to `"Etc/UTC"`.
> * When the `timezone` option of the Scheduler is not set, the current system timezone offset is used.
> * The recommended `Date` format for sending and receiving Scheduler event dates is [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) with a **Z** zone designator (UTC date). The same format is used by the [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method, which converts JavaScript `Date` objects to JSON strings.

Based on the specifics of the JavaScript `Date` object explained above, the Scheduler needs to adjust the dates of the events when reading and sending them.

### Read Events from Data Source

1.  [`SchedulerEvent`](/api/javascript/data/SchedulerEvent) instances are created, where start/end dates are instatiated as JavaScript `Date` objects. During the process the [dates will be offset against the local time](http://www.ecma-international.org/ecma-262/6.0/#sec-localtime).

2. If the [`timezone`](/api/javascript/ui/scheduler#configuration-timezone) option is defined, the widget removes the local timezone offset, converting dates to UTC. Then, it applies the defined timezone value, e.g. **America/New_York**.

### Send Events to Remote Service

1. If the [`timezone`](/api/javascript/ui/scheduler#configuration-timezone) option is defined, the widget removes the applied timezone offset, e.g. **America/New_York**, converting dates to UTC. Then, it applies the local time.

2. [`SchedulerEvent`](/api/javascript/data/SchedulerEvent) instances are serialized using [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). In the process, the dates are converted to UTC and then formatted according to the [ISO8601 format](https://en.wikipedia.org/wiki/ISO_8601).

### Scheduler with No Timezone Option

If you choose not to define a timezone option, your system timezone settings will apply by deafault. Yet, you can customize them so you can deliver an appointment date either in the local offset, or in UTC.

If you run the first example below, the Scheduler will show the dates in the local timezone offset. This means that the event will be displayed as scheduled for 2:00pm, regardless of your location - whether you are in the **Europe/Berlin** timezone, for instance, or in the **Europe/Sofia** one.

The example below demonstrates how to bind the Scheduler to local dates when the `timezone` option is not set.

###### Example

````html
    <div id="scheduler"></div>
    <script>
    $(function() {
        $("#scheduler").kendoScheduler({
            date: new Date("2013/6/13"),
            startTime: new Date("2013/6/13 10:00"),
            endTime: new Date("2013/6/13 23:00"),
            height: 600,
            views: ["day"],
            editable: false,
            dataSource: [
                {
                    title: "The Internship",
                    image: "../content/web/scheduler/the-internship.jpg",
                    imdb: "http://www.imdb.com/title/tt2234155/",
                    start: new Date("2013/6/13 14:00"),
                    end: new Date("2013/6/13 15:30")
                }
            ]
        });
    });
    </script>
````

If you run the second example below, the Scheduler will show the dates according to the UTC convention. This means that the event will be displayed as scheduled for 4:00pm if you are in the **Europe/Berlin** timezone, for instance, while if you are in the **Europe/Sofia** timezone, the event will appear as scheduled for 5:00pm.  

The example below demonstrates how to bind the Scheduler to UTC dates when the `timezone` option is not set.

###### Example

````html
    <div id="scheduler"></div>
    <script>
    $(function() {
        $("#scheduler").kendoScheduler({
            date: new Date("2013/6/13"),
            startTime: new Date("2013/6/13 10:00"),
            endTime: new Date("2013/6/13 23:00"),
            height: 600,
            views: ["day"],
            editable: false,
            dataSource: [
                {
                    title: "The Internship",
                    image: "../content/web/scheduler/the-internship.jpg",
                    imdb: "http://www.imdb.com/title/tt2234155/",
                    start: new Date("2013-06-13T14:00:00.000Z"),
                    end: new Date("2013-06-13T15:30:00.000Z")
                }
            ]
        });
    });
    </script>
````

## See Also

Other articles on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [Overview of the Scheduler Widget]({% slug overview_kendoui_scheduler_widget %})
* [Resources]({% slug resources_kendoui_scheduler_widget %})

For how-to examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
