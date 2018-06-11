---
title: Overview
page_title: Create Custom View Overview | Kendo UI Scheduler
description: "Learn how to create a custom view for a Kendo UI Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/howto-scheduler-customview-overview
slug: howto_scheduler_customview_overview
position: 1
---

# Scheduler Custom Views Overview

With the ability to extend the default Scheduler View classes you can create your own customized view covering your specific requirements.

To implement a Custom Scheduler View you will need to extend (inherit from) one of the existing Scheduler views. In order to understand better the structure and the functionality of each predefined view, you will also have to review the Scheduler views source code. The following are the source files which contain the views implementation:

* `kendo.scheduler.view.js` - contains the basic Scheduler view logic. Each of the other predefined views extends the `kendo.ui.SchedulerView` class;
* `kendo.scheduler.dayview.js` - contains the logic implementing the `MultiDayView`. The `MultiDayView` class is further extended to create the `DayView`, the `WeekView` and the `WorkWeekView`;
* `kendo.scheduler.monthview.js` - contains the implementation of the Scheduler `MonthView`, which extends `SchedulerView`;
* `kendo.scheduler.timelineview.js` - implements the `TimelineView`, the `TimelineWeekView`, the `TimelineWorkWeekView` and the `TimelineMonthView`. The latter three views extend the `TimelineView` class;
* `kendo.scheduler.agendaview.js` - implements the `AgendaView`, which extends `SchedulerView`.

Each of the methods and the properties defined in the above views can be overridden when extending the respective class. In this way the functionality and the appearance of the view will be altered creating the new custom view. For good reference of how to do that, you could review the `kendo.scheduler.dayview.js` and `kendo.scheduler.timelineview.js`. Those two files contain definitions of views extending other, already defined views (`MultiDayView` and `TimelineView` respectively).

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Create Custom Month Views with Event Count in the Show More Button]({% slug howto_create_custom_monthview_eventcount_showmore_button_scheduler %})
* [How to Create Custom To-Do Views]({% slug howto_create_custom_todo_view %})
* [Create Custom Views by Inheriting Built-In Views]({% slug howto_create_custom_view_inheriting_builtinview_scheduler %})
* [How to Implement Custom Timeline View with Dynamic Length]({% slug howto_implementcustomtimeline_withdynamiclength_scheduler %})
