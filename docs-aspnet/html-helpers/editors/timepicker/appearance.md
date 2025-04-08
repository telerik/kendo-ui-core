---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI TimePicker for {{ site.framework }}."
slug: appearance_timepicker
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} TimePicker.

For a live example, visit the [Appearance Demo of the TimePicker](https://demos.telerik.com/{{ site.platform }}/timepicker/appearance).

## Options

The TimePicker supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

```HtmlHelper
@(Html.Kendo().TimePicker()
    .Name("timepicker")
    .Size(ComponentSize.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-timepicker name="timepicker"
                  size="ComponentSize.Medium"/>
```
{% endif %}

The `Size` option controls the size of the input of the TimePicker. The `k-input-{size}` class, which is applied to the wrapping span element of the TimePicker, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The default size value is `Medium`.

```html
<span class="k-timepicker k-input k-input-md">
</span>
```

### Rounded

```HtmlHelper
@(Html.Kendo().TimePicker()
    .Name("timepicker")
    .Rounded(Rounded.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-timepicker name="timepicker"
                  rounded="Rounded.Medium"/>
```
{% endif %}

The `Rounded` option controls the border radius of the TimePicker. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest (ellipse-like) border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The default value is `Medium`.

```html
<span class="k-timepicker k-input k-rounded-md">
</span>
```

### FillMode

```HtmlHelper
@(Html.Kendo().TimePicker()
    .Name("timepicker")
    .FillMode(FillMode.Solid)
)
```
{% if site.core %}
```TagHelper
<kendo-timepicker name="timepicker"
                  fill-mode="FillMode.Solid" />
```
{% endif %}

The `FillMode` option controls how color is applied to the component. The structure of the class is `k-input-{fillMode}`.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The default value is `Solid` and it is applied to the `span.k-timepicker` wrapping element through the `k-input-solid` class.

```html
<span class="k-timepicker k-input k-input-solid">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the TimePicker](https://demos.telerik.com/{{ site.platform }}/timepicker/appearance)
