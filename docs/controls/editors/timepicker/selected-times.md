---
title: Selected Times
page_title: jQuery TimePicker Documentation | Selected Times
description: "Get started with the jQuery TimePicker by Kendo UI and learn how to set selected times in the widget."
slug: selectedtimes_kendoui_timepicker
position: 2
---

# Selected Times

The following example demonstrates how to define the selected, minimum, and maximum times.

    <input id="timePicker" />

    <script>
        $("#timePicker").kendoTimePicker({
            value: new Date(2000, 10, 10, 10, 0, 0),
            min: new Date(1950, 0, 1, 8, 0, 0),
            max: new Date(2049, 11, 31, 18, 0, 0)
        });
    </script>

The TimePicker sets the value only if the entered time is valid and within the defined range.

## See Also

* [Basic Usage of the TimePicker (Demo)](https://demos.telerik.com/kendo-ui/timepicker/index)
* [Using the API of the TimePicker (Demo)](https://demos.telerik.com/kendo-ui/timepicker/api)
* [JavaScript API Reference of the TimePicker](/api/javascript/ui/timepicker)
