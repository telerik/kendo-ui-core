---
title: Select a Range of Dates
page_title: Select a Range of Dates | Kendo UI Calendar for jQuery
description: An example on how to select a range of dates in the Kendo UI Calendar widget.
type: how-to
slug: calendar-select-range-of-dates
tags: kendo, ui, calendar, select, range, dates, multiple, between, datepicker
res_type: kb
component: calendar
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Calendar</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Tested up to version 2017.3.1026</td>
 </tr>
</table>
 

## Description

How can I select a range of dates in the Kendo Calendar widget?

## Solution

Once the user chooses both the end and start dates, select the dates in the selected range by using the [`selectDates` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar/methods/selectdates).

```dojo
    <label>Start:</label>

    <input id='start'/>

    <label>End:</label>
    <input id='end'/>
    <br/>
    <div id='calendar' style='margin:10px'></div>

    <script>
      Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
      }

      $('#start').kendoDatePicker({
        change: rangeSelection
      });

      $('#end').kendoDatePicker({
        change: rangeSelection
      });

      $('#calendar').kendoCalendar({
        selectable:'multiple'
      });

      function rangeSelection() {

        var start = $('#start').data('kendoDatePicker');
        var end = $('#end').data('kendoDatePicker');
        var calendar = $('#calendar').data('kendoCalendar');

        if (start.value() && end.value() && start.value().getTime() <= end.value().getTime()) {
          debugger
          var datesToSelect = [];
          var daysToAdd = 0;
          while (true) {
            var dateToAdd = start.value().addDays(daysToAdd);
            if (dateToAdd.getTime() >= end.value().getTime()) {
              datesToSelect.push(dateToAdd);
              break;
            }
            datesToSelect.push(dateToAdd);
            daysToAdd++;
          }

          calendar.selectDates(datesToSelect);
        }
      }

    </script>
```

## See Also

* [API Reference of the DatePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker)
* [API Reference of the DateTimePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)
* [API Reference of the Calendar](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar)
