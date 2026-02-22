---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI ColorPicker for {{ site.framework }}."
components: ["colorpicker"]
slug: appearance_colorpicker_aspnetcore
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} ColorPicker.

For a live example, visit the [Appearance Demo of the ColorPicker](https://demos.telerik.com/{{ site.platform }}/colorpicker/appearance).

## Options

The ColorPicker supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the ColorPicker. The `k-input-{size}` class, which is applied to the wrapping span element of the ColorPicker, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element).
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element).
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the ColorPicker:

```HtmlHelper
        @(Html.Kendo().ColorPicker()
            .Name("picker")
            .Size(ComponentSize.Medium)
            .Value("#ff0000")
            .Format(ColorPickerFormat.Rgb)
            .Formats(new string[] { "rgb", "hex" })
        )
```
{% if site.core %}
```TagHelper
@{
    string[] formats = new string[] { "rgb", "hex" };
}

        <kendo-colorpicker name="picker" value="#ff0000" size="ComponentSize.Medium"
         format="ColorPickerFormat.Rgb"         formats="formats">
        </kendo-colorpicker>
```
{% endif %}

The default `Size` value is `Medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-colorpicker k-picker k-picker-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the ColorPicker. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element).
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element).
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element).
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the ColorPicker:

```HtmlHelper
        @(Html.Kendo().ColorPicker()
            .Name("picker")
            .Rounded(Rounded.Medium)
            .Value("#ff0000")
            .Format(ColorPickerFormat.Rgb)
            .Formats(new string[] { "rgb", "hex" })
        )
```
{% if site.core %}
```TagHelper
@{
    string[] formats = new string[] { "rgb", "hex" };
}

        <kendo-colorpicker name="picker" value="#ff0000" rounded="Rounded.Medium"
         format="ColorPickerFormat.Rgb"         formats="formats">
        </kendo-colorpicker>
```
{% endif %}

> When not explicitly set, the applied theme controls the default border radius.

```html
<span class="k-colorpicker k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered ColorPicker. The `k-picker-{fillMode}` class, which is applied to the wrapping span element of the ColorPicker, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element.
- `Flat`—applies the `k-input-flat` class to the wrapping span element.
- `Outline`—applies the `k-input-outline` class to the wrapping span element.
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the ColorPicker:

  ```HtmlHelper
        @(Html.Kendo().ColorPicker()
            .Name("picker")
            .FillMode(FillMode.Solid)
            .Value("#ff0000")
            .Format(ColorPickerFormat.Rgb)
            .Formats(new string[] { "rgb", "hex" })
        )
```
{% if site.core %}
```TagHelper
@{
    string[] formats = new string[] { "rgb", "hex" };
}

        <kendo-colorpicker name="picker" value="#ff0000" fillmode="FillMode.Solid"
         format="ColorPickerFormat.Rgb"         formats="formats">
        </kendo-colorpicker>
```
{% endif %}

> When not explicitly set, the applied theme controls the default fill mode.

```html
<span class="k-colorpicker k-input k-input-solid">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the ColorPicker](https://demos.telerik.com/aspnet-mvc/colorpicker/appearance)
