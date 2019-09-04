---
title: Day Template
page_title: Day Template | Telerik UI MultiViewCalendar HtmlHelper for ASP.NET MVC
description: "Customize the content of each cell by using cell templates when working with the Telerik UI MultiViewCalendar HtmlHelper for ASP.NET MVC."
slug: day_template_multiviewcalendar_aspnetmvc
position: 5
---

# Day Template

The MultiViewCalendar enables you to customize the rendered day for the `month` view.

The following example demonstrates how to create a MultiViewCalendar by using a custom template.

```ASPX

        <%: Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .MonthTemplate("<div class='custom'><#=data.value#></div>")
        %>
```
```Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .MonthTemplate("<div class='custom'><#=data.value#></div>")
        )
```

The template wraps the `value` in a `<div>` HTML element. The structure of the data object that is passed to the template function.

    data = {
        date: date, // A date object that corresponds to the current cell.
        title: kendo.toString(date, "D"),
        value: date.getDate(),
        dateString: "2011/0/1" // The formatted date by using the yyyy/MM/dd format and the month is zero-based.
    };

## See Also

* [Server-Side API](/api/multiviewcalendar))
