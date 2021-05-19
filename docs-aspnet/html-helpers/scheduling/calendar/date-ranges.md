---
title: Date Ranges
page_title: Date Ranges
description: "Configure the minimum and maximum dates when working with the Telerik UI Calendar HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_dateranges_calendar_aspnetcore
position: 2
---

# Date Ranges

You can create a Calendar with a selected date and define a minimum and a maximum date.

As a result, the Calendar does not navigate to a date that is earlier than the specified minimum date and also restricts the navigation up to the maximum date you specified.

```

   @(Html.Kendo().Calendar()
            .Name("calendar")
            .Value(DateTime.Now)
            .Min(new DateTime(1950, 1, 2))
            .Max(new DateTime(2049, 12, 31)))

```

## See Also

* [Server-Side API](/api/calendar)
