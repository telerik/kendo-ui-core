---
title: Show ContextMenu in Scheduler on Mobile Devices
description: An example on how to show a ContextMenu in the Kendo UI Scheduler on mobile devices.
type: how-to
page_title: Show ContextMenu on tapping an event or slot in the Scheduler on mobile devices | Kendo UI Scheduler
slug: scheduler-mobile-show-contextmenu
tags: scheduler, show, context, menu, mobile, tap, contextmenu
ticketid: 1137382
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I show a ContextMenu when tapping a Scheduler event or slot and holding tap? When I do that the ContextMenu shows, but the Scheduler's Editor slides in and hides the ContextMenu.

## Solution

The Scheduler's `mobile` configuration option enables the adaptive rendering of the widget. On mobile devices tapping an event or slot brings up the Editor. In order to avoid the default behavior and display a ContextMenu on tap hold instead of the Editor, the Scheduler's `edit` event must be prevented after the ContextMenu opens. 

For the full implementation of the approach, refer to [this Dojo example](https://dojo.telerik.com/oLIxu).
