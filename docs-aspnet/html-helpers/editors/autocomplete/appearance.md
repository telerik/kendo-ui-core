---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI AutoComplete for {{ site.framework }}."
slug: appearance_autocomplete_aspnetcore
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} AutoComplete.

For a live example, visit the [Appearance Demo of the AutoComplete](https://demos.telerik.com/{{ site.platform }}/autocomplete/appearance).

## Options

The AutoComplete supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the AutoComplete. The `k-input-{size}` class, which is applied to the wrapping span element of the AutoComplete, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element).
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element).
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the AutoComplete:

```HtmlHelper
    @(Html.Kendo().AutoComplete()
            .Name("input")
            .Size(ComponentSize.Medium)
            .BindTo(new string[]
            {
                "Red-violet",
                "Red",
                "Red-orange",
                "Orange",
                "Yellow-orange",
                "Yellow",
                "Yellow-green",
                "Green",
                "Blue-green",
                "Blue",
                "Blue-violet",
                "Violet"
            })
            .HtmlAttributes(new { style = "width:100%;" })
    )
```
{% if site.core %}
```TagHelper
@{
    var Colors = new string[]
            {
                "Red-violet",
                "Red",
                "Red-orange",
                "Orange",
                "Yellow-orange",
                "Yellow",
                "Yellow-green",
                "Green",
                "Blue-green",
                "Blue",
                "Blue-violet",
                "Violet"
            };
}
<kendo-autocomplete name="input"
                    size="ComponentSize.Medium"
                    bind-to="Colors"
                    style="width:100%">

</kendo-autocomplete>
```
{% endif %}

The default `Size` value is `Medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-autocomplete k-input k-input-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the AutoComplete. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element).
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element).
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element).
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the AutoComplete:

```HtmlHelper
    @(Html.Kendo().AutoComplete()
            .Name("input")
            .Rounded(Rounded.Medium)
            .BindTo(new string[]
            {
                "Red-violet",
                "Red",
                "Red-orange",
                "Orange",
                "Yellow-orange",
                "Yellow",
                "Yellow-green",
                "Green",
                "Blue-green",
                "Blue",
                "Blue-violet",
                "Violet"
            })
            .HtmlAttributes(new { style = "width:100%;" })
    )
```
{% if site.core %}
```TagHelper
@{
    var Colors = new string[]
            {
                "Red-violet",
                "Red",
                "Red-orange",
                "Orange",
                "Yellow-orange",
                "Yellow",
                "Yellow-green",
                "Green",
                "Blue-green",
                "Blue",
                "Blue-violet",
                "Violet"
            };
}
<kendo-autocomplete name="input"
                    rounded="Rounded.Medium"
                    bind-to="Colors"
                    style="width:100%">

</kendo-autocomplete>
```
{% endif %}


The default `Rounded` value is `Medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-autocomplete k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered AutoComplete. The `k-input-{fillMode}` class, which is applied to the wrapping span element of the AutoComplete, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element.
- `Flat`—applies the `k-input-flat` class to the wrapping span element.
- `Outline`—applies the `k-input-outline` class to the wrapping span element.
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the AutoComplete:

```HtmlHelper
    @(Html.Kendo().AutoComplete()
            .Name("input")
            .FillMode(FillMode.Solid)
            .BindTo(new string[]
            {
                "Red-violet",
                "Red",
                "Red-orange",
                "Orange",
                "Yellow-orange",
                "Yellow",
                "Yellow-green",
                "Green",
                "Blue-green",
                "Blue",
                "Blue-violet",
                "Violet"
            })
            .HtmlAttributes(new { style = "width:100%;" })
    )
```
{% if site.core %}
```TagHelper
@{
    var Colors = new string[]
            {
                "Red-violet",
                "Red",
                "Red-orange",
                "Orange",
                "Yellow-orange",
                "Yellow",
                "Yellow-green",
                "Green",
                "Blue-green",
                "Blue",
                "Blue-violet",
                "Violet"
            };
}
<kendo-autocomplete name="input"
                    fill-mode="FillMode.Solid"
                    bind-to="Colors"
                    style="width:100%">

</kendo-autocomplete>
```
{% endif %}

The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-autocomplete k-input k-input-solid">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the AutoComplete](https://demos.telerik.com/aspnet-mvc/autocomplete/appearance)
