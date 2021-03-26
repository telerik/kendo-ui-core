---
title: Kendo Calendar with Timezone
page_title: Timezone Calendar  | Kendo UI Calendar for jQuery
description: An example on how to create a calendar that shows the current day in a selected timezone with the Kendo UI Calendar widget.
type: how-to
slug: calendar-with-timezone
tags: kendo, ui, calendar, timezone, time, zone, current, today
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
  <td>2020.1.406</td>
 </tr>
</table>
 

## Description

We currently have the Kendo UI Calendar implemented within our application. User accounts within our application are allowed to have a timezone set. We'd like to be able to pass this timezone into the calendar so it shows the current day with respect to this timezone. It appears as though the calendar is set up to use the browser timezone. We're wondering if it's currently possible to override the browser timezone with a different one or if you had any plans to implement this option in the future?

## Solution

To implement a timezone we need to take care of the following:

1. The calendar footer needs to display the date value in the selected timezone
1. The current day has a special style that needs to be added to the correct cell


```dojo
    <script src="https://kendo.cdn.telerik.com/2020.1.406/js/kendo.timezones.min.js"></script>
    <div class="k-card">
      <div class="k-toolbar">
        <label for="picker" class="k-edit-label">Change selection to see today's day in different timezones</label>
        <input id="picker" class="k-edit-field" />
      </div>
      <div id="calendar"></div>
    </div>
    <script id="footer-template" type="text/x-kendo-template">
        #: kendo.toString(converted, "D") #
		</script>
    <script>
        var converted;
        var picker = $("#picker").kendoDropDownList({
          dataSource: ["Australia/Brisbane", "America/Chicago", "Africa/Johannesburg"],
          change: function(e){
            converted = kendo.timezone.apply(new Date(), this.value())
            calendar.value(converted);
            calendar._footer(kendo.template($("#footer-template").html()));
            addTodayStyle({ sender: calendar});
          }
        }).data("kendoDropDownList");

        var selectedOfset = picker.value();
        converted = kendo.timezone.apply(new Date(),selectedOfset);

        var calendar = $("#calendar").kendoCalendar({
          value: converted,
          footer: kendo.template($("#footer-template").html()),
          navigate: addTodayStyle
        }).data("kendoCalendar");
      
        function addTodayStyle(e){
            var todayString = e.sender._view.toDateString(converted);
            e.sender.element.find(".k-today").removeClass("k-today");
            e.sender.element.find("[data-value='" + todayString +  "']").parent().addClass("k-today");
        }      
    </script>    
```

## See Also

* [API Reference of the Calendar](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar)
