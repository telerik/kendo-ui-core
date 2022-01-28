---
title: Disabled Dates
page_title: jQuery MultiViewCalendar Documentation | Disabled Dates
description: "Get started with the jQuery MultiViewCalendar by Kendo UI and disable specific dates in the widget."
slug: disabled_dates_multiviewcalendar
position: 6
---

# Disabled Dates

The MultiViewCalendar allows you to disable certain days which are not intended to be selected by the end user such as weekends, national holidays, and others.

To disable a date in the MultiViewCalendar, use either of the following approaches:
* [Set an array of dates](#setting-an-array)
* [Add a function](#adding-a-function)

For a runnable example, refer to the [demo on disabling dates in the MultiViewCalendar](https://demos.telerik.com/kendo-ui/multiviewcalendar/disabled-dates).

## Setting an Array

To disable dates by setting an array, list the names of days that will be disabled by using the first letters from their names in English.

```dojo
   <div id="multiViewCalendar"></div>
   <script>
    $("#multiViewCalendar").kendoMultiViewCalendar({
		value: new Date(),
		disableDates: ["we", "th"],
	});
  </script>
```

## Adding a Function

To disable dates by using a function, set the return value for the date that will be disabled to `true`.

```dojo
    <div id="multiViewCalendar"></div>
    <script>
    $("#multiViewCalendar").kendoMultiViewCalendar({
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

* [Basic Usage of the MultiViewCalendar (Demo)](https://demos.telerik.com/kendo-ui/multiviewcalendar/index)
* [Using the API of the MultiViewCalendar (Demo)](https://demos.telerik.com/kendo-ui/multiviewcalendar/api)
* [JavaScript API Reference of the MultiViewCalendar](/api/javascript/ui/multiviewcalendar)
