---
title: Week Number Column
page_title: Week Number Column | Kendo UI MultiViewCalendar Tag for ASP.NET Core
description: "Render a column displaying the number of the weeks within the current month view when working with the Kendo UI MultiViewCalendar."
slug: week_column_multiviewcalendar_taghelper_aspnetcore
position: 7
---

# Week Number Column

In the MultiViewCalendar, you can render a column which displays the number of the weeks within the current `month` view.

###### Example

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

Other articles on the Kendo UI MultiViewCalendar:

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
