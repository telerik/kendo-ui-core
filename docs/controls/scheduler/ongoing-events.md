---
title: Highlight Ongoing Events
page_title: jQuery Scheduler Documentation - Highlight Ongoing Events
description: "Get started with the jQuery Scheduler by Kendo UI and learn how the ongoing events highlight works."
components: ["scheduler"]
slug: ongoing_events_kendoui_scheduler_widget
position: 8
---

# Highlight Ongoing Events

By default, the highlight of the ongoing (current) events in the Scheduler is off. In order to enable it you can either set the [ongoingEvents](/api/javascript/ui/scheduler/configuration/ongoingEvents) configuration option of the Scheduler to `true`, or set the inner [ongoingEvents.enabled](/api/javascript/ui/scheduler/configuration/ongoingevents#ongoingeventsenabled) option to `true`.

## Highlight with No Timezone

The ongoing events highlight functionality will depend on the [timezone](/api/javascript/ui/scheduler/configuration/timezone) configured in the Scheduler widget. If no timezone is set on the component, that means the widget uses the local (machine/client) timezone to render its data. As a consequence, whether an event is highlighted or not will depend on its actual duration.

Lets review an example where an event has its start time set to 10:00 UTC and its end time set to 11:00 UTC. If the user is in Europe/Sofia in summer time, that means their local timezone is UTC +3. As a result, the event will be rendered from 13:00 to 14:00 in the Scheduler. Hence, the event is considered to be ongoing if the current time on the client is from 13:00 to 14:00 (Europe/Sofia, UTC +3).

## Highlight with Timezone

If a [timezone](/api/javascript/ui/scheduler/configuration/timezone) is specified in the Scheduler widget that will force the ongoing events highlight to take that timezone into account.

Lets review the same scenario where we have an event starting at 10:00 UTC and ending at 11:00 UTC. This time the Scheduler will have its timezone option set to `UTC/Etc`, while the user (client) is still in Europe/Sofia in summer time (UTC +3). In the Scheduler the event will be rendered from 10:00 to 11:00 (because it is rendered according to the timezone set on the component). By default, the event will be highlighted if the current time on the client is from 10:00 to 11:00 (Europe/Sofia, UTC +3). That is because by default the functionality will use the local (machine/client) timezone to decide which event to be highlighted.

To alter that behavior and use the Scheduler timezone to identify the ongoing events, you should set the [ongoingEvents.useLocalTimezone](/api/javascript/ui/scheduler/configuration/ongoingevents#ongoingeventsuselocaltimezone) option to `false`. In that case, the event will be highlighted if the current time on the client is from 13:00 to 14:00 (Europe/Sofia, UTC +3).

## Relation to the CurrentTimeMarker

The [currentTimeMarker](/api/javascript/ui/scheduler/configuration/currenttimemarker) configuration object of the Scheduler also has a [useLocalTimezone](/api/javascript/ui/scheduler/configuration/currenttimemarker#currenttimemarkeruselocaltimezone) option. To keep the ongoing events highlight and the `currentTimeMarker` in sync, always set their `useLocalTimezone` options to the same value. They are both set to `true` by default, but if you need to alter that to `false`, it is recommended to do so for both. Otherwise the Scheduler view may highlight events that do not coincide with the `currentTimeMarker` line.

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
