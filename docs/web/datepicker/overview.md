---
title: Overview
page_title: Overview | Kendo UI DatePicker Widget
description: "Learn how to initialize the Kendo UI DatePicker widget and configure its options."
slug: overview_kendoui_datepicker_widget
position: 1
---

# DatePicker Overview

[Kendo UI DatePicker widget](http://demos.telerik.com/kendo-ui/datepicker/index) allows the user to select a date from a calendar or via a direct input. It also supports custom templates for its `month` view and configuration options for minimum and maximum dates, a start view and the depth of the navigation.

## Getting Started

### Initialize the DatePicker

    <input id="datePicker" />

    <script>
        $(document).ready(function(){
            $("#datePicker").kendoDatePicker();
        });
    </script>

> **Important**
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
## See Also

Other articles on Kendo UI DatePicker:

* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Select Ranges between DatePickers]({% slug howto_select_ranges_between_datepicker %})
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [How to Use AngularJS Copy Functionality]({% slug howto_use_angularjs_copy_functionality_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Disable Dates]({% slug howto_disable_dates_datepicker %})
* [How to Hide the Deafult Button]({% slug howto_hide_default_button_datepicker %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [How to Restrict User Input to Min/Max Values]({% slug howto_restrict_user_input_minandmax_values_datepicker %})
* [How to Show Out-of-Range Dates as Disabled]({% slug howto_show_outofrange_dates_disabled_datepicker %})
* [How to Submit Forms on ENTER]({% slug howto_submmit_forms_onenter_datepicker %})
* [Overview of the ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/datepicker/overview)
* [Overview of the JSP Tag](/jsp/tags/datepicker/overview)
* [Overview of the PHP Class](/php/widgets/datepicker/overview)
* [JavaScript API Reference](/api/javascript/ui/datepicker)

Articles on Kendo UI Calendar:

* [Overview]({% slug overview_kendoui_calendar_widget %})
* [How to Control the Header Format]({% slug howto_control_header_format_calendar %})
* [JavaScript API Reference](/api/javascript/ui/calendar)

Articles on Kendo UI DateTimePicker:

* [Overview]({% slug overview_kendoui_datetimepicker_widget %})
* [How to Prevent Invalid Values]({% slug howto_prevent_invalid_values_datetimepicker %})
* [How to Validate Custom Dates]({% slug howto_validate_custom_dates_datetimepicker %})
* [How to Limit Navigation to Months]({% slug howto_limit_navigation_tomonths_datetimepicker %})
* [How to Override Hours in the Popup]({% slug howto_override_hours_inpopup_datetimepicker %})
* [JavaScript API Reference](/api/javascript/ui/datetimepicker)

Articles on Kendo UI TimePicker:

* [Overview]({% slug overview_kendoui_timepicker_widget %})
* [JavaScript API Reference](/api/javascript/ui/timepicker)