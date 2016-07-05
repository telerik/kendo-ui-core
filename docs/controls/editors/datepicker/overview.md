---
title: Overview
page_title: Overview | Kendo UI DatePicker
description: "Learn how to initialize the Kendo UI DatePicker widget and configure its options."
slug: overview_kendoui_datepicker_widget
position: 1
---

# DatePicker Overview

The [Kendo UI DatePicker widget](http://demos.telerik.com/kendo-ui/datepicker/index) allows the user to select a date from a calendar or via a direct input. It also supports custom templates for its `month` view and configuration options for minimum and maximum dates, a start view and the depth of the navigation.

## Getting Started

### Initialize the DatePicker

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

The DatePicker provides configuration options that can be set during initialization. Among the properties you can control are:

* Selected date
* Minimum and/or maximum date
* Format definition
* Start view
* Navigation depth (the last view to which the user can navigate)

### Selected, Min, and Max Dates

The example below demonstrates how to create a DatePicker with a selected date and a defined minimum and maximum dates.

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

Note that the DatePicker will set the value only if the entered date is valid and within the defined range.

### Start View and Navigation Depth

Define the first rendered view with the `start` option. Control the navigation depth with the `depth` option. The following views are predefined:

*   `month` - shows the days of the month
*   `year` - shows the months of the year
*   `decade` - shows the years of the decade
*   `century` - shows the decades of the century

### Selectable Month DatePicker

The example below demonstrates how to create a DatePicker that allows users to select a month.

###### Example

    <input id="datePicker" />

    <script>
        $("#datePicker").kendoDatePicker({
            start: "year",
            depth: "year"
        });
    </script>

## Disable Dates

Kendo UI DatePicker widget provides the functionality to disable certain days, such as weekends, national holidays, and others, which are not intended to be selected by the end user.

### Set an Array

One way to disable a date is by setting an array. List the days that need to be disabled by using the first letters from their names in English.

###### Example

```html
    <input id="datePicker" />

    <script>
    $("#datePicker").kendoDatePicker({
		value: new Date(),
		disableDates: ["we", "th"],
	});
    </script>
```

### Add a Function

The other way to disable dates is by adding a function and determine its return value as `true` for the date that is disabled.

###### Example

```html
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

- The widget allows different date parse formats, which require unrestricted user input. Refer to the [`parseFormats`](/api/javascript/ui/datepicker#configuration-parseFormats) option for more details.
- The widget does not update automatically the typed text, when it is invalid. This would lead to unexpected behavior if the widget changes the input value.

The best way to validate the DatePicker widget is to use a client-validation framework, such as the [Kendo UI Validator]({% slug overview_kendoui_validator_widget %}). Thus you are able to provide meaningful error message to end users pointing them to the right actions to resolve the issue. For more details, check the [online custom validation demos](http://demos.telerik.com/kendo-ui/validator/custom-validation).

## Calendar Types

The DatePicker widget works with JavaScript `Date` objects, that support only the [Gregorian](https://en.wikipedia.org/wiki/Gregorian_calendar) calendar. This means that the widget does not support other calendar types.

If you would like to simulate a different calendar date, like Lunar, use the JavaScript `Date` object and create a date that is just in the past. The example below demonstrates how to do this.

###### Example

```html
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

## See Also

Other articles on the Kendo UI DatePicker:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the DatePicker Widget](/aspnet-mvc/helpers/datepicker/overview)
* [Overview of the DatePicker JSP Tag]({% slug overview_datepicker_uiforjsp %})
* [Overview of the DatePicker PHP Class](/php/widgets/datepicker/overview)
* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)

For how-to examples on the Kendo UI DatePicker widget, browse its [**How To** documentation folder]({% slug howto_select_ranges_between_datepicker %}).

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
