---
title: Views
page_title: Views
description: "Learn more about the available views for the Telerik UI ColorPicker component for {{ site.framework }}."
slug: htmlhelpers_views_colorpickerhelper_aspnetcore
position: 3
---

# ColorPicker Views

As of R3 SP1 of 2021 for the {{ site.product }} ColorPicker has a new design. One of the introduced new features is the [`.Views()`](/api/Kendo.Mvc.UI.Fluent/ColorPickerBuilder#viewssystemstring) configuration. It allows you to choose between a `gradient` and a `palette` view. You can also choose which the default view would be through the [`.View()`](/api/Kendo.Mvc.UI.Fluent/ColorPickerBuilder#viewkendomvcuicolorpickerview) option.

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
    string[] views = new string[] { "gradient", "palette" };
}

<kendo-colorpicker name="PatetteColorPicker"   preview="false" view="palette" views="views">
</kendo-colorpicker>

<kendo-colorpicker name="GradientColorPicker"   preview="false" view="gradient" views="views">
</kendo-colorpicker>
```
{% endif %}

## See Also

* [Views of the {{ site.product }} ColorPicker (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/views)
* [Server-Side API](/api/colorpicker)
* [Client-side API](/api/javascript/ui/colorpicker)
