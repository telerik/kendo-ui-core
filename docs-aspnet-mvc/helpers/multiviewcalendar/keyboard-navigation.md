---
title: Keyboard Navigation
page_title:  Keyboard Navigation | Kendo UI MultiViewCalendarr HtmlHelper
description: "Use the Kendo UI MultiViewCalendar keyboard navigation."
slug: keyboard_navigation_multiviewcalendar_aspnetmvc
position: 8
---


# Keyboard Navigation

The keyboard navigation of the MultiViewCalendar is always available.

The MultiViewCalendar supports the following keyboard shortcuts:

| Shortcut            | Description                                  |
|:---                 |:---                                          |
| `Up Arrow`          | Highlights same day from the previous week.  |
| `Down Arrow`        | Highlights same day from the next week.      |
| `Left Arrow`        | Highlights previous day.                     |
| `Right Arrow`       | Highlights next day.                         |
| `Enter`             | Selects the focused date.                    |
| `Home`              | Focuses the first date in the month.         |
| `End`               | Focuses the last date in the month.          |
| `Ctrl`+`Up Arrow`   | Navigates to previous view.                  |
| `Ctrl`+`Down Arrow` | Navigates to next view.                      |
| `Ctrl`+`Down Left`  | navigates to previous month.                 |
| `Ctrl`+`Down Right` | navigates to next month.                     |


###### Example

```tab-ASPX

        <%: Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .Selectable("multiple")
        %>
```
```tab-Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .Selectable("multiple")
        )
```

## See Also

Other articles on the Kendo UI MultiViewCalendar:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiViewCalendar Widget](/helpers/multiviewcalendar/overview)
* [MultiViewCalendar JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar)