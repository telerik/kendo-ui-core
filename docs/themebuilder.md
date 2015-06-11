---
title: ThemeBuilder Overview
page_title: Modify Kendo UI themes with Kendo UI ThemeBuilder
description: Modify Kendo UI Themes to make them fit the look and feel of your application or website, using the handy ThemeBuilder tool.
position: 200
---

### What is Kendo UI ThemeBuilder?

The [Kendo UI ThemeBuilder](http://demos.telerik.com/kendo-ui/themebuilder/web.html) is a tool that lets you modify Kendo UI themes so that they match the look and feel of your site or app.

### Using the newly created theme

After adjusting the theme via the ThemeBuilder click the "Download theme" button. This will give you the following files:

* `kendo.custom.css` - The custom theme for most widgets. You can use this theme instead of any kendo.[theme].css theme.
* `kendo.custom.js` - The custom theme for charting widgets (who use SVG/VML/Canvas rendering). You need to include this file prior to using the custom theme via the [theme configuration option](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#configuration-theme).
* `kendo.custom.less` - The [LESS](http://lesscss.org/) that includes the custom theme. Use this file if you want to compile the theme dynamically.

> The common CSS files (`kendo.common.css` when using Kendo UI Web or `kendo.dataviz.css` when using Kendo UI DataViz) should always be registered on the page, even when using ThemeBuilder-generated themes.

> When deploying your themed application to an internal network, please keep in mind that the images in the ThemeBuilder output are inferred from the page. If you are using the ThemeBuilder through the Kendo UI page, this means the images will be located on the Kendo UI CDN, and may be blocked if your customers are within an internal network without an access to the CDN. In such circumstances, copy the image resources locally and change the references in the CSS/ LESS output.

#### Using the LESS output

The LESS output of the ThemeBuilder depends on the less files that are distributed along with the Kendo UI source, so make sure the file reference points to the existing files. Refer to the [official LESS documentation](http://lesscss.org/#-client-side-usage) on the various ways you can process it.

