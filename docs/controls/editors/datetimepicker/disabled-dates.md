---
title: Disabled Dates
page_title: jQuery DateTimePicker Documentation | Disabled Dates
description: "Get started with the jQuery DateTimePicker by Kendo UI and disable specific dates in the widget."
slug: disableddates_kendoui_datetimepicker
position: 2
---

# Disabled Dates

The DateTimePicker allows you to disable specific days which are not intended to be selected by the end user such as weekends and national holidays.

To disable a date in the DateTimePicker, use either of the following approaches:
* [Set an array of dates](#setting-an-array)
* [Add a function](#adding-a-function)

For a runnable example, refer to the [demo on disabling dates in the DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/disable-dates).

## Setting an Array

To disable dates by setting an array, list the names of days that will be disabled by using the first letters from their names in English.

```dojo
    <input id="dateTimePicker" />

    <script>
    $("#dateTimePicker").kendoDateTimePicker({
		value: new Date(),
		disableDates: ["we", "th"],
	});
    </script>
```

## Adding a Function

To disable dates by using a function, set the return value for the date that will be disabled to `true`.

```dojo
    <input id="dateTimePicker" />

    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            disableDates: function (date) {
                var disabled = [13,14,20,21];
                if (date && disabled.indexOf(date.getDate()) > -1 ) {
                    return true;
                } else {
                    return false;
                }
            }
        });
    </script>
```

## See Also

* [Disabling Dates in the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/disable-dates)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
