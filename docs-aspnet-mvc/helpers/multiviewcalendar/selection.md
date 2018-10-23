---
title: Selection 
page_title: Selection  | Kendo UI MultiViewCalendarr HtmlHelper
description: "Learn how to select dates in the Kendo UI MultiViewCalendar widget."
slug: selection_multiviewcalendar_aspnetmvc
position: 4
---

# Selection

The Kendo UI MultiViewCalendar allows the user to select multiple dates or a range of dates using different selection modes offered by the widget.

### Multiple selection

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
            .Selectable("range")
        )
```

## See Also

Other articles on the Kendo UI MultiViewCalendar:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiViewCalendar Widget](/aspnet-mvc/helpers/multiviewcalendar/overview)
* [MultiViewCalendar JavaScript API Reference](/api/javascript/ui/multiviewcalendar)