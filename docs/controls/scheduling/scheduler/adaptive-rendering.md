---
title: Adaptive Rendering
page_title: jQuery Scheduler Documentation | Adaptive Rendering | Kendo UI
description: "Get started with the jQuery Scheduler by Kendo UI and learn how to configure adaptive rendering."
slug: adaptiverendering_kendoui_scheduler_widget
position: 5
---

### Adaptive Rendering Mode

Kendo UI Scheduler supports adaptive enhancements like changes in styling and behavior in order to remain consistent with the specific user device experience. For instance, when editing on a mobile device, Kendo UI will slide in a new screen for the user, which is a departure from the more desktop-like popup behaviors.

To enable the adaptive rendering feature, set the [`mobile`](/api/javascript/ui/scheduler/configuration/mobile) property to `true`, `"phone"` or `"tablet"`:

* If set to `true`, the widget will use adaptive rendering when viewed on a mobile browser.
* If set to `phone` or `tablet`, the widget will be forced to use adaptive rendering regardless of the browser type.

The example below demonstrates how to configure the adaptive rendering mode of the Scheduler.

###### Example

    <div id="scheduler"></div>

    <script>
        $("#scheduler").kendoScheduler({
            date: new Date("2013/6/6"),
            mobile: "phone",
            views: [
                "day",
                { type: "week", selected: true },
                "month",
                "agenda"
            ],
            dataSource: [{
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
            }]
        });
    </script>

## See Also

* [Adaptive Rendering of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/adaptiverendering)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
