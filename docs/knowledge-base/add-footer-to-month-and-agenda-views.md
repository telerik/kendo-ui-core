---
title: Add Footer to Month and Agenda Views in Scheduler
description: An example on how to add a footer to the month and agenda views of the Kendo UI Scheduler.
type: how-to
page_title: Add Footer to Month and Agenda Views | Kendo UI Scheduler
slug: add-footer-to-month-and-agenda-views
tags: add, footer, month, agenda, views, scheduler
ticketid: 1116003
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

How can I add a footer in the month and agenda views of the Scheduler?

## Suggested Workarounds

The Kendo UI Scheduler does not provide a built-in solution for achieving this behavior. However, you can still work around the issue.

Add a footer by using jQuery in the `dataBound` event handler of the Scheduler. The following example demonstrates how to apply this approach.

```dojo
<div id="scheduler"></div>
<script>
$("#scheduler").kendoScheduler({
    date: new Date("2013/6/6"),
    views: ["day", "month", "agenda"],
    allDaySlot: false,
    dataSource: [
        {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
        }
    ],
    dataBound: function(e) {
        $(".custom-footer").remove();
        if(e.sender.view().name == "agenda" || e.sender.view().name == "month") {
            $(".k-scheduler").append('<div class="k-header k-scheduler-footer custom-footer"><input type="button" class="k-button" value="MyButton" /></div>');
        }
    }
});
</script>
```
