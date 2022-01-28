---
title: Styling
page_title: jQuery Button Documentation | Button Styling
description: "Learn how to apply different styling options to the Button widget."
slug: button_styling_widget
position: 2
---

# Button Styling

> As of Kendo UI R1 2022, the Button widget uses brand new rendering.

In this article, you will find information about the new rendering of the Kendo UI Button.

For additional information regarding the decision behind these changes, visit the [Styling Components]({% slug components_rendering_overview %}) article.

For a live example, visit the [Styling Demo of the Button](https://demos.telerik.com/kendo-ui/button/styling).

## Options

The Kendo UI Button supports the following styling options:

- [`shape`](#shape)—configures the shape of the component.
- [`size`](#size)—configures the overall size of the component.
- [`themeColor`](#themecolor)—configures what color will be applied to the component.
- [`fillMode`](#fillmode)—configures how the color is applied to the component.
- [`rounded`](#rounded)—configures the border radius of the component.


### Shape

The `square` option controls if the Button has square shape or not. The structure of the class is `k-button-{shape}`.

The following values are available for the [`shape`](/api/javascript/ui/button/configuration/shape) option:

- `rectangle`
- `square`

By default, the Button will have a rectangular shape. The default shape will be applied to the button element through the `k-button-rectangle` class.

```html
<button class="k-button k-button-rectangle" >
</button>
```

### Size

The `size` option controls how big or small the rendered `button` looks. The structure of the class is `k-button-{size}`.

The following values are available for the [`size`](/api/javascript/ui/button/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size

The default size value is `medium` and it is applied to the button element through the `k-button-md` class.

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

The default fillMode value is `solid` and it is applied to the button element through the `k-button-solid` class.

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

The `rounded` option controls how much border radius is applied to the rendered `button`. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/button/configuration/rounded) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `circle`
- `pill`

The default rounded value is `medium` and it is applied to the button element through the `k-rounded-md` class.

```html
<button class="k-button k-rounded-md" >
</button>
```


## Old vs New Rendering

The old rendering of the component consisted of a `button` element with a single class named `k-button`. The `k-button` held all the styling information related to the Button component. 

```html
 <!-- OLD -->
<button class='k-button'></button>
```

Currently, styles are split in multiple class names. Each class is scoped to a single button appearance property:

```html
<!-- NEW -->
<button class="k-button k-button-solid-base k-button-solid k-button-rectangle k-button-md k-rounded-md" >
</button>
```

### Primary Button

The `k-primary` class is substituted with the appropriate `themeColor` class. For example, when `fillMode` is `solid`, that class is `k-button-solid-primary`

```html
 <!-- OLD -->
<button class="k-button k-primary">        
        Primary Button
</button>

<button class="k-button k-button-md k-button-rectangle k-rounded-md k-button-solid k-button-solid-primary">
        Primary Button
</button>
```

### Flat Button

The `k-flat` class is substituted with the appropriate `fillMode` and `themeColor` classes. For example, when `themeColor` is `base` those are: `k-button-flat` and `k-button-flat-base`.

```html
 <!-- OLD -->
<button class="k-button k-primary">        
        Flat Button
</button>

<button class="k-button k-button-md k-button-rectangle k-rounded-md k-button-flat k-button-flat-base">
        Flat Button
</button>
```


### Button with Icon

With the old rendering, the `k-button-icon` class was used for the Buttons with icons. The `k-button-icon` class is now used on the icon element itself. In case the button contains only an icon and no text, the `k-icon-button` is used for the `button` element. The `k-button-icontext` class is removed.


```html
 <!-- OLD -->
<button class="k-button k-button-icontext">
        <span class=" k-icon k-i-folder"></span>
        Button
</button>

<button class="k-button k-button-icon">
        <span class="k-icon k-i-folder"></span>
</button>
```

```html
<!-- NEW -->
<button class="k-button k-button-solid k-button-md k-button-rectangle k-rounded-md k-button-solid-base">
    <span class="k-button-icon k-icon k-i-folder"></span>
    <span class="k-button-text">Button</span>
</button>

<button class="k-button k-button-solid k-button-md k-button-rectangle k-rounded-md k-button-solid-base k-icon-button">
    <span class="k-button-icon k-icon k-i-folder"></span>
</button>
```


## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

> The new styling and rendering supports only the [default options](#options) when a LESS theme is used.

A reference to the button element still can be obtained through the `k-button` class.

```javascript
$(".k-button") // Returns a reference to the button element in the old and the new rendering.
```

## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Styling Demo of the Button](https://demos.telerik.com/kendo-ui/button/styling)
* [JavaScript API Reference of the Button](/api/javascript/ui/button)
