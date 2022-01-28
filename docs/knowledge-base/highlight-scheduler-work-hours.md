---
title: Highlight Scheduler Work Hours
description: An example on how to highlight work hours in the Kendo UI Scheduler.
type: how-to
page_title: Highlight Work Hours | Kendo UI Scheduler for jQuery
slug: scheduler-highlight-work-hours
tags: highlight, work, hours, scheduler
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

How can I highlight work hours in the Kendo UI Scheduler?

## Solution

1. Iterate over the cells in the Scheduler content.
1. Apply custom CSS based on the current time and group.

```dojo
<div id="example">
    <div id="scheduler"></div>
</div>

<script>
    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        group: {
            resources: ["Rooms"],
            date: true
        },
        dataSource: [
            {
                id: 1,
                start: new Date("2013/6/6 08:00 AM"),
                end: new Date("2013/6/6 09:00 AM"),
                title: "Interview",
                roomId: 1
            },
            {
                id: 2,
                start: new Date("2013/6/6 08:00 AM"),
                end: new Date("2013/6/6 09:00 AM"),
                title: "Meeting",
                roomId: 2
            }
        ],
        resources: [
            {
                field: "roomId",
                name: "Rooms",
                dataColorField: "key",
                dataSource: [
                    { text: "Small meeting room", value: 1, key: "red" },
                    { text: "Big meeting room", value: 2, key: "green" }
                ]
            }
        ]
    });

    var scheduler = $("#scheduler").data("kendoScheduler"),
        view = scheduler.view(),
        elements = view.content.find("td");

    for (var i = 0; i < elements.length; i++) {
        var slot = scheduler.slotByElement($(elements[i]));

        if (slot.groupIndex == 0) {
            var startSlotMilliseconds = kendo.date.getMilliseconds(slot.startDate),
                endSlotMilliseconds = kendo.date.getMilliseconds(slot.endDate);

            if (startSlotMilliseconds / kendo.date.MS_PER_HOUR >= 8 &&
                endSlotMilliseconds / kendo.date.MS_PER_HOUR <= 12) {
                $(slot.element).css({ background: "#aabbcc" });
            }
        }
    }
</script>
```

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
