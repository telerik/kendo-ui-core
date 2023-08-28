---
title: Overview
page_title: jQuery Scheduler Documentation - Scheduler Overview
description: "Try now the Kendo UI for jQuery Scheduler component covering everything from data binding and resources to templates."
slug: overview_kendoui_scheduler_widget
position: 0
---

# {{ site.product }} Scheduler Overview

The Scheduler displays a set of events, appointments, or tasks.

It supports the display of scheduled events in different views&mdash;single days, whole weeks, or months, or as a list of tasks which need to be accomplished.

As of the R1 2017 release, exceptions are no longer automatically removed when the user edits a series. Changes that are made to specific occurrences are persisted during series editing. If a series contains an exception, the Scheduler renders a **Reset Series** button within the **Edit** dialog of the series which allows the user to reset the series by removing existing exceptions.

As of the Kendo UI 2016 Q2 (2016.2.504) release:
* The Scheduler substitutes the semicolon (`;`) as the delimiter type for recurrence exception with the comma (`,`).
* The Scheduler no longer adds a trailing delimiter to a recurrence exception.

The change was driven by the [RFC 5545](http://tools.ietf.org/html/rfc5545#page-120) specification. Note that the previously demonstrated behavior had been incorrect.

![Kendo UI for jQuery Scheduler Overview](scheduler-overview.png)

## Functionality and Features

* [Data Binding]({% slug databinding_kendoui_scheduler %})&mdash;You can configure both local and remote data for the Scheduler events.
* [Views]({% slug howto_scheduler_customview_overview %})&mdash;You can configure the available views in the component. You can also implement a custom view.
* [Resources]({% slug resources_kendoui_scheduler_widget %})&mdash;The Scheduler supports resources which can be assigned to an event.
* [Timezones]({% slug timezones_kendoui_scheduler_widget %})&mdash;You can display the events according to a specific timezone.
* [Printing]({% slug printing_kendoui_scheduler %})&mdash;You can print the visible content of the Scheduler.
* [Adaptive Rendering]({% slug adaptiverendering_kendoui_scheduler_widget %})&mdash;The Scheduler is adaptive to the dimensions of the device you are using.

## Next Steps 

* [Getting Started with the Kendo UI Scheduler for jQuery]({% slug getting_started_kendoui_scheduler_widget %})
* [Demo Page for the Scheduler](https://demos.telerik.com/kendo-ui/scheduler/index)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)

## See Also

* [Overview of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
