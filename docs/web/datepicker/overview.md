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

### Define Selected, Min, and Max Dates

Create a DatePicker with a selected date and a defined minimum and maximum dates in the following way:
    
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

### Define the Start View and Navigation Depth

Define the first rendered view with the `start` option. Control the navigation depth with the `depth` option. The following views are predefined:

*   `month` - shows the days of the month
*   `year` - shows the months of the year
*   `decade` - shows the years of the decade
*   `century` - shows the decades of the century

### Create a Selectable Month DatePicker

Create a DatePicker that allows users to select a month in the following way:

    <input id="datePicker" />
    
    <script>
        $("#datePicker").kendoDatePicker({
            start: "year",
            depth: "year"
        });
    </script>

## See Also

Other articles on Kendo UI DatePicker:

* [Overview of the DatePicker HtmlHelper](/aspnet-mvc/helpers/datepicker/overview)
* [Overview of the DatePicker JSP Tag](/jsp/tags/datepicker/overview)
* [Overview of the DatePicker PHP Server-Side Wrapper](/php/widgets/datepicker/overview)
* [Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [Select Ranges between DatePickers]({% slug howto_select_ranges_between_datepicker %})
* [Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [Use AngularJS Copy Functionality]({% slug howto_use_angularjs_copy_functionality_datepicker %})
* [Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [Disable Dates]({% slug howto_disable_dates_datepicker %})
* [Hide the Deafult Button]({% slug howto_hide_default_button_datepicker %})
* [Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [Restrict User Input to Min/Max Values]({% slug howto_restrict_user_input_minandmax_values_datepicker %})
* [Show Out-of-Range Dates as Disabled]({% slug howto_show_outofrange_dates_disabled_datepicker %})
* [Submit Forms on ENTER]({% slug howto_submmit_forms_onenter_datepicker %})

Articles on Kendo UI Calendar:

* [Overview]({% slug overview_kendoui_calendar_widget %})
* [Control the Header Format]({% slug howto_control_header_format_calendar %})