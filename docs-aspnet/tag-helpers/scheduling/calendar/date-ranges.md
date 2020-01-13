---
title: Date Ranges
page_title: Date Ranges
description: "Configure the minimum and maximum dates when working with the Telerik UI Calendar TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: dateranges_calendar_aspnetcore
position: 2
---

# Date Ranges

The following example demonstrates how to create a Calendar with a selected date and a defined minimum and maximum dates.

As a result, the Calendar does not navigate to a date that is earlier than the specified minimum date and also restricts the navigation to the maximum date you specified.

```tagHelper

    <kendo-calendar name="calendar"
                    value="DateTime.Now"
                    min="new DateTime(1950,1,2)"
                    max="new DateTime(2049,12,31)">
    </kendo-calendar>

```
```cshtml

   @(Html.Kendo().Calendar()
            .Name("calendar")
            .Value(DateTime.Now)
            .Min(new DateTime(1950, 1, 2))
            .Max(new DateTime(2049, 12, 31)))

```

## See Also

* [Server-Side API](/api/calendar)
