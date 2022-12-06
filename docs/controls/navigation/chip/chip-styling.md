---
title: Appearance
page_title: jQuery Chip Documentation - Appearance
description: "Learn how to apply different styling options to the Chip widget."
slug: chip_styling_widget
position: 4
---

# Appearance

The Chip provides predefined appearance options such as different sizes, border radiuses, fill modes and theme colors.

For a live example, visit the [Appearance Demo of the Chip](https://demos.telerik.com/kendo-ui/chip/appearance).

## Options

The Kendo UI Chip supports the following styling options:

- [`size`](#size)—Configures the overall size of the component.
- [`themeColor`](#themecolor)—Configures what color will be applied to the component.
- [`fillMode`](#fillmode)—Configures how the color is applied to the component.
- [`rounded`](#rounded)—Configures the border radius of the component.

### Size

The `size` option controls how big or small the rendered `chip` looks. The structure of the class is `k-chip-{size}`.

The following values are available for the [`size`](/api/javascript/ui/chip/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the rendered div element through the `k-chip-md` class.

```html
<div class="k-chip k-chip-md" >
</div>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered `div`. The structure of the class is `k-chip-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/chip/configuration/fillmode) option:

- `solid`
- `outline`

The default fillMode value is `solid` and it is applied to the rendered div element through the `k-chip-solid` class.

```html
<div class="k-chip k-chip-solid" >
</div>
```

### ThemeColor

The `themeColor` option controls the color that will be applied to the rendered Chip. As applying `themeColor` is closely related to the `fillMode`, the structure of the class name for the `themeColor` is composite - `k-chip-{fillMode}-{themeColor}`.

The following values are available for the [`themeColor`](/api/javascript/ui/chip/configuration/themecolor) option:

- `base`
- `info`
- `success`
- `warning`
- `error`

The default `themeColor` value is `base`. A Chip with default `fillMode` and `themeColor` will have `k-chip-solid-base` class applied.

```html
<!-- Chip with default fillMode and themeColor -->
<div class="k-chip k-chip-solid k-chip-solid-base" >
</div>

<!-- Chip with `flat` fillMode and `warning` themeColor -->
<div class="k-chip k-chip-flat k-chip-flat-warning" >
</div>
```

### Rounded

The `rounded` option controls how much border radius is applied to the rendered Chip. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/chip/configuration/rounded) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `circle`
- `pill`
- `none`—unset

The default rounded value is `medium` and it is applied to the rendered div element through the `k-rounded-md` class.

```html
<div class="k-chip k-rounded-md" >
</div>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the Chip](https://demos.telerik.com/kendo-ui/chip/appearance)
* [JavaScript API Reference of the Chip](/api/javascript/ui/chip)
