---
title: Week Numbers
page_title: Week Numbers
description: "Define the first rendered view when working with the Telerik UI Calendar TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: weeknumbers_calendar_aspnetcore
position: 4
---

# Week Numbers

You can configure the Calendar to display the week number and also use the week number template to customize the cells in the **Week** column.

## Rendering of Week Numbers

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

## Customizing Week Column Cells

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

## See Also

* [Server-Side API](/api/calendar)
