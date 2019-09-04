---
title: Selection
page_title: Selection  | Telerik UI MultiViewCalendar HtmlHelper for ASP.NET MVC
description: "Learn how to select dates in the Telerik UI MultiViewCalendar HtmlHelper for ASP.NET MVC."
slug: selection_multiviewcalendar_aspnetmvc
position: 4
---

# Selection

The Telerik UI MultiViewCalendar allows the user to select multiple dates by using the multiple-view MultiViewCalendar selection mode.

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

* [Selection in the MultiViewCalendar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multiviewcalendar/selection)
* [Server-Side API](/api/multiviewcalendar)
