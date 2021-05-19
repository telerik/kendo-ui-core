---
title: Date and Time Formatting
page_title: jQuery DateTimePicker Documentation | Date and Time Formatting
description: "Get started with the jQuery DateTimePicker by Kendo UI and learn how to define its date and time format."
slug: datetimeformats_kendoui_datetimepicker_widget
position: 6
---

# Date and Time Formatting

The DateTimePicker allows you to define its date and time formatting.

The following example demonstrates how to define the date-time format.

    <input id="dateTimePicker">

    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            format: "MM/dd/yyyy hh:mm tt" //format is used to format the value of the widget and to parse the input.
        });
    </script>

The DateTimePicker value is parsed when the user changes the content through typing. For example, if the format contains only a time portion, the date is reset to today's date. To support such a DateTimePicker format, make the textbox of the widget read-only after the widget is initialized, and not through the `readonly()` method of the widget. Otherwise, the **Date** and **Time** popups will be disabled.

    <input id="dateTimePicker">

    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            /*...*/
        }).attr("readonly", "readonly");
    </script>

The following example demonstrates how to define the time format.

    <input id="dateTimePicker">

    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            timeFormat: "hh:mm:ss tt" // This format will be used to format the predefined values in the time list.
        });
    </script>

## See Also

* [Basic Usage of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/index)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
