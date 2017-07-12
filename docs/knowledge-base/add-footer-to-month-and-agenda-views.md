---
title: Add Footer to Month and Agenda Views of Scheduler
description: An example on how to add a footer to month and agenda views of the Scheduler
type: how-to
page_title: Add Footer to Month and Agenda Views | Kendo UI Scheduler
slug: add-footer-to-month-and-agenda-views
position: 
tags: add, footer, month, agenda, views, scheduler
ticketid: 1116003
---
                    
## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Scheduler for Progress Kendo UI</td>
 </tr>
</table>

## Description

There is no footer in month and agenda views of the Scheduler. How can I add one?

## Suggested Workarounds

By design a footer is not displayed in month and agenda views. As a workaround, you can add a footer with jQuery in the dataBound event handler of the Scheduler using the following approach:

```html
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
