---
title: Timezones
page_title: Overview of the Scheduler timezone option
description: Overview of the Scheduler timezone option
---

# Timezones Overview
A ['Time Zone'](http://www.timeanddate.com/time/time-zones.html) refers to any of 24 regions loosely divided by longitude, where the same standard time is kept.

## Timezones and the JavaScript `Date` object
In JavaScript the `Date` object represents single moment in time measured in milliseconds since 01 January 1970. It is important to mention that the JavaScript `Date` objects are [always crated using the current browser timezone offset](http://www.ecma-international.org/ecma-262/6.0/#sec-localtime). That why if you create new `Date` as follows:

    new Date(2014,1,1,12,0,0);

The result in the browser console will show that your current timezone offset is already applied:

    Sat Feb 01 2014 12:00:00 GMT+0200 (FLE Standard Time)

If you try to stringify the previously created `Date` using [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method the result will be as follows:

    ""2014-02-01T10:00:00.000Z""

## Timezones and Kendo UI Scheduler
In Kendo UI Scheduler there is a [timezone](/api/javascript/ui/scheduler#configuration-timezone) option which is used to tell the widget in which timezone to show the appointment dates. By default this option is **not set** and therefor the [event dates will be created with current client timezone offset](/web/scheduler/timezones#timezone-option-is-not-set). This means that *users from different timezone will see different start and end times*. On the other hand setting the Scheduler [timezone](/api/javascript/ui/scheduler#configuration-timezone) will force the widget to display the *same start and end times* regardless the user's timezone.

> When remote binding is used the Kendo UI Scheduler **expects to receive "UTC" dates**. Respectively, it will send them back to the server in UTC timezone. The **service in use is responsible for keeping the dates in UTC timezone**, without offsetting them with it's local time.

> When the Scheduler is bind to remote service it is recommended that the **timezone** option is always set, for example to "Etc/UTC".

> When the **timezone** option of the Scheduler is not set the current system timezone offset is used.

> Recommended `Date` format for sending and receiving Scheduler event dates is [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) with "Z" zone designator (UTC date). The same format is used by [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method converting `Date` objects to JSON.

Based on the specifics of the JavaScript `Date` object explained above, the Scheduler needs to adjust the dates of the events when reading and sending them:

### Reading events from remote source or local array

1) [SchedulerEvent](/api/framework/SchedulerEvent) instances are created, where start/end dates are instatiated as JavaScript `Date` objects.
In that process, [dates will be offset with local time](http://www.ecma-international.org/ecma-262/6.0/#sec-localtime). 

1) if [timezone](/api/javascript/ui/scheduler#configuration-timezone) option is defined, widget will remove the local timezone offset, converting dates to UTC timezone.
Then it will apply the defined timezone value (e.g. 'America/New_York').

### Sending events to remote service

1) if [timezone](/api/javascript/ui/scheduler#configuration-timezone) option is defined, widget will remove the applied timezone offset (e.g. 'America/New_York'), converting dates to UTC timezone. Then it will apply the local time.

1) [SchedulerEvent](/api/framework/SchedulerEvent) instances will be serialized using [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). In this process, the dates will be converted to UTC timezone and then formatted into [ISO8601 format](https://en.wikipedia.org/wiki/ISO_8601).

## Scheduler without timezone option

In this case the Scheduler will show the dates unchanged - *they will be in the local timezone offset*. Please consider the following examples of using the Scheduler without the "timezone" option. You can change your system timezone setting to see what is the difference between them.

1) Bind the Scheduler to local dates with no "timezone" option set:
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
1) Bind the Scheduler to UTC dates with no "timezone" option set:
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