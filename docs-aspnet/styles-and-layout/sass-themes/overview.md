---
title: Overview
page_title: Overview
description: "The {{ site.product }} suite comes with a set of built-in themes that you can choose from. Bootstrap and Material themes are also included."
slug: sassbasedthemes_overview
previous_url: /styles-and-layout/sass-themes/installation, /styles-and-layout/sass-themes/browser-support, /styles-and-layout/sass-themes/compatibility, /styles-and-layout/sass-themes/swatches, /styles-and-layout/figma-kits, /styles-and-layout/sass-themes/figma-kits
position: 1
---

# Overview

{{ site.product }} comes with a set of built-in CSS themes that control the visual appearance of the components. Each theme determines the components' colors, borders, backgrounds, size, layout, position, font size, and more.

## Basics

### Theme

A *theme* is a collection of styles in a CSS file, which determine the appearance of the components, including fonts, colors, sizes, and layouts. For example, *Default* and *Bootstrap* are two [built-in theme names](#built-in-themes).

### Swatch

A *theme swatch* is a color variation of a theme. All <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/swatches/" target="_blank">swatches of a given theme</a> use the same fonts, sizes, and layouts. On the other hand, the text colors, background colors and border colors are different. For example, *Default Ocean Blue* and *Bootstrap Nordic* are two built-in swatch names.

When the {{ site.product }} documentation talks about a given theme name, for example *Default*, this implies the *Main* swatch of this theme. In addition, the word "theme" as a general term can imply any swatch of any theme.

The CSS file of any swatch is self-sufficient and contains all required styles for the components, except the optional [font icon styles]({%slug webfonticons_aspnetmvc6_aspnetmvc%}). You can [switch the theme runtime]({%slug howto_changethemeontheclient%}), but the {{ site.framework }} app must always load only one theme at a time.

### Integration with the Telerik Components

The CSS themes represent an external dependency to {{ site.product }}:

* The themes represent a separate product, which is used by multiple Telerik and Kendo UI products. [Each {{ site.product }} version is compatible with specific theme versions](#compatibility-and-maintenance).
* The <a href="https://www.telerik.com/design-system/docs/themes/get-started/introduction/" target="_blank">Telerik and Kendo UI Themes documentation</a> is part of the <a href="https://www.telerik.com/design-system/docs/" target="_blank">Telerik Design System documentation</a>. The content in the {{ site.product }} documentation is introductory or specific only to the Telerik UI components.
* The Telerik and Kendo UI Themes have their own product development, roadmap and strategy. You can log public feature requests or bug reports on the [Telerik Themes feedback portal](https://feedback.telerik.com/themes).

## Built-in Themes

The <a href="https://www.telerik.com/design-system/docs/themes/get-started/introduction/#available-themes" target="_blank">Themes - Get Started page</a> lists the built-in themes in {{ site.product }} and describes their unique specifics.

### Comparing Themes and Swatches

You can explore and compare the built-in theme swatches on the [live {{ site.product }} demos](https://demos.telerik.com/{{ site.platform }}/grid). Use the **Change Theme** dropdown above each component example. To test how the available swatches affect the appearance of the components, you can also check the [ThemeBuilder app](https://themebuilderapp.telerik.com). This tool provides the ability to <a href="https://docs.telerik.com/themebuilder/introduction" target="_blank">customize the existing themes and swatches</a>.

## Using a Theme

To register a theme, you must reference its stylesheet in the `<head>` of the web page. Usually, this is the `_Layout.cshtml` file.

There are two ways to load a Telerik theme, in terms of physical CSS file location.

* Load a CSS theme as a local file in the `wwwroot` folder in the app. This option is relevant to the following cases:
    * When using themes from the {{ site.product }} [MSI installer]({%slug msi_install_aspnetmvc6_aspnetmvc%}) or [ZIP archive]({%slug using_local_client_side_resources%}). The CSS files are in the `styles` folder.
    * When using <a href="https://www.telerik.com/design-system/docs/themes/get-started/installation/" target="_blank">NPM</a> to install a specific Telerik theme version.
    * When using [custom themes]({%slug sassbasedthemes_customization_telerikui%}).
* Load a CSS theme from a remote URL, for example, CDN. The dedicated <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/" target="_blank">documentation of each theme provides a list of swatches and their URLs</a>.

> The {{ site.framework }} app must load only one Telerik theme file at a time. Upgrade the theme with every {{ site.product }} version upgrade.

## Compatibility and Maintenance

The Telerik themes are decoupled from the Telerik UI components, which leads to the following usage requirements:

* When using a CSS theme as local file in `wwwroot`, [replace the file every time you change the {{ site.product }} version]({%slug upgrade_aspnetcore%}). This includes apps [created with the {{ site.product }} Visual Studio extension without CDN support]({%slug convertprojectwizard_visualstudio_aspnetcore%}#project-settings).

>If you have an older version of the Telerik Extensions for Visual Studio and you want to create a new {{ site.product }} project with version 2023.1.314 (R1 2023 SP1), or a newer version of the components, you must first update the Telerik Extension. To download and install the latest version of the Telerik Extensions, follow the [Installing from Visual Studio Marketplace]({% slug overview_visualstudio_aspnetcore %}#installing-from-visual-studio-marketplace) instructions.

* When loading <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/swatches/" target="_blank">theme swatches</a> from a CDN, make sure that the theme version is compatible with the {{ site.product }} version. Our {% if site.core %}[release notes](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history){% else %}[release notes](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history){% endif %} provide theme compatibility information for each components version. You can also use a <a href="https://www.telerik.com/design-system/docs/themes/get-started/changelog/" target="_blank">newer minor theme version</a>, which doesn't contain breaking changes. In other words, the latest major theme version may be still incompatible with the latest version of {{ site.product }}.

## Next Steps

* [Modify a built-in theme or create a custom theme]({%slug sassbasedthemes_customization_telerikui%})
* [Explore the Telerik and Kendo UI Kits for Figma](https://www.telerik.com/design-system/docs/resources/figma-ui-kits/)

## See Also

* [Change the Theme at Runtime]({%slug howto_changethemeontheclient%})
* <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/swatches/#ocean-blue-accessibility-swatch" target="_blank">Default Ocean Blue Accessibility Swatch</a>
* [Live UI for Blazor Demos](https://demos.telerik.com/{{ site.platform }}/)