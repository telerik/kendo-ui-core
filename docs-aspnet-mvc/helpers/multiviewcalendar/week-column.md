---
title:  Week Number Column 
page_title:  Week Number Column  | Kendo UI MultiViewCalendarr HtmlHelper
description: "Render a column displaying the number of the weeks within the current month view when working with the Kendo UI MultiViewCalendar."
slug: week_column_multiviewcalendar_aspnetmvc
position: 3
---

# Week Number Column

In the MultiViewCalendar, you can render a column which displays the number of the weeks within the current `month` view.

###### Example

```tab-ASPX

        <%: Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .WeekNumber(true)
        %>
```
```tab-Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .WeekNumber(true)
        )
```

## See Also

Other articles on the Kendo UI MultiViewCalendar:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiViewCalendar Widget](/aspnet-mvc/helpers/multiviewcalendar/overview)
* [MultiViewCalendar JavaScript API Reference](/api/javascript/ui/multiviewcalendar)