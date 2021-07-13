---
title: Disabled Dates
page_title: jQuery DateRangePicker Documentation | Disabled Dates
description: "Get started with the jQuery DateRangePicker by Kendo UI and disable specific dates in the widget."
slug: disableddates_kendoui_daterangepicker
position: 2
---

# Disabled Dates

The DateRangePicker allows you to disable specific days which are not intended to be selected by the end user such as weekends and national holidays.

To disable a date in the DateRangePicker, use either of the following approaches:

* [Set an array of dates](#setting-an-array)
* [Add a function](#adding-a-function)

## Setting an Array

To disable dates by setting an array, list the names of the days that will be disabled by using the first letters from their names in English.

```dojo
    <div id="daterangepicker"></div>

    <script>
		var start = new Date();
		var end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 10);
		$("#daterangepicker").kendoDateRangePicker({
			range: [start, end],
			disableDates: ["we", "th"],
		});
    </script>
```

## Adding a Function

To disable dates by using a function, set the return value for the date that will be disabled to `true`.

```dojo
    <div id="daterangepicker"></div>

    <script>
        $("#daterangepicker").kendoDateRangePicker({
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

* [Basic Usage of the DateRangePicker (Demo)](https://demos.telerik.com/kendo-ui/daterangepicker/index)
* [JavaScript API Reference of the DateRangePicker](/api/javascript/ui/daterangepicker)
