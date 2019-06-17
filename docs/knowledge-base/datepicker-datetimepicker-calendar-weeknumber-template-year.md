---
title: WeekNumber and Year in Calendar Month View
description: An example demonstrating how to add a week number template in the calendar month view
type: how-to
page_title: Add Year to Week Number Template | Kendo UI DateTimePicker
slug: datepicker-datetimepicker-calendar-weeknumber-template-year
tags: datepicker, datetimepicker, weeknumber, template, year, week, number, calendar
ticketid: 1409114
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>DatePicker for Progress® Kendo UI®, DateTimePicker for Progress® Kendo UI®, Calendar for Progress® Kendo UI® </td>
 </tr>

  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

How can I format the weekNumber section in the calendar to include the year in the Kendo UI DatePicker, DateTimePicker, or Calendar? 

## Solution

The weekNumber can be formatted in the [month.weekNumber configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker/configuration/month#monthweeknumber) using a template.  There are two properties which can help modify its appearance: **currentDate** and **weekNumber**.  

```javascript
    <script id="week-template" type="text/x-kendo-template">
  	   <a>#= data.weekNumber # - #= getYearFromWeekNumber(data) #</a>
    </script>
```

To handle the last and first week of a year from being one year behind, create a custom function which will return the correct year.

```javascript
      function getYearFromWeekNumber(data) {
        var year = data.currentDate.getFullYear();
        if (data.weekNumber == 1 && data.currentDate.getMonth() == 11) {
          year++;
        }
        return year;
      }
```

Finally, modify the CSS based on your preferences of the weekNumber column so it is wide enough for the content.

```CSS
      .k-calendar .k-content .k-alt {
        width: 70px;
      }
```

```dojo
    <style>
      .k-calendar .k-content .k-alt {
        width: 70px;
      }
    </style>
    <input id="datepicker1" />

    <script id="week-template" type="text/x-kendo-template">
       <a>#= data.weekNumber # - #= getYearFromWeekNumber(data) #</a>
    </script>

    <script>
      function getYearFromWeekNumber(data) {
        var year = data.currentDate.getFullYear();
        if (data.weekNumber == 1 && data.currentDate.getMonth() == 11) {
          year++;
        }
        return year;
      }

      $("#datepicker1").kendoDatePicker({
        weekNumber: true,
        month: {
          // template for dates in month view
          weekNumber:  $("#week-template").html()
        },
      });
    </script>
```

## See Also

* [month.weekNumber - DatePicker - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker/configuration/month#monthweeknumber)
* [month.weekNumber - DateTimePicker - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker/configuration/month#monthweeknumber)
* [month.weekNumber - Calendar - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar/configuration/month#monthweeknumber)
