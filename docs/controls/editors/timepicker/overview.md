---
title: Overview
page_title: Overview | Kendo UI TimePicker
description: "Learn how to initialize the Kendo UI TimePicker widget and configure its behaviors."
slug: overview_kendoui_timepicker_widget
position: 1
---

# TimePicker Overview

The [Kendo UI TimePicker widget](http://demos.telerik.com/kendo-ui/timepicker/index) enables users to select time values from a predefined list or enter new ones.

It supports configurable options for the format, minimum and maximum time, and interval between the predefined values in the list.

## Getting Started

### Initialize the TimePicker

To initialize the DatePicker, use an `id` selector.

###### Example

    <input id="timePicker" />

    <script>
        $(document).ready(function(){
            $("#timePicker").kendoTimePicker();
        });
    </script>

> **Important**
>
> The widget copies any styles and CSS classes from the input element to the wrapper element.

## Configuration

The DatePicker provides default configuration options that can be set during initialization. The available settings are:

* Selected time
* Minimum and/or maximum time
* Time format
* Define interval between predefined values in the list

### Selected, Minimum, and Maximum Time

The following example demonstrates how to define the selected, minimum, and maximum times.

###### Example

    <input id="timePicker" />

    <script>
        $("#timePicker").kendoTimePicker({
            value: new Date(2000, 10, 10, 10, 0, 0),
            min: new Date(1950, 0, 1, 8, 0, 0),
            max: new Date(2049, 11, 31, 18, 0, 0)
        });
    </script>

The TimePicker sets the value only if the entered time is valid and within the defined range.

### Time Format

The following example demonstrates how to define the time format.

###### Example

    <input id="timePicker" />

    <script>
        $("#timePicker").kendoTimePicker({
            format: "hh:mm:ss tt"
        });
    </script>

### Interval between List Values

The following example demonstrates how to define the interval in minutes between values in the list.

###### Example

    <input id="timePicker" />

    <script>
        $("#timePicker").kendoTimePicker({
            interval: 15
        });
    </script>

## Validation

The widget keeps the input value unchanged, even when the typed date is invalid. This behavior results because of the following reasons:

- The widget allows different date parse formats which require unrestricted user input. For more information, refer to the [`parseFormats`](/api/javascript/ui/timepicker/configuration/parseformats) option.
- The widget does not automatically update the typed text when it is invalid. If the widget changes the input value, this leads to unexpected behavior.

The best way to validate the TimePicker is to use a client-validation framework such as the [Kendo UI Validator]({% slug overview_kendoui_validator_widget %}). It enables you to provide end users with meaningful error message and point them to the right actions to resolve an issue. For more information, refer to the [online validation demos](http://demos.telerik.com/kendo-ui/validator/custom-validation).

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the TimePicker Widget](/aspnet-mvc/helpers/timepicker/overview)
* [Overview of the TimePicker JSP Tag]({% slug overview_timepicker_uiforjsp %})
* [Overview of the TimePicker PHP Class](/php/widgets/timepicker/overview)
* [TimePicker JavaScript API Reference](/api/javascript/ui/timepicker)

Articles on the Kendo UI DatePicker:

* [Overview of the DatePicker Widget]({% slug overview_kendoui_datepicker_widget %})
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)

Articles on the Kendo UI DateTimePicker:

* [Overview of the DateTimePicker Widget]({% slug overview_kendoui_datetimepicker_widget %})
* [How to Prevent Invalid Values]({% slug howto_prevent_invalid_values_datetimepicker %})
* [How to Validate Custom Dates]({% slug howto_validate_custom_dates_datetimepicker %})
* [How to Limit Navigation to Months]({% slug howto_limit_navigation_tomonths_datetimepicker %})
* [How to Override Hours in the Popup]({% slug howto_override_hours_inpopup_datetimepicker %})
* [DateTimePicker JavaScript API Reference](/api/javascript/ui/datetimepicker)

Articles on the Kendo UI Calendar:

* [Overview of the Calendar Widget]({% slug overview_kendoui_calendar_widget %})
* [How to Control the Header Format]({% slug howto_control_header_format_calendar %})
* [Calendar JavaScript API Reference](/api/javascript/ui/calendar)
