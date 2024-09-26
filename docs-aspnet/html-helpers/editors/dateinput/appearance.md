---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI DateInput for {{ site.framework }}."
slug: appearance_dateinput
position: 3
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} DateInput.

For a live example, visit the [Appearance Demo of the DateInput](https://demos.telerik.com/{{ site.platform }}/dateinput/appearance).

## Options

The DateInput supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the `input` of the DateInput. The `k-input-{size}` class, which is applied to the wrapping span element of the DateInput, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The default size value is `Medium`.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Size(ComponentSize.Medium)
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" size="ComponentSize.Medium">
    </kendo-dateinput>
```
{% endif %}

### Rounded

The `Rounded` option controls the border radius of the rendered `input`. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The default rounded value is `Medium`.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Rounded(Rounded.Medium)
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" rounded="Rounded.Medium">
    </kendo-dateinput>
```
{% endif %}

### FillMode

The `fillMode` option controls the way the color is applied to the rendered `input`. The `k-input-{fillMode}` class, which is applied to the wrapping span element of the DateInput, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The default fillMode value is `Solid`.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .FillMode(FillMode.Solid)
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" fill-mode="FillMode.Solid">
    </kendo-dateinput>
```
{% endif %}

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the DateInput](https://demos.telerik.com/{{ site.platform }}/dateinput/appearance)
