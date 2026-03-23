---
title: Create a Scheduler Event from Selected Time Slots
page_title: Create a Scheduler Event from Selected Time Slots
description: Learn how to create Scheduler events from selected time slots in Telerik UI for ASP.NET Core and MVC.
type: how-to
slug: scheduler-create-event-from-selected-time-slots
tags: scheduler, selectable, time slots, add event, aspnet core, aspnet mvc
res_type: kb
components: ["general"]
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Scheduler</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2026.1.212</td>
 </tr>
</table>

## Description

How can I drag across empty Scheduler slots, keep the selected time range, and then create an appointment from that selection?

## Cause

The Scheduler supports selecting slots when [`Selectable(true)`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/selectable) is enabled, but it does not provide a built-in command that creates an event from the current slot selection.

## Solution

Enable slot selection in the Scheduler with [`Selectable(true)`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/selectable), store the selected range in the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/change) event, and use a custom button to call [`addEvent()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/methods/addevent) with that range.

```Razor
@(Html.Kendo().Scheduler<MeetingViewModel>()
    .Name("scheduler")
    .Selectable(true)
    .Events(e => e.Change("onSchedulerChange"))
)

<button id="createEventBtn" class="k-button k-button-primary">
    Create Event from Selection
</button>

<script>
    var selectedRange = null;

    function onSchedulerChange(e) {
        selectedRange = {
            start: e.start,
            end: e.end,
            isAllDay: e.slots && e.slots.length && e.slots[0].isAllDay
        };
    }

    $("#createEventBtn").kendoButton({
        themeColor: "primary",
        click: onClick
    });

    function onClick() {
        if (!selectedRange) {
            alert("Please select a time range first.");
            return;
        }

        var scheduler = $("#scheduler").data("kendoScheduler");

        scheduler.addEvent({
            start: selectedRange.start,
            end: selectedRange.end,
            isAllDay: selectedRange.isAllDay,
            title: "New Event",
            OwnerID: getSelectedOwner()
        });
    }
</script>
```

## See Also

* [Client-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [Server-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/scheduler)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/scheduler)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)