---
title: Defined Scheduler Timezone Is Not Applied
page_title: Defined Scheduler Timezone Is Not Applied
description: "Learn how to handle the Kendo UI for jQuery Scheduler when the defined timezone of the component is not applied."
slug: scheduler_defined_timezone_not_applied
tags: telerik, progress, kendoui, scheduler, defined, timezone, not, applied  
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

The defined jQuery Scheduler timezone is not applied.

## Cause 

In this case, the specified [`timezone`](/api/javascript/ui/scheduler/configuration/timezone) option is not recognized by the widget and the events are visualized with a specific time offset. This could happen when the `SchedulerDataSource` instance is created separately, outside the Scheduler.

## Solution

To handle the issue, directly set the [`schema.timezone`](/api/javascript/data/schedulerdatasource/configuration/schema.timezone) option of the `SchedulerDataSource` instance to the desired value.

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
