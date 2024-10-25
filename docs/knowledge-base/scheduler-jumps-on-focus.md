---
title: Scheduler Jumps on Focus
page_title: Scheduler Jumps on Focus
description: "Learn how to handle the Kendo UI for jQuery Scheduler when the component jumps on focus."
slug: scheduler_jumps_on_focus
tags: telerik, progress, kendoui, scheduler, jumps, on, focus
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

The jQuery Scheduler component jumps on focus.

## Cause 

When the component navigation is enabled, its wrapper becomes a focusable element. On click, the browser focuses it and preforms the so called scroll-into-view action. If the Scheduler exceeds the height or width of the view-port, then it scrolls the page automatically. The goal is to position the focusable element at the top left corner of the view-port. During this process, actions like `double click`, `drag` or `resize` would not be available due to the movement of the page.

> The page re-positioning is a default browser behavior, which cannot be prevented nor modified.

## Solution

To mitigate this behavior, choose either of the available options:

* [Disable the navigation of the component](/api/javascript/ui/scheduler/configuration/selectable) if the feature is not needed in your business case.
* [Resize the component according to the view-port dimensions]({% slug howto_calculate_scheduler_height_dunamically_onmobile_scheduler %}).

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
