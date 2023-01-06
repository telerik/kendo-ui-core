---
title: Appearance
page_title: Styling the Appearance of the ChipList Helper
description: "Learn how to manage the appearance of the Telerik UI ChipList component for {{ site.framework }} and apply its various styling options."
slug: htmlhelpers_chiplist_aspnetcore_appearance
position: 3
---

# Appearance

The ChipList provides predefined appearance options such as different sizes, item size, border radiuses, fill modes and item theme colors.

For a live example, refer to the [Appearance Demo of the ChipList](https://demos.telerik.com/{{ site.platform }}/chiplist/appearance).

The Kendo UI ChipList supports the following styling options:

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

The [`Size`](/api/Kendo.Mvc.UI.Fluent/ChipBuilder#sizekendomvcuicomponentsize) option accepts the following values:

- `ComponentSize.Small`—Small size.
- (Default) `ComponentSize.Medium`—Medium size.
- `ComponentSize.Large`—Large size.
- `ComponentSize.None`—Unset.

The structure of the Html class rendered on the client-side is `k-chip-{size}`. The default size value is `Medium` and is applied to the rendered `div` element through the `k-chip-md` class.

```html
<div class="k-chip k-chip-md" >
</div>
```

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

The [`FillMode`](/api/Kendo.Mvc.UI.Fluent/ChipListBuilder#fillmodekendomvcuichipfillmode) option accepts the following values:

- (Default) `ChipFillMode.Solid`
- `ChipFillMode.Outline`
- `ChipFillMode.None`

The structure of the class is `k-chip-{fillMode}`. The default `FillMode` value is `Solid` and is applied to the rendered `div` element through the `k-chip-solid` class. 

```html
<div id="chiplist" class="k-chip-list k-chip-list-md">
    <div class="k-chip k-chip-solid" >
    </div>
</div>
```

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

The [`ThemeColor`](/api/Kendo.Mvc.UI.Fluent/ChipListBuilder#themecolorkendomvcuithemecolor) option accepts the following values:

- (Default) `ChipThemeColor.Base`
- `ChipThemeColor.Info`
- `ChipThemeColor.Success`
- `ChipThemeColor.Warning`
- `ChipThemeColor.Error`

As applying `Items.ThemeColor` is closely related to the `FillMode`, the structure of the rendered Html class name for the `ThemeColor` is composite—`k-chip-{fillMode}-{themeColor}`. The default `Items.ThemeColor` value is `Base`. A Chip with a default `FillMode` and `ThemeColor` will have a `k-chip-solid-base` class applied.

```html
<div id="chiplist" class="k-chip-list">
    <div class="k-chip k-chip-solid k-chip-solid-base" >
    </div>
</div>
```

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

The [`Rounded`](/api/Kendo.Mvc.UI.Fluent/ChipBuilder#roundedkendomvcuirounded) option accepts the following values:

- `Rounded.Small`—Small form.
- (Default) `Rounded.Medium`—Medium form.
- `Rounded.Large`—Large form.
- `Rounded.Full`—Circular form.
- `Rounded.None`—Unset.

The structure of the Html class is `k-rounded-{size}`. The default `rounded` value is `Medium` and is applied to the rendered `div` element through the `k-rounded-md` class.

```html
<div id="chiplist" class="k-chip-list">
    <div class="k-chip k-rounded-md" >
    </div>
</div>
```

## See Also

* [Appearance Overview of the Telerik UI Helpers]({% slug components_rendering_overview %})
* [Appearance of the ChipList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chiplist/appearance)
* [JavaScript API Reference of the ChipList HtmlHelper for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/chiplist#methods)
* [Server-Side API of the ChipList HtmlHelper for {{ site.framework }}](/api/chiplist)
