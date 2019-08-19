---
title: Date and Time Formatting
page_title: Date and Time Formatting | Telerik UI DateTimePicker HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI DateTimePicker for ASP.NET Core and learn how to define the date and time format of the HTML Helper."
slug: datetimeformatting_datetimepicker_aspnetcore
position: 6
---

# Date and Time Formatting

The DateTimePicker allows you to define its date and time formatting.

## Date and Time Format

The following example demonstrates how to define the date-time format.

```
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Value(DateTime.Now)
        .Format("{0:dd/MM/yyyy hh:mm tt}")
    )
```

## Time Format

The following example demonstrates how to define the time format.

```
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Value(DateTime.Now)
        .TimeFormat("hh:mm:ss tt") // This format will be used to format the predefined values in the time list.
    )
```

## Intervals

The following example demonstrates how to define the interval (in minutes) between values in the drop-down list with time slots.

```
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Value(DateTime.Now)
        .Interval(15)
    )
```

## See Also

* [API Reference of the DateTimePicker HtmlHelper for ASP.NET Core](/api/datetimepicker)
