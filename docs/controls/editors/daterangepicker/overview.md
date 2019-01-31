---
title: Overview
page_title: Overview | Kendo UI DateRangePicker
description: "Learn how to initialize the Kendo UI DateRangePicker widget and configure its options."
slug: overview_kendoui_daterangepicker_widget
position: 1
---

# DateRangePicker Overview

The [Kendo UI DateRangePicker widget](http://demos.telerik.com/kendo-ui/daterangepicker/index) allows the user to select date range from a calendar or through a direct input.

The DateRangePicker also supports custom templates for its `month` view, configuration options for minimum and maximum dates, a start view, and depth for navigation.

## Getting Started

### Initialize the DateRangePicker

The following example demonstrates how to initialize the DateRangePicker.

    <div id="daterangepicker"></div>

    <script>
        $(document).ready(function(){
            $("#daterangepicker").kendoDateRangePicker();
        });
    </script>

## Configuration

The DateRangePicker provides the following configuration options that can be set during initialization:

* Selected range
* Minimum and/or maximum date
* Format definition
* Start view

The first day of the week in the Calendar view depends on the applied [culture]({% slug culture_definition_kendoui_globalization %}).

### Range, Min, and Max Dates

The following example demonstrates how to create a DateRangePicker with a selected date and a defined minimum and maximum dates. Note that the DateRangePicker sets the range only if the entered date is valid and within min and max values.

###### Example

    <div id="daterangepicker"></div>

    <script>
        $(document).ready(function(){
		    var currentDate = new Date();
			var start = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2);
            var end = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 20);
			var max = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 60);

            $("#daterangepicker").kendoDateRangePicker({
                range: [start, end],
                min: new Date(),
                max: max
            })
        });
    </script>


### Start View and Navigation Depth

Define the first rendered view with the `start` option. To control the navigation depth, use the `depth` option.

The following views are predefined:

* `month`&mdash;Shows the days of the month.
* `year`&mdash;Shows the months of the year.
* `decade`&mdash;Shows the years of the decade.
* `century`&mdash;Shows the decades of the century.

To enable the selection of dates for the range, set the `depth` to `month`.

## Disable Dates

The DateRangePicker enables you to disable certain days, such as weekends, national holidays, and others, which are not intended to be selected by the end user.

To disable a date, either:
* Set and array of dates, or
* Add a function to determine the return value as the date that is disabled.

### Set an Array

When you disable dates by setting an array, list the days that need to be disabled by using the first letters from their names in English.

###### Example

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

### Add a Function

When you disable dates by adding a function, determine its return value as `true` for the date that is disabled.

###### Example

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

## Calendar Types

The DateRangePicker works with the JavaScript `Date` objects that support only the [Gregorian](https://en.wikipedia.org/wiki/Gregorian_calendar) calendar. This means that the widget does not support other calendar types.

###### Example

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

* [Overview of the ASP.NET MVC HtmlHelper Extension for the DateRangePicker Widget](/aspnet-mvc/helpers/daterangepicker/overview)
* [DateRangePicker JavaScript API Reference](/api/javascript/ui/daterangepicker)
* [Overview of the Calendar Widget]({% slug overview_kendoui_calendar_widget %})
* [How to Control the Header Format]({% slug howto_control_header_format_calendar %})
* [Calendar JavaScript API Reference](/api/javascript/ui/calendar)
* [DateTimePicker JavaScript API Reference](/api/javascript/ui/datetimepicker)
* [Overview of the TimePicker Widget]({% slug overview_kendoui_timepicker_widget %})
* [TimePicker JavaScript API Reference](/api/javascript/ui/timepicker)
