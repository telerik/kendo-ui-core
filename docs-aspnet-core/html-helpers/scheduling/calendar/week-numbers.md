---
title: Week Numbers
page_title: Week Numbers | Telerik UI Calendar HtmlHelper for ASP.NET Core
description: "Define the first rendered view when working with the Telerik UI Calendar HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_weeknumbers_calendar_aspnetcore
position: 4
---

# Week Numbers

You can configure the Calendar to display the week number and also use the week number template to customize the cells in the **Week** column.

## Rendering of Week Numbers

The `weekNumber` option enables the Calendar to display the week number on an annual base to the left side of month view and as a separate column.

```

    @(Html.Kendo().Calendar()
                .Name("calendar")
                .WeekNumber(true)))
```

## Customizing Week Column Cells

The week-number template intends to customize the cells in the **Week** column. By default, the Calendar renders the calculated week of the year.

The Calendar provides the following properties in the `data` object:

* `currentDate`&mdash;Returns the first date of the current week.
* `weekNumber`&mdash;The calculated week number.

You can use these properties in the template to make additional calculations.

```

    @(Html.Kendo().Calendar()
        .Name("calendar")
        .WeekNumber()
        .MonthTemplate(x=> x.WeekNumber("<i>#= data.weekNumber #</i>"))
        )
```

## See Also

* [Rendering the Week Column in the Calendar HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/calendar/week-column)
* [Server-Side API](/api/calendar)
