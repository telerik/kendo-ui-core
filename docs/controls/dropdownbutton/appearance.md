---
title: Appearance
page_title: jQuery DropDownButton Documentation - Appearance
description: "Learn how to apply different styling options to the DropDownButton widget."
slug: appearance_kendoui_dropdownbutton_widget
position: 3
---

# Appearance

In this article, you will find information about the rendering and styling options of the Kendo UI DropDownButton.

For general information regarding the rendering, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the DropDownButton](https://demos.telerik.com/kendo-ui/dropdownbutton/appearance).

## Options

The Kendo UI DropDownButton supports the following styling options:

- [`size`](#size)—Configures the overall size of the component.
- [`themeColor`](#themecolor)—Configures what color will be applied to the component.
- [`fillMode`](#fillmode)—Configures how the color is applied to the component.
- [`rounded`](#rounded)—Configures the border radius of the component.

### Size

The `size` option controls how big or small the rendered `button` looks. The structure of the class is `k-button-{size}`.

The following values are available for the [`size`](/api/javascript/ui/dropdownbutton/configuration/size) option:

- `sm`—Small size.
- `md`—Medium size.
- `lg`—Large size.
- `none`—Unset.

The default `size` value is `medium` and it is applied to the button element through the `k-button-md` class.

```html
<button id="button" data-role="dropdownbutton" class="k-menu-button k-button k-button-md">
    ...
</button>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered `button`. The structure of the class is `k-button-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/dropdownbutton/configuration/fillmode) option:

- `solid`
- `outline`
- `flat`
- `link`
- `none`

The default `fillMode` value is `solid` and it is applied to the button element through the `k-button-solid` class.

    ```html
        <button class="k-menu-button k-button k-button-solid" >
            ...
        </button>
    ```

### ThemeColor

As applying `themeColor` is closely related to the `fillMode` option, the structure of the class name for `themeColor` is a composite `k-button-{fillMode}-{themeColor}` setting.

The following values are available for the [`themeColor`](/api/javascript/ui/dropdownbutton/configuration/themecolor) option:

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

The default `themeColor` value is `base`. A button with default `fillMode` and `themeColor` options will have the `k-button-solid-base` class applied.

```html
<!-- DropDownButton with default fillMode and themeColor -->
<button id="button" data-role="dropdownbutton" class="k-menu-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="button_buttonmenu" aria-label="User Settings dropdownbutton">
    <span class="k-button-text">User Settings</span>
</button>

<!-- DropDownButton with default fillMode and 'primary' themeColor -->
<button id="button" data-role="dropdownbutton" class="k-menu-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="button_buttonmenu" aria-label="User Settings dropdownbutton">
    <span class="k-button-text">User Settings</span>
</button>

<!-- DropDownButton with `flat` fillMode and `primary` themeColor -->
<button id="button" data-role="dropdownbutton" class="k-menu-button k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="button_buttonmenu" aria-label="User Settings dropdownbutton">
    <span class="k-button-text">User Settings</span>
</button>
```

### Rounded

The `rounded` option controls how much border radius is applied to the rendered `button`. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/dropdownbutton/configuration/rounded) option:

- `sm`—Small size.
- `md`—Medium size.
- `lg`—Large size.
- `circle`
- `pill`
- `none`—Unset.

The default `rounded` value is `medium` and it is applied to the button element through the `k-rounded-md` class.

```html
<button id="button" data-role="dropdownbutton" class="k-menu-button k-button k-rounded-md ">
    ...
</button>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the DropDownButton](https://demos.telerik.com/kendo-ui/dropdownbutton/appearance)
* [JavaScript API Reference of the DropDownButton](/api/javascript/ui/dropdownbutton)
