---
title: Start View and Selection Depth
page_title: Start View and Selection Depth | Telerik UI DateTimePicker HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI DateTimePicker for ASP.NET Core and learn how to define the start view and control the navigation depth of the HTML Helper."
slug: navdepth_datetimepicker_aspnetcore
position: 4
---

# Start View and Navigation Depth

The DateTimePicker enables you to set the initial view it renders and define the navigation depth of the views.

To define the initially rendered view, use the `Start` option. To control the navigation depth, use the `Depth` option.

The **Calendar** view supports the following predefined views:
* `Month`&mdash;Shows the days of the month.
* `Year`&mdash;Shows the months of the year.
* `Decade`&mdash;Shows the years of the decade.
* `Century`&mdash;Shows the decades of the century.

The following example demonstrates how to create a DateTimePicker that allows the user to select a month.

```
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Value(DateTime.Now)
        .Start(CalendarView.Year)
        .Depth(CalendarView.Year)
    )
```

## See Also

* [Server-Side API](/api/datetimepicker)
