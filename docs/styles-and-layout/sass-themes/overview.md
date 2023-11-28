---
title: Overview
page_title: Overview - Sass Themes
description: "Learn about the overall idea of the Kendo UI Sass themes."
previous_url: /themebuilder_overview_kendouistyling, /styles-and-layout/sass-themes
slug: sassbasedthemes_kendoui
position: 1
---

# Sass Themes Overview

As of the R1 2017 release, the Kendo UI distribution includes Sass-based themes.

Currently, Kendo UI delivers the following Sass themes:

* Kendo UI Default&mdash;The latest update of the Kendo UI Default theme.
* Kendo UI Bootstrap &mdash;To achieve similarity with the Bootstrap look and feel, the theme has linked variables to Bootstrap. This means that customizing the original Bootstrap theme will affect the Kendo UI theme as well.
* Kendo UI Material&mdash;An update of the Kendo UI Material Theme to closely implement the [Material Design Guidelines](https://material.io/design/).
* Kendo UI Classic&mdash;An SCSS-based variant of the Less Default theme.
* Kendo UI Fluent&mdash;Implements the look and feel of [Microsoft Fluent UI](https://developer.microsoft.com/en-us/fluentui#/).

## Less- vs. Sass-Based Themes

> R1 2023 is the last official release of Kendo jQuery, where Less Themes are supported and shipped with the product.

The Sass-based themes are different from the Less-based ones as they are written in a different language. This article outlines those differences and demonstrates how to use the Sass-based themes.

In Kendo UI, the Sass-based themes demonstrate the following differences from the Less-based ones:
- Each Sass-based theme is represented by a single CSS file that combines the layout and the themes of the components. As a result, you do not need to match a theme with its common file.
- Based on the component you work with, the Sass-based themes can build a part of the component theme in a similar way the Download Builder trims unused scripts.
- The Sass-based themes are available on NPM. Each theme is stored as an NPM package and can be upgraded as such.
- Each Sass-based theme is compatible with the [Kendo UI components for Angular](https://www.telerik.com/kendo-angular-ui/). This enables you to port parts of your application to Angular 2 while maintaining their styling.

## Contribution

To contribute to the development of the Kendo UI Default Theme, refer to the [telerik/kendo-themes](https://github.com/telerik/kendo-themes) GitHub repository it is stored in.

## See Also

* [Less Themes Overview]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
