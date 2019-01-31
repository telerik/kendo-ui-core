---
title: Overview
page_title: Overview | Kendo UI DatePicker
description: "Learn how to initialize the Kendo UI DatePicker widget and configure its options."
slug: overview_kendoui_datepicker_widget
position: 1
---

# DatePicker Overview

The [Kendo UI DatePicker widget](http://demos.telerik.com/kendo-ui/datepicker/index) allows the user to select a date from a calendar or through a direct input.

The DatePicker also supports custom templates for its `month` view, configuration options for minimum and maximum dates, a start view, and depth for navigation.

## Getting Started

### Initialize the DatePicker

To initialize the DatePicker, use the following example.

    <input id="datePicker" />

    <script>
        $(document).ready(function(){
            $("#datePicker").kendoDatePicker();
        });
    </script>

> **Important**
>
> The widget copies any styles and CSS classes from the input element to the wrapper element.

## Configuration

The DatePicker provides configuration options that can be set during initialization. The available properties are:

* Selected date
* Minimum and/or maximum date
* Format definition
* Start view
* Navigation depth (the last view to which the user can navigate)

The first day of the week in the Calendar view depends on the applied [culture]({% slug culture_definition_kendoui_globalization %}).

### Selected, Min, and Max Dates

The following example demonstrates how to create a DatePicker with a selected date and a defined minimum and maximum dates.

###### Example

    <input id="datePicker" />

    <script>
        $(document).ready(function(){
            $("#datePicker").kendoDatePicker({
                value: new Date(),
                min: new Date(1950, 0, 1),
                max: new Date(2049, 11, 31)
            })
        });
    </script>

Note that the DatePicker sets the value only if the entered date is valid and within the defined range.

### Start View and Navigation Depth

Define the first rendered view with the `start` option. Control the navigation depth with the `depth` option. The following views are predefined:

* `month`&mdash;Shows the days of the month.
* `year`&mdash;Shows the months of the year.
* `decade`&mdash;Shows the years of the decade.
* `century`&mdash;Shows the decades of the century.

### Selectable Month DatePicker

The following example demonstrates how to create a DatePicker that allows users to select a month.

###### Example

    <input id="datePicker" />

    <script>
        $("#datePicker").kendoDatePicker({
            start: "year",
            depth: "year"
        });
    </script>

## Disable Dates

The DatePicker enables you to disable certain days, such as weekends, national holidays, and others, which are not intended to be selected by the end user.

To disable a date, either:
* Set and array of dates, or
* Add a function to determine the return value as the date that is disabled.

### Set an Array

When you disable dates by setting an array, list the days that need to be disabled by using the first letters from their names in English.

###### Example

```dojo
    <input id="datePicker" />

    <script>
    $("#datePicker").kendoDatePicker({
		value: new Date(),
		disableDates: ["we", "th"],
	});
    </script>
```

### Add a Function

When you disable dates by adding a function, determine its return value as `true` for the date that is disabled.

###### Example

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

## Validation

The widget is designed to keep the input value unchanged, even when the typed date is invalid. This is due the following facts:

- The widget allows different date parse formats, which require unrestricted user input. For more information, refer to the [`parseFormats`](/api/javascript/ui/datepicker/configuration/parseformats) option.
- The widget does not update automatically the typed text when it is invalid. Such a change in the input value that is made by the widget, leads to unexpected behavior.

The best way to validate the DatePicker widget is to use a client-validation framework such as the [Kendo UI Validator]({% slug overview_kendoui_validator_widget %}). In this way, you can provide a meaningful error message to the end user that prompts the right actions for them to resolve the issue. For more details, refer to the [online custom validation demos](http://demos.telerik.com/kendo-ui/validator/custom-validation).

## Calendar Types

The DatePicker works with the JavaScript `Date` objects that support only the [Gregorian](https://en.wikipedia.org/wiki/Gregorian_calendar) calendar. This means that the widget does not support other calendar types.

To simulate a different calendar type, such as Lunar, use the JavaScript `Date` object and create a date that is in the past. The following example demonstrates how to achieve this behavior.

###### Example

```dojo
<fieldset>
    <label for="gregorianStyle">Gregorian year:</label>
    <input id="gregorianStyle" type="text" />
</fieldset>
<fieldset>
    <label for="lunarStyle">Lunar year:</label>
    <input id="lunarStyle" type="text" />
</fieldset>
<h4>Disclamer: In both cases the Gregorian calendar date is used. The second widget just shows the Gregorian date with the Lunar year</h4>

<script>
$(function() {
    var gregorian = new Date(2000, 10, 10); //date using Gregorian calendar
    var lunar = new Date(1497, 10, 10); //date using Gregorian calendar but created in lunar year

    $("#gregorianStyle").kendoDatePicker({ value: gregorian });
    $("#lunarStyle").kendoDatePicker({
        min: new Date(1400, 0, 1),
        value: lunar
    });
});
</script>
```

## DateInput Integration

You can use the [DateInput]({% slug overview_kendoui_dateinput_widget %}) as the input element in a DatePicker widget. To achieve this behavior, enable the `dateInput` property of DatePicker.

###### Example

    <input id="datepicker" />

    <script>
    $("#datepicker").kendoDatePicker({
        dateInput: true
    });
    </script>


## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the DatePicker Widget](/aspnet-mvc/helpers/datepicker/overview)
* [Overview of the DatePicker JSP Tag]({% slug overview_datepicker_uiforjsp %})
* [Overview of the DatePicker PHP Class](/php/widgets/datepicker/overview)
* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)

Articles on the Kendo UI Calendar:

* [Overview of the Calendar Widget]({% slug overview_kendoui_calendar_widget %})
* [How to Control the Header Format]({% slug howto_control_header_format_calendar %})
* [Calendar JavaScript API Reference](/api/javascript/ui/calendar)

Articles on the Kendo UI DateTimePicker:

* [Overview of the DateTimePicker Widget]({% slug overview_kendoui_datetimepicker_widget %})
* [How to Prevent Invalid Values]({% slug howto_prevent_invalid_values_datetimepicker %})
* [How to Validate Custom Dates]({% slug howto_validate_custom_dates_datetimepicker %})
* [How to Limit Navigation to Months]({% slug howto_limit_navigation_tomonths_datetimepicker %})
* [How to Override Hours in the Popup]({% slug howto_override_hours_inpopup_datetimepicker %})
* [DateTimePicker JavaScript API Reference](/api/javascript/ui/datetimepicker)

Articles on the Kendo UI TimePicker:

* [Overview of the TimePicker Widget]({% slug overview_kendoui_timepicker_widget %})
* [TimePicker JavaScript API Reference](/api/javascript/ui/timepicker)
