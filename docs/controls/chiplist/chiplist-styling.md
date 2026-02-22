---
title: Appearance
page_title: jQuery ChipList Documentation - Appearance
description: "Learn how to apply different styling options to the ChipList widget."
components: ["chiplist"]
slug: chiplist_styling_widget
position: 5
---

# Appearance

The ChipList provides predefined appearance options such as different sizes, item size, border radiuses, fill modes and item theme colors.

For a live example, visit the [Appearance Demo of the Chip](https://demos.telerik.com/kendo-ui/chip/appearance).

## Options

The Kendo UI Chip supports the following styling options:

- [`size`](#size)—Configures the overall size of the component.
- [`itemSize`](#itemSize)—Configures the size of the Chip items.
- [`themeColor`](#themecolor)—Configures what color will be applied to the component.
- [`fillMode`](#fillmode)—Configures how the color is applied to the component.
- [`rounded`](#rounded)—Configures the border radius of the component.

### Size

Specifies the gap between the Chips in the ChipList. The structure of the class is `k-chip-{size}`.

The following values are available for the [`size`](/api/javascript/ui/chiplist/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `undefined` and it the default size appearance is controlled by the theme.

```html
<div class="k-chip" >
</div>
```

### ItemSize

The `itemSize` option controls how big or small the rendered `chip items` looks. The structure of the class is `k-chip-{size}`.

The following values are available for the [`size`](/api/javascript/ui/chiplist/configuration/itemsize) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `undefined` and it the default appearance is controlled by the theme.

```html
<div class="k-chip" >
</div>
```

### FillMode

The `fillMode` specifies the background and border styles of the Chip items in the ChipList. The structure of the class is `k-chip-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/chiplist/configuration/fillmode) option:

- `solid`
- `outline`
- `none`

The default `fillMode` value is `undefined` and it the default appearance is controlled by the theme.

```html
<div id="chiplist" class="k-chip-list">
    <div class="k-chip" >
    </div>
</div>
```

### ThemeColor

The `themeColor` option controls the color that will be applied to the rendered Chip in the ChipList. As applying `items.themeColor` is closely related to the `fillMode`, the structure of the class name for the `themeColor` is composite—`k-chip-{fillMode}-{themeColor}`.

The following values are available for the [`themeColor`](/api/javascript/ui/chip/configuration/themecolor) option:

- `base`
- `info`
- `success`
- `warning`
- `error`

The default `items.themeColor` value is `base`. A Chip with a default `fillMode` and `themeColor` will have a `k-chip-base` class applied.

```html
<!-- ChipList with Chip with default fillMode and themeColor -->
<div id="chiplist" class="k-chip-list">
    <div class="k-chip" >
    </div>
</div>

<!-- ChipList with Chip with `flat` fillMode and `warning` themeColor -->
<div id="chiplist" class="k-chip-list">
    <div class="k-chip k-chip-flat k-chip-warning" >
    </div>
</div>
```

### Rounded

The `rounded` option controls how much border radius is applied to the rendered Chips inside the ChipList. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/chiplist/configuration/rounded) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `circle`—circular form
- `pill`—pill form
- `none`—unset

The default rounded value is `undefined` and it the default appearance is controlled by the theme.

```html
<div id="chiplist" class="k-chip-list">
    <div class="k-chip" >
    </div>
</div>
```

## Rendering

To review the rendering of the component, refer to the HTML specifications in the [Kendo UI Themes Monorepo](https://github.com/telerik/kendo-themes/tree/develop). The `tests` folder of the repository contains the rendering for all flavors of the components, providing a clear reference for how their elements are structured. The rendering information can help you customize a component's appearance and behavior by applying custom CSS or JavaScript to suit specific design or functional requirements.

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the ChipList](https://demos.telerik.com/kendo-ui/chiplist/appearance)
* [JavaScript API Reference of the ChipList](/api/javascript/ui/chiplist)
