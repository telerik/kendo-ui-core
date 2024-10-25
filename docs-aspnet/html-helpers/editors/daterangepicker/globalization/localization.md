---
title: Localization
page_title: Localization
description: "Get started with the Telerik UI DateRangePicker for {{ site.framework }} and translate its messages for different culture locales."
slug: localization_daterangepicker_aspnetcore
position: 2
---

# Localization

The DateRangePicker provides options for localizing its user interface by utilizing its [`Culture`](/api/kendo.mvc.ui.fluent/daterangepickerbuilder#culturesystemstring) property.

To enable the desired culture, add a reference to the script file before the DateRangePicker is initialized and include the desired culture in the settings of the helper.

```HtmlHelper
    <script src="https://kendo.cdn.telerik.com/2019.2.619/js/cultures/kendo.culture.de-DE.min.js"></script>

        @(Html.Kendo().DateRangePicker()
            .Name("daterangepicker")
            .Culture("de-DE")
        )
```
{% if site.core %}
```TagHelper
    <script src="https://kendo.cdn.telerik.com/2019.2.619/js/cultures/kendo.culture.de-DE.min.js"></script>

    <kendo-daterangepicker name="daterangepicker" culture="de-DE">
    </kendo-daterangepicker>
```
{% endif %}

## See Also

* [Server-Side API](/api/daterangepicker)
