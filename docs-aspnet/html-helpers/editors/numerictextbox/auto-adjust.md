---
title: Automatic Correction
page_title: Telerik UI NumericTextBox for {{ site.framework }} Documentation - Automatic Correction
description: "Get familiar with the Telerik UI NumericTextBox component for {{ site.framework }} and how to use its auto-correct feature."
slug: htmlhelpers_numerictextbox_autocorrect_aspnetcore
position: 7
---

# Automatic Correction

Starting with Telerik UI for {{ site.framework }} R3 2024, the NumericTextBox component provides a way to disable the built-in [`AutoAdjust`](/api/javascript/ui/dateinput/configuration/autoadjust) feature.

By default, when you have `Min` and `Max` values configured, the component will auto-correct the user input if it is not in the min/max range. The auto-corrected value will be either the `Min` or the `Max` value you have set for the component.

```HtmlHelper
   @(Html.Kendo().NumericTextBox()
          .Name("numerictextbox")
          .AutoAdjust(false)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-numerictextbox name="numerictextbox" 
        auto-adjust="false">
    </kendo-numerictextbox>
```
{% endif %}

## See Also

* [Using the API of the NumericTextBox (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/api)

