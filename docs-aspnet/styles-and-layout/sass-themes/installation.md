---
title: Installation
page_title: Installation
description: "Learn how to set up and configure the Kendo UI Sass themes for {{ site.product }}."
slug: sassbasedthemes_installation
position: 2
---

# Installation

To get the Sass-based Kendo UI themes for {{ site.framework }}, you can:

* [Use the pre-built CSS files](#using-the-pre-built-css).
* [Use the Kendo UI CDN](#using-the-kendo-ui-cdn).
* [Use the NPM packages](#using-npm-packages).

## Using Pre-Built CSS

To get a complete theme by using its pre-built CSS files, apply either of the following approaches:

- Use the CSS files that are shipped with the Kendo UI distribution. For example, the **Default** theme is distributed as `styles/default-main.css`.

  ```html
  <link rel="stylesheet" href="pathToLocalFile/styles/default-main.css" />
  ```

- Use the NPM package which contains a pre-built `dist/all.css` CSS file for the theme. For more information on how to obtain the NPM package, refer to the following [section on using NPM packages](#using-npm-packages).

## Using the Kendo UI CDN

The Kendo UI Sass-based themes are hosted on the official [Kendo UI CDN](https://docs.telerik.com/kendo-ui/intro/installation/cdn-service). You can include a theme in your project by specifying the theme name in the CDN url.

The following example showcases how to include the **Default** theme from the CDN:

```html
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />
```

## Using NPM Packages

The Kendo UI Sass-based themes are located on the Progress NPM registry:

* **Kendo UI Default Theme**&mdash;Available as @progress/kendo-theme-default.
* **Kendo UI Bootstrap v4 Theme**&mdash;Available as @progress/kendo-theme-bootstrap.
* **Kendo UI Material Theme**&mdash;Available as @progress/kendo-theme-material.
* **Kendo UI Classic Theme**&mdash;Available as @progress/kendo-theme-classic.

To access the Progress NPM registry, you need an active Telerik account with an active commercial license. For more information on how to access the NPM registry, refer to the [installation instructions for Kendo UI Professional](https://docs.telerik.com/kendo-ui/intro/installation/npm).

## Using the Build Process of the Application

[This article](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/customization#using-the-build-process-of-the-application) is representing the approach of how to customize a Sass-based theme and consume the theme package.

{% if site.core %}
## [Adding Client-Side Resources through LibMan](https://docs.telerik.com/aspnet-core/installation/adding-client-side-resources/using-libman#adding-client-side-resources-through-libman)

{% endif %}

## See Also

* [Sass themes overview]({% slug sassbasedthemes_overview %})
* [Sass theme builder]({% slug sass_theme_builder %})