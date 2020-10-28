---
title: Selected Date and Time
page_title: jQuery DateTimePicker Documentation | Selected Date and Time
description: "Get started with the jQuery DateTimePicker by Kendo UI and learn how to select dates and time slots in the widget."
slug: selecteddatestimes_kendoui_datetimepicker
position: 3
---

# Selected Date and Time

The DateTimePicker allows you to render a pre-selected date and time and also define the minimum and maximum date and time slots it displays.

The DateTimePicker sets the value only if the entered date and time is valid and within the defined range.

    <input id="dateTimePicker">

    <script>
        $(document).ready(function(){
            $("#dateTimePicker").kendoDateTimePicker({
                value: new Date(2000, 10, 10, 10, 0, 0),
                min: new Date(1950, 0, 1, 8, 0, 0),
                max: new Date(2049, 11, 31, 18, 0, 0)
            })
        });
    </script>

## See Also

* [Range Selection in the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/rangeselection)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
