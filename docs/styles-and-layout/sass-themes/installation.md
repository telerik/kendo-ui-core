---
title: Installation
page_title: Installation - Sass Themes
description: "Learn how to set up and configure the Kendo UI Sass themes."
slug: sassbasedthemes_installation_kendoui
position: 2
---

# Installation

Kendo UI provides a set of approaches for installing a Sass theme. 

To get the theme you need, use any of the following possibilities:  

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

The Kendo UI Sass-based themes are hosted on the official [Kendo UI CDN]({% slug kendoui_cdn_services_installation %}). You can include a theme in your project by specifying the theme name in the CDN URL.

The following example showcases how to include the **Default** theme from the CDN:

```html
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />
```

## Using NPM Packages

The Kendo UI Sass-based themes are located on the Progress NPM registry:

* **Kendo UI Default Theme**&mdash;Available as `@progress/kendo-theme-default`.
* **Kendo UI Bootstrap v4 Theme**&mdash;Available as `@progress/kendo-theme-bootstrap`.
* **Kendo UI Material Theme**&mdash;Available as `@progress/kendo-theme-material`.
* **Kendo UI Classic Theme**&mdash;Available as `@progress/kendo-theme-classic`.

To install a theme, use the `npm install` command:

```sh
# Default theme
npm install --save @progress/kendo-theme-default

# Bootstrap theme
npm install --save @progress/kendo-theme-bootstrap

# Material theme
npm install --save @progress/kendo-theme-material
```

To access the Progress NPM registry, active a Telerik account with an active commercial license. For more information on how to access the NPM registry, refer to the [installation instructions for Kendo UI]({% slug kendoui_npm_packages_kendoui_installation %}#kendo-ui-professional).
