---
title: Selection
page_title: Selection
description: "Enable the single, multiple, range-date, and week selections when working with the Telerik UI Calendar TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: selection_calendar_aspnetcore
position: 5
---

# Selection

The Calendar enables the user to make a single, multiple, range-date, and week selections.

For a runnable example on multiple selection, refer to [this demo](https://demos.telerik.com/kendo-ui/calendar/selection).

## Single Date Selection

By default, the user can select a single date from the Calendar by using the mouse or the keyboard and you do not need to make additional configuration to enable the single date selection.

## Multiple Date Selection

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

## Range Date Selection

The Calendar enables the range date selection over the keyboard. The usage of the `Shift` key allows the user to select a range of dates in the same month or across different months:

* To select all dates between the most recently selected one (with `Space` or mouse click) and the clicked cell, press `Shift` and click with the mouse.
* If no previous selection was made, `Shift` and a mouse click select all dates from the beginning to the clicked cell.

## Week Selection

When the user clicks on a specific week number, the Calendar selects the entire week. The week selection functionality is a special case of range selection which starts from the first day of the week and selects all dates to the end of the week.

## See Also

* [Server-Side API](/api/calendar)
