---
title: Appearance
page_title: "{{ site.framework }} Button Documentation - Button Appearance"
description: "Learn how to customize the appearance of the Telerik UI Button HtmlHelper for {{ site.framework }}."
slug: button_appearance
position: 2
---

# Button Appearance

> As of the R1 2022 release, the Button uses a brand new rendering.

In this article, you will find information about the new rendering of the {{ site.product }} Button.

For additional information regarding the decision behind these changes, visit the [Components Rendering](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview) article.

For a complete example, refer to the [Appearance Demo of the Button](https://demos.telerik.com/{{ site.platform }}/button/appearance).

## Options

The Button HtmlHelper provides the following methods for styling:

- [`Size()`](#size)—configures the overall size of the component.
- [`ThemeColor()`](#themecolor)—configures what color will be applied to the component.
- [`FillMode()`](#fillmode)—defines how the color is applied to the Button.
- [`Rounded()`](#rounded)—determines the border radius of the component.

### Size

To control the size of the Button, configure the `Size` option with any of the following values:

- `Small`
- `Medium` - the default size
- `Large`
- `None`

```HtmlHelper
@(Html.Kendo().Button()
    .Name("textButton")
    .Size(ComponentSize.Medium)
    .HtmlAttributes( new {type = "button"} )
    .Content("Text Button")
)
```
{% if site.core %}
```TagHelper
<kendo-button name="textButton"
              size="ComponentSize.Medium">
    Text Button
</kendo-button>
```
{% endif %}

### FillMode

The `FillMode()` method specifies how the color is applied to the component. The default Button fill mode is `Solid`.

```HtmlHelper
@(Html.Kendo().Button()
    .Name("textButton")
    .FillMode(ButtonFillMode.Solid)
    .HtmlAttributes( new {type = "button"} )
    .Content("Text Button")
)
```
{% if site.core %}
```TagHelper
<kendo-button name="textButton"
              fill-mode="ButtonFillMode.Solid">
    Text Button
</kendo-button>
```
{% endif %}

The following options are available for the `FillMode` configuration:

- `Solid`
- `Outline`
- `Flat`
- `Link`
- `None`

### ThemeColor

The `ThemeColor` configuration provides a variety of colors that can be applied to the Button. The available options are:

- `Base`
- `Primary`
- `Secondary`
- `Tertiary`
- `Info`
- `Success`
- `Warning`
- `Error`
- `Dark`
- `Light`
- `Inverse`

The default `ThemeColor` is `Base`.

```HtmlHelper
@(Html.Kendo().Button()
    .Name("textButton")
    .ThemeColor(ThemeColor.Base)
    .HtmlAttributes( new {type = "button"} )
    .Content("Text Button")
)
```
{% if site.core %}
```TagHelper
<kendo-button name="textButton"
              theme-color="ThemeColor.Base">
    Text Button
</kendo-button>
```
{% endif %}

### Rounded

The border radius of the Button can be customized through the `Rounded()` method. The default option is `Medium`.

```HtmlHelper
@(Html.Kendo().Button()
    .Name("textButton")
    .Rounded(ButtonRounded.Medium)
    .HtmlAttributes( new {type = "button"} )
    .Content("Text Button")
)
```
{% if site.core %}
```TagHelper
<kendo-button name="textButton"
              rounded="Rounded.Medium">
    Text Button
</kendo-button>
```
{% endif %}

The following values are available for the `Rounded` option:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`


## Old vs New Rendering

The old rendering of the component consisted of a `button` element with a single class named `k-button`. The `k-button` held all the styling information related to the Button component.

```html
 <!-- OLD -->
<button class='k-button'></button>
```

Currently, styles are split in multiple class names. Each class is scoped to a single button appearance property:

```html
<!-- NEW -->
<button class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md" >
</button>
```

### Primary Button

The `k-primary` class is substituted with the appropriate `ThemeColor` class. For example, when `FillMode` is `Solid`, that class is `k-button-solid-primary`.

```html
 <!-- OLD -->
<button class="k-button k-primary">
        Primary Button
</button>

<!-- NEW -->
<button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary">
        Primary Button
</button>
```

### Flat Button

The `k-flat` class is substituted with the appropriate `FillMode` and `ThemeColor` classes. For example, when `ThemeColor` is `Base` those are: `k-button-flat` and `k-button-flat-base`.

```html
 <!-- OLD -->
<button class="k-button k-primary">
        Flat Button
</button>

<!-- NEW -->
<button class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base">
        Flat Button
</button>
```

### Button with Icon

With the old rendering, the `k-button-icon` class was used for the Buttons with icons. The `k-button-icon` class is now used on the icon element itself. In case the button contains only an icon and no text, the `k-icon-button` is used for the `button` element. The `k-button-icontext` class is removed.


```OLD
<button class="k-button k-button-icontext">
        <span class=" k-icon k-i-folder"></span>
        Button
</button>

<button class="k-button k-button-icon">
        <span class="k-icon k-i-folder"></span>
</button>
```

```NEW
<button class="k-button k-button-solid k-button-md k-rounded-md k-button-solid-base">
    <span class="k-button-icon k-icon k-i-folder"></span>
    <span class="k-button-text">Button</span>
</button>

<button class="k-button k-button-solid k-button-md k-rounded-md k-button-solid-base k-icon-button">
    <span class="k-button-icon k-icon k-i-folder"></span>
</button>
```


## Visual Backwards Compatibility

To achieve the same look and feel as the old rendering, the references of the element must be updated. Visit the [CSS Classes Migration](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview#css-classes-migration) and [JQuery Selectors Migration](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview#jquery-selectors-migration) sections of the [Components Rendering](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview) article for additional information.

> The new styling and rendering supports only the [default options](#options) when a LESS theme is used.

A reference to the button element still can be obtained through the `k-button` class.

```javascript
$(".k-button") // Returns a reference to the button element in the old and the new rendering.
```

The following example showcases how to customize the styles of the **Button** with configured icon in both the new, and the old rendering:

```
      <style>  
        .k-button .k-button-icon{ /* applies pink background to the icon elements with version 2022 R1 and later; applies pink background to the entire icon button in version prior to 2022 R1; */
          background-color: pink
        }
        .k-button.k-icon-button{ /* applies ornage border to the entire icon button in 2022 R1 and later; */
          border: 3px solid orange;
        }        
      </style>
```

## See Also

* [Appearance of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/appearance)
* [Button Server-Side API](/api/button)
* [Button Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/button)


