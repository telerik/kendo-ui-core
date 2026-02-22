---
title: Appearance
page_title: Appearance
description: "Learn how to manage the appearance of the Telerik UI ChipList component for {{ site.framework }} and apply its various styling options."
components: ["chiplist"]
slug: htmlhelpers_chiplist_aspnetcore_appearance
position: 3
---

# Appearance

The ChipList provides predefined appearance options such as different sizes, item size, border radiuses, fill modes, and item theme colors.

For a live example, refer to the [Appearance Demo of the ChipList](https://demos.telerik.com/{{ site.platform }}/chiplist/appearance).

## Options

The ChipList component supports the following styling options:

- [`ItemSize`](#item-size)—Configures the size of the Chip items.
- [`ThemeColor`](#theme-color)—Configures what color will be applied to the component.
- [`FillMode`](#fill-mode)—Configures how the color is applied to the component.
- [`Rounded`](#border-radius)—Configures the border radius of the component.

## Item Size

The `ItemSize` option controls how big or small the rendered `chip items` looks.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().ChipList()
        .Name("chiplist")
        .ItemSize(ComponentSize.Medium)
        .Items(item=>{
            item.Add().Label("One");
            item.Add().Label("Two");
            item.Add().Label("Three");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chiplist name="chiplist"
        item-size="ComponentSize.Medium">
        <items>
            <item label="One"></item>
            <item label="Two"></item>
            <item label="Three"></item>
        </items>
    </kendo-chiplist>
```
{% endif %}

The [`Size`](/api/kendo.mvc.ui.fluent/chipbuilder#sizekendomvcuicomponentsize) option accepts the following values:

- `ComponentSize.Small`—Small size.
- `ComponentSize.Medium`—Medium size.
- `ComponentSize.Large`—Large size.

> When not explicitly set, the applied theme controls the default size.

> The `ComponentSize.None` value is deprecated. Use custom CSS instead.

## Fill Mode

The `FillMode` specifies the background and border styles of the Chip items in the ChipList.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().ChipList()
        .Name("chiplist")
        .FillMode(ChipFillMode.Solid)
        .Items(item=>{
            item.Add().Label("One");
            item.Add().Label("Two");
            item.Add().Label("Three");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chiplist name="chiplist"
        fill-mode="ChipFillMode.Solid">
        <items>
            <item label="One"></item>
            <item label="Two"></item>
            <item label="Three"></item>
        </items>
    </kendo-chiplist>
```
{% endif %}

The [`FillMode`](/api/kendo.mvc.ui.fluent/chiplistbuilder#fillmodekendomvcuichipfillmode) option accepts the following values:

- `ChipFillMode.Solid`
- `ChipFillMode.Outline`

> When not explicitly set, the applied theme controls the default fill mode.

> The `ChipFillMode.None` value is deprecated. Use custom CSS instead.

## Theme Color

The `ThemeColor` option controls the color that will be applied to the rendered Chips in the ChipList.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().ChipList()
        .Name("chiplist")
        .Items(item=>{
            item.Add().Label("One").ThemeColor(ChipThemeColor.Base);
            item.Add().Label("Two").ThemeColor(ChipThemeColor.Base);
            item.Add().Label("Three").ThemeColor(ChipThemeColor.Base);
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chiplist name="chiplist"
        fill-mode="ChipFillMode.Solid">
        <items>
            <item label="One" theme-color="ChipThemeColor.Base"></item>
            <item label="Two" theme-color="ChipThemeColor.Base"></item>
            <item label="Three" theme-color="ChipThemeColor.Base"></item>
        </items>
    </kendo-chiplist>
```
{% endif %}

The [`ThemeColor`](/api/kendo.mvc.ui.fluent/chiplistitembuilder#themecolorkendomvcuichipthemecolor) option accepts the following values:

- `ChipThemeColor.Base`
- `ChipThemeColor.Info`
- `ChipThemeColor.Success`
- `ChipThemeColor.Warning`
- `ChipThemeColor.Error`

> When not explicitly set, the applied theme controls the default theme color.

## Border Radius

The `Rounded` option controls how much border radius is applied to the rendered Chips inside the ChipList.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().ChipList()
        .Name("chiplist")
        .Rounded(Rounded.Medium)
        .Items(item=>{
            item.Add().Label("One");
            item.Add().Label("Two");
            item.Add().Label("Three");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chiplist name="chiplist"
        rounded="Rounded.Medium">
        <items>
            <item label="One" theme-color="ChipThemeColor.Base"></item>
            <item label="Two" theme-color="ChipThemeColor.Base"></item>
            <item label="Three" theme-color="ChipThemeColor.Base"></item>
        </items>
    </kendo-chiplist>
```
{% endif %}

The [`Rounded`](/api/kendo.mvc.ui.fluent/chipbuilder#roundedkendomvcuirounded) option accepts the following values:

- `Rounded.Small`—Small form.
- `Rounded.Medium`—Medium form.
- `Rounded.Large`—Large form.
- `Rounded.Full`—Circular form.

> When not explicitly set, the applied theme controls the default border radius.

> The `Rounded.None` value is deprecated. Use custom CSS instead.

## Rendering

To review the rendering of the component, refer to the HTML specifications in the [Kendo UI Themes Monorepo](https://github.com/telerik/kendo-themes/tree/develop). The `tests` folder of the repository contains the rendering for all flavors of the components, providing a clear reference for how their elements are structured. The rendering information can help you customize a component's appearance and behavior by applying custom CSS or JavaScript to suit specific design or functional requirements.

## See Also

* [Appearance of the ChipList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chiplist/appearance)
* [Server-Side API](/api/chiplist)
{% if site.core %}
* [Server-Side TagHelper API](/api/taghelpers/chiplist)
{% endif %}
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/chiplist)
