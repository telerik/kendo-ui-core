---
title: Automatic Correction
page_title: Telerik UI DateInput for {{ site.framework }} Documentation - Automatic Correction
description: "Get familiar with the Telerik UI DateInput component for {{ site.framework }} and how to use its auto-correct feature."
slug: htmlhelpers_dateinput_autocorrect_aspnetcore
position: 7
---

# Automatic Correction

Starting with Telerik UI for {{ site.framework }} R3 2024, the DateInput component provides a way to disable the built-in [`AutoAdjust`](/api/kendo.mvc.ui.fluent/dateinputbuilder#autoadjustsystemboolean) feature.

By default, when you have `Min` and `Max` values configured, the component will auto-correct the user input if it is not in the min/max range. The auto-corrected value will be either the `Min` or the `Max` value you have set for the component.

```HtmlHelper
   @(Html.Kendo().DateInput()
          .Name("dateinput")
          .AutoAdjust(false)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-dateinput name="dateinput"
        auto-adjust="false">
    </kendo-dateinput>
```
{% endif %}

## See Also

* [Using the API of the DateInput (Demo)](https://demos.telerik.com/{{ site.platform }}/dateinput/api)

