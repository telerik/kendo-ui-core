---
title: Views
page_title: jQuery Scheduler Documentation | Views
description: "Get started with the jQuery Scheduler by Kendo UI and learn how to use the default views and create custom views in the widget."
previous_url: /controls/scheduling/scheduler/how-to/howto-scheduler-customview-overview, /controls/scheduling/scheduler/how-to/custom-views/overview, /controls/scheduling/scheduler/custom-views
slug: howto_scheduler_customview_overview
position: 3
---

# Views

The Scheduler supports different views to display its events.

## Default Views

The Scheduler provides the following built-in views:

- `day`&mdash;Displays the events in a single day.
- `week`&mdash;Displays the events in a whole week.
- `workWeek`&mdash;Displays the events in a work week.
- `month`&mdash;Displays the events in a single month.
- `agenda`&mdash;Displays the events from the current date until the next week (seven days).

By default, the **Day** and **Week** views are enabled. To enable other views or configure them, use the [`views`](/api/web/scheduler#configuration-views) option.

> The built-in Scheduler views are designed to render a time-frame that ends on the day it starts. To render views which start on one day and end on another, [build a custom view](#custom-views).

The following example demonstrates how to enable all Scheduler views.

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        "day", // A view configuration can be a string (the view type) or an object (the view configuration).
        { type: "week", selected: true }, // The "week" view will appear as initially selected.
        "month",
        "agenda"
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        },
        {
          id: 2,
          start: new Date("2013/6/6 10:15 AM"),
          end: new Date("2013/6/6 12:30 PM"),
          title: "Job Interview"
        }
      ]
    });
    </script>

## Custom Views

The Scheduler enables you to create custom views which meet the specific project requirements by extending the default `View` classes of the Scheduler. To implement a custom view, extend (inherit from) one of the existing views.

The following source-code files contain the views implementation:

* `kendo.scheduler.view.js`&mdash;Contains the basic logic of the Scheduler views. Each of the other predefined views extends the `kendo.ui.SchedulerView` class.
* `kendo.scheduler.dayview.js`&mdash;Contains the logic which implements the `MultiDayView`. The `MultiDayView` class is further extended to create the `DayView`, the `WeekView`, and the `WorkWeekView`.
* `kendo.scheduler.monthview.js`&mdash;Contains the implementation of the `MonthView` which extends the `SchedulerView`.
* `kendo.scheduler.timelineview.js`&mdash;Implements the `TimelineView`, the `TimelineWeekView`, the `TimelineWorkWeekView`, and the `TimelineMonthView`. The `TimelineWeekView`, the `TimelineWorkWeekView`, and the `TimelineMonthView` extend the `TimelineView` class.
* `kendo.scheduler.agendaview.js`&mdash;Implements the `AgendaView` which extends the `SchedulerView`.

You can override each method and property that are defined in the list by extending the respective class. In this way, the functionality and the appearance of the view will be altered by creating the new, custom view. For more information, refer to the `kendo.scheduler.dayview.js` and `kendo.scheduler.timelineview.js` files which contain definitions of views which extend the already defined `MultiDayView` and `TimelineView` views.

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
