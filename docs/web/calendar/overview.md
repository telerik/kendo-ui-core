---
title: Overview
page_title: Overview | Kendo UI Calendar Widget
description: "Learn how to initialize the Kendo UI Calendar widget, configure its options and make use of custom templates."
slug: overview_kendoui_calendar_widget
position: 1
---

# Calendar Overview

[Kendo UI Calendar widget](http://demos.telerik.com/kendo-ui/calendar/index) renders a graphical calendar that supports navigation and selection. It also supports custom templates for its `month` view and configuration options for minimum and maximum dates, a start view and the depth of the navigation.

## Getting Started

### Initialize the Calendar 

Initialize the Calendar by using a jQuery selector:
    
    <div id="calendar"></div>
    
    <script>
        $(document).ready(function(){
            $("#calendar").kendoCalendar();
        });
    </script>


## Configuration

The Calendar provides many configuration options that can be set during initialization. Among the properties you can control are:

*   Selected date
*   Minimum and/or maximum date
*   Start view
*   Navigation depth (i.e., define the last view to which the user can navigate)
*   Day template
*   Footer template
    
### Define Selected, Min, and Max Dates

Create a Calendar with a selected date and a defined minimum and maximum dates in the following way:
    
    <div id="calendar"></div>
    
    <script>
        $("#calendar").kendoCalendar({
            value: new Date(),
            min: new Date(1950, 0, 1),
            max: new Date(2049, 11, 31)
        });
    </script>

As a result, the Calendar does not navigate before the specified minimum date and also restricts the navigation to the maximum date you specified.

### Define the Start View and Navigation Depth

Define the first rendered view with the `start` option. Control the navigation depth with the `depth` option. The following views are predefined:

*   `month` - shows the days of the month
*   `year` - shows the months of the year
*   `decade` - shows the years of the decade
*   `century` - shows the decades of the century

### Create a Selectable Month Calendar 

Create a Calendar that allows users to select a month in the following way:
    
    <div id="calendar"></div>
    
    <script>
        $("#calendar").kendoCalendar({
            start: "year",
            depth: "year"
        });
    </script>

## Customize Day Templates

Kendo UI Calendar allows rendered day customization for the `month` view.

### Custom Tamplates

Create a Calendar by using a custom template in the following way:
    
    <div id="calendar"></div>
    
    <script>
        $("#calendar").kendoCalendar({
            month: {
                content: '<div class="custom"><#=data.value#></div>'
            }
        });
    </script>
 
The template wraps the `value` in a `<div>` HTML element. The structure of the data object that is passed to the template function:

    data = {
        date: date, // Date object corresponding to the current cell
        title: kendo.toString(date, "D"),
        value: date.getDate(),
        dateString: "2011/0/1" // formatted date using yyyy/MM/dd format and month is zero-based
    };

## See Also

Other articles on Kendo UI Calendar:

* [How to Control the Header Format]({% slug howto_control_header_format_calendar %})
* [Overview of the ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/calendar/overview)
* [Overview of the JSP Tag](/jsp/tags/calendar/overview)
* [Overview of the PHP Class](/php/widgets/calendar/overview)
* [JavaScript API Reference](/api/javascript/ui/calendar)

Articles on Kendo UI DatePicker:

* [Overview]({% slug overview_kendoui_datepicker_widget %})
* [How to Disable Dates]({% slug howto_disable_dates_datepicker %})
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [JavaScript API Reference](/api/javascript/ui/datepicker)

Articles on Kendo UI DateTimePicker:

* [Overview]({% slug overview_kendoui_datetimepicker_widget %})
* [How to Prevent Invalid Values]({% slug howto_prevent_invalid_values_datetimepicker %})
* [How to Validate Custom Dates]({% slug howto_validate_custom_dates_datetimepicker %})
* [How to Limit Navigation to Months]({% slug howto_limit_navigation_tomonths_datetimepicker %})
* [How to Override Hours in the Popup]({% slug howto_override_hours_inpopup_datetimepicker %})
* [JavaScript API Reference](/api/javascript/ui/datetimepicker)
