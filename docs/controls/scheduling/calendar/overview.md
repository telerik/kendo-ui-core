---
title: Overview
page_title: Overview | Kendo UI Calendar
description: "Learn how to initialize the Kendo UI Calendar widget, configure its options, and make use of custom templates."
slug: overview_kendoui_calendar_widget
position: 1
---

# Calendar Overview

The [Kendo UI Calendar widget](http://demos.telerik.com/kendo-ui/calendar/index) renders a graphical calendar that provides navigation and selection functionalities.

It also supports custom templates for its `month` view and configuration options for minimum and maximum dates, a start view, and the depth of the navigation.

## Getting Started

### Initialize the Calendar

To initialize the Calendar, use a jQuery selector.

###### Example

    <div id="calendar"></div>

    <script>
        $(document).ready(function(){
            $("#calendar").kendoCalendar();
        });
    </script>

## Configuration

The Calendar provides configuration options that can be set during initialization. The available properties are:

* Selected date
* Minimum and/or maximum date
* Start view
* Navigation depth&mdash;that is, the option to define the last view to which the user can navigate.
* Day template
* Footer template

The first day of the week depends on the applied [culture]({% slug culture_definition_kendoui_globalization %}).

### Selected, Minimum, and Maximum Dates

The following example demonstrates how to create a Calendar with a selected date and a defined minimum and maximum dates.

###### Example

    <div id="calendar"></div>

    <script>
        $("#calendar").kendoCalendar({
            value: new Date(),
            min: new Date(1950, 0, 1),
            max: new Date(2049, 11, 31)
        });
    </script>

As a result, the Calendar does not navigate to a date that is earlier than the specified minimum date and also restricts the navigation to the maximum date you specified.

### Start View and Navigation Depth

To define the first rendered view, use the `start` option. To control the navigation depth, set the `depth` option.

The following views are predefined:

* `month`&mdash;Shows the days of the month.
* `year`&mdash;Shows the months of the year.
* `decade`&mdash;Shows the years of the decade.
* `century`&mdash;Shows the decades of the century.

### Create Selectable Month Calendars

The following example demonstrates how to create a Calendar that allows users to select a month.

###### Example

    <div id="calendar"></div>

    <script>
        $("#calendar").kendoCalendar({
            start: "year",
            depth: "year"
        });
    </script>

## Day Templates

The Calendar enables you to customize the rendered day for the `month` view.

### Custom Templates

The following example demonstrates how to create a Calendar by using a custom template.

###### Example

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

## Disabling Dates

The Calendar allows you to disable certain days which are not intended to be selected by the end user such as weekends, national holidays, and others.

To disable a date, either:

* Set an array, or
* Add a function.

### Set an Array

When you set an array, list the days that need to be disabled by using the first letters from their names in English.

###### Example

```html
   <div id="calendar"></div>
   <script>
    $("#calendar").kendoCalendar({
		value: new Date(),
		disableDates: ["we", "th"],
	});
  </script>
```

### Add a Function

When you add a function, determine its return value as `true` for the date that is disabled.

###### Example

```html
    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
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

Other articles on the Kendo UI Calendar:

* [How to Control the Header Format]({% slug howto_control_header_format_calendar %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Calendar Widget](/aspnet-mvc/helpers/calendar/overview)
* [Overview of the Calendar JSP Tag]({% slug overview_calendar_uiforjsp %})
* [Overview of the Calendar PHP Class](/php/widgets/calendar/overview)
* [Calendar JavaScript API Reference](/api/javascript/ui/calendar)

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

Articles on the Kendo UI TimePicker:

* [Overview of the TimePicker Widget]({% slug overview_kendoui_timepicker_widget %})
* [TimePicker JavaScript API Reference](/api/javascript/ui/timepicker)
