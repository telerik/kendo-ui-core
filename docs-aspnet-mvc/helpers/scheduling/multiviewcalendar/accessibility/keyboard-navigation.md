---
title: Keyboard Navigation
page_title: Keyboard Navigation | Telerik UI MultiViewCalendar HtmlHelper for ASP.NET MVC
description: "Use the Telerik UI MultiViewCalendar keyboard navigation."
slug: keyboard_navigation_multiviewcalendar_aspnetmvc
position: 2
---


# Keyboard Navigation

The keyboard navigation of the MultiViewCalendar is always available.

The MultiViewCalendar supports the following keyboard shortcuts:

| Shortcut            | Description                                  |
|:---                 |:---                                          |
| `Up Arrow`          | Highlights the same day from the previous week.  |
| `Down Arrow`        | Highlights the same day from the next week.      |
| `Left Arrow`        | Highlights the previous day.                     |
| `Right Arrow`       | Highlights the next day.                         |
| `Enter`             | Selects the focused date.                    |
| `Home`              | Focuses the first date in the month.         |
| `End`               | Focuses the last date in the month.          |
| `Ctrl`+`Up Arrow`   | Navigates to the previous view.                  |
| `Ctrl`+`Down Arrow` | Navigates to the next view.                      |
| `Ctrl`+`Down Left`  | Navigates to the previous month.                 |
| `Ctrl`+`Down Right` | Navigates to the next month.                     |


```ASPX

        <%: Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .Selectable("multiple")
        %>
```
```Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .Selectable("multiple")
        )
```

## See Also

* [Keyboard Navigation by the MultiViewCalendar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multiviewcalendar/keyboard-navigation)
* [Accessibility in Telerik UI for ASP.NET MVC]({% slug overview_accessibility %})
