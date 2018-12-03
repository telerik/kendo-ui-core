---
title: Overview
page_title: Calendar | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Calendar tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/tag-helpers/calendar
slug: taghelpers_calendar_aspnetcore
position: 1
---

# Calendar Tag Helper Overview

The Calendar tag helper helps you configure the Kendo UI Calendar widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Calendar by using the Calendar tag helper.

```tagHelper

    <kendo-calendar name="calendar" >
    </kendo-calendar>

```
```cshtml

    @(Html.Kendo().Calendar()
        .Name("calendar"))

```

## Configuration

The Calendar provides configuration options that can be set during initialization.

The available properties are:

* Selected date
* Minimum and/or maximum date
* Start view
* Week numbers
* Selection
* Navigation depth&mdash;that is, the option to define the last view to which the user can navigate.
* Day template
* Footer template

### Selected, Minimum, and Maximum Dates

The following example demonstrates how to create a Calendar with a selected date and a defined minimum and maximum dates. As a result, the Calendar does not navigate to a date that is earlier than the specified minimum date and also restricts the navigation to the maximum date you specified.

```tagHelper

    <kendo-calendar name="calendar"
                    value="DateTime.Now"
                    min="new DateTime(1950,1,2)"
                    max="new DateTime(2049,12,31)">
    </kendo-calendar>

```
```cshtml

   @(Html.Kendo().Calendar()
            .Name("calendar")
            .Value(DateTime.Now)
            .Min(new DateTime(1950, 1, 2))
            .Max(new DateTime(2049, 12, 31)))

```

### Start View and Navigation Depth

To define the first rendered view, use the `start` option. To control the navigation depth, set the `depth` option.

The following views are predefined:

* `month`&mdash;Shows the days of the month.
* `year`&mdash;Shows the months of the year.
* `decade`&mdash;Shows the years of the decade.
* `century`&mdash;Shows the decades of the century.

## Day Templates

The Calendar enables you to customize the rendered day for the `month` view.

The following example demonstrates how to create a Calendar by using a custom template.

```tagHelper

    <kendo-calendar name="calendar">
        <month content="<div class='custom'><#=data.value#></div>"/>
    </kendo-calendar>

```
```cshtml

    @(Html.Kendo().Calendar()
                .Name("calendar")
                .MonthTemplate(x=> x.Content("<div class='custom'><#=data.value#></div>")))

```

The template wraps the `value` in a `<div>` HTML element. The structure of the `data` object that is passed to the template function:

```
    data = {
        date: date, // Date object corresponding to the current cell
        title: kendo.toString(date, "D"),
        value: date.getDate(),
        dateString: "2011/0/1" // formatted date using yyyy/MM/dd format and month is zero-based
    };
```

## Week Numbers

You can configure the Calendar to display the week number and also use the week number template to customize the cells in the **Week** column.

### Rendering of Week Numbers

The `weekNumber` option enables the Calendar to display the week number on an annual base to the left side of month view and as a separate column.

```tagHelper

    <kendo-calendar week-number="true" name="calendar">
    </kendo-calendar>

```
```cshtml

    @(Html.Kendo().Calendar()
                .Name("calendar")
                .WeekNumber(true)))

```

### Customizing Week Column Cells

The week-number template intends to customize the cells in the **Week** column. By default, the widget renders the calculated week of the year.

 The available properties in the `data` object are:

* `currentDate`&mdash;Returns the first date of the current week.
* `weekNumber`&mdash;The calculated week number.

You can use these properties in the template to make additional calculations.

```tagHelper

    <kendo-calendar week-number="true" name="calendar">
        <month week-number="<i>#= data.weekNumber #</i>" />
    </kendo-calendar>

```
```cshtml

    @(Html.Kendo().Calendar()
        .Name("calendar")
        .WeekNumber()
        .MonthTemplate(x=> x.WeekNumber("<i>#= data.weekNumber #</i>"))
        )

```

## Selection

The Calendar enables the user to make a single, multiple, and range date selections, as well as week selections. For a runnable example on multiple selection, refer to [this demo](http://demos.telerik.com/kendo-ui/calendar/selection).

### Single Date Selection

By default, the user can select a single date from the Calendar by using the mouse or the keyboard and you do not need to make additional configuration to enable the single date selection.

### Multiple Date Selection

As of the Kendo UI 2017 R3 release, the Calendar allows you to implement the multiple date selection by using the `selectable` configuration property.

To perform the multiple date selection, the user can also use the keyboard:

* `Ctrl` + mouse click on specific date marks the date as selected and other previously selected dates remain selected as well.
* The selection of a date from a specific view without utilizing the `Ctrl` key, deselects all previously selected dates&mdash;including the previously selected dates from other views or months, and selects the date of the clicked cell.
* The selection of a date that is already selected while holding the `Ctrl` key removes the date from the selection.

```tagHelper

    <kendo-calendar selectable="multiple" name="calendar">
    </kendo-calendar>

```
```cshtml

    @(Html.Kendo().Calendar()
        .Name("calendar")
        .Selectable("multiple")
        )

```

### Range Date Selection

The Calendar enables the range date selection over the keyboard. The usage of the `Shift` key allows the user to select a range of dates in the same month or across different months:

* To select all dates between the most recently selected one (with `Space` or mouse click) and the clicked cell, press `Shift` and click with the mouse.
* If no previous selection was made, `Shift` and a mouse click select all dates from the beginning to the clicked cell.

### Week Selection

When the user clicks on a specific week number, the Calendar selects the entire week. The week selection functionality is a special case of range selection which starts from the first day of the week and selects all dates to the end of the week.

## Disabling Dates

The Calendar allows you to disable certain days which are not intended to be selected by the end user such as weekends, national holidays, and others.

To disable a date, either:

* Set an array, or
* Add a function.

### Setting an Array

When you set an array, list the days that need to be disabled by using the first letters from their names in English.

```tagHelper

    <kendo-calendar disable-dates="new DateTime[] { DateTime.Now.AddDays(2), DateTime.Now.AddDays(2) }" value="DateTime.Now" name="calendar">
    </kendo-calendar>

```
```cshtml

    @(Html.Kendo().Calendar()
        .Name("calendar")
        .Value(DateTime.Now)
        .DisableDates(new[] {DayOfWeek.Monday })
        )

```

### Adding a Function

When you add a function, determine its return value as `true` for the date that is disabled.

```
    <div class="demo-section k-content" style="text-align: center;">
        <kendo-calendar disable-dates-handler="disabledDatesHandler" value="DateTime.Now" name="calendar">
        </kendo-calendar>
    </div>

    <script>
        function disabledDatesHandler(date) {
            var disabled = [13, 14, 20, 21];
            if (date && disabled.indexOf(date.getDate()) > -1) {
                return true;
            } else {
                return false;
            }
        }
    </script>
```

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

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
