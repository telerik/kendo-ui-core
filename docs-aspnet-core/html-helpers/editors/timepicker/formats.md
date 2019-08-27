---
title: Formats
page_title: Formats | Telerik UI TimePicker HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI TimePicker for ASP.NET Core and learn how to define the time format of the HTML Helper."
slug: formats_timepicker_aspnetcore
position: 4
---

# Formats

The TimePicker allows you to define its time formatting.

The following example demonstrates how to define the time format.

```
    @(Html.Kendo().TimePicker()
        .Name("TimePicker")
        .Value(DateTime.Now)
        .Format("{0:hh:mm:ss tt}")
    )
```

The following example demonstrates how to define the interval (in minutes) between the values in the drop-down list with the time slots.

```
    @(Html.Kendo().TimePicker()
        .Name("TimePicker")
        .Value(DateTime.Now)
        .Interval(15)
    )
```

## See Also

* [Basic Usage by the TimePicker HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/timepicker)
* [Using the API of the TimePicker HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/timepicker/api)
* [Server-Side API](/api/timepicker)
