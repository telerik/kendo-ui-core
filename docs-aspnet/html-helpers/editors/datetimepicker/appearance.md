---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI DateTimePicker for {{ site.framework }}."
slug: appearance_datetimepicker_aspnetcore
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} DateTimePicker.

For a live example, visit the [Appearance Demo of the DateTimePicker](https://demos.telerik.com/{{ site.platform }}/datetimepicker/appearance).

## Options

The DateTimePicker supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the DateTimePicker. The `k-input-{size}` class, which is applied to the wrapping span element of the DateTimePicker, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element).
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element).
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the DateTimePicker:
```HtmlHelper
@(Html.Kendo().DateTimePicker()
    .Name("datetimepicker")
    .Size(ComponentSize.Medium)
    .Value(DateTime.Now)
    .HtmlAttributes(new { style = "width: 100%", title = "datetimepicker" })
    .DateInput()
)
```
{%if site.core %}
```TagHelper
<kendo-datetimepicker name="datetimepicker" 
                      size="ComponentSize.Medium"
                      value="DateTime.Now"
                      date-input="true"
                      style="width:100%"
                      title="datetimepicker" />
```
{% endif %}
The default `Size` value is `Medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-datetimepicker k-input k-input-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the DateTimePicker. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element).
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element).
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element).
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the DateTimePicker:
```HtmlHelper
@(Html.Kendo().DateTimePicker()
    .Name("datetimepicker")
    .Rounded(Rounded.Medium)
    .Value(DateTime.Now)
    .HtmlAttributes(new { style = "width: 100%", title = "datetimepicker" })
    .DateInput()
)
```
{%if site.core %}
```TagHelper
<kendo-datetimepicker name="datetimepicker" 
                      rounded="Rounded.Medium"
                      value="DateTime.Now"
                      date-input="true"
                      style="width:100%"
                      title="datetimepicker" />
```
{% endif %}

The default `Rounded` value is `Medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-datetimepicker k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered DateTimePicker. The `k-input-{fillMode}` class, which is applied to the wrapping span element of the DateTimePicker, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element.
- `Flat`—applies the `k-input-flat` class to the wrapping span element.
- `Outline`—applies the `k-input-outline` class to the wrapping span element.
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the DateTimePicker:

```HtmlHelper
@(Html.Kendo().DateTimePicker()
    .Name("datetimepicker")
    .FillMode(FillMode.Solid)
    .Value(DateTime.Now)
    .HtmlAttributes(new { style = "width: 100%", title = "datetimepicker" })
    .DateInput()
)
```
{%if site.core %}
```TagHelper
<kendo-datetimepicker name="datetimepicker" 
                      fill-mode="FillMode.Solid"
                      value="DateTime.Now"
                      date-input="true" 
                      style="width:100%"
                      title="datetimepicker" />
```
{% endif %}
The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-datetimepicker k-input k-input-solid">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the DateTimePicker](https://demos.telerik.com/aspnet-mvc/datetimepicker/appearance)
