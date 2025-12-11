---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI DatePicker for {{ site.framework }}."
components: ["datepicker"]
slug: appearance_datepicker_aspnetcore
position: 3
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} DatePicker.

For a live example, visit the [Appearance Demo or the DatePicker](https://demos.telerik.com/{{ site.platform }}/datepicker/appearance).

## Options

The DatePicker supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the DatePicker. The `k-input-{size}` class, which is applied to the wrapping span element of the DatePicker, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element).
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element).
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the DatePicker:

```HtmlHelper
@(Html.Kendo().DatePicker()
      .Name("datepicker")
      .Size(ComponentSize.Medium)
      .Value(new DateTime(2011, 10, 10))
      .HtmlAttributes(new { style = "width: 100%", title = "datepicker" })
)
```
{% if site.core %}
```TagHelper
<kendo-datepicker name="datepicker"
                  size="ComponentSize.Medium"
                  value="new DateTime(2011, 10, 10)"/>
```
{% endif %}

The default `Size` value is `Medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-datepicker k-input k-input-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the DatePicker. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element).
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element).
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element).
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the DatePicker:

```HtmlHelper
@(Html.Kendo().DatePicker()
      .Name("datepicker")
      .Rounded(Rounded.Medium)
      .Value("10/10/2011")
      .HtmlAttributes(new { style = "width: 100%", title = "datepicker" })
)
```
{% if site.core %}
```TagHelper
<kendo-datepicker name="datepicker"
                  rounded="Rounded.Medium"
                  value="new DateTime(2011, 10, 10)"/>
```
{% endif %}

The default `Rounded` value is `Medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-datepicker k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered DatePicker. The `k-input-{fillMode}` class, which is applied to the wrapping span element of the DatePicker, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element.
- `Flat`—applies the `k-input-flat` class to the wrapping span element.
- `Outline`—applies the `k-input-outline` class to the wrapping span element.
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the DatePicker:

```HtmlHelper
@(Html.Kendo().DatePicker()
      .Name("datepicker")
      .FillMode(FillMode.Solid)
       .Value("10/10/2011")
      .HtmlAttributes(new { style = "width: 100%", title = "datepicker" })
    )
```
{% if site.core %}
```TagHelper
<kendo-datepicker name="datepicker"
                  fill-mode="FillMode.Solid"
                  value="new DateTime(2011, 10, 10)"/>
```
{% endif %}

The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-datepicker k-input k-input-solid">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the DatePicker](https://demos.telerik.com/aspnet-mvc/datepicker/appearance)
