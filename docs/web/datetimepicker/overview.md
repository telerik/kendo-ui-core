---
title: Overview
page_title: Overview | Kendo UI DateTimePicker Widget
description: "Learn how to initialize the Kendo UI DateTimePicker widget, configure its options and define the interval between values int he time drop-down list."
slug: overview_kendoui_datetimepicker_widget
position: 1
---

# DateTimePicker Overview

[Kendo UI DateTimePicker widget](http://demos.telerik.com/kendo-ui/datetimepicker/index) allows the user to select a value from a calendar or a time drop-down list as well as direct input. It supports configurable options for minimum and maximum value, format, interval between predefined hours in the time view, custom templates for "month" view of the calendar, start view and the depth of the navigation.

## Getting Started

### Initialize the DateTimePicker
    
    <input id="dateTimePicker"> 

    <script>
      $(document).ready(function(){
        $("#dateTimePicker").kendoDateTimePicker();
      });
    </script>

> **Important**  
> The widget copies any styles and CSS classes from the input element to the wrapper element.

## Configuration

The DateTimePicker provides many configuration options that can be set during initialization. Among the properties you can control are:

* Selected date
* Minimum and/or maximum date and time
* Format definition
* Start view
* Navigation depth (i.e., define the last view to which the user can navigate)
* Interval definition between predefined values in the time drop-down list 

### Define Selected, Min, and Max Datetime

    <input id="dateTimePicker"> 

    <script>
        $(document).ready(function(){
            $("#dateTimePicker").kendoDateTimePicker({
                value: new Date(2000, 10, 10, 10, 0, 0),
                min: new Date(1950, 0, 1, 8, 0, 0),
                max: new Date(2049, 11, 31, 18, 0, 0)
            })
        });
    </script>

The DateTimePicker will set the value only if the entered datetime is valid and within the defined range.

### Define the Format

    <input id="dateTimePicker"> 

    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            format: "MM/dd/yyyy hh:mm tt" //format is used to format the value of the widget and to parse the input.
        });
    </script>

The DateTimePicker value is parsed when the user changes the content via typing. This means that if, for example, the format contains only a time portion, the date will be reset to today. To support such a DateTimePicker format, you should make the widget textbox read-only after the widget is initialized and not via the widget's `readonly()` method. Otherwise the **Date** and **Time** pop-ups will be disabled.
    
    <input id="dateTimePicker"> 

    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            /*...*/
        }).attr("readonly", "readonly");
    </script>

### Define the Time Format
    
    <input id="dateTimePicker"> 
    
    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            timeFormat: "hh:mm:ss tt" //this format will be used to format the predefined values in the time list.
        });
    </script>     

### Define the Start View and Navigation Depth

Define the first rendered view with the `start` option. Control the navigation depth with the `depth` option. The following views are predefined:

*   `month` - shows the days of the month
*   `year` - shows the months of the year
*   `decade` - shows the years of the decade
*   `century` - shows the decades of the century

### Create a Selectable Month DateTimePicker

    <input id="dateTimePicker"> 
    
    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            start: "year",
            depth: "year"
        });
    </script>

### Define Intervals

Define the interval (in minutes) between values in the time drop-down list in the following way:
    
    <input id="dateTimePicker"> 
    
    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            interval: 15
        })
    </script>

## See Also

Other articles on Kendo UI DateTimePicker:

* [How to Prevent Invalid Values]({% slug howto_prevent_invalid_values_datetimepicker %})
* [How to Validate Custom Dates]({% slug howto_validate_custom_dates_datetimepicker %})
* [How to Limit Navigation to Months]({% slug howto_limit_navigation_tomonths_datetimepicker %})
* [How to Override Hours in the Popup]({% slug howto_override_hours_inpopup_datetimepicker %})
* [Overview of the ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/datetimepicker/overview)
* [Overview of the JSP Tag](/jsp/tags/datetimepicker/overview)
* [Overview of the PHP Class](/php/widgets/datetimepicker/overview)
* [JavaScript API Reference](/api/javascript/ui/datetimepicker)

Articles on Kendo UI Calendar:

* [Overview]({% slug overview_kendoui_calendar_widget %})
* [How to Control the Header Format]({% slug howto_control_header_format_calendar %})
* [JavaScript API Reference](/api/javascript/ui/calendar)

Articles on Kendo UI DatePicker:

* [Overview]({% slug overview_kendoui_datepicker_widget %})
* [How to Disable Dates]({% slug howto_disable_dates_datepicker %})
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [JavaScript API Reference](/api/javascript/ui/datepicker)