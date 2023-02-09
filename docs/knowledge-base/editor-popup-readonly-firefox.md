---
title: Popup Editor Is Read-Only in Firefox
page_title: Popup Editor Is Read-Only in Firefox
description: "Learn how to handle the Kendo UI for jQuery Editor when the popup functionality is read-only in Firefox."
slug: editor_popup_readonly_firefox
tags: telerik, progress, kendoui, jquery, editor, popup, redonly, firefox 
type: troubleshooting
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Editor for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

In Firefox, the popup jQuery Editor is read-only.

## Cause 

Firefox cannot handle `iframe` elements properly when they are moved to the DOM.

## Solution 

When you use an Editor inside a popup, which moves elements to the DOM, either first initialize the popup (for example, a Kendo UI Window, a jQuery dialog, or other) or call the [`refresh`](/api/javascript/ui/editor/methods/refresh) method.


## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
