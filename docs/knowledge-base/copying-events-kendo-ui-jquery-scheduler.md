---
title: Copying Events in Kendo UI for jQuery Scheduler
description: Learn how to copy events in the Kendo UI for jQuery Scheduler by using the Ctrl key and address event cloning challenges.
type: how-to
page_title: How to Copy Events in Kendo UI for jQuery Scheduler Using Ctrl Key
meta_title: How to Copy Events in Kendo UI for jQuery Scheduler Using Ctrl Key
slug: copying-events-kendo-ui-jquery-scheduler
tags: scheduler, kendo ui for jquery, move, clone, event
res_type: kb
ticketid: 1695005
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery Scheduler
</td>
</tr>
<tr>
<td> Version </td>
<td> 2026.1.212 </td>
</tr>
</tbody>
</table>

## Description

I want to copy an event in the [Kendo UI for jQuery Scheduler](https://www.telerik.com/kendo-jquery-ui/documentation/controls/scheduler/overview) by dragging it while holding the Ctrl key. However, when using the inline mode, the drag-and-drop functionality behaves differently compared to full-screen mode. Additionally, after copying an event, moving the copied event moves the original event instead. When copying events, no `create` or `update` request is sent to the server, but moving the new event triggers the `update` request correctly.

This knowledge base article also answers the following questions:

- How to copy events in Kendo UI for jQuery Scheduler using Ctrl key?
- Why does moving the copied event in Scheduler move the original event?
- How to fire server requests when copying events in Kendo UI Scheduler?

## Solution

### Fullscreen vs Inline Mode Behavior

The difference between fullscreen and inline modes arises due to iframe isolation in the Dojo runner. Test outside the Dojo environment for accurate results.

### Moving the Copied Event Moves the Original

Ensure a completely cloned event by:

1. Creating a deep copy of the original event object.
2. Removing properties such as `uid`, `id`, and `taskId` from the cloned object.
3. Adding the cloned event to the Scheduler's `dataSource`.

Use the following code:

```javascript
moveEnd: function(e) {
    if (ctrlKey) {
        var scheduler = $("#scheduler").data("kendoScheduler");
        var originalEvent = e.event;
        var newEvent = $.extend({}, originalEvent.toJSON());

        delete newEvent.uid;
        delete newEvent.id;
        delete newEvent.taskId;

        newEvent.start = e.start;
        newEvent.end = e.end;

        scheduler.dataSource.add(newEvent);
        scheduler.dataSource.sync();
        e.preventDefault(); // Prevent moving the original event
    }
}
```

### Sending Server Requests When Copying Events

To ensure that a `create` request is fired when copying events, define a new event object explicitly:

```javascript
moveEnd: function(e) {
    if (ctrlKey) {
        var scheduler = $("#scheduler").data("kendoScheduler");
        var newEvent = {
            title: e.event.title,
            start: e.start,
            end: e.end,
            ownerId: e.event.ownerId
        };

        scheduler.dataSource.add(newEvent);
        scheduler.dataSource.sync();
        e.preventDefault();
    }
}
```

For a runnable example please refer to [this Demo](https://runner.telerik.io/fullscreen/xtENbbEw).

Both approaches resolve the issue with copying events, ensuring correct behavior and server transactions.

## See Also

- [Kendo UI Scheduler API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/scheduler)
- [Clone Events Using Ctrl Key Knowledge Base Article](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/clone-events-on-ctrl-and-click)
- [SchedulerEvent Clone API](https://docs.telerik.com/kendo-ui/api/javascript/data/schedulerevent/methods/clone)
