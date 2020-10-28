---
title: Timezones
page_title: jQuery Scheduler Documentation | Timezones
description: "Get started with the jQuery Scheduler by Kendo UI and learn how to configure its timezones."
slug: timezones_kendoui_scheduler_widget
position: 5
---

# Timezones

A [timezone](http://www.timeanddate.com/time/time-zones.html) refers to any of the 24 regions loosely divided by longitude and which keep the same time standard.

## Getting Started

In JavaScript, the `Date` object represents a single moment in time that is measured in the number of milliseconds since 01 January, 1970 UTC. The `Date` objects are [always created by using the current browser timezone offset](http://www.ecma-international.org/ecma-262/6.0/#sec-localtime).

To construct a new `Date` object, set `new Date(2014,1,1,12,0,0);`. The result in the browser console shows that your current timezone offset is already applied and is `Sat Feb 01 2014 12:00:00 GMT+0200 (FLE Standard Time)`. If you try to convert the previously created JavaScript `Date` to a JSON string by using the [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method, the result will be `""2014-02-01T10:00:00.000Z""`.

## Basic Configuration

You can define a [timezone](/api/javascript/ui/scheduler/configuration/timezone) option in the Scheduler. It indicates to the widget what timezone to apply for displaying its appointment dates. By default, the `timezone` option is not set and, therefore, the [event dates will be created based on the current client timezone offset](#configuration-Scheduler). This means that users from different timezones will see different start and end times. On the other hand, setting the Scheduler [timezone](/api/javascript/ui/scheduler/configuration/timezone) will force the widget to display the same start and end times regardless of the user timezone.

> * When you use remote binding, the Scheduler expects to receive UTC dates. Respectively, it will send them back to the server in UTC. The service in use is responsible for keeping the dates in UTC, without offsetting them against its local time.
> * When you bind the Scheduler to a remote service, keep the `timezone` option always set to, for example, `"Etc/UTC"`.
> * When the `timezone` option of the Scheduler is not set, the current system timezone offset is used.
> * The recommended `Date` format for sending and receiving Scheduler event dates is [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) with a **Z** zone designator (UTC date). The same format is used by the [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method, which converts JavaScript `Date` objects to JSON strings.

## Reading Events from the DataSource

Based on the specifics of the JavaScript `Date` object, the Scheduler needs to adjust the dates of the events when reading them.

* The Scheduler creates [`SchedulerEvent`](/api/javascript/data/schedulerevent) instances where start and end dates are instantiated as JavaScript `Date` objects. During the process, the [dates will be offset against the local time](http://www.ecma-international.org/ecma-262/6.0/#sec-localtime).
* If the [`timezone`](/api/javascript/ui/scheduler/configuration/timezone) option is defined, the widget will remove the local timezone offset and will convert dates to UTC. Then, it will apply the defined timezone value, for example, **America/New_York**.

## Sending Events to the Remote Service

Based on the specifics of the JavaScript `Date` object, the Scheduler needs to adjust the dates of the events when sending them.

* If the [`timezone`](/api/javascript/ui/scheduler/configuration/timezone) option is defined, the widget will remove the applied timezone offset, for example, **America/New_York** and will convert dates to UTC. Then, it will apply the local time.
* The Scheduler serializes [`SchedulerEvent`](/api/javascript/data/schedulerevent) instances by using [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). In the process, the dates are converted to UTC and then formatted according to the [ISO8601 format](https://en.wikipedia.org/wiki/ISO_8601).

## Schedulers with a No-Timezone Option

If you do not define a timezone option, your system timezone settings will apply by default. You can still customize the timezone settings so that you can deliver an appointment date either in the local offset or in UTC.

> When you use formats for parsing UTC date strings, [apply the `zzz` specifier]({% slug dateparsing_kendoui_globalization %}#parse-utc-date-strings) to render the local time. Otherwise, the current browser timezone offset will apply.

The following example demonstrates how to bind the Scheduler to local dates when the `timezone` option is not set. If you run it, the Scheduler will show the dates in the local timezone offset. This means that the event will be displayed as scheduled for 2:00pm, regardless of your location&mdash;whether you are in the **Europe/Berlin** timezone, for instance, or in the **Europe/Sofia** one.

````dojo
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

The following example demonstrates how to bind the Scheduler to UTC dates when the `timezone` option is not set. If you run it, the Scheduler will show the dates according to the UTC convention. This means that the event will be displayed as scheduled for 4:00pm if you are in the **Europe/Berlin** timezone, for instance, while if you are in the **Europe/Sofia** timezone, the event will appear as scheduled for 5:00pm.

````dojo
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

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
