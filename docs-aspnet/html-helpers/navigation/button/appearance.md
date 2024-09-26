---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI Button HtmlHelper for {{ site.framework }}."
slug: button_appearance
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} Button.

For a complete example, refer to the [Appearance Demo of the Button](https://demos.telerik.com/{{ site.platform }}/button/appearance).

## Options

The Button component provides the following options for styling:

- [`Size()`](#size)—Configures the overall size of the component.
- [`ThemeColor()`](#themecolor)—Sets what color will be applied to the component.
- [`FillMode()`](#fillmode)—Defines how the color is applied to the Button.
- [`Rounded()`](#rounded)—Determines the border radius of the component.

### Size

To control the size of the Button, configure the `Size` option with any of the following values:

- `Small`
- `Medium` (the default size)
- `Large`
- `None`

```HtmlHelper
@(Html.Kendo().Button()
    .Name("textButton")
    .Size(ComponentSize.Medium)
    .HtmlAttributes( new {type = "button"} )
    .Content("Text Button")
)
```
{% if site.core %}
```TagHelper
<kendo-button name="textButton" size="ComponentSize.Medium">
    Text Button
</kendo-button>
```
{% endif %}

### FillMode

The `FillMode()` method specifies how the color is applied to the component. The default Button fill mode is `Solid`.

```HtmlHelper
@(Html.Kendo().Button()
    .Name("textButton")
    .FillMode(ButtonFillMode.Solid)
    .HtmlAttributes( new {type = "button"} )
    .Content("Text Button")
)
```
{% if site.core %}
```TagHelper
<kendo-button name="textButton" fill-mode="ButtonFillMode.Solid">
    Text Button
</kendo-button>
```
{% endif %}

The following options are available for the `FillMode` configuration:

- `Solid`
- `Outline`
- `Flat`
- `Link`
- `Clear`
- `None`

### ThemeColor

The `ThemeColor` configuration provides a variety of colors that can be applied to the Button. The available options are:

- `Base`
- `Primary`
- `Secondary`
- `Tertiary`
- `Info`
- `Success`
- `Warning`
- `Error`
- `Dark`
- `Light`
- `Inverse`

The default `ThemeColor` is `Base`.

```HtmlHelper
@(Html.Kendo().Button()
    .Name("textButton")
    .ThemeColor(ThemeColor.Base)
    .HtmlAttributes( new {type = "button"} )
    .Content("Text Button")
)
```
{% if site.core %}
```TagHelper
<kendo-button name="textButton" theme-color="ThemeColor.Base">
    Text Button
</kendo-button>
```
{% endif %}

### Rounded

The border radius of the Button can be customized through the `Rounded()` method. The default option is `Medium`.

```HtmlHelper
@(Html.Kendo().Button()
    .Name("textButton")
    .Rounded(ButtonRounded.Medium)
    .HtmlAttributes( new {type = "button"} )
    .Content("Text Button")
)
```
{% if site.core %}
```TagHelper
<kendo-button name="textButton" rounded="Rounded.Medium">
    Text Button
</kendo-button>
```
{% endif %}

The following values are available for the `Rounded` option:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/appearance)
* [Button Server-Side API](/api/button)
* [Button Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/button)


