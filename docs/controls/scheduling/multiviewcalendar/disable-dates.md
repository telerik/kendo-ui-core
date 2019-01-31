---
title: Disabled Dates
page_title: Disabled Dates | Kendo UI MultiViewCalendar
description: "Learn how to disable dates in the Kendo UI MultiViewCalendar widget."
slug: disabled_dates_multiviewcalendar
position: 6
---

# Disabled Dates

The MultiViewCalendar allows you to disable certain days which are not intended to be selected by the end user such as weekends, national holidays, and others.

To disable a date, either:

* Set an array, or
* Add a function.

## Set an Array

When you set an array, list the days that need to be disabled by using the first letters from their names in English.

###### Example

```dojo
   <div id="multiViewCalendar"></div>
   <script>
    $("#multiViewCalendar").kendoMultiViewCalendar({
		value: new Date(),
		disableDates: ["we", "th"],
	});
  </script>
```

## Add a Function

When you add a function, determine its return value as `true` for the date that is disabled.

###### Example

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

* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiViewCalendar Widget](/aspnet-mvc/helpers/multiviewcalendar/overview)
* [MultiViewCalendar JavaScript API Reference](/api/javascript/ui/multiviewcalendar)
