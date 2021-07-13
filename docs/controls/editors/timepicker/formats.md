---
title: Formats
page_title: jQuery TimePicker Documentation | Formats
description: "Get started with the jQuery TimePicker by Kendo UI and learn how to define its time format."
slug: formats_kendoui_timepicker
position: 3
---

# Formats

The TimePicker allows you to define its time formatting.

The following example demonstrates how to define the time format.

    <input id="timePicker" />

    <script>
        $("#timePicker").kendoTimePicker({
            format: "hh:mm:ss tt"
        });
    </script>

The following example demonstrates how to define the interval (in minutes) between the values in the drop-down list with the time slots.

    <input id="timePicker" />

    <script>
        $("#timePicker").kendoTimePicker({
            interval: 15
        });
    </script>

## See Also

* [Basic Usage of the TimePicker (Demo)](https://demos.telerik.com/kendo-ui/timepicker/index)
* [Using the API of the TimePicker (Demo)](https://demos.telerik.com/kendo-ui/timepicker/api)
* [JavaScript API Reference of the TimePicker](/api/javascript/ui/timepicker)
