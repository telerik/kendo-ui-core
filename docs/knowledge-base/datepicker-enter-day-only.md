---
title: Enter Date by Setting Only the Day
description: An example on how to set a value by setting only the day in the Kendo UI DatePicker.
type: how-to
page_title: Set Date by Entering Only the Day | Kendo UI DatePicker for jQuery
slug: datepicker-enter-day-only
tags: kendo, datepicker, day, date, select, default, set
res_type: kb
component: datepicker
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DatePicker</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2018.1.226</td>
 </tr>
</table>
 

## Description

How can I enter only the day part of the date and let the rest of the DatePicker use the current month and year as default?

## Solution

The following example demonstrates how to achieve the desired functionality.

```dojo
<input id="datepicker" />
<script>
    $(document).ready(function () {
        // Create DatePicker from an input HTML element.
        $("#datepicker").kendoDatePicker();

        $("#datepicker").on("blur", function (e) {
            var rawValue = $(this).val();
            var parsedValue = parseInt(rawValue);

            if (!parsedValue) {
                alert("value is not a valid day");
                return;
            }

            var selectedDate = $(this).getKendoDatePicker().value();

            if (!selectedDate && rawValue.length <= 2 && parsedValue <= 31) {
                var picker = $(this).getKendoDatePicker();
                var date = new Date();
                date.setDate(parsedValue);

                picker.value(date);
            }

        })

    });
</script>
```

## See Also

* [API Reference of the DatePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker)
* [API Reference of the DateTimePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)
* [API Reference of the Calendar](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar)
