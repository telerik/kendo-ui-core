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
* Week numbers
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

### Selectable Month Calendars

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

## Week Numbers

You can configure the Calendar to display the week number and also use the week number template to customize the cells in the **Week** column.

### Rendering of Week Numbers

The [`weekNumber`](/api/javascript/ui/calendar/configuration/weeknumber) option enables the Calendar to display the week number on an annual base to the left side of month view and as a separate column.

###### Example

```dojo
   <div id="calendar"></div>
   <script>
    $("#calendar").kendoCalendar({
		weekNumber: true
	});
  </script>
```

### Customizing Week Column Cells

The week-number template intends to customize the cells in the **Week** column. By default, the widget renders the calculated week of the year.

 The available properties in the `data` object are:

* `currentDate`&mdash;Returns the first date of the current week.
* `weekNumber`&mdash;The calculated week number.

You can use these properties in the template to make additional calculations.

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

The Calendar enables the user to make a single, multiple, and range date selections, as well as week selections. For a runnable example on multiple selection, refer to [this demo](http://demos.telerik.com/kendo-ui/calendar/selection).

### Single Date Selection

By default, the user can select a single date from the Calendar by using the mouse or the keyboard and you do not need to make additional configuration to enable the single date selection.

### Multiple Date Selection

As of the Kendo UI 2017 R3 release, the Calendar allows you to implement the multiple date selection by using the [`selectable`](/api/javascript/ui/calendar/configuration/selectable) configuration property.

###### Example

```dojo
   <div id="calendar"></div>
   <script>
    $("#calendar").kendoCalendar({
		selectable: "multiple"
	});
  </script>
```

To perform the multiple date selection, the user can also use the keyboard:

* `Ctrl` + mouse click on specific date marks the date as selected and other previously selected dates remain selected as well.
* The selection of a date from a specific view without utilizing the `Ctrl` key, deselects all previously selected dates&mdash;including the previously selected dates from other views or months, and selects the date of the clicked cell.
* The selection of a date that is already selected while holding the `Ctrl` key removes the date from the selection.

**Figure 1: Calendar with multiple date selection**

![Calendar with multiple dates selected](calendar1_1.png)

### Range Date Selection

The Calendar enables the range date selection over the keyboard. The usage of the `Shift` key allows the user to select a range of dates in the same month or across different months:

* To select all dates between the most recently selected one (with `Space` or mouse click) and the clicked cell, press `Shift` and click with the mouse.
* If no previous selection was made, `Shift` and a mouse click select all dates from the beginning to the clicked cell.

**Figure 2: Calendar with range selection**

![Calendar with range selection](calendar1_2.png)

### Week Selection

When the user clicks on a specific week number, the Calendar selects the entire week. The week selection functionality is a special case of range selection which starts from the first day of the week and selects all dates to the end of the week.

**Figure 3: Calendar with week selection**

![Calendar with week selection](calendar1_3.png)

## Keyboard Navigation

The keyboard navigation of the Calendar works by listening to the key-down events on the wrapper element of the widget. The logic assumes that everything the user does is in accordance with the currently focused date cell and not the focused element of the browser.

Depending on selection type (single or multiple), the Calendar behaves differently in terms of selecting and navigating with the keyboard. When the user applies the multiple date selection, the Calendar demonstrates the following keyboard navigation behavior:

* The focusing or selection of a date from another month does not navigate to the corresponding month. The user is able to continue the selection of dates from the current view.
* The pressing of `Space` or `Enter` on a specific date makes a single selection by deselecting all other selected dates.
* The pressing of `Space` or `Enter` on a specific date while the user is holding the `Ctrl` key adds the date to the current selection. If the date is already selected, it is removed from the selection.
* The pressing of `Shift` + `Enter` or `Space` performs a range selection. It selects all dates between the most recently selected date (with `Space` or `Enter` or a mouse click) and the date that holds the focused cell.
* The pressing of `Shift` + `Up Arrow` or `Down Arrow` extends the selection up or down one row in the month view respectively.
* The pressing of `Shift` + `Right Arrow` or `Left Arrow` adds the next or previous date to the current selection respectively.

For a runnable example on performing date selection over the keyboard, refer to [this demo](http://demos.telerik.com/kendo-ui/calendar/keyboard-navigation).

## Disabling Dates

The Calendar allows you to disable certain days which are not intended to be selected by the end user such as weekends, national holidays, and others.

To disable a date, either:

* Set an array, or
* Add a function.

### Set an Array

When you set an array, list the days that need to be disabled by using the first letters from their names in English.

###### Example

```dojo
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

```dojo
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
