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
- `Medium` - the default size
- `Large`
- `None`

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

The structure of the class is `k-button-{size}`. The default size value is `Medium` and is applied to the rendered  element through the `k-button-md` class.

```html
<button class="k-button k-button-md" >
</button>
```

### FillMode

The `FillMode()` method specifies how the color is applied to the component. The default ToggleButton fill mode is `Solid`.

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
- `None`

The structure of the Html class is `k-button-{fillMode}`. The default `fillMode` value is `Solid` and is applied to the rendered element through the `k-button-solid` class.

```html
<button class="k-button  k-button-solid" >
</button>
```

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

The default `ThemeColor` is `Base`.

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

The default `ThemeColor` value is `base`. A ToggleButton with default `FillMode` and `ThemeColor` settings will have the `k-button-solid-base` class applied.

```html
<!-- A ToggleButton with default fillMode and themeColor settings -->
<div class="k-button k-button-solid k-button-solid-base" >
</div>
```

### Rounded

The border radius of the ToggleButton can be customized through the `Rounded()` method. The default option is `Medium`.

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
- `None`

The structure of the class is `k-rounded-{size}`. The default rounded value of the ToggleButton is `Medium` and is applied to the rendered element through the `k-rounded-md` class.

```html
<button class="k-button k-rounded-md" >
</button>
```

## See Also

* [Appearance of the ToggleButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/togglebutton/appearance)
* [ToggleButton Server-Side API](/api/togglebutton)
* [ToggleButton Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/togglebutton)


