---
title: Adaptive Rendering
page_title: jQuery Scheduler Documentation | Adaptive Rendering
description: "Get started with the jQuery Scheduler by Kendo UI and learn how to configure its adaptive rendering."
slug: adaptiverendering_kendoui_scheduler_widget
position: 7
---

# Adaptive Rendering

The Scheduler supports adaptive enhancements such as changes in styling and behavior so that it remains consistent with the specific user device experience.

For example, when editing is done on a mobile device, the Scheduler will slide in a new screen for the user which is a departure from the more desktop-like popup behaviors.

## Getting Started

To enable the adaptive rendering feature, set the [`mobile`](/api/javascript/ui/scheduler/configuration/mobile) property to `true` or `"phone"`:

* If set to `true`, the widget will use adaptive rendering when viewed on a mobile browser.
* If set to `"phone"`, the widget will be forced to use adaptive rendering regardless of the browser type.

> Important: With the mobile rendering, we recommend to set up the `height` option as well. Without setting an explicit height, every view of the scheduler might have a different height.

The following example demonstrates how to configure the adaptive rendering mode of the Scheduler.

```dojo
<div id="scheduler"></div>

<script>
    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        mobile: "phone",
        height: "600px",
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
```

## Configuring Panes on Mobile

The mobile pane in which the adaptive Scheduler is placed does not automatically expand its height. To add an adaptive Scheduler to a Kendo UI mobile application, set the `stretch` configuration of the respective view to `true` and apply `100%` height to the Scheduler. Alternatively, define an explicit pixel Scheduler height and omit the pane `stretch` option.

> Important: When the Adaptive Rendering of the Scheduler is used in a Kendo mobile Application, apply one of our [Less-based themes]({% slug themesandappearnce_kendoui_desktopwidgets %}).

The following example demonstrates how to apply the `stretch` option.

```
<div id="foo" data-role="view" data-init="onInit" data-stretch="true">
    <div id="scheduler"></div>
</div>

<script>
    var schedulerConfig = {
        date: new Date("2013/6/6"),
        mobile: "phone",
        height: "100%",
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
    };

    function onInit() {
        $("#scheduler").kendoScheduler(schedulerConfig);
    }

    var app = new kendo.mobile.Application();
</script>
```

The following example demonstrates how to apply the `height` option.

```
<div id="foo" data-role="view" data-init="onInit">
    <div id="scheduler"></div>
</div>

<script>
    var schedulerConfig = {
        date: new Date("2013/6/6"),
        mobile: "phone",
        height: "400px",
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
    };

    function onInit() {
        $("#scheduler").kendoScheduler(schedulerConfig);
    }

    var app = new kendo.mobile.Application();
</script>
```

## See Also

* [Adaptive Rendering of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/adaptive-rendering)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
