---
title: Disabled Dates
page_title: jQuery Calendar Documentation | Disabled Dates
description: "Get started with the jQuery Calendar by Kendo UI and disable specific dates in the widget."
slug: disableddates_kendoui_calendar
position: 3
---

# Disabled Dates

The Calendar allows you to disable certain days which are not intended to be selected by the end user such as weekends, national holidays, and others.

To disable a date in the Calendar, use either of the following approaches:
* [Set an array of dates](#setting-an-array)
* [Add a function](#adding-a-function)

For a runnable example, refer to the [demo on disabling dates in the Calendar](https://demos.telerik.com/kendo-ui/calendar/disable-dates).

## Setting an Array

To disable dates by setting an array, list the names of days that will be disabled by using the first letters from their names in English.

```dojo
   <div id="calendar"></div>
   <script>
    $("#calendar").kendoCalendar({
		value: new Date(),
		disableDates: ["we", "th"],
	});
  </script>
```

## Adding a Function

To disable dates by using a function, set the return value for the date that will be disabled to `true`.

```dojo
    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
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

* [Disabling Dates in the Calendar (Demo)](https://demos.telerik.com/kendo-ui/calendar/disable-dates)
* [JavaScript API Reference of the Calendar](/api/javascript/ui/calendar)
