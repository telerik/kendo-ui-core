---
title: Week Number Column
page_title: Week Number Column
description: "Render a column displaying the number of the weeks within the current month view when working with the Telerik UI MultiViewCalendar TagHelper."
slug: week_column_multiviewcalendar_taghelper_aspnetcore
position: 7
---

# Week Number Column

In the MultiViewCalendar, you can render a column which displays the number of the weeks within the current `month` view.

```tagHelper

    <kendo-multiviewcalendar name="multiviewcalendar" week-number="true">
    </kendo-multiviewcalendar>

```
```Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .WeekNumber(true)
        )
```

## See Also

* [Server-Side API](/api/multiviewcalendar)
