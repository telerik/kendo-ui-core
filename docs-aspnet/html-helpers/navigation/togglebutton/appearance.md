---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI ToggleButton HtmlHelper for {{ site.framework }}."
components: ["togglebutton"]
slug: togglebutton_appearance
position: 2
---

# Appearance


The ToggleButton provides predefined appearance options such as different sizes, border radiuses, fill modes, and theme colors.

For a complete example, refer to the [Appearance Demo of the ToggleButton](https://demos.telerik.com/{{ site.platform }}/togglebutton/appearance).

## Options

The ToggleButton HtmlHelper provides the following methods for styling:

- [`Size()`](#size)—configures the overall size of the component.
- [`ThemeColor()`](#themecolor)—configures what color will be applied to the component.
- [`FillMode()`](#fillmode)—defines how the color is applied to the ToggleButton.
- [`Rounded()`](#rounded)—determines the border radius of the component.


### Size

To control the size of the ToggleButton, configure the `Size` option with any of the following values:

- `Small`
- `Medium`
- `Large`

> When not explicitly set, the applied theme controls the default size.

> The `None` value is deprecated. Use custom CSS instead.

```HtmlHelper
@(Html.Kendo().ToggleButton()
    .Name("toggleButton")
    .Size(ComponentSize.Medium)
    .Content("Text ToggleButton")
)
```
{% if site.core %}
```TagHelper
<kendo-togglebutton name="toggleButton"
              size="ComponentSize.Medium">
    Text ToggleButton
</kendo-togglebutton>
```
{% endif %}

### FillMode

The `FillMode()` method specifies how the color is applied to the component.

```HtmlHelper
@(Html.Kendo().ToggleButton()
    .Name("toggleButton")
    .FillMode(ButtonFillMode.Solid)
    .Content("Text ToggleButton")
)
```
{% if site.core %}
```TagHelper
<kendo-togglebutton name="toggleButton"
              fill-mode="ButtonFillMode.Solid">
    Text ToggleButton
</kendo-togglebutton>
```
{% endif %}

The following options are available for the `FillMode` configuration:

- `Solid`
- `Outline`
- `Flat`
- `Link`

> When not explicitly set, the applied theme controls the default fill mode.

> The `None` value is deprecated. Use custom CSS instead.

### ThemeColor

The `ThemeColor` configuration provides a variety of colors that can be applied to the ToggleButton. The available options are:

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

> When not explicitly set, the applied theme controls the default theme color.

```HtmlHelper
@(Html.Kendo().ToggleButton()
    .Name("toggleButton")
    .ThemeColor(ThemeColor.Base)
    .Content("Text ToggleButton")
)
```
{% if site.core %}
```TagHelper
<kendo-togglebutton name="toggleButton"
              theme-color="ThemeColor.Base">
    Text ToggleButton
</kendo-togglebutton>
```
{% endif %}

### Rounded

The border radius of the ToggleButton can be customized through the `Rounded()` method.

```HtmlHelper
@(Html.Kendo().ToggleButtonButton()
    .Name("toggleButton")
    .Rounded(ButtonRounded.Medium)
    .Content("Text ToggleButton")
)
```
{% if site.core %}
```TagHelper
<kendo-togglebutton name="toggleButton"
              rounded="Rounded.Medium">
    Text ToggleButton
</kendo-togglebutton>
```
{% endif %}

The following values are available for the `Rounded` option:

- `Small`
- `Medium`
- `Large`
- `Full`

> When not explicitly set, the applied theme controls the default border radius.

> The `None` value is deprecated. Use custom CSS instead.

## See Also

* [Appearance of the ToggleButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/togglebutton/appearance)
* [ToggleButton Server-Side API](/api/togglebutton)
* [ToggleButton Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/togglebutton)


