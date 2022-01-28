---
title: Disabled Dates
page_title: jQuery DatePicker Documentation | Disabled Dates
description: "Get started with the jQuery DatePicker by Kendo UI and learn how to disable specific dates in the widget."
slug: disableddates_datepicker
position: 2
---

# Disabled Dates

The DatePicker allows you to disable specific days which are not intended to be selected by the end user such as weekends and national holidays.

To disable a date in the DatePicker, use either of the following approaches:
* [Set an array of dates](#setting-an-array)
* [Add a function](#adding-a-function)

For a complete example, refer to the [demo on disabling dates in the DatePicker](https://demos.telerik.com/kendo-ui/datepicker/disable-dates).

## Setting an Array

To disable dates through setting an array, list the days that have to be disabled by using the first letters of their names in English.

```dojo
    <input id="datePicker" />

    <script>
    $("#datePicker").kendoDatePicker({
		value: new Date(),
		disableDates: ["we", "th"],
	});
    </script>
```

## Adding a Function

To disable dates through using a function, set the return value for the date that will be disabled to `true`.

```dojo
    <input id="datePicker" />

    <script>
        $("#datePicker").kendoDatePicker({
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

* [Disabling Dates in the DatePicker (Demo)](https://demos.telerik.com/kendo-ui/datepicker/disable-dates)
* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
