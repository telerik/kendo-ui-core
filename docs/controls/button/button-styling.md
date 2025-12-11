---
title: Appearance
page_title: jQuery Button Documentation - Appearance
description: "Learn how to apply different styling options to the Button widget."
components: ["button"]
previous_url: /styles-and-layout/styling-components/button-styling
slug: button_styling_widget
position: 3
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI Button.

For a live example, visit the [Appearance Demo of the Button](https://demos.telerik.com/kendo-ui/button/appearance).

## Options

The Kendo UI Button supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`themeColor`](#themecolor)—configures what color will be applied to the component.
- [`fillMode`](#fillmode)—configures how the color is applied to the component.
- [`rounded`](#rounded)—configures the border radius of the component.

### Size

The `size` option controls how big or small the rendered `button` looks. The structure of the class is `k-button-{size}`.

The following values are available for the [`size`](/api/javascript/ui/button/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and is applied to the button element through the `k-button-md` class.

```html
<button class="k-button k-button-md" >
</button>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered `button`. The structure of the class is `k-button-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/button/configuration/fillmode) option:

- `solid`
- `outline`
- `flat`
- `link`
- `clear`
- `none`

The default fillMode value is `solid` and is applied to the button element through the `k-button-solid` class.

```html
<button class="k-button k-button-solid" >
</button>
```

### ThemeColor

The `themeColor` option controls the color that will be applied to the rendered Button. As applying `themeColor` is closely related to the `fillMode`, the structure of the class name for the `themeColor` is composite - `k-button-{fillMode}-{themeColor}`.

The following values are available for the [`themeColor`](/api/javascript/ui/button/configuration/themecolor) option:

- `base`
- `primary`
- `secondary`
- `tertiary`
- `info`
- `success`
- `warning`
- `error`
- `dark`
- `light`
- `inverse`
- `none`

The default `themeColor` value is `base`. A button with default `fillMode` and `themeColor` will have `k-button-solid-base` class applied.

```html
<!-- Button with default fillMode and themeColor -->
<button class="k-button k-button-solid k-button-solid-base" >
</button>

<!-- Button with default fillMode and 'primary' themeColor -->
<button class="k-button k-button-solid k-button-solid-primary" >
</button>

<!-- Button with `flat` fillMode and `primary` themeColor -->
<button class="k-button k-button-flat k-button-flat-primary" >
</button>
```

### Rounded

The `rounded` option controls the extent to which border radius is applied to the rendered `button`. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/button/configuration/rounded) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `circle`
- `pill`
- `none`—unset

The default rounded value is `medium` and is applied to the button element through the `k-rounded-md` class.

```html
<button class="k-button k-rounded-md" >
</button>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the Button](https://demos.telerik.com/kendo-ui/button/appearance)
* [JavaScript API Reference of the Button](/api/javascript/ui/button)
