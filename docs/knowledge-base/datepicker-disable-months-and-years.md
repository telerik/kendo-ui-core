---
title: Disable Months And Years
page_title: Disable Months And Years - Kendo UI DatePicker for jQuery
description: "An example demonstrating how to disable months and years in the DatePicker widget."
type: how-to
slug: datepicker-disable-months-and-years
tags: datepicker, disable, years, months, view, datetimepicker
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2022.1.119</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® DatePicker for jQuery</td>
	</tr>
</table>

## Description

The [`disableDates`](/api/javascript/ui/datetimepicker/configuration/disabledates) configuration provides the functionality to disable certain days in the month view of the DatePicker. This article demonstates how to disable months and years as well.

## Solution

1. Initialize two arrays that will hold the disabled months and years.
1. Attach a handler to the [`open`](/api/javascript/ui/datepicker/events/open) event of the DatePicker.
1. Inside the `open` event, retrieve a reference to the underlying `Calendar` widget.
1. Attach a handler to the [`navigate`](/api/javascript/ui/calendar/events/navigate) event of the `Calendar`.
1. Perform a conditional check to find out which view is currently open.
   * If the `year` view is open, iterate over the array of months.
   * If the `decade` view is open, iterate over the array of years.
1. Find the corresponding `HTML` element and add the `k-disabled` class to manually disable the month or year.

```dojo
    <input id="datepicker" />
    <script>
      const disabledMonths = ["Jan", "Apr"],
            disabledYears = [2020, 2024, 2027];

      var datePicker = $("#datepicker").kendoDatePicker({
        value: new Date()
      }).getKendoDatePicker();

      datePicker.one("open", function() {
        let calendar = this.dateView.calendar;

        calendar.bind("navigate", function(e) {
          let view = e.sender.view();

          if(view.name === "year") {
            for(let i=0; i<disabledMonths.length; i++) {
              let month = disabledMonths[i];
              calendar.element.find(".k-calendar-td>a:contains("+month+")")
                .parent()
                .addClass("k-disabled");
            }
          }

          if(view.name === "decade") {
            for(let i=0; i<disabledYears.length; i++) {
              let year = disabledYears[i];
              calendar.element.find(".k-calendar-td>a:contains("+year+")")
                .parent()
                .addClass("k-disabled");
            }
          }
        });
      });
    </script>
```
