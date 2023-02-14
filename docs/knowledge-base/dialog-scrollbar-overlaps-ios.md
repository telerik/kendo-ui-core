---
title: Dialog Scrollbar Overlaps on OS X
page_title: Dialog Scrollbar Overlaps on OS X
description: "Learn how to handle the Kendo UI for jQuery Dialog if its scrollbar overlaps in iOS."
previous_url: /controls/layout/dialog/troubleshooting
slug: troubleshooting_kendoui_dialog
tags: telerik, progress, kendoui, jquery, dialog, scrollbar, overlaps, ios
type: troubleshooting
res_type: kb
component: dialog
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Dialog for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

The scrollbar of the jQuery Dialog overlaps on OS X.

## Cause

A scrollbar of an element below the Dialog popup might be displayed incorrectly over the Dialog popup in the Safari and Chrome browsers which run on OS X.

## Solution

To handle the issue, apply the CSS style to the scrollbar container below the Dialog as demonstrated in the example below.

    -webkit-transform: translate3d(0, 0, 0);

## See Also

* [Basic Usage of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/index)
* [Using the API of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/api)
* [JavaScript API Reference of the Dialog](/api/javascript/ui/dialog)
