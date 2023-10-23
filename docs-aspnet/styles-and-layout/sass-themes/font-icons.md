---
title: Font Icons
page_title: Font Icons
description: "Learn more about what icon fonts are and how to define, implement, and render the available Telerik UI Font Icons out of the supported list."
slug: webfonticons_aspnetmvc6_aspnetmvc
position: 7
---

# Web Font Icons

> As of the 2023 R3 release, the font icons are detached from the [Kendo UI Themes CDN]({% slug cdnservices_core %}). If you use the Kendo UI CDN service to include the Kendo UI theme, to continue using the font icons, add a reference the following stylesheet into your application:
    ```
        <link rel="stylesheet" href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css" />
    ```

With the R1 2017 release, Telerik UI delivers integrated font icons intended for the web and data visualization components of the suite.

>tipTo make sure all the icons are displayed correctly, use one of the SASS themes. For more information on how to install a SASS theme, visit the [installation] ({% slug sassbasedthemes_installation%}) article.

## List of Font Icons

Head to the [Basic Usage](#basic-usage) section to for more information on how to use the icons.

Search for icons by using the browser's search bar (CTRL + F).

<div class="list-container" style="height: 600px;">
    <iframe src="icons-list.html" class="icons-frame"></iframe>
</div>

## What Are Icon Fonts

Icon fonts are fonts that contain vector glyphs instead of letters and numbers. You can style them with CSS by using all properties that can be applied to regular text in a modern browser.

## Why Use Icon Fonts

Using icon fonts in a user interface (UI) naturally succeeds the somehow outdated [icon sprite technique](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Implementing_image_sprites_in_CSS).

Font icons demonstrate significant benefits such as:

* [Improved scalability](#sizes)&mdash;While icon sprites are bitmap raster images and do not scale well, icon fonts use vector graphics, look perfect on retina displays, and make scaling as easy as setting the `font-size` configuration option.
* Improved design capabilities&mdash;You can easily apply CSS effects on the fly by setting the [text color](#colors), shadow, or other options for different interaction states. For example, on `:hover`.
* Improved browser support&mdash;Font icons are browser-agnostic and are supported by all modern browsers.
* Reduced number of HTTP requests&mdash;To load an icon font, you need a maximum of a few HTTP requests.
* Reduced file size&mdash;A 100KB file contains approximately 500 vector icons.

## Basic Usage

To use the Telerik UI font icons:

 1. [Load]({% slug sassbasedthemes_installation %}) a Telerik UI theme into your project.
 2. Assign a `k-icon` CSS class followed by a predefined class from the [list of font icons](#list-of-font-icons) to an HTML tag. For example, the `<span>` element as demonstrated in the following example.

    ```
     <span class="k-icon k-i-calendar"></span>
    ```

## Rendering with Unicode Numbers

Though the web icon font comes with a set of predefined CSS classes, you might need to use the icons with a custom CSS class name. To achieve this, set a `:before` pseudo content value for the relevant icon.

```
<span class="k-icon my-custom-icon-class"></span>
<style>
    .my-custom-icon-class:before {
        content: "\e13a"; /* Adds a glyph using the Unicode character number */
    }
</style>
```

## Visual Adjustments

Icon fonts support the following options for visual enhancement:

* Application of [different sizes](#sizes).
* Application of [icon colors](#colors).
* [Flipping](#flipping) of icons.

### Adjusting the Size

The Telerik UI font icons are designed on a 16px grid base. To achieve a pixel-perfect icon display, scale up by maintaining the 16-unit measure (32, 48, 64, and so on).

You can scale icons by just setting the `font-size` configuration option.

```
<span class="k-icon k-i-gear"></span>
<span class="k-icon k-i-gear k-icon-32"></span>
<span class="k-icon k-i-gear k-icon-48"></span>
<span class="k-icon k-i-gear k-icon-64"></span>
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

```
    <span class="k-icon k-i-gear" style="color: blue;"></span>
    <span class="k-icon k-i-gear colored-icon"></span>
    <style>
        .colored-icon {
            color: green;
        }
    </style>
```

### Applying Flipping

To better accommodate an icon in your application, flip it by using the `k-flip-h` and `k-flip-v` predefined CSS classes.

```
    <span class="k-icon k-i-pencil"></span>
    <span class="k-icon k-i-pencil k-flip-h"></span>
    <span class="k-icon k-i-pencil k-flip-v"></span>
    <span class="k-icon k-i-pencil k-flip-h k-flip-v"></span>
```

<style>
    [data-is-dark='true'] .icons-frame {
        color: #b5c2e3;
        background-color: #11184b;
        border: 2px dashed #1285de;
    }

    .icons-frame {
        width: 100%;
        height: 100%;
        background-color: rgb(248, 248, 248);
        border: 2px dashed rgb(235, 236, 238);
    }
</style>
