---
title: Appearance
page_title: jQuery SplitButton Documentation - Appearance
description: "Learn how to apply different styling options to the SplitButton widget."
slug: appearance_kendoui_splitbutton_widget
position: 3
---

# Appearance

In this article, you will find information about the rendering and styling options of the Kendo UI SplitButton.

For general information regarding the rendering, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the SplitButton](https://demos.telerik.com/kendo-ui/splitbutton/appearance).

## Options

The Kendo UI SplitButton supports the following styling options:

- [`size`](#size)—Configures the overall size of the component.
- [`themeColor`](#themecolor)—Configures what color will be applied to the component.
- [`fillMode`](#fillmode)—Configures how the color is applied to the component.
- [`rounded`](#rounded)—Configures the border radius of the component.

### Size

The `size` option controls how big or small the rendered `button` looks. The structure of the class is `k-button-{size}`.

The following values are available for the [`size`](/api/javascript/ui/splitbutton/configuration/size) option:

- `sm`—Small size.
- `md`—Medium size.
- `lg`—Large size.
- `none`—Unset.

The default size value is `medium` and it is applied to the button element through the `k-button-md` class.

```html

<div id="splitButton_wrapper" class="k-split-button k-button-group k-rounded-md">
    <button type="button" id="splitButton" data-role="splitbutton" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" aria-label="Plus splitbutton">
        <span class="k-icon k-i-plus k-button-icon"></span>
        <span class="k-button-text">Plus</span>
    </button>
    <button tabindex="-1" aria-label="arrow-button" class="k-split-button-arrow k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button" type="button">
        <span class="k-icon k-i-arrow-s k-button-icon"></span>
        </button>
</div>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered `button`. The structure of the class is `k-button-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/splitbutton/configuration/fillmode) option:

- `solid`
- `outline`
- `flat`
- `link`
- `none`

The default `fillMode` value is `solid` and it is applied to the button element through the `k-button-solid` class.

```html
<div id="splitButton_wrapper" class="k-split-button k-button-group k-rounded-md">
    <button class="k-button k-button-solid" >
        ...
    </button>
    <button tabindex="-1" aria-label="arrow-button" class="k-split-button-arrow k-button-solid k-button-solid-base k-icon-button" type="button">
        ...
    </button>
</div>
```

### ThemeColor

As applying `themeColor` is closely related to the `fillMode`, the structure of the class name for the `themeColor` is a composite `k-button-{fillMode}-{themeColor}` setting.

The following values are available for the [`themeColor`](/api/javascript/ui/splitbutton/configuration/themecolor) option:

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

The default `themeColor` value is `base`. A button with default `fillMode` and `themeColor` will have the `k-button-solid-base` class applied.

```html
<!-- SplitButton with default fillMode and themeColor -->
<div id="splitButton_wrapper" class="k-split-button k-button-group k-rounded-md">
    <button id="button" data-role="splitbutton" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="button_buttonmenu" aria-label="Button splitbutton">
        <span class="k-icon k-i-paste k-button-icon"></span>
        <span class="k-button-text">Button</span>
    </button>
    <button tabindex="-1" aria-label="arrow-button" class="k-split-button-arrow k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button" type="button">
        <span class="k-icon k-i-arrow-s k-button-icon"></span>
    </button>
</div>    

<!-- SplitButton with default fillMode and 'primary' themeColor -->
<div id="splitButton_wrapper" class="k-split-button k-button-group k-rounded-md">
    <button id="button" data-role="splitbutton" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="button_buttonmenu" aria-label="Button splitbutton">
        <span class="k-icon k-i-paste k-button-icon"></span>
        <span class="k-button-text">Button</span>
    </button>
    <button tabindex="-1" aria-label="arrow-button" class="k-split-button-arrow k-button k-icon-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" type="button">
        <span class="k-icon k-i-arrow-s k-button-icon"></span>
    </button>
</div>

<!-- SplitButton with `flat` fillMode and `primary` themeColor -->
<div id="splitButton_wrapper" class="k-split-button k-button-group k-rounded-md">
    <button id="button" data-role="splitbutton" class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="button_buttonmenu" aria-label="Button splitbutton">
        <span class="k-icon k-i-paste k-button-icon"></span>
        <span class="k-button-text">Button</span>
    </button>
    <button tabindex="-1" aria-label="arrow-button" class="k-split-button-arrow k-button k-icon-button k-button-md k-rounded-md k-button-flat k-button-flat-primary" type="button">
        <span class="k-icon k-i-arrow-s k-button-icon"></span>
</button>
</div>
```

### Rounded

The `rounded` option controls how much border radius is applied to the rendered `button`. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/splitbutton/configuration/rounded) option:

- `sm`—Small size.
- `md`—Medium size.
- `lg`—Large size.
- `circle`
- `pill`
- `none`—Unset.

The default rounded value is `medium` and it is applied to the button element through the `k-rounded-md` class.

```html
<div id="splitButton_wrapper" class="k-split-button k-button-group k-rounded-md">
    <button id="button" data-role="splitbutton" class="k-button k-rounded-md">
        ...
    </button>
    <button class="k-split-button-arrow k-button k-icon-button k-rounded-md" type="button">
        ...
    </button>
</div>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the SplitButton](https://demos.telerik.com/kendo-ui/splitbutton/appearance)
* [JavaScript API Reference of the SplitButton](/api/javascript/ui/splitbutton)
