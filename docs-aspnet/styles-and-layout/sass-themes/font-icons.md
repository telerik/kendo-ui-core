---
title: Font Icons
page_title: Font Icons
description: "Learn more about what icon fonts are and how to define, implement, and render the available Telerik UI Font Icons out of the supported list."
slug: webfonticons_aspnetmvc6_aspnetmvc
position: 7
---

# Font Icons

> As of the 2023 R3 release, the font icons are detached from the [Kendo UI Themes CDN]({% slug cdnservices_core %}). If you use the Kendo UI CDN service to include the Kendo UI theme, to continue using the font icons, add a reference the following stylesheet into your application:

```HTML
<link rel="stylesheet" href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css" />
```

With the R1 2017 release, Telerik UI delivers integrated font icons intended for the web and data visualization components of the suite.

> To ensure that all icons are displayed correctly, use one of the available [built-in themes]({% slug sassbasedthemes_overview%}).

## What Are Icon Fonts

Icon fonts are fonts that contain vector glyphs instead of letters and numbers. You can style them with CSS by using all properties that can be applied to regular text in a modern browser.

## Why Use Icon Fonts

Using icon fonts in a user interface (UI) naturally succeeds the outdated [icon sprite technique](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Implementing_image_sprites_in_CSS).

Font icons demonstrate significant benefits such as:

* Improved scalability&mdash;While icon sprites are bitmap raster images and do not scale well, icon fonts use vector graphics, look perfect on retina displays, and make scaling as convenient as setting the `font-size` configuration option.
* Improved design capabilities&mdash;You can apply CSS effects on the fly by setting the text color, shadow, or other options for different interaction states. For example, on `:hover`.
* Improved browser support&mdash;Font icons are browser-agnostic and are supported by all modern browsers.
* Reduced number of HTTP requests&mdash;To load an icon font, you need a maximum of a few HTTP requests.
* Reduced file size&mdash;A 100KB file contains around 500 vector icons.

## Basic Usage

To use the Telerik UI font icons:

 1. [Include a Telerik UI theme]({% slug sassbasedthemes_overview %}#using-a-theme) into your project.
 2. If you use the Kendo UI CDN service to include the theme, register the font icon stylesheet.
 3. Assign a `k-font-icon` CSS class followed by a predefined class from the [list of font icons](#icons-list) to an HTML tag. For example, a the `<span>` element.

 The following example demonstrates how to render a font calendar icon.
 ```HTML
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />
    <link rel="stylesheet" href="https://unpkg.com/@@progress/kendo-font-icons/dist/index.css" />

    <span class="k-icon k-font-icon k-i-calendar"></span>
 ```

@[template](/_contentTemplates/icons-list-section.md#icons-list-section)

## Rendering with Unicode Numbers

Though the web icon font comes with a set of predefined CSS classes, you will need to use the icons with a custom CSS class name. To achieve this, set a `:before` pseudo content value for the relevant icon.

```HTML
<span class="k-icon k-font-icon my-custom-icon-class"></span>
<style>
    .my-custom-icon-class:before {
        content: "\e13a"; /* Adds a glyph using the Unicode character number */
    }
</style>
```

## Visual Adjustments

Icon fonts support the following options for visual enhancement:

* Application of [different sizes](#adjusting-the-size).
* Application of [icon colors](#adjusting-the-colors).
* [Flipping](#applying-flipping) of icons.

### Adjusting the Size

The Telerik UI font icons are designed on a 16px grid base. To achieve a pixel-perfect icon display, scale up by maintaining the 16-unit measure (32, 48, 64, and so on).

You can scale icons by setting the `font-size` configuration option.

```HTML
<span class="k-icon k-font-icon k-i-gear"></span>
<span class="k-icon k-font-icon k-i-gear k-icon-32"></span>
<span class="k-icon k-font-icon k-i-gear k-icon-48"></span>
<span class="k-icon k-font-icon k-i-gear k-icon-64"></span>
<style>
    .k-icon-32 {
        font-size: 32px; /* Sets icon size to 32px */
    }
    .k-icon-48 {
        font-size: 48px; /* Sets icon size to 48px */
    }
    .k-icon-64 {
        font-size: 64px; /* Sets icon size to 64px */
    }
</style>
```

### Adjusting the Colors

To set the icon color, use the `color` CSS property.

```HTML
    <span class="k-icon k-font-icon k-i-gear" style="color: blue;"></span>
    <span class="k-icon k-font-icon k-i-gear colored-icon"></span>
    <style>
        .colored-icon {
            color: green;
        }
    </style>
```

### Applying Flipping

To conveniently accommodate an icon in your application, flip it by using the `k-flip-h` and `k-flip-v` predefined CSS classes.

```HTML
    <span class="k-icon k-font-icon k-i-pencil"></span>
    <span class="k-icon k-font-icon k-i-pencil k-flip-h"></span>
    <span class="k-icon k-font-icon k-i-pencil k-flip-v"></span>
    <span class="k-icon k-font-icon k-i-pencil k-flip-h k-flip-v"></span>
```
