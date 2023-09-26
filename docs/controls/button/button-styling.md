---
title: Appearance
page_title: jQuery Button Documentation - Appearance
description: "Learn how to apply different styling options to the Button widget."
previous_url: /styles-and-layout/styling-components/button-styling
slug: button_styling_widget
position: 3
---

# Appearance

> As of Kendo UI R1 2022, the Button widget uses brand new rendering.

In this article, you will find information about the new rendering of the Kendo UI Button.

For additional information about the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

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


## Old vs New Rendering

The old rendering of the component consisted of a `button` element with a single class named `k-button`. The `k-button` held all the styling information related to the Button component.

```html
 <!-- OLD -->
<button class='k-button'></button>
```

Currently, styles are divided in multiple class names. Each class is scoped to a single button appearance property:

```html
<!-- NEW -->
<button class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md" >
</button>
```

### Primary Button

The `k-primary` class is substituted with the corresponding `themeColor` class. For example, when `fillMode` is `solid`, that class is `k-button-solid-primary`

```html
 <!-- OLD -->
<button class="k-button k-primary">
        Primary Button
</button>

<button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary">
        Primary Button
</button>
```

### Flat Button

The `k-flat` class is substituted with the corresponding `fillMode` and `themeColor` classes. For example, when `themeColor` is `base` those are: `k-button-flat` and `k-button-flat-base`.

```html
 <!-- OLD -->
<button class="k-button k-primary">
        Flat Button
</button>

<button class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base">
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
<button class="k-button k-button-solid k-button-md k-rounded-md k-button-solid-base">
    <span class="k-button-icon k-icon k-i-folder"></span>
    <span class="k-button-text">Button</span>
</button>

<button class="k-button k-button-solid k-button-md k-rounded-md k-button-solid-base k-icon-button">
    <span class="k-button-icon k-icon k-i-folder"></span>
</button>
```
The following example showcases how to customize the styles of the **Button** with configured icon in both the new, and the old rendering:

```dojo
      <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->      
      <button id="iconTextButton">Filter</button>
      <button id="kendoIconTextButton">Clear Filter</button>
      <button id="iconButton"></button>
      <script>
        $(document).ready(function () {
          $("#iconTextButton").kendoButton({
            icon: "filter"
          });
          $("#kendoIconTextButton").kendoButton({
            icon: "filter-clear"
          });
          $("#iconButton").kendoButton({
            icon: "arrow-rotate-cw"
          });
        });
      </script>
      <style>  
        .k-button .k-button-icon{ /* applies pink background to the icon elements with version 2022 R1 and later; */
          background-color: pink
        }
        
        .k-button.k-button-icon{ /* applies pink background to the entire icon button in version prior to 2022 R1;  */
          background-color: pink
        }
        .k-button.k-icon-button{ /* applies orange border to the entire icon button in 2022 R1 and later; */
          border: 3px solid orange;
        }        
      </style>
```

## Visual Backwards Compatibility

To achieve the same look and feel as the old rendering, you must update the element references.

> When you use a LESS theme, the new styling and rendering supports only the [default options](#options).

A reference to the button element can continue to be obtained through the `k-button` class.

```javascript
$(".k-button") // Returns a reference to the button element in the old and the new rendering.
```

- Change the style of the text in a Button
The color of the text in a Button can be changed using the 'k-button' class with versions prior R1 2022, as well as versions after the rendering has been changed.

```
.k-button{
        color: green
}
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the Button](https://demos.telerik.com/kendo-ui/button/appearance)
* [JavaScript API Reference of the Button](/api/javascript/ui/button)
