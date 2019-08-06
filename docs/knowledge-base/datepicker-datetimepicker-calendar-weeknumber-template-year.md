---
title: Add Week Numbers and Years to the Calendar Month View
description: An example on how to add a week number template to the month view of the Kendo UI Calendar.
type: how-to
page_title: Add a Year-to-Week-Number Template | Kendo UI DateTimePicker
slug: datepicker-datetimepicker-calendar-weeknumber-template-year
tags: datepicker, datetimepicker, weeknumber, template, year, week, number, calendar
ticketid: 1409114
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>DatePicker for Progress® Kendo UI®, DateTimePicker for Progress® Kendo UI®, Calendar for Progress® Kendo UI®</td>
 </tr>

  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

How can I format the `weekNumber` section in the calendar to include the year in the Kendo UI DatePicker, DateTimePicker, or Calendar?

## Solution

1. Format the `weekNumber` in the [`month.weekNumber` configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker/configuration/month#monthweeknumber) by using a template. To modify the appearance, use the `currentDate` and `weekNumber` properties.  

        ```javascript
            <script id="week-template" type="text/x-kendo-template">
          	   <a>#= data.weekNumber # - #= getYearFromWeekNumber(data) #</a>
            </script>
        ```

1. To handle the last and first week of a year from being one year behind, create a custom function which will return the correct year.

        ```javascript
              function getYearFromWeekNumber(data) {
                var year = data.currentDate.getFullYear();
                if (data.weekNumber == 1 && data.currentDate.getMonth() == 11) {
                  year++;
                }
                return year;
              }
        ```

1. Based on your preferences, modify the CSS of the `weekNumber` column so it is wide enough for the content.

        ```CSS
              .k-calendar .k-content .k-alt {
                width: 70px;
              }
        ```

The following example demonstrates the full implementation of the suggested approach.

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

* [API Reference of month.weekNumber for the DatePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker/configuration/month#monthweeknumber)
* [API Reference of month.weekNumber for the DateTimePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker/configuration/month#monthweeknumber)
* [API Reference of month.weekNumber for the Calendar](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar/configuration/month#monthweeknumber)
