---
title: Disable dates of the Kendo UI Calendar dynamically
description: An example on how to disable dates of the Kendo UI Calendar dynamically.
type: how-to
page_title:  Disable dates of the Kendo UI Calendar dynamically| Kendo UI Calendar
slug: calendar-disable-dates-dynamically
tags: calendar, disable, dates, dynamically, javascript,js
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Calendar for Progress® Kendo UI®</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

How can I disable dates of the Kendo UI Calendar after the initialization of the widget?

## Solution

Use [destroy method](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar#methods-destroy) to destroy the calendar and then initialize once again with disabled dates.

````html
    <div id="calendar"></div>
    <a class="k-button" onclick="changeDisableDates()">Disable dates</a>
    <script>
      $("#calendar").kendoCalendar();

      function changeDisableDates() {
        var calendar = $('#calendar').data('kendoCalendar');
        var options = calendar.options;
        options.disableDates = ["mo", "sa"];

        calendar.destroy();
        $('#calendar').html('');
        $('#calendar').kendoCalendar(options);
      }
    </script>
````
