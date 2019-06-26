---
title: Active View
page_title: Active View | Kendo UI MultiViewCalendar HtmlHelper for ASP.NET Core
description: "Define the first view that the Kendo UI MultiViewCalendar initially renders."
slug: active_view_multiviewcalendar_htmlhelper_aspnetcore
position: 2
---

# Active View

To define the first view which the MultiViewCalendar initially renders, use the `Start` option.

To control the navigation depth, set the `Depth` option.

The MultiViewCalendar supports the following predefined views:
* `month`&mdash;Shows the days of the month.
* `year`&mdash;Shows the months of the year.
* `decade`&mdash;Shows the years of the decade.
* `century`&mdash;Shows the decades of the century.

## Selectable Month Calendars

The following example demonstrates how to create a MultiViewCalendar that allows users to select a month.

```Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .Start(CalendarView.Year)
            .Depth(CalendarView.Year)
        )
```

## See Also

* [JavaScript API Reference of the MultiViewCalendar](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar)
