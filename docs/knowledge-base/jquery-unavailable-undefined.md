---
title: jQuery Is Unavailable or Undefined
page_title: jQuery Is Unavailable or Undefined
description: "Learn how to handle the problem when jQuery is unavailable or undefined when working with Kendo UI for jQuery."
slug: jquery_unavailable_undefined
tags: telerik, kendoui, jquery, troubleshooting, jquery, is, undefined, unavailable 
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

When working with Kendo UI, an error that jQuery is unavailable or undefined occurs. 

## Cause

The possible causes for this issue are: 

* jQuery is not included in the project files.
* jQuery is included after the Kendo UI JavaScript files.
* jQuery is included after the Kendo UI widget initialization statements.

As a result, the Kendo UI widgets do not function as expected.

## Error Message 

* (In Google Chrome and Firefox) `ReferenceError: jQuery is not defined` 
* (In Internet Explorer) `jQuery is undefined` 

## Solution

Make sure that jQuery is included only before the Kendo UI JavaScript files and before any JavaScript statements that depend on it.

