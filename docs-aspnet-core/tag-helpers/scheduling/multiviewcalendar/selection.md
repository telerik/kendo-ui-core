---
title: Selection
page_title: Selection | Kendo UI MultiViewCalendar Tag for ASP.NET Core
description: "Learn how to select dates in the Kendo UI MultiViewCalendar widget."
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

* [JavaScript API Reference of the MultiViewCalendar](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar)
