---
title: When Scheduler Changes Are Canceled, Other Events Disappear 
page_title: When Scheduler Changes Are Canceled, Other Events Disappear
description: "Learn how to handle the Kendo UI for jQuery Scheduler when you cancel changes in the component and other events disappear."
slug: scheduler_cancel_changes_events_disappear
tags: telerik, progress, kendoui, scheduler, when, cancel, changes, other, events, disappear
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

When you cancel changes, other events in the jQuery Scheduler disappear.

## Cause 

It is possible to experience such behavior if the [`id` fields](/api/javascript/data/schedulerevent#fields-id) of the other events are not set to valid and unique values.

## Solution

Make sure the `id` fields of the Scheduler are properly configured and contain valid and unique values. 

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
