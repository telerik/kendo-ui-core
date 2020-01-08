---
title: Adaptive Rendering
page_title: Adaptive Rendering
description: "Get started with the Scheduler HtmlHelper for {{ site.framework }} and learn how to configure its adaptive rendering."
previous_url: /helpers/scheduling/scheduler/adaptive-rendering
slug: htmlhelpers_scheduler_adaptiverendering_aspnetcore
position: 3
---

# Adaptive Rendering

The Scheduler supports adaptive enhancements such as changes in styling and behavior in order to remain consistent with the specific user device experience.

For example, when editing on a mobile device, the edit container will slide in a new screen for the user, which is a departure from the more desktop-like popup behaviors.

To enable the adaptive rendering feature, set the [`Mobile`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/SchedulerBuilder#mobile) property to `MobileMode.Auto` or `MobileMode.Phone`:
* If set to `MobileMode.Auto`, the widget will use adaptive rendering when viewed on a mobile browser.
* If set to `MobileMode.Phone"`, the widget will be forced to use adaptive rendering regardless of the browser type.

> Important: With the mobile rendering mode make sure to setup the `height` option as well.

The following example demonstrates how to configure the adaptive rendering mode of the Scheduler.

```Razor
@(Html.Kendo().Scheduler<KendoSchedulerAjaxEditing.Models.TaskViewModel>()
    .Name("scheduler")
    .Mobile(MobileMode.Auto)
    .Date(new DateTime(2013, 6, 13))
    .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
    .Height(600)
    .Views(views =>
    {
        views.DayView();
        views.WeekView(weekView => weekView.Selected(true));
        views.MonthView();
        views.AgendaView();
    })
    .Timezone("Etc/UTC")
    .DataSource(d => d
        .Model(m => {
            m.Id(f => f.TaskID);
            m.Field(f => f.OwnerID).DefaultValue(1);
            m.RecurrenceId(f => f.RecurrenceID);
        })
        .Read("Tasks_Read", "Home")
        .Create("Tasks_Create", "Home")
        .Destroy("Tasks_Destroy", "Home")
        .Update("Tasks_Update", "Home")
    )
)
```

## Configuring Panes on Mobile

The Pane in which the adaptive Scheduler is placed does not automatically expand its height and you need to define an explicit pixel Scheduler height by setting the height option.

```Razor
@(Html.Kendo().Scheduler<KendoSchedulerAjaxEditing.Models.TaskViewModel>()
    ...
    .Mobile(MobileMode.Phone)
    .Height(600)
)
```

## See Also

* [Adaptive Rendering by the Scheduler HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/adaptive-rendering)
* [Server-Side API](/api/scheduler)
