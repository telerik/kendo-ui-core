---
title: Disable Dynamically Dates in Calendar
description: An example on how to dynamically disable dates in the Kendo UI Calendar.
type: how-to
page_title: Disable Dates Dynamically | Kendo UI Calendar
slug: calendar-disable-dates-dynamically
tags: calendar, disable, dates, dynamically, javascript,js
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Calendar</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

How can I disable dates in the Calendar after the widget was initialized?

## Solution

1. Destroy the Calendar by using the [`destroy`](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar/methods/destroy) method.
1. Initialize the Calendar with the disabled dates.

````dojo
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
