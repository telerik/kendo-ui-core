---
title: Prevent Adding New Events And Deleting The Exisitng Ones In Scheduler
description: Learn how to prevent adding new events and deleting the existing ones Kendo UI Scheduler.
type: how-to
page_title: Prevent Adding New Events And Deleting The Exisitng Ones - Kendo UI Scheduler for jQuery
slug: scheduler-prevent-adding-new-events
tags: kendo, kendo-ui, scheduler
ticketid: 1110078
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
 </tr>
</table>

## Description

I want to allow user to edit the existing events, but I want to prevent adding new events or deleting the existing ones. How can I do that?

## Solution

1. Handle the [`add`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/add) event of the Scheduler and prevent the default behavior.
1. Set [`editable.destroy`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/editable.destroy) option to `false`.

```dojo
	<div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2021/6/6"),
        startTime: new Date("2021/6/6 08:00"),
        endTime: new Date("2021/6/6 18:00"),
        editable: {
          destroy: false
        },
        add: function(e) {
          e.preventDefault();
        },
        views: [
          { type: "week" }
        ],
        dataSource: [
          {
            id: 1,
            start: new Date("2021/6/6 08:00 AM"),
            end: new Date("2021/6/6 09:00 AM"),
            title: "Interview 1"
          },
          {
            id: 2,
            start: new Date("2021/6/7 12:00 PM"),
            end: new Date("2021/6/7 1:00 PM"),
            title: "Interview 2"
          },
          {
            id: 3,
            start: new Date("2021/6/8 2:00 PM"),
            end: new Date("2021/6/8 3:00 PM"),
            title: "Interview 3"
          }
        ]
      });
    </script>
```

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
