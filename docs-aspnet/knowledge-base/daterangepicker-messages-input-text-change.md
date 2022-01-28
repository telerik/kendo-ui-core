---
title: Set Messages in Start and End DateInputs for DateRangePicker
description: An example demonstrating how to change the input placeholders for the start and end dateInputs
type: how-to
page_title: Change Default Messages
slug: daterangepicker-messages-input-text-change
tags: daterangepicker, messages, input, text, change, month, day, year, hour, minute, second, dayperiod, placeholder
ticketid: 1417334
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>DateRangePicker for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>

  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

How can I change the text of the Kendo UI DateRangePicker from its default "day/month/year" placeholder?

## Solution

In order to change the start and end input messages, reference the dateRangePicker and set the message options of the _startDateInput and _endDateInput:

```dojo
    <div id="dateRangePicker"></div>
    
    <script>
      $(function () {
        var dateRangePicker = $("#dateRangePicker").kendoDateRangePicker().data("kendoDateRangePicker");

        dateRangePicker._startDateInput.setOptions({
          messages: {
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "dayperiod": "am/pm",
          }
        });

        dateRangePicker._endDateInput.setOptions({
          messages: {
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "dayperiod": "am/pm",
          }
        });
      });
    </script>
```
