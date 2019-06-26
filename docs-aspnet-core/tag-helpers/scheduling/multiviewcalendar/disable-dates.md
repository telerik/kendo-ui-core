---
title: Disabled Dates
page_title: Disabled Dates | Kendo UI MultiViewCalendar Tag for ASP.NET Core
description: "Learn how to disable dates in the Kendo UI MultiViewCalendar widget."
slug: disabled_dates_multiviewcalendar_taghelper_aspnetcore
position: 6
---

# Disabled Dates

The MultiViewCalendar allows you to disable certain days which are not intended to be selected by the end user such as weekends, national holidays, and others.

To disable a date set an array of the dates that have to be disabled and list the days that need to be disabled by using the first letters from their names in English.

```tagHelper

    <kendo-multiviewcalendar name="multiviewcalendar" disable-dates="new DateTime[] { DateTime.Now }">
    </kendo-multiviewcalendar>

```
```Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .DisableDates(new[] {"we", "th" })
        )
```

## See Also

* [JavaScript API Reference of the MultiViewCalendar](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar)
