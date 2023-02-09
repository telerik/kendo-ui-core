---
title: Set the First Weekday in a DatePicker
page_title: Set the First Weekday in a DatePicker
description: "Learn how to set the default first weekday in the Kendo UI DatePicker."
slug: datepicker_set_first_weekday
previous_url: /controls/editors/datepicker/how-to/AngularJS/set-first-day-of-week
tags: kendo, jquery, datepicker, set, day, weekday, first
component: datepicker
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DatePicker for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2019</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I set the default weekday of the DatePicker in the Kendo UI for jQuery DatePicker?

## Solution

The following example demonstrates how to set the default weekday of the DatePicker by using the [`culture`](/api/javascript/kendo/methods/culture) method.

```dojo
    <input id="datepicker" />

    <script>
      // The first weekday will be Wednesday.
      kendo.culture().calendar.firstDay= 3;
      
      $("#datepicker").kendoDatePicker();
    </script>
```