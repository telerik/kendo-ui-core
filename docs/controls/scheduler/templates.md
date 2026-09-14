---
title: Templates
page_title: jQuery Scheduler Documentation - Templates
description: "Learn how to customize jQuery Scheduler event content with Kendo UI templates and configure event, slot, and header templates."
components: ["scheduler"]
slug: scheduler_templates
position: 6
---

# Templates

The Scheduler supports Kendo UI templates for customizing the content of events, all-day events, slots, headers, and tooltips. Use templates to display fields from Scheduler event data in a layout that matches your application.

For a runnable example, refer to the [Scheduler templates demo](https://demos.telerik.com/kendo-ui/scheduler/templates).

## Configure an Event Template

Set the [`eventTemplate`](/api/ui/scheduler/configuration/eventtemplate) option to a Kendo UI template. The template can use the event `title`, `description`, `start`, `end`, and `resources` fields.

The following example renders the event title and time range for each Scheduler event.

```dojo
<script id="event-template" type="text/x-kendo-template">
    <div class="event-template">
        <strong>#: title #</strong>
        <span>#: kendo.toString(start, "t") # - #: kendo.toString(end, "t") #</span>
    </div>
</script>

<div id="scheduler"></div>

<script>
    $("#scheduler").kendoScheduler({
        date: new Date("2025/6/12"),
        startTime: new Date("2025/6/12 08:00"),
        endTime: new Date("2025/6/12 18:00"),
        views: ["day", "week"],
        eventTemplate: $("#event-template").html(),
        dataSource: [
            {
                id: 1,
                title: "Project review",
                start: new Date("2025/6/12 10:00"),
                end: new Date("2025/6/12 11:00")
            }
        ]
    });
</script>
```

## Configure Other Scheduler Templates

The Scheduler provides templates for other parts of its interface:

* [`allDayEventTemplate`](/api/ui/scheduler/configuration/alldayeventtemplate) customizes all-day event content.
* [`dateHeaderTemplate`](/api/ui/scheduler/configuration/dateheadertemplate) customizes date headers.
* [`groupHeaderTemplate`](/api/ui/scheduler/configuration/groupheadertemplate) customizes resource group headers.
* [`majorTimeHeaderTemplate`](/api/ui/scheduler/configuration/majortimeheadertemplate) and [`minorTimeHeaderTemplate`](/api/ui/scheduler/configuration/minortimeheadertemplate) customize time headers.
* [`views.slotTemplate`](/api/ui/scheduler/configuration/views#viewsslottemplate) customizes time slots in supported views.
* [`views.tooltipTemplate`](/api/ui/scheduler/configuration/views#viewstooltiptemplate) customizes tooltips in the Year view.

## See Also

* [Scheduler Templates Demo](https://demos.telerik.com/kendo-ui/scheduler/templates)
* [Kendo UI Templates Overview](/framework/templates/overview)
* [Scheduler Event Template API](/api/ui/scheduler/configuration/eventtemplate)
* [JavaScript API Reference of the Scheduler](/api/ui/scheduler)
