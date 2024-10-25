---
title: When Editing the Scheduler, Initial Events Are Sent to the Create Action 
page_title: When Editing the Scheduler, Initial Events Are Sent to the Create Action
description: "Learn how to handle the Kendo UI for jQuery Scheduler when all initial component events are sent to the create action while editing."
slug: scheduler_editing_initial_events_to_create
tags: telerik, progress, kendoui, scheduler, when, editing, all, initial, events, sent, to, create, action
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

Editing a jQuery Scheduler event causes all initial events to be sent to the create action.

## Cause 

This behavior can be experienced if the [`id` fields](/api/javascript/data/schedulerevent#fields-id) of all events are not set to valid and unique values during initial read.

## Solution

Make sure the `id` fields of the Scheduler are properly configured and contain valid and unique values. 

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
