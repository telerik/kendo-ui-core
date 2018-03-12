---
title: Select or Deselect Dates with Click Only
description: An example on how to select multiple dates in the Kendo UI Calendar without holding the Ctrl key.
type: how-to
page_title: Select Multiple Dates without Using the Ctrl Key | Kendo UI Calendar
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

How can I select or deselect multiple dates only by clicking them and without using the `Ctrl` key?

## Solution

1. Prevent the default click action for the Calendar dates.
1. Get the clicked date and add it to a collection of the selected dates.
1. Set the selected dates for the Calendar by using the [`selectDates`](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar/configuration/selectdates) method.

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
