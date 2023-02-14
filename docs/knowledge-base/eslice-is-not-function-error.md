---
title: An Error that e.slice Is Not a Function Occurs
page_title: An Error that e.slice Is Not a Function Occurs
description: "Learn how to handle the warning that `e.slice` is not a function when working with Kendo UI for jQuery."
slug: eslice_is_not_function_error
tags: telerik, kendoui, jquery, troubleshooting, eslice, is, not, a, function, warning, occurs
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

A warning that `e.slice` is not a function occurs. 

## Cause

The error indicates that the response which is received from the remote data source is not an array while the widget expects a simple array for its data source.

Widgets like the TreeView or the MultiSelect need only a simple array while the Grid needs an envelope with additional information such as total, errors, and aggregates. For more information on what information each widget expects, review the demo of the respective control.

The possible cause for the `e.slice is not a function` error is that the server does not return an actual list of objects but empty data, an error response, or a single item. In such cases, you get a single object or HTML instead of a serialized array.

## Error Message 

`Uncaught TypeError: e.slice is not a function`

## Solution

To solve this issue, step through the server method that returns data and monitor the response in the browser dev toolbar to see what you get and ensure it is something like `[{"fieldName": 123, "otherField": "someValue"}, {"fieldName": 234, "otherField": "otherValue"}]`.

