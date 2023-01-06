---
title: Appearance
page_title: Styling the Appearance of the Chip Helper
description: "Learn how to manage the appearance of the Telerik UI Chip component for {{ site.framework }} and apply its various styling options."
slug: htmlhelpers_chip_aspnetcore_appearance
position: 2
---

# Chip Appearance

The Chip provides predefined appearance options such as different sizes, border radiuses, fill modes, and theme colors.

For a live example, refer to the [Appearance Demo of the Chip](https://demos.telerik.com/{{ site.platform }}/chip/appearance).

The Telerik UI Chip supports the following styling options:

- [`Size`](#size)—Configures the overall size of the component.
- [`ThemeColor`](#theme-color)—Configures what color will be applied to the component.
- [`FillMode`](#fill-mode)—Configures how the color is applied to the component.
- [`Rounded`](#border-radius)—Configures the border radius of the component.

## Size

The `Size` option controls how big or small the rendered `Chip` looks.

```HtmlHelper
     @(Html.Kendo().Chip()
            .Name("chip")
            .Size(ComponentSize.Medium)
            .Label("Chip")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chip name="chip"
                size="ComponentSize.Medium"
                label="Chip">
    </kendo-chip>
```
{% endif %}

The [`Size`](/api/Kendo.Mvc.UI.Fluent/ChipBuilder#sizekendomvcuicomponentsize) option accepts the following values:

- `ComponentSize.Small`—Small size.
- (Default) `ComponentSize.Medium`—Medium size.
- `ComponentSize.Large`—Large size.
- `ComponentSize.None`—Unset.

The structure of the class is `k-chip-{size}`. The default size value is `Мedium` and is applied to the rendered `div` element through the `k-chip-md` class.

```html
<div class="k-chip k-chip-md" >
</div>
```

## Fill Mode

The `FillMode` option controls the way the color is applied to the rendered `div`. 

```HtmlHelper
     @(Html.Kendo().Chip()
            .Name("chip")
            .FillMode(ChipFillMode.Solid)
            .Label("Chip")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chip name="chip"
                fill-mode="ChipFillMode.Solid"
                label="Chip">
    </kendo-chip>
```
{% endif %}

The [`FillMode`](/api/Kendo.Mvc.UI.Fluent/ChipBuilder#fillmodekendomvcuichipfillmode) option accepts the following values:

- (Default) `ChipFillMode.Solid`
- `ChipFillMode.Outline`

The structure of the Html class is `k-chip-{fillMode}`. The default `fillMode` value is `Solid` and is applied to the rendered `div` element through the `k-chip-solid` class.

```html
<div class="k-chip k-chip-solid" >
</div>
```

## Theme Color

The `ThemeColor` option controls the color that will be applied to the rendered Chip. 

```HtmlHelper
     @(Html.Kendo().Chip()
            .Name("chip")
            .ThemeColor(ChipThemeColor.Base)
            .Label("Chip")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chip name="chip"
                theme-color="ChipThemeColor.Base"
                label="Chip">
    </kendo-chip>
```
{% endif %}

The [`ThemeColor`](/api/Kendo.Mvc.UI.Fluent/ChipBuilder#themecolorkendomvcuithemecolor) option accepts the following values:

- (Default) `ChipThemeColor.Base`
- `ChipThemeColor.Info`
- `ChipThemeColor.Success`
- `ChipThemeColor.Warning`
- `ChipThemeColor.Error`

The default `ThemeColor` value is `base`. A Chip with default `FillMode` and `ThemeColor` settings will have the `k-chip-solid-base` class applied.

```html
<!-- A Chip with default fillMode and themeColor settings -->
<div class="k-chip k-chip-solid k-chip-solid-base" >
</div>
```

## Border Radius

The `Rounded` option controls how much border radius is applied to the rendered Chip.

```HtmlHelper
     @(Html.Kendo().Chip()
            .Name("chip")
            .Rounded(Rounded.Medium)
            .Label("Chip")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chip name="chip"
                rounded="Rounded.Medium"
                label="Chip">
    </kendo-chip>
```
{% endif %}

The [`Rounded`](/api/Kendo.Mvc.UI.Fluent/ChipBuilder#roundedkendomvcuirounded) option accepts the following values:

- `Rounded.Small`—Small form.
- (Default) `Rounded.Medium`—Medium form.
- `Rounded.Large`—Large form.
- `Rounded.None`—Unset.

The structure of the class is `k-rounded-{size}`. The default rounded value is `medium` and is applied to the rendered `div` element through the `k-rounded-md` class.

```html
<div class="k-chip k-rounded-md" >
</div>
```

## See Also

* [Appearance Overview of the Telerik UI Helpers]({% slug components_rendering_overview %})
* [Appearance of the Chip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chip/appearance)
* [Server-Side API of the Chip HtmlHelper for {{ site.framework }}](/api/chip)
* [JavaScript API Reference of the Chip HtmlHelper for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/chip)
