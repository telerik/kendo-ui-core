---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI MaskedTextBox for {{ site.framework }}."
slug: appearance_maskedtextbox
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} MaskedTextBox.

For a live example, visit the [Appearance Demo of the MaskedTextBox](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/appearance).

## Options

The MaskedTextBox supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the MaskedTextBox. The `k-input-{size}` class, which is applied to the wrapping span element of the MaskedTextBox, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the MaskedTextBox:

```HtmlHelper
  @(Html.Kendo().MaskedTextBox()
    .Name("maskedtextbox")
    .Mask("(999) 000-0000")
    .Size(ComponentSize.Large)
  )
```
{% if site.core %}
 ```TagHelper
    <kendo-maskedtextbox name="maskedtextbox" mask="(999) 000-0000" size="ComponentSize.Large">
    </kendo-maskedtextbox>
 ```
{% endif %}

The default size value is `Medium`.

```html
<span class="k-maskedtextbox k-input k-input-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the MaskedTextBox. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the MaskedTextBox:

```HtmlHelper
  @(Html.Kendo().MaskedTextBox()
    .Name("maskedtextbox")
    .Mask("(999) 000-0000")
    .Rounded(Rounded.Large)
  )
```
{% if site.core %}
 ```TagHelper
    <kendo-maskedtextbox name="maskedtextbox" mask="(999) 000-0000" rounded="Rounded.Large">
    </kendo-maskedtextbox>
 ```
{% endif %}

The default rounded value is `Medium`.

```html
<span class="k-maskedtextbox k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered MaskedTextBox. The `k-input-{fillMode}` class, which is applied to the wrapping span element of the MaskedTextBox, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the MaskedTextBox:
    
```HtmlHelper
  @(Html.Kendo().MaskedTextBox()
    .Name("maskedtextbox")
    .Mask("(999) 000-0000")
    .FillMode(FillMode.Outline)
  )
```
{% if site.core %}
 ```TagHelper
    <kendo-maskedtextbox name="maskedtextbox" mask="(999) 000-0000" fill-mode="FillMode.Outline">
    </kendo-maskedtextbox>
 ```
{% endif %}

The default fillMode value is `solid`.

```html
<span class="k-maskedtextbox k-input k-input-solid">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the MaskedTextBox](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/appearance)
