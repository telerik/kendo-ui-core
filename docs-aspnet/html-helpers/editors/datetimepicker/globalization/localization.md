---
title: Localization
page_title: Localization
description: "Get started with the Telerik UI DateTimePicker for {{ site.framework }} and translate its messages for different culture locales."
slug: localization_datetimepicker_aspnetcore
position: 2
---
{% if site.core %}
    {% assign Culture = "/api/Kendo.Mvc.UI.Fluent/DateTimePickerBuilder#culturesystemstring" %}
{% else %}
    {% assign Culture = "/api/Kendo.Mvc.UI.Fluent/DatePickerBuilderBase#culturesystemstring" %}
{% endif %}

# Localization

The DateTimePicker provides options for localizing its user interface by utilizing its [`Culture`]({{ Culture }}) property.

To enable the desired culture, add a reference to the script file before the DateTimePicker is initialized and include the desired culture in the settings of the helper.

```
    <script src="https://kendo.cdn.telerik.com/2019.2.619/js/cultures/kendo.culture.de-DE.min.js"></script>

    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Culture("de-DE")
    )
```

## See Also

* [Globalization Support by the DateTimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/globalization)
* [Server-Side API](/api/datetimepicker)
