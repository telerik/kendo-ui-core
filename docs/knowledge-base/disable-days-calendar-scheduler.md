---
title: Disable Days in the Popup Calendar of the Scheduler
description: An example on how to disable days in the popup calendar of the kendo UI Scheduler.
type: how-to
page_title: Disable Days in Popup Calendars | Kendo UI Scheduler
slug: disable-days-calendar-scheduler
tags: kendo, kendoui, scheduler, disable, days, calendar, popup
ticketid: 1134481
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
</table>


## Description

How to disable particular days&mdash;for example, Sundays&mdash; in the popup calendar of the Kendo UI Scheduler widget?

## Solution

1. Subscribe for the `click` event of the date link.
1. Get a reference to the Kendo UI Calendar.
1. Use the `setOptions` method to specify the `disabledDates` with a `timeOut`. You need the timeout because at the time of the `click` event, the calendar is not yet initialized.

```dojo
<div id="scheduler"></div>
<script>
    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        views: ["day", "month"], // day and month views
        dataSource: [{
                id: 1,
                start: new Date("2013/6/6 08:00 AM"),
                end: new Date("2013/6/6 09:00 AM"),
                title: "Interview"
            },
            {
                id: 2,
                start: new Date("2013/6/6 08:00 AM"),
                end: new Date("2013/6/6 09:00 AM"),
                title: "Meeting"
            }
        ]
    });
    var schedDateLink = $('ul.k-scheduler-navigation').find('.k-nav-current');
    schedDateLink.on('click', function() {
        setTimeout(function() {
            var schedCalendar = $('.k-scheduler-calendar.k-widget.k-calendar').data('kendoCalendar');
            schedCalendar.setOptions({
                disableDates: ['su']
            });
        }, 100);
    });
</script>

```
