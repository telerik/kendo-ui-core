---
title: Appearance
page_title: Appearance
description: "Learn how to manage the appearance of the Telerik UI Chip component for {{ site.framework }} and apply its various styling options."
components: ["chip"]
slug: htmlhelpers_chip_aspnetcore_appearance
position: 2
---

# Appearance

The Chip provides predefined appearance options such as different sizes, border radiuses, fill modes, and theme colors.

For a live example, refer to the [Appearance Demo of the Chip](https://demos.telerik.com/{{ site.platform }}/chip/appearance).

## Options

The Chip supports the following styling options:

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

The [`Size`](/api/kendo.mvc.ui.fluent/chipbuilder#sizekendomvcuicomponentsize) option accepts the following values:

- `ComponentSize.Small`—Small size.
- `ComponentSize.Medium`—Medium size.
- `ComponentSize.Large`—Large size.

> When not explicitly set, the applied theme controls the default size.

> The `ComponentSize.None` value is deprecated. Use custom CSS instead.

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

The [`FillMode`](/api/kendo.mvc.ui.fluent/chipbuilder#fillmodekendomvcuichipfillmode) option accepts the following values:

- `ChipFillMode.Solid`
- `ChipFillMode.Outline`

> When not explicitly set, the applied theme controls the default fill mode.

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

The [`ThemeColor`](/api/kendo.mvc.ui.fluent/chipbuilder#themecolorkendomvcuichipthemecolor) option accepts the following values:

- `ChipThemeColor.Base`
- `ChipThemeColor.Info`
- `ChipThemeColor.Success`
- `ChipThemeColor.Warning`
- `ChipThemeColor.Error`

> When not explicitly set, the applied theme controls the default theme color.

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

The [`Rounded`](/api/kendo.mvc.ui.fluent/chipbuilder#roundedkendomvcuirounded) option accepts the following values:

- `Rounded.Small`—Small form.
- `Rounded.Medium`—Medium form.
- `Rounded.Large`—Large form.

> When not explicitly set, the applied theme controls the default border radius.

> The `Rounded.None` value is deprecated. Use custom CSS instead.

## Rendering

To review the rendering of the component, refer to the HTML specifications in the [Kendo UI Themes Monorepo](https://github.com/telerik/kendo-themes/tree/develop). The `tests` folder of the repository contains the rendering for all flavors of the components, providing a clear reference for how their elements are structured. The rendering information can help you customize a component's appearance and behavior by applying custom CSS or JavaScript to suit specific design or functional requirements.

## See Also

* [Appearance of the Chip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chip/appearance)
* [Server-Side API](/api/chip)
{% if site.core %}
* [Server-Side TagHelper API](/api/taghelpers/chip)
{% endif %}
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/chip)
