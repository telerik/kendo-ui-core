---
title: Select/Deselect Dates with Click Only
description: An example on how to select multiple dates in Kendo UI Calendar widget without holding the Ctrl key.
type: how-to
page_title: Select multiple dates only with click | Kendo UI Calendar
slug: calendar-select-dates-click
tags: kendo, ui, calendar, select, range, dates, multiple, click, mouse, only, control, ctrl
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
  <td>Created with version 2018.1.226</td>
 </tr>
</table>
 

## Description

By default selecting multiple dates in the Calendar requires holding the Ctrl key. I would like to select dates only by clicking on them.

## Solution

The functionality can be achieved by preventing the default click action for the calendar dates. Then you can get the clicked date and add it to a collection of the selected dates. Set the selected dates for the Calendar via the [selectDates method](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar/configuration/selectdates).

```html
<div id="calendar"></div>

<script>
    $(document).ready(function () {
        // create Calendar from div HTML element
        $("#calendar").kendoCalendar({
            selectable: "multiple"
        });


        $("#calendar").on("mousedown", "td", function (e) {

            // get item if the user clicked on an item template
            var clickedItem = $(e.target).closest("td[role='gridcell']");

            // prevent click event for item elements
            clickedItem.on("click", function (e) {
                e.stopPropagation();
                e.preventDefault();
            });

            if (clickedItem.length > 0) {
                var calendar = $("#calendar").getKendoCalendar();
                var clickedDateString = clickedItem.children("a")[0].title;
                var clickedDate = new Date(clickedDateString);

                var selectedDates = calendar.selectDates();

                if (clickedItem.hasClass("k-state-selected")) {
                    // if date is already selected - remove it from collection
                    selectedDates = $.grep(selectedDates, function (item, index) {
                        return clickedDate.getTime() !== item.getTime();
                    });
                } else {
                    selectedDates.push(clickedDate);
                }


                calendar.selectDates(selectedDates);
            }
        });


    });
</script>
```

## See Also

* [API Reference of the DatePicker](http://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker)
* [API Reference of the DateTimePicker](http://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)
* [API Reference of the Calendar](http://docs.telerik.com/kendo-ui/api/javascript/ui/calendar)
