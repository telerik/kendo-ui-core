---
title: Widgets Do Not Work Correctly on Touch Devices
page_title: Widgets Do Not Work Correctly on Touch Devices
description: "Learn how to handle the issue that Kendo UI for jQuery widgets are not working on touch devices."
slug: widgets_not_working_on_touch_devices
tags: telerik, kendoui, jquery, troubleshooting, widgets, not, working, on, touch, devices
type: troubleshooting
res_type: kb
component: kendoui
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
 <tr>
  <td>Kendo Version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description 

Kendo UI for jQuery widgets are not working on touch devices.

## Cause

Client libraries that interfere with touch events, such as FastClick, are not compatible with Kendo UI and may break the behavior of the widgets. For example, they may cause a drop-down list to close immediately after opening.

## Solution

For more information on this issue, refer to [What Exactly Is... The 300ms Click Delay](https://www.telerik.com/blogs/what-exactly-is.....-the-300ms-click-delay).

