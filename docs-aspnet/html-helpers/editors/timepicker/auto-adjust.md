---
title: Automatic Correction
page_title: Telerik UI TimePicker for {{ site.framework }} Documentation - Automatic Correction
description: "Get familiar with the Telerik UI TimePicker component for {{ site.framework }} and how to use its auto-correct feature."
slug: htmlhelpers_timepicker_autocorrect_aspnetcore
position: 7
---

# Automatic Correction

Starting with Telerik UI for {{ site.framework }} R3 2024, the TimePicker component provides a way to disable the built-in [`AutoAdjust`](/api/javascript/ui/dateinput/configuration/autoadjust) feature.

By default, when you have `Min` and `Max` values configured, the component will auto-correct the user input if it is not in the min/max range. The auto-corrected value will be either the `Min` or the `Max` value you have set for the component.

```HtmlHelper
   @(Html.Kendo().TimePicker()
          .Name("timepicker")
          .DateInput()
          .AutoAdjust(false)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-timepicker name="timepicker" 
        auto-adjust="false" date-input="true">
    </kendo-timepicker>
```
{% endif %}

## See Also

* [Using the API of the TimePicker (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker/api)

