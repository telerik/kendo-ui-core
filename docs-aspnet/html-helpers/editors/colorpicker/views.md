---
title: Views
page_title: Views
description: "Learn more about the available views for the Telerik UI ColorPicker component for {{ site.framework }}."
components: ["colorpicker"]
slug: htmlhelpers_views_colorpickerhelper_aspnetcore
position: 3
---

# Views

The [`Views()`](/api/kendo.mvc.ui.fluent/colorpickerbuilder#viewssystemstring) configuration allows you to choose between the `Gradient` and `Palette` views. Also, you can specify the initially selected view through the [`View()`](/api/kendo.mvc.ui.fluent/colorpickerbuilder#viewkendomvcuicolorpickerview) option.

> The `Views()` configuration was introduced with the R3 2021 SP1 release.

The following example shows how to enable the available ColorPicker views and define a default view that will be displayed when the component opens.

```HtmlHelper
    @(Html.Kendo().ColorPicker()
        .Name("PatetteColorPicker")
        .Preview(false)
        .View(ColorPickerView.Palette)
        .Views(new string[]{ "gradient", "palette" })
    )

    @(Html.Kendo().ColorPicker()
        .Name("GradientColorPicker")
        .Preview(false)
        .View(ColorPickerView.Gradient)
        .Views(new string[]{ "gradient", "palette" })
    )
```
{% if site.core %}
```TagHelper
@{
    string[] viewsList = new string[] { "gradient", "palette" };
}

<kendo-colorpicker name="PatetteColorPicker" preview="false" view="palette" views="viewsList">
</kendo-colorpicker>

<kendo-colorpicker name="GradientColorPicker" preview="false" view="gradient" views="viewsList">
</kendo-colorpicker>
```
{% endif %}

## See Also

* [Views of the {{ site.product }} ColorPicker (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/views)
* [Server-Side API](/api/colorpicker)
* [Client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker)
