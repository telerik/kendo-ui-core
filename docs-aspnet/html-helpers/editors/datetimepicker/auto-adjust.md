---
title: Automatic Correction
page_title: Telerik UI DateTimePicker for {{ site.framework }} Documentation - Automatic Correction
description: "Get familiar with the Telerik UI DateTimePicker component for {{ site.framework }} and how to use its auto-correct feature."
components: ["datetimepicker"]
slug: htmlhelpers_datetimepicker_autocorrect_aspnetcore
position: 7
---

# Automatic Correction

Starting with Telerik UI for {{ site.framework }} R3 2024, the DateTimePicker component provides a way to disable the built-in [`AutoAdjust`](/api/kendo.mvc.ui.fluent/datetimepickerbuilder#autoadjustsystemboolean) feature.

By default, when you have `Min` and `Max` values configured, the component will auto-correct the user input if it is not in the min/max range. The auto-corrected value will be either the `Min` or the `Max` value you have set for the component.

```HtmlHelper
   @(Html.Kendo().DateTimePicker()
          .Name("datetimepicker")
          .DateInput()
          .AutoAdjust(false)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-datetimepicker name="datetimepicker" 
        auto-adjust="false" date-input="true">
    </kendo-datetimepicker>
```
{% endif %}

## See Also

* [Using the API of the DateTimePicker (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/api)

