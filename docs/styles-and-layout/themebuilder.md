---
title: ThemeBuilder Overview
page_title: ThemeBuilder Overview | Kendo UI Styles and Appearance
description: "Learn how to modify the Kendo UI themes so that they match the look and feel of your website or application."
previous_url: /themebuilder
slug: themebuilder_overview_kendouistyling
position: 3
---

# ThemeBuilder Overview

The [Kendo UI ThemeBuilder](http://demos.telerik.com/kendo-ui/themebuilder/web.html) is a tool that lets you modify Kendo UI themes so that they match the look and feel of your website or application.

## Modify Themes

### Use Newly Created Themes

After adjusting the theme via the ThemeBuilder, click **Download theme**. This provides the following files:

* `kendo.custom.css` - This is the custom theme for most widgets. You are able to use this theme instead of any `kendo.[theme].css` one.
* `kendo.custom.js` - The custom theme for charting widgets, the ones that use `SVG`/`VML`/`Canvas` rendering. You need to include this file prior to using the custom theme via the [theme configuration option](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#configuration-theme).
* `kendo.custom.less` - The [LESS](http://lesscss.org/) that includes the custom theme. Use this file if you want to compile the theme dynamically.

> **Important**
> * You must always register the common CSS files&mdash;`kendo.common.css` or `kendo.dataviz.css`&mdash;on the page, even when using ThemeBuilder-generated themes.
> * When deploying your themed application to an internal network, note that the images in the ThemeBuilder output are inferred from the page. If you are using the ThemeBuilder through the Kendo UI page, the images are going to be located on the Kendo UI CDN, and may be blocked if your customers are within an internal network without access to the CDN. In such circumstances, copy the image resources locally and change the references in the CSS/ LESS output.

### Use LESS Output

The LESS output of the ThemeBuilder depends on the LESS files that are distributed along with the Kendo UI source, so make sure the file reference points to the existing files.

For the various ways to process the LESS output, refer to the [official LESS documentation](http://lesscss.org/#-client-side-usage).

## Version Compatibility

The ThemeBuilder generates CSS, LESS, and JS code, which are compatible with the current official Kendo UI version. In case a custom theme for an older Kendo UI version is needed, implement it via [manual coding or overrides]({% slug themesandappearnce_kendoui_desktopwidgets %}#customize-appearance).

## See Also

Other articles on styling, appearance, and rendering of Kendo UI widgets:

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [How to Change Themes on the Client]({% slug howto_changethemes_ontheclient_styleskendoui %})
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
* [Tips and Tricks]({% slug tipsandtricks_kendouistyling %})
* [Troubleshooting]({% slug commonissues_troubleshooting_kendouistyling %})
* [Themes and Appearance of the Kendo UI Hybrid Widgets](/controls/hybrid/styling)
