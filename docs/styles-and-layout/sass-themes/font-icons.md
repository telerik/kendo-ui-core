---
title: Font Icons
page_title: Font Icons - Sass Themes
description: "Learn more about what icon fonts are and how to define, implement, and render the available Kendo UI Font Icons out of the supported list."
previous_url: /web/icons-web, /styles-and-layout/icons-web
slug: webfonticons_kendoui_desktopwidgets
position: 7
---

# Web Font Icons

As of the R1 2017 release, Kendo UI delivers integrated font icons intended for the web and data visualization widgets of the suite.

> Use one of the SASS themes to make sure all of the icons are displayed correctly. To find out how to install a SASS theme, visit the [installation]({% slug sassbasedthemes_installation_kendoui %}) article.

## List of Font Icons

Visit the [Basic Usage](#basic-usage) section to find out how to display an icon.

You can search for icons by using the browser's default find bar (CTRL + F).

<div class="list-container" style="height: 600px;">
    <iframe src="icons-list.html" class="icons-frame"></iframe>
</div>

## What Are Icon Fonts

Icon fonts are fonts which contain vector glyphs instead of letters and numbers. You can easily style them with CSS by using all styling properties that can be applied to a regular text in a modern browser.

## Why Use Icon Fonts

The utilization of icon fonts in a user interface (UI) naturally succeeds the somehow outdated [icon sprite technique](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Implementing_image_sprites_in_CSS).

Font icons demonstrate significant benefits such as:

* [Improved scalability](#sizes)&mdash;While icon sprites are bitmap raster images and do not scale well, icon fonts use vector graphics, look perfect on retina displays, and make scaling as easy as setting the `font-size` configuration option.
* Improved design capabilities&mdash;You can easily apply CSS effects on the fly by setting the [text color](#colors), shadow, or other options for different interaction states. For example, on `:hover`.
* Improved browser support&mdash;Font icons are browser-agnostic and are supported by all modern browsers.
* Reduced number of HTTP requests&mdash;To load an icon font, you need a maximum of a few HTTP requests.
* Reduced file size&mdash;A 100KB file contains approximately 500 vector icons.

## Basic Usage

To use the Kendo UI font icons:

 1. [Load]({% slug sassbasedthemes_installation_kendoui %}) a Kendo UI theme into your project.
 2. Assign a `k-icon` CSS class followed by a predefined class from the [list of font icons](#list-of-font-icons) to an HTML tag. For example, the `<span>` element as demonstrated in the following example.

    ```dojo
     <span class="k-icon k-i-calendar"></span>
    ```

## Rendering with Unicode Numbers

Though the web icon font comes with a set of predefined CSS classes, you might need to use the icons with a custom CSS class name. To achieve this, set a `:before` pseudo content value for the relevant icon.

```dojo
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

The Kendo UI font icons are designed on a 16px grid base. To achieve a pixel-perfect icon display, scale up by maintaining the 16-unit measure (32, 48, 64, and so on).

You can scale icons by just setting the `font-size` configuration option.

```dojo
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

```dojo
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

```dojo
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
