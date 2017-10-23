---
title: UI for ASP.NET MVC Grid changes dates timezone.
description: The date being displayed in the Kendo Grid is not the same as the one in my Database.
type: troubleshooting
page_title: UI for ASP.NET MVC Grid Changes Dates Timezone
slug: grid-changes-timezone
tags: dates, date, timezone, change, grid, mvc, ui for asp.net mvc
ticketid: 1133504
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
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
  <td>.Net framework</td>
  <td>All</td>
 </tr>
</table>


## Description

I am displaying a DateTime in a Kendo Grid column; in the Database it is "10 Oct 2017 12:30 AM" but the Grid displays "9 Oct 11:00". I want to disable auto converting the Timezone.

## Solution

Converting the dates to the local timezone is the default behavior of JavaScript and it is not directly connected to Kendo UI thus, it is not possible to disable this behavior. There are two workarounds that could help you:

* [Use UTC on Both Client and Server](https://docs.telerik.com/aspnet-mvc/helpers/grid/how-to/editing/utc-time-on-both-server-and-client)
* [Localize Date Formats](https://docs.telerik.com/kendo-ui/controls/data-management/grid/date-formats)
* [Apply Dates that Ignore Timezones](https://docs.telerik.com/aspnet-mvc/helpers/grid/how-to/editing/apply-dates-that-ignore-timezones)

