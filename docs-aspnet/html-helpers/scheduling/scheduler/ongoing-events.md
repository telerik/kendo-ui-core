---
title: Highlight Ongoing Events
page_title: Highlight Ongoing Events
description: "Get started with the Scheduler component for {{ site.framework }} and learn how to highlight ongoing events."
slug: htmlhelpers_scheduler_ongoing_events_aspnetcore
position: 7
---

# Highlight Ongoing Events

To enable the functionality to highlight ongoing events use the `OngoingEvents` configuration option.

```HtmlHelper
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
        .Name("scheduler")
        .OngoingEvents(true)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-scheduler name="scheduler">
        <ongoing-events enabled="true" />
    </kendo-scheduler>
```
{% endif %}

## Highlight with No Timezone

The ongoing events highlight functionality depends on the timezone configuration of the Scheduler component. If no timezone is configured, the component will use the local (machine/client) timezone to render its data.

For example, consider an event that starts at 10:00 UTC and ends at 11:00 UTC. If the user is in Europe/Sofia in summer time, the user's local timezone is `UTC +3`. Thus the event is rendered from 13:00 to 14:00 in the Scheduler component. The event is highlighted as an ongoing event if the current time on the client is between 13:00 and 14:00 (Europe/Sofia, UTC +3).

## Highlight with Timezone

If a [timezone](/api/kendo.mvc.ui.fluent/schedulerbuilder#timezonesystemstring) is specified, the Scheduler component takes the timezone configuration into account and will adjust the ongoing events highlight accordingly.

Consider an event that starts at 10:00 UTC and ends at 11:00 UTC. The Scheduler component has its timezone configuration set to `UTC/Etc` and the user is located in Europe/Sofia in summer time `UTC +3`. The Scheduler component will render the event from 10:00 to 11:00 (taking into account the timezone set on the component). The event will be highlighted if the current time on the client is from 10:00 to 11:00 (Europe/Sofia, UTC +3). By default, the functionality will use the local (machine/client) timezone to determine which event is highlighted.

The behavior can be configured via the `OngoingEvents.UseLocalTimezone` configuration option. Setting it to `false` the event will be highlighted if the current time on the client is from 13:00 to 14:00 (Europe/Sofia, UTC +3).

```HtmlHelper
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
        .Name("scheduler")
        .OngoingEvents(oe=>oe.UseLocalTimezone(false))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-scheduler name="scheduler">
        <ongoing-events use-local-timezone="false" />
    </kendo-scheduler>
```
{% endif %}

## Relation to the CurrentTimeMarker

The `CurrentTimeMarker` configuration of the Scheduler also exposes a `UseLocalTimezone` configuration option. To keep the functionality of highlighting ongoing events and the current time marker in sync, always set their `UseLocalTimezone` options to the same value. By default, the `UseLocalTimezone` configuration is enabled for both configuration options. If disabling this is desired do so for both configuration options. Otherwise the Scheduler may highlight events that do not coincide with the `CurrentTimeMarker` line.

## See Also

* [Highlight Ongoing Events of the Scheduler HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/ongoing-events)
* [Server-Side API](/api/scheduler)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
