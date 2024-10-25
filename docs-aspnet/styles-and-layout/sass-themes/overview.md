---
title: Overview
page_title: Overview
description: "Learn about the overall idea of the Kendo UI Sass themes in {{ site.product }} applications."
slug: sassbasedthemes_overview
position: 1
---

# Overview

As of the R1 2017 release, the Kendo UI for {{ site.framework }} distribution includes Sass-based themes.

Currently, Kendo UI for {{ site.framework }} delivers the following Sass themes:

* Kendo UI Default&mdash;The latest update of the Kendo UI Default theme.
* Kendo UI Bootstrap&mdash;To achieve similarity with the Bootstrap look and feel, the theme has linked variables to Bootstrap. This means that customizing the original Bootstrap theme will affect the Kendo UI theme as well.
* Kendo UI Material&mdash;An update of the Kendo UI Material Theme to closely implement the [Material Design Guidelines](https://material.io/design/).
* Kendo UI Classic&mdash;An SCSS-based variant of the Less Default theme.
* Kendo UI Fluent&mdash;Implements the look and feel of [Microsoft Fluent UI](https://developer.microsoft.com/en-us/fluentui#/).

>If you have an older version of the Telerik Extensions for Visual Studio and you want to create a new {{ site.product }} project with version 2023.1.314 (R1 2023 SP1), or a newer version of the components, you must first update the Telerik Extension. To download and install the latest version of the Telerik Extensions, follow the [Installing from Visual Studio Marketplace]({% slug overview_visualstudio_aspnetcore %}#installing-from-visual-studio-marketplace) instructions.

## Less- vs. Sass-Based Themes

> R1 2023 is the last official release of Telerik UI for {{ site.framework }}, where LESS Themes are supported and shipped with the product.

Apart from being written in a different language, the Sass-based themes are slightly different from the Less-based ones. This article outlines those differences and demonstrates how to use the Sass-based themes.

In Kendo UI, the Sass-based themes demonstrate the following differences from the Less-based ones:
- Each Sass-based theme is represented by a single CSS file that combines the layout and the themes of the components. As a result, you do not need to match a theme with its common file.
- Based on the widget you work with, the Sass-based themes can build a part of the widget theme in a similar way the Download Builder trims unused scripts.
- The Sass-based themes are available on NPM. Each theme is stored as an NPM package and can be easily upgraded.
- Each Sass-based theme is compatible with the [Kendo UI components for Angular](https://www.telerik.com/kendo-angular-ui/). This enables you to port parts of your application to Angular 2 while maintaining their styling.

## Contribution

To contribute to the development of the Kendo UI Default Theme, refer to the [telerik/kendo-themes](https://github.com/telerik/kendo-themes) GitHub repository it is stored in.

## See Also

* [Sass themes installation]({% slug sassbasedthemes_installation %})
* [Sass theme builder]({% slug sass_theme_builder %})
