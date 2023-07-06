---
title: Localization
page_title: Localization
description: "Get started with the Telerik UI DatePicker for {{ site.framework }} and translate its messages for different culture locales."
slug: localization_datepicker_aspnetcore
position: 2
---

# Localization

The DatePicker provides options for localizing its user interface by utilizing its [`Culture`](/api/kendo.mvc.ui.fluent/datepickerbuilder#culturesystemstring) property.

To apply the desired culture, add a reference to the script file before the DateRangePicker is initialized and include the desired culture in the settings of the helper.

```HtmlHelper
    <script src="https://kendo.cdn.telerik.com/2019.2.619/js/cultures/kendo.culture.de-DE.min.js"></script>

    @(Html.Kendo().DatePicker()
        .Name("datepicker")
        .Culture("de-DE")
    )
```
{% if site.core %}
```TagHelper
<kendo-datepicker name="datepicker"
                  culture="de-DE"/>
```
{% endif %}

## See Also

* [Server-Side API](/api/datepicker)
