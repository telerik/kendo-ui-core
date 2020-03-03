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

* If set to `MobileMode.Auto`, the component will use adaptive rendering when viewed on a mobile browser.
* If set to `MobileMode.Phone`, the component will be forced to use adaptive rendering regardless of the browser type.

> Important: With the mobile rendering, we recommend to set up `height` as well. Without setting an explicit height, every view of the scheduler might have a different height.

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

## See Also

* [Adaptive Rendering by the Scheduler HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/adaptive-rendering)
* [Server-Side API](/api/scheduler)
