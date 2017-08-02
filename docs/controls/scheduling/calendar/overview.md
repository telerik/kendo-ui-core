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
* Week number option and template
* Selection
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

## Week Number

The [`weekNumber`](/api/javascript/ui/calendar#configuration-weekNumber) option allows calendar to show week number on annual base on the left side of month view as a separate column.

###### Example

```html
   <div id="calendar"></div>
   <script>
    $("#calendar").kendoCalendar({
		weekNumber: true
	});
  </script>
```

### Week Number template

The template is intended to be used for customizing the cells in "week" column. By default, the widget renders the calculated week of the year. 

 The properties available in the data object are:

 * currentDate - returns the first date of the current week.
 * weekNumber - calculated week number.

These properties can be used in the template to make additional calculations.  

###### Example

    <style>
      .italic{
        font-style: italic;
      }
    </style>
    <body>

    <div id="calendar"></div>
    <script id="week-template" type="text/x-kendo-template">
       <a class="italic">#= data.weekNumber #</a>
    </script>
    <script>
      $("#calendar").kendoCalendar({
        weekNumber: true,
        month: {
          weekNumber: $("#week-template").html()
        }
      });
    </script>

## Selection

By default user is able to select a single date from the calendar using the mouse or the keyboard. There is no configuration code required to enable single selection. Starting from Kendo UI 2017 R3 release calendar allows multiple selection to be performed by using the [`selectable`](/api/javascript/ui/calendar#configuration-selectable) configuration property. 

###### Example

```html
   <div id="calendar"></div>
   <script>
    $("#calendar").kendoCalendar({
		selectable: "multiple"
	});
  </script>
```

The multiple selection functionality of the calendar widget can be summarized in several key points:

* Multiple Selection - ctrl key is used while selecting dates. 
* Range Selection - shift key is used to select range of dates. 
* Week Selection - range selection for a specific week. 

> Check [Selection](http://demos.telerik.com/kendo-ui/calendar/selection) for a live demo.

### Multiple Selection

The Ctrl key allows user to perform multiple selection:

* Ctrl + Mouse Click on specific date will mark the date as selected and other previously selected dates will remain selected as well. 
* Selecting a date from a specific view without using Ctrl key will deselect all previously selected dates (including previously selected dates from other views/months) and select the date of the clicked cell.
* Selecting a date that is already selected while holding the Ctrl key will remove the date from the selection.


**Figure 1: Calendar with multiple dates selected**

![Calendar with multiple dates selected](/controls/scheduling/calendar/calendar1_1.png)


### Range Selection

The Shift key allows user to select a range of dates in the same month or between different months: 

* Shift + Mouse Click selects all dates between the last selected one (with SPACE or Mouse Click) and the clicked cell. 
* Shift + Mouse Click when there is no previous selection will select all dates from the beginning to the clicked cell.

**Figure 2: Calendar with range selection**

![Calendar with range selection](/controls/scheduling/calendar/calendar1_2.png)

### Week Selection

When user clicks on a specific week number the calendar selects the entire week. It can be considered as a special case of range selection - starting from first day of the week and selects all dates to the end of the week. 

**Figure 3: Calendar with week selection**

![Calendar with week selection](/controls/scheduling/calendar/calendar1_3.png)

## Keyboard Navigation

The keyboard navigation of the Calendar works by listening to the keydown events on the wrapper element of the widget. It is assumed that everything the user does is in accordance with the currently focused date cell, not the focused element of the browser.

Depending on selection type (single or multiple) the calendar will behave differently in terms of selecting and navigating with the keyboard. The next few bullets illustrate the keyboard navigation behavior when multiple selection is enabled: 

* Focus or select a date from other month will not navigate to the corresponding month - user is able to continue selecting dates from the current view. 
* Space/Enter on specific date will make a single selection (deselect all other selected dates).
* Space/Enter on specific date while user is holding the ctrl key will add the date to the current selection. If the date is already selected it will be removed from the selection. 
* Shift + Enter/Space performs a range selection - selects all dates between the last selected one (with Space/Enter or mouse click) and the one holding the focused cell. 
* Shift + Up/Down arrow - extends selection up/down one row in the month view.
* Shift + Right/Left arrow - adds the next/previous date to the current selection. 

> Check [Keyboard navigation](http://demos.telerik.com/kendo-ui/calendar/keyboard-navigation) for a live demo.

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
