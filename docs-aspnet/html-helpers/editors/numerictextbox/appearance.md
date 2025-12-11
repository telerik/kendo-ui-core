---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI NumericTextBox HtmlHelper for {{ site.framework }}."
components: ["numerictextbox"]
slug: numerictextbox_appearance
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} NumericTextBox.

For a live example, visit the [Appearance Demo of the NumericTextBox](https://demos.telerik.com/{{ site.platform }}/numerictextbox/appearance).

## Options

The NumericTextBox HtmlHelper supports the following styling options:

- [`Size()`](#size)—configures the overall size of the component.
- [`FillMode()`](#fillmode)—configures how the color is applied to the component.
- [`Rounded()`](#rounded)—configures the border radius of the component.

### Size

The `Size()` method allows you to adjust the size of the NumericTextBox. The default size is `Medium`.

```HtmlHelper
@(Html.Kendo().NumericTextBox()
    .Name("numeric")
    .Size(ComponentSize.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-numerictextbox name="numeric"
                      size="ComponentSize.Medium">
</kendo-numerictextbox>
```
{% endif %}

The option is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-numerictextbox k-input k-input-md">
</span>
```

The following values are available for the `Size` option:

- `Small`
- `Medium`
- `Large`
- `None`


### Rounded

You can control how much border radius is applied to the component by using the `Rounded()` method. The default value is `Medium`.

```HtmlHelper
@(Html.Kendo().NumericTextBox()
    .Name("numeric")
    .Rounded(Rounded.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-numerictextbox name="numeric"
                      rounded="Rounded.Medium">
</kendo-numerictextbox>
```
{% endif %}

The option is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-numerictextbox k-input k-rounded-md">
```

The `Rounded` option supports the following values:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`


### FillMode

The `FillMode` option controls the way the color is applied to the NumericTextBox. The default value is `Solid`.

```HtmlHelper
@(Html.Kendo().NumericTextBox()
    .Name("numeric")
    .FillMode(FillMode.Solid)
)
```
{% if site.core %}
```TagHelper
<kendo-numerictextbox name="numeric"
                      fill-mode="FillMode.Solid">
</kendo-numerictextbox>
```
{% endif %}

The option is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-numerictextbox k-input k-input-solid">
```

The following values are available for the `FillMode` option:

- `Solid`
- `Flat`
- `Outline`
- `None`


@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance of the NumericTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/appearance)
* [Server-Side API](/api/numerictextbox)