---
title: Widgets Are Unavailable or Undefined
page_title: Widgets Are Unavailable or Undefined
description: "Learn how to handle the problem when the widgets are unavailable or undefined when working with Kendo UI for jQuery."
slug: widgets_unavailable_undefined
tags: telerik, kendoui, jquery, troubleshooting, widgets, are, undefined, unavailable 
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

When working with Kendo UI, an error that the widgets are unavailable or undefined occurs. 

## Cause

The possible cause for this issue is that jQuery is included more than once in the page and, as a result, all existing jQuery plugins (including Kendo UI) are disregarded. Such an issue will also occur if the [required jQuery file]({% slug jquerysupport_kendoui %}) is not included.

## Error Message 

Depending on the browser, the following JavaScript errors will be thrown:

* (In Google Chrome) `TypeError: Object #<Object> has no method kendoGrid`. 
* (In Firefox) `TypeError: $("#Grid").kendoGrid is not a function`.
* (In Internet Explorer 9 and later) `Object does not support property or method kendoGrid`. 
* (In previous Internet Explorer versions) `Object does not support this property or method`.

>This issue affects all Kendo UI widgets with only the error message being different for each widget. For example, `kendoChart is not a function` or `Object has no method kendoEditor`.

## Solution

Make sure jQuery is not included more than once in your page. Remove any duplicate `script` references to jQuery. Include all [required Kendo JavaScript files]({% slug jquerysupport_kendoui %}).
