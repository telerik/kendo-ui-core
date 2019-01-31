---
title: Selection
page_title: Selection  | Kendo UI MultiViewCalendar HtmlHelper for ASP.NET MVC
description: "Learn how to select dates in the Kendo UI MultiViewCalendar widget."
slug: selection_multiviewcalendar_aspnetmvc
position: 4
---

# Selection

The Kendo UI MultiViewCalendar allows the user to select multiple dates by using the multiple-view MultiViewCalendar selection mode.

###### Example

```ASPX

        <%: Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .Selectable("multiple")
        %>
```
```Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .Selectable("range")
        )
```

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiViewCalendar Widget](/helpers/multiviewcalendar/overview)
* [MultiViewCalendar JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar)
