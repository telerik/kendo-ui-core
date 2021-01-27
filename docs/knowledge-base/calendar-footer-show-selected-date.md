---
title: Calendar Footer Show Selected Date
page_title: Show Selected Date in Footer  | Kendo UI Calendar for jQuery
description: An example on how to show the currently selected date in the footer of the calendar and navigate to it when clicked.
type: how-to
slug: calendar-footer-show-selected-date
tags: kendo, ui, calendar, footer, show, selected, current, date, select, navigate
res_type: kb
ticketid: 1463800
component: calendar
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Calendar</td>
 </tr>
 <tr>
  <td>Created with Kendo UI version</td>
  <td>2019.2.514</td>
 </tr>
</table>
 

## Description

I would like to show the currently selected date in the footer of the calendar and navigate to it when clicked.

## Solution

To implement a timezone we need to take care of the following:

1. Add a [`change`](/api/javascript/ui/calendar/events/change) event in the calendar
1. Get the currently selected date with the [`value()`](/api/javascript/ui/calendar/methods/value) method
1. Update the footer template and remove the built-in click handler from the anchor element
1. Add your own click handler that calls the [`navigate()`](/api/javascript/ui/calendar/methods/navigate) method and navigates to the selected date

```
    change: function(e){
        var calendar = this;
        var selectedDate = calendar.value();
        var footer = calendar.footer(selectedDate);
        calendar.element.find(".k-footer .k-nav-today").html(footer).attr("title", kendo.toString(selectedDate, "D",calendar.options.culture)).off("click").on("click", function(e){
          e.preventDefault();
          calendar.navigate(selectedDate);
        });
    }
```

```dojo
    <div id="example">
      <div class="demo-section k-content" style="text-align: center;">
        <h4>Pick a date</h4>
        <div id="calendar"></div>
      </div>
      <script>
        $(document).ready(function() {
          // create Calendar from div HTML element
          $("#calendar").kendoCalendar({
            value: new Date(),
            footer: "Selected - #: kendo.toString(data, 'd') #",
            change: function(e){
              var calendar = this;
              var selectedDate = calendar.value();
              var footer = calendar.footer(selectedDate);
              calendar.element.find(".k-footer .k-nav-today").html(footer).attr("title", kendo.toString(selectedDate, "D", calendar.options.culture)).off("click").on("click", function(e){
                e.preventDefault();
                calendar.navigate(selectedDate);
              });
            }
          });
        });
      </script>
    </div>
```

## See Also

* [API Reference of the Calendar](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar)
