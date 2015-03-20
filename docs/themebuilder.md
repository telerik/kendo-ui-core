---
title: Kendo UI ThemeBuilder Overview
page_title: Modify Kendo UI themes with Kendo UI ThemeBuilder
description: Modify Kendo UI Themes to make them fit the look and feel of your application or website, using the handy ThemeBuilder tool.
position: 200
---

### What is the Kendo UI ThemeBuilder?

The Kendo UI ThemeBuilder is a tool that lets you modify Kendo UI themes so that they match the look and feel of your site or app. You can test it online [here](http://demos.telerik.com/kendo-ui/themebuilder/web.html).

### Using the ThemeBuilder on your own pages

Because the ThemeBuilder is a browser bookmarklet, using it on your own pages is as easy as clicking a button. Just drag the ThemeBuilder button to your bookmarks bar, and voila! You can now load the theming interface on every page that contains Kendo UI components.

### Using the output from the ThemeBuilder

Since the ThemeBuilder can output LESS or CSS text, you need to perform a few steps to use the newly created theme on your pages.

> When deploying your themed application to an internal network, please keep in mind that the images in the ThemeBuilder output are inferred from the page. If you are using the ThemeBuilder through the Kendo UI page, this means the images will be located on the Kendo UI CDN, and may be blocked if your customers are within an internal network without an access to the CDN. In such circumstances, copy the image resources locally and change the references in the CSS/ LESS output.

#### Using the CSS output

Just copy the CSS output to a .css file and include it in your page.

#### Using the LESS output

The LESS output of the ThemeBuilder depends on the theme-template.less theme template that is distributed along with the Kendo UI source. Save the LESS output to a .less file alongside the theme-template.less and refer to the [official LESS documentation](http://lesscss.org/#-client-side-usage) on the various ways you can process it.

> The common CSS files (`kendo.common.css` when using Kendo UI Web or `kendo.dataviz.css` when using Kendo UI DataViz) should always be registered on the page, even when using ThemeBuilder-generated themes.
