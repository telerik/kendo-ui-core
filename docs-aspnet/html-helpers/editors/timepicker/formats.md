---
title: Formats
page_title: Formats
description: "Get started with the Telerik UI TimePicker for {{ site.framework }} and learn how to define the time format of the HTML Helper."
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

* [Basic Usage by the TimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker)
* [Using the API of the TimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker/api)
* [Server-Side API](/api/timepicker)
