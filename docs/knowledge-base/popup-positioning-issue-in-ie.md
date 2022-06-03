---
title: The Widget Popup Is Offset Incorrectly in Internet Explorer
page_title: The Widget Popup Is Offset Incorrectly in Internet Explorer
description: "Learn how to handle the issue that the popup of the Kendo UI for jQuery widget is offset incorrectly in Internet Explorer."
slug: popup_not_offset_correctly_ie
tags: telerik, kendoui, jquery, troubleshooting, widget, popup, offset, not, offset, correctly, internet, explorer
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

When Kendo UI is used with jQuery `1.12.0` or `2.2.0`, some issues with the popup positioning occur. The popup is offset incorrectly when the page is scrolled in Internet Explorer. 

## Cause

The cause for this issue is a bug in the aforementioned jQuery versions.

## Solution

According to jQuery's bug tracker, the issue has been addressed. For more details, refer to [https://github.com/telerik/kendo-ui-core/issues/1375](https://github.com/telerik/kendo-ui-core/issues/1375).

