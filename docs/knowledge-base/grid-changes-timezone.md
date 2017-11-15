---
title: Displayed ASP.NET MVC Grid Date Is Different from Database Date
description: The date which is displayed in the Kendo UI Grid for ASP.NET MVC is not the same as the date in my database.
type: troubleshooting
page_title: MVC Grid Changes Dates and Timezone on Its Own | UI for ASP.NET MVC
slug: grid-changes-timezone
tags: dates, date, timezone, change, grid, mvc, ui for asp.net mvc
ticketid: 1133504
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET MVC</td>
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

I display a date-time in a Kendo UI Grid column. In the Database it is `"10 Oct 2017 12:30 AM"` while the Grid displays `"9 Oct 11:00"`.

How can I disable the Grid auto-converting of the timezone?

## Possible Workarounds

By default, JavaScript converts the dates and times to the local timezone, that is, the issue is not related to Kendo UI and it is not possible to disable the default timezone conversion.

However, you can still work around this issue by referring to the following resources:

* [Using UTC on Both Client and Server](https://docs.telerik.com/aspnet-mvc/helpers/grid/how-to/editing/utc-time-on-both-server-and-client)
* [Localizing Date Formats](https://docs.telerik.com/kendo-ui/controls/data-management/grid/date-formats)
* [Applying Dates which Ignore Timezones](https://docs.telerik.com/aspnet-mvc/helpers/grid/how-to/editing/apply-dates-that-ignore-timezones)
