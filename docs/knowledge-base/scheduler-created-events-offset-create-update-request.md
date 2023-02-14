---
title: Created Scheduler Events Are Offset after Create or Update Requests
page_title: Created Scheduler Events Are Offset after Create or Update Requests
description: "Learn how to handle the Kendo UI for jQuery Scheduler when created events in the component are offset after a create or update request."
slug: scheduler_created_events_offset_create_update_request
tags: telerik, progress, kendoui, scheduler, created, events, offset, after, create, update, requests
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

Created jQuery Scheduler events are offset after a create or update request.

## Cause

This behavior may be caused if the Scheduler [`timezone`](/api/javascript/ui/scheduler/configuration/timezone) option is not set, or if the remote service does not keep dates in the correct format.

## Solution

Set the `timezone` option of the Scheduler and make sure the dates on the remote service are saved in UTC. For more information about how to do this see the [Timezones help article](/web/scheduler/timezones).

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
