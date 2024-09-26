---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI TextBox HtmlHelper for {{ site.framework }}."
slug: textbox_appearance
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} TextBox.

For a live example, refer to the [Appearance Demo of the TextBox](https://demos.telerik.com/{{ site.platform }}/textbox/appearance).

## Options

The TextBox HtmlHelper provides the following styling options:

- [`Size()`](#size)—configures the overall size of the component.
- [`FillMode()`](#fillmode)—defines how the color is applied to the component.
- [`Rounded()`](#rounded)—specifies the border radius of the component.

### Size

The `Size()` method controls the size of the rendered TextBox.

The example below demonstrates how to adjust the `Size` of the component:

```HtmlHelper
@(Html.Kendo().TextBox()
    .Name("textbox")
    .Size(ComponentSize.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-textbox name="textbox"
               size="ComponentSize.Medium">
</kendo-textbox>
```
{% endif %}

The following values are available for the `Size` option:

- `Small`
- `Medium`
- `Large`
- `None`

The default size value is `Medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-textbox k-input k-input-md">
</span>
```

### Rounded

The border radius of the TextBox can be customized through the `Rounded()` method.

```HtmlHelper
@(Html.Kendo().TextBox()
    .Name("textbox")
    .Rounded(Rounded.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-textbox name="textbox"
               rounded="Rounded.Medium">
</kendo-textbox>
```
{% endif %}

The following values are available for the `Rounded` option:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`

The default value is `Medium` and it is added as a class `k-rounded-md` to the wrapping span element.

```html
<span class="k-textbox k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode()` method controls the way the color is applied to the TextBox component.

```HtmlHelper
@(Html.Kendo().TextBox()
    .Name("textbox")
    .FillMode(FillMode.Solid)
)
```
{% if site.core %}
```TagHelper
<kendo-textbox name="textbox"
               fill-mode="FillMode.Solid">
</kendo-textbox>
```
{% endif %}

The following values are available for the `FillMode` option:

- `Solid`
- `Flat`
- `Outline`
- `None`

The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-textbox k-input k-input-solid">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance of the TextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/appearance)
* [Server-Side API](/api/textbox)

