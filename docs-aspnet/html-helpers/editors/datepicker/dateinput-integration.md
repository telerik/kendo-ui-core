---
title: DateInput Integration
page_title: DateInput Integration
description: "Get started with the {{ site.product }} DatePicker and learn how to integrate it with the {{ site.product }} DateInput."
slug: htmlhelpers_datepicker_aspnetcore_dateinputintegration
position: 8
---
{% if site.core %}
    {% assign DateInput = "/api/Kendo.Mvc.UI.Fluent/DatePickerBuilder#dateinputsystemboolean" %}
{% else %}
    {% assign DateInput = "/api/Kendo.Mvc.UI.Fluent/DatePickerBuilderBase#dateinputsystemboolean" %}
{% endif %}

# DateInput Integration

The DatePicker provides integration options with the [{{ site.product }} DateInput]({% slug htmlhelpers_dateinput_aspnetcore %}) for the input element it renders.

To use the DateInput as the input element in a DatePicker, enable the [`DateInput`]({{ DateInput }}) property of the DatePicker.

```Razor
    @(Html.Kendo().DatePicker()
        .Name("datepicker")
        .DateInput()
        .Value("10/10/2019")
    )
```

## See Also

* [Basic Usage of the DatePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datepicker/index)
* [Server-Side API](/api/datepicker)
