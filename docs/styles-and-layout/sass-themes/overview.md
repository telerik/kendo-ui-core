---
title: Overview
page_title: Overview - Sass Themes
description: "Learn about the overall idea of the Kendo UI Sass themes."
previous_url: /themebuilder_overview_kendouistyling, /styles-and-layout/sass-themes, /styles-and-layout/sass-themes/installation, /styles-and-layout/sass-themes/browser-support, /styles-and-layout/sass-themes/swatches, /styles-and-layout/sass-themes/figma-kits
slug: sassbasedthemes_kendoui
position: 1
---

# Sass Themes Overview

Kendo UI for jQuery comes with a set of built-in CSS themes that control the visual appearance of the components. Each theme determines the components' colors, borders, backgrounds, size, layout, position, font size, and more.

A *theme* is a collection of styles in a CSS file, which determine the appearance of the components, including fonts, colors, sizes, and layouts. For example, *Default* and *Bootstrap* are two [built-in theme names](#built-in-themes).

## Swatch

A *theme swatch* is a color variation of a theme. All <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/swatches/" target="_blank">swatches of a given theme</a> use the same fonts, sizes, and layouts. On the other hand, the text colors, background colors and border colors are different. For example, *Default Ocean Blue* and *Bootstrap Nordic* are two built-in swatch names.

When the Kendo UI documentation talks about a given theme name, for example *Default*, this implies the *Main* swatch of this theme. In addition, the word "theme" as a general term can imply any swatch of any theme.

The CSS file of any swatch is self-sufficient and contains all required styles for the components, except the optional [font icon styles]({%slug webfonticons_migration_kendoui_desktopwidgets%}). The Kendo app must always load only one theme at a time.

## Integration with the Kendo UI Components

The CSS themes represent an external dependency to Kendo UI for jQuery:

* The themes represent a separate product, which is used by multiple Telerik and Kendo UI products. [Each Kendo UI for jQuery version is compatible with specific theme versions](#compatibility-and-maintenance).
* The <a href="https://www.telerik.com/design-system/docs/themes/get-started/introduction/" target="_blank">Telerik and Kendo UI Themes documentation</a> is part of the <a href="https://www.telerik.com/design-system/docs/" target="_blank">Telerik Design System documentation</a>. The content in the Kendo UI for jQuery documentation is introductory or specific only to the Telerik UI components.
* The Telerik and Kendo UI Themes have their own product development, roadmap and strategy. You can log public feature requests or bug reports on the [Telerik Themes feedback portal](https://feedback.telerik.com/themes).

## Built-in Themes

The <a href="https://www.telerik.com/design-system/docs/themes/get-started/introduction/#available-themes" target="_blank">Themes - Get Started page</a> lists the built-in themes in Kendo UI for jQuery and describes their unique specifics.

### Comparing Themes and Swatches

You can explore and compare the built-in theme swatches on the [live Kendo UI for jQuery demos](https://demos.telerik.com/kendo-ui/grid). Use the **Change Theme** dropdown above each component example. To test how the available swatches affect the appearance of the components, you can also check the [ThemeBuilder app](https://themebuilderapp.telerik.com). This tool provides the ability to <a href="https://docs.telerik.com/themebuilder/introduction" target="_blank">customize the existing themes and swatches</a>.

## Using a Theme

To register a theme, you must reference its stylesheet in the `<head>` of the web page.

There are two ways to load a Kendo UI theme, in terms of physical CSS file location.

* Load a CSS theme as a local file in the root of the application or in the main scripts folder. This option is relevant to the following cases:
    * When using themes from the Kendo UI for jQuery [Bower package]({%slug kendoui_bower_packages_kendoui_installation%}) or [NuGet .NET package](https://docs.telerik.com/kendo-ui/intro/installation/nuget-install#3-install-the-packages) or [ZIP archive](https://docs.telerik.com/kendo-ui/intro/first-steps#1-download-the-controls). The CSS files are in the `styles` folder.
    * When using <a href="https://www.telerik.com/design-system/docs/themes/get-started/installation/" target="_blank">NPM</a> to install a specific Kendo UI theme version.
    * When using [custom themes]({%slug sassbasedthemes_customization_kendoui%}).
* Load a CSS theme from a remote URL, for example, CDN. The dedicated <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/" target="_blank">documentation of each theme provides a list of swatches and their URLs</a>.

> The Kendo UI for jQuery app must load only one Kendo UI theme file at a time. Upgrade the theme with every Kendo UI version upgrade.

## Compatibility and Maintenance

The Kendo UI themes are decoupled from the Kendo UI components, which leads to the following usage requirements:

* When using a CSS theme as local file, replace the file every time you change the Kendo UI version.

* When loading <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/swatches/" target="_blank">theme swatches</a> from a CDN, make sure that the theme version is compatible with the Kendo UI for jQuery version. Our [release notes](https://www.telerik.com/support/whats-new/kendo-ui/release-history#jquery-release-history) provide theme compatibility information for each components version. You can also use a <a href="https://www.telerik.com/design-system/docs/themes/get-started/changelog/" target="_blank">newer minor theme version</a>, which doesn't contain breaking changes. In other words, the latest major theme version may be still incompatible with the latest version of Kendo UI.

## Next Steps

* [Modify a built-in theme or create a custom theme]({%slug sassbasedthemes_customization_kendoui%})
* [Explore the Telerik and Kendo UI Kits for Figma](https://www.telerik.com/design-system/docs/resources/figma-ui-kits/)

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
* [Kendo UI Demos](https://demos.telerik.com/kendo-ui/)
