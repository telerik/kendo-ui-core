---
title: Formats
page_title: Formats
description: "Get started with the Telerik UI TimePicker for {{ site.framework }} and learn how to define the time format."
slug: formats_timepicker_aspnetcore
position: 5
---

# Formats

The TimePicker allows you to define its time formatting.

The following example demonstrates how to define the time format.

```HtmlHelper
    @(Html.Kendo().TimePicker()
        .Name("TimePicker")
        .Value(DateTime.Now)
        .Format("{0:hh:mm:ss tt}")
    )
```
{% if site.core %}
```TagHelper
<kendo-timepicker name="TimePicker"
                  value="DateTime.Now"
                  format="{0:hh:mm:ss tt}"/>
```
{% endif %}

The following example demonstrates how to define the interval (in minutes) between the values in the drop-down list with the time slots.

```HtmlHelper
    @(Html.Kendo().TimePicker()
        .Name("TimePicker")
        .Value(DateTime.Now)
        .Interval(15)
    )
```
{% if site.core %}
```TagHelper
<kendo-timepicker name="TimePicker"
                  value="DateTime.Now"
                  interval="15"/>
```
{% endif %}

## See Also

* [Basic Usage by the TimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker)
{% if site.core %}
* [Basic Usage of the TimePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/timepicker/tag-helper)
{% endif %}
* [Using the API of the TimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker/api)
* [Server-Side API](/api/timepicker)
