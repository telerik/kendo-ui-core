---
title: Disable days in the popup calendar of Scheduler
description: An example on how to disable days in the popup calendar of Scheduler
type: how-to
page_title: Disable days in the popup calendar of Scheduler | Kendo UI Scheduler
slug: disable-days-calendar-scheduler
position: 0
tags: kendo, kendoui, scheduler, disable, days, calendar, popup
ticketid: 1134481
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Scheduler for Progress® Kendo UI®</td>
 </tr>
</table>


## Description
How to disable days (trying to disable Sundays) in the popup calendar in the Scheduler widget?

## Solution

In order to disable the dates in the calendar, incorporated in the Scheduler, you should go through the folowing steps:

1. Subscribe for the click event of the Date link.
1. Get a reference to the Kendo Calendar.
1. Use setOptions method to specify the disabledDates with a timeOut. (the timeout is needed, because at the time of the click event, the calendar is not yet initialized)

```html
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
