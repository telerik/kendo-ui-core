---
title: Localization
page_title: Localization
description: "Get started with the Telerik UI TimePicker for {{ site.framework }} and translate its messages for different culture locales."
slug: localization_timepicker_aspnetcore
position: 2
---

# Localization

The TimePicker provides options for localizing its user interface by utilizing its [`Culture`](/api/kendo.mvc.ui.fluent/timepickerbuilder#culturesystemstring) property.

To enable the desired culture, add a reference to the script file before the TimePicker is initialized and include the desired culture in the settings of the helper.

```HtmlHelper
    <script src="https://kendo.cdn.telerik.com/2019.2.619/js/cultures/kendo.culture.de-DE.min.js"></script>

    @(Html.Kendo().TimePicker()
        .Name("TimePicker")
        .Culture("de-DE")
    )
```
{% if site.core %}
```TagHelper
<script src="https://kendo.cdn.telerik.com/2019.2.619/js/cultures/kendo.culture.de-DE.min.js"></script>
<kendo-timepicker name="timePicker"
                  culture="de-DE" />
```
{% endif %}

## See Also

* [Globalization Support by the TimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker/globalization)
* [Server-Side API](/api/timepicker)
