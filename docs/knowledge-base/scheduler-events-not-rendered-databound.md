---
title: Scheduler Events Are Not Rendered
page_title: Scheduler Events Are Not Rendered
description: "Learn how to handle the Kendo UI for jQuery Scheduler when its events are not rendered even though the component is bound to data."
previous_url: /web/scheduler/troubleshooting, /controls/scheduling/scheduler/troubleshoot/troubleshooting, /controls/scheduling/scheduler/troubleshooting
slug: troubleshooting_scheduler_widget
tags: telerik, progress, kendoui, scheduler, events, not, rendered, databound
type: troubleshooting
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description

The events of the Kendo UI for jQuery Scheduler are not rendered.

## Cause

If the remote data request is successful and the Scheduler is data-bound, but no events are rendered, this indicates that the date format of the events is not correct, and the browser is unable to create JavaScript Date objects from the date strings. As a result, the events in the dataSource of the Scheduler have `null` values for their `start` and `end` properties, and the events are not rendered.

## Solution

Use the recommended date format for sending and receiving Scheduler event dates, which is [ISO 8601 with a Z zone designator (UTC date)]({% slug timezones_kendoui_scheduler_widget %}).

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
