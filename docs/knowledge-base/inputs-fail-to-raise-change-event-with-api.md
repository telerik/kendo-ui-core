---
title: Input Widgets Do Not Raise Change Event When the API Is Used
page_title: Input Widgets Do Not Raise Change Event When the API Is Used
description: "Learn how to handle the issue that the input widgets fail to raise a change event when the API is used when working with Kendo UI for jQuery."
slug: inputs_fail_to_raise_change_event_with_api
tags: telerik, kendoui, jquery, troubleshooting, input, widgets, fail, to, raise, change, event, using, api
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

The input widgets fail to raise a `change` event when the API is used.

## Cause

The `change` event of an input widget is triggered only by user action. DOM elements work in the same way.

## Solution

To handle this issue, trigger the event manually by using the [`trigger` method](/api/javascript/ui/widget/methods/trigger).
