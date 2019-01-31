---
title: Custom Views
page_title: Custom Views | Kendo UI Scheduler
description: "Learn how to create a custom view for a Kendo UI Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/howto-scheduler-customview-overview, /controls/scheduling/scheduler/how-to/custom-views/overview
slug: howto_scheduler_customview_overview
position: 4
---

# Custom Views

The Scheduler enables you to create custom views which meet the specific project requirements by extending the default `View` classes of the Scheduler.

To implement a custom view, extend (inherit from) one of the existing views. The following source-code files contain the views implementation:

* `kendo.scheduler.view.js`&mdash;Contains the basic logic of the Scheduler views. Each of the other predefined views extends the `kendo.ui.SchedulerView` class.
* `kendo.scheduler.dayview.js`&mdash;Contains the logic which implements the `MultiDayView`. The `MultiDayView` class is further extended to create the `DayView`, the `WeekView`, and the `WorkWeekView`.
* `kendo.scheduler.monthview.js`&mdash;Contains the implementation of the `MonthView` which extends the `SchedulerView`.
* `kendo.scheduler.timelineview.js`&mdash;Implements the `TimelineView`, the `TimelineWeekView`, the `TimelineWorkWeekView`, and the `TimelineMonthView`. The `TimelineWeekView`, the `TimelineWorkWeekView`, and the `TimelineMonthView` extend the `TimelineView` class.
* `kendo.scheduler.agendaview.js`&mdash;Implements the `AgendaView` which extends the `SchedulerView`.

You can override each method and property that are defined in the list by extending the respective class. In this way, the functionality and the appearance of the view will be altered by creating the new, custom view. For more information, refer to the `kendo.scheduler.dayview.js` and `kendo.scheduler.timelineview.js` files which contain definitions of views which extend other, already defined views (`MultiDayView` and `TimelineView` respectively).

## See Also

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Create Custom Month Views with Event Count in the Show More Button]({% slug howto_create_custom_monthview_eventcount_showmore_button_scheduler %})
* [How to Create Custom To-Do Views]({% slug howto_create_custom_todo_view %})
* [Create Custom Views by Inheriting Built-In Views]({% slug howto_create_custom_view_inheriting_builtinview_scheduler %})
* [How to Implement Custom Timeline View with Dynamic Length]({% slug howto_implementcustomtimeline_withdynamiclength_scheduler %})
