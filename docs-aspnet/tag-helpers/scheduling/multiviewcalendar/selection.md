---
title: Selection
page_title: Selection
description: "Learn how to select dates in the Telerik UI MultiViewCalendar TagHelper for ASP.NET Core."
slug: selection_multiviewcalendar_taghelper_aspnetcore
position: 4
---

# Selection

The Kendo UI MultiViewCalendar allows the user to select multiple dates by using the multiple-view MultiViewCalendar selection mode.

```tagHelper

    <kendo-multiviewcalendar name="multiviewcalendar" selectable="range">        
    </kendo-multiviewcalendar>

```
```Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .Selectable("range")
        )
```

## See Also

* [Server-Side API](/api/multiviewcalendar)
